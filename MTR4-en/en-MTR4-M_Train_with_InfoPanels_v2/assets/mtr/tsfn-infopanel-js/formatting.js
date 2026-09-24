// [MTR mod] M-Train with InfoPanels 資趣台 v2
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// This is formatting.js, used for setting some formatting tools | formatting.js用於設定一些排版用的參數及工具

// Import some Java resources | 載入一些Java資源
importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.math);

// Set the size of the screen's palette | 設定繪製螢幕的畫板尺寸
const WIDTH1 = 2000, HEIGHT1 = 400;

// Fonts | 字體
const SERIF = Resources.getSystemFont("Noto Serif"),
    SANS = Resources.getSystemFont("Noto Sans");

// Colours | 顏色
const BLACK = Color.decode("#202020"),
    ORANGE = Color.decode("#FF8000"),
    GREEN = Color.decode("#00C000"),
    RED = Color.decode("#C00000");

// A function that aligns text to left / center / right, and squeezes it to a certain width
// (Replacement of CentreText in v1)
// 此函數會將文字對齊於左/中/右，並壓縮至指定的闊度以內
// (取替v1的CentreText)
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
