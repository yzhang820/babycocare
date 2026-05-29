const APP_KEY = "baoCoCareStateV5";
const OLD_KEYS = ["baoCoCareStateV4", "baoCoCareStateV3", "baoCoCareStateV2", "superMommyState"];
const TODAY = "2026-05-29";

const provinceCities = {
  北京: ["北京"],
  上海: ["上海"],
  广东: ["广州", "深圳", "佛山", "珠海"],
  浙江: ["杭州", "宁波", "温州"],
  江苏: ["南京", "苏州", "无锡"],
  四川: ["成都", "绵阳"],
  湖北: ["武汉", "宜昌"],
  陕西: ["西安", "咸阳"],
  福建: ["福州", "厦门"],
  山东: ["济南", "青岛"],
  河南: ["郑州", "洛阳"],
  湖南: ["长沙", "株洲"],
  重庆: ["重庆"],
  天津: ["天津"]
};

const weatherSamples = {
  上海: { temp: 27, uv: "中等", wind: 3, rain: "小雨", humidity: 76 },
  北京: { temp: 30, uv: "强", wind: 4, rain: "晴", humidity: 38 },
  广州: { temp: 31, uv: "强", wind: 2, rain: "阵雨", humidity: 82 },
  深圳: { temp: 30, uv: "强", wind: 3, rain: "雷阵雨", humidity: 80 },
  杭州: { temp: 28, uv: "中等", wind: 2, rain: "多云", humidity: 72 },
  南京: { temp: 29, uv: "强", wind: 3, rain: "多云", humidity: 65 },
  成都: { temp: 25, uv: "弱", wind: 2, rain: "阴", humidity: 70 },
  武汉: { temp: 32, uv: "强", wind: 3, rain: "晴", humidity: 62 },
  西安: { temp: 29, uv: "中等", wind: 3, rain: "晴", humidity: 42 },
  厦门: { temp: 29, uv: "强", wind: 4, rain: "阵雨", humidity: 78 },
  济南: { temp: 30, uv: "强", wind: 4, rain: "晴", humidity: 45 },
  郑州: { temp: 31, uv: "强", wind: 3, rain: "晴", humidity: 48 },
  长沙: { temp: 30, uv: "强", wind: 2, rain: "阵雨", humidity: 75 },
  重庆: { temp: 28, uv: "中等", wind: 2, rain: "阴", humidity: 73 },
  天津: { temp: 29, uv: "强", wind: 4, rain: "晴", humidity: 42 }
};

const growthReference = {
  4: { weight: [5.6, 8.6], height: [59.0, 68.5], skills: "常见能力包括更稳地抬头、看向声音、主动看照护人、尝试抓握、咿呀发声。" },
  5: { weight: [6.0, 9.2], height: [61.0, 70.5], skills: "常见能力包括翻身预备、双手抓物、更多咿呀互动、对熟悉照护人有明显反应。" },
  6: { weight: [6.4, 9.8], height: [63.0, 72.5], skills: "常见能力包括翻身、扶坐预备、把物品送到嘴边探索，部分宝宝开始添加辅食。" }
};

const iconMap = {
  feeding: "milk",
  sleep: "moon",
  diaper: "sparkles",
  play: "baby",
  montessori: "sparkles",
  language: "message",
  outdoor: "sun",
  health: "heart",
  care: "bath",
  handoff: "calendar"
};

const vaccineSchedule = [
  { month: 4, title: "脊灰疫苗第3剂", type: "国家建议必打", due: "2026-05-18", note: "按国家免疫规划，需结合当地接种门诊安排。" },
  { month: 4, title: "百白破疫苗第2剂", type: "国家建议必打", due: "2026-05-18", note: "如延期，应尽快咨询社区接种门诊补种。" },
  { month: 4, title: "13价肺炎球菌结合疫苗", type: "可选自费", due: "2026-05-18", note: "自费疫苗，按说明书和医生建议安排剂次。" },
  { month: 5, title: "五联/四联替代方案核对", type: "可选自费", due: "2026-06-18", note: "如选择联合疫苗，需要和门诊确认与免费疫苗的替代关系。" },
  { month: 6, title: "乙肝疫苗第3剂", type: "国家建议必打", due: "2026-07-18", note: "通常在6月龄附近接种，避免错过。" },
  { month: 6, title: "A群流脑多糖疫苗第1剂", type: "国家建议必打", due: "2026-07-18", note: "按当地免疫规划预约。" },
  { month: 6, title: "流感疫苗", type: "可选自费", due: "2026-07-18", note: "满6月龄后可咨询医生是否接种，通常需结合季节。" }
];

