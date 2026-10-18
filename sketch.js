// =====================================================================
//  PBL 範例程式：交通安全小達人（多媒體測驗系統）
//
//  這份程式是《PBL 專題：設計我的多媒體測驗系統》的參考範本。
//  程式最上面的設定區，每一段都對應 PBL 文件的一個章節：
//
//    PBL 1-1、1-2  需求分析  →  PROJECT（使用者、學習目標）
//    PBL 2-2       功能規格  →  FEATURES（功能開關 F1～F7）
//    PBL 2-4       視覺風格  →  STYLE（顏色、字級）
//    PBL 2-5       題目設計  →  QUESTIONS（題目資料）
//    PBL 2-6       素材清單  →  MEDIA_CREDITS（來源與授權）
//    PBL 3-5       測試紀錄  →  作答結束時在 Console 印出測試表
//
//  這個範例的動畫與聲音都是程式產生的，不需要任何圖檔或音檔，
//  搭配 index.html 與 libraries/p5.min.js 就能執行。
//  做自己的專題時，先改設定區；程式主體（第 3 段以後）通常不用改。
// =====================================================================


// ---------------------------------------------------------------------
// 1. 設定區（學生主要修改這裡）
// ---------------------------------------------------------------------

// ▍PBL 1-1、1-2：需求分析
const PROJECT = {
  title: "交通安全小達人",
  subtitle: "看動畫、聽聲音，學會安全走在路上",
  users: "國小三年級學生，在課堂上用平板或電腦作答，一次約 5 分鐘",
  goals: [
    { id: 1, text: "能看懂行人號誌與紅綠燈的意思" },
    { id: 2, text: "能分辨路上常見的警示聲音，並做出正確反應" },
    { id: 3, text: "能說出過馬路與雨天走路的安全做法" },
  ],
};

// ▍PBL 2-2：功能規格（true 開啟、false 關閉）
const FEATURES = {
  F1_startScreen: true,     // 開始畫面：顯示使用對象與學習目標
  F2_shuffleOptions: true,  // 選項順序每次打亂
  F3_autoPlaySound: true,   // 聲音題自動播放一次
  F4_explain: true,         // 作答後顯示解說
  F5_timer: true,           // 顯示作答時間
  F6_retryWrong: true,      // 成績頁可以「錯題再練」
  F7_keyboard: true,        // 鍵盤 1～4 作答、Enter 下一題
};

// ▍PBL 2-4：視覺風格
const STYLE = {
  bg: "#F1F3EE", panel: "#FFFFFF", ink: "#1E2A22", muted: "#5D6B62", line: "#D3DAD4",
  primary: "#1F7A4D",       // 主色：安全綠
  primaryDark: "#17603C",
  accent: "#F2B705",        // 輔色：警示黃
  ok: "#1F7A4D", okSoft: "#E2F2E8",
  bad: "#C8372D", badSoft: "#FBE6E3",
  screen: "#26302B",
};

// ▍PBL 2-5：題目設計
//  type 題型：
//    "anim"  程式動畫  → anim：pedSignal / trafficCar / crosswalk / rainNight
//    "sound" 程式聲音  → sound：siren / horn / crossing / bike
//    "image" 自備圖片  → src："media/檔名.png"（GIF 也可以）
//    "audio" 自備音檔  → src："media/檔名.mp3"
//    "video" 自備影片  → src："media/檔名.mp4"
//  goal：對應 PROJECT.goals 的 id，成績頁會依學習目標統計
const QUESTIONS = [
  { id: "Q1", type: "anim", anim: "pedSignal", goal: 1,
    q: "行人號誌的小綠人開始「閃爍」，表示什麼？",
    options: ["快要變紅燈了，還沒走的人先等下一次", "可以慢慢走過去", "要用跑的衝過去", "紅燈已經亮了"],
    answer: "快要變紅燈了，還沒走的人先等下一次",
    explain: "小綠人閃爍表示快要變紅燈。已經走到一半的人加快腳步走完，還沒出發的人要在路邊等。" },
  { id: "Q2", type: "sound", sound: "siren", goal: 2,
    q: "聽到這個聲音，路上的車子和行人應該怎麼做？",
    options: ["讓路給救護車", "跟在救護車後面", "停在路中間看", "按喇叭回應"],
    answer: "讓路給救護車",
    explain: "這是救護車的警笛聲。車子要靠邊讓路，行人不要在這時候過馬路。" },
  { id: "Q3", type: "anim", anim: "trafficCar", goal: 1,
    q: "動畫裡的車子為什麼停下來？",
    options: ["因為紅燈亮了", "因為車子沒油了", "因為司機想休息", "因為綠燈亮了"],
    answer: "因為紅燈亮了",
    explain: "紅燈要停、綠燈才能走。黃燈表示快要變紅燈，車子要準備停下來。" },
  { id: "Q4", type: "sound", sound: "crossing", goal: 2,
    q: "聽到「噹噹噹」的聲音，柵欄放下來了，應該怎麼做？",
    options: ["停在柵欄外，等火車通過", "趁柵欄還沒放下趕快跑過去", "從柵欄下面鑽過去", "站在鐵軌上看火車"],
    answer: "停在柵欄外，等火車通過",
    explain: "這是平交道的警鈴。鈴聲響起就表示火車快來了，一定要停在柵欄外。" },
  { id: "Q5", type: "anim", anim: "crosswalk", goal: 3,
    q: "過馬路之前，動畫裡的小朋友先做了什麼？",
    options: ["停下來，左右看清楚有沒有車", "低頭看手機", "直接跑過去", "閉上眼睛"],
    answer: "停下來，左右看清楚有沒有車",
    explain: "過馬路要「停、看、聽」：先停在路邊，左右看、仔細聽，確定沒有車再走斑馬線。" },
  { id: "Q6", type: "sound", sound: "horn", goal: 2,
    q: "走在路邊聽到這個聲音，最可能是什麼？",
    options: ["汽車在按喇叭提醒", "腳踏車的鈴聲", "學校的上課鐘", "救護車的警笛"],
    answer: "汽車在按喇叭提醒",
    explain: "這是汽車喇叭聲，通常是提醒附近的人注意。聽到時要停下來看看車子在哪裡。" },
  { id: "Q7", type: "anim", anim: "rainNight", goal: 3,
    q: "下雨的晚上，哪一位行人比較容易被開車的人看見？",
    options: ["穿黃色雨衣、有反光條的人", "穿黑色雨衣的人", "兩個人一樣清楚", "撐黑色雨傘的人"],
    answer: "穿黃色雨衣、有反光條的人",
    explain: "亮色衣服和反光條在車燈照射下會發亮，開車的人比較早看到，比較安全。" },
  { id: "Q8", type: "sound", sound: "bike", goal: 2,
    q: "走在人行道上，聽到後面傳來這個聲音，應該怎麼做？",
    options: ["靠邊走，讓腳踏車通過", "突然轉身擋住", "走到馬路中間", "假裝沒聽到"],
    answer: "靠邊走，讓腳踏車通過",
    explain: "這是腳踏車的鈴聲，表示後面有腳踏車要經過。靠邊走、不要突然轉向。" },
  // ─── 自備媒體的寫法（把檔案放進 media 資料夾，再把下面的 // 拿掉）───
  // { id: "Q9", type: "image", src: "media/school_zone.png", goal: 1,
  //   q: "這個標誌代表什麼？", options: ["學校附近，要放慢速度", "停車場", "加油站"],
  //   answer: "學校附近，要放慢速度", explain: "看到學校標誌，表示附近常有學生，車子要慢行。" },
];

