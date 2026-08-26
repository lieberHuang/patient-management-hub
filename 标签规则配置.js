document.addEventListener('DOMContentLoaded',()=>{
  document.head.insertAdjacentHTML('beforeend','<style>.rule-builder .condition-row.has-required{grid-template-columns:1.25fr .9fr 1fr auto 28px}.condition-required{display:flex;align-items:center;gap:5px;white-space:nowrap;font-size:12px;color:#53657a;cursor:pointer}.rule-builder .condition-required input{width:auto;margin:0;padding:0}@media(max-width:700px){.rule-builder .condition-row.has-required{grid-template-columns:1fr}}</style>');
  const $=s=>document.querySelector(s);
  const fields=[['年龄','number'],['确诊年份','date'],['诊断年份','date'],['性别','enum'],['诊断病种','enum'],['诊断医院','enum'],['患者来源渠道','enum'],['入组情况','enum'],['最近一次入组申请时间','date'],['最近一次入组申请时间距离当前日数','number'],['理赔申请次数','number'],['最近一次理赔状态','enum'],['最近一次理赔时间','date'],['最近一次理赔时间距离当前日数','number'],['是否添加企业微信','enum'],['企业微信最后一条消息距离当前日数','number'],['用药盒数','number']];
  const numeric=['大于','小于','等于','大于等于','小于等于','不等于'],enums=['等于','不等于'];
  let conditions=[{field:'年龄',type:'number',operator:'大于',value:'65',required:false}];
  const relation=()=>document.querySelector('input[name="relation"]:checked').value;
  const updateEstimate=()=>{
    const total=436,filled=conditions.filter(c=>c.value.trim()).length,required=conditions.filter(c=>c.required).length;
    const rate=relation()==='满足全部'?Math.max(.08,.38-(filled-1)*.09):Math.max(.08,Math.min(.78,.38+(filled-1)*.12-required*.09));
    $('#estimatedUsers').textContent=Math.round(total*rate)+' 人';$('#projectUsers').textContent=total+' 人';
  };
  const render=()=>{
    const isAny=relation()==='满足任意一条';
    $('#conditionList').innerHTML=conditions.map((item,index)=>`<div class="condition-row ${isAny?'has-required':''}"><select class="condition-field" data-index="${index}">${fields.map(([name,type])=>`<option value="${name}" data-type="${type}" ${item.field===name?'selected':''}>${name}</option>`).join('')}</select><select class="condition-operator" data-index="${index}">${(item.type==='enum'?enums:numeric).map(op=>`<option ${item.operator===op?'selected':''}>${op}</option>`).join('')}</select><input class="condition-value" data-index="${index}" value="${item.value}" placeholder="请输入判断值">${isAny?`<label class="condition-required"><input type="checkbox" data-index="${index}" ${item.required?'checked':''}> 必须满足</label>`:''}<button class="condition-remove" data-index="${index}" type="button" ${conditions.length===1?'hidden':''}>×</button></div>`).join('');
    preview();
  };
  const preview=()=>{
    const name=$('#planName').value.trim()||'未命名推送计划',currentRelation=relation(),validation=document.querySelector('input[name="validation"]:checked').value;
    const summary=conditions.map(c=>`${c.field}${c.operator}${c.value||'…'}${currentRelation==='满足任意一条'&&c.required?'（必须满足）':''}`).join(currentRelation==='满足全部'?' 且 ':' 或 ');
    $('#resultPreview').textContent=`“${name}”将匹配${currentRelation}：${summary}的患者；推送前执行“${validation}”。`;
    updateEstimate();
  };
  $('#addCondition').addEventListener('click',()=>{conditions.push({field:'性别',type:'enum',operator:'等于',value:'',required:false});render()});
  $('#conditionList').addEventListener('change',e=>{
    const i=Number(e.target.dataset.index),item=conditions[i];
    if(e.target.classList.contains('condition-field')){const option=e.target.selectedOptions[0];item.field=e.target.value;item.type=option.dataset.type;item.operator=item.type==='enum'?'等于':'大于';render()}
    if(e.target.classList.contains('condition-operator')){item.operator=e.target.value;preview()}
    if(e.target.matches('.condition-required input')){item.required=e.target.checked;preview()}
  });
  $('#conditionList').addEventListener('input',e=>{if(e.target.classList.contains('condition-value')){conditions[Number(e.target.dataset.index)].value=e.target.value;preview()}});
  $('#conditionList').addEventListener('click',e=>{const button=e.target.closest('.condition-remove');if(button){conditions.splice(Number(button.dataset.index),1);render()}});
  $('#planName').addEventListener('input',preview);
  document.querySelectorAll('input[name="validation"],input[name="relation"]').forEach(input=>input.addEventListener('change',render));
  $('#ruleForm').addEventListener('submit',e=>{
    e.preventDefault();const name=$('#planName').value.trim();
    if(!name||conditions.some(c=>!c.value.trim())){alert('请完成推送计划名称及每个条件的判断值');return}
    const currentRelation=relation(),validation=document.querySelector('input[name="validation"]:checked').value,now=new Date();
    const record={id:'CUSTOM_'+Date.now(),code:'TAG_CUSTOM_'+Date.now().toString().slice(-8),name,relation:currentRelation,validation,conditions:conditions.map(c=>`${c.field}${c.operator}${c.value}${currentRelation==='满足任意一条'&&c.required?'（必须满足）':''}`).join(currentRelation==='满足全部'?' 且 ':' 或 '),createdAt:`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,status:'online'};
    let items=[];try{items=JSON.parse(localStorage.getItem('patientCustomTags')||'[]')}catch{}items.unshift(record);localStorage.setItem('patientCustomTags',JSON.stringify(items));location.href='标签管理.html?tab=custom';
  });
  render();
});