const seedState = {
  baby: {
    name: "小星星",
    birthDate: "2026-01-18",
    province: "上海",
    city: "上海",
    feeding: "混合喂养",
    gender: "female",
    birthWeightGrams: 3200,
    birthHeight: 50,
    targetMilk: 850,
    avatarDataUrl: "",
    profileCompleted: false
  },
  reminders: {
    morning: "08:00",
    evening: "20:30"
  },
  tasks: [
    task("wake-check", "07:10", true, "晨间状态检查", "观察精神、体温触感、尿布重量和皮肤状态。", 1, "次", "health", "done", 1, "精神好，尿布正常。"),
    task("milk-1", "07:30", true, "第1次喝奶", "目标 170ml；喝完后竖抱拍嗝 10-15 分钟。", 170, "ml", "feeding", "done", 160, "喝奶顺，余 10ml。"),
    task("burp-1", "07:50", true, "拍嗝与防吐奶观察", "竖抱或斜抱，观察吐奶、呛咳和不适。", 12, "分钟", "feeding", "done", 12, ""),
    task("floor-1", "08:30", false, "地面自由活动", "在安全软垫上给宝宝看黑白/高对比玩具，照护人保持回应。", 10, "分钟", "montessori", "todo", 10, ""),
    task("nap-1", "09:15", true, "上午小睡", "观察困倦信号，保持睡眠环境安静、仰卧、床内无松软物。", 60, "分钟", "sleep", "done", 45, "入睡较快。"),
    task("diaper-1", "10:20", true, "尿布/大便记录", "记录尿布、便便颜色和性状；便干、带血、精神差需咨询医生。", 1, "次", "diaper", "done", 1, "黄色糊状。"),
    task("tummy-1", "10:45", true, "趴玩练习", "清醒时分段趴玩，照护人在旁；可用声音和玩具引导抬头。", 5, "分钟", "play", "todo", 5, ""),
    task("outdoor-1", "11:20", true, "外出条件确认", "按天气检查帽子、雨具、薄毯、备用尿布和奶具。", 1, "次", "outdoor", "todo", 1, ""),
    task("milk-2", "12:00", true, "第2次喝奶", "目标 170ml；若明显少喝，先确认是否调整下一次安排。", 170, "ml", "feeding", "todo", 170, ""),
    task("read-1", "13:10", false, "亲子读图与对话", "面对面读 1-2 张图卡，等待宝宝看、笑或发声再回应。", 8, "分钟", "language", "todo", 8, ""),
    task("nap-2", "14:00", true, "午后小睡", "固定安抚流程，减少强光和噪音，记录睡眠时长。", 90, "分钟", "sleep", "todo", 90, ""),
    task("milk-3", "15:45", true, "第3次喝奶", "目标 170ml；观察吃奶专注度、吐奶和尿量。", 170, "ml", "feeding", "todo", 170, ""),
    task("grasp-1", "16:30", false, "抓握与换手游戏", "用轻软玩具从胸前慢慢移动，引导伸手、抓握、双手探索。", 8, "分钟", "montessori", "todo", 8, ""),
    task("diaper-2", "17:20", true, "傍晚尿布检查", "记录尿量、皮肤泛红和是否需要护臀。", 1, "次", "diaper", "todo", 1, ""),
    task("bath-1", "18:30", false, "洗澡/抚触", "室温合适时进行，洗后观察皮肤褶皱处，轻柔抚触。", 15, "分钟", "care", "todo", 15, ""),
    task("milk-4", "19:20", true, "第4次喝奶", "目标 170ml；睡前避免过度逗玩。", 170, "ml", "feeding", "todo", 170, ""),
    task("sleep-routine", "20:00", true, "睡前流程", "换尿布、调暗灯光、轻声安抚，保持一致流程。", 30, "分钟", "sleep", "todo", 30, ""),
    task("report-1", "20:30", true, "查看今日报告", "交接给下一位照护人：奶量、睡眠、排便、异常备注。", 1, "次", "handoff", "todo", 1, "")
  ],
  media: [
    { id: "media-1", time: "10:50", fileName: "tummy-time-demo.jpg", note: "趴玩时能短暂抬头，表情放松。" }
  ],
  growth: [
    { date: "2026-01-18", weight: 3.2, height: 50.0 },
    { date: "2026-03-18", weight: 5.3, height: 58.5 },
    { date: "2026-04-18", weight: 6.1, height: 61.8 },
    { date: "2026-05-18", weight: 6.7, height: 64.2 }
  ],
  reports: [],
  pendingAdjust: null
};

let state = loadState();
let activeFilter = "all";
let selectedTaskId = null;

const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");
const careList = document.querySelector("#careList");
const timeline = document.querySelector("#timeline");
const adjustCard = document.querySelector("#adjustCard");
const adjustText = document.querySelector("#adjustText");
const toast = document.querySelector("#toast");

function task(id, time, required, title, detail, target, unit, category, status = "todo", actual = target, note = "") {
  return { id, time, required, title, detail, target, unit, category, status, actual, note, completedAt: status === "done" ? time : "" };
}

function loadState() {
  const saved = localStorage.getItem(APP_KEY);
  if (saved) return normalizeState(JSON.parse(saved));
  OLD_KEYS.forEach((key) => localStorage.removeItem(key));
  const fresh = structuredClone(seedState);
  fresh.baby.targetMilk = calculateTargetMilk(fresh.baby, fresh.growth);
  localStorage.setItem(APP_KEY, JSON.stringify(fresh));
  return fresh;
}

