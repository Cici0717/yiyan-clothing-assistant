"use strict";

const STORAGE_KEY = "yiyan-local-v1";

const materials = [
  {
    id: "cotton",
    name: "棉",
    aliases: ["纯棉", "全棉", "100%棉", "棉100%", "cotton"],
    category: "天然植物纤维",
    accent: "#3158f5",
    summary: "常见的天然纤维，日常衣物中应用广。吸湿与触感是它常被选择的原因，但具体表现也受织法和后整理影响。",
    feel: "通常触感自然、吸湿；面料厚薄和组织不同，体感差异可以很大。",
    strengths: "适合日常和贴身穿着；容易理解、护理信息较常见。",
    tradeoffs: "可能起皱、缩水或干得较慢；不能只凭“棉”判断质量与凉爽程度。",
    scenes: ["日常", "贴身", "通勤"],
    checks: ["查看具体棉含量", "确认是否预缩及洗护方式", "结合克重、织法和版型"],
    sources: ["泉州市市场监管局：常见棉成分标注说明", "CottonWorks：棉织物加工会影响性能"]
  },
  {
    id: "linen",
    name: "亚麻",
    aliases: ["麻", "linen", "亚麻纤维"],
    category: "天然植物纤维",
    accent: "#c78b2d",
    summary: "具有鲜明纹理和较挺的外观，常用于夏季衬衫、裤装和连衣裙。",
    feel: "常见面料带有干爽、挺括与天然纹理；柔软程度会随处理和穿洗变化。",
    strengths: "适合营造自然、利落的夏季外观，织物通常有辨识度。",
    tradeoffs: "容易出现褶皱，有些面料初穿偏硬或偏扎；混纺后表现会改变。",
    scenes: ["夏季", "通勤", "度假"],
    checks: ["区分亚麻与其他麻类", "查看是否混纺", "关注是否透、是否扎肤"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "silk",
    name: "桑蚕丝",
    aliases: ["真丝", "蚕丝", "silk", "桑蚕丝"],
    category: "天然动物纤维",
    accent: "#8f2945",
    summary: "常用于衬衫、裙装和贴身衣物，光泽、垂坠与细腻触感是常见特点。",
    feel: "不同织法下可以轻薄、柔滑，也可以呈现绉感或挺度。",
    strengths: "视觉和触感细腻，适合对垂坠、光泽有要求的穿着。",
    tradeoffs: "洗护通常更讲究，摩擦、汗渍和强光都可能影响使用体验。",
    scenes: ["正式", "轻薄", "贴身"],
    checks: ["查看规范纤维名称与含量", "确认洗护方式", "查看是否容易透或勾丝"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "wool",
    name: "羊毛",
    aliases: ["wool", "美利奴羊毛", "羊毛纤维"],
    category: "天然动物纤维",
    accent: "#6f5545",
    summary: "适用于针织衫、外套和西装等，保暖、弹性与结构感会随纤维和织物变化。",
    feel: "从细腻柔软到明显毛感都有；怕扎的人需要关注具体产品和贴肤方式。",
    strengths: "适合保暖和塑造轮廓，优质产品可兼顾轻量与弹性。",
    tradeoffs: "可能扎肤、起球或需要特殊洗护，不能仅按羊毛比例判断品质。",
    scenes: ["秋冬", "通勤", "保暖"],
    checks: ["确认羊毛比例与其他成分", "查看洗护标签", "留意贴肤感和起球反馈"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "cashmere",
    name: "山羊绒",
    aliases: ["羊绒", "cashmere", "山羊绒"],
    category: "天然动物纤维",
    accent: "#8d725f",
    summary: "细软、轻暖，常见于针织衫和围巾；名称和比例需要以规范标签为准。",
    feel: "通常追求轻、柔和贴肤感，但纱线、织法和后整理会影响成品表现。",
    strengths: "在较轻重量下提供柔软与保暖感，适合精细针织。",
    tradeoffs: "价格、护理和耐磨是常见取舍；低摩擦部位也可能出现起球。",
    scenes: ["秋冬", "贴身", "轻暖"],
    checks: ["区分羊毛与山羊绒", "核对具体比例", "关注摩擦与护理要求"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "viscose",
    name: "粘胶纤维",
    aliases: ["人造棉", "粘纤", "viscose", "rayon"],
    category: "再生纤维素纤维",
    accent: "#27745a",
    summary: "由纤维素原料制成的再生纤维，常见于轻薄、垂坠的上衣、裙装和裤装。",
    feel: "常见产品柔软、垂坠，也可能有较明显的吸湿感。",
    strengths: "容易形成柔和垂坠的外观，适合轻薄单品。",
    tradeoffs: "湿态强度、缩水和起皱表现与具体工艺相关，需要认真看洗护。",
    scenes: ["春夏", "垂坠", "日常"],
    checks: ["确认是否为粘胶及混纺比例", "查看水洗后尺寸反馈", "关注面料是否透"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "modal",
    name: "莫代尔",
    aliases: ["modal", "莫代尔纤维"],
    category: "再生纤维素纤维",
    accent: "#6a5cc5",
    summary: "一种再生纤维素纤维，常与棉或氨纶混纺，用在贴身、家居和柔软针织品类。",
    feel: "常见产品手感柔软、顺滑，具体弹性通常来自结构或氨纶等成分。",
    strengths: "适合追求柔软和垂感的贴身或家居场景。",
    tradeoffs: "“莫代尔”不自动等于耐用或不起球，仍要看比例、克重和织造。",
    scenes: ["家居", "贴身", "柔软"],
    checks: ["查看是否混入氨纶", "关注克重和透度", "查看起球与洗后反馈"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "lyocell",
    name: "莱赛尔",
    aliases: ["天丝", "lyocell", "莱赛尔纤维"],
    category: "再生纤维素纤维",
    accent: "#147f84",
    summary: "再生纤维素纤维的一类，常见商品会强调垂坠、顺滑或凉爽触感。",
    feel: "从柔滑垂坠到牛仔般挺括都可能出现，不能只看纤维名称判断手感。",
    strengths: "适合轻薄衬衫、裙装，也可用于更有结构的混纺面料。",
    tradeoffs: "“天丝”可能涉及商标或商品表达，购买时仍要查看规范成分名称。",
    scenes: ["春夏", "垂坠", "通勤"],
    checks: ["查看标签是否写明莱赛尔", "结合织法与克重", "关注水洗方式"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "polyester",
    name: "聚酯纤维",
    aliases: ["涤纶", "polyester", "聚脂纤维"],
    category: "合成纤维",
    accent: "#48566f",
    summary: "应用广泛的合成纤维，可用于从速干运动服到挺括外套的多种面料。",
    feel: "触感和透气表现变化很大，纱线形态、织法与后整理很关键。",
    strengths: "常见优势包括易打理、耐磨、快干或保持版型。",
    tradeoffs: "部分产品可能闷、静电明显或保留气味，不能把所有聚酯面料视为相同。",
    scenes: ["运动", "易打理", "外套"],
    checks: ["结合用途看结构与后整理", "关注贴肤闷热反馈", "确认是否需要防静电"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  },
  {
    id: "spandex",
    name: "氨纶",
    aliases: ["弹性纤维", "spandex", "elastane", "莱卡"],
    category: "合成纤维",
    accent: "#e05d42",
    summary: "提供弹性的常见纤维，通常以较低比例与棉、聚酯或锦纶等共同使用。",
    feel: "主要影响拉伸和回复，不单独决定柔软、透气或厚薄。",
    strengths: "有助于贴身、活动和版型回复，适合需要弹力的品类。",
    tradeoffs: "比例越高不一定越舒服；高温、长期拉伸和老化会影响弹性。",
    scenes: ["弹力", "贴身", "运动"],
    checks: ["结合主体纤维一起判断", "确认是局部还是整件含有", "查看洗护温度"],
    sources: ["基础选购词条：正式发布前需补充专业来源"]
  }
];

const fitSchemas = {
  top: {
    label: "上衣",
    category: "top",
    note: "上衣比较采用成衣平铺尺寸。胸宽是腋下横向平铺宽度，不等同于人体胸围。",
    fields: [
      { key: "garmentLength", label: "衣长", unit: "cm", positive: "更长", negative: "更短" },
      { key: "chestWidth", label: "胸宽（平铺）", unit: "cm", positive: "更宽", negative: "更窄" },
      { key: "shoulderWidth", label: "肩宽", unit: "cm", positive: "更宽", negative: "更窄" },
      { key: "sleeveLength", label: "袖长", unit: "cm", positive: "更长", negative: "更短" }
    ]
  },
  pants: {
    label: "裤装",
    category: "pants",
    note: "裤外长与裤内长是两种口径；这里分别比较，不会相互换算。腰宽为平铺尺寸。",
    fields: [
      { key: "waistWidth", label: "腰宽（平铺）", unit: "cm", positive: "更宽", negative: "更窄" },
      { key: "hipWidth", label: "臀宽（平铺）", unit: "cm", positive: "更宽", negative: "更窄" },
      { key: "outseam", label: "裤外长", unit: "cm", positive: "更长", negative: "更短" },
      { key: "inseam", label: "裤内长", unit: "cm", positive: "更长", negative: "更短" }
    ]
  },
  shoes: {
    label: "鞋子",
    category: "shoes",
    note: "脚长、鞋垫长和鞋内长不是同一概念。这里只比较相同口径的记录，并保留鞋型差异。",
    fields: [
      { key: "footLength", label: "适配脚长", unit: "cm", positive: "更长", negative: "更短" },
      { key: "insoleLength", label: "鞋垫长", unit: "cm", positive: "更长", negative: "更短" },
      { key: "shoeWidth", label: "前掌宽", unit: "cm", positive: "更宽", negative: "更窄" }
    ]
  }
};

const paletteLibrary = {
  warm: [
    { name: "焦糖与海军蓝", colors: [["海军蓝", "#13233f"], ["焦糖", "#b86d31"], ["奶油白", "#f1e5d1"], ["橄榄绿", "#66734a"]], copy: "用海军蓝压住暖色的浓度，焦糖放在靠近面部的小面积单品或配饰上。" },
    { name: "番茄红与燕麦", colors: [["番茄红", "#c44736"], ["燕麦", "#d7c4a4"], ["巧克力", "#4c3028"], ["暖白", "#f7f0e5"]], copy: "适合想要明亮但不跳脱的场景，用深棕替代纯黑会更连贯。" },
    { name: "琥珀与墨绿", colors: [["琥珀", "#d0942b"], ["墨绿", "#163f38"], ["砖红", "#8c3d35"], ["炭灰", "#34383d"]], copy: "把饱和色控制在一件主角单品，其他颜色用于稳定整体。" }
  ],
  cool: [
    { name: "钴蓝与冷白", colors: [["钴蓝", "#2b57d9"], ["冷白", "#f4f6f8"], ["石墨", "#363b47"], ["莓红", "#8f294f"]], copy: "高对比但仍清爽，适合用直线条和简洁材质强化利落感。" },
    { name: "梅子与雾灰", colors: [["梅子", "#6f345d"], ["雾灰", "#aeb6c2"], ["冰蓝", "#b8d8e8"], ["深蓝", "#18243c"]], copy: "把柔和色放在大面积，深色用于鞋包或外套形成轮廓。" },
    { name: "松石与黑", colors: [["松石", "#147f84"], ["墨黑", "#171a20"], ["银灰", "#c5cad1"], ["紫罗兰", "#604c9c"]], copy: "适合鲜明有力量的表达，一次选择一个高饱和色即可。" }
  ],
  neutral: [
    { name: "靛蓝与米灰", colors: [["靛蓝", "#243b75"], ["米灰", "#d9d5cc"], ["陶土", "#a9543f"], ["墨色", "#242830"]], copy: "冷暖各保留一个支点，日常穿搭容易与已有衣物衔接。" },
    { name: "酒红与驼色", colors: [["酒红", "#7d263d"], ["驼色", "#b68c60"], ["象牙", "#f2eee5"], ["深棕", "#3e302b"]], copy: "低饱和而有层次，适合通勤和需要稳重感的场景。" },
    { name: "森林绿与蓝灰", colors: [["森林绿", "#285745"], ["蓝灰", "#728399"], ["暖白", "#f4efe4"], ["芥末", "#c6922e"]], copy: "自然色作为主体，小面积芥末色能让整体更有精神。" }
  ]
};

const categoryLabels = { top: "上衣", pants: "裤装", shoes: "鞋子", other: "其他" };

let appState = loadState();
let currentFitType = "top";
let selectedMaterials = [];
let toastTimer;

function defaultState() {
  return { wardrobe: [], profile: {}, favorites: [], comparisons: [], referenceId: "" };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, wardrobe: Array.isArray(parsed.wardrobe) ? parsed.wardrobe : [] };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {
    showToast("保存失败：当前浏览器可能限制了本地存储。");
  }
  renderAllDataViews();
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uid(prefix = "item") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function navigate(route) {
  const valid = document.querySelector(`[data-page="${route}"]`) ? route : "home";
  document.querySelectorAll(".page").forEach((page) => {
    const active = page.dataset.page === valid;
    page.classList.toggle("is-active", active);
    page.hidden = !active;
  });
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === valid && (button.classList.contains("nav-item") || button.closest(".mobile-nav")));
  });
  if (location.hash !== `#${valid}`) history.replaceState(null, "", `#${valid}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.title = `${routeTitle(valid)}｜衣研`;
}

function routeTitle(route) {
  return { home: "首页", materials: "材质百科", label: "标签解读", fit: "尺寸参谋", style: "配色与风格", wardrobe: "我的衣橱", profile: "个人档案" }[route] || "衣研";
}

function renderMaterialCards(query = "", category = "all") {
  const needle = query.trim().toLowerCase();
  const filtered = materials.filter((item) => {
    const matchesText = !needle || [item.name, item.category, item.summary, ...item.aliases, ...item.scenes].join(" ").toLowerCase().includes(needle);
    return matchesText && (category === "all" || item.category === category);
  });
  const grid = document.querySelector("#material-grid");
  grid.innerHTML = filtered.length ? filtered.map((item) => `
    <article class="material-card" style="--accent:${item.accent}">
      <div class="material-card-top"><span class="tag">${esc(item.category)}</span><label class="compare-check"><input type="checkbox" data-compare-material="${item.id}" ${selectedMaterials.includes(item.id) ? "checked" : ""}/> 比较</label></div>
      <h3>${esc(item.name)}</h3>
      <p class="material-alias">也可能看到：${esc(item.aliases.slice(0, 3).join("、"))}</p>
      <p>${esc(item.summary)}</p>
      <div class="tag-row">${item.scenes.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div>
      <div class="material-actions"><button type="button" data-open-material="${item.id}">查看选购要点</button></div>
    </article>`).join("") : `<div class="empty-state" style="grid-column:1/-1"><span class="empty-mark">?</span><strong>没有找到对应词条</strong><p>换一个常见名称试试，或回到标签解读查看商品用语。</p></div>`;
  document.querySelector("#material-count").textContent = filtered.length;
  bindMaterialCardEvents();
}

function bindMaterialCardEvents() {
  document.querySelectorAll("[data-open-material]").forEach((button) => button.addEventListener("click", () => openMaterial(button.dataset.openMaterial)));
  document.querySelectorAll("[data-compare-material]").forEach((checkbox) => checkbox.addEventListener("change", () => toggleMaterialCompare(checkbox.dataset.compareMaterial, checkbox.checked)));
}

function openMaterial(id) {
  const item = materials.find((material) => material.id === id);
  if (!item) return;
  const content = document.querySelector("#material-dialog-content");
  content.innerHTML = `
    <article class="material-detail" style="--accent:${item.accent}">
      <header class="material-detail-header"><p class="eyebrow">${esc(item.category)}</p><h2>${esc(item.name)}</h2><p>${esc(item.aliases.join(" · "))}</p></header>
      <section class="detail-section"><p>${esc(item.summary)}</p></section>
      <div class="detail-columns">
        <section class="detail-box"><strong>常见体感</strong><p>${esc(item.feel)}</p></section>
        <section class="detail-box"><strong>可能的优势</strong><p>${esc(item.strengths)}</p></section>
        <section class="detail-box"><strong>需要接受的取舍</strong><p>${esc(item.tradeoffs)}</p></section>
        <section class="detail-box"><strong>常见场景</strong><p>${esc(item.scenes.join("、"))}</p></section>
      </div>
      <section class="detail-section"><h3>购买前再看三件事</h3><ol>${item.checks.map((check) => `<li>${esc(check)}</li>`).join("")}</ol></section>
      <section class="detail-section"><h3>来源与内容状态</h3><ul class="source-list">${item.sources.map((source) => `<li>${esc(source)}</li>`).join("")}</ul><p class="helper">以上为选购导向的基础概括，不能代替对具体商品的检测或试穿。</p></section>
    </article>`;
  document.querySelector("#material-dialog").showModal();
}

function toggleMaterialCompare(id, checked) {
  if (checked && !selectedMaterials.includes(id)) {
    if (selectedMaterials.length >= 3) {
      showToast("最多同时比较 3 种材质。");
      renderMaterialCards(document.querySelector("#material-search").value, document.querySelector("#material-filter").value);
      return;
    }
    selectedMaterials.push(id);
  } else if (!checked) {
    selectedMaterials = selectedMaterials.filter((item) => item !== id);
  }
  renderCompareSelection();
}

function renderCompareSelection() {
  const container = document.querySelector("#compare-selection");
  const selected = selectedMaterials.map((id) => materials.find((item) => item.id === id)).filter(Boolean);
  container.innerHTML = selected.length ? selected.map((item) => `<div class="compare-chip"><span>${esc(item.name)}</span><button type="button" data-remove-compare="${item.id}" aria-label="移除${esc(item.name)}">×</button></div>`).join("") : `<p class="empty-copy">还没有选择材质。</p>`;
  document.querySelector("#show-compare").disabled = selected.length < 2;
  container.querySelectorAll("[data-remove-compare]").forEach((button) => button.addEventListener("click", () => {
    selectedMaterials = selectedMaterials.filter((id) => id !== button.dataset.removeCompare);
    renderMaterialCards(document.querySelector("#material-search").value, document.querySelector("#material-filter").value);
    renderCompareSelection();
  }));
}

function showMaterialCompare() {
  const selected = selectedMaterials.map((id) => materials.find((item) => item.id === id)).filter(Boolean);
  if (selected.length < 2) return;
  const output = document.querySelector("#material-compare-output");
  const rows = [
    ["常见体感", "feel"],
    ["可能优势", "strengths"],
    ["主要取舍", "tradeoffs"],
    ["选购检查", "checks"]
  ];
  output.innerHTML = `<table class="compare-table"><thead><tr><th>比较维度</th>${selected.map((item) => `<th>${esc(item.name)}<br/><small>${esc(item.category)}</small></th>`).join("")}</tr></thead><tbody>${rows.map(([label, key]) => `<tr><td><strong>${label}</strong></td>${selected.map((item) => `<td>${esc(Array.isArray(item[key]) ? item[key].join("；") : item[key])}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  output.hidden = false;
  output.scrollIntoView({ behavior: "smooth", block: "start" });
}

function analyzeLabelText(text) {
  const clean = text.replaceAll("％", "%").trim();
  const components = [];
  const segments = clean.split(/[；;\n]/).map((item) => item.trim()).filter(Boolean);
  let currentPart = "未注明部位";

  segments.forEach((segment) => {
    const partMatch = segment.match(/(面料|里料|填充物|配料|袖子|主体|装饰部分)/);
    if (partMatch) currentPart = partMatch[1];
    const patterns = [
      /([\u4e00-\u9fa5A-Za-z·]+)\s*(\d{1,3}(?:\.\d+)?)\s*%/g,
      /(\d{1,3}(?:\.\d+)?)\s*%\s*([\u4e00-\u9fa5A-Za-z·]+)/g
    ];
    patterns.forEach((pattern, index) => {
      for (const match of segment.matchAll(pattern)) {
        const name = (index === 0 ? match[1] : match[2]).replace(/^(面料|里料|填充物|配料|主体)/, "");
        const percent = Number(index === 0 ? match[2] : match[1]);
        if (name && percent <= 100 && !components.some((item) => item.name === name && item.percent === percent && item.part === currentPart)) components.push({ name, percent, part: currentPart });
      }
    });
  });

  if (/(纯棉|全棉)/.test(clean) && !components.some((item) => /棉/.test(item.name))) components.push({ name: "棉", percent: 100, part: currentPart, inferredFromStandardTerm: true });
  const flags = [];
  if (/(云朵棉|生态棉|羽绒棉|科技棉|冰丝|牛奶丝)/.test(clean)) flags.push("文本中含有商品或市场常用名称。它们本身不足以说明规范纤维成分，需要回到水洗标核对。");
  if (/(纯棉|全棉|100\s*%\s*棉|棉\s*100\s*%)/.test(clean)) flags.push("出现了单一棉纤维的常见规范表达；文字顺序不构成真假依据。");
  if (!/(面料|里料|填充物|配料|主体)/.test(clean)) flags.push("没有明确区分面料、里料或填充物；如果商品有多个部位，建议向商家确认各部分成分。");
  if (!components.length) flags.push("暂未识别到明确的“纤维名称＋比例”。可以按水洗标原样补充百分比，或直接搜索相关材质词。");

  const sums = {};
  components.forEach((item) => { sums[item.part] = (sums[item.part] || 0) + item.percent; });
  Object.entries(sums).forEach(([part, sum]) => {
    if (sum > 100.01) flags.push(`${part}中识别出的比例合计为 ${sum}%，请检查原文或识别结果。`);
    if (sum < 99.5 && components.filter((item) => item.part === part).length > 1) flags.push(`${part}中已识别比例合计为 ${sum}%，可能还有成分未录入。`);
  });
  if (!flags.length) flags.push("成分和比例目前没有明显冲突；克重、织法、版型、后整理和实物体验仍需结合商品信息或试穿判断。");
  return { components, flags };
}

function renderLabelResult() {
  const input = document.querySelector("#label-input").value.trim();
  if (!input) {
    showToast("请先输入标签或商品描述。");
    document.querySelector("#label-input").focus();
    return;
  }
  const { components, flags } = analyzeLabelText(input);
  const result = document.querySelector("#label-result");
  result.className = "label-analysis";
  result.innerHTML = `
    <section class="analysis-block"><h3>识别出的成分</h3>${components.length ? `<div class="component-list">${components.map((item) => `<span class="component-pill">${esc(item.part)} · ${esc(item.name)} <strong>${item.percent}%</strong></span>`).join("")}</div>` : `<p>暂未识别到带比例的规范成分。</p>`}</section>
    <section class="analysis-block"><h3>目前可以判断</h3><p>${components.length ? `原文提供了 ${components.length} 条成分信息。它们描述的是标签内容，不等同于对实物的检测结论。` : "可以保留原文继续核对，但现有信息不足以比较具体成分比例。"}</p></section>
    <section class="analysis-block"><h3>仍需确认</h3><ul>${flags.map((flag) => `<li>${esc(flag)}</li>`).join("")}</ul></section>
    <section class="analysis-block"><h3>下一步</h3><p>${components.length ? "结合衣物品类、织法、厚薄和洗护说明判断是否适合你的场景；如宣传页与水洗标不一致，保留两者原文并向商家确认。" : "查看衣物内侧水洗标，把纤维名称、比例和对应部位按原样补充进来。"}</p></section>`;
}

function renderFitFields(type = currentFitType) {
  const schema = fitSchemas[type];
  ["reference", "target"].forEach((role) => {
    const container = document.querySelector(`#${role}-fields`);
    container.innerHTML = schema.fields.map((field) => `<label class="field"><span>${esc(field.label)}（${field.unit}）</span><input type="number" step="0.1" min="0" data-measure-role="${role}" data-measure-key="${field.key}" placeholder="—" /></label>`).join("");
  });
  renderReferenceOptions();
}

function renderReferenceOptions() {
  const select = document.querySelector("#reference-record");
  const relevant = appState.wardrobe.filter((item) => item.category === fitSchemas[currentFitType].category);
  select.innerHTML = `<option value="">手动填写</option>${relevant.map((item) => `<option value="${esc(item.id)}">${esc(item.name)}${item.size ? ` · ${esc(item.size)}` : ""}</option>`).join("")}`;
  if (relevant.some((item) => item.id === appState.referenceId)) {
    select.value = appState.referenceId;
    fillReferenceFromRecord(appState.referenceId);
  }
}

function fillReferenceFromRecord(id) {
  const record = appState.wardrobe.find((item) => item.id === id);
  document.querySelectorAll('[data-measure-role="reference"]').forEach((input) => {
    input.value = record?.measurements?.[input.dataset.measureKey] ?? "";
  });
}

function collectMeasures(role) {
  const values = {};
  document.querySelectorAll(`[data-measure-role="${role}"]`).forEach((input) => {
    const value = Number(input.value);
    if (input.value !== "" && Number.isFinite(value)) values[input.dataset.measureKey] = value;
  });
  return values;
}

function compareFit() {
  const schema = fitSchemas[currentFitType];
  const reference = collectMeasures("reference");
  const target = collectMeasures("target");
  const differences = schema.fields.filter((field) => reference[field.key] != null && target[field.key] != null).map((field) => ({ ...field, ref: reference[field.key], target: target[field.key], diff: +(target[field.key] - reference[field.key]).toFixed(1) }));
  if (!differences.length) {
    showToast("请至少填写一组相同口径的参照值和商品值。");
    return;
  }
  const targetName = document.querySelector("#target-name").value.trim() || `未命名${schema.label}`;
  const targetSize = document.querySelector("#target-size").value.trim();
  const result = document.querySelector("#fit-result");
  result.className = "fit-result has-result";
  result.innerHTML = `<h2>${esc(targetName)}${targetSize ? ` · ${esc(targetSize)}` : ""}</h2><div class="difference-grid">${differences.map((item) => {
    const direction = item.diff === 0 ? "与参照相同" : `${Math.abs(item.diff)} ${item.unit} ${item.diff > 0 ? item.positive : item.negative}`;
    return `<div class="difference-card"><span>${esc(item.label)}</span><strong>${item.diff > 0 ? "+" : ""}${item.diff} ${item.unit}</strong><small>${esc(direction)}（${item.ref} → ${item.target}）</small></div>`;
  }).join("")}</div><p class="result-caveat">${esc(schema.note)} 结果描述尺寸差异，不等同于保证合身；版型、弹性和穿着目标仍需结合判断。</p><button id="save-comparison" class="secondary-button" type="button" style="margin-top:16px">保存本次比较</button>`;
  document.querySelector("#save-comparison").addEventListener("click", () => {
    appState.comparisons.unshift({ id: uid("compare"), type: currentFitType, targetName, targetSize, date: new Date().toISOString(), differences: differences.map(({ key, label, diff, unit }) => ({ key, label, diff, unit })) });
    appState.comparisons = appState.comparisons.slice(0, 12);
    saveState();
    showToast("比较已保存，可在下方继续查看。");
  });
}

function renderComparisons() {
  const container = document.querySelector("#comparison-list");
  if (!appState.comparisons.length) {
    container.innerHTML = `<p class="empty-copy">还没有保存比较。完成一次尺寸比较后，可以把结果留在这里。</p>`;
    return;
  }
  container.innerHTML = appState.comparisons.slice(0, 6).map((item) => `<article class="comparison-item"><small>${esc(fitSchemas[item.type]?.label || "服饰")} · ${new Date(item.date).toLocaleDateString("zh-CN")}</small><strong>${esc(item.targetName)}${item.targetSize ? ` · ${esc(item.targetSize)}` : ""}</strong><small>${item.differences.map((d) => `${esc(d.label)} ${d.diff > 0 ? "+" : ""}${d.diff}${esc(d.unit)}`).join("；")}</small><button type="button" data-delete-comparison="${item.id}">删除</button></article>`).join("");
  container.querySelectorAll("[data-delete-comparison]").forEach((button) => button.addEventListener("click", () => {
    appState.comparisons = appState.comparisons.filter((item) => item.id !== button.dataset.deleteComparison);
    saveState();
  }));
}

function generatePalettes(formData) {
  const undertone = formData.get("undertone") || "neutral";
  const occasion = formData.get("occasion") || "commute";
  const mood = formData.get("mood") || "clean";
  const occasionCopy = { commute: "适合通勤：让主色稳定，亮色集中在一件单品。", casual: "适合日常：可以用材质差异让相近色更有层次。", social: "适合社交：选择一个离脸较近的亮点色，其他颜色保持简洁。" }[occasion];
  const moodCopy = { clean: "优先清晰轮廓与少量颜色。", soft: "降低对比度，用相邻色或柔软材质连接。", bold: "保留一个高饱和主角色，并用深色收住整体。" }[mood];
  return paletteLibrary[undertone].map((item, index) => ({ ...item, id: `${undertone}-${index}`, copy: `${item.copy} ${occasionCopy} ${moodCopy}` }));
}

function renderPalettes(items = generatePalettes(new FormData(document.querySelector("#style-form")))) {
  const container = document.querySelector("#palette-results");
  container.innerHTML = items.map((item) => {
    const favorite = appState.favorites.some((fav) => fav.id === item.id);
    return `<article class="palette-card"><div class="swatch-row">${item.colors.map(([name, color]) => `<div class="swatch" style="background:${color}">${esc(name)}</div>`).join("")}</div><div class="palette-body"><h3>${esc(item.name)}</h3><p>${esc(item.copy)}</p><div class="palette-footer"><span class="palette-source">基于本次选择生成的尝试方向</span><button class="favorite-button ${favorite ? "is-favorite" : ""}" type="button" data-favorite-palette="${item.id}">${favorite ? "已收藏" : "收藏这组"}</button></div></div></article>`;
  }).join("");
  container.querySelectorAll("[data-favorite-palette]").forEach((button) => button.addEventListener("click", () => toggleFavorite(button.dataset.favoritePalette, items)));
}

function toggleFavorite(id, currentItems) {
  const existing = appState.favorites.find((item) => item.id === id);
  if (existing) appState.favorites = appState.favorites.filter((item) => item.id !== id);
  else {
    const item = currentItems.find((palette) => palette.id === id);
    if (item) appState.favorites.push(item);
  }
  saveState();
  renderPalettes(currentItems);
}

function renderRecordMeasurements(category, values = {}) {
  const container = document.querySelector("#record-measurements");
  const type = ["top", "pants", "shoes"].includes(category) ? category : "top";
  const schema = fitSchemas[type];
  container.innerHTML = `<p class="helper" style="grid-column:1/-1;margin:0">可选尺寸 · ${esc(schema.note)}</p>${schema.fields.map((field) => `<label class="field"><span>${esc(field.label)}（${field.unit}）</span><input name="measure_${field.key}" type="number" min="0" step="0.1" value="${esc(values[field.key] ?? "")}" /></label>`).join("")}`;
}

function openRecordDialog(record = null) {
  const dialog = document.querySelector("#record-dialog");
  const form = document.querySelector("#record-form");
  form.reset();
  form.elements.id.value = record?.id || "";
  form.elements.name.value = record?.name || "";
  form.elements.brand.value = record?.brand || "";
  form.elements.category.value = record?.category || "top";
  form.elements.size.value = record?.size || "";
  form.elements.status.value = record?.status || "owned";
  form.elements.material.value = record?.material || "";
  form.elements.scenario.value = record?.scenario || "";
  form.elements.fit.value = record?.fit || "";
  form.elements.comfort.value = record?.comfort || "";
  form.elements.repurchase.value = record?.repurchase || "unknown";
  form.elements.link.value = record?.link || "";
  form.elements.notes.value = record?.notes || "";
  document.querySelector("#record-dialog-title").textContent = record ? "编辑穿着记录" : "添加一件记录";
  renderRecordMeasurements(form.elements.category.value, record?.measurements || {});
  dialog.showModal();
}

function saveRecordFromForm(form) {
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const category = data.get("category");
  const type = ["top", "pants", "shoes"].includes(category) ? category : "top";
  const measurements = {};
  fitSchemas[type].fields.forEach((field) => {
    const raw = data.get(`measure_${field.key}`);
    if (raw !== "" && raw != null) measurements[field.key] = Number(raw);
  });
  const id = data.get("id") || uid("wear");
  const existing = appState.wardrobe.find((item) => item.id === id);
  const record = {
    id,
    name: String(data.get("name") || "").trim(),
    brand: String(data.get("brand") || "").trim(),
    category,
    size: String(data.get("size") || "").trim(),
    status: data.get("status"),
    material: String(data.get("material") || "").trim(),
    scenario: String(data.get("scenario") || "").trim(),
    fit: data.get("fit"),
    comfort: data.get("comfort"),
    repurchase: data.get("repurchase"),
    link: String(data.get("link") || "").trim(),
    notes: String(data.get("notes") || "").trim(),
    measurements,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    demo: existing?.demo || false
  };
  const index = appState.wardrobe.findIndex((item) => item.id === id);
  if (index >= 0) appState.wardrobe[index] = record;
  else appState.wardrobe.unshift(record);
  document.querySelector("#record-dialog").close();
  saveState();
  showToast(index >= 0 ? "记录已更新。" : "已经放进你的衣橱记录。");
}

function recordSearchMatch(record, query, filter) {
  const text = [record.name, record.brand, record.material, record.scenario, record.notes].join(" ").toLowerCase();
  return (!query || text.includes(query.toLowerCase())) && (filter === "all" || record.category === filter);
}

function safeLink(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

function renderWardrobe() {
  const query = document.querySelector("#wardrobe-search")?.value.trim() || "";
  const filter = document.querySelector("#wardrobe-filter")?.value || "all";
  const items = appState.wardrobe.filter((record) => recordSearchMatch(record, query, filter));
  const list = document.querySelector("#wardrobe-list");
  renderWardrobeSummary();
  if (!appState.wardrobe.length) {
    list.innerHTML = `<div class="wardrobe-empty"><div><p class="eyebrow">从一件熟悉的衣服开始</p><h2>记录“穿起来怎样”，比只记尺码更有用</h2><p>先选一件长度满意或材质舒服的衣服，把标签、尺寸和体感留在这里。以后看新商品时，它就能成为参照。</p><button class="primary-button" type="button" data-empty-add>添加第一件</button></div><div class="demo-card"><span class="tag">示例，不是你的数据</span><h3>蓝色落肩 T 恤 · M</h3><p>棉 95%，氨纶 5%<br/>衣长 62 cm · 胸宽 52 cm<br/>反馈：长度刚好，室内穿不闷，愿意回购。</p><button class="secondary-button" type="button" data-add-demo>把示例加入衣橱试用</button></div></div>`;
    list.querySelector("[data-empty-add]").addEventListener("click", () => openRecordDialog());
    list.querySelector("[data-add-demo]").addEventListener("click", addDemoRecord);
    return;
  }
  if (!items.length) {
    list.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="empty-mark">?</span><strong>没有符合条件的记录</strong><p>清空搜索词或换一个品类试试。</p></div>`;
    return;
  }
  list.innerHTML = items.map((item) => {
    const reference = appState.referenceId === item.id;
    const link = safeLink(item.link);
    return `<article class="wardrobe-card ${item.demo ? "demo" : ""}"><div class="card-status"><span>${esc(categoryLabels[item.category] || "其他")} · ${item.status === "considering" ? "正在考虑" : "已经买过"}${item.demo ? " · 示例" : ""}</span>${reference ? `<span class="status-label reference">当前参照</span>` : ""}</div><h3>${esc(item.name)}</h3><p class="brand-line">${esc(item.brand || "未记录品牌")}${item.size ? ` · 尺码 ${esc(item.size)}` : ""}</p><p class="material-line">${esc(item.material || "还没有记录材质")}</p><div class="wardrobe-feedback">${item.fit ? `<span class="feedback-pill">合身：${esc(item.fit)}</span>` : ""}${item.comfort ? `<span class="feedback-pill">体感：${esc(item.comfort)}</span>` : ""}${item.repurchase === "yes" ? `<span class="feedback-pill">愿意回购</span>` : item.repurchase === "no" ? `<span class="feedback-pill">不再回购</span>` : ""}</div>${item.notes ? `<p class="notes">${esc(item.notes)}</p>` : ""}<div class="card-actions"><button type="button" data-set-reference="${item.id}">${reference ? "已设为参照" : "设为参照"}</button><button type="button" data-edit-record="${item.id}">编辑</button>${link ? `<a href="${esc(link)}" target="_blank" rel="noreferrer">商品链接</a>` : ""}<button class="delete-action" type="button" data-delete-record="${item.id}">删除</button></div></article>`;
  }).join("");
  bindWardrobeActions();
}

function bindWardrobeActions() {
  document.querySelectorAll("[data-set-reference]").forEach((button) => button.addEventListener("click", () => {
    appState.referenceId = button.dataset.setReference;
    saveState();
    showToast("已设为尺寸比较的优先参照。");
  }));
  document.querySelectorAll("[data-edit-record]").forEach((button) => button.addEventListener("click", () => openRecordDialog(appState.wardrobe.find((item) => item.id === button.dataset.editRecord))));
  document.querySelectorAll("[data-delete-record]").forEach((button) => button.addEventListener("click", () => {
    const record = appState.wardrobe.find((item) => item.id === button.dataset.deleteRecord);
    if (!record || !confirm(`确定删除“${record.name}”吗？`)) return;
    appState.wardrobe = appState.wardrobe.filter((item) => item.id !== record.id);
    if (appState.referenceId === record.id) appState.referenceId = "";
    saveState();
    showToast("记录已删除。");
  }));
}

function addDemoRecord() {
  appState.wardrobe.unshift({ id: uid("demo"), name: "蓝色落肩 T 恤", brand: "示例品牌", category: "top", size: "M", status: "owned", material: "棉 95%，氨纶 5%", scenario: "夏季日常", fit: "刚好", comfort: "舒服", repurchase: "yes", link: "", notes: "示例数据：长度刚好，室内穿不闷，洗后暂未记录明显变化。", measurements: { garmentLength: 62, chestWidth: 52, shoulderWidth: 48, sleeveLength: 21 }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), demo: true });
  saveState();
  showToast("示例已加入，并明确标记为示例数据。");
}

function renderWardrobeSummary() {
  const items = appState.wardrobe;
  const owned = items.filter((item) => item.status === "owned").length;
  const comfortable = items.filter((item) => item.comfort === "舒服").length;
  const repurchase = items.filter((item) => item.repurchase === "yes").length;
  const uniqueMaterials = new Set(items.map((item) => item.material).filter(Boolean)).size;
  document.querySelector("#wardrobe-summary").innerHTML = [
    [items.length, "全部记录", "#3158f5"], [owned, "已经买过", "#27745a"], [comfortable, "舒服的单品", "#d5962d"], [repurchase, "愿意回购", "#8f2945"]
  ].map(([value, label, color]) => `<div class="summary-tile" style="--tile:${color}"><strong>${value}</strong><span>${label}</span></div>`).join("");
  document.querySelector("#mobile-count").textContent = items.length;
  void uniqueMaterials;
}

function renderHomeSnapshot() {
  const items = appState.wardrobe.filter((item) => !item.demo);
  const comfortable = items.filter((item) => item.comfort === "舒服").length;
  const comparisons = appState.comparisons.length;
  const favorites = appState.favorites.length;
  document.querySelector("#home-snapshot").innerHTML = `<div class="snapshot-metric"><strong>${items.length}</strong><span>件真实记录</span></div><div class="snapshot-metric"><strong>${comfortable}</strong><span>件穿着舒服</span></div><div class="snapshot-metric"><strong>${comparisons}</strong><span>次尺寸比较</span></div><p class="snapshot-message">${items.length ? `你已经积累了 ${items.length} 件真实单品的线索。继续记录穿着场景和洗后表现，结论会更可靠。` : "目前还没有你的真实记录。可以从一件最满意的衣服开始，示例数据不会计入个人统计。"}${favorites ? ` 另有 ${favorites} 组收藏配色。` : ""}</p>`;
}

function loadProfileForm() {
  const form = document.querySelector("#profile-form");
  const profile = appState.profile || {};
  form.reset();
  ["height", "bust", "waist", "hip", "footLength", "measuredAt", "nickname", "fitPreference", "carePreference", "heatSensitivity", "itchSensitivity", "wrinkleConcern", "notes"].forEach((key) => {
    if (form.elements[key] && profile[key] != null) form.elements[key].value = profile[key];
  });
  form.querySelectorAll('input[name="scenarios"]').forEach((input) => { input.checked = (profile.scenarios || []).includes(input.value); });
  updateRangeOutputs();
}

function saveProfile(form) {
  const data = new FormData(form);
  appState.profile = {
    height: data.get("height"), bust: data.get("bust"), waist: data.get("waist"), hip: data.get("hip"), footLength: data.get("footLength"), measuredAt: data.get("measuredAt"), nickname: String(data.get("nickname") || "").trim(), fitPreference: data.get("fitPreference"), carePreference: data.get("carePreference"), scenarios: data.getAll("scenarios"), heatSensitivity: data.get("heatSensitivity"), itchSensitivity: data.get("itchSensitivity"), wrinkleConcern: data.get("wrinkleConcern"), notes: String(data.get("notes") || "").trim()
  };
  saveState();
  const status = document.querySelector("#profile-status");
  status.textContent = "已保存在当前浏览器";
  setTimeout(() => { status.textContent = ""; }, 2500);
}

function updateRangeOutputs() {
  document.querySelectorAll('.preference-sliders input[type="range"]').forEach((input) => {
    input.closest("label").querySelector("output").textContent = input.value;
  });
}

function exportData() {
  const payload = { product: "衣研", version: 1, exportedAt: new Date().toISOString(), data: appState };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `衣研本地备份_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("备份文件已导出。");
}

async function importData(file) {
  try {
    const payload = JSON.parse(await file.text());
    const data = payload.data || payload;
    if (!data || !Array.isArray(data.wardrobe)) throw new Error("invalid");
    if (!confirm("导入会替换当前浏览器中的衣研数据，是否继续？")) return;
    appState = { ...defaultState(), ...data };
    saveState();
    loadProfileForm();
    renderPalettes();
    showToast("备份已导入。");
  } catch {
    showToast("导入失败：这不是有效的衣研备份文件。");
  }
}

function renderAllDataViews() {
  renderWardrobe();
  renderComparisons();
  renderReferenceOptions();
  renderHomeSnapshot();
  document.querySelector("#favorite-count").textContent = appState.favorites.length;
}

function handleGlobalSearch(term) {
  const query = term.trim().toLowerCase();
  const output = document.querySelector("#home-search-results");
  if (!query) { output.innerHTML = ""; return; }
  const material = materials.find((item) => [item.name, ...item.aliases].some((alias) => alias.toLowerCase().includes(query) || query.includes(alias.toLowerCase())));
  if (material) {
    output.innerHTML = `<div class="search-result-mini"><div><strong>${esc(material.name)}</strong><small>${esc(material.summary)}</small></div><button class="secondary-button" type="button" data-home-open-material="${material.id}">查看</button></div>`;
    output.querySelector("button").addEventListener("click", () => openMaterial(material.id));
    return;
  }
  if (/%|纯棉|全棉|标签|成分/.test(query)) {
    output.innerHTML = `<div class="search-result-mini"><div><strong>更像是一张标签或成分问题</strong><small>到标签解读中粘贴完整原文，会比只查一个词更准确。</small></div><button class="secondary-button" type="button" data-go-label>去解读</button></div>`;
    output.querySelector("button").addEventListener("click", () => { navigate("label"); document.querySelector("#label-input").value = term; });
    return;
  }
  if (/裤长|衣长|胸宽|腰宽|尺码|鞋/.test(query)) {
    output.innerHTML = `<div class="search-result-mini"><div><strong>这是一个尺寸比较问题</strong><small>准备一件穿着效果已知的同类衣物，会得到更有用的差异说明。</small></div><button class="secondary-button" type="button" data-go-fit>去比较</button></div>`;
    output.querySelector("button").addEventListener("click", () => navigate("fit"));
    return;
  }
  output.innerHTML = `<div class="search-result-mini"><div><strong>暂时没有对应词条</strong><small>可以到材质百科查看相近名称，或在标签解读中保留原文继续分析。</small></div><button class="secondary-button" type="button" data-go-materials>浏览百科</button></div>`;
  output.querySelector("button").addEventListener("click", () => { navigate("materials"); document.querySelector("#material-search").value = term; renderMaterialCards(term, "all"); });
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = (tool) => Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
  register({
    name: "search_clothing_materials",
    title: "搜索服饰材质",
    description: "按名称或别名搜索衣研中的材质基础词条。",
    inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"], additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute(input) {
      const query = String(input?.query || "").trim().toLowerCase();
      if (!query) throw new Error("query 不能为空");
      return materials.filter((item) => [item.name, ...item.aliases].join(" ").toLowerCase().includes(query)).map((item) => ({ id: item.id, name: item.name, category: item.category, summary: item.summary }));
    }
  });
  register({
    name: "add_wardrobe_record",
    title: "添加衣橱记录",
    description: "把一件真实服饰保存到衣研的本地衣橱，并同步更新可见页面。",
    inputSchema: { type: "object", properties: { name: { type: "string" }, category: { type: "string", enum: ["top", "pants", "shoes", "other"] }, size: { type: "string" }, material: { type: "string" }, notes: { type: "string" } }, required: ["name", "category"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute(input) {
      const name = String(input?.name || "").trim();
      if (!name) throw new Error("name 不能为空");
      const category = ["top", "pants", "shoes", "other"].includes(input.category) ? input.category : "other";
      const record = { id: uid("wear"), name, brand: "", category, size: String(input.size || ""), status: "owned", material: String(input.material || ""), scenario: "", fit: "", comfort: "", repurchase: "unknown", link: "", notes: String(input.notes || ""), measurements: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), demo: false };
      appState.wardrobe.unshift(record);
      saveState();
      return { id: record.id, status: "saved", name: record.name };
    }
  });
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => {
    navigate(button.dataset.route);
    if (button.hasAttribute("data-open-record")) setTimeout(() => openRecordDialog(), 50);
  }));
  document.querySelector("#global-search-form").addEventListener("submit", (event) => { event.preventDefault(); handleGlobalSearch(document.querySelector("#global-search").value); });
  document.querySelectorAll("[data-search-example]").forEach((button) => button.addEventListener("click", () => { document.querySelector("#global-search").value = button.dataset.searchExample; handleGlobalSearch(button.dataset.searchExample); }));
  document.querySelector("#material-search").addEventListener("input", (event) => renderMaterialCards(event.target.value, document.querySelector("#material-filter").value));
  document.querySelector("#material-filter").addEventListener("change", (event) => renderMaterialCards(document.querySelector("#material-search").value, event.target.value));
  document.querySelector("#show-compare").addEventListener("click", showMaterialCompare);
  document.querySelectorAll(".dialog-close").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));
  document.querySelectorAll("[data-label-example]").forEach((button) => button.addEventListener("click", () => { document.querySelector("#label-input").value = button.dataset.labelExample; renderLabelResult(); }));
  document.querySelector("#analyze-label").addEventListener("click", renderLabelResult);
  document.querySelectorAll("[data-fit-type]").forEach((button) => button.addEventListener("click", () => {
    currentFitType = button.dataset.fitType;
    document.querySelectorAll("[data-fit-type]").forEach((tab) => { const active = tab === button; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", String(active)); });
    renderFitFields(currentFitType);
    document.querySelector("#fit-result").className = "fit-result empty-state";
    document.querySelector("#fit-result").innerHTML = `<span class="empty-mark">cm</span><strong>填入相同测量口径的数据</strong><p>${esc(fitSchemas[currentFitType].note)}</p>`;
  }));
  document.querySelector("#reference-record").addEventListener("change", (event) => { fillReferenceFromRecord(event.target.value); if (event.target.value) appState.referenceId = event.target.value; });
  document.querySelector("#compare-fit").addEventListener("click", compareFit);
  document.querySelector("#reset-fit").addEventListener("click", () => { document.querySelectorAll("[data-measure-role]").forEach((input) => { input.value = ""; }); document.querySelector("#target-name").value = ""; document.querySelector("#target-size").value = ""; document.querySelector("#reference-record").value = ""; });
  document.querySelector("#style-form").addEventListener("submit", (event) => { event.preventDefault(); renderPalettes(generatePalettes(new FormData(event.currentTarget))); });
  document.querySelector("#add-record").addEventListener("click", () => openRecordDialog());
  document.querySelector("#record-form").elements.category.addEventListener("change", (event) => renderRecordMeasurements(event.target.value));
  document.querySelector("#record-form").addEventListener("submit", (event) => { event.preventDefault(); saveRecordFromForm(event.currentTarget); });
  document.querySelector("[data-cancel-record]").addEventListener("click", () => document.querySelector("#record-dialog").close());
  document.querySelector("#wardrobe-search").addEventListener("input", renderWardrobe);
  document.querySelector("#wardrobe-filter").addEventListener("change", renderWardrobe);
  document.querySelector("#export-data").addEventListener("click", exportData);
  document.querySelector("#import-data").addEventListener("change", (event) => { if (event.target.files[0]) importData(event.target.files[0]); event.target.value = ""; });
  document.querySelector("#profile-form").addEventListener("submit", (event) => { event.preventDefault(); saveProfile(event.currentTarget); });
  document.querySelectorAll('.preference-sliders input[type="range"]').forEach((input) => input.addEventListener("input", updateRangeOutputs));
  document.querySelector("#clear-data").addEventListener("click", () => {
    if (!confirm("确定清除个人档案、衣橱、比较记录和收藏配色吗？此操作无法撤销。")) return;
    appState = defaultState();
    localStorage.removeItem(STORAGE_KEY);
    loadProfileForm();
    renderAllDataViews();
    renderPalettes();
    showToast("当前浏览器中的衣研数据已清除。");
  });
  window.addEventListener("hashchange", () => navigate(location.hash.slice(1) || "home"));
}

function init() {
  bindEvents();
  renderMaterialCards();
  renderCompareSelection();
  renderFitFields();
  renderPalettes();
  loadProfileForm();
  renderAllDataViews();
  navigate(location.hash.slice(1) || "home");
  registerWebMcpTools();
}

document.addEventListener("DOMContentLoaded", init);
