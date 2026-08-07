document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('.tag-stats article:last-child')?.remove();
  const filter=document.getElementById('tagProject'),summary={all:['18','13','1,028','27'],慢病管理项目:['7','5','423','11'],肿瘤随访项目:['6','5','392','9'],真实世界研究项目:['5','3','213','7']};
  filter.onchange=()=>{const project=filter.value;document.querySelectorAll('#definitions tbody tr,#matching tbody tr').forEach(row=>row.hidden=project!=='all'&&row.dataset.project!==project);document.querySelectorAll('.tag-stats article b').forEach((b,i)=>b.textContent=summary[project][i])};
  const panels=[...document.querySelectorAll('.tag-panel')],tabs=document.createElement('div');
  tabs.className='tag-tabs';tabs.innerHTML='<button class="active">项目标签定义</button><button>标签匹配情况</button>';
  panels[0].before(tabs);
  function show(index){panels.forEach((panel,i)=>panel.hidden=i!==index);tabs.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===index))}
  tabs.querySelectorAll('button').forEach((button,i)=>button.onclick=()=>show(i));show(0);
  const domainData={
    '高依从性患者':[['高依从性','HIGH',218],['中等依从性','MEDIUM',143],['低依从性','LOW',41]],
    '心理风险关注':[['轻度风险','MILD',22],['中度风险','MODERATE',17],['重度风险','SEVERE',8]],
    '靶向治疗患者':[['靶向治疗中','TARGETED',174],['联合靶向治疗','COMBINED_TARGETED',62]],
    '老年患者':[['65–74 岁','AGE_65_74',171],['75–84 岁','AGE_75_84',93],['85 岁及以上','AGE_85_PLUS',25]]
  };
  const definitionData={
    '高依从性患者':{scale:'用药依从性量表',question:'总体依从性评估',field:'项目字典字段 · 依从性等级',code:'adherence_level',domains:['高依从性 · HIGH']},
    '心理风险关注':{scale:'PHQ-9 抑郁筛查量表',question:'总分评估结果',field:'量表标准字段 · 抑郁严重程度',code:'depression_level',domains:['中度 · MODERATE','中重度 · MODERATE_SEVERE','重度 · SEVERE']},
    '靶向治疗患者':{scale:'治疗方案评估量表',question:'当前治疗方案',field:'项目字典字段 · 治疗方案',code:'treatment_plan',domains:['靶向治疗 · TARGETED','联合靶向治疗 · COMBINED_TARGETED']},
    '高疼痛风险':{scale:'NRS 疼痛评分量表',question:'当前疼痛程度',field:'量表标准字段 · 疼痛程度',code:'pain_level',domains:['重度疼痛 · SEVERE']},
    '老年患者':{scale:'患者基本信息采集',question:'出生日期',field:'患者主数据字段 · 出生日期',code:'birth_date',domains:['年龄 ≥ 65 岁 · AGE_65_PLUS']}
  };
  document.querySelectorAll('#definitions tbody tr').forEach(row=>{
    const link=row.querySelector('td:last-child a'),tag=row.querySelector('td:first-child b').textContent,detail=definitionData[tag];
    link.textContent='查看';link.onclick=e=>{e.preventDefault();const existing=row.nextElementSibling;if(existing?.classList.contains('definition-detail-row')){existing.remove();return}document.querySelectorAll('.definition-detail-row').forEach(x=>x.remove());row.insertAdjacentHTML('afterend',`<tr class="definition-detail-row"><td colspan="7"><div class="definition-expand"><div class="definition-expand-head"><b>${tag} · 关联配置</b><span>标签规则由以下量表问题与标准值域组成</span></div><div class="definition-steps"><div><small>关联量表</small><b>${detail.scale}</b></div><i>→</i><div><small>具体问题</small><b>${detail.question}</b></div><i>→</i><div><small>关联字段</small><b>${detail.field}</b><code>${detail.code}</code></div></div><div class="definition-domains"><b>已关联值域</b>${detail.domains.map(d=>`<span>${d}</span>`).join('')}</div></div></td></tr>`)};
  });
  document.querySelectorAll('#matching tbody tr').forEach(row=>{
    const link=row.querySelector('td:last-child a'),tag=row.querySelector('td:first-child b').textContent;
    link.textContent='查看详情';
    link.onclick=e=>{
      e.preventDefault();
      const existing=row.nextElementSibling;
      if(existing?.classList.contains('match-domain-row')){existing.remove();return}
      document.querySelectorAll('.match-domain-row').forEach(x=>x.remove());
      const domains=domainData[tag]||[];
      row.insertAdjacentHTML('afterend',`<tr class="match-domain-row"><td colspan="7"><div class="domain-expand"><div class="domain-expand-head"><b>${tag} · 值域匹配情况</b><span>展示当前标签规则下各值域的实际匹配患者数</span></div><div class="domain-match-list">${domains.map(d=>`<div class="domain-match"><div><b>${d[0]}</b><small class="code">${d[1]}</small></div><strong>${d[2]} <small>人</small></strong><a href="标签值域患者.html?tag=${encodeURIComponent(tag)}&domain=${encodeURIComponent(d[0])}&code=${encodeURIComponent(d[1])}">查看详情</a></div>`).join('')}</div></div></td></tr>`);
    };
  });
});