function normalizeState(raw) {
  const merged = structuredClone(seedState);
  const next = {
    ...merged,
    ...raw,
    baby: { ...merged.baby, ...(raw.baby || {}) },
    reminders: { ...merged.reminders, ...(raw.reminders || {}) },
    tasks: Array.isArray(raw.tasks) && raw.tasks.length >= 10 ? raw.tasks : merged.tasks,
    media: Array.isArray(raw.media) ? raw.media : Array.isArray(raw.records) ? raw.records.filter((item) => item.type === "media") : merged.media,
    growth: Array.isArray(raw.growth) && raw.growth.length ? raw.growth : merged.growth,
    reports: Array.isArray(raw.reports) ? raw.reports : merged.reports
  };
  if (!next.baby.birthWeightGrams) {
    next.baby.birthWeightGrams = Math.round(Number(next.baby.birthWeight || 3.2) * 1000);
  }
  if (!("avatarDataUrl" in next.baby)) next.baby.avatarDataUrl = "";
  if (!("gender" in next.baby)) next.baby.gender = "unknown";
  if (!("profileCompleted" in next.baby)) next.baby.profileCompleted = false;
  if (!provinceCities[next.baby.province]) next.baby.province = "上海";
  if (!provinceCities[next.baby.province].includes(next.baby.city)) next.baby.city = provinceCities[next.baby.province][0];
  next.growth = syncBirthGrowth(next);
  next.baby.targetMilk = calculateTargetMilk(next.baby, next.growth);
  return next;
}

function saveState() {
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}

function latestGrowth() {
  const sorted = [...state.growth].sort((a, b) => a.date.localeCompare(b.date));
  return sorted[sorted.length - 1] || { weight: state.baby.birthWeightGrams / 1000, height: state.baby.birthHeight };
}

function syncBirthGrowth(nextState = state) {
  const birthWeight = Number(nextState.baby.birthWeightGrams || 0) / 1000;
  const birthDate = nextState.baby.birthDate;
  const existing = Array.isArray(nextState.growth) ? [...nextState.growth] : [];
  const withoutBirth = existing.filter((item) => item.date !== birthDate);
  return [{ date: birthDate, weight: birthWeight || 3.2, height: Number(nextState.baby.birthHeight || 50) }, ...withoutBirth].sort((a, b) => a.date.localeCompare(b.date));
}

function calculateTargetMilk(baby, growth = state?.growth || seedState.growth) {
  if (baby.feeding === "母乳喂养") return 0;
  const latest = [...growth].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  const weight = Number(latest?.weight || (baby.birthWeightGrams || 0) / 1000 || 0);
  if (!weight) return 0;
  return Math.round(Math.min(weight * 150, 960) / 10) * 10;
}

function babyAgeMonths() {
  const birth = new Date(state.baby.birthDate);
  const now = new Date(`${TODAY}T08:00:00`);
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  return Math.max(months, 0);
}

function babyAgeDays() {
  const birth = new Date(`${state.baby.birthDate}T00:00:00`);
  const today = new Date(`${TODAY}T00:00:00`);
  return Math.max(0, Math.floor((today - birth) / 86400000) + 1);
}

function weatherForCity() {
  return weatherSamples[state.baby.city] || { temp: 27, uv: "中等", wind: 3, rain: "多云", humidity: 65 };
}

function buildOutdoorAdvice() {
  const weather = weatherForCity();
  const tips = [];
  if (weather.temp >= 30) tips.push("避开正午高温");
  if (weather.temp <= 12) tips.push("加薄毯或外套");
  if (weather.uv === "强") tips.push("带遮阳帽和遮阳篷");
  if (weather.rain.includes("雨")) tips.push("带伞或雨罩");
  if (weather.wind >= 4) tips.push("减少迎风停留");
  if (!tips.length) tips.push("可短时外出并观察状态");
  return `${state.baby.city} ${weather.rain} ${weather.temp}℃ · 紫外线${weather.uv} · ${weather.wind}级风：${tips.join("，")}。`;
}

function lucideIcon(name) {
  const common = `width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const paths = {
    milk: `<path d="M8 2h8"/><path d="M9 2v5l-2 3v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10l-2-3V2"/><path d="M7 14h10"/>`,
    moon: `<path d="M12 3a6.5 6.5 0 0 0 8.7 8.7A8.5 8.5 0 1 1 12 3Z"/>`,
    sparkles: `<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"/><path d="M19 15l.8 1.8L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-1.2L19 15Z"/>`,
    baby: `<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c1.2.8 2.8.8 4 0"/><path d="M12 3c1.5 0 2.5 1 2.5 2.3 0 1-.6 1.7-1.5 2.1A6 6 0 1 1 12 3Z"/>`,
    message: `<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>`,
    sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
    heart: `<path d="M19 14c1.5-1.5 3-3.4 3-5.7A5.3 5.3 0 0 0 12 5a5.3 5.3 0 0 0-10 3.3C2 10.6 3.5 12.5 5 14l7 7Z"/>`,
    bath: `<path d="M4 12h16"/><path d="M6 12V7a3 3 0 0 1 6 0"/><path d="M4 12v3a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5v-3"/>`,
    calendar: `<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>`
  };
  return `<svg ${common}>${paths[name] || paths.sparkles}</svg>`;
}

function upcomingVaccines() {
  const age = babyAgeMonths();
  return vaccineSchedule
    .filter((item) => item.month >= age && item.month <= age + 2)
    .slice(0, 4);
}

function selectScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProfileModal(force = false) {
  document.querySelector("#profileModal").classList.remove("hidden");
  document.querySelector("#closeProfile").classList.toggle("hidden", force);
}

function closeProfileModal() {
  if (!state.baby.profileCompleted) return;
  document.querySelector("#profileModal").classList.add("hidden");
}

function maybePromptProfile() {
  if (!state.baby.profileCompleted) {
    openProfileModal(true);
  }
}

function unlockDemo() {
  document.querySelector("#passwordGate")?.classList.add("hidden");
  sessionStorage.setItem("baoDemoUnlocked", "true");
}

