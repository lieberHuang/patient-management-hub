document.addEventListener('DOMContentLoaded',()=>{
  [...document.querySelectorAll('.nav')].find(a=>a.textContent.includes('数据总览'))?.setAttribute('href','数据总览.html');
  const data={
    phq:{name:'PHQ-9 抑郁筛查量表',intro:'慢病管理项目 · 共 9 道题目。以下展示各题目的标准字典和值域。',q:[['题目 1 · 做事时提不起劲或没有兴趣','近两周频率（0–3）','抑郁症状频率','symptom_frequency','完全不会｜0 次｜1 天｜一半以上天数｜几乎每天'],['题目 2 · 感到心情低落、沮丧或绝望','近两周频率（0–3）','抑郁症状频率','symptom_frequency','完全不会｜0 次｜1 天｜一半以上天数｜几乎每天'],['总分评估结果','0–27 分','抑郁严重程度','depression_level','无｜轻度｜中度｜中重度｜重度']]},
    ecog:{name:'ECOG 体力状况评分',intro:'肿瘤随访项目 · 共 1 道题目。依据患者日常活动状态完成评分。',q:[['体力状态评分','0–5 分','体力状态评分','performance_status','完全正常｜轻度受限｜可自理｜部分自理｜卧床＞50%｜死亡']]},
    mms:{name:'用药依从性量表',intro:'慢病管理项目 · 共 8 道题目。各题汇总后生成患者依从性等级。',q:[['总体依从性评估','0–8 分','依从性等级','adherence_level','高依从性｜中等依从性｜低依从性']]},
    nrs:{name:'NRS 疼痛评分量表',intro:'肿瘤随访项目 · 共 1 道题目。按 0–10 分显示疼痛程度分级。',q:[['当前疼痛程度','0–10 分','疼痛程度','pain_level','无痛｜轻度疼痛｜中度疼痛｜重度疼痛']]}
  };const key=new URLSearchParams(location.search).get('scale');const s=data[key]||data.phq;document.title=`${s.name} | 患者管理中台`;document.getElementById('scaleName').textContent=s.name;document.getElementById('scaleIntro').textContent=s.intro;document.getElementById('questions').innerHTML=s.q.map(x=>`<article class="question"><h3>${x[0]}</h3><div class="map"><div class="from">量表填写值：<b>${x[1]}</b></div><div class="arrow">→</div><div class="to"><b>关联字典：${x[2]}</b><span class="code">${x[3]}</span></div></div><div class="domain"><b>同步展示值域</b>${x[4].split('｜').map((z,i)=>` <code>${i}</code> ${z}`).join('　')}</div></article>`).join('');
});