// ▍PBL 2-6：素材清單（本範例全部為程式自製）
const MEDIA_CREDITS = [
  { item: "四段動畫（行人號誌、紅綠燈、斑馬線、雨夜）", source: "p5.js 程式繪製", license: "自製" },
  { item: "四種聲音（警笛、喇叭、平交道、腳踏車鈴）", source: "Web Audio 程式合成", license: "自製" },
];


// ---------------------------------------------------------------------
// 2. 狀態變數
// ---------------------------------------------------------------------
let screen = "start";            // start → quiz → result（對應 PBL 2-3 流程圖）
let queue = [];                  // 這一輪要作答的題目（QUESTIONS 的索引）
let pos = 0;                     // 目前是這一輪的第幾題
let opts = [];                   // 打亂後的選項
let records = [];                // 這一輪的作答紀錄 {qi, chosen, correct, ms}
let roundNo = 1;
let roundStart = 0, qStart = 0, answeredAt = 0, resultAt = 0;
let hits = [];                   // 這一幀可以點的區域
let L = {};                      // 版面尺寸
let lastTouch = -9999;
const ART_W = 220, ART_H = 150;  // 動畫的原始座標大小


// ---------------------------------------------------------------------
// 3. p5.js 主程式
// ---------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("sans-serif");        // 只填一個字型名稱，中文會自動補字
  textWrap(CHAR);                // 中文逐字換行
  loadCustomMedia();
  if (!FEATURES.F1_startScreen) startRound(allIndexes());
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function draw() {
  background(STYLE.bg);
  hits = [];
  L.fs = constrain(min(width, height * 1.25) / 52, 13, 18);
  L.pad = constrain(width * 0.04, 16, 32);
  L.w = min(width - L.pad * 2, 720);
  L.x = (width - L.w) / 2;

  if (screen === "start") drawStart();
  else if (screen === "quiz") drawQuiz();
  else drawResult();

  cursor(hits.some(h => inRect(mouseX, mouseY, h)) ? HAND : ARROW);
}


