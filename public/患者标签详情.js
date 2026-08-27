document.addEventListener('DOMContentLoaded',()=>{
  const patient=new URLSearchParams(location.search).get('patient')||'PT2026080621';
  const allRows=[
    ['PT2026080621','QNR202608110021','PHQ-9 抑郁筛查量表','2026-08-11 09:12','心理风险关注','中重度抑郁'],
    ['PT2026080621','QNR202608090103','用药依从性量表','2026-08-09 15:06','高依从性患者','高依从性'],
    ['PT2026080634','QNR202608110035','用药依从性量表','2026-08-11 10:25','高依从性患者','高依从性'],
    ['PT2026080652','QNR202608100148','NRS 疼痛评分量表','2026-08-10 14:08','高疼痛风险','中度疼痛'],
    ['PT2026080676','QNR202608100162','ECOG 体力状况评分','2026-08-10 16:41','体力状态受限','可自理'],
    ['PT2026080703','QNR202608090087','患者基本信息采集','2026-08-09 11:32','老年患者','65 岁及以上']
  ];
  const rows=allRows.filter(row=>row[0]===patient);if(!rows.length)rows.push([patient,'QNR202608080001','患者基本信息采集','2026-08-08 10:08','老年患者','65 岁及以上']);
  document.querySelector('#name').textContent=`患者详情 · ${patient}`;
  document.querySelector('#records thead th:nth-child(4)').textContent='生效标签 / 值域';
  document.querySelector('#records').innerHTML=rows.map(row=>`<tr><td class="code">${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td><span class="tag-chip">${row[4]} · ${row[5]}</span></td><td><a href="问卷填写记录.html?record=${row[1]}&patient=${patient}&scale=${encodeURIComponent(row[2])}">查看详情</a></td></tr>`).join('');
});
