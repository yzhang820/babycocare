const APP_KEY = "baoCoCareStateV5";
const OLD_KEYS = ["baoCoCareStateV4", "baoCoCareStateV3", "baoCoCareStateV2", "superMommyState"];
function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TODAY = localDateString();
function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

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

// WHO Child Growth Standards core demo reference, 0-12 months.
// p3/p50/p97 are embedded as lightweight chart guides only; production should load official LMS tables.
const whoGrowthPercentiles = {
  female: {
    weight: [
      { m: 0, p3: 2.4, p50: 3.2, p97: 4.2 },
      { m: 1, p3: 3.2, p50: 4.2, p97: 5.5 },
      { m: 2, p3: 4.0, p50: 5.1, p97: 6.6 },
      { m: 3, p3: 4.6, p50: 5.8, p97: 7.5 },
      { m: 4, p3: 5.1, p50: 6.4, p97: 8.2 },
      { m: 5, p3: 5.5, p50: 6.9, p97: 8.8 },
      { m: 6, p3: 5.8, p50: 7.3, p97: 9.3 },
      { m: 7, p3: 6.1, p50: 7.6, p97: 9.8 },
      { m: 8, p3: 6.3, p50: 7.9, p97: 10.2 },
      { m: 9, p3: 6.6, p50: 8.2, p97: 10.5 },
      { m: 10, p3: 6.8, p50: 8.5, p97: 10.9 },
      { m: 11, p3: 7.0, p50: 8.7, p97: 11.2 },
      { m: 12, p3: 7.1, p50: 8.9, p97: 11.5 }
    ],
    height: [
      { m: 0, p3: 45.6, p50: 49.1, p97: 52.7 },
      { m: 1, p3: 50.0, p50: 53.7, p97: 57.4 },
      { m: 2, p3: 53.2, p50: 57.1, p97: 61.1 },
      { m: 3, p3: 55.8, p50: 59.8, p97: 64.0 },
      { m: 4, p3: 58.0, p50: 62.1, p97: 66.4 },
      { m: 5, p3: 59.9, p50: 64.0, p97: 68.5 },
      { m: 6, p3: 61.5, p50: 65.7, p97: 70.3 },
      { m: 7, p3: 62.9, p50: 67.3, p97: 71.9 },
      { m: 8, p3: 64.3, p50: 68.7, p97: 73.5 },
      { m: 9, p3: 65.6, p50: 70.1, p97: 75.0 },
      { m: 10, p3: 66.8, p50: 71.5, p97: 76.4 },
      { m: 11, p3: 68.0, p50: 72.8, p97: 77.8 },
      { m: 12, p3: 69.2, p50: 74.0, p97: 79.2 }
    ]
  },
  male: {
    weight: [
      { m: 0, p3: 2.5, p50: 3.3, p97: 4.4 },
      { m: 1, p3: 3.4, p50: 4.5, p97: 5.8 },
      { m: 2, p3: 4.3, p50: 5.6, p97: 7.1 },
      { m: 3, p3: 5.0, p50: 6.4, p97: 8.0 },
      { m: 4, p3: 5.6, p50: 7.0, p97: 8.7 },
      { m: 5, p3: 6.0, p50: 7.5, p97: 9.3 },
      { m: 6, p3: 6.4, p50: 7.9, p97: 9.8 },
      { m: 7, p3: 6.7, p50: 8.3, p97: 10.3 },
      { m: 8, p3: 6.9, p50: 8.6, p97: 10.7 },
      { m: 9, p3: 7.1, p50: 8.9, p97: 11.0 },
      { m: 10, p3: 7.4, p50: 9.2, p97: 11.4 },
      { m: 11, p3: 7.6, p50: 9.4, p97: 11.7 },
      { m: 12, p3: 7.7, p50: 9.6, p97: 12.0 }
    ],
    height: [
      { m: 0, p3: 46.1, p50: 49.9, p97: 53.7 },
      { m: 1, p3: 50.8, p50: 54.7, p97: 58.6 },
      { m: 2, p3: 54.4, p50: 58.4, p97: 62.4 },
      { m: 3, p3: 57.3, p50: 61.4, p97: 65.5 },
      { m: 4, p3: 59.7, p50: 63.9, p97: 68.0 },
      { m: 5, p3: 61.7, p50: 65.9, p97: 70.1 },
      { m: 6, p3: 63.3, p50: 67.6, p97: 71.9 },
      { m: 7, p3: 64.8, p50: 69.2, p97: 73.5 },
      { m: 8, p3: 66.2, p50: 70.6, p97: 75.0 },
      { m: 9, p3: 67.5, p50: 72.0, p97: 76.5 },
      { m: 10, p3: 68.7, p50: 73.3, p97: 77.9 },
      { m: 11, p3: 69.9, p50: 74.5, p97: 79.2 },
      { m: 12, p3: 71.0, p50: 75.7, p97: 80.5 }
    ]
  }
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
  { month: 4, title: "脊灰疫苗第3剂", type: "免费", limit: "4月龄前后" },
  { month: 4, title: "百白破疫苗第2剂", type: "免费", limit: "4月龄前后" },
  { month: 4, title: "13价肺炎球菌结合疫苗", type: "自费", limit: "6月龄前完成基础剂次" },
  { month: 5, title: "五联/四联联合疫苗", type: "自费", limit: "按已选方案连续接种" },
  { month: 6, title: "乙肝疫苗第3剂", type: "免费", limit: "6月龄前后" },
  { month: 6, title: "A群流脑多糖疫苗第1剂", type: "免费", limit: "6月龄前后" },
  { month: 6, title: "流感疫苗", type: "自费", limit: "满6月龄后" }
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
    reportTime: "20:30"
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
  if (next.baby.avatarDataUrl && next.baby.avatarDataUrl.length > 700000) next.baby.avatarDataUrl = "";
  if (!("gender" in next.baby)) next.baby.gender = "unknown";
  if (!("profileCompleted" in next.baby)) next.baby.profileCompleted = false;
  if (!next.reminders.reportTime) next.reminders.reportTime = next.reminders.evening || "20:30";
  if (!provinceCities[next.baby.province]) next.baby.province = "上海";
  if (!provinceCities[next.baby.province].includes(next.baby.city)) next.baby.city = provinceCities[next.baby.province][0];
  next.tasks = next.tasks.map((taskItem) => (taskItem.status === "missed" ? { ...taskItem, status: "todo", note: "", completedAt: "" } : taskItem));
  next.media = next.media.map((item) => ({ ...item, thumb: item.thumb && item.thumb.length < 900000 ? item.thumb : "" }));
  next.reports = dedupeReports(next.reports);
  next.growth = syncBirthGrowth(next);
  next.baby.targetMilk = calculateTargetMilk(next.baby, next.growth);
  return next;
}