// ---------------------------------------------------------------------
// 4. 開始畫面（F1）
// ---------------------------------------------------------------------
function drawStart() {
  const fs = L.fs, cx = width / 2, x = L.x, w = L.w;
  const mW = min(w, 460), mH = min(mW * ART_H / ART_W, height * 0.3), mW2 = mH * ART_W / ART_H;
  const goalsH = PROJECT.goals.length * fs * 1.7;
  const total = fs * 7 + mH + fs * 3.5 + goalsH + fs * 5;
  let y = max(L.pad, (height - total) / 2);

  noStroke(); textAlign(CENTER, TOP);
  fill(STYLE.primary); textStyle(BOLD); textSize(fs * 0.8);
  text("MULTIMEDIA QUIZ · PBL 範例", cx, y);
  fill(STYLE.ink); textSize(fs * 2.3);
  text(PROJECT.title, cx, y + fs * 1.4);
  fill(STYLE.muted); textStyle(NORMAL); textSize(fs);
  text(PROJECT.subtitle, cx, y + fs * 4.4);
  y += fs * 7;

  const keys = Object.keys(ANIMS), k = keys[floor(millis() / 3000) % keys.length];
  drawArt(cx - mW2 / 2, y, mW2, mH, ANIMS[k]);
  y += mH + fs * 1.2;

  // 使用對象與學習目標（來自 PBL 需求分析）
  fill(STYLE.panel); stroke(STYLE.line); strokeWeight(1);
  const boxH = fs * 2.4 + goalsH;
  rect(x, y, w, boxH, 12);
  noStroke(); fill(STYLE.primary); textStyle(BOLD); textSize(fs * 0.8); textAlign(LEFT, TOP);
  text("學完這個測驗，你可以：", x + fs, y + fs * 0.7);
  textStyle(NORMAL); textSize(fs * 0.95);
  PROJECT.goals.forEach((g, i) => {
    const gy = y + fs * 2 + i * fs * 1.7;
    fill(STYLE.accent); circle(x + fs * 1.4, gy + fs * 0.6, fs * 1.2);
    fill(STYLE.ink); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(fs * 0.7);
    text(g.id, x + fs * 1.4, gy + fs * 0.6);
    textAlign(LEFT, TOP); textStyle(NORMAL); textSize(fs * 0.95);
    text(g.text, x + fs * 2.6, gy, w - fs * 3.6, fs * 1.6);
  });
  y += boxH + fs * 0.9;

  fill(STYLE.muted); textSize(fs * 0.8); textAlign(CENTER, TOP);
  text("共 " + QUESTIONS.length + " 題・有聲音題，請打開喇叭", cx, y);
  y += fs * 1.7;
  const bw = min(300, w), bh = fs * 3;
  button(cx - bw / 2, y, bw, bh, "開始測驗", true, () => startRound(allIndexes()));
}


// ---------------------------------------------------------------------
// 5. 作答畫面（F2～F5、F7）
// ---------------------------------------------------------------------
function drawQuiz() {
  const fs = L.fs, x = L.x, w = L.w;
  const qi = queue[pos], q = QUESTIONS[qi];
  const rec = records[pos];
  let y = L.pad * 0.7;

  // 上方：題號、時間、進度條
  noStroke(); fill(STYLE.ink); textStyle(BOLD); textSize(fs * 1.05); textAlign(LEFT, CENTER);
  text((roundNo > 1 ? "錯題再練・" : "") + "第 " + (pos + 1) + " / " + queue.length + " 題", x, y + fs);
  if (FEATURES.F5_timer) {
    fill(STYLE.muted); textStyle(NORMAL); textSize(fs * 0.85); textAlign(RIGHT, CENTER);
    text("時間 " + mmss(millis() - roundStart), x + w, y + fs);
  }
  y += fs * 2.3;
  const segW = (w - (queue.length - 1) * 4) / queue.length;
  queue.forEach((_, i) => {
    let c = STYLE.line;
    if (records[i]) c = records[i].correct ? STYLE.ok : STYLE.bad;
    else if (i === pos) c = STYLE.accent;
    fill(c); rect(x + i * (segW + 4), y, segW, 6, 3);
  });
  y += 6 + fs;

  // 計算高度
  const cols = w >= 560 ? 2 : 1, rows = ceil(opts.length / cols);
  const btnH = fs * 3, btnsH = rows * btnH + (rows - 1) * 10;
  const qH = fs * 1.25 * 2.5, fbH = fs * 7, gap = fs * 0.9;
  const mH = constrain(height - y - L.pad * 0.7 - qH - btnsH - fbH - gap * 3, 90, w * ART_H / ART_W);
  const mW = min(w, mH * ART_W / ART_H);

  // 多媒體區
  drawMedia(q, x + (w - mW) / 2, y, mW, mH);
  y += mH + gap;

  // 題目
  fill(STYLE.ink); textStyle(BOLD); textSize(fs * 1.2); textAlign(CENTER, TOP);
  text(q.q, x, y, w, qH);
  y += qH + gap * 0.4;

  // 選項
  const bw = (w - (cols - 1) * 10) / cols;
  opts.forEach((o, i) => optionButton(i, o, x + (i % cols) * (bw + 10), y + floor(i / cols) * (btnH + 10), bw, btnH, q, rec));
  y += btnsH + gap;

  // 回饋
  if (rec) feedback(q, rec, x, y, w, fbH);
  else {
    fill(STYLE.muted); textStyle(NORMAL); textSize(fs * 0.85); textAlign(CENTER, TOP);
    const tip = isSoundType(q) ? "點上面的畫面可以再聽一次" : "選出一個答案";
    text(tip + (FEATURES.F7_keyboard && width >= 700 ? "（鍵盤 1～" + opts.length + " 也可以）" : ""), x, y + fs * 0.4, w);
  }
}

