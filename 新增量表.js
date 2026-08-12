document.addEventListener('DOMContentLoaded',()=>{
  const scales={
    base:{questions:[{name:'请问您的性别？',options:['男','女','未说明']},{name:'您的最高教育程度是？',options:['小学及以下','初中','高中/中专','大学及以上']}]},
    phq:{questions:[{name:'做事时提不起劲或没有兴趣',options:['完全不会','有几天','一半以上天数','几乎每天']},{name:'感到心情低落、沮丧或绝望',options:['完全不会','有几天','一半以上天数','几乎每天']}]},
    ecog:{questions:[{name:'您的体力状态评分',options:['0 分','1 分','2 分','3 分','4 分','5 分']}]}
  };
  const tags={
    '慢病管理项目':['高依从性患者','心理风险关注','老年患者'],
    '肿瘤随访项目':['靶向治疗患者','高疼痛风险']
  };
  const project=document.querySelector('#project'),scale=document.querySelector('#scale'),view=document.querySelector('.catalogue');
  const tagOptions=()=>tags[project.value].map(tag=>'<option value="'+tag+'">'+tag+'</option>').join('');
  function render(){
    const questions=scales[scale.value].questions;
    view.className='scale-detail show add-scale-detail option-tag-detail';
    view.innerHTML='<div class="detail-title"><div><span class="eyebrow">选项标签关联</span><h2>量表全部题目与选项</h2><p>为每个选项选择一个标签；标签关联后，再选择该标签的更新方式。</p></div></div>'+questions.map((question,questionIndex)=>'<article class="question option-tag-question"><div class="option-tag-question-head"><span class="question-number">题目 '+(questionIndex+1)+'</span><h3>'+question.name+'</h3><p>该题所有选项均可独立关联标签。</p></div><div class="option-tag-table"><div class="option-tag-head"><b>题目选项</b><b>关联标签</b><b>标签更新方式</b><b>状态</b></div>'+question.options.map((option,optionIndex)=>'<div class="option-tag-row"><div><b>'+option+'</b><small class="code">Q'+String(questionIndex+1).padStart(2,'0')+'_O'+String(optionIndex+1).padStart(2,'0')+'</small></div><select class="tag-select"><option value="">请选择标签</option>'+tagOptions()+'</select><select class="rule-select" disabled><option value="">请选择更新方式</option><option value="覆盖">覆盖</option><option value="累加">累加</option></select><span class="pill gray">未关联</span></div>').join('')+'</div></article>').join('')+'<div class="note"><b>更新规则：</b>覆盖表示以本次结果更新患者的该标签；累加表示在已有标签命中次数基础上增加一次。</div>';
    view.querySelectorAll('.tag-select').forEach(select=>select.addEventListener('change',()=>{const row=select.closest('.option-tag-row'),rule=row.querySelector('.rule-select'),pill=row.querySelector('.pill');rule.disabled=!select.value;if(!select.value){rule.value='';pill.textContent='未关联';pill.className='pill gray'}else{pill.textContent='待选更新方式';pill.className='pill blue'}}));
    view.querySelectorAll('.rule-select').forEach(select=>select.addEventListener('change',()=>{const pill=select.closest('.option-tag-row').querySelector('.pill');pill.textContent=select.value?'已关联':'待选更新方式';pill.className='pill '+(select.value?'green':'blue')}));
  }
  project.addEventListener('change',render);scale.addEventListener('change',render);
  document.querySelector('#save').addEventListener('click',()=>{const tagSelects=[...view.querySelectorAll('.tag-select')],ruleSelects=[...view.querySelectorAll('.rule-select')];if(tagSelects.some(item=>!item.value)||ruleSelects.some(item=>!item.value)){alert('请为每个题目选项选择标签，并设置标签更新方式。');return}document.querySelector('#saved').classList.add('show')});
  render();
});
