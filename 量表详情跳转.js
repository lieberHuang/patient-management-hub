document.addEventListener('DOMContentLoaded',()=>{
  const create=document.querySelector('.title-row .button.primary');if(create)create.onclick=()=>location.href='新增量表.html';
  document.querySelector('#detail')?.remove();
  const codes={phq:'PHQ-9 抑郁筛查量表',ecog:'ECOG 体力状况评分',mms:'用药依从性量表',nrs:'NRS 疼痛评分量表'};
  document.querySelectorAll('#scales a[href="#detail"]').forEach(a=>{const key=(a.getAttribute('onclick')||'').match(/'([^']+)'/)?.[1];if(!key)return;a.removeAttribute('onclick');a.href=`量表详情.html?scale=${key}`;a.title=`查看${codes[key]}详情`;});
});