function optionButton(i, label, x, y, w, h, q, rec) {
  const fs = L.fs, answered = !!rec;
  const isAns = label === q.answer, chosen = rec && rec.chosen === label;
  const hover = !answered && inRect(mouseX, mouseY, { x, y, w, h });
  let bg = STYLE.panel, bd = STYLE.line, badge = STYLE.ink, ink = STYLE.ink;
  if (hover) { bd = STYLE.primary; badge = STYLE.primary; }
  if (answered) {
    if (isAns) { bg = STYLE.okSoft; bd = STYLE.ok; badge = STYLE.ok; }
    else if (chosen) { bg = STYLE.badSoft; bd = STYLE.bad; badge = STYLE.bad; }
    else { ink = STYLE.muted; badge = STYLE.line; }
  }
  fill(bg); stroke(bd); strokeWeight(hover || (answered && (isAns || chosen)) ? 2.5 : 1.5);
  rect(x, y, w, h, 12);
  noStroke(); fill(badge); circle(x + h / 2, y + h / 2, h * 0.6);
  fill(255); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(fs * 0.9);
  text(answered && isAns ? "✓" : chosen ? "✗" : i + 1, x + h / 2, y + h / 2);
  fill(ink); textAlign(LEFT, CENTER);
  let size = fs * 1.05; textSize(size);
  while (textWidth(label) > w - h - fs && size > fs * 0.7) { size -= 1; textSize(size); }
  text(label, x + h, y + h / 2);
  if (!answered) addHit(x, y, w, h, () => choose(i));
}

function feedback(q, rec, x, y, w, h) {
  const fs = L.fs, ok = rec.correct, last = pos === queue.length - 1;
  noStroke(); fill(ok ? STYLE.okSoft : STYLE.badSoft); rect(x, y, w, h, 12);
  fill(ok ? STYLE.ok : STYLE.bad); rect(x, y, 6, h, 12, 0, 0, 12);
  const bw = min(fs * 8, w * 0.34), bh = fs * 2.8, tw = w - bw - fs * 2.6;
  textAlign(LEFT, TOP); textStyle(BOLD); textSize(fs * 1.05);
  const title = ok ? "答對了！" : "正確答案是「" + q.answer + "」";
  const titleLines = textWidth(title) > tw ? 2 : 1;          // 標題太長會換成兩行
  text(title, x + fs * 1.1, y + fs * 0.7, tw, fs * 2.8);
  if (FEATURES.F4_explain) {
    const ey = fs * (0.9 + titleLines * 1.45);
    fill(STYLE.ink); textStyle(NORMAL); textSize(fs * 0.88);
    text(q.explain, x + fs * 1.1, y + ey, tw, h - ey - fs * 0.3);
  }
  button(x + w - bw - fs * 0.8, y + (h - bh) / 2, bw, bh, last ? "看成績" : "下一題", true, next);
}


// ---------------------------------------------------------------------
// 6. 成績畫面（依學習目標統計、F6 錯題再練）
// ---------------------------------------------------------------------
function drawResult() {
  const fs = L.fs, x = L.x, w = L.w, cx = width / 2;
  const n = records.length, right = records.filter(r => r.correct).length;
  const score = roundNo === 1 ? Math.round(right / n * 100) : null;
  const wrong = records.filter(r => !r.correct);
  const rowH = fs * 2.3;
  const total = fs * 11 + PROJECT.goals.length * rowH + fs * 2.5 + fs * 4;
  let y = max(L.pad, (height - total) / 2);

  noStroke(); textAlign(CENTER, TOP);
  fill(STYLE.primary); textStyle(BOLD); textSize(fs * 0.8);
  text(roundNo === 1 ? "測驗完成" : "錯題再練完成", cx, y);
  fill(STYLE.ink); textSize(fs * 1.4);
  text(PROJECT.title, cx, y + fs * 1.3);

  const p = easeOut(constrain((millis() - resultAt) / 900, 0, 1));
  fill(STYLE.primary); textSize(fs * 4);
  const big = score !== null ? String(round(score * p)) : right + "/" + n;
  text(big, cx, y + fs * 3.1);
  fill(STYLE.muted); textStyle(NORMAL); textSize(fs * 0.9);
  const tline = (score !== null ? "分・" : "題答對・") + "答對 " + right + " / " + n + " 題" +
    (FEATURES.F5_timer ? "・用時 " + mmss(resultAt - roundStart) : "");
  text(tline, cx, y + fs * 8);
  y += fs * 10;

  // 每個學習目標的達成情形（對應 PBL 1-2）
  fill(STYLE.panel); stroke(STYLE.line); strokeWeight(1);
  rect(x, y, w, PROJECT.goals.length * rowH + fs * 2.2, 12);
  noStroke(); fill(STYLE.primary); textStyle(BOLD); textSize(fs * 0.8); textAlign(LEFT, TOP);
  text("學習目標達成情形", x + fs, y + fs * 0.6);
  PROJECT.goals.forEach((g, i) => {
    const gy = y + fs * 2 + i * rowH;
    const rs = records.filter(r => QUESTIONS[r.qi].goal === g.id);
    const ok = rs.filter(r => r.correct).length;
    const ratio = rs.length ? ok / rs.length : 0;
    fill(STYLE.ink); textStyle(NORMAL); textSize(fs * 0.85); textAlign(LEFT, TOP);
    text(g.id + ". " + g.text, x + fs, gy, w * 0.55, rowH);
    const bx = x + w * 0.6, bw = w * 0.4 - fs * 4.2, by = gy + fs * 0.35;
    fill(STYLE.line); rect(bx, by, bw, fs * 0.7, 4);
    fill(ratio >= 0.8 ? STYLE.ok : ratio >= 0.5 ? STYLE.accent : STYLE.bad);
    rect(bx, by, bw * ratio * p, fs * 0.7, 4);
    fill(STYLE.muted); textAlign(RIGHT, TOP); textSize(fs * 0.8);
    text(rs.length ? ok + "/" + rs.length : "—", x + w - fs, gy);
  });
  y += PROJECT.goals.length * rowH + fs * 3;

  // 按鈕
  const bh = fs * 3;
  const btns = [];
  if (FEATURES.F6_retryWrong && wrong.length) btns.push(["錯題再練（" + wrong.length + " 題）", true, () => startRound(wrong.map(r => r.qi))]);
  btns.push(["從頭再玩", !btns.length, () => startRound(allIndexes())]);
  if (FEATURES.F1_startScreen) btns.push(["回到首頁", false, () => { stopSounds(); screen = "start"; }]);
  const bw = min(220, (w - (btns.length - 1) * 10) / btns.length);
  let bx = cx - (btns.length * bw + (btns.length - 1) * 10) / 2;
  btns.forEach(([label, primary, fn]) => { button(bx, y, bw, bh, label, primary, fn); bx += bw + 10; });
}


