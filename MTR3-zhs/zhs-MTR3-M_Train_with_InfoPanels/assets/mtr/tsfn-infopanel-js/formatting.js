// MTR模组M-Train资趣台v2.2
// 2026年-当前 仙芳佳全域通达铁路、乐文彩雨 版权所有
// 作者b站：https://space.bilibili.com/104383166
// 使用时请遵守MIT开源协议

// 资源包介绍及下载链接
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// 这里是formatting.js，用于设定一些排版用的参数和工具

// 导入一些Java资源
importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.math);

// 设定绘制显示屏的画板尺寸
const WIDTH1 = 2000, HEIGHT1 = 400;

// 字体
const SERIF = Resources.getSystemFont("Noto Serif"),
    SANS = Resources.getSystemFont("Noto Sans");

// 颜色
const BLACK = Color.decode("#202020"),
    ORANGE = Color.decode("#FF8000"),
    GREEN = Color.decode("#00C000"),
    RED = Color.decode("#C00000");

// 一个函数，用于调整文字对齐方式（左/中/右），并将文字压缩到规定的宽度以内
// 取代了v1的CentreText
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
