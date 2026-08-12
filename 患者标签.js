document.addEventListener('DOMContentLoaded',()=>{
  const scales={慢病管理项目:['PHQ-9 抑郁筛查量表','用药依从性量表'],肿瘤随访项目:['ECOG 体力状况评分','NRS 疼痛评分量表'],真实世界研究项目:['患者基本信息采集']};
  const tagMap={'PHQ-9 抑郁筛查量表':['心理风险关注'],'用药依从性量表':['高依从性患者'],'ECOG 体力状况评分':['体力状态受限'],'NRS 疼痛评分量表':['高疼痛风险'],'患者基本信息采集':['老年患者']};
  const records=[
    {patient:'PT2026080621',project:'慢病管理项目',scale:'PHQ-9 抑郁筛查量表',enroll:'2026-05-18',tag:'心理风险关注',updated:'2026-08-11'},
    {patient:'PT2026080634',project:'慢病管理项目',scale:'用药依从性量表',enroll:'2026-05-22',tag:'高依从性患者',updated:'2026-08-11'},
    {patient:'PT2026080652',project:'肿瘤随访项目',scale:'NRS 疼痛评分量表',enroll:'2026-04-09',tag:'高疼痛风险',updated:'2026-08-10'},
    {patient:'PT2026080676',project:'肿瘤随访项目',scale:'ECOG 体力状况评分',enroll:'2026-04-26',tag:'体力状态受限',updated:'2026-08-10'},
    {patient:'PT2026080703',project:'真实世界研究项目',scale:'患者基本信息采集',enroll:'2026-06-03',tag:'老年患者',updated:'2026-08-09'},
    {patient:'PT2026080621',project:'慢病管理项目',scale:'用药依从性量表',enroll:'2026-05-18',tag:'高依从性患者',updated:'2026-08-09'},
    {patient:'PT2026080718',project:'慢病管理项目',scale:'PHQ-9 抑郁筛查量表',enroll:'2026-06-15',tag:'心理风险关注',updated:'2026-08-08'},
    {patient:'PT2026080735',project:'慢病管理项目',scale:'用药依从性量表',enroll:'2026-06-22',tag:'高依从性患者',updated:'2026-08-08'},
    {patient:'PT2026080751',project:'肿瘤随访项目',scale:'NRS 疼痛评分量表',enroll:'2026-05-07',tag:'高疼痛风险',updated:'2026-08-07'},
    {patient:'PT2026080768',project:'肿瘤随访项目',scale:'ECOG 体力状况评分',enroll:'2026-05-19',tag:'体力状态受限',updated:'2026-08-07'},
    {patient:'PT2026080782',project:'肿瘤随访项目',scale:'NRS 疼痛评分量表',enroll:'2026-06-01',tag:'高疼痛风险',updated:'2026-08-06'},
    {patient:'PT2026080796',project:'真实世界研究项目',scale:'患者基本信息采集',enroll:'2026-06-18',tag:'老年患者',updated:'2026-08-06'},
    {patient:'PT2026080811',project:'真实世界研究项目',scale:'患者基本信息采集',enroll:'2026-07-02',tag:'老年患者',updated:'2026-08-05'},
    {patient:'PT2026080829',project:'慢病管理项目',scale:'PHQ-9 抑郁筛查量表',enroll:'2026-07-08',tag:'心理风险关注',updated:'2026-08-05'},
    {patient:'PT2026080843',project:'慢病管理项目',scale:'用药依从性量表',enroll:'2026-07-14',tag:'高依从性患者',updated:'2026-08-04'},
    {patient:'PT2026080857',project:'肿瘤随访项目',scale:'ECOG 体力状况评分',enroll:'2026-07-21',tag:'体力状态受限',updated:'2026-08-04'}
  ];
  const $=id=>document.querySelector(id),project=$('#project'),scale=$('#scale'),tag=$('#tag'),patientId=$('#patientId'),tagStart=$('#tagStart'),tagEnd=$('#tagEnd');
  const setOptions=(select,items,placeholder)=>{select.innerHTML=`<option value="all">${placeholder}</option>`+items.map(item=>`<option value="${item}">${item}</option>`).join('')};
  const setTagDates=()=>{const enabled=tag.value!=='all';tagStart.disabled=!enabled;tagEnd.disabled=!enabled;$('#tagDateLabel').classList.toggle('disabled',!enabled);if(!enabled){tagStart.value='';tagEnd.value=''}};
  const updateProject=()=>{const items=scales[project.value]||[];setOptions(scale,items,'全部量表');scale.disabled=project.value==='all';setOptions(tag,[],'全部标签');tag.disabled=true;setTagDates()};
  const updateScale=()=>{const items=tagMap[scale.value]||[];setOptions(tag,items,'全部标签');tag.disabled=scale.value==='all';setTagDates()};
  const inside=(date,start,end)=>(!start||date>=start)&&(!end||date<=end);
  const filtered=()=>records.filter(item=>(!patientId.value.trim()||item.patient.toLowerCase().includes(patientId.value.trim().toLowerCase()))&&(project.value==='all'||item.project===project.value)&&(scale.value==='all'||item.scale===scale.value)&&(tag.value==='all'||item.tag===tag.value)&&(tag.value==='all'||inside(item.updated,tagStart.value,tagEnd.value)));
  const render=()=>{const list=filtered(),grouped=new Map();list.forEach(item=>{const current=grouped.get(item.patient)||{...item,tags:[]};if(!current.tags.includes(item.tag))current.tags.push(item.tag);grouped.set(item.patient,current)});const groups=[...grouped.values()];$('#patientTable tbody').innerHTML=groups.map(item=>`<tr><td class="code">${item.patient}</td><td>${item.project}</td><td>${item.enroll}</td><td>${item.tags.map(name=>`<span class="tag-chip">${name}</span>`).join('')}</td><td><a href="患者标签详情.html?patient=${item.patient}">查看详情</a></td></tr>`).join('');$('#patientTotal').textContent=`筛选出 ${groups.length} 位患者`;$('#patientEmpty').hidden=groups.length!==0};
  project.addEventListener('change',()=>{updateProject();render()});scale.addEventListener('change',()=>{updateScale();render()});tag.addEventListener('change',()=>{setTagDates();render()});[patientId,tagStart,tagEnd].forEach(el=>el.addEventListener('input',render));$('#query').addEventListener('click',render);$('#reset').addEventListener('click',()=>{patientId.value='';project.value='all';updateProject();render()});updateProject();render();
});
