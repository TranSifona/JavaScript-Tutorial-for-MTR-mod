// Scripting tuturial for MTR mod - base code with blinking effect | MTR mod編程教學-基礎螢幕程式碼（附閃燈效果）
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// Import some Java resources | 載入一些Java資源
importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.math);

// Import build-in code from the mod | 載入mod內置的程式碼
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

/* [SCREEN CONFIGURATIONS | 螢幕參數] */
let infoPanelConfig = {
  "version": 1,
  "texSize": [2000, 400],
  "slots": [
    {
      "name": "info-panel",
      "texArea": [0, 0, 2000, 400],

      // "pos" controls the position of every vertex | "pos"調校螢幕每個頂點的位置
      "pos": [
        [
          [0.6595, 2.088, -0.4],
          [0.7775, 2.02, -0.4],
          [0.7775, 2.02, 0.4],
          [0.6595, 2.088, 0.4]
        ],
        [
          [-0.6595, 2.088, 0.4],
          [-0.7775, 2.02, 0.4],
          [-0.7775, 2.02, -0.4],
          [-0.6595, 2.088, -0.4]
        ]
      ],

      // "offsets" controls the transform distace of the screen | "offsets"調較螢幕的平移距離
      "offsets": [
        [0.0, 0.0, 7.5],
        [0.0, 0.0, 2.5],
        [0.0, 0.0, -2.5],
        [0.0, 0.0, -7.5]
      ]
    }
  ]
};

// Process the screen configurations with build-in code from the mod | 用mod內置的程式碼處理螢幕參數
var infoPanelGenerator = new DisplayHelper(infoPanelConfig);

// Create some resources for rendering | 建立一些資源，用於渲染
function create(ctx, state, train) {
  state.refreshRate = new RateLimit(0.05);
  // Create a CycleTracker to switch between states | 建立CycleTracker，於不同狀態之間切換
  state.infoPanelCycle = new CycleTracker(["on", 0.5, "off", 0.5]);
  //state.infoPanelCycle = new CycleTracker(["led", 10]);
  state.infoPanel = infoPanelGenerator.create();
}

// Main part of rendering | 正式開始渲染
function render(ctx, state, train) {

  // Create a brush named g for a screen named "info-panel" | 新開一個名為g的畫筆，用於名為"info-panel"的螢幕
  let g = state.infoPanel.graphicsFor("info-panel");
  g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

  // Refresh every refreshRate seconds | 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // Start the timer for CycleTracker | CycleTracker開始計時
    state.infoPanelCycle.tick();

    // Call function to draw the screen | 調用函數繪製螢幕
    DrawInfoPanel(g, state);

    // Update the screen state | 更新螢幕狀態
    state.infoPanel.upload();
  }

  // Update vehicle model state | 更新車輛模型狀態
  for (let i = 0; i < train.trainCars(); i++) {
    ctx.drawCarModel(state.infoPanel.model, i, null);
  }
}

// After rendering, clear unnecessary resources | 渲染完成後，清除非必要的資源
function dispose(ctx, state, train) {
  state.infoPanel.close();
}

// Fonts | 字體
const SERIF = Resources.getSystemFont("Noto Serif"),
  SANS = Resources.getSystemFont("Noto Sans");

// This function draws the screen content | 此函數將會繪製螢幕內容
function DrawInfoPanel(g, state) {

  // Get current CycleTracker state | 讀取現時的CycleTracker狀態
  let contentNow = state.infoPanelCycle.stateNow();
  // Get time elapsed in current state | 記錄於現時狀態下，已持續的時間長度
  //let contentTime = state.infoPanelCycle.stateNowDuration();

  g.setColor(Color(240 / 255, 240 / 255, 240 / 255));
  g.fillRect(0, 0, 2000, 400);

  // Draw a very long rectangle as the line body | 畫一個很長的長方形，作為路綫主體
  g.setColor(Color.decode("#ff3ca0"));
  g.fillRect(100, 246, 1800, 17);

  // Station circle with blinking effect | 車站圓圈（附閃燈效果）
  g.setColor(Color.decode(contentNow == "off" ? "#e8f2f0" : "#f8f412"))
  //g.setColor(Color.decode(contentTime % 2 < 1 ? "#e8f2f0" : "#f8f412"));
  g.fillOval(133, 239, 31, 31);
  let myStroke = new BasicStroke(5);
  g.setStroke(myStroke);
  g.setColor(Color.decode("#564c61"));
  g.drawOval(133, 239, 31, 31);

  // Left-of-station indicator (not used for now) | 車站左邊指示燈（暫時無用）
  g.setColor(Color.decode("#e8f2f0"));
  g.fillRect(117, 250, 9, 8);

  // Right-of-station indicator (not used for now) | 車站右邊指示燈（暫時無用）
  g.setColor(Color.decode("#e8f2f0"));
  g.fillRect(170, 249, 9, 8);

  // Station name in Chinese (also works for Japanese and Korean) | 中文站名（亦可用於日文、韓文）
  g.setFont(SANS.deriveFont(0, 27));
  g.setColor(Color.decode("#564c61"));
  AlignText(g, "大埔滘", 148, 209, 2000, "center");

  // Station name in English | 英文站名
  g.setFont(SANS.deriveFont(0, 18));
  g.setColor(Color.decode("#564c61"));
  AlignText(g, "Tai Po Kau", 147, 229, 2000, "center");
}

// A function that aligns text to left / center / right, and squeezes it to a certain width
// 此函數會將文字對齊於左/中/右，並壓縮至指定的闊度以內
function AlignText(g, text, x, y, xLimit, align) {
  let xNew = 0;
  let yNew = 0;
  widthNow = g.getFontMetrics().stringWidth(text);

  if (xLimit > 0 && widthNow > xLimit) {
    transform0 = g.getTransform();
    g.scale(xLimit / widthNow, 1);
    x /= xLimit / widthNow;
  }

  widthNew = g.getFontMetrics().stringWidth(text);
  if (align === "center")
    xNew = x - widthNew / 2;
  else if (align === "right")
    xNew = x - widthNew;
  else
    xNew = x;

  yNew = y;

  g.drawString(text, xNew, yNew);

  if (xLimit > 0 && widthNow > xLimit) {
    g.scale(1 / (xLimit / widthNow), 1);
    g.setTransform(transform0);
  }
}