async function checkDemoPassword(password) {
  try {
    const response = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (response.ok) {
      const result = await response.json();
      return Boolean(result.ok);
    }
  } catch (error) {
    return password === "xiaobao-demo-2026";
  }
  return false;
}

function setupProvinceCityOptions() {
  const provinceSelect = document.querySelector("#profileProvince");
  provinceSelect.innerHTML = Object.keys(provinceCities).map((province) => `<option>${province}</option>`).join("");
  provinceSelect.value = state.baby.province;
  renderCityOptions();
}

function renderCityOptions() {
  const citySelect = document.querySelector("#profileCity");
  const cities = provinceCities[state.baby.province] || provinceCities.上海;
  citySelect.innerHTML = cities.map((city) => `<option>${city}</option>`).join("");
  if (!cities.includes(state.baby.city)) state.baby.city = cities[0];
  citySelect.value = state.baby.city;
}

function milkTotal() {
  return state.tasks
    .filter((task) => task.category === "feeding" && task.status === "done" && task.unit === "ml")
    .reduce((sum, task) => sum + Number(task.actual || 0), 0);
}

function recentFeedTime() {
  const feeds = state.tasks
    .filter((taskItem) => taskItem.category === "feeding" && taskItem.unit === "ml" && taskItem.status === "done")
    .sort((a, b) => (b.completedAt || b.time).localeCompare(a.completedAt || a.time));
  return feeds[0]?.completedAt || feeds[0]?.time || "--:--";
}

function renderSummary() {
  const milkTarget = state.baby.targetMilk ? `${state.baby.targetMilk} ml` : "按需";
  const sleepMinutes = state.tasks.filter((taskItem) => taskItem.category === "sleep" && taskItem.status === "done").reduce((sum, taskItem) => sum + Number(taskItem.actual || 0), 0);
  const poopCount = state.tasks.filter((taskItem) => taskItem.category === "diaper" && taskItem.status === "done").length;
  const percent = state.baby.targetMilk ? Math.min(100, Math.round((milkTotal() / state.baby.targetMilk) * 100)) : 0;
  const avatar = document.querySelector("#babyAvatar");

  document.querySelector("#babyName").textContent = state.baby.name;
  document.querySelector("#babyMeta").textContent = `${babyAgeMonths()}月龄 · ${state.baby.feeding} · 已健康成长 ${babyAgeDays()} 天`;
  document.querySelector("#recentFeedTime").textContent = recentFeedTime();
  document.querySelector("#sleepProgress").textContent = `${sleepMinutes} 分钟`;
  document.querySelector("#poopProgress").textContent = `${poopCount} 次`;
  document.querySelector("#milkProgressText").textContent = `今日已摄入 ${milkTotal()}ml / ${milkTarget}`;
  document.querySelector("#milkProgressBar").style.width = `${percent}%`;
  document.querySelector("#milkProgressBar").style.background = percent >= 90 ? "linear-gradient(90deg, #34d399, #059669)" : "linear-gradient(90deg, #f59e0b, #10b981)";
  document.querySelector("#weatherStrip").textContent = buildOutdoorAdvice();
  document.querySelector("#vaccineStrip").innerHTML = `
    <strong>${lucideIcon("calendar")} 近期疫苗预约</strong>
    <div class="vaccine-list">
      ${upcomingVaccines()
        .map((item) => `<article><span class="${item.type.includes("必打") ? "must" : "optional"}">${item.type}</span><b>${item.title}</b><small>${item.due} · ${item.note}</small></article>`)
        .join("")}
    </div>
  `;
  if (state.baby.avatarDataUrl) {
    avatar.style.backgroundImage = `url("${state.baby.avatarDataUrl}")`;
    avatar.textContent = "";
  } else {
    avatar.style.backgroundImage = "";
    avatar.textContent = "宝";
  }
}

function renderProfile() {
  const latest = latestGrowth();
  document.querySelector("#profileName").value = state.baby.name;
  document.querySelector("#profileBirthDate").value = state.baby.birthDate;
  document.querySelector("#profileProvince").value = state.baby.province;
  renderCityOptions();
  document.querySelector("#profileFeeding").value = state.baby.feeding;
  document.querySelector("#profileGender").value = state.baby.gender || "unknown";
  document.querySelector("#profileBirthWeight").value = state.baby.birthWeightGrams;
  document.querySelector("#milkBasis").textContent =
    state.baby.feeding === "母乳喂养"
      ? "当前为母乳喂养：不强行设定每日奶量，优先按需喂养，并观察尿量、精神状态和体重增长。"
      : `按最近一次成长记录 ${latest.weight.toFixed(2)}kg 估算：约 ${state.baby.targetMilk}ml/日。出生体重用于成长曲线起点，实际喂养以儿保医生建议和宝宝状态为准。`;
}

function visibleTasks() {
  return state.tasks.filter((taskItem) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "required") return taskItem.required;
    if (activeFilter === "optional") return !taskItem.required;
    if (activeFilter === "open") return taskItem.status !== "done";
    return true;
  });
}

