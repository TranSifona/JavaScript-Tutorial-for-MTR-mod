// [MTR mod] M-Train with InfoPanels 資趣台 v2
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
function DrawInfoPanel(g, state, routePlats, nextStopIndex, hasArrived, time, isRaining, isNextToDepot, isGoingToDepot) {

  /* [CODE FOR NEXT STATION | 下一站關聯程式碼] */
  let next = "";
  let nextZh = "";
  let nextEn = "";
  let next2 = "";
  let next2Zh = "";
  let next2En = "";
  if (routePlats[nextStopIndex] != undefined) {
    next = routePlats[nextStopIndex].station.name;
    nextZh = TextUtil.getCjkParts(next);
    nextEn = TextUtil.getNonCjkParts(next);
    if (routePlats[nextStopIndex + 1] != undefined) {
      next2 = routePlats[nextStopIndex + 1].station.name;
      next2Zh = hasArrived ? TextUtil.getCjkParts(next2) : "";
      next2En = hasArrived ? TextUtil.getNonCjkParts(next2) : "";
    }
  }

  // Check whether the next stop is depot, to avoid some errors | 檢查下一站是否為車廠，可避免一些錯誤
  if (isGoingToDepot || isNextToDepot) {
    nextZh = DEPOT_MAIN_ZH;
    nextEn = DEPOT_MAIN_EN;
  }

  // Content to display now and its duration | 現時顯示的畫面及時長
  let contentNow = state.infoPanelCycle.stateNow();
  let contentTime = state.infoPanelCycle.stateNowDuration();

  // Initialise the screen by filling it with black | 初始化螢幕，全部塗成黑色
  FillBg(g);

  // Display info about next station or current station | 顯示下一站或已到站資訊
  if (contentNow == "next") {

    if (contentTime < 0.75) {
      g.setFont(SANS.deriveFont(0, 150));
      g.setColor(GREEN);
      AlignText(g, time, 1000, 230, 1900, "center");
    }

    else if (contentTime < 3.75) {
      let animTime = contentTime - 0.75;
      ShowHeadline(g, (hasArrived ? ARRIVED_MAIN_ZH : NEXT_MAIN_ZH) + nextZh, (hasArrived ? ARRIVED_MAIN_EN : NEXT_MAIN_EN) + nextEn, animTime, "next", false);
    }

    else
      FillBg(g);
  }

  // Display news | 顯示新聞畫面
  else if (contentNow == "news") {

    let animTime = contentTime;

    DrawNewsOpening(g, animTime);

    animTime -= 3.5;
    g.setFont(SANS.deriveFont(0, 300));
    g.setColor(Color(1, 0.5, 0, animTime < 0 ? 0 : animTime < 0.5 ? animTime * 2 : 1));
    AlignText(g, NEWS_MAIN, 1000, (animTime < 1 ? -50 : animTime >= 2 ? 1000 - animTime * 350 : 300) + 10, 1900, "center");

    animTime -= 2;
    ShowHeadline(g, NEWS_1A, NEWS_1B, animTime, "news", false);
    ShowHeadline(g, NEWS_2A, NEWS_2B, animTime - 4, "news", false);
    ShowHeadline(g, NEWS_3A, NEWS_3B, animTime - 8, "news", false);

    if (contentTime >= 17)
      FillBg(g);
  }

  // Display ads | 顯示廣告畫面
  else if (contentNow == "ad-1") {

    if (contentTime < 3) {
      g.setFont(SERIF.deriveFont(0, 150));
      g.setColor(ORANGE);
      g.fillRect(0, 0, 2000, 400);
      g.setColor(BLACK);
      AlignText(g, AD_1A, 1000, 180, 1900, "center");
      g.setFont(SANS.deriveFont(0, 100));
      AlignText(g, AD_1B, 1000, 330, 1900, "center");
    }

    else if (contentTime >= 3 && contentTime < 6) {
      g.setFont(SERIF.deriveFont(0, 140));
      g.setColor(ORANGE);
      AlignText(g, AD_2A, 1000, 180 - 10, 1900, "center");
      AlignText(g, AD_2B, 1000, 330 + 10, 1900, "center");
    }

    else if (contentTime >= 6 && contentTime < 9) {
      g.setFont(SERIF.deriveFont(0, 140));
      g.setColor(ORANGE);
      AlignText(g, AD_3A, 1000, 180 - 10, 1900, "center");
      AlignText(g, AD_3B, 1000, 330 + 10, 1900, "center");
    }

    else if (contentTime >= 9 && contentTime < 12) {
      g.setFont(SANS.deriveFont(0, 120));
      g.setColor(ORANGE);
      g.fillRect(0, 0, 2000, 400);
      g.setColor(BLACK);
      AlignText(g, AD_4A, 1000, 250, 1900, "right");
      g.setFont(SANS.deriveFont(0, 140));
      AlignText(g, AD_4B, 1200, 250, 1900, "left");
    }

    else
      FillBg(g);
  }

  // Display weather | 顯示天氣畫面
  else if (contentNow == "weather") {

    let animTime = contentTime;

    DrawWeatherOpening(g, animTime);

    animTime -= 4;
    g.setFont(SANS.deriveFont(0, animTime < 0 ? 0 : animTime < 0.5 ? animTime * 600 : 300));
    g.setColor(ORANGE);
    AlignText(g, WEATHER_MAIN, 1000, (animTime >= 2 ? 1000 - animTime * 350 : 300) + 10, 1900, "center");

    animTime -= 2;
    ShowHeadline(g, "", "", animTime, "weather", isRaining);

    if (contentTime >= 10)
      FillBg(g);
  }

  if (isGridOn)
    DrawGrid(g);
}

