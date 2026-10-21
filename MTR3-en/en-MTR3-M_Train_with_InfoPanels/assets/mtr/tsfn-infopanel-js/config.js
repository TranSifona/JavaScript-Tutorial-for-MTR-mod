// [MTR mod] M-Train with InfoPanels 資趣台 v2.2
// Copyright 2026-present TranSifona & Lewen Choiee
// Our YouTube channel: https://www.youtube.com/@transifona
// Use these code in alignment with MIT License | 使用此程式碼時請遵從MIT授權條款

/* [FULL DESCRIPTION OF THIS PACK | 資源包完整資訊] */
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// This is config.js, used for setting some parameters for displaying screen content | config.js用於調校螢幕的一些顯示設定

// ----------------------------------[BASIC SETTINGS | 基本設定]------------------------------------

/*
// [TEXT | 文字顯示]
//
// Set the text to show in InfoPanels (just edit inside the "")
// 修改資趣台顯示的文字（直接改引號內之文字即可）
*/

// Hint for next stop / arrived | 下一站/已抵達提示
const NEXT_MAIN_ZH = "下一站：", NEXT_MAIN_EN = "Next station : ",
    ARRIVED_MAIN_ZH = "已抵達：", ARRIVED_MAIN_EN = "Now at : ";

// Hint when next stop is / arrived at a depot
// 下一站/已抵達車廠時的提示
const DEPOT_MAIN_ZH = "車廠", DEPOT_MAIN_EN = "Depot";

// News opening title | 新聞開場標題
const NEWS_MAIN = "新 聞 短 訊";

// News contents | 新聞內容
const NEWS_1A = "碼頭吞吐量", NEWS_1B = "創新高",
    NEWS_2A = "高山積雪", NEWS_2B = "有車輛被困",
    NEWS_3A = "村莊改建方案", NEWS_3B = "開始徵求意見";

// Ads text | 廣告文字
const AD_1A = "歡迎乘搭", AD_1B = "Welcome aboard",
    AD_2A = "打開config.js", AD_2B = "即可修改文字",
    AD_3A = "更多遊戲交通好物  盡在", AD_3B = "transifona.pages.dev",
    AD_4A = "TranSifona", AD_4B = "仙全鐵";

// Weather opening title | 天氣開場標題
const WEATHER_MAIN = "天 氣 報 告";

// Weather contents | 天氣內容
const WEATHER_ZH = "現在天氣", WEATHER_EN = "Weather";
const SUNNY_ZH = "晴", SUNNY_EN = "SUNNY",
    RAIN_ZH = "雨", RAIN_EN = "RAIN";

// --------------------------------[BETA SETTINGS | BETA功能設定]-----------------------------------

/*
// [SCREEN DOT MATRIX EFFECT | 螢幕點陣效果]
//
// Set true to turn on LCD dot matrix effect, false to turn off
// 開啟點陣LCD效果，true為開啟，false為關閉
*/
isGridOn = true;
