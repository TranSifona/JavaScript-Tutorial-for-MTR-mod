// [MTR mod] M-Train with InfoPanels 資趣台 v2.2
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// This is main.js, used for setting screen configurations, reading game data, and rendering the screen onto the train
// main.js用於設定螢幕參數及讀取游戲資料，並將螢幕渲染至列車內

// Import build-in code from the mod | 載入mod內置的程式碼
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

// Import code from other files in this pack | 載入資源包內的其它程式碼
include("config.js");
include("info-panel.js");
include("formatting.js");

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

      // "offsets" controls the transform distance of the screen | "offsets"調較螢幕的平移距離
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
  state.infoPanelCycle = new CycleTracker(["next", 4.25, "news", 19, "ad-1", 12.5, "weather", 10.5]);
  state.infoPanel = infoPanelGenerator.create();
}

// Main part of rendering | 正式開始渲染
function render(ctx, state, train) {

  // Create a brush named g for a screen named "info-panel" | 新開一個名為g的畫筆，用於名為"info-panel"的螢幕
  let g = state.infoPanel.graphicsFor("info-panel");
  g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

  // Refresh every refreshRate seconds | 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // Timer infoPanelCycle starts | infoPanelCycle開始計時
    state.infoPanelCycle.tick();

    /* [CODE FOR ROUTE INFO | 路綫資料關聯程式碼] */
    let routePlats = train.getThisRoutePlatforms();
    let nextStopIndex = 0;
    let distancePassed = 0;

    if (train.getThisRoutePlatformsNextIndex() != undefined)
      nextStopIndex = train.getThisRoutePlatformsNextIndex();
    if (train.railProgress() != undefined)
      distancePassed = train.railProgress();

    let hasArrived = false;
    if (routePlats != undefined && nextStopIndex < routePlats.size()) {
      distanceOfPlatFromStart = routePlats.get(nextStopIndex).distance;
      hasArrived = (distancePassed >= distanceOfPlatFromStart - 50 && distancePassed <= distanceOfPlatFromStart);
    }

    // Get train speed | 讀取列車速度
    let speed = train.speed();
    speed *= 72;
    speed = Math.round(speed);

    // Get game time | 讀取游戲時間
    let timeMC = MinecraftClient.worldDayTime();
    let timeH = timeMC / 1000;
    let timeM = timeH % 1;
    timeM = Math.trunc((timeM * 1000) / (50 / 3));

    if (timeH >= 0 && timeH < 18)
      timeH += 6;
    else if (timeH >= 18 && timeH < 24)
      timeH -= 18;
    else
      timeH = 0;

    timeH = Math.trunc(timeH);
    let time = (timeH == 0 ? 12 : timeH < 13 ? timeH : timeH - 12) + ":" + (timeM < 10 ? "0" : "") + timeM + (timeH < 12 ? " am" : " pm");

    // Get game weather | 讀取游戲天氣
    let isRaining = MinecraftClient.worldIsRaining();

    // Check whether the next stop is depot, to avoid some errors | 檢查下一站是否為車廠，可避免一些錯誤
    let allPlats = train.getAllPlatforms();
    let allPlatsNextIndex = train.getAllPlatformsNextIndex();
    let isNextToDepot = false;
    let isGoingToDepot = false;
    isNextToDepot = ((allPlatsNextIndex === allPlats.size() - 1) && hasArrived);
    isGoingToDepot = (allPlatsNextIndex > allPlats.size() - 1);

    // Use the function from info-panel.js for drawing the screen | 調用info-panel.js內的函數，用於繪製螢幕
    DrawInfoPanel(g, state, routePlats, nextStopIndex, hasArrived, time, isRaining, isNextToDepot, isGoingToDepot);

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
