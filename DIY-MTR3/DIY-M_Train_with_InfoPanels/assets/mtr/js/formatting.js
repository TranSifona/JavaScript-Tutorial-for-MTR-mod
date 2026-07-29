// [MTR mod] M-Train with InfoPanels 資趣台 v1.1 - DIY version
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
const WHITE = Color.decode("#f0f0f0"),
    DARK_GREY = Color.decode("#404040"),
    BLACK = Color.decode("#202020"),
    ORANGE = Color.decode("#FF8000"),
    GREEN = Color.decode("#00C000");

// A function that aligns text to the centre and squeezes it to a certain width | 此函數會將文字置中排版，並壓縮至指定的闊度以內
function CentreText(g, text, x, y, xLimit) {
    let xNew = 0;
    widthNow = g.getFontMetrics().stringWidth(text);

    if (xLimit > 0 && widthNow > xLimit) {
        transform0 = g.getTransform();
        g.scale(xLimit / widthNow, 1);
        x /= xLimit / widthNow;
    }

    widthNew = g.getFontMetrics().stringWidth(text);
    xNew = x - widthNew / 2;
    yNew = y;

    g.drawString(text, xNew, yNew);

    if (xLimit > 0 && widthNow > xLimit) {
        g.scale(xLimit / widthNow, 1);
        g.setTransform(transform0);
    }
}
