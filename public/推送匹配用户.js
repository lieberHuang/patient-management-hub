document.addEventListener('DOMContentLoaded',()=>{
  const params=new URLSearchParams(location.search),plan=params.get('plan');if(plan)document.querySelector('#title').textContent=plan+' · 匹配用户';
  const domains={'高依从性患者':'高依从性','老年患者':'65 岁及以上','心理风险关注':'中高风险','复诊待提醒':'已到复诊期'};
  document.querySelector('#userTable thead th:nth-child(5)').textContent='标签 / 值域';
  document.querySelectorAll('.user-tags span').forEach(tag=>{const name=tag.textContent.trim();tag.textContent=`${name} · ${domains[name]||'默认值域'}`;});
  const input=document.querySelector('#keyword'),rows=[...document.querySelectorAll('#userTable tbody tr')],empty=document.querySelector('#empty');
  const render=()=>{let count=0;rows.forEach(row=>{const show=row.textContent.includes(input.value.trim());row.hidden=!show;if(show)count++});empty.hidden=!!count;document.querySelector('#matchedCount').firstChild.nodeValue=count+' '};
  document.querySelector('#query').addEventListener('click',render);document.querySelector('#reset').addEventListener('click',()=>{input.value='';render()});render();
});