// ---------------------------------------------------------------------
// 7. 流程控制
// ---------------------------------------------------------------------
function allIndexes() { return QUESTIONS.map((_, i) => i); }

function startRound(list) {
  audio();                                   // 使用者點擊後才能啟用聲音
  roundNo = screen === "result" && list.length < QUESTIONS.length ? roundNo + 1 : 1;
  queue = list; pos = 0; records = [];
  roundStart = millis();
  screen = "quiz";
  enterQuestion();
}

function enterQuestion() {
  stopSounds();
  const q = QUESTIONS[queue[pos]];
  opts = FEATURES.F2_shuffleOptions ? shuffle(q.options.slice()) : q.options.slice();
  qStart = millis();
  if (FEATURES.F3_autoPlaySound && isSoundType(q)) {
    const here = pos;
    setTimeout(() => { if (screen === "quiz" && pos === here && !records[pos]) playMedia(q); }, 500);
  }
}

function choose(i) {
  if (records[pos]) return;
  const q = QUESTIONS[queue[pos]];
  const correct = opts[i] === q.answer;
  records[pos] = { qi: queue[pos], chosen: opts[i], correct, ms: round_(millis() - qStart) };
  answeredAt = millis();
  stopSounds();
  if (correct) { bell(880, 0, 0.5, 0.2); bell(1320, 0.12, 0.6, 0.18); }
  else tone(300, 190, 0, 0.35, 0.12, "sawtooth");
}

function next() {
  if (pos < queue.length - 1) { pos++; enterQuestion(); return; }
  stopSounds();
  screen = "result";
  resultAt = millis();
  printTestLog();
}

// PBL 3-5：測試紀錄。按 F12 開啟 Console 就能看到每一題的作答結果
function printTestLog() {
  console.log("【" + PROJECT.title + "】第 " + roundNo + " 輪作答紀錄");
  console.table(records.map(r => ({
    題號: QUESTIONS[r.qi].id, 題型: QUESTIONS[r.qi].type, 學習目標: QUESTIONS[r.qi].goal,
    選擇: r.chosen, 正確: r.correct ? "✓" : "✗", 作答秒數: (r.ms / 1000).toFixed(1),
  })));
}


// ---------------------------------------------------------------------
// 8. 多媒體區
// ---------------------------------------------------------------------
function drawMedia(q, x, y, w, h) {
  if (q.type === "anim") drawArt(x, y, w, h, ANIMS[q.anim]);
  else if (q.type === "image") {
    panel(x, y, w, h);
    if (q.img && q.img.width > 1) cover(q.img, q.img.width, q.img.height, x, y, w, h);
    else note(q.failed ? "找不到圖片：" + q.src : "圖片載入中…", x, y, w, h);
  } else if (q.type === "video") {
    panel(x, y, w, h);
    if (q.vid && q.vid.elt.videoWidth) {
      cover(q.vid, q.vid.elt.videoWidth, q.vid.elt.videoHeight, x, y, w, h);
      if (q.vid.elt.paused) playIcon(x + w / 2, y + h / 2, min(w, h) * 0.26, false);
    } else note(q.failed ? "找不到影片：" + q.src : "影片載入中…", x, y, w, h);
    addHit(x, y, w, h, () => playMedia(q));
  } else {                                   // sound、audio：頻譜畫面
    soundPanel(q, x, y, w, h);
    addHit(x, y, w, h, () => playMedia(q));
  }
  // 左上角標籤
  const tag = { anim: "看動畫", sound: "聽聲音", audio: "聽聲音", image: "看圖片", video: "看影片" }[q.type];
  textStyle(BOLD); textSize(L.fs * 0.72);
  const tw = textWidth(tag) + L.fs * 1.2;
  noStroke(); fill(0, 120); rect(x + 10, y + 10, tw, L.fs * 1.6, 6);
  fill(255); textAlign(CENTER, CENTER); text(tag, x + 10 + tw / 2, y + 10 + L.fs * 0.8);
  textStyle(NORMAL);
}

