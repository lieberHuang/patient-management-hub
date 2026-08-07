document.addEventListener('DOMContentLoaded',()=>{
  [...document.querySelectorAll('.nav')].find(a=>a.textContent.includes('数据总览'))?.setAttribute('href','数据总览.html');
  document.querySelector('.title-row .button.primary')?.remove();
  document.querySelector('#master')?.closest('.panel').querySelector('.section-head small')?.remove();
  const fields=[
    {name:'患者唯一标识',code:'patient_id',type:'字符型（32）',definition:'患者管理中台内的全局唯一患者标识，用于跨项目识别、关联和数据去重。',domain:['UUID 格式','长度：32 位','示例：PT202608060001']},
    {name:'姓名',code:'patient_name',type:'字符型（50）',definition:'患者真实姓名。该字段属于敏感个人信息，按用户权限进行脱敏展示和使用。',domain:['中文姓名或英文姓名','最大长度：50 个字符','示例：张**（脱敏）']},
    {name:'性别',code:'gender',type:'字典枚举',definition:'患者生理性别，引用中台通用标准字典「性别」，以标准编码保存。',domain:['男 · MALE','女 · FEMALE','未知 · UNKNOWN']},
    {name:'出生日期',code:'birth_date',type:'日期型',definition:'患者出生日期，用于按就诊或随访日期自动计算年龄。',domain:['格式：YYYY-MM-DD','最小值：1900-01-01','最大值：当前日期']},
    {name:'证件类型',code:'id_type',type:'字典枚举',definition:'患者身份有效证件的类别，引用中台通用标准字典「证件类型」。',domain:['居民身份证 · ID_CARD','护照 · PASSPORT','港澳台居民居住证 · RESIDENCE_PERMIT','其他 · OTHER']},
    {name:'联系电话',code:'mobile',type:'字符型（20）',definition:'患者本人或监护人的联系电话，用于研究随访和必要通知。',domain:['中国大陆手机号：11 位','固定电话：区号-号码','最大长度：20 个字符']}
  ];
  const rows=[...document.querySelectorAll('#master tbody tr')];
  rows.forEach((row,i)=>{const link=row.querySelector('td:last-child a');if(!link)return;link.textContent='查看详情';link.href='#field-detail';link.onclick=e=>{e.preventDefault();show(fields[i])}});
  const modal=document.createElement('div');modal.className='field-modal';modal.id='field-detail';modal.innerHTML='<section class="field-card" role="dialog" aria-modal="true"><button class="field-close" aria-label="关闭">×</button><span class="field-eyebrow">患者基本主数据</span><h2></h2><p class="field-definition"></p><div class="field-meta"><div><span>字段编号</span><b class="code"></b></div><div><span>字段类型</span><b class="field-type"></b></div><div><span>是否必填</span><b class="field-required"></b></div></div><div class="field-domain"><div><b>值域定义</b><small>字段可存储的标准值或格式范围</small></div><ul></ul></div><div class="field-footer"><button class="button primary field-ok">我知道了</button></div></section>';
  document.body.appendChild(modal);
  function show(field){modal.querySelector('h2').textContent=field.name;modal.querySelector('.field-definition').textContent=field.definition;modal.querySelector('.code').textContent=field.code;modal.querySelector('.field-type').textContent=field.type;modal.querySelector('.field-required').textContent=field.name==='联系电话'?'选填':'必填';modal.querySelector('ul').innerHTML=field.domain.map(v=>`<li>${v}</li>`).join('');modal.classList.add('show')}
  function close(){modal.classList.remove('show')}modal.querySelector('.field-close').onclick=close;modal.querySelector('.field-ok').onclick=close;modal.onclick=e=>{if(e.target===modal)close()};document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
});