function renderCareList() {
  careList.innerHTML = visibleTasks()
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((taskItem) => {
      const stateClass = taskItem.status === "done" ? "done" : taskItem.status === "missed" ? "missed" : "";
      const value = taskItem.status === "done" ? `${taskItem.actual}${taskItem.unit}` : `目标 ${taskItem.target}${taskItem.unit}`;
      const isEditing = selectedTaskId === taskItem.id;
      return `
        <article class="todo-item ${stateClass}" data-task-id="${taskItem.id}">
          <button class="todo-circle" data-complete="${taskItem.id}" aria-label="编辑 ${taskItem.title}">${taskItem.status === "done" ? "✓" : lucideIcon(iconMap[taskItem.category])}</button>
          <div class="todo-main">
            <div class="todo-line">
              <span class="todo-time">${taskItem.time}</span>
              <strong>${taskItem.title}</strong>
              <span class="pill ${taskItem.required ? "required" : "optional"}">${taskItem.required ? "必做" : "选做"}</span>
            </div>
            <p>${taskItem.detail}</p>
            <span class="todo-meta">${value}${taskItem.note ? ` · ${taskItem.note}` : ""}</span>
            ${
              isEditing
                ? `
              <div class="inline-editor">
                <div class="stepper">
                  <button type="button" data-step="${taskItem.id}" data-delta="-10">−</button>
                  <input data-actual="${taskItem.id}" type="number" step="1" value="${taskItem.actual || taskItem.target}" />
                  <button type="button" data-step="${taskItem.id}" data-delta="10">+</button>
                  <span>${taskItem.unit}</span>
                </div>
                <input class="range-input" data-range="${taskItem.id}" type="range" min="0" max="${Math.max(taskItem.target * 2, 10)}" step="1" value="${taskItem.actual || taskItem.target}" />
                <input data-note="${taskItem.id}" type="text" value="${taskItem.note || ""}" placeholder="备注特殊情况" />
                <div class="button-row">
                  <button class="primary small" type="button" data-save-task="${taskItem.id}">保存完成</button>
                  <button class="ghost small" type="button" data-miss-task="${taskItem.id}">未完成</button>
                  <button class="ghost small" type="button" data-cancel-task="${taskItem.id}">收起</button>
                </div>
              </div>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function renderNextTasks() {
  const next = state.tasks.filter((taskItem) => taskItem.required && taskItem.status !== "done").sort((a, b) => a.time.localeCompare(b.time)).slice(0, 3);
  document.querySelector("#nextTasks").innerHTML = next
    .map((taskItem) => `<article><span>${taskItem.time}</span><strong>${taskItem.title}</strong><p>${taskItem.detail}</p></article>`)
    .join("");
}

function renderDevelopmentBrief() {
  const age = babyAgeMonths();
  const rows = [
    {
      title: "身体动作",
      text: "这个阶段常见重点是抬头更稳、趴玩耐受变长、翻身预备和双手探索。照护人可以把练习拆成短时多次，避免疲劳。"
    },
    {
      title: "社交情绪",
      text: "宝宝会更关注熟悉的人脸和声音，开始用表情、咿呀声和身体动作回应。稳定回应比复杂玩具更重要。"
    },
    {
      title: "认知感知",
      text: "看、听、抓、入口探索都在快速整合。类似 Wonder Weeks 所说的感知跃迁期，宝宝可能更黏人或睡眠波动，照护上要更可预期。"
    },
    {
      title: "照护重点",
      text: "继续记录奶量、尿布、睡眠和清醒互动；若出现持续拒奶、精神差、发热、明显发育倒退，应咨询医生。"
    }
  ];
  document.querySelector("#stageText").textContent = `${age}月龄左右，照护重点是让宝宝在安全、稳定、可预测的环境里练习身体控制、社交回应和感知探索。`;
  document.querySelector("#developmentGrid").innerHTML = rows
    .map((row) => `<article><strong>${row.title}</strong><p>${row.text}</p></article>`)
    .join("");
}

function renderAdjust() {
  if (!state.pendingAdjust) {
    adjustCard.classList.add("hidden");
    return;
  }
  adjustCard.classList.remove("hidden");
  adjustText.textContent = state.pendingAdjust.message;
}

function openCompletion(taskId) {
  const taskItem = state.tasks.find((item) => item.id === taskId);
  if (!taskItem) return;
  selectedTaskId = selectedTaskId === taskId ? null : taskId;
  renderCareList();
}

function closeCompletion() {
  selectedTaskId = null;
  renderCareList();
}

function maybeCreateMilkAdjust(taskItem) {
  if (taskItem.category !== "feeding" || taskItem.unit !== "ml") return;
  if (Number(taskItem.actual) < Number(taskItem.target) - 50) {
    state.pendingAdjust = {
      taskId: taskItem.id,
      message: `${taskItem.title} 计划 ${taskItem.target}ml，实际 ${taskItem.actual}ml。是否把下一次喝奶提醒提前 30 分钟，并在今晚报告中重点关注总奶量？`
    };
  }
}

function drawGrowthChart() {
  state.growth = [...state.growth].sort((a, b) => a.date.localeCompare(b.date));
  const canvas = document.querySelector("#growthChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = 32;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fffdf9";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#e8ded0";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = pad + i * 36;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  const weights = state.growth.map((item) => item.weight);
  const heights = state.growth.map((item) => item.height);
  drawLine("weight", Math.min(...weights) - 0.4, Math.max(...weights) + 0.4, "#e86d5a", "体重 kg");
  drawLine("height", Math.min(...heights) - 2, Math.max(...heights) + 2, "#2e8179", "身高 cm");

  function xAt(index) {
    if (state.growth.length === 1) return width / 2;
    return pad + (index / (state.growth.length - 1)) * (width - pad * 2);
  }

  function yAt(value, min, max) {
    return height - pad - ((value - min) / (max - min || 1)) * (height - pad * 2);
  }

  function drawLine(key, min, max, color, label) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    state.growth.forEach((row, index) => {
      const x = xAt(index);
      const y = yAt(row[key], min, max);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    state.growth.forEach((row, index) => {
      ctx.beginPath();
      ctx.arc(xAt(index), yAt(row[key], min, max), 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(label, pad, key === "weight" ? 18 : 34);
  }
}

function assessGrowth() {
  const age = Math.min(Math.max(babyAgeMonths(), 4), 6);
  const ref = growthReference[age] || growthReference[4];
  const latest = latestGrowth();
  const weightOk = latest.weight >= ref.weight[0] && latest.weight <= ref.weight[1];
  const heightOk = latest.height >= ref.height[0] && latest.height <= ref.height[1];
  const concerns = [];
  if (!weightOk) concerns.push("体重不在当前 Demo 的常见范围内，建议结合喂养量、尿量、近期疾病和连续测量趋势看。");
  if (!heightOk) concerns.push("身高不在当前 Demo 的常见范围内，建议确认测量姿势，并连续记录后再判断趋势。");
  if (concerns.length === 0) concerns.push("当前最新记录落在 Demo 的常见范围内，重点继续观察曲线是否稳定向上。");
  return { age, ref, latest, weightOk, heightOk, concerns };
}

function renderGrowth() {
  state.growth = [...state.growth].sort((a, b) => a.date.localeCompare(b.date));
  const latest = latestGrowth();
  const first = state.growth[0];
  const result = assessGrowth();
  document.querySelector("#growthStats").innerHTML = `
    <article><span>最新体重</span><strong>${latest.weight.toFixed(2)} kg</strong></article>
    <article><span>最新身高</span><strong>${latest.height.toFixed(1)} cm</strong></article>
    <article><span>较首次体重</span><strong>+${(latest.weight - first.weight).toFixed(2)} kg</strong></article>
    <article><span>较首次身高</span><strong>+${(latest.height - first.height).toFixed(1)} cm</strong></article>
  `;
  document.querySelector("#growthAssessment").innerHTML = `
    <h3>发育评估</h3>
    <p>${result.age}月龄 Demo 常见范围：体重 ${result.ref.weight[0]}-${result.ref.weight[1]}kg，身高 ${result.ref.height[0]}-${result.ref.height[1]}cm。</p>
    <p>${result.concerns.join("")}</p>
    <p>${result.ref.skills}如出现明显不会看人/追声、持续喂养困难、精神反应差或曲线连续下滑，请咨询儿保医生。</p>
  `;
}

function buildTimelineEvents() {
  const taskEvents = state.tasks
    .filter((taskItem) => taskItem.status !== "todo")
    .map((taskItem) => ({
      time: taskItem.completedAt || taskItem.time,
      title: `${taskItem.status === "done" ? "完成" : "未完成"} · ${taskItem.title}`,
      detail: `${taskItem.actual || taskItem.target}${taskItem.unit}${taskItem.note ? ` · ${taskItem.note}` : ""}`,
      kind: taskItem.status === "done" ? "done" : "missed"
    }));
  const mediaEvents = state.media.map((item) => ({
    time: item.time,
    title: "照片/视频",
    detail: `${item.note || "已添加媒体记录"}${item.fileName ? ` · ${item.fileName}` : ""}`,
    kind: "media"
  }));
  return [...taskEvents, ...mediaEvents].sort((a, b) => a.time.localeCompare(b.time));
}

function renderTimeline() {
  const events = buildTimelineEvents();
  document.querySelector("#timelineCount").textContent = `${events.length} 条`;
  timeline.innerHTML = events
    .map((event) => `<div class="timeline-item ${event.kind}"><strong>${event.time} · ${event.title}</strong><span>${event.detail}</span></div>`)
    .join("");
}

function renderHistory() {
  const reports = [...state.reports].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  document.querySelector("#historyCount").textContent = `${reports.length} 份`;
  document.querySelector("#historyList").innerHTML = reports.length
    ? reports
        .map(
          (report) => {
            const items = (report.timeline || [])
              .slice(0, 8)
              .map((item) => `<li><span>${item.time}</span>${item.title}：${item.detail}</li>`)
              .join("");
            return `
            <details class="history-card">
              <summary>
                <span>${report.date} · ${report.createdAt.slice(11, 16)}</span>
                <strong>${report.title}</strong>
              </summary>
              <p>${report.summary}</p>
              <ul>${items}</ul>
            </details>
          `;
          }
        )
        .join("")
    : `<article class="history-card"><strong>还没有历史报告</strong><p>点击“生成报告”后，当前报告会保存到这里，之后可以回溯。</p></article>`;
}

function buildReportHtml() {
  const done = state.tasks.filter((taskItem) => taskItem.status === "done").length;
  const missed = state.tasks.filter((taskItem) => taskItem.status === "missed").length;
  const sleepMinutes = state.tasks.filter((taskItem) => taskItem.category === "sleep" && taskItem.status === "done").reduce((sum, taskItem) => sum + Number(taskItem.actual || 0), 0);
  const playMinutes = state.tasks.filter((taskItem) => ["play", "language", "montessori"].includes(taskItem.category) && taskItem.status === "done").reduce((sum, taskItem) => sum + Number(taskItem.actual || 0), 0);
  const poopDone = state.tasks.some((taskItem) => taskItem.category === "diaper" && taskItem.status === "done" && taskItem.note.includes("糊"));
  const milkNote =
    state.baby.targetMilk && milkTotal() < state.baby.targetMilk * 0.8
      ? "今日累计奶量低于目标的 80%，建议继续观察精神状态、尿量和下一次吃奶意愿。"
      : "今日奶量或喂养节奏暂时平稳。";
  return `
    <h3>${state.baby.name} 今日照护小结</h3>
    <p>今天完成 ${done} 项，未完成 ${missed} 项；已记录奶量 ${milkTotal()}ml，睡眠 ${sleepMinutes} 分钟，互动陪玩 ${playMinutes} 分钟。</p>
    <p>${milkNote}${poopDone ? "已有大便性状记录。" : "请补充尿布/大便记录，便于交接。"}</p>
    <p>${buildOutdoorAdvice()}</p>
    <p>明天建议优先保持喂养、尿布、睡眠和清醒陪玩的连续记录。任何发热、持续拒奶、精神差、明显腹胀或便血，都应咨询医生。</p>
  `;
}

function renderReport() {
  document.querySelector("#reportCard").innerHTML = buildReportHtml();
  document.querySelector("#morningReminder").value = state.reminders.morning;
  document.querySelector("#eveningReminder").value = state.reminders.evening;
  renderHistory();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 1800);
}

function renderAll() {
  setupProvinceCityOptions();
  state.growth = syncBirthGrowth(state);
  state.baby.targetMilk = calculateTargetMilk(state.baby, state.growth);
  renderSummary();
  renderProfile();
  renderCareList();
  renderNextTasks();
  renderDevelopmentBrief();
  renderAdjust();
  drawGrowthChart();
  renderGrowth();
  renderReport();
  renderTimeline();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectScreen(tab.dataset.tab));
});

document.addEventListener("click", (event) => {
  const jump = event.target.closest("[data-tab-jump]");
  if (jump) selectScreen(jump.dataset.tabJump);

  const complete = event.target.closest("[data-complete]");
  if (complete) openCompletion(complete.dataset.complete);
});

document.querySelectorAll(".segment").forEach((segment) => {
  segment.addEventListener("click", () => {
    activeFilter = segment.dataset.filter;
    document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item === segment));
    renderCareList();
  });
});

document.querySelector("#editProfile").addEventListener("click", () => openProfileModal(false));
document.querySelector("#closeProfile").addEventListener("click", closeProfileModal);
document.querySelector("#profileModal").addEventListener("click", (event) => {
  if (event.target.id === "profileModal") closeProfileModal();
});

if (sessionStorage.getItem("baoDemoUnlocked") === "true") {
  unlockDemo();
}

document.querySelector("#passwordForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = document.querySelector("#demoPassword");
  const error = document.querySelector("#passwordError");
  const ok = await checkDemoPassword(input.value.trim());
  if (ok) {
    error.textContent = "";
    unlockDemo();
    maybePromptProfile();
    return;
  }
  error.textContent = "密码不正确，请重新输入";
  input.select();
});

document.querySelector("#profileProvince").addEventListener("change", (event) => {
  state.baby.province = event.target.value;
  state.baby.city = provinceCities[state.baby.province][0];
  renderCityOptions();
});

document.querySelector("#profileFeeding").addEventListener("change", (event) => {
  const feeding = event.target.value;
  const target = calculateTargetMilk({ ...state.baby, feeding }, state.growth);
  document.querySelector("#milkBasis").textContent =
    feeding === "母乳喂养"
      ? "当前为母乳喂养：不强行设定每日奶量，优先按需喂养，并观察尿量、精神状态和体重增长。"
      : `按最近一次成长记录 ${latestGrowth().weight.toFixed(2)}kg 估算：约 ${target}ml/日。出生体重用于成长曲线起点，实际喂养以儿保医生建议和宝宝状态为准。`;
});

document.addEventListener("input", (event) => {
  const range = event.target.closest("[data-range]");
  const actual = event.target.closest("[data-actual]");
  if (range) {
    const input = document.querySelector(`[data-actual="${range.dataset.range}"]`);
    if (input) input.value = range.value;
  }
  if (actual) {
    const slider = document.querySelector(`[data-range="${actual.dataset.actual}"]`);
    if (slider) slider.value = actual.value;
  }
});

document.addEventListener("click", (event) => {
  const step = event.target.closest("[data-step]");
  const save = event.target.closest("[data-save-task]");
  const miss = event.target.closest("[data-miss-task]");
  const cancel = event.target.closest("[data-cancel-task]");

  if (step) {
    const input = document.querySelector(`[data-actual="${step.dataset.step}"]`);
    const slider = document.querySelector(`[data-range="${step.dataset.step}"]`);
    const next = Math.max(0, Number(input.value || 0) + Number(step.dataset.delta || 0));
    input.value = next;
    if (slider) slider.value = next;
  }

  if (save || miss) {
    const id = (save || miss).dataset.saveTask || (save || miss).dataset.missTask;
    const taskItem = state.tasks.find((item) => item.id === id);
    if (!taskItem) return;
    taskItem.actual = Number(document.querySelector(`[data-actual="${id}"]`).value || taskItem.target);
    taskItem.note = document.querySelector(`[data-note="${id}"]`).value.trim();
    taskItem.status = save ? "done" : "missed";
    taskItem.completedAt = taskItem.time;
    if (save) maybeCreateMilkAdjust(taskItem);
    selectedTaskId = null;
    showToast(save ? "已完成并进入报告时间线" : "已标记未完成");
    saveState();
    renderAll();
  }

  if (cancel) {
    selectedTaskId = null;
    renderCareList();
  }
});

document.querySelector("#mediaForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const file = document.querySelector("#mediaInput").files[0];
  const note = document.querySelector("#mediaNote").value.trim();
  const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  if (!file && !note) return;
  state.media.push({ id: `media-${Date.now()}`, time, fileName: file ? file.name : "", note });
  event.target.reset();
  showToast("照片/视频已加入报告时间线");
  saveState();
  renderAll();
});

document.querySelector("#profileAvatar").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.baby.avatarDataUrl = reader.result;
    saveState();
    renderSummary();
    showToast("宝宝头像已更新");
  };
  reader.readAsDataURL(file);
});

