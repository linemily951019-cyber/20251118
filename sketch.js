let spriteSheet;
let spriteSheet2;
let animation = [];
let animation2 = [];
let currentFrame = 0;
let isAnimating = false; // 新增一個變數來控制動畫狀態，預設為暫停
let song;
let amplitude;

// 在 setup() 之前預先載入圖片
function preload() {
  // 載入位於 '1' 資料夾中的 '1-all.png'
  spriteSheet = loadImage('1/1-all.png');
  // 載入位於 '2' 資料夾中的 '2-all.png'
  spriteSheet2 = loadImage('2/2-all.png');

  // 載入背景音樂
  song = loadSound('assets/background_music.mp3');
}

function setup() {
  // 建立一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定動畫播放速度 (每秒 10 幀)
  // 我們將在 draw() 中動態調整，這裡先設定一個初始值
  frameRate(5);

  // 根據圖片資訊計算每一幀的寬高
  const frameWidth1 = 472 / 9; // 角色1: 總寬度 472px, 9張圖
  const frameHeight1 = 58;     // 角色1: 總高度 58px

  // 使用 for 迴圈切割 sprite sheet 並存入 animation 陣列
  for (let i = 0; i < 9; i++) {
    let frame = spriteSheet.get(i * frameWidth1, 0, frameWidth1, frameHeight1);
    animation.push(frame);
  }

  // 根據圖片資訊計算每一幀的寬高
  const frameWidth2 = 459 / 8; // 角色2: 總寬度 459px, 8張圖
  const frameHeight2 = 55;     // 角色2: 總高度 55px

  // 使用 for 迴圈切割第二個 sprite sheet 並存入 animation2 陣列
  for (let i = 0; i < 8; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    animation2.push(frame);
  }

  // 建立一個振幅分析器
  amplitude = new p5.Amplitude();
}

function draw() {
  // 設定背景為淡粉色
  background(255, 220, 220);

  // 將圖片的繪製模式設定為以中心點為座標
  imageMode(CENTER);
  // 在視窗中央繪製目前的動畫畫格，並設定寬高為 100 * 80
  image(animation[currentFrame % 9], width / 2 - 100, height / 2, 100, 80);
  // 在第一個角色旁邊繪製第二個動畫角色
  image(animation2[currentFrame % 8], width / 2 + 100, height / 2, 100, 80);

  // 只有在 isAnimating 為 true 時才更新畫格
  if (isAnimating) {
    // 取得當前的音量大小 (0.0 to 1.0)
    let level = amplitude.getLevel();
    // 將音量大小映射到一個幀率範圍 (例如 2 到 20)
    let newFrameRate = map(level, 0, 1, 2, 20);
    frameRate(newFrameRate);
    currentFrame++;
  }
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 當滑鼠點擊時，切換動畫的播放/暫停狀態
function mousePressed() {
  if (song.isPlaying()) {
    // 如果音樂正在播放，則暫停
    song.pause();
    isAnimating = false;
  } else {
    // 否則，循環播放音樂
    song.loop();
    isAnimating = true;
  }
}
