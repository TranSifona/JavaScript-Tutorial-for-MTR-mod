// [MTR mod] M-Train with InfoPanels 資趣台 v1.1 - DIY version
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// This is info-panel.js, used for drawing the screen content | info-panel.js用於繪製螢幕內容

// Import some Java resources | 載入一些Java資源
importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.math);

// A function that draws the screen content | 此函數將會繪製螢幕內容
function DrawInfoPanel(g, state, routePlats, nextStopIndex, hasArrived) {

    // Control which group of content to show now | 當前時間應該顯示的畫面
    let contentNow = state.infoPanelCycle.stateNow();

    /* [CODE FOR NEXT STATION | 下一站關聯程式碼] */
    let next = "",
        nextZh = "",
        nextEn = "";
    if (routePlats[nextStopIndex] != undefined && routePlats[nextStopIndex] != null) {
        next = routePlats[nextStopIndex].station.name;
        nextZh = TextUtil.getCjkParts(next);
        nextEn = TextUtil.getNonCjkParts(next);
    }

    // Initialise the screen by filling it with dark grey | 初始化螢幕，全部塗成深灰色
    g.setColor(DARK_GREY);
    g.fillRect(0, 0, WIDTH1, HEIGHT1);

    // Paint info about next station or current station | 繪製下一站或已到站資訊
    if (contentNow == "next") {
        g.setFont(SERIF.deriveFont(0, 150));
        g.setColor(ORANGE);
        if (hasArrived)
            CentreText(g, "已到達：" + nextZh, 1000, 180, 1900);
        else
            CentreText(g, "下一站：" + nextZh, 1000, 180, 1900);
        g.setFont(SANS.deriveFont(0, 100));
        g.setColor(GREEN);
        if (hasArrived)
            CentreText(g, "Now at : " + nextEn, 1000, 330, 1900);
        else
            CentreText(g, "Next station : " + nextEn, 1000, 330, 1900);
    }

    // Paint "Welcome onboard" | 繪製「歡迎乘搭」
    else if (contentNow == "notice") {
        g.setFont(SERIF.deriveFont(0, 150));
        g.setColor(GREEN);
        CentreText(g, "歡迎乘搭", 1000, 180, 1900);
        g.setFont(SANS.deriveFont(0, 100));
        CentreText(g, "Welcome onboard", 1000, 330, 1900);
    }
}
