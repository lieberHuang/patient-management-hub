document.addEventListener('DOMContentLoaded',()=>{
  const $=selector=>document.querySelector(selector),rows=[...document.querySelectorAll('#warningTable tbody tr')];
  $('#status')?.closest('label')?.remove();document.querySelector('.filter-grid').style.gridTemplateColumns='1.35fr 1fr auto';
  document.querySelectorAll('#warningTable tr').forEach(row=>{row.children[5]?.remove();row.children[4]?.remove()});$('#pauseModal')?.remove();
  const render=()=>{const key=$('#keyword').value.trim(),start=$('#start').value,end=$('#end').value;rows.forEach(row=>{const date=row.children[2].textContent.slice(0,10),show=(!key||row.textContent.includes(key))&&(!start||date>=start)&&(!end||date<=end);row.hidden=!show});$('#empty').hidden=rows.some(row=>!row.hidden)};
  $('#query').addEventListener('click',render);$('#reset').addEventListener('click',()=>{$('#keyword').value='';$('#start').value='';$('#end').value='';render()});$('#keyword').addEventListener('keydown',event=>{if(event.key==='Enter')render()});render();
});
