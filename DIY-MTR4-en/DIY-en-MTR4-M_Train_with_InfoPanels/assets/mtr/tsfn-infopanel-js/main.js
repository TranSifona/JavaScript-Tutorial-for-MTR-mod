// Scripting tuturial for MTR mod - base code | MTR mod編程教學-基礎螢幕程式碼
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
        ]
      ],

      // "offsets" controls the transform distace of the screen | "offsets"調較螢幕的平移距離
      "offsets": [
        [0.0, 0.0, 7.5]
      ]
    }
  ]
};

// Process the screen configurations with build-in code from the mod | 用mod內置的程式碼處理螢幕參數
var infoPanelGenerator = new DisplayHelper(infoPanelConfig);

// Create some resources for rendering | 建立一些資源，用於渲染
function create(ctx, state, train) {
  state.refreshRate = new RateLimit(0.05);
  state.infoPanel = infoPanelGenerator.create();
}

// Main part of rendering | 正式開始渲染
function render(ctx, state, train) {

  // Create a brush named g for a screen named "info-panel" | 新開一個名為g的畫筆，用於名為"info-panel"的螢幕
  let g = state.infoPanel.graphicsFor("info-panel");
  g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

  // Refresh every refreshRate seconds | 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // Call function to draw the screen | 調用函數繪製螢幕
    DrawInfoPanel(g);

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

// Colours | 顏色
const WHITE = Color(240 / 255, 240 / 255, 240 / 255),
  CYAN = Color.decode("#0faa9b"),
  YELLOW = Color(255 / 255, 200 / 255, 10 / 255);

// Images | 圖片
// Important: custom path must be in lower-case letters!
// 重要：自訂路徑必須為小寫字母！
//const IMAGE_1 = Resources.readBufferedImage(Resources.idRelative("path to image | 圖片檔案路徑"));

// Fonts | 字體
const SERIF = Resources.getSystemFont("Noto Serif"),
  SANS = Resources.getSystemFont("Noto Sans");
// Important: custom path must be in lower-case letters!
// 重要：自訂路徑必須為小寫字母！
//const CUSTOM_FONT_1 = Resources.readFont(Resources.idr("path to font | 字體檔案路徑"));

// This function draws the screen content | 此函數將會繪製螢幕內容
function DrawInfoPanel(g) {
  g.setColor(WHITE);
  g.fillRect(0, 0, 2000, 400);

  g.setColor(YELLOW);
  g.fillRect(100, 175, 300, 100);

  let stroke1 = new BasicStroke(5);
  g.setStroke(stroke1);
  g.drawOval(500, 175, 300, 100);
  g.drawPolygon([900, 1200, 950], [175, 225, 275], 3);

  //g.drawImage(IMAGE_1, 1300, 175, 300, 100, null);

  g.setColor(CYAN);
  g.setFont(SANS.deriveFont(0, 150));
  AlignText(g, "You're using the DIY version. Edit .js files to modify content", 1000, 150, 2000, "center");
  AlignText(g, "閣下使用的是DIY版本，如需加入內容請自行修改.js檔案", 1000, 350, 2000, "center");
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