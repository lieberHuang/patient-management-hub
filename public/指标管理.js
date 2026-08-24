document.addEventListener('DOMContentLoaded',()=>{
  const $=selector=>document.querySelector(selector);
  const seed=[
    {id:'METRIC_GLUCOSE',name:'空腹血糖',unit:'mmol/L',normal:'3.9–6.1',abnormal:'＜3.9 或 ＞6.1',conversions:[{unit:'mg/dL',operator:'×',factor:'18.018'}],enabled:true},
    {id:'METRIC_BP',name:'血压',unit:'mmHg',normal:'90–139 / 60–89',abnormal:'≥140/90 或 ＜90/60',conversions:[],enabled:true},
    {id:'METRIC_WEIGHT',name:'体重',unit:'kg',normal:'个体目标区间',abnormal:'超出个体目标区间',conversions:[{unit:'lb',operator:'÷',factor:'2.2046'}],enabled:false}
  ];
  const escapeHtml=value=>String(value||'—').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const definitions=()=>{try{const saved=JSON.parse(localStorage.getItem('patientMetricDefinitions')||'');return Array.isArray(saved)?saved:seed}catch{return seed}};
  const save=list=>localStorage.setItem('patientMetricDefinitions',JSON.stringify(list));
  const render=()=>{
    const keyword=$('#metricKeyword').value.trim().toLowerCase(),status=$('#metricStatus').value;
    const data=definitions().filter(item=>!keyword||item.name.toLowerCase().includes(keyword)).filter(item=>status==='all'||(status==='enabled'?item.enabled!==false:item.enabled===false));
    $('#metricTable tbody').innerHTML=data.map(item=>`<tr><td><b>${escapeHtml(item.name)}</b><small class="code">${escapeHtml(item.id)}</small></td><td>${escapeHtml(item.unit)}</td><td>${escapeHtml(item.normal)} ${escapeHtml(item.unit)}</td><td>${escapeHtml(item.abnormal)} ${escapeHtml(item.unit)}</td><td>${item.conversions?.length?`${item.conversions.length} 个单位换算`:'—'}</td><td><span class="pill ${item.enabled===false?'gray':'green'}">${item.enabled===false?'已下架':'使用中'}</span></td><td><a class="text-action" href="创建指标.html?edit=${encodeURIComponent(item.id)}">编辑</a><button class="text-action metric-toggle" data-id="${escapeHtml(item.id)}">${item.enabled===false?'上架':'下架'}</button></td></tr>`).join('');
    $('#empty').hidden=Boolean(data.length);$('#metricTable').hidden=!data.length;
  };
  $('#query').addEventListener('click',render);
  $('#reset').addEventListener('click',()=>{$('#metricKeyword').value='';$('#metricStatus').value='all';render()});
  $('#metricKeyword').addEventListener('keydown',event=>{if(event.key==='Enter')render()});
  $('#metricStatus').addEventListener('change',render);
  $('#metricTable tbody').addEventListener('click',event=>{
    const button=event.target.closest('.metric-toggle');if(!button)return;
    const data=definitions(),target=data.find(item=>item.id===button.dataset.id);if(!target)return;
    target.enabled=target.enabled===false;save(data);render();
  });
  render();
});