function soundPanel(q, x, y, w, h) {
  const playing = isPlaying(q);
  panel(x, y, w, h);
  drawingContext.save(); clipRound(x, y, w, h, 14);
  const bars = 28, bw = w / bars;
  if (playing && analyser) analyser.getByteFrequencyData(freqData);
  for (let i = 0; i < bars; i++) {
    const v = playing && freqData ? freqData[floor(i * freqData.length * 0.75 / bars)] / 255 : 0.05 + 0.03 * sin(millis() / 500 + i * 0.6);
    fill(lerpColor(color(STYLE.primary), color(STYLE.accent), i / bars));
    rect(x + i * bw + 2, y + h - v * h * 0.75, bw - 4, v * h * 0.75, 2);
  }
  drawingContext.restore();
  const r = min(w, h) * 0.26;
  playIcon(x + w / 2, y + h / 2 - L.fs * 0.6, r * (playing ? 1 + 0.05 * sin(millis() / 120) : 1), playing);
  let msg = playing ? "播放中…" : "點這裡聽聲音";
  if (q.type === "audio" && !(q.snd && q.snd.readyState >= 2)) msg = q.failed ? "找不到音檔：" + q.src : "音檔載入中…";
  textStyle(BOLD); textSize(L.fs * 0.85);
  const mw = textWidth(msg) + L.fs * 1.6, my = y + h / 2 + r * 0.55;
  noStroke(); fill(0, 160); rect(x + w / 2 - mw / 2, my, mw, L.fs * 1.8, L.fs * 0.9);
  fill(255); textAlign(CENTER, CENTER); text(msg, x + w / 2, my + L.fs * 0.9);
  textStyle(NORMAL);
}

function playIcon(cx, cy, r, playing) {
  noStroke(); fill(255, 235); circle(cx, cy, r);
  fill(STYLE.primary);
  if (playing) { rect(cx - r * 0.13, cy - r * 0.16, r * 0.09, r * 0.32); rect(cx + r * 0.04, cy - r * 0.16, r * 0.09, r * 0.32); }
  else triangle(cx - r * 0.12, cy - r * 0.2, cx - r * 0.12, cy + r * 0.2, cx + r * 0.22, cy);
}

// 自備媒體：用 HTML 元素載入，讀不到時畫面會提示
function loadCustomMedia() {
  for (const q of QUESTIONS) {
    if (q.type === "image") q.img = loadImage(q.src, () => {}, () => q.failed = true);
    if (q.type === "audio") { q.snd = new Audio(q.src); q.snd.onerror = () => q.failed = true; }
    if (q.type === "video") {
      q.vid = createVideo(q.src); q.vid.hide();
      q.vid.elt.setAttribute("playsinline", ""); q.vid.elt.onerror = () => q.failed = true;
    }
  }
}

function playMedia(q) {
  audio();
  if (q.type === "sound") { stopSounds(); playingUntil = millis() + SOUNDS[q.sound]() * 1000; }
  else if (q.type === "audio" && q.snd) { q.snd.currentTime = 0; q.snd.play(); }
  else if (q.type === "video" && q.vid) { q.vid.elt.paused ? q.vid.play() : q.vid.pause(); }
}

function isSoundType(q) { return q.type === "sound" || q.type === "audio"; }
function isPlaying(q) {
  if (q.type === "sound") return millis() < playingUntil;
  if (q.type === "audio") return !!(q.snd && !q.snd.paused);
  return false;
}


// ---------------------------------------------------------------------
// 9. 聲音合成（Web Audio）
// ---------------------------------------------------------------------
let AC = null, master, analyser, freqData, active = [], playingUntil = 0;

function audio() {
  if (!AC) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    AC = new Ctx();
    master = AC.createGain(); master.gain.value = 0.8;
    analyser = AC.createAnalyser(); analyser.fftSize = 128;
    freqData = new Uint8Array(analyser.frequencyBinCount);
    master.connect(analyser); analyser.connect(AC.destination);
  }
  if (AC.state === "suspended") AC.resume();
  return AC;
}

// 一個短音：f1 滑到 f2；hold = true 時音量維持到最後（喇叭聲）
function tone(f1, f2, start, dur, vol, type = "sine", hold = false) {
  const ac = audio(); if (!ac) return;
  const t = ac.currentTime + start, o = ac.createOscillator(), g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f1, t);
  if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + dur * 0.8);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  if (hold) g.gain.setValueAtTime(vol, t + dur - 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + dur + 0.05);
  active.push(o);
}

// 鈴聲：基音加上兩個泛音，聲音才像金屬鈴
function bell(f, start, dur, vol) {
  tone(f, f, start, dur, vol);
  tone(f * 2.76, f * 2.76, start, dur * 0.6, vol * 0.35);
  tone(f * 5.4, f * 5.4, start, dur * 0.3, vol * 0.15);
}

function stopSounds() {
  active.forEach(o => { try { o.stop(); } catch (e) {} });
  active = []; playingUntil = 0;
}

// 每個聲音回傳長度（秒）
const SOUNDS = {
  siren() {                                  // 救護車：高低音交替
    for (let i = 0; i < 8; i++) tone(i % 2 ? 740 : 960, i % 2 ? 740 : 960, i * 0.42, 0.42, 0.16, "triangle", true);
    return 3.4;
  },
  horn() {                                   // 汽車喇叭：兩個方波同時響
    for (const s of [0, 0.6]) { tone(415, 415, s, 0.4, 0.07, "square", true); tone(523, 523, s, 0.4, 0.06, "square", true); }
    return 1.1;
  },
  crossing() {                               // 平交道：噹、噹、噹
    for (let i = 0; i < 6; i++) bell(i % 2 ? 660 : 620, i * 0.5, 0.6, 0.22);
    return 3.2;
  },
  bike() {                                   // 腳踏車鈴：鈴鈴、鈴鈴
    for (const s of [0, 0.16, 0.9, 1.06]) bell(2100, s, 0.5, 0.14);
    return 1.7;
  },
};


