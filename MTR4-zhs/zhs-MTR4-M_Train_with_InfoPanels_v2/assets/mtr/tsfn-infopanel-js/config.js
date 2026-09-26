// MTR模组M-Train资趣台v2.2
// 2026年-当前 仙芳佳全域通达铁路、乐文彩雨 版权所有
// 作者b站：https://space.bilibili.com/104383166
// 使用时请遵守MIT开源协议

// 资源包介绍及下载链接
// https://modrinth.com/resourcepack/mtr-mod-m-train-with-infopanels

// 这里是config.js，用于调整显示屏的一些播放与效果设置

// ----------------------------------【 基 础 设 置 】------------------------------------

/*
//【文字显示】
//
// 修改资趣台显示的文字（直接改引号里面的文字即可）
*/

// 下一站/已到达提示
const NEXT_MAIN_ZH = "下一站：", NEXT_MAIN_EN = "Next station : ",
    ARRIVED_MAIN_ZH = "已抵達：", ARRIVED_MAIN_EN = "Now at : ";

// 下一站/已到达车厂时的提示
const DEPOT_MAIN_ZH = "車廠", DEPOT_MAIN_EN = "Depot";

// 新闻开场标题
const NEWS_MAIN = "新 聞 短 訊";

// 新闻内容
const NEWS_1A = "碼頭吞吐量", NEWS_1B = "創新高",
    NEWS_2A = "高山積雪", NEWS_2B = "有車輛被困",
    NEWS_3A = "村莊改建方案", NEWS_3B = "開始徵求意見";

// 广告文字
const AD_1A = "歡迎乘搭", AD_1B = "Welcome aboard",
    AD_2A = "打開config.js", AD_2B = "即可修改文字",
    AD_3A = "更多遊戲交通好物  盡在", AD_3B = "transifona.pages.dev",
    AD_4A = "TranSifona", AD_4B = "仙全鐵";

// 天气开场标题
const WEATHER_MAIN = "天 氣 報 告";

// 天气内容
const WEATHER_ZH = "現在天氣", WEATHER_EN = "Weather";
const SUNNY_ZH = "晴", SUNNY_EN = "SUNNY",
    RAIN_ZH = "雨", RAIN_EN = "RAIN";

// --------------------------------【 BETA 功 能 设 置 】-----------------------------------

/*
//【显示屏点阵效果】
//
// 开启点阵LCD效果
// true为开启，false为关闭
*/
isGridOn = true;
