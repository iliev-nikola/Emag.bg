//ITEMS IN FOCUS-BAR SECTION
const ALL_FOCUS_ITEMS = [
    {
        'id': 1,
        'title': 'Смартфон Xiaomi Redmi 9C NFC, Dual SIM, 32GB, 4G, Midnight Gray',
        'image': './assets/images/focus-items/1.jpg',
        'currentPrice': 199,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/1.jpg', './assets/images/focus-items/1.1.png']
    },
    {
        'id': 2,
        'title': 'Телевизор Star-Light 32DM6700, 32" (81 см), Smart Android, HD, LED, Class A+',
        'image': './assets/images/focus-items/2.jpg',
        'currentPrice': 294,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/2.jpg', './assets/images/focus-items/2.1.png']

    },
    {
        'id': 3,
        'title': 'Пералня Indesit MTWE71252WEE, 7 кг, 1200 об/мин, Клас A+++, MyTime, Fast Cycles, Бял',
        'image': './assets/images/focus-items/3.jpg',
        'currentPrice': 539,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/3.jpg', './assets/images/focus-items/3.1.png']

    },
    {
        'id': 4,
        'title': 'Акумулаторна ударна бормашина 18V 2.0Ah Li-Ion Steinhaus',
        'image': './assets/images/focus-items/4.jpg',
        'currentPrice': 89,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/4.jpg', './assets/images/focus-items/4.1.png']

    }
    ,
    {
        'id': 5,
        'title': 'Електрическа тротинетка KugooS1 Pro, Автономия 30 км',
        'image': './assets/images/focus-items/5.png',
        'regularPrice': 849,
        'currentPrice': 589,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/5.png', './assets/images/focus-items/5.1.png']

    },
    {
        'id': 6,
        'title': 'Детска количка Kinderkraft 3 in 1 XMoov, Черна ',
        'image': './assets/images/focus-items/6.jpg',
        'currentPrice': 569,
        'regularPrice': 799,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/6.jpg', './assets/images/focus-items/6.1.png']

    },
    {
        'id': 7,
        'title': 'Apple Watch 5, GPS, Cellular, 44mm Space Black Stainless Steel Case with Black Sport Band - S/M & M/L ',
        'image': './assets/images/focus-items/7.png',
        'currentPrice': 1199,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/7.png', './assets/images/focus-items/7.1.png']
    },
    {
        'id': 8,
        'title': 'Кабел A+ High-Speed HDMI 1.4V, plug-plug, Ethernet, gold-plated, 5 м',
        'image': './assets/images/focus-items/8.png',
        'currentPrice': 9,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/8.png', './assets/images/focus-items/8.1.png']

    },
    {
        'id': 9,
        'title': 'Робот прахосмукачка Xiaomi Mi Robot Vacuum Mop Cleaner, 0.6 л, WI-FI',
        'image': './assets/images/focus-items/9.png',
        'currentPrice': 439,
        'regularPrice': 599,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/9.png', './assets/images/focus-items/9.1.png']

    },
    {
        'id': 10,
        'title': 'Комплект мивка algranit Alveus Cancan 30, 580x420 мм + Смесител Diana, Бежов',
        'image': './assets/images/focus-items/10.png',
        'currentPrice': 389,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/10.png', './assets/images/focus-items/10.1.png']
    },
    {
        'id': 11,
        'title': 'Автобокс Dacia, Твърд, 480 л, Двойно отваряне, Лъскаво черно, Лого Dacia',
        'image': './assets/images/focus-items/11.png',
        'currentPrice': 549,
        'regularPrice': 679,
        'currentPennies': '99',
        'regularPennies': '99'

    },
    {
        'id': 12,
        'title': 'Слушалки In-Ear Wraps CSUN-VI5M, Stereo Talk, Оранжев',
        'image': './assets/images/focus-items/12.png',
        'currentPrice': 13,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null

    },
    {
        'id': 13,
        'title': 'Аудио слушалки A+ SBG5, Bluetooth, Черни',
        'image': './assets/images/focus-items/13.png',
        'currentPrice': 44,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/13.png', './assets/images/focus-items/13.1.png']

    },
    {
        'id': 14,
        'title': 'Ел. четка за зъби Oral B Vitality D100 Sensi Ultra Thin + Travel Case , 1 глава, Бял',
        'image': './assets/images/focus-items/14.png',
        'currentPrice': 39,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/14.png', './assets/images/focus-items/14.1.png']

    },
    {
        'id': 15,
        'title': 'Комплект LED лента RGB Phenom, С дистанционно управление, 22W, 1260 lm, 3 м',
        'image': './assets/images/focus-items/15.png',
        'currentPrice': 39,
        'regularPrice': 54,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/15.png', './assets/images/focus-items/15.1.png']

    },
    {
        'id': 16,
        'title': 'Камера за автомобил Prestigio RoadRunner 155, 2.0" display, FHD 30fps, 140°-градусов ъгъл, OVP, NTC, Датчик за движение, G-sensor',
        'image': './assets/images/focus-items/16.png',
        'currentPrice': 72,
        'regularPrice': 84,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/16.png', './assets/images/focus-items/16.1.png']

    }
    ,
    {
        'id': 17,
        'title': 'Клавиатура Apple Magic за iPad Pro 11" (2020), Layout INT EN, Black',
        'image': './assets/images/focus-items/17.png',
        'currentPrice': 749,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/focus-items/17.png', './assets/images/focus-items/17.1.png']

    },
    {
        'id': 18,
        'title': 'Транспортна количка Wolfcraft 5520000 TS 1000, Максимално натоварване 200 кг',
        'image': './assets/images/focus-items/18.png',
        'currentPrice': 444,
        'regularPrice': 594,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/18.png', './assets/images/focus-items/18.1.png']

    },
]
//ITEMS IN FOCUS-BAR SECTION
const OTHER_CLIENTS_WATCHED = [
    {
        'id': 19,
        'title': 'Смартфон Apple iPhone 12, 64GB, 5G, Blue',
        'image': './assets/images/other-clients-watched/1.png',
        'currentPrice': 1.699,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/1.png', './assets/images/other-clients-watched/1.1.png']

    },
    {
        'id': 20,
        'title': 'Рокля - Костюм На Елза От Замръзналото Кралство, Disney Frozen, 130см, Размер за 6год',
        'image': './assets/images/other-clients-watched/2.png',
        'currentPrice': 39,
        'regularPrice': 79,
        'currentPennies': '98',
        'regularPennies': '99',
        'allImages': ['./assets/images/other-clients-watched/2.png', './assets/images/other-clients-watched/2.2.png']

    },
    {
        'id': 21,
        'title': 'Комплект Кухненска Мивка с отцедник и смесител Kring, Композитен гранит, 780x440 мм, Дълбочина 170 мм, Обратима, Монтаж на плот, Бял',
        'image': './assets/images/other-clients-watched/3.png',
        'currentPrice': 299,
        'regularPrice': 399,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/other-clients-watched/3.png', './assets/images/other-clients-watched/3.3.png']

    },
    {
        'id': 22,
        'title': 'Телевизор Samsung 32T4302, 32" (80 см), Smart, HD, LED',
        'image': './assets/images/other-clients-watched/4.png',
        'currentPrice': 419,
        'regularPrice': null,
        'currentPennies': '98',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/4.png', './assets/images/other-clients-watched/4.1.png']

    }
    ,
    {
        'id': 23,
        'title': 'Конзола Sony PlayStation 5',
        'image': './assets/images/other-clients-watched/5.png',
        'regularPrice': 2699,
        'currentPrice': 2599,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/other-clients-watched/5.png', './assets/images/other-clients-watched/5.1.png']
    },
    {
        'id': 24,
        'title': 'Планетарен миксер Daewoo DHM150Y, 1600 W, 10 скорости, 4.5 л. Иноксова купа',
        'image': './assets/images/other-clients-watched/6.png',
        'currentPrice': 129,
        'regularPrice': 149,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/other-clients-watched/6.png', './assets/images/other-clients-watched/6.1.png']
    },
    {
        'id': 25,
        'title': 'Гардероб Kring Houston, Плъзгащи се врати, Чекмеджета, Цвят дъб / Ефект тъмносив бетон, 200 x 200 x 61 см',
        'image': './assets/images/other-clients-watched/7.png',
        'currentPrice': 579,
        'regularPrice': 1049,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/other-clients-watched/7.png', './assets/images/other-clients-watched/7.1.png']
    },
    {
        'id': 26,
        'title': 'Solid State Drive (SSD) Kingston A2000, 1TB, NVMe, M.2',
        'image': './assets/images/other-clients-watched/8.png',
        'currentPrice': 260,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/8.png', './assets/images/other-clients-watched/8.1.png']

    },
    {
        'id': 27,
        'title': 'Телевизор LED Star-Light, 32" (80 см), 32DM3500, HD',
        'image': './assets/images/other-clients-watched/9.png',
        'currentPrice': 229,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null

    },
    {
        'id': 28,
        'title': 'Акумулаторна бормашина Steinhaus, PRO-CD18X, 18 V 1.3 Ah Li-Ion, 30Nm, 2 степени 400/1500 об/мин, Бърз патронник 10мм, 13 аксесоара, Пластмасова кутия',
        'image': './assets/images/other-clients-watched/10.png',
        'currentPrice': 62,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': '99',
        'allImages': ['./assets/images/focus-items/4.jpg', './assets/images/focus-items/4.1.png']
    },
    {
        'id': 29,
        'title': 'Комплект тенджери Madeline Cooking by Heinner, 10 части, Индукция, Инокс',
        'image': './assets/images/other-clients-watched/11.png',
        'currentPrice': 100,
        'regularPrice': 120,
        'currentPennies': '46',
        'regularPennies': '56',
        'allImages': ['./assets/images/other-clients-watched/11.png', './assets/images/other-clients-watched/11.1.png']

    },
    {
        'id': 30,
        'title': 'Хладилна витрина Star-Light VFM-211L, 211 л, 160 бутилки, Вентилатор, H 174.7 см, Бяла',
        'image': './assets/images/other-clients-watched/12.png',
        'currentPrice': 704,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': '99'

    },
    {
        'id': 31,
        'title': 'Защитна маска за лице KN95 - FFP2 - за многократна употреба',
        'image': './assets/images/other-clients-watched/13.png',
        'currentPrice': 6,
        'regularPrice': 9,
        'currentPennies': '00',
        'regularPennies': '60',
        'allImages': ['./assets/images/other-clients-watched/13.png', './assets/images/other-clients-watched/13.1.png']

    },
    {
        'id': 32,
        'title': 'Телевизор LED Diamant, 32" (80 см), 32HL4300H/A, HD',
        'image': './assets/images/other-clients-watched/14.png',
        'currentPrice': 219,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/14.png', './assets/images/other-clients-watched/14.1.png']

    },
    {
        'id': 33,
        'title': 'Телевизор LG 49UN73003LA, 49" (123 см), Smart, 4K Ultra HD, LED',
        'image': './assets/images/other-clients-watched/15.png',
        'currentPrice': 769,
        'regularPrice': null,
        'currentPennies': '78',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/15.png', './assets/images/other-clients-watched/15.1.png']

    },
    {
        'id': 34,
        'title': 'Solid State Drive (SSD) Kingston A400, 120GB, 2.5", SATA III',
        'image': './assets/images/other-clients-watched/16.png',
        'currentPrice': 44,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/16.png', './assets/images/other-clients-watched/16.2.png']

    }
    ,
    {
        'id': 35,
        'title': 'Телевизор Samsung 55TU7172, 55" (138 см), Smart, 4K Ultra HD, LED',
        'image': './assets/images/other-clients-watched/17.png',
        'currentPrice': 849,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/17.png', './assets/images/other-clients-watched/17.2.png']

    },
    {
        'id': 36,
        'title': 'Телевизор Samsung 43TU7172, 43" (108 см), Smart, 4K Ultra HD, LED',
        'image': './assets/images/other-clients-watched/18.png',
        'currentPrice': 649,
        'regularPrice': null,
        'currentPennies': '99',
        'regularPennies': null,
        'allImages': ['./assets/images/other-clients-watched/18.png', './assets/images/other-clients-watched/18.1.png']
    },
]