document.querySelector("#profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.baby.name = document.querySelector("#profileName").value.trim() || state.baby.name;
  state.baby.birthDate = document.querySelector("#profileBirthDate").value || state.baby.birthDate;
  state.baby.province = document.querySelector("#profileProvince").value;
  state.baby.city = document.querySelector("#profileCity").value;
  state.baby.feeding = document.querySelector("#profileFeeding").value;
  state.baby.gender = document.querySelector("#profileGender").value;
  state.baby.birthWeightGrams = Number(document.querySelector("#profileBirthWeight").value || state.baby.birthWeightGrams);
  state.baby.profileCompleted = true;
  state.growth = syncBirthGrowth(state);
  state.baby.targetMilk = calculateTargetMilk(state.baby, state.growth);
  saveState();
  showToast("宝宝档案已保存");
  renderAll();
  closeProfileModal();
});

document.querySelector("#growthForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const weight = Number(document.querySelector("#weightInput").value);
  const height = Number(document.querySelector("#heightInput").value);
  if (!weight || !height) return;
  const date = new Date().toISOString().slice(0, 10);
  state.growth = state.growth.filter((item) => item.date !== date);
  state.growth.push({ date, weight, height });
  state.growth = syncBirthGrowth(state);
  state.baby.targetMilk = calculateTargetMilk(state.baby, state.growth);
  event.target.reset();
  showToast("成长记录已添加，档案体重已同步");
  saveState();
  renderAll();
});

