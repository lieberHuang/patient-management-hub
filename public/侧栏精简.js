document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('aside .workspace')?.remove();
  const scaleNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('标签关联关系'));
  if(scaleNav&&!document.querySelector('.tag-nav'))scaleNav.insertAdjacentHTML('afterend','<a class="nav tag-nav" href="标签管理.html">♢ <span>标签管理</span></a>');
  const tagNav=document.querySelector('.tag-nav');if(tagNav&&!document.querySelector('.patient-tag-nav'))tagNav.insertAdjacentHTML('afterend','<a class="nav patient-tag-nav" href="患者标签.html">♧ <span>患者标签</span></a>');
  const patientTagNav=document.querySelector('.patient-tag-nav');if(patientTagNav&&!document.querySelector('.delivery-nav'))patientTagNav.insertAdjacentHTML('afterend','<a class="nav delivery-nav" href="推送计划.html">✉ <span>推送计划</span></a>');
  const deliveryNav=document.querySelector('.delivery-nav');if(deliveryNav&&!document.querySelector('.delivery-warning-nav'))deliveryNav.insertAdjacentHTML('afterend','<a class="nav delivery-warning-nav" href="推送异常预警.html">⚠ <span>推送异常预警</span></a>');
  let tagPushHeading=[...document.querySelectorAll('aside .nav-label')].find(el=>el.textContent.includes('标签与推送管理')||el.textContent.trim()==='患者标签');
  if(!tagPushHeading&&scaleNav){tagPushHeading=document.createElement('p');tagPushHeading.className='nav-label space';tagPushHeading.textContent='标签与推送管理'}
  if(tagPushHeading&&scaleNav){tagPushHeading.textContent='标签与推送管理';scaleNav.before(tagPushHeading)}
  const dataHeading=[...document.querySelectorAll('aside .nav-label')].find(el=>el.textContent.includes('数据治理')),overviewNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('数据总览')),masterNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('患者主数据')),dictionaryNav=[...document.querySelectorAll('aside .nav')].find(a=>a.textContent.includes('项目患者字典表'));
  if(dataHeading&&overviewNav&&masterNav&&dictionaryNav)overviewNav.after(masterNav,dictionaryNav);
  if(dictionaryNav&&!document.querySelector('.indicator-nav'))dictionaryNav.insertAdjacentHTML('afterend','<a class="nav indicator-nav" href="指标管理.html">◌ <span>指标管理</span></a>');
  const indicatorNav=document.querySelector('.indicator-nav');if(indicatorNav&&!document.querySelector('.medication-nav'))indicatorNav.insertAdjacentHTML('afterend','<a class="nav medication-nav" href="用药记录.html">▧ <span>用药记录</span></a>');
  const path=decodeURIComponent(location.pathname),isPatientTag=path.includes('患者标签.html')||path.includes('患者标签详情.html'),isWarning=path.includes('推送异常预警.html'),isDelivery=['推送计划.html','新建推送计划.html','推送匹配用户.html'].some(name=>path.includes(name)),isTagRule=path.includes('标签规则配置.html'),isIndicator=['指标管理.html','创建指标.html'].some(name=>path.includes(name)),isMedication=path.includes('用药记录.html');
  if(path.includes('标签管理.html')||isPatientTag||isWarning||isDelivery||isTagRule||isIndicator||isMedication)document.querySelectorAll('aside .nav').forEach(a=>a.classList.toggle('active',isMedication?a.classList.contains('medication-nav'):isIndicator?a.classList.contains('indicator-nav'):isWarning?a.classList.contains('delivery-warning-nav'):isDelivery?a.classList.contains('delivery-nav'):isPatientTag?a.classList.contains('patient-tag-nav'):a.classList.contains('tag-nav')));
  if(path.includes('新建推送计划.html'))document.querySelector('#planForm textarea')?.closest('label')?.remove();
  if(path.includes('新建推送计划.html')&&!document.querySelector('#traceUsers'))document.querySelector('#planForm .radio-list')?.closest('label')?.insertAdjacentHTML('afterend','<label>是否追溯用户<select id="traceUsers"><option value="no">否</option><option value="yes">是</option></select></label>');
  const heading=[...document.querySelectorAll('aside .nav-label')].find(el=>el.textContent.includes('系统设置'));if(!heading)return;let next=heading.nextElementSibling;heading.remove();while(next?.classList.contains('nav')){const current=next;next=next.nextElementSibling;current.remove()}
});