// We wrote some functions, just to keep the code tidy
// 以下為一些函數，方便收納冗長的繪圖程式碼

function FillBg(g) {
  g.setColor(BLACK);
  g.fillRect(0, 0, WIDTH1, HEIGHT1);
}

function DrawGrid(g) {

  g.setColor(BLACK);
  for (let i = 8; i < WIDTH1; i += 10)
    g.fillRect(i, 0, 2, HEIGHT1);
  for (let j = 8; j < HEIGHT1; j += 10)
    g.fillRect(0, j, WIDTH1, 2);
}

// Display news opening | 顯示新聞開場動畫
function DrawNewsOpening(g, animTime) {
  // Draw stars | 畫星星
  g.setColor(Color(1, 0.5, 0, animTime < 4 ? 1 : animTime < 4.5 ? 9 - animTime * 2 : 0));
  g.fillOval(20, 20, 10, 10);
  g.fillOval(170, 170, 10, 10);
  g.fillOval(170, 230, 10, 10);
  g.fillOval(400, 170, 10, 10);
  g.fillOval(600, 100, 10, 10);
  g.fillOval(500, 350, 10, 10);

  g.fillOval(1100, 50, 10, 10);
  g.fillOval(1200, 170, 10, 10);
  g.fillOval(1170, 200, 10, 10);
  g.fillOval(1180, 320, 10, 10);

  g.fillOval(1970, 100, 10, 10);
  g.fillOval(1940, 220, 10, 10);

  // Draw Earth | 畫地球
  g.fillOval(1400 - animTime * 200, 150, 500, 500);

  // Draw satellite | 畫人造衛星
  let satScale = 20 * (Math.abs(Math.sin(animTime)) + 0.5);
  let satX = 1400 - animTime * 200 + 300 * (Math.sin(animTime) + 0.5);
  let satY = 100;

  g.setColor(Color(0.75, 0, 0, animTime < 4 ? 1 : animTime < 4.5 ? 9 - animTime * 2 : 0));
  g.fillPolygon([satX, satX + 1 * satScale, satX + 3 * satScale, satX + 2 * satScale], [satY, satY - 1 * satScale, satY + 1 * satScale, satY + 2 * satScale], 4);
  g.setColor(Color(0, 0.75, 0, animTime < 4 ? 1 : animTime < 4.5 ? 9 - animTime * 2 : 0));
  g.fillPolygon([satX + 2 * satScale, satX + 3 * satScale, satX + 4 * satScale, satX + 3 * satScale], [satY + 2 * satScale, satY + 1 * satScale, satY + 2 * satScale, satY + 3 * satScale], 4);
  g.setColor(Color(0.75, 0, 0, animTime < 4 ? 1 : animTime < 4.5 ? 9 - animTime * 2 : 0));
  g.fillPolygon([satX + 3 * satScale, satX + 4 * satScale, satX + 6 * satScale, satX + 5 * satScale], [satY + 3 * satScale, satY + 2 * satScale, satY + 4 * satScale, satY + 5 * satScale], 4);
}

// Display weather opening | 顯示天氣開場動畫
function DrawWeatherOpening(g, animTime) {
  // Draw sun | 畫太陽
  g.setColor(RED);
  g.fillOval(850, 50, 300, 300);

  // Draw clouds | 畫雲
  let cloudX = 1400 - animTime * 200;
  let cloudPos = [[cloudX, 200], [cloudX + 300, 250], [cloudX + 350, 150]];
  g.setColor(ORANGE);

  for (let i of cloudPos) {
    g.fillOval(i[0], i[1], 200, 75);
    g.fillOval(i[0] + 100, i[1] - 20, 200, 75);
    g.fillOval(i[0] + 200, i[1], 200, 75);
  }

  if (animTime >= 4)
    FillBg(g);
}

// Display two lines of text | 顯示兩行文字
function ShowHeadline(g, text1, text2, animTime, mode, isRaining) {

  if (mode == "next") {
    g.setFont(SERIF.deriveFont(0, 150));
    g.setColor(ORANGE);
    AlignText(g, text1, 1000, (animTime < 0.5 ? 530 - animTime * 700 : 180), 1900, "center");
    g.setFont(SANS.deriveFont(0, 100));
    g.setColor(GREEN);
    AlignText(g, text2, 1000, (animTime < 0.5 ? 530 - animTime * 700 : 180) + 150, 1900, "center");
  }

  else if (mode == "news") {
    g.setFont(SERIF.deriveFont(0, 140));
    g.setColor(GREEN);
    AlignText(g, text1, 30, (animTime < 1 ? 530 - animTime * 350 : animTime >= 4 ? 1580 - animTime * 350 : 180) - 10, 1900, "left");
    AlignText(g, text2, 30, (animTime < 1 ? 530 - animTime * 350 : animTime >= 4 ? 1580 - animTime * 350 : 180) + 160, 1900, "left");
  }

  else if (mode == "weather") {
    g.setFont(SERIF.deriveFont(0, 140));
    g.setColor(GREEN);
    AlignText(g, WEATHER_ZH, 50, (animTime < 1 ? 530 - animTime * 350 : 180), 1900, "left");
    AlignText(g, isRaining ? RAIN_ZH : SUNNY_ZH, 1950, (animTime < 1 ? 530 - animTime * 350 : 180), 1900, "right");
    g.setFont(SANS.deriveFont(0, 100));
    AlignText(g, WEATHER_EN, 50, (animTime < 1 ? 530 - animTime * 350 : 180) + 150, 1900, "left");
    AlignText(g, isRaining ? RAIN_EN : SUNNY_EN, 1950, (animTime < 1 ? 530 - animTime * 350 : 180) + 150, 1900, "right");
  }
}
