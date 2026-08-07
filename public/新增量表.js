document.addEventListener('DOMContentLoaded', () => {
  const scales = {
    base: { questions: [{ name: '请问您的性别？', options: ['男', '女', '未说明'] }, { name: '您的最高教育程度是？', options: ['小学及以下', '初中', '高中/中专', '大学及以上'] }] },
    phq: { questions: [{ name: '做事时提不起劲或没有兴趣', options: ['完全不会', '有几天', '一半以上天数', '几乎每天'] }, { name: '感到心情低落、沮丧或绝望', options: ['完全不会', '有几天', '一半以上天数', '几乎每天'] }] },
    ecog: { questions: [{ name: '您的体力状态评分', options: ['0 分', '1 分', '2 分', '3 分', '4 分', '5 分'] }] }
  };
  const fields = {
    common: [
      { code: 'gender', name: '患者主数据 · 性别', desc: '患者基本主数据字段', domains: ['男 · MALE', '女 · FEMALE', '未知 · UNKNOWN'] },
      { code: 'education_level', name: '患者主数据 · 教育程度', desc: '患者基本主数据字段', domains: ['小学及以下 · PRIMARY', '初中 · MIDDLE', '高中/中专 · HIGH_SCHOOL', '大学及以上 · COLLEGE'] },
      { code: 'symptom_frequency', name: '量表标准字段 · 症状发生频率', desc: '通用量表标准字段', domains: ['完全不会 · NONE', '有几天 · SEVERAL_DAYS', '一半以上天数 · HALF_DAYS', '几乎每天 · EVERY_DAY'] },
      { code: 'performance_status', name: '量表标准字段 · 体力状态评分', desc: '通用量表标准字段', domains: ['0 分 · ECOG_0', '1 分 · ECOG_1', '2 分 · ECOG_2', '3 分 · ECOG_3', '4 分 · ECOG_4', '5 分 · ECOG_5'] }
    ],
    '慢病管理项目': [{ code: 'adherence_level', name: '项目字典字段 · 依从性等级', desc: '慢病管理项目患者字典字段', domains: ['高依从性 · HIGH', '中等依从性 · MEDIUM', '低依从性 · LOW'] }],
    '肿瘤随访项目': [{ code: 'disease_subtype', name: '项目字典字段 · 疾病分型', desc: '肿瘤随访项目患者字典字段', domains: ['腺癌 · ADENO', '鳞癌 · SQUAMOUS', '小细胞癌 · SCLC', '其他 · OTHER'] }]
  };
  const project = document.getElementById('project'), scale = document.getElementById('scale');
  document.getElementById('question').closest('label').style.display = 'none';
  document.querySelectorAll('.setup')[1].style.display = 'none';
  document.querySelector('.mappings').style.display = 'none';
  document.querySelector('.setup').insertAdjacentHTML('afterend', '<section class="catalogue"></section>');
  const view = document.querySelector('.catalogue');
  view.className = 'scale-detail show add-scale-detail';
  const availableFields = () => [...fields.common, ...(fields[project.value] || [])];
  function render() {
    const available = availableFields(), questions = scales[scale.value].questions;
    view.innerHTML = `<div class="detail-title"><div><span class="eyebrow">题目字段关联</span><h2>量表题目与字段映射</h2><p>每道题关联一个字段；字段选定后，为该题每个选项配置一个对应值域。</p></div></div>${questions.map((q, qi) => `<article class="question add-question" data-question="${qi}"><div class="add-question-top"><div><span class="question-number">题目 ${qi + 1}</span><h3>${q.name}</h3></div><label>关联字段<select class="field-select"><option value="">请选择关联字段</option>${available.map(f => `<option value="${f.code}">${f.name}</option>`).join('')}</select></label></div><div class="field-map"><div class="from">量表题目：<b>${q.name}</b></div><div class="arrow">→</div><div class="to"><b>待关联字段</b><span>选择字段后展示选项和值域</span></div></div><div class="option-links"></div></article>`).join('')}<div class="note"><b>关联规则：</b>一个量表题目关联一个字段；每个题目选项通过单选下拉框，最多关联一个值域。</div>`;
    view.querySelectorAll('.field-select').forEach(select => select.onchange = () => expand(select));
  }
  function expand(select) {
    const question = select.closest('.add-question'), q = scales[scale.value].questions[question.dataset.question];
    const field = availableFields().find(f => f.code === select.value), map = question.querySelector('.field-map'), options = question.querySelector('.option-links');
    if (!field) { map.innerHTML = `<div class="from">量表题目：<b>${q.name}</b></div><div class="arrow">→</div><div class="to"><b>待关联字段</b><span>选择字段后展示选项和值域</span></div>`; options.innerHTML = ''; return; }
    map.innerHTML = `<div class="from">量表题目：<b>${q.name}</b></div><div class="arrow">→</div><div class="to"><b>关联字段：${field.name}</b><span class="code">${field.code}</span></div>`;
    options.innerHTML = `<div class="field-linked"><b>已关联字段</b><span>${field.desc}</span></div><div class="option-head"><b>题目选项</b><b>关联值域（每个选项最多 1 个）</b></div>${q.options.map((option, oi) => `<div class="option-link"><div><b>${option}</b><small class="code">Q${String(Number(question.dataset.question) + 1).padStart(2, '0')}_O${String(oi + 1).padStart(2, '0')}</small></div><select class="domain-select"><option value="">请选择对应值域</option>${field.domains.map(domain => `<option>${domain}</option>`).join('')}</select><span class="pill gray">未关联</span></div>`).join('')}`;
    options.querySelectorAll('.domain-select').forEach(domain => domain.onchange = () => { const pill = domain.parentElement.querySelector('.pill'); pill.textContent = domain.value ? '已关联' : '未关联'; pill.className = `pill ${domain.value ? 'blue' : 'gray'}`; });
  }
  scale.onchange = render;
  project.onchange = render;
  document.getElementById('save').onclick = () => {
    const fieldSelects = [...view.querySelectorAll('.field-select')], domainSelects = [...view.querySelectorAll('.domain-select')];
    if (fieldSelects.some(x => !x.value) || domainSelects.some(x => !x.value)) { alert('请先完成每道题的字段关联，以及各选项的值域关联。'); return; }
    document.getElementById('saved').classList.add('show');
  };
  render();
});