document.querySelector("#acceptAdjust").addEventListener("click", () => {
  state.pendingAdjust = null;
  showToast("已确认调整：下一次喝奶提醒提前");
  saveState();
  renderAll();
});

document.querySelector("#dismissAdjust").addEventListener("click", () => {
  state.pendingAdjust = null;
  showToast("已保留原安排");
  saveState();
  renderAll();
});

document.querySelector("#buildReport").addEventListener("click", () => {
  renderReport();
  renderTimeline();
  const createdAt = new Date().toISOString();
  const summary = `完成 ${state.tasks.filter((taskItem) => taskItem.status === "done").length} 项，奶量 ${milkTotal()}ml，时间线 ${buildTimelineEvents().length} 条。`;
  state.reports.unshift({
    id: `report-${Date.now()}`,
    date: TODAY,
    createdAt,
    title: `${state.baby.name} ${TODAY} 照护报告`,
    summary,
    html: buildReportHtml(),
    timeline: buildTimelineEvents()
  });
  state.reports = state.reports.slice(0, 10);
  saveState();
  renderHistory();
  showToast("报告已更新");
});

document.querySelector("#reminderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.reminders.morning = document.querySelector("#morningReminder").value || state.reminders.morning;
  state.reminders.evening = document.querySelector("#eveningReminder").value || state.reminders.evening;
  saveState();
  showToast("提醒时间已保存");
  renderReport();
});