// ---------------------------------------------------------------------
// 10. 程式動畫（座標以 220 × 150 為準，t 是秒數）
// ---------------------------------------------------------------------
const ANIMS = { pedSignal: drawPedSignal, trafficCar: drawTrafficCar, crosswalk: drawCrosswalk, rainNight: drawRainNight };

function drawArt(x, y, w, h, fn) {
  panel(x, y, w, h);
  drawingContext.save(); clipRound(x, y, w, h, 14);
  push(); translate(x, y); scale(w / ART_W, h / ART_H); fn(millis() / 1000); pop();
  drawingContext.restore();
}

function sky(c1, c2) {
  noStroke();
  for (let i = 0; i < 25; i++) { fill(lerpColor(color(c1), color(c2), i / 24)); rect(0, i * 6, ART_W, 7); }
}

function walker(x, y, s, phase, col) {      // 走路的小人（號誌用）
  push(); translate(x, y); scale(s); noStroke(); fill(col);
  circle(0, -22, 9);
  rect(-3, -17, 6, 15, 2);
  const a = sin(phase) * 0.5;
  stroke(col); strokeWeight(3); strokeCap(ROUND);
  line(0, -2, sin(a) * 9, 10); line(0, -2, -sin(a) * 9, 10);
  line(0, -14, -sin(a) * 7, -6); line(0, -14, sin(a) * 7, -6);
  pop();
}

function drawPedSignal(t) {                  // 小綠人走 → 閃爍 → 小紅人
  sky("#A9C9E8", "#DCEAF5");
  const c = t % 7;
  noStroke(); fill("#7A8B80"); rect(0, 128, ART_W, 22);
  fill("#4A4F4C"); rect(106, 70, 8, 70);
  fill("#2C302E"); rect(70, 12, 80, 90, 8);
  fill("#1A1D1B"); rect(78, 18, 64, 36, 4); rect(78, 60, 64, 36, 4);
  const green = c < 5, flashOn = c < 3 || floor(c * 4) % 2 === 0;
  if (!green) { push(); translate(110, 48); noStroke(); fill("#FF4D3D"); circle(0, -20, 9); rect(-4, -15, 8, 16, 2); rect(-4, 0, 3, 10); rect(1, 0, 3, 10); pop(); }
  else fill("#3A1512");
  if (green && flashOn) walker(110, 92, 1, t * 7, "#3DFF7A");
  fill(255); textAlign(CENTER, CENTER); textSize(10); textStyle(BOLD);
  if (green) text(ceil(5 - c), 132, 90);
  textStyle(NORMAL);
}

function drawTrafficCar(t) {                 // 綠燈開 → 黃燈 → 紅燈停
  sky("#9FD0F0", "#E2F1FA");
  noStroke(); fill("#6CB25A"); rect(0, 96, ART_W, 54);
  fill("#4B4F55"); rect(0, 104, ART_W, 34);
  fill("#FFFFFF"); for (let i = 0; i < 11; i++) rect(i * 22, 120, 12, 2);
  fill("#FFFFFF"); rect(150, 104, 3, 34);   // 停止線
  const c = t % 8;
  const light = c < 3 ? "G" : c < 4.2 ? "Y" : "R";
  fill("#555"); rect(170, 30, 5, 74);
  fill("#222"); rect(160, 10, 25, 60, 5);
  fill(light === "R" ? "#FF3B30" : "#4A1E1C"); circle(172.5, 22, 14);
  fill(light === "Y" ? "#FFC400" : "#4A3D12"); circle(172.5, 40, 14);
  fill(light === "G" ? "#2EE66B" : "#163D22"); circle(172.5, 58, 14);
  // 車子：綠燈時從左邊開進來，黃燈減速，紅燈停在停止線前
  let x;
  if (c < 3) x = -40 + c * 45; else if (c < 4.2) x = 95 + (1 - pow(1 - (c - 3) / 1.2, 2)) * 22; else x = 117;
  push(); translate(x, 118);
  fill("#2F6FDE"); rect(0, -16, 34, 12, 4); rect(7, -26, 18, 11, 4);
  fill("#BFE3FF"); rect(10, -24, 6, 7, 2); rect(18, -24, 5, 7, 2);
  fill("#222"); circle(8, -3, 9); circle(27, -3, 9);
  if (light !== "G") { fill("#FF5A4F"); rect(-1, -14, 3, 4); }
  pop();
}

