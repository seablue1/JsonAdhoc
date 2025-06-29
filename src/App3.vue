<template>
    <div class="json-viewer-container">
        <div class="header-row">
            <h3 class="title">JSON表格查看器</h3>
            <div class="button-group">
                <button class="action-button primary" @click="testEdgeCases">测试边缘</button>
                <button class="action-button secondary" @click="resetData">重置</button>
                <button class="action-button info" @click="generateRandomData">随机数据</button>
            </div>
        </div>
        <JsonTable :data="data" />
    </div>
</template>

<script setup>
import JsonTable from './components/JsonTable.vue';
import { ref } from 'vue';

const originalData = {
            "balanceType": "UseFG",
            "baseRoomName": "豪华池景家庭房",
            "baseRoomId": 14112160,
            "roomToken": "02_H4371952_R1524998161_I2025-01-14_O2025-01-18_C0_RatePlan_SP0_RP6340_SH4371956_SID0_SCtx_SPay_PFalse_Segment2_BTUSEFG_HR0_HBT_HP_STFalse_HC_F2Ptrue_PID66480119_ORP6340_V5F2AC90A3CC98DE7FFC88171DB43CA",
            "roomId": 1524998161,
            "roomName": "",
            "application": "",
            "baseRoomInfo": {
                "baseRoomName": "豪华池景家庭房",
                "spic": "https://images4.c-ctrip.com/target/1mc0k12000dsklzmq6DF1_R_180_144_R5.jpg",
                "baseRoomId": 14112160,
                "pictures": [
                    "https://images4.c-ctrip.com/target/1mc0k12000dsklzmq6DF1_R_750_400_R5.jpg",
                    "https://images4.c-ctrip.com/target/200t10000000pbsn6D15C_R_750_400_R5.jpg",
                    "https://images4.c-ctrip.com/target/200210000000pits82361_R_750_400_R5.jpg",
                    "https://images4.c-ctrip.com/target/0AD5c120009faqb9yCC4C_R_750_400_R5.jpg",
                    "https://images4.c-ctrip.com/target/0201q120009dyd81v1EE7_R_750_400_R5.jpg"
                ],
                "facilities": [
                    {
                        "name": "卫浴设施",
                        "type": 7,
                        "desc": [
                            "浴巾",
                            "私人卫生间",
                            "毛巾",
                            "拖鞋",
                            "浴室化妆放大镜",
                            "24小时热水",
                            "浴衣",
                            "私人浴室",
                            "浴缸和淋浴",
                            "雨淋花洒喷头",
                            "深泡浴缸",
                            "吹风机"
                        ]
                    },
                    {
                        "name": "客房布局和家具",
                        "type": 35,
                        "desc": [
                            "茶几",
                            "挂墙装饰画/字画",
                            "衣柜/衣橱",
                            "阳台",
                            "书桌",
                            "沙发",
                            "餐桌",
                            "用餐区"
                        ]
                    },
                    {
                        "name": "便利设施",
                        "type": 4,
                        "desc": [
                            "棋牌桌",
                            "针线包",
                            "220V电压插座",
                            "雨伞",
                            "电子秤",
                            "多种规格电源插座",
                            "衣架",
                            "房内保险箱"
                        ]
                    },
                    {
                        "name": "客房设施",
                        "type": 34,
                        "desc": [
                            "空调-仅制冷",
                            "遮光窗帘",
                            "床具:鸭绒被",
                            "床具:毯子或被子",
                            "手动窗帘"
                        ]
                    },
                    {
                        "name": "网络与通讯",
                        "type": 36,
                        "desc": [
                            "客房有线宽带",
                            "国际长途电话",
                            "电话",
                            "客房WIFI"
                        ]
                    },
                    {
                        "name": "食品饮品",
                        "type": 6,
                        "desc": [
                            "茶包",
                            "电热水壶",
                            "瓶装水"
                        ]
                    },
                    {
                        "name": "洗浴用品",
                        "type": 23,
                        "desc": [
                            "牙刷",
                            "护发素",
                            "洗发水",
                            "香皂",
                            "浴帽",
                            "梳子",
                            "剃须刀",
                            "牙膏",
                            "沐浴露"
                        ]
                    },
                    {
                        "name": "清洁服务",
                        "type": 20,
                        "desc": [
                            "熨衣设备"
                        ]
                    },
                    {
                        "name": "儿童设施服务",
                        "type": 22,
                        "desc": [
                            "儿童洗漱用品",
                            "儿童浴袍",
                            "儿童拖鞋"
                        ]
                    },
                    {
                        "name": "室外景观",
                        "type": 8,
                        "desc": [
                            "花园景",
                            "游泳池景"
                        ]
                    },
                    {
                        "name": "媒体科技",
                        "type": 5,
                        "desc": [
                            "卫星频道",
                            "液晶电视机"
                        ]
                    }
                ],
                "newFacilities": [
                    {
                        "name": "清洁服务",
                        "type": 20,
                        "desc": [
                            {
                                "categoryId": 20,
                                "categoryName": "清洁服务",
                                "id": 606,
                                "name": "每日打扫",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 0,
                                "icon": "20",
                                "rank": 1,
                                "brandName": ""
                            },
                            {
                                "categoryId": 20,
                                "categoryName": "清洁服务",
                                "id": 86,
                                "name": "熨衣设备",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "20",
                                "rank": 25,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "洗浴用品",
                        "type": 23,
                        "desc": [
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 446,
                                "name": "牙刷",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 1,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 458,
                                "name": "牙膏",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 2,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 457,
                                "name": "沐浴露",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 3,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 447,
                                "name": "洗发水",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 4,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 448,
                                "name": "护发素",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 5,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 449,
                                "name": "香皂",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 6,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 450,
                                "name": "浴帽",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 7,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 455,
                                "name": "梳子",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 8,
                                "brandName": ""
                            },
                            {
                                "categoryId": 23,
                                "categoryName": "洗浴用品",
                                "id": 456,
                                "name": "剃须刀",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Wash-Bath-Things",
                                "rank": 9,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "客房布局和家具",
                        "type": 35,
                        "desc": [
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 253,
                                "name": "沙发",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 1,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 208,
                                "name": "衣柜/衣橱",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 3,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 77,
                                "name": "书桌",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 4,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 508,
                                "name": "茶几",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 5,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 391,
                                "name": "餐桌",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 7,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 197,
                                "name": "用餐区",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 9,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 511,
                                "name": "挂墙装饰画/字画",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 13,
                                "brandName": ""
                            },
                            {
                                "categoryId": 35,
                                "categoryName": "客房布局和家具",
                                "id": 247,
                                "name": "阳台",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "35",
                                "rank": 14,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "网络与通讯",
                        "type": 36,
                        "desc": [
                            {
                                "categoryId": 36,
                                "categoryName": "网络与通讯",
                                "id": 264,
                                "name": "客房WIFI",
                                "provisionType": "",
                                "isShowFree": false,
                                "freeType": 2,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "36",
                                "rank": 4,
                                "brandName": ""
                            },
                            {
                                "categoryId": 36,
                                "categoryName": "网络与通讯",
                                "id": 655,
                                "name": "客房有线宽带",
                                "provisionType": "",
                                "freeType": 2,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "36",
                                "rank": 5,
                                "brandName": ""
                            },
                            {
                                "categoryId": 36,
                                "categoryName": "网络与通讯",
                                "id": 261,
                                "name": "电话",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "36",
                                "rank": 9,
                                "brandName": ""
                            },
                            {
                                "categoryId": 36,
                                "categoryName": "网络与通讯",
                                "id": 14,
                                "name": "国际长途电话",
                                "provisionType": "",
                                "freeType": 1,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "36",
                                "rank": 12,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "食品饮品",
                        "type": 6,
                        "desc": [
                            {
                                "categoryId": 6,
                                "categoryName": "食品饮品",
                                "id": 321,
                                "name": "茶包",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Food-Beverage",
                                "rank": 6,
                                "brandName": ""
                            },
                            {
                                "categoryId": 6,
                                "categoryName": "食品饮品",
                                "id": 83,
                                "name": "瓶装水",
                                "provisionType": "",
                                "isShowFree": false,
                                "freeType": 2,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Food-Beverage",
                                "rank": 9,
                                "brandName": ""
                            },
                            {
                                "categoryId": 6,
                                "categoryName": "食品饮品",
                                "id": 80,
                                "name": "电热水壶",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Food-Beverage",
                                "rank": 10,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "儿童设施服务",
                        "type": 22,
                        "desc": [
                            {
                                "categoryId": 22,
                                "categoryName": "儿童设施服务",
                                "id": 459,
                                "name": "儿童洗漱用品",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "ChildrenFacilities",
                                "rank": 6,
                                "brandName": ""
                            },
                            {
                                "categoryId": 22,
                                "categoryName": "儿童设施服务",
                                "id": 498,
                                "name": "儿童拖鞋",
                                "provisionType": "2",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "ChildrenFacilities",
                                "rank": 25,
                                "brandName": ""
                            },
                            {
                                "categoryId": 22,
                                "categoryName": "儿童设施服务",
                                "id": 499,
                                "name": "儿童浴袍",
                                "provisionType": "2",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "ChildrenFacilities",
                                "rank": 26,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "卫浴设施",
                        "type": 7,
                        "desc": [
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 92,
                                "name": "私人浴室",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 7,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 445,
                                "name": "私人卫生间",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 8,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 93,
                                "name": "吹风机",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 13,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 78,
                                "name": "浴室化妆放大镜",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 15,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 88,
                                "name": "浴衣",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 17,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 488,
                                "name": "毛巾",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 18,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 502,
                                "name": "浴巾",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 19,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 79,
                                "name": "24小时热水",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 20,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 75,
                                "name": "拖鞋",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 22,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 658,
                                "name": "浴缸和淋浴",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 30,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 663,
                                "name": "深泡浴缸",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 34,
                                "brandName": ""
                            },
                            {
                                "categoryId": 7,
                                "categoryName": "卫浴设施",
                                "id": 661,
                                "name": "雨淋花洒喷头",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Bathroom",
                                "rank": 36,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "客房设施",
                        "type": 34,
                        "desc": [
                            {
                                "categoryId": 34,
                                "categoryName": "客房设施",
                                "id": 107,
                                "name": "空调",
                                "provisionType": "",
                                "isShowFree": false,
                                "freeType": 2,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "34",
                                "rank": 9,
                                "brandName": ""
                            },
                            {
                                "categoryId": 34,
                                "categoryName": "客房设施",
                                "id": 219,
                                "name": "手动窗帘",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "34",
                                "rank": 17,
                                "brandName": ""
                            },
                            {
                                "categoryId": 34,
                                "categoryName": "客房设施",
                                "id": 217,
                                "name": "遮光窗帘",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "34",
                                "rank": 21,
                                "brandName": ""
                            },
                            {
                                "categoryId": 34,
                                "categoryName": "客房设施",
                                "id": 224,
                                "name": "床具:鸭绒被",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "34",
                                "rank": 29,
                                "brandName": ""
                            },
                            {
                                "categoryId": 34,
                                "categoryName": "客房设施",
                                "id": 225,
                                "name": "床具:毯子或被子",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "34",
                                "rank": 31,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "室外景观",
                        "type": 8,
                        "desc": [
                            {
                                "categoryId": 8,
                                "categoryName": "室外景观",
                                "id": 249,
                                "name": "游泳池景",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "OutdoorLandscape",
                                "rank": 9,
                                "brandName": ""
                            },
                            {
                                "categoryId": 8,
                                "categoryName": "室外景观",
                                "id": 245,
                                "name": "花园景",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "OutdoorLandscape",
                                "rank": 10,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "媒体科技",
                        "type": 5,
                        "desc": [
                            {
                                "categoryId": 5,
                                "categoryName": "媒体科技",
                                "id": 182,
                                "name": "液晶电视机",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "MediaTechnology",
                                "rank": 10,
                                "brandName": ""
                            },
                            {
                                "categoryId": 5,
                                "categoryName": "媒体科技",
                                "id": 181,
                                "name": "卫星频道",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "MediaTechnology",
                                "rank": 14,
                                "brandName": ""
                            }
                        ]
                    },
                    {
                        "name": "便利设施",
                        "type": 4,
                        "desc": [
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 258,
                                "name": "电子秤",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 30,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 94,
                                "name": "房内保险箱",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 30,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 213,
                                "name": "针线包",
                                "provisionType": "1",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 31,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 389,
                                "name": "衣架",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 37,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 89,
                                "name": "多种规格电源插座",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 39,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 215,
                                "name": "220V电压插座",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 41,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 76,
                                "name": "雨伞",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 42,
                                "brandName": ""
                            },
                            {
                                "categoryId": 4,
                                "categoryName": "便利设施",
                                "id": 512,
                                "name": "棋牌桌",
                                "provisionType": "",
                                "freeType": 0,
                                "feeDesc": "",
                                "isNormalShow": 1,
                                "icon": "Amenities",
                                "rank": 49,
                                "brandName": ""
                            }
                        ]
                    }
                ],
                "feePolicy": {
                    "title": "费用政策",
                    "table": [
                        "加早：西式、中式自助餐¥130每份",
                        "加床：￥330/人·晚"
                    ]
                },
                "staticInfo": [
                    {
                        "name": "90m²",
                        "id": 0,
                        "type": 3,
                        "icon": "",
                        "index": 2,
                        "h5Icon": "icons-htl_area"
                    },
                    {
                        "name": "1-7层",
                        "id": 0,
                        "type": 12,
                        "icon": "",
                        "index": 5,
                        "h5Icon": "icons-htl_floor"
                    },
                    {
                        "name": "Wi-Fi免费",
                        "id": 0,
                        "type": 11,
                        "icon": "",
                        "index": 6,
                        "h5Icon": "icons-htl_wifi"
                    },
                    {
                        "name": "有线宽带免费",
                        "id": 0,
                        "type": 19,
                        "icon": "",
                        "index": 7,
                        "h5Icon": "icons-htl_broadband"
                    },
                    {
                        "name": "￥330/人·晚",
                        "id": 0,
                        "type": 6
                    }
                ],
                "tags": [
                    {
                        "name": "积分当钱花",
                        "desc": "活动房型每间可减292元",
                        "id": 0,
                        "type": "%E7%A7%AF%E5%88%86%E5%BD%93%E9%92%B1%E8%8A%B1"
                    },
                    {
                        "name": "礼",
                        "type": 102,
                        "id": 0,
                        "desc": "奇幻森林儿童乐园：1份；接待时间:09:00-18:00；联系电话：+86-898-88718888；无需提前预约。童趣亲子活动：1份；接待时间:10:00-11:10；联系电话：+86-898-88718888；需提前4小时预约。萌娃烘焙课程：1份；接待时间:15:00-15:45；联系电话：+86-898-88718888；需提前4小时预约。30元餐饮代金券：1份；接待时间:07:00-22:00；适用人数：2；联系电话：+86-898-88718888；无需提前预约。海棠湾免税店往返穿梭巴士：1份；接待时间:09:25-20:15；适用人数：2；联系电话：+86-898-88718888；无需提前预约。"
                    }
                ]
            },
            "spic": "https://images4.c-ctrip.com/target/1mc0k12000dsklzmq6DF1_R_180_144_R5.jpg",
            "pictures": [
                "https://images4.c-ctrip.com/target/1mc0k12000dsklzmq6DF1_R_750_400_R5.jpg",
                "https://images4.c-ctrip.com/target/200210000000pits82361_R_750_400_R5.jpg",
                "https://images4.c-ctrip.com/target/200t10000000pbsn6D15C_R_750_400_R5.jpg",
                "https://images4.c-ctrip.com/target/0AD5c120009faqb9yCC4C_R_750_400_R5.jpg",
                "https://images4.c-ctrip.com/target/0201q120009dyd81v1EE7_R_750_400_R5.jpg"
            ],
            "priceInfo": {
                "addBedFee": 330,
                "totalPrice": 6340.22,
                "dailyPrice": 1586,
                "dailyPriceDiff": 3280,
                "dailyPriceDiffObj": {
                    "1": {
                        "dailyPriceDiff": 3280,
                        "diffSign": true
                    }
                },
                "diffSign": true,
                "tradePrice": 0,
                "tradeTotalPrice": 0,
                "tradeDailyPrice": 0,
                "tradeDailyPriceDiff": 0,
                "tradeDiffSign": true,
                "originPrice": 1585.055,
                "price": 6340.22,
                "totalPkgSave": 0,
                "pkgSave": 0,
                "hasRoomTax": false,
                "roomTaxFeeDes": "",
                "roomTaxFeeInfos": [],
                "newRoomTaxFeeInfos": [],
                "couponAmount": 0,
                "discountList": []
            },
            "needGuarantee": false,
            "policies": {
                "title": "酒店政策",
                "innerListTitle": "儿童及加床",
                "innerList": [
                    {
                        "title": "儿童及加床",
                        "type": "child",
                        "value": [
                            {
                                "text": "欢迎客人携带儿童入住"
                            },
                            {
                                "text": "每房最多有2名0-17岁儿童使用现有床铺，每房最多容纳1张加床和1张婴儿床",
                                "title": "婴儿床及加床政策",
                                "title4Table": [
                                    "年龄",
                                    "床铺",
                                    "费用"
                                ],
                                "extend": [
                                    {
                                        "title": "17岁及以下",
                                        "other": [
                                            [
                                                "使用现有床铺",
                                                "免费"
                                            ]
                                        ],
                                        "lines": 1,
                                        "columnType": 3
                                    }
                                ]
                            },
                            {
                                "text": [],
                                "title": "儿童早餐",
                                "title4Table": [
                                    "年龄",
                                    "费用"
                                ],
                                "extend": [
                                    {
                                        "title": "6岁及以下",
                                        "other": [
                                            [
                                                "免费"
                                            ]
                                        ],
                                        "lines": 1,
                                        "columnType": 2
                                    },
                                    {
                                        "title": "7 - 12岁",
                                        "other": [
                                            [
                                                "￥65"
                                            ]
                                        ],
                                        "lines": 1,
                                        "columnType": 3
                                    },
                                    {
                                        "title": "13 - 17岁",
                                        "other": [
                                            [
                                                "￥130"
                                            ]
                                        ],
                                        "lines": 1,
                                        "columnType": 4
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "innerListTitleNew": "儿童及加床",
                "innerListNew": [
                    {
                        "title": "儿童及加床",
                        "type": "child",
                        "value": [
                            {
                                "title": "",
                                "text": [
                                    "该房型欢迎携带儿童入住"
                                ],
                                "title4Table": [],
                                "extend": []
                            },
                            {
                                "title": "婴儿床及加床政策",
                                "text": [
                                    "该房型可提供加床、可提供加婴儿床",
                                    "超过入住人数时，可能涉及额外费用，收费规则如下"
                                ],
                                "title4Table": [
                                    "年龄",
                                    "床铺",
                                    "费用"
                                ],
                                "extend": [
                                    {
                                        "title": "2岁及以下",
                                        "other": [
                                            [
                                                "使用现有床铺",
                                                "免费"
                                            ],
                                            [
                                                "加床",
                                                "￥ 330/人·晚"
                                            ],
                                            [
                                                "加婴儿床",
                                                "免费"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                "",
                                                "免费"
                                            ],
                                            [
                                                "",
                                                ""
                                            ],
                                            [
                                                "",
                                                "免费"
                                            ]
                                        ]
                                    },
                                    {
                                        "title": "3-17岁",
                                        "other": [
                                            [
                                                "使用现有床铺",
                                                "免费"
                                            ],
                                            [
                                                "加床",
                                                "￥ 330/人·晚"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                "",
                                                "免费"
                                            ],
                                            [
                                                "",
                                                ""
                                            ]
                                        ]
                                    },
                                    {
                                        "title": "18岁及以上",
                                        "other": [
                                            [
                                                "加床",
                                                "￥ 330/人·晚"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                "",
                                                ""
                                            ]
                                        ]
                                    }
                                ]
                            },
                            {
                                "title": "儿童早餐",
                                "text": "",
                                "title4Table": [
                                    "年龄",
                                    "费用"
                                ],
                                "extend": [
                                    {
                                        "title": "6岁及以下",
                                        "other": [
                                            [
                                                "免费"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                "免费"
                                            ]
                                        ]
                                    },
                                    {
                                        "title": "7-12岁",
                                        "other": [
                                            [
                                                "￥ 65/人"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                ""
                                            ]
                                        ]
                                    },
                                    {
                                        "title": "13-17岁",
                                        "other": [
                                            [
                                                "￥ 130/人"
                                            ]
                                        ],
                                        "otherH": [
                                            [
                                                ""
                                            ]
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "table": [
                    {
                        "title": "特别提示",
                        "value": [
                            "上铺0.9*1.8m，下铺1.2*1.8m。"
                        ],
                        "type": "specialTips"
                    },
                    {
                        "title": "立即确认",
                        "value": [
                            "立即确认"
                        ]
                    },
                    {
                        "title": "不可取消",
                        "value": "酒店一经确认，不可取消、修改。若未按时入住，我们将扣除您全额或部分房费。"
                    }
                ]
            },
            "feePolicy": {
                "title": "费用政策",
                "table": [
                    "加早：西式、中式自助餐¥130每份",
                    "加床：￥330/人·晚"
                ]
            },
            "countInfo": {
                "maxPerson": 2,
                "min": 1,
                "max": 1,
                "default": 1,
                "bizMin": 1,
                "recommend": 1,
                "bizRecommend": 1,
                "select": 1,
                "resetCount": 1,
                "canModify": false,
                "maxQuantityTips": "",
                "quantityTips": "",
                "addBedDesc": "￥330/人·晚",
                "currency": "",
                "resetMessage": "剩1间",
                "tip": ""
            },
            "arrivalLocalTimeInfos": {
                "title": "预计到店",
                "description": "",
                "lists": []
            },
            "staticInfo": [
                {
                    "name": "1张上下铺 及 1张特大床",
                    "id": 0,
                    "type": 2,
                    "index": 0
                },
                {
                    "name": "1张上下铺1.2米和1张特大床2米",
                    "id": 0,
                    "extend": "加床：￥330/人·晚",
                    "type": 8,
                    "icon": "",
                    "index": 0,
                    "h5Icon": "icons-htl_bedwidth"
                },
                {
                    "name": "2人",
                    "id": 0,
                    "type": 4,
                    "icon": "",
                    "index": 1,
                    "h5Icon": "icons-htl_num"
                },
                {
                    "name": "90m²",
                    "id": 0,
                    "type": 3,
                    "icon": "",
                    "index": 2,
                    "h5Icon": "icons-htl_area"
                },
                {
                    "name": "有窗",
                    "id": 0,
                    "type": 10,
                    "icon": "",
                    "index": 3,
                    "h5Icon": "icons-htl_tips"
                },
                {
                    "name": "可吸烟",
                    "id": 0,
                    "type": 9,
                    "icon": "",
                    "index": 4,
                    "h5Icon": "icons-htl_nosmoking"
                },
                {
                    "name": "1-7楼",
                    "id": 0,
                    "type": 12,
                    "icon": "",
                    "index": 5,
                    "h5Icon": "icons-htl_floor"
                },
                {
                    "name": "Wi-Fi免费",
                    "id": 0,
                    "type": 11,
                    "icon": "",
                    "index": 6,
                    "h5Icon": "icons-htl_wifi"
                },
                {
                    "name": "有线宽带免费",
                    "id": 0,
                    "type": 19,
                    "icon": "",
                    "index": 7,
                    "h5Icon": "icons-htl_broadband"
                },
                {
                    "name": "Wi-Fi免费",
                    "id": 0,
                    "type": 5
                },
                {
                    "name": "￥330/人·晚",
                    "id": 0,
                    "type": 6
                },
                {
                    "name": "OFX3DB",
                    "id": 0,
                    "type": 18
                },
                {
                    "name": "2份早餐",
                    "id": 0,
                    "type": 1
                }
            ],
            "facilities": [
                {
                    "name": "卫浴设施",
                    "type": 7,
                    "desc": [
                        "浴巾",
                        "私人卫生间",
                        "毛巾",
                        "拖鞋",
                        "浴室化妆放大镜",
                        "24小时热水",
                        "浴衣",
                        "私人浴室",
                        "浴缸和淋浴",
                        "雨淋花洒喷头",
                        "深泡浴缸",
                        "吹风机"
                    ]
                },
                {
                    "name": "客房布局和家具",
                    "type": 35,
                    "desc": [
                        "茶几",
                        "挂墙装饰画/字画",
                        "衣柜/衣橱",
                        "阳台",
                        "书桌",
                        "沙发",
                        "餐桌",
                        "用餐区"
                    ]
                },
                {
                    "name": "便利设施",
                    "type": 4,
                    "desc": [
                        "棋牌桌",
                        "针线包",
                        "220V电压插座",
                        "雨伞",
                        "电子秤",
                        "多种规格电源插座",
                        "衣架",
                        "房内保险箱"
                    ]
                },
                {
                    "name": "客房设施",
                    "type": 34,
                    "desc": [
                        "空调-仅制冷",
                        "遮光窗帘",
                        "床具:鸭绒被",
                        "床具:毯子或被子",
                        "手动窗帘"
                    ]
                },
                {
                    "name": "网络与通讯",
                    "type": 36,
                    "desc": [
                        "客房有线宽带",
                        "国际长途电话",
                        "电话",
                        "客房WIFI"
                    ]
                },
                {
                    "name": "食品饮品",
                    "type": 6,
                    "desc": [
                        "茶包",
                        "电热水壶",
                        "瓶装水"
                    ]
                },
                {
                    "name": "洗浴用品",
                    "type": 23,
                    "desc": [
                        "牙刷",
                        "护发素",
                        "洗发水",
                        "香皂",
                        "浴帽",
                        "梳子",
                        "剃须刀",
                        "牙膏",
                        "沐浴露"
                    ]
                },
                {
                    "name": "清洁服务",
                    "type": 20,
                    "desc": [
                        "熨衣设备"
                    ]
                },
                {
                    "name": "儿童设施服务",
                    "type": 22,
                    "desc": [
                        "儿童洗漱用品",
                        "儿童浴袍",
                        "儿童拖鞋"
                    ]
                },
                {
                    "name": "室外景观",
                    "type": 8,
                    "desc": [
                        "花园景",
                        "游泳池景"
                    ]
                },
                {
                    "name": "媒体科技",
                    "type": 5,
                    "desc": [
                        "卫星频道",
                        "液晶电视机"
                    ]
                }
            ],
            "newFacilities": [
                {
                    "name": "清洁服务",
                    "type": 20,
                    "desc": [
                        {
                            "categoryId": 20,
                            "categoryName": "清洁服务",
                            "id": 606,
                            "name": "每日打扫",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 0,
                            "icon": "20",
                            "rank": 1,
                            "brandName": ""
                        },
                        {
                            "categoryId": 20,
                            "categoryName": "清洁服务",
                            "id": 86,
                            "name": "熨衣设备",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "20",
                            "rank": 25,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "洗浴用品",
                    "type": 23,
                    "desc": [
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 446,
                            "name": "牙刷",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 1,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 458,
                            "name": "牙膏",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 2,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 457,
                            "name": "沐浴露",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 3,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 447,
                            "name": "洗发水",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 4,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 448,
                            "name": "护发素",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 5,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 449,
                            "name": "香皂",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 6,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 450,
                            "name": "浴帽",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 7,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 455,
                            "name": "梳子",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 8,
                            "brandName": ""
                        },
                        {
                            "categoryId": 23,
                            "categoryName": "洗浴用品",
                            "id": 456,
                            "name": "剃须刀",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Wash-Bath-Things",
                            "rank": 9,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "客房布局和家具",
                    "type": 35,
                    "desc": [
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 253,
                            "name": "沙发",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 1,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 208,
                            "name": "衣柜/衣橱",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 3,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 77,
                            "name": "书桌",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 4,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 508,
                            "name": "茶几",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 5,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 391,
                            "name": "餐桌",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 7,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 197,
                            "name": "用餐区",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 9,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 511,
                            "name": "挂墙装饰画/字画",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 13,
                            "brandName": ""
                        },
                        {
                            "categoryId": 35,
                            "categoryName": "客房布局和家具",
                            "id": 247,
                            "name": "阳台",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "35",
                            "rank": 14,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "网络与通讯",
                    "type": 36,
                    "desc": [
                        {
                            "categoryId": 36,
                            "categoryName": "网络与通讯",
                            "id": 264,
                            "name": "客房WIFI",
                            "provisionType": "",
                            "isShowFree": false,
                            "freeType": 2,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "36",
                            "rank": 4,
                            "brandName": ""
                        },
                        {
                            "categoryId": 36,
                            "categoryName": "网络与通讯",
                            "id": 655,
                            "name": "客房有线宽带",
                            "provisionType": "",
                            "freeType": 2,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "36",
                            "rank": 5,
                            "brandName": ""
                        },
                        {
                            "categoryId": 36,
                            "categoryName": "网络与通讯",
                            "id": 261,
                            "name": "电话",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "36",
                            "rank": 9,
                            "brandName": ""
                        },
                        {
                            "categoryId": 36,
                            "categoryName": "网络与通讯",
                            "id": 14,
                            "name": "国际长途电话",
                            "provisionType": "",
                            "freeType": 1,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "36",
                            "rank": 12,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "食品饮品",
                    "type": 6,
                    "desc": [
                        {
                            "categoryId": 6,
                            "categoryName": "食品饮品",
                            "id": 321,
                            "name": "茶包",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Food-Beverage",
                            "rank": 6,
                            "brandName": ""
                        },
                        {
                            "categoryId": 6,
                            "categoryName": "食品饮品",
                            "id": 83,
                            "name": "瓶装水",
                            "provisionType": "",
                            "isShowFree": false,
                            "freeType": 2,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Food-Beverage",
                            "rank": 9,
                            "brandName": ""
                        },
                        {
                            "categoryId": 6,
                            "categoryName": "食品饮品",
                            "id": 80,
                            "name": "电热水壶",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Food-Beverage",
                            "rank": 10,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "儿童设施服务",
                    "type": 22,
                    "desc": [
                        {
                            "categoryId": 22,
                            "categoryName": "儿童设施服务",
                            "id": 459,
                            "name": "儿童洗漱用品",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "ChildrenFacilities",
                            "rank": 6,
                            "brandName": ""
                        },
                        {
                            "categoryId": 22,
                            "categoryName": "儿童设施服务",
                            "id": 498,
                            "name": "儿童拖鞋",
                            "provisionType": "2",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "ChildrenFacilities",
                            "rank": 25,
                            "brandName": ""
                        },
                        {
                            "categoryId": 22,
                            "categoryName": "儿童设施服务",
                            "id": 499,
                            "name": "儿童浴袍",
                            "provisionType": "2",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "ChildrenFacilities",
                            "rank": 26,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "卫浴设施",
                    "type": 7,
                    "desc": [
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 92,
                            "name": "私人浴室",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 7,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 445,
                            "name": "私人卫生间",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 8,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 93,
                            "name": "吹风机",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 13,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 78,
                            "name": "浴室化妆放大镜",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 15,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 88,
                            "name": "浴衣",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 17,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 488,
                            "name": "毛巾",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 18,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 502,
                            "name": "浴巾",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 19,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 79,
                            "name": "24小时热水",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 20,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 75,
                            "name": "拖鞋",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 22,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 658,
                            "name": "浴缸和淋浴",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 30,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 663,
                            "name": "深泡浴缸",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 34,
                            "brandName": ""
                        },
                        {
                            "categoryId": 7,
                            "categoryName": "卫浴设施",
                            "id": 661,
                            "name": "雨淋花洒喷头",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Bathroom",
                            "rank": 36,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "客房设施",
                    "type": 34,
                    "desc": [
                        {
                            "categoryId": 34,
                            "categoryName": "客房设施",
                            "id": 107,
                            "name": "空调",
                            "provisionType": "",
                            "isShowFree": false,
                            "freeType": 2,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "34",
                            "rank": 9,
                            "brandName": ""
                        },
                        {
                            "categoryId": 34,
                            "categoryName": "客房设施",
                            "id": 219,
                            "name": "手动窗帘",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "34",
                            "rank": 17,
                            "brandName": ""
                        },
                        {
                            "categoryId": 34,
                            "categoryName": "客房设施",
                            "id": 217,
                            "name": "遮光窗帘",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "34",
                            "rank": 21,
                            "brandName": ""
                        },
                        {
                            "categoryId": 34,
                            "categoryName": "客房设施",
                            "id": 224,
                            "name": "床具:鸭绒被",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "34",
                            "rank": 29,
                            "brandName": ""
                        },
                        {
                            "categoryId": 34,
                            "categoryName": "客房设施",
                            "id": 225,
                            "name": "床具:毯子或被子",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "34",
                            "rank": 31,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "室外景观",
                    "type": 8,
                    "desc": [
                        {
                            "categoryId": 8,
                            "categoryName": "室外景观",
                            "id": 249,
                            "name": "游泳池景",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "OutdoorLandscape",
                            "rank": 9,
                            "brandName": ""
                        },
                        {
                            "categoryId": 8,
                            "categoryName": "室外景观",
                            "id": 245,
                            "name": "花园景",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "OutdoorLandscape",
                            "rank": 10,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "媒体科技",
                    "type": 5,
                    "desc": [
                        {
                            "categoryId": 5,
                            "categoryName": "媒体科技",
                            "id": 182,
                            "name": "液晶电视机",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "MediaTechnology",
                            "rank": 10,
                            "brandName": ""
                        },
                        {
                            "categoryId": 5,
                            "categoryName": "媒体科技",
                            "id": 181,
                            "name": "卫星频道",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "MediaTechnology",
                            "rank": 14,
                            "brandName": ""
                        }
                    ]
                },
                {
                    "name": "便利设施",
                    "type": 4,
                    "desc": [
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 258,
                            "name": "电子秤",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 30,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 94,
                            "name": "房内保险箱",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 30,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 213,
                            "name": "针线包",
                            "provisionType": "1",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 31,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 389,
                            "name": "衣架",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 37,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 89,
                            "name": "多种规格电源插座",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 39,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 215,
                            "name": "220V电压插座",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 41,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 76,
                            "name": "雨伞",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 42,
                            "brandName": ""
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "便利设施",
                            "id": 512,
                            "name": "棋牌桌",
                            "provisionType": "",
                            "freeType": 0,
                            "feeDesc": "",
                            "isNormalShow": 1,
                            "icon": "Amenities",
                            "rank": 49,
                            "brandName": ""
                        }
                    ]
                }
            ],
            "signs": {
                "signJustConfirm": {
                    "name": "立即确认",
                    "desc": [
                        "立即确认"
                    ],
                    "type": 3,
                    "filterName": "立即确认"
                },
                "signGift": {
                    "name": "礼",
                    "type": 102,
                    "id": 0,
                    "desc": "海蓝餐厅双人海鲜自助晚餐2025.01.28-2.4不可使用：1份；接待时间:18:00-21:30；适用人数：2；联系电话：+86-898-88718888；需提前1小时预约。萌娃烘焙课程：1份；接待时间:15:00-15:45；联系电话：+86-898-88718888；需提前4小时预约。童趣亲子活动：1份；接待时间:10:00-11:10；联系电话：+86-898-88718888；需提前4小时预约。奇幻森林儿童俱乐部：1份；无需提前预约；每次不限使用券张数。"
                },
                "signCancelPolicy": {
                    "name": "不可取消",
                    "type": 104,
                    "value": "酒店一经确认，不可取消、修改。若未按时入住，我们将扣除您全额或部分房费。",
                    "id": 1
                }
            },
            "subTitles": [
                {
                    "name": "2份早餐",
                    "longName": "2份早餐",
                    "highlight": false
                },
                {
                    "name": "可住2人",
                    "longName": "可住2人",
                    "key": "4",
                    "highlight": false
                },
                {
                    "key": "8",
                    "name": "1张上下铺 及 1张特大床",
                    "longName": "1张上下铺1.2米和1张特大床2米",
                    "highlight": false
                }
            ],
            "subTitleForList": [
                {
                    "name": "可住2人",
                    "longName": "可住2人",
                    "key": "4",
                    "highlight": false
                },
                {
                    "name": "2份早餐",
                    "longName": "2份早餐",
                    "highlight": false
                },
                {
                    "key": "8",
                    "name": "1张上下铺 及 1张特大床",
                    "longName": "1张上下铺1.2米和1张特大床2米",
                    "highlight": false
                },
                {
                    "key": "9",
                    "name": "可吸烟",
                    "longName": "可吸烟",
                    "highlight": false
                },
                {
                    "name": "不可取消",
                    "highlight": true
                }
            ],
            "subSigns": "2份早餐·1张上下铺 及 1张特大床·不可取消·立即确认",
            "subTitleLong": "可住2人｜1张上下铺1.2米和1张特大床2米（可加床）| 2份早餐",
            "tags": [
                {
                    "name": "积分当钱花",
                    "desc": "活动房型每间可减292元",
                    "id": 0,
                    "type": "%E7%A7%AF%E5%88%86%E5%BD%93%E9%92%B1%E8%8A%B1"
                },
                {
                    "name": "礼",
                    "type": 102,
                    "id": 0,
                    "desc": "海蓝餐厅双人海鲜自助晚餐2025.01.28-2.4不可使用：1份；接待时间:18:00-21:30；适用人数：2；联系电话：+86-898-88718888；需提前1小时预约。萌娃烘焙课程：1份；接待时间:15:00-15:45；联系电话：+86-898-88718888；需提前4小时预约。童趣亲子活动：1份；接待时间:10:00-11:10；联系电话：+86-898-88718888；需提前4小时预约。奇幻森林儿童俱乐部：1份；无需提前预约；每次不限使用券张数。"
                }
            ],
            "prepayDiscounts": [
                {
                    "name": "积分当钱花",
                    "desc": "活动房型每间可减292元",
                    "id": 0,
                    "type": "%E7%A7%AF%E5%88%86%E5%BD%93%E9%92%B1%E8%8A%B1"
                }
            ],
            "recommendStatics": [
                {
                    "name": "90m²",
                    "highlight": false
                },
                {
                    "name": "1-7楼",
                    "highlight": false
                },
                {
                    "name": "2份早餐",
                    "longName": "2份早餐",
                    "highlight": false
                },
                {
                    "name": "可住2人",
                    "longName": "可住2人",
                    "key": "4",
                    "highlight": false
                },
                {
                    "key": "8",
                    "name": "1张上下铺 及 1张特大床",
                    "longName": "1张上下铺1.2米和1张特大床2米",
                    "highlight": false
                }
            ],
            "mealInfo": {
                "mealList": [],
                "mealSummary": "2份早餐",
                "mealDesc": "2份早餐",
                "mealTips": "",
                "addBreakfastDesc": "成人加早餐：西式、中式自助餐¥130每份"
            },
            "mealList": [
                {
                    "title": "01-14"
                },
                {
                    "title": "01-15"
                },
                {
                    "title": "01-16"
                },
                {
                    "title": "01-17"
                },
                {
                    "title": "01-18"
                }
            ],
            "priceList": [
                {
                    "title": "01-14",
                    "value": "¥1599",
                    "price": 1599,
                    "priceTax": 0,
                    "priceTaxCurreny": "",
                    "innerPriceTax": 0,
                    "childAddBedFee": 0,
                    "tradePrice": 0
                },
                {
                    "title": "01-15",
                    "value": "¥1599",
                    "price": 1599,
                    "priceTax": 0,
                    "priceTaxCurreny": "",
                    "innerPriceTax": 0,
                    "childAddBedFee": 0,
                    "tradePrice": 0
                },
                {
                    "title": "01-16",
                    "value": "¥1717",
                    "price": 1717,
                    "priceTax": 0,
                    "priceTaxCurreny": "",
                    "innerPriceTax": 0,
                    "childAddBedFee": 0,
                    "tradePrice": 0
                },
                {
                    "title": "01-17",
                    "value": "¥1717",
                    "price": 1717,
                    "priceTax": 0,
                    "priceTaxCurreny": "",
                    "innerPriceTax": 0,
                    "childAddBedFee": 0,
                    "tradePrice": 0
                }
            ],
            "PropertyValueIds": [
                "5516141",
                "640292",
                "34"
            ],
            "Days": [
                {
                    "EffectDate": "2025-01-14T00:00:00.000+08:00",
                    "Price": 1599,
                    "TradePrice": 0
                },
                {
                    "EffectDate": "2025-01-15T00:00:00.000+08:00",
                    "Price": 1599,
                    "TradePrice": 0
                },
                {
                    "EffectDate": "2025-01-16T00:00:00.000+08:00",
                    "Price": 1717,
                    "TradePrice": 0
                },
                {
                    "EffectDate": "2025-01-17T00:00:00.000+08:00",
                    "Price": 1717,
                    "TradePrice": 0
                }
            ],
            "ExtendInfos": [
                {
                    "ExtendMaps": [
                        {
                            "Key": "hoteltoken",
                            "Value": "02_H4371952_I2025-01-14_O2025-01-18_City43_SegmentId2"
                        },
                        {
                            "Key": "dailyPrice",
                            "Value": "[{\"EffectDate\":\"2025-01-14T00:00:00.000+08:00\",\"Price\":1599.0,\"TradePrice\":0,\"AdjustPrice\":0,\"TradeAdjustPrice\":0,\"MealCount\":2,\"LocalPrice\":1599.0,\"LocalAdjustPrice\":0,\"VacationPrice\":0,\"HTLPrice\":0,\"Subsidy\":0,\"HTLCost\":0,\"PrepayDiscountDetails\":[{\"Amount\":70.35,\"CostAmount\":70.35,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"DisplayPrepayDiscountDetails\":[{\"Amount\":70.35,\"CostAmount\":70.35,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"OriginalPrice\":1599.0,\"OriginalCost\":0,\"LocalSubsidy\":0,\"RecyleSavePrice\":0,\"Cost\":1336.764},{\"EffectDate\":\"2025-01-15T00:00:00.000+08:00\",\"Price\":1599.0,\"TradePrice\":0,\"AdjustPrice\":0,\"TradeAdjustPrice\":0,\"MealCount\":2,\"LocalPrice\":1599.0,\"LocalAdjustPrice\":0,\"VacationPrice\":0,\"HTLPrice\":0,\"Subsidy\":0,\"HTLCost\":0,\"PrepayDiscountDetails\":[{\"Amount\":70.35,\"CostAmount\":70.35,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"DisplayPrepayDiscountDetails\":[{\"Amount\":70.35,\"CostAmount\":70.35,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"OriginalPrice\":1599.0,\"OriginalCost\":0,\"LocalSubsidy\":0,\"RecyleSavePrice\":0,\"Cost\":1336.764},{\"EffectDate\":\"2025-01-16T00:00:00.000+08:00\",\"Price\":1717.0,\"TradePrice\":0,\"AdjustPrice\":0,\"TradeAdjustPrice\":0,\"MealCount\":2,\"LocalPrice\":1717.0,\"LocalAdjustPrice\":0,\"VacationPrice\":0,\"HTLPrice\":0,\"Subsidy\":0,\"HTLCost\":0,\"PrepayDiscountDetails\":[{\"Amount\":75.54,\"CostAmount\":75.54,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"DisplayPrepayDiscountDetails\":[{\"Amount\":75.54,\"CostAmount\":75.54,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"OriginalPrice\":1717.0,\"OriginalCost\":0,\"LocalSubsidy\":0,\"RecyleSavePrice\":0,\"Cost\":1435.412},{\"EffectDate\":\"2025-01-17T00:00:00.000+08:00\",\"Price\":1717.0,\"TradePrice\":0,\"AdjustPrice\":0,\"TradeAdjustPrice\":0,\"MealCount\":2,\"LocalPrice\":1717.0,\"LocalAdjustPrice\":0,\"VacationPrice\":0,\"HTLPrice\":0,\"Subsidy\":0,\"HTLCost\":0,\"PrepayDiscountDetails\":[{\"Amount\":75.54,\"CostAmount\":75.54,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"DisplayPrepayDiscountDetails\":[{\"Amount\":75.54,\"CostAmount\":75.54,\"PriceFactor\":1.00,\"CostFactor\":0.95,\"RuleConfigureID\":100499401,\"TypeConfigureID\":111,\"PrepayCampaignID\":2611,\"TagID\":545,\"TagTitle\":\"积分当钱花\",\"CNYAmount\":0,\"CostCNYAmount\":0,\"UseDate\":\"0001-01-01T08:00:00.000+08:00\",\"DType\":1,\"LocalAmount\":0,\"Category\":0}],\"OriginalPrice\":1717.0,\"OriginalCost\":0,\"LocalSubsidy\":0,\"RecyleSavePrice\":0,\"Cost\":1435.412}]"
                        }
                    ]
                }
            ],
            "uniqueKey": "02_R1524998161_I2025-01-14_O2025-01-18_RatePlan_SID0",
            "isGroupRoom": false,
            "roomCode": 1524998161,
            "roomStatus": "不可超(L)",
            "roomHoldStatus": "保留房",
            "roomInfo": [
                "房型ID：1524998161",
                "保留房",
                "房态：不可超(L)",
                "直签"
            ],
            "bookable": true,
            "childPolicy": {
                "title": "儿童及加床",
                "type": "child",
                "value": [
                    {
                        "text": "欢迎客人携带儿童入住"
                    },
                    {
                        "text": "每房最多有2名0-17岁儿童使用现有床铺，每房最多容纳1张加床和1张婴儿床",
                        "title": "婴儿床及加床政策",
                        "title4Table": [
                            "年龄",
                            "床铺",
                            "费用"
                        ],
                        "extend": [
                            {
                                "title": "17岁及以下",
                                "other": [
                                    [
                                        "使用现有床铺",
                                        "免费"
                                    ]
                                ],
                                "lines": 1,
                                "columnType": 3
                            }
                        ]
                    },
                    {
                        "text": [],
                        "title": "儿童早餐",
                        "title4Table": [
                            "年龄",
                            "费用"
                        ],
                        "extend": [
                            {
                                "title": "6岁及以下",
                                "other": [
                                    [
                                        "免费"
                                    ]
                                ],
                                "lines": 1,
                                "columnType": 2
                            },
                            {
                                "title": "7 - 12岁",
                                "other": [
                                    [
                                        "￥65"
                                    ]
                                ],
                                "lines": 1,
                                "columnType": 3
                            },
                            {
                                "title": "13 - 17岁",
                                "other": [
                                    [
                                        "￥130"
                                    ]
                                ],
                                "lines": 1,
                                "columnType": 4
                            }
                        ]
                    }
                ]
            },
            "childPolicyNew": {
                "title": "儿童及加床",
                "type": "child",
                "value": [
                    {
                        "title": "",
                        "text": [
                            "该房型欢迎携带儿童入住"
                        ],
                        "title4Table": [],
                        "extend": []
                    },
                    {
                        "title": "婴儿床及加床政策",
                        "text": [
                            "该房型可提供加床、可提供加婴儿床",
                            "超过入住人数时，可能涉及额外费用，收费规则如下"
                        ],
                        "title4Table": [
                            "年龄",
                            "床铺",
                            "费用"
                        ],
                        "extend": [
                            {
                                "title": "2岁及以下",
                                "other": [
                                    [
                                        "使用现有床铺",
                                        "免费"
                                    ],
                                    [
                                        "加床",
                                        "￥ 330/人·晚"
                                    ],
                                    [
                                        "加婴儿床",
                                        "免费"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        "",
                                        "免费"
                                    ],
                                    [
                                        "",
                                        ""
                                    ],
                                    [
                                        "",
                                        "免费"
                                    ]
                                ]
                            },
                            {
                                "title": "3-17岁",
                                "other": [
                                    [
                                        "使用现有床铺",
                                        "免费"
                                    ],
                                    [
                                        "加床",
                                        "￥ 330/人·晚"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        "",
                                        "免费"
                                    ],
                                    [
                                        "",
                                        ""
                                    ]
                                ]
                            },
                            {
                                "title": "18岁及以上",
                                "other": [
                                    [
                                        "加床",
                                        "￥ 330/人·晚"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        "",
                                        ""
                                    ]
                                ]
                            }
                        ]
                    },
                    {
                        "title": "儿童早餐",
                        "text": "",
                        "title4Table": [
                            "年龄",
                            "费用"
                        ],
                        "extend": [
                            {
                                "title": "6岁及以下",
                                "other": [
                                    [
                                        "免费"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        "免费"
                                    ]
                                ]
                            },
                            {
                                "title": "7-12岁",
                                "other": [
                                    [
                                        "￥ 65/人"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        ""
                                    ]
                                ]
                            },
                            {
                                "title": "13-17岁",
                                "other": [
                                    [
                                        "￥ 130/人"
                                    ]
                                ],
                                "otherH": [
                                    [
                                        ""
                                    ]
                                ]
                            }
                        ]
                    }
                ]
            },
            "rcrp": [
                "上铺0.9*1.8m，下铺1.2*1.8m。"
            ],
            "complicatedBedInfo": {
                "name": "床型",
                "id": 0,
                "extend": [
                    {
                        "roomName": "卧室1",
                        "details": [
                            [
                                "上下铺",
                                "宽1.2米",
                                "x1"
                            ],
                            [
                                "特大床",
                                "宽2米",
                                "x1"
                            ]
                        ]
                    }
                ],
                "type": 88
            },
            "hasXProductInfo": true,
            "filterItemDataList": [],
            "hasFood": true,
            "hasEnjoy": true
        }

const data = ref({...originalData});

// 添加测试边缘情况的函数
const testEdgeCases = () => {
    console.log("测试边缘情况按钮被点击");
    data.value = {
        "nullObject": null,
        "arrayWithNulls": [null, null, { "valid": true }, null],
        "deepNested": {
            "level1": {
                "level2": {
                    "level3": null
                }
            }
        },
        "mixedArray": [1, null, "text", { "key": null }]
    };
};

// 添加重置数据的函数
const resetData = () => {
    console.log("重置数据按钮被点击");
    data.value = {...originalData};
};

// 添加生成随机数据函数
const generateRandomData = () => {
    console.log("生成随机数据");
    const randomData = {
        "id": Math.floor(Math.random() * 10000),
        "created": new Date().toISOString(),
        "user": {
            "name": ["Alice", "Bob", "Charlie", "Dave"][Math.floor(Math.random() * 4)],
            "active": Math.random() > 0.5,
            "permissions": Array(Math.floor(Math.random() * 5 + 1)).fill(0).map(() => 
                ["read", "write", "admin", "delete"][Math.floor(Math.random() * 4)]
            ),
            "profile": {
                "avatar": "https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 100) + ".jpg",
                "settings": {
                    "theme": ["light", "dark", "auto"][Math.floor(Math.random() * 3)],
                    "notifications": Math.random() > 0.5
                }
            }
        },
        "stats": Array(Math.floor(Math.random() * 5 + 3)).fill(0).map(() => ({
            "date": new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString().split('T')[0],
            "value": Math.floor(Math.random() * 100),
            "trend": Math.random() > 0.5 ? "up" : "down"
        }))
    };
    data.value = randomData;
};
</script>

<style scoped>
.json-viewer-container {
    padding: 6px;
    max-width: 100%;
    margin: 0;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}

.title {
    color: #333;
    margin: 0;
    font-weight: 600;
    font-size: 15px;
}

.button-group {
    display: flex;
    gap: 4px;
}

.action-button {
    padding: 2px 8px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
    box-shadow: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

.primary {
    background-color: #0066cc;
    color: white;
}

.secondary {
    background-color: #666;
    color: white;
}

.info {
    background-color: #34a853;
    color: white;
}
</style>