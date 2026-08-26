document.addEventListener('DOMContentLoaded',()=>{
  const $=selector=>document.querySelector(selector);
  $('#hasMetric')?.closest('label')?.remove();
  document.querySelector('.indicator-record-filters').style.gridTemplateColumns='1.25fr auto';
  const patients=[
    {id:'PT-202608-00018',last:'2026-08-24 09:15',metric:['空腹血糖','5.6 mmol/L']},
    {id:'PT-202608-00036',last:'2026-08-23 16:40',metric:['血压','128/82 mmHg']},
    {id:'PT-202608-00057',last:'—',metric:null},
    {id:'PT-202608-00072',last:'2026-08-22 11:06',metric:['空腹血糖','6.8 mmol/L']},
    {id:'PT-202608-00105',last:'2026-08-21 15:24',metric:['体重','74.1 kg']},
    {id:'PT-202608-00116',last:'—',metric:null}
  ];
  const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const render=()=>{const patientId=$('#patientId').value.trim(),data=patients.filter(patient=>!patientId||patient.id===patientId);$('#indicatorRecordTable tbody').innerHTML=data.map(patient=>`<tr><td><b>${patient.id}</b></td><td>${patient.last}</td><td>${patient.metric?`<div class="record-tags"><span>${escapeHtml(patient.metric[0])}：${escapeHtml(patient.metric[1])}</span></div>`:'<span class="record-none">暂未记录</span>'}</td></tr>`).join('');$('#empty').hidden=Boolean(data.length);$('#indicatorRecordTable').hidden=!data.length};
  $('#query').addEventListener('click',render);$('#reset').addEventListener('click',()=>{$('#patientId').value='';render()});$('#patientId').addEventListener('keydown',event=>{if(event.key==='Enter')render()});render();
});