function drawCrosswalk(t) {                  // 停在路邊 → 左右看 → 安全通過
  sky("#BFE0F5", "#EEF7FC");
  const c = t % 9;
  noStroke(); fill("#9AA39C"); rect(0, 80, ART_W, 18); rect(0, 132, ART_W, 18);
  fill("#4B4F55"); rect(0, 98, ART_W, 34);
  fill("#F4F4F4"); for (let i = 0; i < 5; i++) rect(84 + i * 12, 100, 7, 30);
  // 車子在 1.5～4 秒經過
  if (c > 1.2 && c < 4.2) {
    const cx = -50 + (c - 1.2) * 95;
    fill("#D9483B"); rect(cx, 106, 40, 13, 4); rect(cx + 9, 98, 20, 10, 4);
    fill("#222"); circle(cx + 9, 120, 9); circle(cx + 31, 120, 9);
  }
  // 小朋友：0～5 秒在路邊左右看，5 秒後走斑馬線
  const kx = 104, ky = c < 5 ? 92 : min(150, 92 + (c - 5) * 18);
  const look = c < 5 ? sin(c * 2.4) : 0;
  push(); translate(kx, ky);
  fill("#F2B705"); rect(-6, -18, 12, 16, 3);           // 黃色書包
  fill("#3B6FD9"); rect(-5, -18, 10, 14, 3);
  fill("#F5D2B8"); circle(0, -25, 13);
  fill("#2B2B2B"); circle(look * 3 - 2, -26, 2); circle(look * 3 + 2, -26, 2);
  stroke("#2B2B2B"); strokeWeight(2.5); line(-2, -4, -3, 6); line(2, -4, 3, 6);
  pop();
  if (c < 5) {
    noStroke(); fill(255, 230); rect(122, 52, 66, 22, 6);
    fill(STYLE.ink); textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(c < 1.2 ? "停" : c < 4.2 ? "看、聽" : "沒有車了", 155, 63);
    textStyle(NORMAL);
  }
}

function drawRainNight(t) {                  // 雨夜：車燈照到亮色雨衣
  sky("#121827", "#283247");
  noStroke(); fill("#2B2F36"); rect(0, 108, ART_W, 42);
  // 車燈光束（左右擺動）
  const sweep = 0.5 + 0.5 * sin(t * 1.2);
  fill(255, 240, 180, 60);
  triangle(10, 118, 220, 70 + sweep * 30, 220, 140);
  fill("#1B1E24"); rect(-10, 110, 30, 14, 4);
  fill("#FFF3B0"); circle(18, 117, 6);
  // 兩位行人
  person(115, 112, "#22262B", false, 0);
  person(170, 112, "#FFD21F", true, sweep);
  // 雨
  stroke(170, 190, 220, 150); strokeWeight(1);
  for (let i = 0; i < 40; i++) {
    const x = (i * 37) % ART_W, y = ((i * 53 + t * 140) % 150);
    line(x, y, x - 2, y + 6);
  }
  noStroke();
}

function person(x, y, coat, reflective, glow) {
  push(); translate(x, y); noStroke();
  fill(coat); triangle(-9, 0, 9, 0, 0, -26); circle(0, -27, 10);
  if (reflective) { fill(255, 255, 255, 120 + 135 * glow); rect(-7, -10, 14, 2.5); rect(-5, -17, 10, 2); }
  fill("#15171A"); rect(-4, 0, 3, 8); rect(1, 0, 3, 8);
  pop();
}


// ---------------------------------------------------------------------
// 11. 按鈕、點擊與小工具
// ---------------------------------------------------------------------
function button(x, y, w, h, label, primary, fn) {
  const hover = inRect(mouseX, mouseY, { x, y, w, h });
  push();
  if (primary) { noStroke(); fill(hover ? STYLE.primaryDark : STYLE.primary); }
  else { stroke(STYLE.ink); strokeWeight(1.5); fill(hover ? "#E6EAE6" : STYLE.panel); }
  rect(x, y, w, h, 12);
  noStroke(); fill(primary ? 255 : STYLE.ink); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(L.fs);
  text(label, x + w / 2, y + h / 2);
  pop();
  addHit(x, y, w, h, fn);
}

function addHit(x, y, w, h, fn) { hits.push({ x, y, w, h, fn }); }
function press() { for (let i = hits.length - 1; i >= 0; i--) if (inRect(mouseX, mouseY, hits[i])) { hits[i].fn(); return; } }
function mousePressed() { if (millis() - lastTouch > 700) press(); return false; }
function touchStarted() { lastTouch = millis(); press(); return false; }
function touchEnded() { return false; }

function keyPressed() {                      // F7：鍵盤操作
  if (!FEATURES.F7_keyboard) return;
  if (screen === "start" && keyCode === ENTER) { startRound(allIndexes()); return false; }
  if (screen === "quiz") {
    const k = int(key);
    if (!records[pos] && k >= 1 && k <= opts.length) { choose(k - 1); return false; }
    if (records[pos] && (keyCode === ENTER || key === " ")) { next(); return false; }
    if (key === "p" || key === "P") { playMedia(QUESTIONS[queue[pos]]); return false; }
  }
}

function panel(x, y, w, h) { noStroke(); fill(STYLE.screen); rect(x, y, w, h, 14); }
function note(msg, x, y, w, h) { fill("#C9D3CD"); textAlign(CENTER, CENTER); textSize(L.fs * 0.85); text(msg, x + 16, y, w - 32, h); }
function cover(src, sw, sh, x, y, w, h) {
  drawingContext.save(); clipRound(x, y, w, h, 14);
  const s = max(w / sw, h / sh); image(src, x + (w - sw * s) / 2, y + (h - sh * s) / 2, sw * s, sh * s);
  drawingContext.restore();
}
function clipRound(x, y, w, h, r) {
  const ctx = drawingContext; ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  ctx.clip();
}
function inRect(px, py, r) { return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h; }
function easeOut(k) { return 1 - pow(1 - k, 3); }
function round_(v) { return Math.round(v); }
function mmss(ms) { const s = floor(ms / 1000); return nf(floor(s / 60), 2) + ":" + nf(s % 60, 2); }
