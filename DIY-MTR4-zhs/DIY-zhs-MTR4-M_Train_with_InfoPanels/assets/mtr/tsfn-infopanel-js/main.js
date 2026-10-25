// MTR模组JS教程-显示屏代码框架
// 2026年-当前 仙芳佳全域通达铁路、乐文彩雨 版权所有
// 作者b站：https://space.bilibili.com/104383166
// 使用时请遵守MIT开源协议

// 资源包介绍及下载链接
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// 导入一些Java资源
importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.math);

// 导入模组内置的代码
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

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
        ]
      ],

      // offsets控制整个显示屏的平移
      "offsets": [
        [0.0, 0.0, 7.5]
      ]
    }
  ]
};

// 用模组内置的代码处理显示屏参数
var infoPanelGenerator = new DisplayHelper(infoPanelConfig);

// 创建一些资源，用于渲染
function create(ctx, state, train) {
  state.refreshRate = new RateLimit(0.05);
  state.infoPanel = infoPanelGenerator.create();
}

// 正式开始渲染
function render(ctx, state, train) {

  // 创建一个名为g的画笔，用于名为info-panel的显示屏
  let g = state.infoPanel.graphicsFor("info-panel");
  g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

  // 每refreshRate秒更新一次
  if (state.refreshRate.shouldUpdate()) {

    // 调用函数DrawInfoPanel，绘制显示屏
    DrawInfoPanel(g);

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

// 创建颜色常数
const WHITE = Color(240 / 255, 240 / 255, 240 / 255),
  CYAN = Color.decode("#0faa9b"),
  YELLOW = Color(255 / 255, 200 / 255, 10 / 255);

// 创建图片常数
// 重要：自定义路径必须为小写字母！
//const IMAGE_1 = Resources.readBufferedImage(Resources.idRelative("图片文件路径"));

// 创建字体常数
const SERIF = Resources.getSystemFont("Noto Serif"),
  SANS = Resources.getSystemFont("Noto Sans");
// 重要：自定义路径必须为小写字母！
//const CUSTOM_FONT_1 = Resources.readFont(Resources.idr("字体文件路径"));

// 绘制显示屏用的主函数
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
  AlignText(g, "您使用的是DIY版，如需加入内容请自行修改.js文件", 1000, 150, 2000, "center");
  AlignText(g, "You're using the DIY version. Edit .js files to modify content", 1000, 350, 2000, "center");
}

// 该函数用于调整文字对齐方式（左/中/右），并将文字压缩到规定的宽度以内
// 取代了模板资源包v1的CentreText
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