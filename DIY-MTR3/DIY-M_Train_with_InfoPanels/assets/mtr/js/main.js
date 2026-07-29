// [MTR mod] M-Train with InfoPanels 資趣台 v1.1 - DIY version
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// This is main.js, used for setting screen configurations and rendering the screen onto the train | main.js用於設定螢幕參數，並將螢幕渲染至列車內

// Import build-in code from the mod | 載入mod內置的程式碼
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

// Import code from other files in this pack | 載入資源包內的其它程式碼
include("formatting.js");
include("info-panel.js");

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
  state.refreshRate = new RateLimit(0.1);
  state.infoPanelCycle = new CycleTracker(["next", 4, "notice", 4]);
  state.infoPanel = infoPanelGenerator.create();
}

// Main part of rendering | 正式開始渲染
function render(ctx, state, train) {

  // Create a brush named g for a screen named "info-panel" | 新開一個名為g的畫筆，用於名為"info-panel"的螢幕
  let g = state.infoPanel.graphicsFor("info-panel");

  // Refresh every refreshRate seconds | 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // Timer infoPanelCycle starts | infoPanelCycle開始計時
    state.infoPanelCycle.tick();

    /* [CODE FOR STATION LIST | 車站列表關聯程式碼] */
    let routePlats = train.getThisRoutePlatforms();
    let nextStopIndex = 0;
    if (train.getThisRoutePlatformsNextIndex() != undefined && train.getThisRoutePlatformsNextIndex() != null)
      nextStopIndex = train.getThisRoutePlatformsNextIndex();
    if (train.railProgress() != undefined && train.railProgress() != null)
      distancePassed = train.railProgress();
    if (routePlats != undefined && routePlats != null && nextStopIndex < routePlats.size()) {
      distanceOfPlatFromStart = routePlats.get(nextStopIndex).distance;
      hasArrived = (distancePassed >= distanceOfPlatFromStart - 50 && distancePassed <= distanceOfPlatFromStart);
    }

    // Use the function from info-panel.js for drawing the screen | 調用info-panel.js內的函數，用於繪製螢幕
    DrawInfoPanel(g, state, routePlats, nextStopIndex, hasArrived);

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
