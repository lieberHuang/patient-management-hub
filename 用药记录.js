document.addEventListener('DOMContentLoaded',()=>{
  const $=selector=>document.querySelector(selector);
  const records=[
    {id:'MED-0001',patientId:'PT-202608-00018',medicine:'二甲双胍缓释片',createdAt:'2026-08-24',frequency:'每日 2 次，每次 1 片',addedAt:'2026-08-24 09:12',stopped:false},
    {id:'MED-0002',patientId:'PT-202608-00036',medicine:'氯沙坦钾片',createdAt:'2026-08-23',frequency:'每日 1 次，每次 1 片',addedAt:'2026-08-23 16:38',stopped:false},
    {id:'MED-0003',patientId:'PT-202608-00036',medicine:'阿托伐他汀钙片',createdAt:'2026-08-22',frequency:'每日 1 次，睡前 1 片',addedAt:'2026-08-22 20:05',stopped:false},
    {id:'MED-0004',patientId:'PT-202608-00072',medicine:'盐酸二甲双胍片',createdAt:'2026-08-20',frequency:'每日 2 次，每次 1 片',addedAt:'2026-08-20 08:40',stopped:true},
    {id:'MED-0005',patientId:'PT-202608-00105',medicine:'碳酸钙 D3 片',createdAt:'2026-08-18',frequency:'每日 1 次，每次 1 片',addedAt:'2026-08-18 10:26',stopped:false},
    {id:'MED-0006',patientId:'PT-202608-00116',medicine:'瑞舒伐他汀钙片',createdAt:'2026-08-16',frequency:'每日 1 次，睡前 1 片',addedAt:'2026-08-16 21:13',stopped:false}
  ];
  const render=()=>{
    const patientId=$('#patientId').value.trim(),start=$('#startDate').value,end=$('#endDate').value;
    const data=records.filter(record=>(!patientId||record.patientId===patientId)&&(!start||record.createdAt>=start)&&(!end||record.createdAt<=end));
    $('#medicationTable tbody').innerHTML=data.map(record=>`<tr><td><b>${record.patientId}</b></td><td><b>${record.medicine}</b></td><td>${record.createdAt}</td><td class="frequency">${record.frequency}</td><td>${record.addedAt}</td><td>${record.stopped?`<button class="text-action resume-reminder" data-id="${record.id}">恢复推送</button>`:`<button class="text-action stop-reminder" data-id="${record.id}">停止推送</button>`}</td></tr>`).join('');
    $('#empty').hidden=Boolean(data.length);$('#medicationTable').hidden=!data.length;
  };
  $('#query').addEventListener('click',render);
  $('#reset').addEventListener('click',()=>{$('#patientId').value='';$('#startDate').value='';$('#endDate').value='';render()});
  $('#patientId').addEventListener('keydown',event=>{if(event.key==='Enter')render()});
  $('#medicationTable tbody').addEventListener('click',event=>{const button=event.target.closest('.stop-reminder,.resume-reminder');if(!button)return;const record=records.find(item=>item.id===button.dataset.id);if(!record)return;record.stopped=!record.stopped;render()});
  render();
});
