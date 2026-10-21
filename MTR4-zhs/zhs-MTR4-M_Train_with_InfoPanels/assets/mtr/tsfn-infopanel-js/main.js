// MTR模组M-Train资趣台v2.2
// 2026年-当前 仙芳佳全域通达铁路、乐文彩雨 版权所有
// 作者b站：https://space.bilibili.com/104383166
// 使用时请遵守MIT开源协议

// 资源包介绍及下载链接
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// 这里是main.js，用于设定显示屏参数及读取游戏数据，并将显示屏渲染到列车上

// 导入模组内置的代码
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

// 导入资源包里的其它代码
include("config.js");
include("info-panel.js");
include("formatting.js");

/*【 显 示 屏 参 数 】*/
let infoPanelConfig = {
  "version": 1,
  "texSize": [2000, 400],
  "slots": [
    {
      "name": "info-panel",
      "texArea": [0, 0, 2000, 400],

      // pos控制显示屏每个顶点的位置
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

      // offsets控制整个显示屏的平移
      "offsets": [
        [0.0, 0.0, 7.5],
        [0.0, 0.0, 2.5],
        [0.0, 0.0, -2.5],
        [0.0, 0.0, -7.5]
      ]
    }
  ]
};

// 用模组内置的代码处理显示屏参数
var infoPanelGenerator = new DisplayHelper(infoPanelConfig);

// 创建一些资源，用于渲染
function create(ctx, state, train) {
  state.refreshRate = new RateLimit(0.05);
  state.infoPanelCycle = new CycleTracker(["next", 4.25, "news", 19, "ad-1", 12.5, "weather", 10.5]);
  state.infoPanel = infoPanelGenerator.create();
}

// 正式开始渲染
function render(ctx, state, train) {

  // 创建一个名为g的画笔，用于名为info-panel的显示屏
  let g = state.infoPanel.graphicsFor("info-panel");
  g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

  // 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // infoPanelCycle开始计时
    state.infoPanelCycle.tick();

    /*【 路 线 信 息 相 关 代 码 】*/
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

    // 读取列车速度
    let speed = train.speed();
    speed *= 72;
    speed = Math.round(speed);

    // 读取游戏时间
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

    // 读取游戏天气
    let isRaining = MinecraftClient.worldIsRaining();

    // 检测下一站是否为车厂，用于避免一些错误
    let allPlats = train.getAllPlatforms();
    let allPlatsNextIndex = train.getAllPlatformsNextIndex();
    let isNextToDepot = false;
    let isGoingToDepot = false;
    isNextToDepot = ((allPlatsNextIndex === allPlats.size() - 1) && hasArrived);
    isGoingToDepot = (allPlatsNextIndex > allPlats.size() - 1);

    // 调用info-panel.js里的函数，用于绘制显示屏
    DrawInfoPanel(g, state, routePlats, nextStopIndex, hasArrived, time, isRaining, isNextToDepot, isGoingToDepot);

    // 更新显示屏状态
    state.infoPanel.upload();
  }

  //更新车辆模型状态
  for (let i = 0; i < train.trainCars(); i++) {
    ctx.drawCarModel(state.infoPanel.model, i, null);
  }
}

// 渲染完成后，清理不必要的资源
function dispose(ctx, state, train) {
  state.infoPanel.close();
}
