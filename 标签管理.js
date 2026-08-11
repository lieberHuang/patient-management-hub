document.addEventListener('DOMContentLoaded',()=>{
  const project=document.querySelector('#tagProject'),scale=document.querySelector('#tagScale'),definition=document.querySelector('#definitionPanel'),matching=document.querySelector('#matchingPanel');
  const scaleOptions={
    '慢病管理项目':['用药依从性量表','PHQ-9 抑郁筛查量表'],
    '肿瘤随访项目':['治疗方案评估量表','NRS 疼痛评分量表'],
    '真实世界研究项目':['患者基本信息采集']
  };
  const rows=[...document.querySelectorAll('#definitions tbody tr,#matching tbody tr')];
  const refreshScales=()=>{const list=scaleOptions[project.value]||[];scale.innerHTML='<option value="all">全部量表</option>'+list.map(item=>`<option value="${item}">${item}</option>`).join('');scale.disabled=project.value==='all'};
  const filterRows=()=>{
    const selectedProject=project.value,selectedScale=scale.value;
    [['#definitions','#definitionEmpty'],['#matching','#matchingEmpty']].forEach(([table,empty])=>{let count=0;document.querySelectorAll(`${table} tbody tr`).forEach(row=>{const show=(selectedProject==='all'||row.dataset.project===selectedProject)&&(selectedScale==='all'||row.dataset.scale===selectedScale);row.hidden=!show;if(show)count++});document.querySelector(empty).hidden=count!==0});
  };
  project.addEventListener('change',()=>{refreshScales();filterRows()});scale.addEventListener('change',filterRows);document.querySelector('#queryTags').addEventListener('click',filterRows);document.querySelector('#resetTags').addEventListener('click',()=>{project.value='all';refreshScales();filterRows()});refreshScales();filterRows();
  document.querySelectorAll('.tag-tabs button').forEach(button=>button.addEventListener('click',()=>{const isDefinition=button.dataset.tab==='definition';definition.hidden=!isDefinition;matching.hidden=isDefinition;document.querySelectorAll('.tag-tabs button').forEach(item=>item.classList.toggle('active',item===button))}));
  document.querySelectorAll('.tag-status-action').forEach(button=>button.addEventListener('click',()=>{const row=button.closest('tr'),online=row.dataset.status==='online',status=row.querySelector('td:nth-last-child(2) .pill');row.dataset.status=online?'offline':'online';status.textContent=online?'已下架':'使用中';status.className=`pill ${online?'gray':'green'}`;button.textContent=online?'上架':'下架'}));
});
