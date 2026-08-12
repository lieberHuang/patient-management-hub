document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('aside .workspace')?.remove();
  const labels=document.querySelectorAll('aside .nav-label');if(labels[0])labels[0].textContent='患者标签';
  const scaleNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('标签关联关系'));
  if(scaleNav&&!document.querySelector('.tag-nav'))scaleNav.insertAdjacentHTML('afterend','<a class="nav tag-nav" href="标签管理.html">♢ <span>标签管理</span></a>');
  const tagNav=document.querySelector('.tag-nav');if(tagNav&&!document.querySelector('.patient-tag-nav'))tagNav.insertAdjacentHTML('afterend','<a class="nav patient-tag-nav" href="患者标签.html">♧ <span>患者标签</span></a>');
  const dataHeading=[...document.querySelectorAll('aside .nav-label')].find(el=>el.textContent.includes('数据治理')),overviewNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('数据总览')),masterNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('患者主数据')),dictionaryNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('项目患者字典表'));
  if(dataHeading&&overviewNav&&masterNav&&dictionaryNav)overviewNav.after(masterNav,dictionaryNav);
  const path=decodeURIComponent(location.pathname),isPatientTag=path.includes('患者标签.html')||path.includes('患者标签详情.html');
  if(path.includes('标签管理.html')||isPatientTag)document.querySelectorAll('aside .nav').forEach(a=>a.classList.toggle('active',isPatientTag?a.classList.contains('patient-tag-nav'):a.classList.contains('tag-nav')));
  const heading=[...document.querySelectorAll('aside .nav-label')].find(el=>el.textContent.includes('系统设置'));if(!heading)return;let next=heading.nextElementSibling;heading.remove();while(next?.classList.contains('nav')){const current=next;next=next.nextElementSibling;current.remove()}
});