document.querySelector("#generatePlan").addEventListener("click", () => {
  const milkTasks = state.tasks.filter((taskItem) => taskItem.category === "feeding" && taskItem.unit === "ml");
  const perFeed = state.baby.targetMilk ? Math.round(state.baby.targetMilk / milkTasks.length / 10) * 10 : 0;
  milkTasks.forEach((taskItem) => {
    taskItem.target = perFeed;
    if (taskItem.status !== "done") taskItem.actual = perFeed;
  });
  showToast("今日计划已按档案刷新");
  saveState();
  renderAll();
});

document.querySelector("#addDemoRecord").addEventListener("click", () => {
  const target = state.tasks.find((taskItem) => taskItem.id === "milk-2");
  if (target) {
    target.actual = 120;
    target.note = "示例：午间喝奶偏少";
    target.status = "done";
    target.completedAt = target.time;
    maybeCreateMilkAdjust(target);
  }
  showToast("已触发低奶量调整示例");
  saveState();
  renderAll();
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  state = structuredClone(seedState);
  state.growth = syncBirthGrowth(state);
  state.baby.targetMilk = calculateTargetMilk(state.baby, state.growth);
  activeFilter = "all";
  closeCompletion();
  saveState();
  showToast("已恢复新示例数据");
  renderAll();
  selectScreen("today");
  maybePromptProfile();
});

renderAll();
maybePromptProfile();
