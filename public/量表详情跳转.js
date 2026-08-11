document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#createScale')?.addEventListener('click',()=>location.href='新增量表.html');
  const form=document.querySelector('#scaleFilters'),search=document.querySelector('#schemeSearch'),start=document.querySelector('#createdStart'),end=document.querySelector('#createdEnd'),rows=[...document.querySelectorAll('#scales tbody tr')],empty=document.querySelector('#emptyScale'),total=document.querySelector('#scaleTotal');
  const applyFilters=()=>{
    const keyword=search.value.trim().toLowerCase(),startDate=start.value,endDate=end.value;let visible=0;
    rows.forEach(row=>{const show=(!keyword||row.dataset.scheme.toLowerCase().includes(keyword))&&(!startDate||row.dataset.created>=startDate)&&(!endDate||row.dataset.created<=endDate);row.hidden=!show;if(show)visible++});
    total.textContent=`当前共 ${visible} 个量表`;empty.hidden=visible!==0;
  };
  form?.addEventListener('submit',event=>{event.preventDefault();applyFilters()});
  document.querySelector('#resetFilters')?.addEventListener('click',()=>{form.reset();applyFilters()});
  search?.addEventListener('input',applyFilters);
  document.querySelectorAll('.status-action').forEach(button=>button.addEventListener('click',()=>{
    const row=button.closest('tr'),status=row.dataset.status==='online'?'offline':'online',pill=row.querySelector('.pill');row.dataset.status=status;
    pill.textContent=status==='online'?'已启动':'已下架';pill.className=`pill ${status==='online'?'green':'gray'}`;button.textContent=status==='online'?'下架':'上架';
  }));
});
