document.addEventListener('DOMContentLoaded',()=>{
  const $=selector=>document.querySelector(selector);let conversions=[];
  const editId=new URLSearchParams(location.search).get('edit');
  const seed=[
    {id:'METRIC_GLUCOSE',name:'空腹血糖',type:'quantitative',unit:'mmol/L',normalMin:'3.9',normalMax:'6.1',normal:'3.9–6.1',abnormal:'＜3.9 或 ＞6.1',conversions:[{unit:'mg/dL',operator:'×',factor:'18.018'}],enabled:true},
    {id:'METRIC_BP',name:'血压',type:'quantitative',unit:'mmHg',normalMin:'90',normalMax:'139',normal:'90–139 / 60–89',abnormal:'≥140/90 或 ＜90/60',conversions:[],enabled:true},
    {id:'METRIC_WEIGHT',name:'体重',type:'unknown',unit:'kg',normal:'不区分',abnormal:'不区分',conversions:[{unit:'lb',operator:'÷',factor:'2.2046'}],enabled:false}
  ];
  const escapeHtml=value=>String(value||'—').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const load=()=>{try{const items=JSON.parse(localStorage.getItem('patientMetricDefinitions')||'');return Array.isArray(items)?items:seed}catch{return seed}};
  const type=()=>document.querySelector('input[name="metricType"]:checked').value;
  const updateType=()=>{
    const current=type(),qualitative=current==='qualitative',unknown=current==='unknown';
    $('#qualitativeDomain').hidden=!qualitative;$('#unknownDomain').hidden=!unknown;$('#numericFields').hidden=qualitative;
    $('#normalRanges').hidden=qualitative||unknown;$('#abnormalHint').hidden=qualitative||unknown;
    $('#mainUnit').required=!qualitative;$('#normalMin').required=current==='quantitative';$('#normalMax').required=current==='quantitative';
    updatePreview();
  };
  const updatePreview=()=>{
    const current=type(),name=$('#definitionName').value||'待命名指标',unit=$('#mainUnit').value||'主单位';let rows='';
    if(current==='qualitative')rows='<dt>值域</dt><dd>阴性、阳性</dd><dt>区间规则</dt><dd>不适用</dd>';
    else if(current==='unknown')rows=`<dt>值域</dt><dd>数字</dd><dt>区间规则</dt><dd>不区分正常或异常区间</dd><dt>主单位</dt><dd>${escapeHtml(unit)}</dd>`;
    else {const min=$('#normalMin').value||'—',max=$('#normalMax').value||'—';const conversionText=conversions.filter(item=>item.unit&&item.factor).map(item=>`${escapeHtml(item.unit)} ${escapeHtml(item.operator)} ${escapeHtml(item.factor)} ${escapeHtml(unit)}`).join('<br>')||'暂未配置其他单位';rows=`<dt>主单位</dt><dd>${escapeHtml(unit)}</dd><dt>正常区间</dt><dd>${escapeHtml(min)} – ${escapeHtml(max)} ${escapeHtml(unit)}</dd><dt>异常区间</dt><dd>＜${escapeHtml(min)} 或 ＞${escapeHtml(max)} ${escapeHtml(unit)}</dd><dt>单位换算</dt><dd>${conversionText}</dd>`}
    $('#definitionPreview').innerHTML=`<small>${current==='qualitative'?'定性指标':current==='quantitative'?'定量指标':'未知类型指标'}</small><b>${escapeHtml(name)}</b><dl><dt>指标类型</dt><dd>${current==='qualitative'?'定性':current==='quantitative'?'定量':'未知'}</dd>${rows}</dl>`;
  };
  const renderConversions=()=>{$('#conversionList').innerHTML=conversions.map((item,index)=>`<div class="conversion-row"><input data-field="unit" data-index="${index}" value="${escapeHtml(item.unit)}" placeholder="单位，例如 mg/dL"><select data-field="operator" data-index="${index}"><option value="×" ${item.operator==='×'?'selected':''}>乘（×）</option><option value="÷" ${item.operator==='÷'?'selected':''}>除（÷）</option><option value="＋" ${item.operator==='＋'?'selected':''}>加（＋）</option><option value="－" ${item.operator==='－'?'selected':''}>减（－）</option><option value="比例" ${item.operator==='比例'?'selected':''}>比例</option></select><input data-field="factor" data-index="${index}" value="${escapeHtml(item.factor)}" placeholder="关联关系 / 系数"><button type="button" class="remove-conversion" data-index="${index}" aria-label="移除">×</button></div>`).join('')};
  $('#addConversion').addEventListener('click',()=>{conversions.push({unit:'',operator:'×',factor:''});renderConversions();updatePreview()});
  $('#conversionList').addEventListener('input',event=>{const index=Number(event.target.dataset.index);if(Number.isNaN(index))return;conversions[index][event.target.dataset.field]=event.target.value;updatePreview()});
  $('#conversionList').addEventListener('change',event=>{const index=Number(event.target.dataset.index);if(Number.isNaN(index))return;conversions[index][event.target.dataset.field]=event.target.value;updatePreview()});
  $('#conversionList').addEventListener('click',event=>{const button=event.target.closest('.remove-conversion');if(!button)return;conversions.splice(Number(button.dataset.index),1);renderConversions();updatePreview()});
  document.querySelectorAll('input[name="metricType"]').forEach(input=>input.addEventListener('change',updateType));['#definitionName','#mainUnit','#normalMin','#normalMax'].forEach(selector=>$(selector).addEventListener('input',updatePreview));
  $('#definitionForm').addEventListener('submit',event=>{
    event.preventDefault();const current=type(),name=$('#definitionName').value.trim(),unit=$('#mainUnit').value.trim(),min=$('#normalMin').value.trim(),max=$('#normalMax').value.trim();
    if(!name||(current!=='qualitative'&&!unit)||(current==='quantitative'&&(!min||!max))){alert('请完整填写必填信息');return}
    if(current==='quantitative'&&Number(min)>=Number(max)){alert('正常下限需小于正常上限');return}
    let stored=load();const before=stored.find(item=>item.id===editId);const definition={id:before?.id||`METRIC_CUSTOM_${Date.now()}`,name,type:current,unit:current==='qualitative'?'':unit,normal:current==='quantitative'?`${min}–${max}`:current==='qualitative'?'不适用':'不区分',normalMin:current==='quantitative'?min:'',normalMax:current==='quantitative'?max:'',abnormal:current==='quantitative'?`＜${min} 或 ＞${max}`:current==='qualitative'?'不适用':'不区分',domains:current==='qualitative'?['阴性','阳性']:['数字'],conversions:current==='qualitative'?[]:conversions.filter(item=>item.unit&&item.factor),enabled:before?.enabled!==false};
    stored=before?stored.map(item=>item.id===editId?definition:item):[...stored,definition];localStorage.setItem('patientMetricDefinitions',JSON.stringify(stored));location.href='指标管理.html';
  });
  const editing=load().find(item=>item.id===editId);if(editing){$('#definitionName').value=editing.name;$('#mainUnit').value=editing.unit||'';$('#normalMin').value=editing.normalMin||editing.normal?.split('–')[0]||'';$('#normalMax').value=editing.normalMax||editing.normal?.split('–')[1]?.split(' ')[0]||'';conversions=editing.conversions||[];document.querySelector(`input[name="metricType"][value="${editing.type||'quantitative'}"]`).checked=true;$('#definitionTitle').textContent='编辑指标';$('#crumbTitle').textContent='编辑指标';$('#definitionSubtitle').textContent='修改该指标的基础信息和值域规则。'}
  renderConversions();updateType();
});