function saveState() {
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}

function dedupeReports(reports) {
  const byDate = new Map();
  [...reports]
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .forEach((report) => {
      if (report.date && !byDate.has(report.date)) byDate.set(report.date, report);
    });
  return [...byDate.values()].sort((a, b) => String(b.date).localeCompare(String(a.date)));
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
    .slice(0, 3);
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function minutesFromTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function reportIsDue() {
  return nowMinutes() >= minutesFromTime(state.reminders.reportTime || "20:30");
}

function selectScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === id));
  if (id === "report") {
    renderReport();
    renderTimeline();
  }
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

function fileToDataUrl(file, maxSize = 720, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
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
        .map((item) => `<article><span class="${item.type === "免费" ? "must" : "optional"}">${item.type}</span><b>${item.title}</b><small>${item.limit}</small></article>`)
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

function taskNeedsNumber(taskItem) {
  return taskItem.unit !== "次";
}

function clearTask(taskItem) {
  taskItem.status = "todo";
  taskItem.actual = taskItem.target;
  taskItem.note = "";
  taskItem.completedAt = "";
}

function renderCareList() {
  careList.innerHTML = visibleTasks()
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((taskItem) => {
      const stateClass = taskItem.status === "done" ? "done" : taskItem.status === "missed" ? "missed" : "";
      const needsNumber = taskNeedsNumber(taskItem);
      const value = taskItem.status === "done" && needsNumber ? `${taskItem.actual}${taskItem.unit}` : needsNumber ? `目标 ${taskItem.target}${taskItem.unit}` : "";
      const isEditing = selectedTaskId === taskItem.id;
      return `
        <article class="todo-item ${stateClass}" data-task-id="${taskItem.id}">
          <button class="todo-check" data-toggle-task="${taskItem.id}" aria-label="${taskItem.status === "done" ? "取消完成" : "编辑"} ${taskItem.title}">${taskItem.status === "done" ? "✓" : ""}</button>
          <div class="todo-main">
            <div class="todo-line">
              <span class="todo-time">${taskItem.time}</span>
              <strong>${taskItem.title}</strong>
              <span class="pill ${taskItem.required ? "required" : "optional"}">${taskItem.required ? "必做" : "选做"}</span>
            </div>
            <p>${taskItem.detail}</p>
            <span class="todo-meta">${[value, taskItem.note].filter(Boolean).join(" · ")}</span>
            ${
              isEditing
                ? `
              <div class="inline-editor">
                <label class="time-editor">时间 <input data-time="${taskItem.id}" type="time" value="${taskItem.time}" /></label>
                ${
                  needsNumber
                    ? `<div class="stepper">
                        <button type="button" data-step="${taskItem.id}" data-delta="${taskItem.unit === "ml" ? -10 : -5}">−</button>
                        <input data-actual="${taskItem.id}" type="number" step="1" value="${taskItem.actual || taskItem.target}" />
                        <button type="button" data-step="${taskItem.id}" data-delta="${taskItem.unit === "ml" ? 10 : 5}">+</button>
                        <span>${taskItem.unit}</span>
                      </div>`
                    : ""
                }
                <input data-note="${taskItem.id}" type="text" value="${taskItem.note || ""}" placeholder="备注特殊情况" />
                <div class="button-row">
                  <button class="primary small" type="button" data-save-task="${taskItem.id}">保存完成</button>
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
  const gender = state.baby.gender === "male" ? "male" : "female";
  const reference = whoGrowthPercentiles[gender];
  const plottedGrowth = state.growth.map((row) => ({ ...row, age: ageInMonths(row.date) }));
  const maxAge = Math.max(6, Math.ceil(Math.max(...plottedGrowth.map((row) => row.age), babyAgeMonths()) + 1));
  const visibleReference = {
    weight: reference.weight.filter((row) => row.m <= maxAge),
    height: reference.height.filter((row) => row.m <= maxAge)
  };
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

  const weights = [...plottedGrowth.map((item) => item.weight), ...visibleReference.weight.flatMap((item) => [item.p3, item.p97])];
  const heights = [...plottedGrowth.map((item) => item.height), ...visibleReference.height.flatMap((item) => [item.p3, item.p97])];
  const weightScale = [Math.min(...weights) - 0.4, Math.max(...weights) + 0.4];
  const heightScale = [Math.min(...heights) - 2, Math.max(...heights) + 2];
  drawPercentileBand(visibleReference.weight, weightScale[0], weightScale[1], "rgba(232, 109, 90, 0.08)", "rgba(232, 109, 90, 0.28)");
  drawPercentileBand(visibleReference.height, heightScale[0], heightScale[1], "rgba(46, 129, 121, 0.07)", "rgba(46, 129, 121, 0.24)");
  drawLine("weight", weightScale[0], weightScale[1], "#e86d5a", "体重 kg");
  drawLine("height", heightScale[0], heightScale[1], "#2e8179", "身高 cm");

  function ageInMonths(date) {
    const start = new Date(`${state.baby.birthDate}T00:00:00`);
    const end = new Date(`${date}T00:00:00`);
    return Math.max(0, (end - start) / 86400000 / 30.4375);
  }

  function xAtAge(age) {
    return pad + (age / maxAge) * (width - pad * 2);
  }

  function yAt(value, min, max) {
    return height - pad - ((value - min) / (max - min || 1)) * (height - pad * 2);
  }

  function drawPercentileBand(rows, min, max, fill, stroke) {
    if (!rows.length) return;
    ctx.fillStyle = fill;
    ctx.beginPath();
    rows.forEach((row, index) => {
      const x = xAtAge(row.m);
      const y = yAt(row.p97, min, max);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    [...rows].reverse().forEach((row) => ctx.lineTo(xAtAge(row.m), yAt(row.p3, min, max)));
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ["p3", "p50", "p97"].forEach((key) => {
      ctx.beginPath();
      rows.forEach((row, index) => {
        const x = xAtAge(row.m);
        const y = yAt(row[key], min, max);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  function drawLine(key, min, max, color, label) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    plottedGrowth.forEach((row, index) => {
      const x = xAtAge(row.age);
      const y = yAt(row[key], min, max);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    plottedGrowth.forEach((row) => {
      ctx.beginPath();
      ctx.arc(xAtAge(row.age), yAt(row[key], min, max), 4, 0, Math.PI * 2);
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
    .filter((taskItem) => taskItem.status === "done")
    .map((taskItem) => ({
      time: taskItem.completedAt || taskItem.time,
      title: `完成 · ${taskItem.title}`,
      detail: `${taskItem.actual || taskItem.target}${taskItem.unit}${taskItem.note ? ` · ${taskItem.note}` : ""}`,
      kind: "done"
    }));
  const mediaEvents = sortedMedia().map((item) => ({
    time: item.time,
    title: "照片/视频",
    detail: `${item.note || "已添加媒体记录"}${item.fileName ? ` · ${item.fileName}` : ""}`,
    kind: "media",
    thumb: item.thumb || ""
  }));
  return [...taskEvents, ...mediaEvents].sort((a, b) => String(a.time).localeCompare(String(b.time)));
}

function sortedMedia() {
  return [...state.media].sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
}

function renderTimeline() {
  const events = buildTimelineEvents();
  document.querySelector("#timelineCount").textContent = `${events.length} 条`;
  timeline.innerHTML = events
    .map((event) => `<div class="timeline-item ${event.kind}"><strong>${event.time} · ${event.title}</strong><span>${event.detail}</span>${event.thumb ? `<img src="${event.thumb}" alt="记录缩略图" />` : ""}</div>`)
    .join("");
}

function renderMediaGrid() {
  const grid = document.querySelector("#mediaGrid");
  const count = document.querySelector("#mediaCount");
  count.textContent = `${state.media.length} 条`;
  grid.innerHTML = state.media.length
    ? sortedMedia()
        .slice(0, 80)
        .map(
          (item) => `
            <article class="media-card">
              ${item.thumb ? `<img src="${item.thumb}" alt="${item.note || "照片记录"}" loading="lazy" decoding="async" />` : `<div class="media-placeholder">视频</div>`}
              <div>
                <strong>${item.time}</strong>
                <p>${item.note || item.fileName || "成长片段"}</p>
              </div>
            </article>
          `
        )
        .join("")
    : `<article class="media-card empty"><strong>还没有照片视频</strong><p>上传后会在这里和报告时间线里展示。</p></article>`;
}

function renderHistory() {
  const mockReports = [
    { id: "mock-report-1", date: offsetDate(-1), createdAt: `${offsetDate(-1)}T20:30:00.000Z`, title: `${state.baby.name} 昨日简报`, summary: "喂养节奏稳定，完成睡眠与互动记录。", timeline: [] },
    { id: "mock-report-2", date: offsetDate(-2), createdAt: `${offsetDate(-2)}T20:30:00.000Z`, title: `${state.baby.name} 前日简报`, summary: "完成疫苗提醒核对，外出准备记录完整。", timeline: [] }
  ];
  const reports = (state.reports.length ? [...state.reports] : mockReports).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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
    : "";
}

function reportSummaryText() {
  return `完成 ${state.tasks.filter((taskItem) => taskItem.status === "done").length} 项，奶量 ${milkTotal()}ml，时间线 ${buildTimelineEvents().length} 条。`;
}

function ensureDailyReport() {
  if (!reportIsDue()) return null;
  const existing = state.reports.find((report) => report.date === TODAY);
  const report = {
    id: existing?.id || `report-${TODAY}`,
    date: TODAY,
    createdAt: existing?.createdAt || new Date().toISOString(),
    title: `${state.baby.name} ${TODAY} 日报`,
    summary: reportSummaryText(),
    html: buildReportHtml(),
    timeline: buildTimelineEvents()
  };
  state.reports = [report, ...state.reports.filter((item) => item.date !== TODAY)].slice(0, 14);
  saveState();
  return report;
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
  const reportTime = state.reminders.reportTime || "20:30";
  document.querySelector("#reportTimeTitle").textContent = "日报生成时间";
  document.querySelector("#reportTimeText").textContent = reportTime;
  document.querySelector("#eveningReminder").value = reportTime;
  const report = ensureDailyReport() || state.reports.find((item) => item.date === TODAY) || { date: TODAY, createdAt: `${TODAY}T${reportTime}:00.000Z`, html: buildReportHtml() };
  document.querySelector("#reportCard").innerHTML = `<p class="report-stamp">${report.date} · ${report.createdAt.slice(11, 16)}</p>${report.html}`;
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
  renderMediaGrid();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectScreen(tab.dataset.tab));
});

let touchStartX = 0;
let touchStartY = 0;
document.querySelector(".app-shell").addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});
document.querySelector(".app-shell").addEventListener("touchend", (event) => {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  const tabIds = [...tabs].map((tab) => tab.dataset.tab);
  const current = tabIds.findIndex((id) => document.querySelector(`#${id}`).classList.contains("active"));
  const next = dx < 0 ? Math.min(tabIds.length - 1, current + 1) : Math.max(0, current - 1);
  if (next !== current) selectScreen(tabIds[next]);
});

document.addEventListener("click", (event) => {
  const jump = event.target.closest("[data-tab-jump]");
  if (jump) selectScreen(jump.dataset.tabJump);

  const toggle = event.target.closest("[data-toggle-task]");
  if (toggle) {
    event.stopPropagation();
    const taskItem = state.tasks.find((item) => item.id === toggle.dataset.toggleTask);
    if (!taskItem) return;
    if (taskItem.status === "done") {
      clearTask(taskItem);
      selectedTaskId = null;
      saveState();
      renderAll();
      return;
    }
    openCompletion(taskItem.id);
    return;
  }

  const card = event.target.closest("[data-task-id]");
  const insideControl = event.target.closest("button, input, select, textarea");
  if (card && !insideControl) openCompletion(card.dataset.taskId);
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

document.addEventListener("click", (event) => {
  const step = event.target.closest("[data-step]");
  const save = event.target.closest("[data-save-task]");
  const cancel = event.target.closest("[data-cancel-task]");

  if (step) {
    const input = document.querySelector(`[data-actual="${step.dataset.step}"]`);
    const next = Math.max(0, Number(input.value || 0) + Number(step.dataset.delta || 0));
    input.value = next;
  }

  if (save) {
    const id = save.dataset.saveTask;
    const taskItem = state.tasks.find((item) => item.id === id);
    if (!taskItem) return;
    const actualInput = document.querySelector(`[data-actual="${id}"]`);
    const timeInput = document.querySelector(`[data-time="${id}"]`);
    taskItem.time = timeInput?.value || taskItem.time;
    taskItem.actual = actualInput ? Number(actualInput.value || taskItem.target) : taskItem.target;
    taskItem.note = document.querySelector(`[data-note="${id}"]`).value.trim();
    taskItem.status = "done";
    taskItem.completedAt = taskItem.time;
    maybeCreateMilkAdjust(taskItem);
    selectedTaskId = null;
    saveState();
    renderAll();
  }

  if (cancel) {
    selectedTaskId = null;
    renderCareList();
  }
});

document.querySelector("#mediaForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const files = [...document.querySelector("#mediaInput").files];
  const note = document.querySelector("#mediaNote").value.trim();
  const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  if (!files.length && !note) return;
  try {
    const createdAt = Date.now();
    const items = await Promise.all(
      (files.length ? files : [null]).map(async (file, index) => {
        const thumb = file ? await fileToDataUrl(file, 900, 0.72) : "";
        return {
          id: `media-${createdAt}-${index}`,
          createdAt: createdAt + index,
          time,
          fileName: file ? file.name : "",
          note,
          thumb,
          kind: file?.type.startsWith("video/") ? "video" : "image"
        };
      })
    );
    state.media.push(...items);
    event.target.reset();
    saveState();
    renderAll();
  } catch (error) {
    showToast("图片处理失败，请换一张再试");
  }
});

document.querySelector("#profileAvatar").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  fileToDataUrl(file, 320, 0.72)
    .then((dataUrl) => {
      state.baby.avatarDataUrl = dataUrl;
      saveState();
      renderSummary();
      showToast("宝宝头像已更新");
    })
    .catch(() => {
      showToast("头像处理失败，请换一张再试");
    });
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
  const date = localDateString();
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

document.querySelector("#reminderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.reminders.reportTime = document.querySelector("#eveningReminder").value || state.reminders.reportTime;
  state.reports = state.reports.filter((report) => report.date !== TODAY);
  document.querySelector("#reportTimePopover").classList.add("hidden");
  saveState();
  showToast("日报生成时间已保存");
  renderReport();
});

document.querySelector("#openReportTime").addEventListener("click", () => {
  document.querySelector("#eveningReminder").value = state.reminders.reportTime || "20:30";
  document.querySelector("#reportTimePopover").classList.remove("hidden");
});

document.querySelector("#closeReportTime").addEventListener("click", () => {
  document.querySelector("#reportTimePopover").classList.add("hidden");
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
