let center = [22.6119254,120.2976106]; // 85大樓座標
let zoom = 15;
var map = L.map('map')
let marker;
let tableData = {};

window.onload = async () => {
    await getJSON();
    await checkNavigator();
    loadingComplete();
}

let getJSON = () => {
    return fetch('./data/list.xlsx')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log(data);
        tableData = data;
    })
    .catch(error => {
        tableData = [
            {
                "name": "(臺北市)101玩具：長安店",
                "address": "臺北市大同區長安西路143號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大同區長安西路143號",
                "tel": "02-25491028",
                "lat": 25.051481,
                "lng": 121.514925
            },
            {
                "name": "(臺北市)101玩具：高島屋",
                "address": "臺北市士林區忠誠路二段55號3樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區忠誠路二段55號3樓",
                "tel": "02-28314661",
                "lat": 25.111968,
                "lng": 121.5315278
            },
            {
                "name": "(臺北市)FUNBOX：天母新光",
                "address": "臺北市士林區天母東路68號6樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區天母東路68號6樓",
                "tel": "02-2874-0785",
                "lat": 25.1179352,
                "lng": 121.5339267
            },
            {
                "name": "(臺北市)FUNBOX：南港潤泰",
                "address": "臺北市南港區忠孝東路七段369號B棟3樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市南港區忠孝東路七段369號B棟3樓",
                "tel": "02-26529275",
                "lat": 25.0524417,
                "lng": 121.6035521
            },
            {
                "name": "(臺北市)FUNBOX：寶慶遠東",
                "address": "臺北市中正區寶慶路32號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區寶慶路32號5樓",
                "tel": "02-23315720",
                "lat": 25.0415012,
                "lng": 121.5091114
            },
            {
                "name": "(臺北市)TOYWORLD：信義誠品",
                "address": "臺北市信義區松高路11號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區松高路11號5樓",
                "tel": "02-77230583",
                "lat": 25.0397197,
                "lng": 121.5658739
            },
            {
                "name": "(臺北市)TOYWORLD：南港中信",
                "address": "臺北市南港區經貿二路186號C棟1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市南港區經貿二路186號C棟1樓",
                "tel": "02- 7730-8670",
                "lat": 25.0585864,
                "lng": 121.6148449
            },
            {
                "name": "(臺北市)TOYWORLD：美麗華",
                "address": "臺北市中山區敬業三路22號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中山區敬業三路22號4樓",
                "tel": "02-77230561",
                "lat": 25.0835661,
                "lng": 121.5570705
            },
            {
                "name": "(臺北市)世興精品禮坊（中興精品）",
                "address": "臺北市中正區中華路二段303巷3號",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區中華路二段303巷3號",
                "tel": "02-23037609",
                "lat": 25.0294309,
                "lng": 121.5049115
            },
            {
                "name": "(臺北市)永淇樂園地下街",
                "address": "臺北市中正區市民大道一段100號B1",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區市民大道一段100號B1",
                "tel": "02-25508654",
                "lat": 25.0487071,
                "lng": 121.5142185
            },
            {
                "name": "(臺北市)玩具e哥：內湖康寧店",
                "address": "臺北市內湖區康寧路三段74號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區康寧路三段74號2樓",
                "tel": "02-77297576",
                "lat": 25.069945,
                "lng": 121.6114565
            },
            {
                "name": "(臺北市)玩具e哥：台北三創店",
                "address": "臺北市中正區市民大道三段2號6樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區市民大道三段2號6樓",
                "tel": "02-77230587",
                "lat": 25.0453862,
                "lng": 121.53102
            },
            {
                "name": "(臺北市)玩具e哥：台北大道一店",
                "address": "臺北市中正區市民大道一段100號79-1號店",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區市民大道一段100號79-1號店",
                "tel": "02-77230318",
                "lat": 25.0485714,
                "lng": 121.5186521
            },
            {
                "name": "(臺北市)玩具e哥：台北大道二店",
                "address": "臺北市中正區市民大道一段100號39號店鋪",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區市民大道一段100號39號店鋪",
                "tel": "02-77230328",
                "lat": 25.0484218,
                "lng": 121.5174876
            },
            {
                "name": "(臺北市)玩具e哥：松山店",
                "address": "臺北市信義區松山路141號",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區松山路141號",
                "tel": "02- 7723-0908",
                "lat": 25.046877,
                "lng": 121.578056
            },
            {
                "name": "(臺北市)玩具反斗城：內湖家樂福店",
                "address": "臺北市內湖區民善街88號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區民善街88號4樓",
                "tel": "02-27967007",
                "lat": 25.0604224,
                "lng": 121.5752559
            },
            {
                "name": "(臺北市)玩具反斗城：敦化店",
                "address": "臺北市松山區南京東路三段337號7樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區南京東路三段337號7樓",
                "tel": "02-87123691",
                "lat": 25.0520316,
                "lng": 121.5481058
            },
            {
                "name": "(臺北市)金玉堂：葫洲店",
                "address": "臺北市內湖區民權東路六段296巷20號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區民權東路六段296巷20號2樓",
                "tel": "02-26320621",
                "lat": 25.0723353,
                "lng": 121.6059503
            },
            {
                "name": "(臺北市)紅蘋果",
                "address": "臺北市士林區天母西路63號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區天母西路63號1樓",
                "tel": "02-28735686",
                "lat": 25.118742,
                "lng": 121.529569
            },
            {
                "name": "(臺北市)原紹商行",
                "address": "臺北市松山區民生東路五段184-6號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區民生東路五段184-6號",
                "tel": "02-27627240",
                "lat": 25.058434,
                "lng": 121.56392
            },
            {
                "name": "(臺北市)家樂福：重慶店",
                "address": "臺北市大同區重慶北路2段171號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大同區重慶北路2段171號",
                "tel": "-",
                "lat": 25.0591489,
                "lng": 121.5138798
            },
            {
                "name": "(臺北市)家樂福：桂林店",
                "address": "臺北市萬華區桂林路1號",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區桂林路1號",
                "tel": "-",
                "lat": 25.0378901,
                "lng": 121.5058635
            },
            {
                "name": "(臺北市)其曜玩具：天母SOGO",
                "address": "臺北市士林區中山北路六段77號7樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區中山北路六段77號7樓",
                "tel": "02-28348988",
                "lat": 25.1051833,
                "lng": 121.5245452
            },
            {
                "name": "(臺北市)其曜玩具：台北地下街",
                "address": "臺北市中正區市民大道一段100號B1-51號店",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區市民大道一段100號B1-51號店",
                "tel": "02-25589576",
                "lat": 25.0485714,
                "lng": 121.5186521
            },
            {
                "name": "(臺北市)其曜玩具：忠孝SOGO",
                "address": "臺北市大安區忠孝東路四段45號10樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區忠孝東路四段45號10樓",
                "tel": "02-27510659",
                "lat": 25.0419205,
                "lng": 121.5448835
            },
            {
                "name": "(臺北市)統一超商：三興",
                "address": "臺北市信義區吳興街156巷2弄2號4號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區吳興街156巷2弄2號4號1樓",
                "tel": "-",
                "lat": 25.0291736,
                "lng": 121.5614917
            },
            {
                "name": "(臺北市)統一超商：千成",
                "address": "臺北市中正區林森南路4之3號",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區林森南路4之3號",
                "tel": "-",
                "lat": 25.0437692,
                "lng": 121.5228848
            },
            {
                "name": "(臺北市)統一超商：大饌",
                "address": "臺北市士林區大東路35號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區大東路35號1樓",
                "tel": "-",
                "lat": 25.088324,
                "lng": 121.524761
            },
            {
                "name": "(臺北市)統一超商：加賀屋",
                "address": "臺北市北投區溫泉路73巷5號地下二樓之1",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區溫泉路73巷5號地下二樓之1",
                "tel": "-",
                "lat": 25.1357945,
                "lng": 121.5057137
            },
            {
                "name": "(臺北市)統一超商：昆明",
                "address": "臺北市萬華區昆明街76之1號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區昆明街76之1號1樓",
                "tel": "-",
                "lat": 25.0457803,
                "lng": 121.5055166
            },
            {
                "name": "(臺北市)統一超商：明德",
                "address": "臺北市北投區明德路114號",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區明德路114號",
                "tel": "-",
                "lat": 25.1098625,
                "lng": 121.5202558
            },
            {
                "name": "(臺北市)統一超商：東吉",
                "address": "臺北市松山區民生東路五段100號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區民生東路五段100號",
                "tel": "-",
                "lat": 25.0584411,
                "lng": 121.560323
            },
            {
                "name": "(臺北市)統一超商：松鑽",
                "address": "臺北市松山區八德路四段686號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區八德路四段686號",
                "tel": "-",
                "lat": 25.0498433,
                "lng": 121.5767343
            },
            {
                "name": "(臺北市)統一超商：金龍",
                "address": "臺北市內湖區內湖路二段407號409號411號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區內湖路二段407號409號411號1樓",
                "tel": "-",
                "lat": 25.0845589,
                "lng": 121.5933049
            },
            {
                "name": "(臺北市)統一超商：清江",
                "address": "臺北市北投區公館路165號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區公館路165號1樓",
                "tel": "-",
                "lat": 25.1290571,
                "lng": 121.5066342
            },
            {
                "name": "(臺北市)統一超商：集鑫",
                "address": "臺北市士林區延平北路六段229號231號",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區延平北路六段229號231號",
                "tel": "-",
                "lat": 25.0892484,
                "lng": 121.5051137
            },
            {
                "name": "(臺北市)統一超商：新秀",
                "address": "臺北市文山區秀明路二段8號,10號",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區秀明路二段8號,10號",
                "tel": "-",
                "lat": 24.9915905,
                "lng": 121.5741433
            },
            {
                "name": "(臺北市)統一超商：新南",
                "address": "臺北市中正區新生南路一段126-7號",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區新生南路一段126-7號",
                "tel": "-",
                "lat": 25.037118,
                "lng": 121.5324854
            },
            {
                "name": "(臺北市)統一超商：新萬隆",
                "address": "臺北市文山區羅斯福路六段20.22號",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區羅斯福路六段20.22號",
                "tel": "-",
                "lat": 24.9947734,
                "lng": 121.5411128
            },
            {
                "name": "(臺北市)統一超商：新豪美",
                "address": "臺北市北投區文林北路98號100號",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區文林北路98號100號",
                "tel": "-",
                "lat": 25.10564,
                "lng": 121.517646
            },
            {
                "name": "(臺北市)統一超商：萬濠",
                "address": "臺北市中山區敬業四路1號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中山區敬業四路1號1樓",
                "tel": "-",
                "lat": 25.0834051,
                "lng": 121.558727
            },
            {
                "name": "(臺北市)統一超商：福順",
                "address": "臺北市士林區重慶北路四段177號",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區重慶北路四段177號",
                "tel": "-",
                "lat": 25.0839214,
                "lng": 121.5115974
            },
            {
                "name": "(臺北市)統一超商：環金",
                "address": "臺北市內湖區環山路二段123號",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區環山路二段123號",
                "tel": "-",
                "lat": 25.0841639,
                "lng": 121.5764331
            },
            {
                "name": "(臺北市)統一超商：鑫樂昇",
                "address": "臺北市萬華區武昌街二段114之3號.之4號",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區武昌街二段114之3號.之4號",
                "tel": "-",
                "lat": 25.0450657,
                "lng": 121.5048772
            },
            {
                "name": "(臺北市)愛買：景美店",
                "address": "臺北市文山區景中街30巷12號",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區景中街30巷12號",
                "tel": "-",
                "lat": 24.9921961,
                "lng": 121.5422633
            },
            {
                "name": "(臺北市)聖橋行",
                "address": "臺北市內湖區內湖路2段76巷18號",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區內湖路2段76巷18號",
                "tel": "02-26587913",
                "lat": 25.0787954,
                "lng": 121.5810393
            },
            {
                "name": "(臺北市)鈺峰行",
                "address": "臺北市文山區興隆路二段94之3號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區興隆路二段94之3號1樓",
                "tel": "02-29300265",
                "lat": 25.0005463,
                "lng": 121.549575
            },
            {
                "name": "(臺北市)鼎美玩具：信義新光",
                "address": "臺北市信義區松高路12號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區松高路12號5樓",
                "tel": "02-77231938",
                "lat": 25.0383426,
                "lng": 121.5666245
            },
            {
                "name": "(臺北市)鼎美玩具：南西新光",
                "address": "臺北市中山區南京西路12號6樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中山區南京西路12號6樓",
                "tel": "02-77231208",
                "lat": 25.0523038,
                "lng": 121.5211048
            },
            {
                "name": "(臺北市)鼎美玩具：站前新光",
                "address": "臺北市中正區忠孝西路一段66號8樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區忠孝西路一段66號8樓",
                "tel": "02-77231098",
                "lat": 25.0461278,
                "lng": 121.515325
            },
            {
                "name": "(臺北市)興育聖文化事業有限公司",
                "address": "臺北市萬華區桂林路71號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區桂林路71號1樓",
                "tel": "02-23719797",
                "lat": 25.0384203,
                "lng": 121.502278
            },
            {
                "name": "(臺北市)鴻成行",
                "address": "臺北市北投區實踐街65號",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區實踐街65號",
                "tel": "02-28210657",
                "lat": 25.1153471,
                "lng": 121.5099229
            },
            {
                "name": "(臺北市)FUNBOX：信義遠東",
                "address": "臺北市信義區松仁路58號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區松仁路58號5樓",
                "tel": "02-8786-4150",
                "lat": 25.0368671,
                "lng": 121.567959
            },
            {
                "name": "(臺北市)其曜玩具：統一時代百貨",
                "address": "臺北市信義區忠孝東路五段8號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區忠孝東路五段8號4樓",
                "tel": "02-2722-6513",
                "lat": 25.040846,
                "lng": 121.565396
            },
            {
                "name": "(臺北市)玩具反斗城：新生店",
                "address": "臺北市中山區新生北路二段28號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中山區新生北路二段28號1樓",
                "tel": "02-25621142",
                "lat": 25.0539954,
                "lng": 121.5270258
            },
            {
                "name": "(臺北市)家樂福：內湖店",
                "address": "臺北市內湖區民善街88號3樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區民善街88號3樓",
                "tel": "-",
                "lat": 25.0602348,
                "lng": 121.5753493
            },
            {
                "name": "(臺北市)統一超商：世運",
                "address": "臺北市萬華區昆明街81號83號",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區昆明街81號83號",
                "tel": "-",
                "lat": 25.0427638,
                "lng": 121.504981
            },
            {
                "name": "(臺北市)統一超商：行義",
                "address": "臺北市北投區石牌路二段348巷1號3號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區石牌路二段348巷1號3號1樓",
                "tel": "-",
                "lat": 25.123068,
                "lng": 121.5250107
            },
            {
                "name": "(臺北市)統一超商：信中",
                "address": "臺北市大安區信義路三段101號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區信義路三段101號",
                "tel": "-",
                "lat": 25.0337467,
                "lng": 121.538684
            },
            {
                "name": "(臺北市)統一超商：健一",
                "address": "臺北市松山區健康路11號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區健康路11號",
                "tel": "-",
                "lat": 25.0532337,
                "lng": 121.5524327
            },
            {
                "name": "(臺北市)統一超商：敦巨",
                "address": "臺北市松山區南京東路四段25號25之1號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區南京東路四段25號25之1號",
                "tel": "-",
                "lat": 25.0520618,
                "lng": 121.5505823
            },
            {
                "name": "(臺北市)TOYWORLD：南港環球",
                "address": "臺北市南港區忠孝東路七段371號B1A樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市南港區忠孝東路七段371號B1A樓",
                "tel": "02-7717-9255",
                "lat": 25.052946,
                "lng": 121.6071618
            },
            {
                "name": "(臺北市)玩具e哥：站前地下街",
                "address": "臺北市中正區忠孝西路一段50之1號地下街3-3B號櫃位",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區忠孝西路一段50之1號地下街3-3B號櫃位",
                "tel": "-",
                "lat": 25.046222,
                "lng": 121.51583
            },
            {
                "name": "(臺北市)正昇文具行",
                "address": "臺北市大安區羅斯福路3段277號B1",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區羅斯福路3段277號B1",
                "tel": "02-2362-3177",
                "lat": 25.0181623,
                "lng": 121.5311391
            },
            {
                "name": "(臺北市)統一超商：農安",
                "address": "臺北市中山區農安街28-1號1樓28-2號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中山區農安街28-1號1樓28-2號1樓",
                "tel": "02-25954401",
                "lat": 25.0648078,
                "lng": 121.5264024
            },
            {
                "name": "(臺北市)統一超商：金信",
                "address": "臺北市大安區金山南路二段18號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區金山南路二段18號1樓",
                "tel": "02-2321-5183",
                "lat": 25.0331884,
                "lng": 121.5269325
            },
            {
                "name": "(臺北市)玩具e哥：內湖大潤發",
                "address": "臺北市內湖區舊宗路一段188號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區舊宗路一段188號2樓",
                "tel": "-",
                "lat": 25.0629019,
                "lng": 121.5758962
            },
            {
                "name": "(臺北市)玩具e哥：天母家樂福",
                "address": "臺北市士林區德行西路47號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區德行西路47號2樓",
                "tel": "-",
                "lat": 25.105749,
                "lng": 121.52274
            },
            {
                "name": "(臺北市)統一超商：福源",
                "address": "臺北市松山區新東街60巷16號18號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區新東街60巷16號18號1樓",
                "tel": "-",
                "lat": 25.0620438,
                "lng": 121.5660849
            },
            {
                "name": "(臺北市)統一超商：天富",
                "address": "臺北市北投區富貴一路3號",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區富貴一路3號",
                "tel": "-",
                "lat": 25.1137194,
                "lng": 121.5238185
            },
            {
                "name": "(臺北市)統一超商：金湖",
                "address": "臺北市內湖區文湖街83號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區文湖街83號1樓",
                "tel": "-",
                "lat": 25.0866367,
                "lng": 121.5641951
            },
            {
                "name": "(臺北市)統一超商：彩龍",
                "address": "臺北市內湖區行善路35號1F",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區行善路35號1F",
                "tel": "-",
                "lat": 25.0568326,
                "lng": 121.5763997
            },
            {
                "name": "(臺北市)統一超商：港興",
                "address": "臺北市南港區興華路119、121、123、125號",
                "link": "http://maps.google.com.tw/maps?q=臺北市南港區興華路119、121、123、125號",
                "tel": "-",
                "lat": 25.0568937,
                "lng": 121.6058994
            },
            {
                "name": "(臺北市)統一超商：萬華",
                "address": "臺北市萬華區莒光路216號萬大路57號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區莒光路216號萬大路57號1樓",
                "tel": "-",
                "lat": 25.0313327,
                "lng": 121.5008524
            },
            {
                "name": "(臺北市)統一超商：掬華",
                "address": "臺北市中正區中華路二段407號",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區中華路二段407號",
                "tel": "-",
                "lat": 25.0260162,
                "lng": 121.5082727
            },
            {
                "name": "(臺北市)統一超商：園寶",
                "address": "臺北市萬華區西園路二段281巷29、31、33號",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區西園路二段281巷29、31、33號",
                "tel": "-",
                "lat": 25.0235543,
                "lng": 121.4928027
            },
            {
                "name": "(臺北市)玩具e哥：內湖成功店",
                "address": "臺北市內湖區成功路四段30巷28弄29號B1",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區成功路四段30巷28弄29號B1",
                "tel": "-",
                "lat": 25.0828581,
                "lng": 121.5917575
            },
            {
                "name": "(臺北市)宏鼎文具",
                "address": "臺北市大安區臥龍街151巷27號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區臥龍街151巷27號",
                "tel": "02-2736-3233",
                "lat": 25.0199662,
                "lng": 121.5523004
            },
            {
                "name": "(臺北市)玩具森林：士東路",
                "address": "臺北市士林區士東路292號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區士東路292號1樓",
                "tel": "0970-704-361",
                "lat": 25.11341,
                "lng": 121.537609
            },
            {
                "name": "(臺北市)玩具森林：中山北路",
                "address": "臺北市士林區中山北路7段24-1號地下1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區中山北路7段24-1號地下1樓",
                "tel": "0970-704-361",
                "lat": 25.1194748,
                "lng": 121.5309477
            },
            {
                "name": "(臺北市)春大地親子百貨",
                "address": "臺北市士林區通河街80號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區通河街80號1樓",
                "tel": "02-2885-8599",
                "lat": 25.0809302,
                "lng": 121.5203982
            },
            {
                "name": "(臺北市)統一超商：萬美",
                "address": "臺北市文山區萬和街6號2樓之1",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區萬和街6號2樓之1",
                "tel": "-",
                "lat": 25.001903,
                "lng": 121.5671916
            },
            {
                "name": "(臺北市)統一超商：麟光",
                "address": "臺北市大安區臥龍街252號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區臥龍街252號",
                "tel": "-",
                "lat": 25.0183404,
                "lng": 121.5570001
            },
            {
                "name": "(臺北市)可可電玩",
                "address": "臺北市大同區承德路3段42號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大同區承德路3段42號1樓",
                "tel": "0908-920-516",
                "lat": 25.0647706,
                "lng": 121.5180751
            },
            {
                "name": "(臺北市)統一超商：森美",
                "address": "臺北市大安區信義路3段65號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區信義路3段65號1樓",
                "tel": "-",
                "lat": 25.0337624,
                "lng": 121.5367651
            },
            {
                "name": "(臺北市)統一超商：建忠",
                "address": "臺北市大安區忠孝東路3段249號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區忠孝東路3段249號",
                "tel": "-",
                "lat": 25.0418168,
                "lng": 121.544007
            },
            {
                "name": "(臺北市)統一超商：統勝",
                "address": "臺北市北投區自強街82號",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區自強街82號",
                "tel": "-",
                "lat": 25.110555,
                "lng": 121.5145639
            },
            {
                "name": "(臺北市)統一超商：博美",
                "address": "臺北市中正區武昌街1段45號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區武昌街1段45號1樓",
                "tel": "-",
                "lat": 25.1485078,
                "lng": 121.7631554
            },
            {
                "name": "(臺北市)統一超商：京育",
                "address": "臺北市松山區南京東路4段66號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區南京東路4段66號",
                "tel": "-",
                "lat": 25.0541591,
                "lng": 121.5638621
            },
            {
                "name": "(臺北市)統一超商：大華",
                "address": "臺北市萬華區萬大路495號497號",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區萬大路495號497號",
                "tel": "-",
                "lat": 25.0199365,
                "lng": 121.4978107
            },
            {
                "name": "(臺北市)統一超商：漢陽",
                "address": "臺北市萬華區昆明街197號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區昆明街197號1樓",
                "tel": "-",
                "lat": 25.0390938,
                "lng": 121.5042267
            },
            {
                "name": "(臺北市)統一超商：合億",
                "address": "臺北市大安區和平東路3段51號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區和平東路3段51號1樓",
                "tel": "-",
                "lat": 24.9747451,
                "lng": 121.4427991
            },
            {
                "name": "(臺北市)愛買：忠孝店",
                "address": "臺北市信義區忠孝東路五段297號",
                "link": "http://maps.google.com.tw/maps?q=臺北市信義區忠孝東路五段297號",
                "tel": "-",
                "lat": 25.0411554,
                "lng": 121.573385
            },
            {
                "name": "(臺北市)統一超商：新劍潭",
                "address": "臺北市士林區福港街246號248號",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區福港街246號248號",
                "tel": "02-2888-2016",
                "lat": 25.0843402,
                "lng": 121.5174649
            },
            {
                "name": "(臺北市)統一超商：延平北",
                "address": "臺北市大同區延平北路1段110號112號116號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大同區延平北路1段110號112號116號1樓",
                "tel": "-",
                "lat": 25.1058398,
                "lng": 121.477736
            },
            {
                "name": "(臺北市)統一超商：麟光",
                "address": "臺北市大安區臥龍街252號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區臥龍街252號",
                "tel": "-",
                "lat": 25.0183404,
                "lng": 121.5570001
            },
            {
                "name": "(臺北市)統一超商：新劍潭",
                "address": "臺北市士林區福港街246號",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區福港街246號",
                "tel": "-",
                "lat": 25.0843402,
                "lng": 121.5174649
            },
            {
                "name": "(臺北市)金石堂：汀州店",
                "address": "臺北市中正區汀州路3段184號",
                "link": "http://maps.google.com.tw/maps?q=臺北市中正區汀州路3段184號",
                "tel": "02-2369-1245",
                "lat": 25.0129193,
                "lng": 121.5348485
            },
            {
                "name": "(臺北市)統一超商：鑫忠孝",
                "address": "臺北市大安區忠孝東路4段313號",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區忠孝東路4段313號",
                "tel": "-",
                "lat": 25.0420032,
                "lng": 121.5334554
            },
            {
                "name": "(臺北市)統一超商：木鳴",
                "address": "臺北市文山區木柵路3段115號117號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市文山區木柵路3段115號117號1樓",
                "tel": "-",
                "lat": 24.988925,
                "lng": 121.5682786
            },
            {
                "name": "(臺北市)統一超商：塔優",
                "address": "臺北市松山區撫遠街197號199號",
                "link": "http://maps.google.com.tw/maps?q=臺北市松山區撫遠街197號199號",
                "tel": "-",
                "lat": 25.0597724,
                "lng": 121.5681217
            },
            {
                "name": "(臺北市)統一超商：福陽",
                "address": "臺北市士林區延平北路5段269號271號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區延平北路5段269號271號1樓",
                "tel": "-",
                "lat": 25.085288,
                "lng": 121.5095718
            },
            {
                "name": "(臺北市)統一超商：敦南",
                "address": "臺北市大安區大安路1段83巷14號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大安區大安路1段83巷14號1樓",
                "tel": "-",
                "lat": 25.0249441,
                "lng": 121.5433783
            },
            {
                "name": "(臺北市)統一超商：仟瑞",
                "address": "臺北市大同區民生西路84號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市大同區民生西路84號1樓",
                "tel": "-",
                "lat": 25.0574614,
                "lng": 121.5202007
            },
            {
                "name": "(臺北市)統一超商：社鑫",
                "address": "臺北市士林區社子街42、44號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市士林區社子街42、44號1樓",
                "tel": "-",
                "lat": 25.0874281,
                "lng": 121.5074484
            },
            {
                "name": "(臺北市)統一超商：瑞江",
                "address": "臺北市內湖區瑞陽里江南街71巷16弄76號",
                "link": "http://maps.google.com.tw/maps?q=臺北市內湖區瑞陽里江南街71巷16弄76號",
                "tel": "-",
                "lat": 25.0762525,
                "lng": 121.5789729
            },
            {
                "name": "(臺北市)夾子園：萬華旗艦店",
                "address": "臺北市萬華區艋舺大道101號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市萬華區艋舺大道101號1樓",
                "tel": "-",
                "lat": 25.0334657,
                "lng": 121.5013897
            },
            {
                "name": "(臺北市)統一超商：榮陽",
                "address": "臺北市北投區西安街1段345號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺北市北投區西安街1段345號1樓",
                "tel": "-",
                "lat": 25.1194844,
                "lng": 121.51095
            },
            {
                "name": "(新北市)FUNBOX：中和環球",
                "address": "新北市中和區中山路三段122號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區中山路三段122號3樓",
                "tel": "02-2221-3730",
                "lat": 25.0071972,
                "lng": 121.4747649
            },
            {
                "name": "(新北市)FUNBOX：比漾廣場",
                "address": "新北市永和區中山路一段238號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市永和區中山路一段238號3樓",
                "tel": "02-82315042",
                "lat": 25.0080005,
                "lng": 121.5075816
            },
            {
                "name": "(新北市)FUNBOX：汐止遠雄",
                "address": "新北市汐止區新臺五路一段93-99號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區新臺五路一段93-99號2樓",
                "tel": "02-26907614",
                "lat": 25.0673629,
                "lng": 121.666297
            },
            {
                "name": "(新北市)FUNBOX：宏匯廣場",
                "address": "新北市新莊區新北大道四段3號5樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區新北大道四段3號5樓",
                "tel": "02-8521-5694",
                "lat": 25.0598435,
                "lng": 121.4492614
            },
            {
                "name": "(新北市)FUNBOX：美麗新淡海影城",
                "address": "新北市淡水區義山路二段303號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區義山路二段303號1樓",
                "tel": "02-2625-8780",
                "lat": 25.1990302,
                "lng": 121.4385678
            },
            {
                "name": "(新北市)FUNBOX：淡水中正",
                "address": "新北市淡水區中正路159號",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區中正路159號",
                "tel": "02-26297648",
                "lat": 25.1709102,
                "lng": 121.4388093
            },
            {
                "name": "(新北市)FUNBOX：樹林秀泰",
                "address": "新北市樹林區保安里樹新路40之6號4樓",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區保安里樹新路40之6號4樓",
                "tel": "02-26845363",
                "lat": 24.9954547,
                "lng": 121.4284421
            },
            {
                "name": "(新北市)FUNBOX：樹林家樂福",
                "address": "新北市樹林區大安路118號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區大安路118號",
                "tel": "02-2685-1505",
                "lat": 24.9973154,
                "lng": 121.4214216
            },
            {
                "name": "(新北市)FUNBOX：禮萊廣場",
                "address": "新北市淡水區中正路一段2號",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區中正路一段2號",
                "tel": "02-2623-8803",
                "lat": 25.1766032,
                "lng": 121.4297257
            },
            {
                "name": "(新北市)GSE：林口三井",
                "address": "新北市林口區文化三路一段356號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區文化三路一段356號2樓",
                "tel": "02-26092556",
                "lat": 25.0707927,
                "lng": 121.364181
            },
            {
                "name": "(新北市)TOYWORLD：中和環球",
                "address": "新北市中和區中山路三段122號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區中山路三段122號3樓",
                "tel": "02-77230228",
                "lat": 25.0071972,
                "lng": 121.4747649
            },
            {
                "name": "(新北市)TOYWORLD：板橋環球店",
                "address": "新北市板橋區縣民大道二段7號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區縣民大道二段7號2樓",
                "tel": "02-7730-3705",
                "lat": 25.0141259,
                "lng": 121.4637592
            },
            {
                "name": "(新北市)TOYWORLD：新莊佳瑪",
                "address": "新北市新莊區幸福路763號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區幸福路763號3樓",
                "tel": "02-7730-9506",
                "lat": 25.0489416,
                "lng": 121.4478527
            },
            {
                "name": "(新北市)TOYWORLD：樹林博愛店",
                "address": "新北市樹林區博愛街89號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區博愛街89號2樓",
                "tel": "02-7713-7590",
                "lat": 24.9914775,
                "lng": 121.4271601
            },
            {
                "name": "(新北市)TOYWORLD：蘆洲佳瑪",
                "address": "新北市蘆洲區長榮路8號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區長榮路8號2樓",
                "tel": "02-7746-2479",
                "lat": 25.0820952,
                "lng": 121.4639929
            },
            {
                "name": "(新北市)小獅王文具店",
                "address": "新北市新店區三民路69號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區三民路69號",
                "tel": "02-29118166",
                "lat": 24.9712073,
                "lng": 121.536283
            },
            {
                "name": "(新北市)文聖書局：林口",
                "address": "新北市林口區中正路86號",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區中正路86號",
                "tel": "02-26017645",
                "lat": 25.0774227,
                "lng": 121.3944286
            },
            {
                "name": "(新北市)文薪書城",
                "address": "新北市新莊區民安路222號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區民安路222號",
                "tel": "02-22055648",
                "lat": 25.0224624,
                "lng": 121.425942
            },
            {
                "name": "(新北市)四傑文具",
                "address": "新北市汐止區中興路131號",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區中興路131號",
                "tel": "02-26941448",
                "lat": 25.0653594,
                "lng": 121.6317162
            },
            {
                "name": "(新北市)禾麥環球（197生活館）",
                "address": "新北市土城區延和路197號",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區延和路197號",
                "tel": "02-22624529",
                "lat": 24.9902933,
                "lng": 121.4694407
            },
            {
                "name": "(新北市)好日玩具",
                "address": "新北市中和區和平街19-2號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區和平街19-2號",
                "tel": "02-29471502",
                "lat": 24.9907489,
                "lng": 121.5082722
            },
            {
                "name": "(新北市)老虎歡樂世界：新莊佳瑪",
                "address": "新北市新莊區幸福路763號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區幸福路763號3樓",
                "tel": "-",
                "lat": 25.0489416,
                "lng": 121.4478527
            },
            {
                "name": "(新北市)老虎歡樂世界：蘆洲佳瑪",
                "address": "新北市蘆洲區長榮路8號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區長榮路8號3樓",
                "tel": "-",
                "lat": 25.0820952,
                "lng": 121.4639929
            },
            {
                "name": "(新北市)亞利文具行",
                "address": "新北市三重區三民街175巷28號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區三民街175巷28號1樓",
                "tel": "02-29896819",
                "lat": 25.0659902,
                "lng": 121.4840371
            },
            {
                "name": "(新北市)玩具e哥：土城日月光店",
                "address": "新北市土城區中央路二段61巷11號",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區中央路二段61巷11號",
                "tel": "02-77289047",
                "lat": 24.9788679,
                "lng": 121.4434197
            },
            {
                "name": "(新北市)玩具e哥：中和威力店",
                "address": "新北市中和區中山路二段291號6樓602櫃",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區中山路二段291號6樓602櫃",
                "tel": "02-7709-8930",
                "lat": 25.001918,
                "lng": 121.4958555
            },
            {
                "name": "(新北市)玩具e哥：板橋新埔店",
                "address": "新北市板橋區文化路一段360號B1",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區文化路一段360號B1",
                "tel": "02-77298565",
                "lat": 25.0235749,
                "lng": 121.4687561
            },
            {
                "name": "(新北市)金玉堂：大觀店",
                "address": "新北市板橋區大觀路三段236號B1",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區大觀路三段236號B1",
                "tel": "02-26821355",
                "lat": 24.9922026,
                "lng": 121.4296291
            },
            {
                "name": "(新北市)金玉堂：鶯歌店",
                "address": "新北市鶯歌區建國路152號",
                "link": "http://maps.google.com.tw/maps?q=新北市鶯歌區建國路152號",
                "tel": "02-26701152",
                "lat": 24.9538893,
                "lng": 121.3509399
            },
            {
                "name": "(新北市)春大地",
                "address": "新北市蘆洲區中正路117號",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區中正路117號",
                "tel": "02-22819327",
                "lat": 25.0842428,
                "lng": 121.4696051
            },
            {
                "name": "(新北市)家樂福：汐科店",
                "address": "新北市汐止區新臺五路一段99號",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區新臺五路一段99號",
                "tel": "-",
                "lat": 25.0673629,
                "lng": 121.666297
            },
            {
                "name": "(新北市)家樂福：樹林店",
                "address": "新北市樹林區大安路118號2F",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區大安路118號2F",
                "tel": "-",
                "lat": 24.9973154,
                "lng": 121.4214216
            },
            {
                "name": "(新北市)家樂福：蘆洲店",
                "address": "新北市三重區五華街282號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區五華街282號",
                "tel": "-",
                "lat": 25.0879589,
                "lng": 121.4864991
            },
            {
                "name": "(新北市)康郁商行",
                "address": "新北市三重區中正北路25巷17號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區中正北路25巷17號1樓",
                "tel": "02-29877373",
                "lat": 25.0623784,
                "lng": 121.49304
            },
            {
                "name": "(新北市)統一超商：二十張",
                "address": "新北市新店區二十張路5號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區二十張路5號1樓",
                "tel": "-",
                "lat": 24.982649,
                "lng": 121.5400799
            },
            {
                "name": "(新北市)統一超商：下竹圍",
                "address": "新北市三重區下竹圍街26號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區下竹圍街26號",
                "tel": "-",
                "lat": 25.0755273,
                "lng": 121.4809643
            },
            {
                "name": "(新北市)統一超商：正鵬",
                "address": "新北市新店區中正路688.690號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區中正路688.690號",
                "tel": "-",
                "lat": 24.9804223,
                "lng": 121.5338754
            },
            {
                "name": "(新北市)統一超商：安峰",
                "address": "新北市新店區安康路2段350-3號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區安康路2段350-3號",
                "tel": "-",
                "lat": 24.9577564,
                "lng": 121.5030978
            },
            {
                "name": "(新北市)統一超商：安康",
                "address": "新北市新店區安德街70.72號1+2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區安德街70.72號1+2樓",
                "tel": "-",
                "lat": 24.9614874,
                "lng": 121.5100829
            },
            {
                "name": "(新北市)統一超商：岩昇",
                "address": "新北市三峽區溪東路300號",
                "link": "http://maps.google.com.tw/maps?q=新北市三峽區溪東路300號",
                "tel": "-",
                "lat": 24.9306011,
                "lng": 121.4098846
            },
            {
                "name": "(新北市)統一超商：承天",
                "address": "新北市土城區承天路1號",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區承天路1號",
                "tel": "-",
                "lat": 24.9663515,
                "lng": 121.4359534
            },
            {
                "name": "(新北市)統一超商：金園",
                "address": "新北市板橋區金門街175號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區金門街175號",
                "tel": "-",
                "lat": 24.9901988,
                "lng": 121.432659
            },
            {
                "name": "(新北市)統一超商：信利",
                "address": "新北市土城區興城路96巷4號",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區興城路96巷4號",
                "tel": "-",
                "lat": 24.9718747,
                "lng": 121.4402838
            },
            {
                "name": "(新北市)統一超商：冠德",
                "address": "新北市中和區景平路71-5號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區景平路71-5號",
                "tel": "-",
                "lat": 24.9914237,
                "lng": 121.518919
            },
            {
                "name": "(新北市)統一超商：英專",
                "address": "新北市淡水區英專路93號",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區英專路93號",
                "tel": "-",
                "lat": 25.17188,
                "lng": 121.445686
            },
            {
                "name": "(新北市)統一超商：重樂",
                "address": "新北市三重區三信路196號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區三信路196號",
                "tel": "-",
                "lat": 25.0854362,
                "lng": 121.4870521
            },
            {
                "name": "(新北市)統一超商：統和",
                "address": "新北市新店區安民街335.337號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區安民街335.337號1樓",
                "tel": "-",
                "lat": 24.9697877,
                "lng": 121.5166144
            },
            {
                "name": "(新北市)統一超商：莊泰",
                "address": "新北市新莊區新泰路21號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區新泰路21號",
                "tel": "-",
                "lat": 25.0327218,
                "lng": 121.4495947
            },
            {
                "name": "(新北市)統一超商：莊勝",
                "address": "新北市新莊區八德街59號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區八德街59號",
                "tel": "-",
                "lat": 25.0222237,
                "lng": 121.4248999
            },
            {
                "name": "(新北市)統一超商：景鑫",
                "address": "新北市中和區中正路683號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區中正路683號",
                "tel": "-",
                "lat": 24.997907,
                "lng": 121.4849942
            },
            {
                "name": "(新北市)統一超商：港義",
                "address": "新北市新莊區中港路527號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區中港路527號",
                "tel": "-",
                "lat": 25.0513159,
                "lng": 121.4517053
            },
            {
                "name": "(新北市)統一超商：新林口",
                "address": "新北市林口區中正路90號92號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區中正路90號92號1樓",
                "tel": "-",
                "lat": 25.0774118,
                "lng": 121.3943714
            },
            {
                "name": "(新北市)統一超商：瑞信",
                "address": "新北市瑞芳區民生街23號",
                "link": "http://maps.google.com.tw/maps?q=新北市瑞芳區民生街23號",
                "tel": "-",
                "lat": 25.107419,
                "lng": 121.8059486
            },
            {
                "name": "(新北市)統一超商：漢東",
                "address": "新北市板橋區漢生東路309號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區漢生東路309號",
                "tel": "-",
                "lat": 25.0082403,
                "lng": 121.4718355
            },
            {
                "name": "(新北市)統一超商：德旺",
                "address": "新北市中和區壽德街22號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區壽德街22號",
                "tel": "-",
                "lat": 24.9944829,
                "lng": 121.4662835
            },
            {
                "name": "(新北市)統一超商：樹龍",
                "address": "新北市樹林區中正路222號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區中正路222號",
                "tel": "-",
                "lat": 25.0065795,
                "lng": 121.4191592
            },
            {
                "name": "(新北市)統一超商：環冠",
                "address": "新北市中和區中山路三段118之6之7之8號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區中山路三段118之6之7之8號",
                "tel": "-",
                "lat": 25.0096388,
                "lng": 121.4751528
            },
            {
                "name": "(新北市)統一超商：鎮鑫",
                "address": "新北市新店區中興路1段289號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區中興路1段289號",
                "tel": "-",
                "lat": 25.065071,
                "lng": 121.632343
            },
            {
                "name": "(新北市)統一超商：懷翠",
                "address": "新北市板橋區懷德街203.205號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區懷德街203.205號",
                "tel": "-",
                "lat": 25.0312943,
                "lng": 121.4785568
            },
            {
                "name": "(新北市)統一超商：蘆興",
                "address": "新北市蘆洲區長樂路2之6號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區長樂路2之6號1樓",
                "tel": "-",
                "lat": 25.083999,
                "lng": 121.4647576
            },
            {
                "name": "(新北市)微學館：樹林店",
                "address": "新北市樹林區中山路一段48號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區中山路一段48號",
                "tel": "02-26841699",
                "lat": 24.9922544,
                "lng": 121.4237543
            },
            {
                "name": "(新北市)愛買：三重店",
                "address": "新北市三重區中正北路193巷45號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區中正北路193巷45號",
                "tel": "-",
                "lat": 25.0713682,
                "lng": 121.4760132
            },
            {
                "name": "(新北市)愛買：永和店",
                "address": "新北市永和區民生路46巷56號",
                "link": "http://maps.google.com.tw/maps?q=新北市永和區民生路46巷56號",
                "tel": "-",
                "lat": 24.9967195,
                "lng": 121.5223911
            },
            {
                "name": "(新北市)愛買：南雅店",
                "address": "新北市板橋區貴興路101號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區貴興路101號",
                "tel": "-",
                "lat": 25.0017697,
                "lng": 121.4569554
            },
            {
                "name": "(新北市)鼎美玩具：板橋遠東",
                "address": "新北市板橋區中山路一段152號8樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區中山路一段152號8樓",
                "tel": "02-77230560",
                "lat": 25.0109685,
                "lng": 121.4644242
            },
            {
                "name": "(新北市)TOYWORLD：林口三井",
                "address": "新北市林口區文化三路一段356號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區文化三路一段356號2樓",
                "tel": "02-77099920",
                "lat": 25.0707927,
                "lng": 121.364181
            },
            {
                "name": "(新北市)龍天地文具批發廣場",
                "address": "新北市蘆洲區中原路13號",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區中原路13號",
                "tel": "02-8285-2030",
                "lat": 25.0830017,
                "lng": 121.4608792
            },
            {
                "name": "(新北市)薪友文具行",
                "address": "新北市蘆洲區民族路26號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區民族路26號1樓",
                "tel": "02-22837557",
                "lat": 25.0840844,
                "lng": 121.4762664
            },
            {
                "name": "(新北市)FUNBOX：板橋大遠百",
                "address": "新北市板橋區新站路28號5樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區新站路28號5樓",
                "tel": "02-29513309",
                "lat": 25.0136294,
                "lng": 121.4668636
            },
            {
                "name": "(新北市)老虎歡樂世界：碧潭廣場",
                "address": "新北市新店區北宜路一段16號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區北宜路一段16號2樓",
                "tel": "-",
                "lat": 24.9576128,
                "lng": 121.5380191
            },
            {
                "name": "(新北市)統一超商：貝比",
                "address": "新北市林口區湖南村8鄰頭湖70-9號",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區湖南村8鄰頭湖70-9號",
                "tel": "-",
                "lat": 25.085012,
                "lng": 121.377891
            },
            {
                "name": "(新北市)統一超商：武聖廟",
                "address": "新北市新莊區新莊路437號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區新莊路437號1樓",
                "tel": "-",
                "lat": 25.033283,
                "lng": 121.450096
            },
            {
                "name": "(新北市)統一超商：園和",
                "address": "新北市永和區仁愛路267號",
                "link": "http://maps.google.com.tw/maps?q=新北市永和區仁愛路267號",
                "tel": "-",
                "lat": 25.0097769,
                "lng": 121.5062929
            },
            {
                "name": "(新北市)統一超商：樂林",
                "address": "新北市三重區永安北路二段15號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區永安北路二段15號",
                "tel": "-",
                "lat": 25.0814889,
                "lng": 121.482193
            },
            {
                "name": "(新北市)老虎歡樂世界：樹林店",
                "address": "新北市樹林區博愛街89號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區博愛街89號2樓",
                "tel": "-",
                "lat": 24.9914775,
                "lng": 121.4271601
            },
            {
                "name": "(新北市)TOYWORLD：新店碧潭",
                "address": "新北市新店區北宜路一段16號2樓L2-008櫃",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區北宜路一段16號2樓L2-008櫃",
                "tel": "02-7730-0990",
                "lat": 24.9574457,
                "lng": 121.5379428
            },
            {
                "name": "(新北市)其曜玩具：美麗新淡海影城",
                "address": "新北市淡水區義山路二段303號B棟1樓(toypark)",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區義山路二段303號B棟1樓(toypark)",
                "tel": "02-26290319",
                "lat": 25.1992744,
                "lng": 121.4390084
            },
            {
                "name": "(新北市)統一超商：永藝",
                "address": "新北市永和區永和路二段272號274號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市永和區永和路二段272號274號1樓",
                "tel": "02-89256339",
                "lat": 25.0152333,
                "lng": 121.5161343
            },
            {
                "name": "(新北市)統一超商：西雅圖",
                "address": "新北市八里區中山路二段151號153號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市八里區中山路二段151號153號1樓",
                "tel": "02-86305421",
                "lat": 25.1509837,
                "lng": 121.4051706
            },
            {
                "name": "(新北市)統一超商：皇翔",
                "address": "新北市土城區中央路一段88號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區中央路一段88號1樓",
                "tel": "02-22645433",
                "lat": 24.9889243,
                "lng": 121.4469333
            },
            {
                "name": "(新北市)統一超商：新順安",
                "address": "新北市新店區順安街51.53號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區順安街51.53號",
                "tel": "-",
                "lat": 24.9864385,
                "lng": 121.540839
            },
            {
                "name": "(新北市)統一超商：光華",
                "address": "新北市新莊區民安西路390號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區民安西路390號",
                "tel": "-",
                "lat": 25.0103979,
                "lng": 121.4282145
            },
            {
                "name": "(新北市)老虎歡樂世界：三重佳瑪",
                "address": "新北市三重區自強路一段73號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區自強路一段73號2樓",
                "tel": "-",
                "lat": 25.0669185,
                "lng": 121.4971683
            },
            {
                "name": "(新北市)統一超商：福勝",
                "address": "新北市中和區福祥路156、158號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區福祥路156、158號",
                "tel": "-",
                "lat": 25.0075201,
                "lng": 121.4986693
            },
            {
                "name": "(新北市)統一超商：福和",
                "address": "新北市中和區大勇街25巷1號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區大勇街25巷1號",
                "tel": "-",
                "lat": 24.9931753,
                "lng": 121.517146
            },
            {
                "name": "(新北市)統一超商：武林",
                "address": "新北市樹林區光華街2、4號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區光華街2、4號",
                "tel": "-",
                "lat": 25.0037645,
                "lng": 121.4134478
            },
            {
                "name": "(新北市)玩具e哥：新莊昌隆店",
                "address": "新北市新莊區昌隆街83號",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區昌隆街83號",
                "tel": "-",
                "lat": 25.0515213,
                "lng": 121.4571786
            },
            {
                "name": "(新北市)玩具e哥：家福重新店",
                "address": "新北市三重區重新路五段654號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區重新路五段654號1樓",
                "tel": "02-7716-3755",
                "lat": 25.0432546,
                "lng": 121.4675576
            },
            {
                "name": "(新北市)統一超商：興板",
                "address": "新北市板橋區德興街20、22、24號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區德興街20、22、24號",
                "tel": "-",
                "lat": 24.9942957,
                "lng": 121.4533395
            },
            {
                "name": "(新北市)統一超商：三好",
                "address": "新北市三重區自強路四段102號104號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區自強路四段102號104號1樓",
                "tel": "-",
                "lat": 25.0798566,
                "lng": 121.4912435
            },
            {
                "name": "(新北市)統一超商：遠來",
                "address": "新北市林口區仁愛路二段510號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區仁愛路二段510號1樓",
                "tel": "-",
                "lat": 25.0774473,
                "lng": 121.3740788
            },
            {
                "name": "(新北市)老虎歡樂世界：新店店",
                "address": "新北市新店區建國路268號3樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區建國路268號3樓",
                "tel": "-",
                "lat": 24.983287,
                "lng": 121.5376693
            },
            {
                "name": "(新北市)統一超商：富鄰",
                "address": "新北市汐止區宜興街8號",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區宜興街8號",
                "tel": "-",
                "lat": 25.0413861,
                "lng": 121.6211674
            },
            {
                "name": "(新北市)TOYWORLD：三重佳瑪",
                "address": "新北市三重區自強路一段73號2樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區自強路一段73號2樓",
                "tel": "02 7709 4050",
                "lat": 25.0669185,
                "lng": 121.4971683
            },
            {
                "name": "(新北市)統一超商：湖鑫",
                "address": "新北市汐止區湖前街37.39號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區湖前街37.39號1樓",
                "tel": "-",
                "lat": 25.0737172,
                "lng": 121.6311439
            },
            {
                "name": "(新北市)統一超商：吉翠",
                "address": "新北市板橋區裕民街53、55號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區裕民街53、55號",
                "tel": "-",
                "lat": 25.0283756,
                "lng": 121.4610377
            },
            {
                "name": "(新北市)玩具e哥：三重介壽店",
                "address": "新北市三重區龍門路6-1號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區龍門路6-1號1樓",
                "tel": "02-7753-3350",
                "lat": 25.0713682,
                "lng": 121.4947081
            },
            {
                "name": "(新北市)玩巨帝國：樹林店",
                "address": "新北市樹林區八德街321號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區八德街321號",
                "tel": "02-8686-3036",
                "lat": 24.9760415,
                "lng": 121.4212579
            },
            {
                "name": "(新北市)玩具超人",
                "address": "新北市永和區永利路132號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市永和區永利路132號1樓",
                "tel": "02-8660-1653",
                "lat": 25.002928,
                "lng": 121.52174
            },
            {
                "name": "(新北市)統一超商：三田",
                "address": "新北市三重區福田里三民街274號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區福田里三民街274號1樓",
                "tel": "-",
                "lat": 25.0681455,
                "lng": 121.4787669
            },
            {
                "name": "(新北市)統一超商：元坊",
                "address": "新北市深坑區北深路三段145號",
                "link": "http://maps.google.com.tw/maps?q=新北市深坑區北深路三段145號",
                "tel": "-",
                "lat": 25.0027725,
                "lng": 121.6034021
            },
            {
                "name": "(新北市)統一超商：未央",
                "address": "新北市林口區文化三路二段283號",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區文化三路二段283號",
                "tel": "-",
                "lat": 25.0862828,
                "lng": 121.3785852
            },
            {
                "name": "(新北市)統一超商：旭泰",
                "address": "新北市汐止區建成路57巷1號3號",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區建成路57巷1號3號",
                "tel": "-",
                "lat": 25.0725779,
                "lng": 121.6622587
            },
            {
                "name": "(新北市)統一超商：利穗",
                "address": "新北市中和區民利街38號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區民利街38號1樓",
                "tel": "-",
                "lat": 24.9990184,
                "lng": 121.4796631
            },
            {
                "name": "(新北市)統一超商：佳政",
                "address": "新北市樹林區中山路三段209-1號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區中山路三段209-1號",
                "tel": "-",
                "lat": 24.9722968,
                "lng": 121.3939155
            },
            {
                "name": "(新北市)統一超商：玫瑰",
                "address": "新北市新店區玫瑰路58巷4號B1",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區玫瑰路58巷4號B1",
                "tel": "-",
                "lat": 24.94671,
                "lng": 121.4952343
            },
            {
                "name": "(新北市)統一超商：美河",
                "address": "新北市新店區三民路35巷2號",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區三民路35巷2號",
                "tel": "-",
                "lat": 24.9706975,
                "lng": 121.5373318
            },
            {
                "name": "(新北市)統一超商：埔站",
                "address": "新北市板橋區民生路二段237號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區民生路二段237號1樓",
                "tel": "-",
                "lat": 25.0215299,
                "lng": 121.468395
            },
            {
                "name": "(新北市)統一超商：陽州",
                "address": "新北市蘆洲區重陽街92號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市蘆洲區重陽街92號1樓",
                "tel": "-",
                "lat": 25.084676,
                "lng": 121.4821346
            },
            {
                "name": "(新北市)統一超商：圓通",
                "address": "新北市中和區圓通路280號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區圓通路280號",
                "tel": "-",
                "lat": 24.9907669,
                "lng": 121.4916022
            },
            {
                "name": "(新北市)統一超商：新春",
                "address": "新北市淡水區新春街142號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市淡水區新春街142號1樓",
                "tel": "-",
                "lat": 25.1815371,
                "lng": 121.4419302
            },
            {
                "name": "(新北市)統一超商：萬誠",
                "address": "新北市三峽區民生街25號",
                "link": "http://maps.google.com.tw/maps?q=新北市三峽區民生街25號",
                "tel": "-",
                "lat": 24.9364879,
                "lng": 121.376017
            },
            {
                "name": "(新北市)統一超商：榮曜",
                "address": "新北市林口區文化三路二段156號",
                "link": "http://maps.google.com.tw/maps?q=新北市林口區文化三路二段156號",
                "tel": "-",
                "lat": 25.0815749,
                "lng": 121.375578
            },
            {
                "name": "(新北市)統一超商：福美",
                "address": "新北市中和區景平路756號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區景平路756號",
                "tel": "-",
                "lat": 25.004782,
                "lng": 121.4964256
            },
            {
                "name": "(新北市)統一超商：福興",
                "address": "新北市泰山區全興路165號",
                "link": "http://maps.google.com.tw/maps?q=新北市泰山區全興路165號",
                "tel": "-",
                "lat": 25.0560566,
                "lng": 121.4341674
            },
            {
                "name": "(新北市)統一超商：福濱",
                "address": "新北市三重區龍濱路51號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區龍濱路51號1樓",
                "tel": "-",
                "lat": 25.0687789,
                "lng": 121.5027611
            },
            {
                "name": "(新北市)統一超商：戰國",
                "address": "新北市板橋區永豐街173號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區永豐街173號",
                "tel": "-",
                "lat": 25.0206265,
                "lng": 121.4757682
            },
            {
                "name": "(新北市)統一超商：樹溪",
                "address": "新北市板橋區溪北路43號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區溪北路43號1樓",
                "tel": "-",
                "lat": 24.9901451,
                "lng": 121.4275019
            },
            {
                "name": "(新北市)統一超商：樹躍",
                "address": "新北市樹林區中正路438號",
                "link": "http://maps.google.com.tw/maps?q=新北市樹林區中正路438號",
                "tel": "-",
                "lat": 25.0118167,
                "lng": 121.4135726
            },
            {
                "name": "(新北市)統一超商：鑫庫",
                "address": "新北市中和區福祥路68號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區福祥路68號",
                "tel": "-",
                "lat": 25.0052964,
                "lng": 121.4993827
            },
            {
                "name": "(新北市)統一超商：迴龍站",
                "address": "新北市新莊區中正路895號895號之1",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區中正路895號895號之1",
                "tel": "-",
                "lat": 25.0216006,
                "lng": 121.4120323
            },
            {
                "name": "(新北市)玩具e哥：土城立德",
                "address": "新北市土城區立德路105號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區立德路105號1樓",
                "tel": "02 7727 5017",
                "lat": 24.9875229,
                "lng": 121.46385
            },
            {
                "name": "(新北市)統一超商：百豐",
                "address": "新北市新店區安康路1段168號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區安康路1段168號1樓",
                "tel": "-",
                "lat": 24.9632259,
                "lng": 121.514228
            },
            {
                "name": "(新北市)統一超商：埔西",
                "address": "新北市板橋區文化路一段393號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區文化路一段393號",
                "tel": "-",
                "lat": 25.02201,
                "lng": 121.467078
            },
            {
                "name": "(新北市)統一超商：百豐",
                "address": "新北市新店區安康路1段168號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區安康路1段168號1樓",
                "tel": "02-8666-9386",
                "lat": 24.9632259,
                "lng": 121.514228
            },
            {
                "name": "(新北市)統一超商：立福",
                "address": "新北市三重區力行路1段60之1號60之2號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區力行路1段60之1號60之2號1樓",
                "tel": "-",
                "lat": 25.0706345,
                "lng": 121.4827185
            },
            {
                "name": "(新北市)統一超商：華雅",
                "address": "新北市板橋區華東街270號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區華東街270號1樓",
                "tel": "-",
                "lat": 25.0018188,
                "lng": 121.4532061
            },
            {
                "name": "(新北市)統一超商：華翠",
                "address": "新北市板橋區莒光路63號",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區莒光路63號",
                "tel": "-",
                "lat": 25.0242898,
                "lng": 121.4713595
            },
            {
                "name": "(新北市)統一超商：雙福",
                "address": "新北市三重區雙園街57巷2、4號",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區雙園街57巷2、4號",
                "tel": "-",
                "lat": 25.0675841,
                "lng": 121.4948079
            },
            {
                "name": "(新北市)統一超商：展龍",
                "address": "新北市土城區學府路2段265號、學海街307號",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區學府路2段265號、學海街307號",
                "tel": "-",
                "lat": 24.9785549,
                "lng": 121.4471784
            },
            {
                "name": "(新北市)統一超商：青新",
                "address": "新北市新店區中山路137號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新店區中山路137號1樓",
                "tel": "-",
                "lat": 24.9812007,
                "lng": 121.5264794
            },
            {
                "name": "(新北市)蝦皮店到店：土城裕生店",
                "address": "新北市土城區裕生路28號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區裕生路28號1樓",
                "tel": "-",
                "lat": 24.9872853,
                "lng": 121.447905
            },
            {
                "name": "(新北市)蝦皮店到店：新莊中誠店",
                "address": "新北市新莊區中誠街78號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市新莊區中誠街78號1樓",
                "tel": "-",
                "lat": 25.0480099,
                "lng": 121.450416
            },
            {
                "name": "(新北市)統一超商：民華",
                "address": "新北市中和區民德路270、272號",
                "link": "http://maps.google.com.tw/maps?q=新北市中和區民德路270、272號",
                "tel": "-",
                "lat": 24.996631,
                "lng": 121.4677595
            },
            {
                "name": "(新北市)統一超商：興園",
                "address": "新北市三重區重陽路1段132號134號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市三重區重陽路1段132號134號1樓",
                "tel": "-",
                "lat": 25.0614534,
                "lng": 121.4867114
            },
            {
                "name": "(新北市)統一超商：楓橘",
                "address": "新北市土城區峯廷街3號、5號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市土城區峯廷街3號、5號1樓",
                "tel": "-",
                "lat": 24.987244,
                "lng": 121.469072
            },
            {
                "name": "(新北市)統一超商：長虹",
                "address": "新北市鶯歌區鶯桃路432號",
                "link": "http://maps.google.com.tw/maps?q=新北市鶯歌區鶯桃路432號",
                "tel": "-",
                "lat": 24.964655,
                "lng": 121.333196
            },
            {
                "name": "(新北市)統一超商：貴志",
                "address": "新北市泰山區貴子路13.13-1號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市泰山區貴子路13.13-1號1樓",
                "tel": "-",
                "lat": 25.0407388,
                "lng": 121.4281342
            },
            {
                "name": "(新北市)統一超商：秋雅",
                "address": "新北市板橋區南雅南路2段144巷14號1樓",
                "link": "http://maps.google.com.tw/maps?q=新北市板橋區南雅南路2段144巷14號1樓",
                "tel": "-",
                "lat": 24.9958568,
                "lng": 121.4507735
            },
            {
                "name": "(新北市)夾子園：汐止旗艦店",
                "address": "新北市汐止區大同路一段122號",
                "link": "http://maps.google.com.tw/maps?q=新北市汐止區大同路一段122號",
                "tel": "-",
                "lat": 25.0544561,
                "lng": 121.6310729
            },
            {
                "name": "(基隆市)全家樂玩具店",
                "address": "基隆市中正區義二路12號",
                "link": "http://maps.google.com.tw/maps?q=基隆市中正區義二路12號",
                "tel": "02-24247987",
                "lat": 25.130787,
                "lng": 121.7450592
            },
            {
                "name": "(基隆市)老虎歡樂世界：基隆愛買",
                "address": "基隆市信義區深溪路53號B1",
                "link": "http://maps.google.com.tw/maps?q=基隆市信義區深溪路53號B1",
                "tel": "-",
                "lat": 25.1330542,
                "lng": 121.7822013
            },
            {
                "name": "(基隆市)統一超商：新福樂",
                "address": "基隆市信義區深溪路43號45號1樓",
                "link": "http://maps.google.com.tw/maps?q=基隆市信義區深溪路43號45號1樓",
                "tel": "-",
                "lat": 25.1321057,
                "lng": 121.782009
            },
            {
                "name": "(基隆市)統一超商：樂添",
                "address": "基隆市安樂區樂利二街62巷291號",
                "link": "http://maps.google.com.tw/maps?q=基隆市安樂區樂利二街62巷291號",
                "tel": "-",
                "lat": 25.1214445,
                "lng": 121.7149383
            },
            {
                "name": "(基隆市)統一超商：愛六",
                "address": "基隆市仁愛區仁一路281號1樓",
                "link": "http://maps.google.com.tw/maps?q=基隆市仁愛區仁一路281號1樓",
                "tel": "-",
                "lat": 25.128421,
                "lng": 121.7472758
            },
            {
                "name": "(基隆市)統一超商：新和慶",
                "address": "基隆市安樂區中和路166之5號",
                "link": "http://maps.google.com.tw/maps?q=基隆市安樂區中和路166之5號",
                "tel": "-",
                "lat": 25.1474144,
                "lng": 121.7024448
            },
            {
                "name": "(桃園市)FUNBOX：大江",
                "address": "桃園市中壢區中園路二段501號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中園路二段501號2樓",
                "tel": "03-4680277",
                "lat": 25.0015283,
                "lng": 121.2284747
            },
            {
                "name": "(桃園市)FUNBOX：桃園站前新光",
                "address": "桃園市桃園區中正路19號8樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區中正路19號8樓",
                "tel": "03-3379373",
                "lat": 24.9900164,
                "lng": 121.3126097
            },
            {
                "name": "(桃園市)FUNBOX：桃園遠東",
                "address": "桃園市桃園區中正路20號6樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區中正路20號6樓",
                "tel": "03-3346405",
                "lat": 24.9897388,
                "lng": 121.3137948
            },
            {
                "name": "(桃園市)FUNBOX：華泰名品城",
                "address": "桃園市中壢區春德路189號1樓(140櫃位）",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區春德路189號1樓(140櫃位）",
                "tel": "03-2870863",
                "lat": 25.017219,
                "lng": 121.2123543
            },
            {
                "name": "(桃園市)GSE：大江店",
                "address": "桃園市中壢區中園路二段501號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中園路二段501號4樓",
                "tel": "03-4680118",
                "lat": 25.0015283,
                "lng": 121.2284747
            },
            {
                "name": "(桃園市)TOYWORLD：大江店",
                "address": "桃園市中壢區中園路二段501號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中園路二段501號4樓",
                "tel": "03-2711396",
                "lat": 25.0015283,
                "lng": 121.2284747
            },
            {
                "name": "(桃園市)TOYWORLD：中壢中正店",
                "address": "桃園市中壢區中正路51號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中正路51號4樓",
                "tel": "03- 271-5080",
                "lat": 24.9541156,
                "lng": 121.2240366
            },
            {
                "name": "(桃園市)TOYWORLD：桃園台茂",
                "address": "桃園市蘆竹區南崁路一段112號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區南崁路一段112號4樓",
                "tel": "03-2711393",
                "lat": 25.05366,
                "lng": 121.288565
            },
            {
                "name": "(桃園市)TOYWORLD：桃園春日",
                "address": "桃園市桃園區春日路618-1號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區春日路618-1號B1",
                "tel": "03-271-4090",
                "lat": 25.0086864,
                "lng": 121.3116067
            },
            {
                "name": "(桃園市)TOYWORLD：楊梅大成店",
                "address": "桃園市楊梅區大成路99號3樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區大成路99號3樓",
                "tel": "03-271-4330",
                "lat": 24.9102184,
                "lng": 121.1455553
            },
            {
                "name": "(桃園市)TOYWORLD：龍潭佳瑪",
                "address": "桃園市龍潭區中正路106號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龍潭區中正路106號2樓",
                "tel": "03-271-4311",
                "lat": 24.8674737,
                "lng": 121.2157618
            },
            {
                "name": "(桃園市)一刻館",
                "address": "桃園市桃園區中華路43號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區中華路43號2樓",
                "tel": "0937-370484",
                "lat": 24.9908151,
                "lng": 121.3108949
            },
            {
                "name": "(桃園市)老虎歡樂世界：南崁店",
                "address": "桃園市蘆竹區南山路一段2-5號",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區南山路一段2-5號",
                "tel": "-",
                "lat": 25.0497441,
                "lng": 121.2920062
            },
            {
                "name": "(桃園市)老虎歡樂世界：楊梅佳瑪",
                "address": "桃園市楊梅區大成路99號3樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區大成路99號3樓",
                "tel": "-",
                "lat": 24.9102184,
                "lng": 121.1455553
            },
            {
                "name": "(桃園市)老虎歡樂世界：龍潭佳瑪",
                "address": "桃園市龍潭區中正路106號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龍潭區中正路106號2樓",
                "tel": "-",
                "lat": 24.8674737,
                "lng": 121.2157618
            },
            {
                "name": "(桃園市)玩具e哥：桃園中原店",
                "address": "桃園市中壢區實踐路81號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區實踐路81號",
                "tel": "03-2706695",
                "lat": 24.9545573,
                "lng": 121.2414583
            },
            {
                "name": "(桃園市)玩具e哥：桃園南山店",
                "address": "桃園市蘆竹區南山路一段2-5號",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區南山路一段2-5號",
                "tel": "03- 271-4220",
                "lat": 25.0497441,
                "lng": 121.2920062
            },
            {
                "name": "(桃園市)玩具e哥：桃園南崁",
                "address": "桃園市蘆竹區中正路1號5樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區中正路1號5樓",
                "tel": "03-271-6400",
                "lat": 25.0401823,
                "lng": 121.2947327
            },
            {
                "name": "(桃園市)玩具反斗城：中壢家樂福",
                "address": "桃園市中壢區中華路二段501號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中華路二段501號2樓",
                "tel": "03-4553033",
                "lat": 24.9624549,
                "lng": 121.2322687
            },
            {
                "name": "(桃園市)金玉堂：龜山店",
                "address": "桃園市龜山區新興里自強南路75號及77號",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區新興里自強南路75號及77號",
                "tel": "03-349-2069",
                "lat": 24.9926777,
                "lng": 121.339219
            },
            {
                "name": "(桃園市)家樂福：八德店",
                "address": "桃園市八德區介壽路一段728號",
                "link": "http://maps.google.com.tw/maps?q=桃園市八德區介壽路一段728號",
                "tel": "-",
                "lat": 24.9650188,
                "lng": 121.298757
            },
            {
                "name": "(桃園市)家樂福：中壢店",
                "address": "桃園市中壢區中山東路二段510號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中山東路二段510號",
                "tel": "-",
                "lat": 24.9474134,
                "lng": 121.2448862
            },
            {
                "name": "(桃園市)家樂福：內壢店",
                "address": "桃園市中壢區中華路一段450號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中華路一段450號",
                "tel": "-",
                "lat": 24.9731158,
                "lng": 121.2535158
            },
            {
                "name": "(桃園市)家樂福：經國店",
                "address": "桃園市桃園區經國路369號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區經國路369號B1",
                "tel": "-",
                "lat": 25.015995,
                "lng": 121.3049808
            },
            {
                "name": "(桃園市)其曜玩具：中壢SOGO",
                "address": "桃園市中壢區元化路357號8樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區元化路357號8樓",
                "tel": "03-4270587",
                "lat": 24.9626852,
                "lng": 121.2238578
            },
            {
                "name": "(桃園市)統一超商：成龍",
                "address": "桃園市中壢區龍岡路三段192號194號196號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區龍岡路三段192號194號196號1樓",
                "tel": "-",
                "lat": 24.9354194,
                "lng": 121.2340135
            },
            {
                "name": "(桃園市)統一超商：忠湖",
                "address": "桃園市龜山區忠義路二段630號",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區忠義路二段630號",
                "tel": "-",
                "lat": 25.056332,
                "lng": 121.3576971
            },
            {
                "name": "(桃園市)統一超商：青禾",
                "address": "桃園市中壢區高鐵站前西路二段96號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區高鐵站前西路二段96號1樓",
                "tel": "-",
                "lat": 25.0072414,
                "lng": 121.2196502
            },
            {
                "name": "(桃園市)統一超商：亮亞",
                "address": "桃園市蘆竹區大福路189號",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區大福路189號",
                "tel": "-",
                "lat": 25.0208155,
                "lng": 121.2577449
            },
            {
                "name": "(桃園市)統一超商：勇伯",
                "address": "桃園市八德區東勇北路380號",
                "link": "http://maps.google.com.tw/maps?q=桃園市八德區東勇北路380號",
                "tel": "-",
                "lat": 24.9695128,
                "lng": 121.3065909
            },
            {
                "name": "(桃園市)統一超商：高尚",
                "address": "桃園市楊梅區梅高路二段136巷5號",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區梅高路二段136巷5號",
                "tel": "-",
                "lat": 24.9384163,
                "lng": 121.145109
            },
            {
                "name": "(桃園市)統一超商：祥綸",
                "address": "桃園市大園區高鐵北路三段45號",
                "link": "http://maps.google.com.tw/maps?q=桃園市大園區高鐵北路三段45號",
                "tel": "-",
                "lat": 25.0233839,
                "lng": 121.2246062
            },
            {
                "name": "(桃園市)統一超商：笙園",
                "address": "桃園市中壢區新生路738號740號742號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區新生路738號740號742號1樓",
                "tel": "-",
                "lat": 24.9737548,
                "lng": 121.2235696
            },
            {
                "name": "(桃園市)統一超商：富亨",
                "address": "桃園市龜山區文青路206號208號210號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區文青路206號208號210號1樓",
                "tel": "-",
                "lat": 25.0399108,
                "lng": 121.3885124
            },
            {
                "name": "(桃園市)統一超商：富莊",
                "address": "桃園市中壢區莊敬路141號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區莊敬路141號",
                "tel": "-",
                "lat": 24.968565,
                "lng": 121.2575742
            },
            {
                "name": "(桃園市)統一超商：富寶",
                "address": "桃園市平鎮區新富五街9號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區新富五街9號1樓",
                "tel": "-",
                "lat": 24.9397265,
                "lng": 121.2143772
            },
            {
                "name": "(桃園市)統一超商：湧北",
                "address": "桃園市八德區東勇街396-1號",
                "link": "http://maps.google.com.tw/maps?q=桃園市八德區東勇街396-1號",
                "tel": "-",
                "lat": 24.9652862,
                "lng": 121.3090856
            },
            {
                "name": "(桃園市)統一超商：新田園",
                "address": "桃園市大園區新興路62號",
                "link": "http://maps.google.com.tw/maps?q=桃園市大園區新興路62號",
                "tel": "-",
                "lat": 25.063413,
                "lng": 121.1944977
            },
            {
                "name": "(桃園市)統一超商：新莊伯",
                "address": "桃園市桃園區莊敬路一段175號177號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區莊敬路一段175號177號1樓",
                "tel": "-",
                "lat": 25.0251765,
                "lng": 121.3002527
            },
            {
                "name": "(桃園市)統一超商：萬龍",
                "address": "桃園市龜山區萬壽路1段307.309號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區萬壽路1段307.309號1樓",
                "tel": "-",
                "lat": 24.9940322,
                "lng": 121.3337665
            },
            {
                "name": "(桃園市)統一超商：廣華",
                "address": "桃園市龜山區文化三路386號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區文化三路386號1樓",
                "tel": "-",
                "lat": 25.0541371,
                "lng": 121.3665437
            },
            {
                "name": "(桃園市)統一超商：鑫華夏",
                "address": "桃園市龜山區文化二路28-1號28-2號28-3號1",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區文化二路28-1號28-2號28-3號1",
                "tel": "-",
                "lat": 25.0605874,
                "lng": 121.3644479
            },
            {
                "name": "(桃園市)愛買：桃園店",
                "address": "桃園市桃園區中山路939號",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區中山路939號",
                "tel": "-",
                "lat": 24.9848335,
                "lng": 121.2861718
            },
            {
                "name": "(桃園市)愛買：楊梅店",
                "address": "桃園市楊梅區中山北路二段23巷6號",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區中山北路二段23巷6號",
                "tel": "-",
                "lat": 24.9076843,
                "lng": 121.1675489
            },
            {
                "name": "(桃園市)新興模型玩具商行",
                "address": "桃園市楊梅區環東路484號",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區環東路484號",
                "tel": "03-4787723",
                "lat": 24.910591,
                "lng": 121.156736
            },
            {
                "name": "(桃園市)鼎美玩具：桃園大有新光",
                "address": "桃園市桃園區大有路189號5樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區大有路189號5樓",
                "tel": "03-2711392",
                "lat": 25.0081315,
                "lng": 121.3200278
            },
            {
                "name": "(桃園市)金玉堂：迴龍店",
                "address": "桃園市龜山區萬壽路一段282號",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區萬壽路一段282號",
                "tel": "02-8209-0263",
                "lat": 25.0176599,
                "lng": 121.4033591
            },
            {
                "name": "(桃園市)統一超商：常楓",
                "address": "桃園市龜山區光峰路221號",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區光峰路221號",
                "tel": "-",
                "lat": 25.0044404,
                "lng": 121.3425315
            },
            {
                "name": "(桃園市)統一超商：順舜",
                "address": "桃園市蘆竹區南順六街22號24號",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區南順六街22號24號",
                "tel": "-",
                "lat": 25.0393136,
                "lng": 121.2900904
            },
            {
                "name": "(桃園市)統一超商：寶山街",
                "address": "桃園市桃園區寶山街280號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區寶山街280號1樓",
                "tel": "-",
                "lat": 25.0117946,
                "lng": 121.3145536
            },
            {
                "name": "(桃園市)統一超商：楊民",
                "address": "桃園市楊梅區三民北路177號",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區三民北路177號",
                "tel": "-",
                "lat": 24.9124086,
                "lng": 121.1698835
            },
            {
                "name": "(桃園市)統一超商：健業",
                "address": "桃園市桃園區健行路88號",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區健行路88號",
                "tel": "-",
                "lat": 25.0220075,
                "lng": 121.3100516
            },
            {
                "name": "(桃園市)玩具e哥：中壢大潤發",
                "address": "桃園市中壢區中北路二段468號46櫃",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中北路二段468號46櫃",
                "tel": "03 271 9061",
                "lat": 24.9547179,
                "lng": 121.2345845
            },
            {
                "name": "(桃園市)TOYWORLD：桃園環球",
                "address": "桃園市中壢區高鐵南路二段352號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區高鐵南路二段352號4樓",
                "tel": "-",
                "lat": 25.0019989,
                "lng": 121.2024647
            },
            {
                "name": "(桃園市)統一超商：新龍鄉",
                "address": "桃園市龍潭區民族路168號170號172號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龍潭區民族路168號170號172號1樓",
                "tel": "03-4809419",
                "lat": 24.8414682,
                "lng": 121.2356916
            },
            {
                "name": "(桃園市)玩具e哥：桃園北埔店",
                "address": "桃園市桃園區北埔路36號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區北埔路36號2樓",
                "tel": "03-273-9917",
                "lat": 25.0036066,
                "lng": 121.3075879
            },
            {
                "name": "(桃園市)老虎歡樂世界：八德置地廣場",
                "address": "桃園市八德區介壽路一段728號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市八德區介壽路一段728號B1",
                "tel": "-",
                "lat": 24.9646446,
                "lng": 121.29992
            },
            {
                "name": "(桃園市)玩具e哥：平鎮大潤發",
                "address": "桃園市平鎮區南東路57-1號2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區南東路57-1號2樓",
                "tel": "-",
                "lat": 24.9204347,
                "lng": 121.2131519
            },
            {
                "name": "(桃園市)統一超商：文漢",
                "address": "桃園市大溪區文化路188號",
                "link": "http://maps.google.com.tw/maps?q=桃園市大溪區文化路188號",
                "tel": "-",
                "lat": 24.8773243,
                "lng": 121.2898258
            },
            {
                "name": "(桃園市)老虎歡樂世界：中壢中正店",
                "address": "桃園市中壢區中正路51號4樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中正路51號4樓",
                "tel": "-",
                "lat": 24.9541156,
                "lng": 121.2240366
            },
            {
                "name": "(桃園市)統一超商：高盛",
                "address": "桃園市大園區大成路一段2號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市大園區大成路一段2號1樓",
                "tel": "-",
                "lat": 25.0182019,
                "lng": 121.223693
            },
            {
                "name": "(桃園市)統一超商：三沅",
                "address": "桃園市楊梅區三民北路88號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區三民北路88號1樓",
                "tel": "-",
                "lat": 24.9104749,
                "lng": 121.1702121
            },
            {
                "name": "(桃園市)統一超商：千藝",
                "address": "桃園市桃園區同德六街1號",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區同德六街1號",
                "tel": "-",
                "lat": 25.0167345,
                "lng": 121.3007527
            },
            {
                "name": "(桃園市)統一超商：福倉",
                "address": "桃園市桃園區正光路425號1樓427號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區正光路425號1樓427號1樓",
                "tel": "-",
                "lat": 25.001028,
                "lng": 121.2941628
            },
            {
                "name": "(桃園市)統一超商：蘆山",
                "address": "桃園市蘆竹區中山路152、154、156號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區中山路152、154、156號1樓",
                "tel": "-",
                "lat": 25.0574051,
                "lng": 121.2975238
            },
            {
                "name": "(桃園市)統一超商：青航",
                "address": "桃園市中壢區領航北路2段60號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區領航北路2段60號",
                "tel": "-",
                "lat": 25.007441,
                "lng": 121.2022661
            },
            {
                "name": "(桃園市)統一超商：永誠",
                "address": "桃園市楊梅區永美路385-9號1樓2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區永美路385-9號1樓2樓",
                "tel": "-",
                "lat": 24.915367,
                "lng": 121.180298
            },
            {
                "name": "(桃園市)玩巨帝國：桃園店",
                "address": "桃園市楊梅區梅獅路一段158號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市楊梅區梅獅路一段158號1樓",
                "tel": "03-481-3006",
                "lat": 24.919287,
                "lng": 121.1800933
            },
            {
                "name": "(桃園市)玩樂多：平鎮店",
                "address": "桃園市平鎮區中庸路208號",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區中庸路208號",
                "tel": "-",
                "lat": 24.913487,
                "lng": 121.205227
            },
            {
                "name": "(桃園市)家薩軟式飛鏢",
                "address": "桃園市平鎮區延平路二段366號",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區延平路二段366號",
                "tel": "03-401-4407",
                "lat": 24.9435941,
                "lng": 121.2069833
            },
            {
                "name": "(桃園市)統一超商：平東",
                "address": "桃園市平鎮區平東路225號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區平東路225號1樓",
                "tel": "-",
                "lat": 24.9157511,
                "lng": 121.249021
            },
            {
                "name": "(桃園市)統一超商：同銘",
                "address": "桃園市龜山區大同路212號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區大同路212號1樓",
                "tel": "-",
                "lat": 24.9905074,
                "lng": 121.3442005
            },
            {
                "name": "(桃園市)統一超商：尊品",
                "address": "桃園市桃園區建國路41-1號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區建國路41-1號1樓",
                "tel": "-",
                "lat": 24.9857233,
                "lng": 121.3167628
            },
            {
                "name": "(桃園市)統一超商：塘園",
                "address": "桃園市中壢區領航北路二段208號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區領航北路二段208號",
                "tel": "-",
                "lat": 25.0089123,
                "lng": 121.2046205
            },
            {
                "name": "(桃園市)統一超商：廣泰",
                "address": "桃園市新屋區新生里12鄰中山路367號",
                "link": "http://maps.google.com.tw/maps?q=桃園市新屋區新生里12鄰中山路367號",
                "tel": "-",
                "lat": 24.9728972,
                "lng": 121.1021528
            },
            {
                "name": "(桃園市)統一超商：壢美",
                "address": "桃園市中壢區中美路39號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區中美路39號1樓",
                "tel": "-",
                "lat": 24.9581959,
                "lng": 121.2266368
            },
            {
                "name": "(桃園市)統一超商：鎮翊",
                "address": "桃園市平鎮區中豐路南勢一段173號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市平鎮區中豐路南勢一段173號1樓",
                "tel": "-",
                "lat": 24.920091,
                "lng": 121.2115689
            },
            {
                "name": "(桃園市)統一超商：驛光",
                "address": "桃園市中壢區新興路124號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區新興路124號1樓",
                "tel": "-",
                "lat": 24.9526386,
                "lng": 121.225484
            },
            {
                "name": "(桃園市)統一超商：海帝",
                "address": "桃園市中壢區元化路307號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區元化路307號1樓",
                "tel": "-",
                "lat": 24.9622622,
                "lng": 121.2250427
            },
            {
                "name": "(桃園市)統一超商：福州一",
                "address": "桃園市中壢區福州一街102號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區福州一街102號1樓",
                "tel": "-",
                "lat": 24.9651395,
                "lng": 121.2318264
            },
            {
                "name": "(桃園市)統一超商：新福街",
                "address": "桃園市中壢區福州二街392號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區福州二街392號1樓",
                "tel": "-",
                "lat": 24.9674868,
                "lng": 121.2315513
            },
            {
                "name": "(桃園市)玩具e哥：八德大潤發",
                "address": "桃園市八德區介壽路2段148號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市八德區介壽路2段148號1樓",
                "tel": "03-275-1911",
                "lat": 24.9541093,
                "lng": 121.2982504
            },
            {
                "name": "(桃園市)TOYWORLD：龜山文化",
                "address": "桃園市龜山區文化二路20之1號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區文化二路20之1號1樓",
                "tel": "-",
                "lat": 25.0596632,
                "lng": 121.364744
            },
            {
                "name": "(桃園市)老虎歡樂世界：春日店",
                "address": "桃園市桃園區春日路618號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區春日路618號B1",
                "tel": "-",
                "lat": 25.0086864,
                "lng": 121.3116067
            },
            {
                "name": "(桃園市)統一超商：榮安",
                "address": "桃園市中壢區榮安十三街297號1樓及榮安十四街2號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區榮安十三街297號1樓及榮安十四街2號1樓",
                "tel": "(03)4515728",
                "lat": 24.9609806,
                "lng": 121.2579001
            },
            {
                "name": "(桃園市)統一超商：豐亞",
                "address": "桃園市中壢區民族路6段232號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區民族路6段232號1樓",
                "tel": "-",
                "lat": 24.9618219,
                "lng": 121.1616862
            },
            {
                "name": "(桃園市)統一超商：合禾",
                "address": "桃園市桃園區溫州一路302號306號1樓2樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區溫州一路302號306號1樓2樓",
                "tel": "-",
                "lat": 25.0028393,
                "lng": 121.2893046
            },
            {
                "name": "(桃園市)TOYWORLD：桃園統領",
                "address": "桃園市桃園區中正路61號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市桃園區中正路61號B1",
                "tel": "03-272-7726",
                "lat": 24.9911293,
                "lng": 121.3124697
            },
            {
                "name": "(桃園市)統一超商：新福街",
                "address": "桃園市中壢區福州二街392號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區福州二街392號1樓",
                "tel": "-",
                "lat": 24.9674868,
                "lng": 121.2315513
            },
            {
                "name": "(桃園市)統一超商：統愿",
                "address": "桃園市觀音區莊敬路377、379號",
                "link": "http://maps.google.com.tw/maps?q=桃園市觀音區莊敬路377、379號",
                "tel": "-",
                "lat": 25.0469307,
                "lng": 121.1370519
            },
            {
                "name": "(桃園市)統一超商：渴望村",
                "address": "桃園市龍潭區三和里渴望路428號",
                "link": "http://maps.google.com.tw/maps?q=桃園市龍潭區三和里渴望路428號",
                "tel": "-",
                "lat": 24.8398493,
                "lng": 121.1837523
            },
            {
                "name": "(桃園市)統一超商：蘆竹",
                "address": "桃園市蘆竹區山腳里南山路3段306號308號",
                "link": "http://maps.google.com.tw/maps?q=桃園市蘆竹區山腳里南山路3段306號308號",
                "tel": "-",
                "lat": 25.0853761,
                "lng": 121.2864016
            },
            {
                "name": "(桃園市)瑞聯：桃園環球A8",
                "address": "桃園市龜山區復興一路8號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區復興一路8號B1",
                "tel": "-",
                "lat": 25.0602218,
                "lng": 121.3697521
            },
            {
                "name": "(桃園市)統一超商：茶專",
                "address": "桃園市龜山區萬壽路2段353號1樓",
                "link": "http://maps.google.com.tw/maps?q=桃園市龜山區萬壽路2段353號1樓",
                "tel": "-",
                "lat": 24.9942077,
                "lng": 121.335259
            },
            {
                "name": "(桃園市)玩樂多：內壢店",
                "address": "桃園市中壢區環中東路200號B1",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區環中東路200號B1",
                "tel": "-",
                "lat": 24.9636045,
                "lng": 121.2566752
            },
            {
                "name": "(桃園市)夾子園：中壢旗艦店",
                "address": "桃園市中壢區環中東路841號",
                "link": "http://maps.google.com.tw/maps?q=桃園市中壢區環中東路841號",
                "tel": "-",
                "lat": 24.9532131,
                "lng": 121.243254
            },
            {
                "name": "(新竹市)FUNBOX：新竹湳雅大魯閣",
                "address": "新竹市北區湳雅街91之2號2樓(ad161)",
                "link": "http://maps.google.com.tw/maps?q=新竹市北區湳雅街91之2號2樓(ad161)",
                "tel": "03-5427161",
                "lat": 24.8193555,
                "lng": 120.9699041
            },
            {
                "name": "(新竹市)老虎歡樂世界：新竹愛買店",
                "address": "新竹市東區公道五路二段469號B1",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區公道五路二段469號B1",
                "tel": "-",
                "lat": 24.8047468,
                "lng": 120.9932541
            },
            {
                "name": "(新竹市)金玉堂：食品店",
                "address": "新竹市東區食品路157號",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區食品路157號",
                "tel": "03-5738066",
                "lat": 24.7970071,
                "lng": 120.976402
            },
            {
                "name": "(新竹市)統一超商：竹陵",
                "address": "新竹市新竹市東大路二段174號",
                "link": "http://maps.google.com.tw/maps?q=新竹市新竹市東大路二段174號",
                "tel": "-",
                "lat": 24.8157687,
                "lng": 120.9660339
            },
            {
                "name": "(新竹市)統一超商：海天",
                "address": "新竹市香山區海埔路136號",
                "link": "http://maps.google.com.tw/maps?q=新竹市香山區海埔路136號",
                "tel": "-",
                "lat": 24.8188808,
                "lng": 120.9249403
            },
            {
                "name": "(新竹市)愛買：新竹店",
                "address": "新竹市東區公道五路二段469號B1",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區公道五路二段469號B1",
                "tel": "-",
                "lat": 24.8047468,
                "lng": 120.9932541
            },
            {
                "name": "(新竹市)新世紀遊樂器",
                "address": "新竹市東區平和街7號B1",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區平和街7號B1",
                "tel": "03-5250528",
                "lat": 24.8047845,
                "lng": 120.9671006
            },
            {
                "name": "(新竹市)鼎美玩具：新竹遠東",
                "address": "新竹市東區西大路323號6樓",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區西大路323號6樓",
                "tel": "03-6218211",
                "lat": 24.8020801,
                "lng": 120.9650953
            },
            {
                "name": "(新竹市)FUNBOX：新竹巨城",
                "address": "新竹市東區中央路229號5樓",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區中央路229號5樓",
                "tel": "03-5350236",
                "lat": 24.8094337,
                "lng": 120.9749908
            },
            {
                "name": "(新竹市)TG運動館：新竹店",
                "address": "新竹市東區關東路23巷66號",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區關東路23巷66號",
                "tel": "03-5784585",
                "lat": 24.7827092,
                "lng": 121.0215689
            },
            {
                "name": "(新竹市)統一超商：科有",
                "address": "新竹市東區光復路一段531巷70-1號",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區光復路一段531巷70-1號",
                "tel": "-",
                "lat": 24.7832773,
                "lng": 121.012567
            },
            {
                "name": "(新竹市)玩具e哥：新竹湳雅店",
                "address": "新竹市北區湳雅街97號2樓",
                "link": "http://maps.google.com.tw/maps?q=新竹市北區湳雅街97號2樓",
                "tel": "-",
                "lat": 24.8181698,
                "lng": 120.9706815
            },
            {
                "name": "(新竹市)孩子玩伴：新竹店",
                "address": "新竹市香山區牛埔東路188號",
                "link": "http://maps.google.com.tw/maps?q=新竹市香山區牛埔東路188號",
                "tel": "(03)-5384648",
                "lat": 24.7974296,
                "lng": 120.946908
            },
            {
                "name": "(新竹市)統一超商：竹博",
                "address": "新竹市東區民生路226號",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區民生路226號",
                "tel": "-",
                "lat": 24.8120411,
                "lng": 120.975707
            },
            {
                "name": "(新竹市)統一超商：冠亨",
                "address": "新竹市北區南寮里東大路4段123號",
                "link": "http://maps.google.com.tw/maps?q=新竹市北區南寮里東大路4段123號",
                "tel": "-",
                "lat": 24.843406,
                "lng": 120.9316725
            },
            {
                "name": "(新竹市)統一超商：泰一",
                "address": "新竹市東區中華路二段668號",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區中華路二段668號",
                "tel": "-",
                "lat": 24.7984085,
                "lng": 120.9655935
            },
            {
                "name": "(新竹市)統一超商：豪順",
                "address": "新竹市香山區香山里瑞光街23號",
                "link": "http://maps.google.com.tw/maps?q=新竹市香山區香山里瑞光街23號",
                "tel": "-",
                "lat": 24.791928,
                "lng": 120.927189
            },
            {
                "name": "(新竹市)統一超商：武陵",
                "address": "新竹市北區武陵路63號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹市北區武陵路63號1樓",
                "tel": "-",
                "lat": 24.8180241,
                "lng": 120.9651811
            },
            {
                "name": "(新竹市)統一超商：工研院",
                "address": "新竹市東區光復路2段321號 (2館1樓)",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區光復路2段321號 (2館1樓)",
                "tel": "-",
                "lat": 24.8004074,
                "lng": 120.9883064
            },
            {
                "name": "(新竹市)玩具反斗城：新竹巨城",
                "address": "新竹市東區中央路229號8樓",
                "link": "http://maps.google.com.tw/maps?q=新竹市東區中央路229號8樓",
                "tel": "03-5331719",
                "lat": 24.8100491,
                "lng": 120.9742328
            },
            {
                "name": "(新竹縣)TOYWORLD：6+Plaza廣場",
                "address": "新竹縣竹北市復興三路二段168號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市復興三路二段168號1樓",
                "tel": "03-6218253",
                "lat": 24.8075104,
                "lng": 121.0382719
            },
            {
                "name": "(新竹縣)伍聯生鮮超市",
                "address": "新竹縣竹東鎮中興路三段297號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹東鎮中興路三段297號",
                "tel": "03-5828658",
                "lat": 24.7688297,
                "lng": 121.0541369
            },
            {
                "name": "(新竹縣)統一超商：飛凰",
                "address": "新竹縣芎林鄉富林路二段729號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣芎林鄉富林路二段729號",
                "tel": "-",
                "lat": 24.7638038,
                "lng": 121.0856839
            },
            {
                "name": "(新竹縣)FUNBOX：竹北遠百",
                "address": "新竹縣竹北市莊敬北路18號3樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市莊敬北路18號3樓",
                "tel": "03-667-5649",
                "lat": 24.822509,
                "lng": 121.0237405
            },
            {
                "name": "(新竹縣)玩具e哥：竹北家樂福",
                "address": "新竹縣竹北市光明六路89號2樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市光明六路89號2樓",
                "tel": "-",
                "lat": 24.8267553,
                "lng": 121.0094902
            },
            {
                "name": "(新竹縣)玩的夥：文興店",
                "address": "新竹縣竹北市文興路1段198號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市文興路1段198號",
                "tel": "03-668-3375",
                "lat": 24.816633,
                "lng": 121.0156791
            },
            {
                "name": "(新竹縣)統一超商：竹樺",
                "address": "新竹縣竹北市華興街298號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市華興街298號1樓",
                "tel": "-",
                "lat": 24.8372973,
                "lng": 120.9992376
            },
            {
                "name": "(新竹縣)統一超商：長政",
                "address": "新竹縣竹東鎮中正路15號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹東鎮中正路15號1樓",
                "tel": "-",
                "lat": 24.7299801,
                "lng": 121.092273
            },
            {
                "name": "(新竹縣)統一超商：鹿家",
                "address": "新竹縣竹北市自強南路136號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市自強南路136號",
                "tel": "-",
                "lat": 24.8166659,
                "lng": 121.0252128
            },
            {
                "name": "(新竹縣)統一超商：璞玉",
                "address": "新竹縣竹北市東興路二段39號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市東興路二段39號",
                "tel": "-",
                "lat": 24.8024962,
                "lng": 121.0513789
            },
            {
                "name": "(新竹縣)統一超商：豐鼎",
                "address": "新竹縣湖口鄉光復東路8號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣湖口鄉光復東路8號1樓",
                "tel": "-",
                "lat": 24.8708951,
                "lng": 121.0334916
            },
            {
                "name": "(新竹縣)大學城文具",
                "address": "新竹縣竹北市自強三路98號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市自強三路98號",
                "tel": "03-658-2929",
                "lat": 24.817622,
                "lng": 121.0176295
            },
            {
                "name": "(新竹縣)FUNBOX：竹北享平方",
                "address": "新竹縣竹北市自強南路36號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市自強南路36號1樓",
                "tel": "03-6672980",
                "lat": 24.8188908,
                "lng": 121.0271594
            },
            {
                "name": "(新竹縣)全家：竹北永豐店",
                "address": "新竹縣竹北市莊敬六街83號1樓",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市莊敬六街83號1樓",
                "tel": "-",
                "lat": 24.8231284,
                "lng": 121.0281591
            },
            {
                "name": "(新竹縣)統一超商：中新",
                "address": "新竹縣竹北市中正西路389號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市中正西路389號",
                "tel": "03-555-9619",
                "lat": 24.8428845,
                "lng": 120.9945027
            },
            {
                "name": "(新竹縣)統一超商：王爺",
                "address": "新竹縣湖口鄉中山路一段790號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣湖口鄉中山路一段790號",
                "tel": "-",
                "lat": 24.8988063,
                "lng": 121.042834
            },
            {
                "name": "(新竹縣)統一超商：禾遠",
                "address": "新竹縣竹北市莊敬五街13號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市莊敬五街13號",
                "tel": "-",
                "lat": 24.8215763,
                "lng": 121.025977
            },
            {
                "name": "(新竹縣)統一超商：中新",
                "address": "新竹縣竹北市中正西路389號",
                "link": "http://maps.google.com.tw/maps?q=新竹縣竹北市中正西路389號",
                "tel": "-",
                "lat": 24.8428845,
                "lng": 120.9945027
            },
            {
                "name": "(苗栗縣)統一超商：苗碩",
                "address": "苗栗縣苗栗市新東街219號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣苗栗市新東街219號",
                "tel": "-",
                "lat": 24.550711,
                "lng": 120.822952
            },
            {
                "name": "(苗栗縣)統一超商：新苗中",
                "address": "苗栗縣苗栗市府前路120號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣苗栗市府前路120號",
                "tel": "-",
                "lat": 24.5605444,
                "lng": 120.8181004
            },
            {
                "name": "(苗栗縣)統一超商：館福",
                "address": "苗栗縣公館鄉館南路216-2號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣公館鄉館南路216-2號",
                "tel": "-",
                "lat": 24.5111399,
                "lng": 120.8211796
            },
            {
                "name": "(苗栗縣)FUNBOX：苗栗尚順",
                "address": "苗栗縣頭份市中央路105號6樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市中央路105號6樓",
                "tel": "03-7591466",
                "lat": 24.6890453,
                "lng": 120.903999
            },
            {
                "name": "(苗栗縣)TOYWORLD：竹南佳瑪",
                "address": "苗栗縣竹南鎮博愛街62號3樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣竹南鎮博愛街62號3樓",
                "tel": "03- 777-5587",
                "lat": 24.6869137,
                "lng": 120.8780811
            },
            {
                "name": "(苗栗縣)統一超商：銅鑼",
                "address": "苗栗縣銅鑼鄉中正路177.179號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣銅鑼鄉中正路177.179號",
                "tel": "-",
                "lat": 24.483395,
                "lng": 120.7867267
            },
            {
                "name": "(苗栗縣)玩具e哥：頭份大潤發",
                "address": "苗栗縣頭份市自強路230號1樓櫃位編號27+30",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市自強路230號1樓櫃位編號27+30",
                "tel": "-",
                "lat": 24.6867492,
                "lng": 120.9034301
            },
            {
                "name": "(苗栗縣)統一超商：國豪",
                "address": "苗栗縣竹南鎮延平路170號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣竹南鎮延平路170號",
                "tel": "-",
                "lat": 24.6895741,
                "lng": 120.8755723
            },
            {
                "name": "(苗栗縣)老虎歡樂世界：竹南佳瑪",
                "address": "苗栗縣竹南鎮博愛街62號3樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣竹南鎮博愛街62號3樓",
                "tel": "-",
                "lat": 24.6869137,
                "lng": 120.8780811
            },
            {
                "name": "(苗栗縣)孩子玩伴：頭份店",
                "address": "苗栗縣頭份市建國里中華路1381號1樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市建國里中華路1381號1樓",
                "tel": "(037)695138",
                "lat": 24.693889,
                "lng": 120.914981
            },
            {
                "name": "(苗栗縣)統一超商：頭屋",
                "address": "苗栗縣頭屋鄉尖豐路118號120號1樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭屋鄉尖豐路118號120號1樓",
                "tel": "-",
                "lat": 24.5749087,
                "lng": 120.8510555
            },
            {
                "name": "(苗栗縣)統一超商：貞豪",
                "address": "苗栗縣頭份市永貞路一段128號",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市永貞路一段128號",
                "tel": "-",
                "lat": 24.6767997,
                "lng": 120.8845452
            },
            {
                "name": "(苗栗縣)統一起商：貞豪",
                "address": "苗栗縣頭份市永貞路一段128號1樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市永貞路一段128號1樓",
                "tel": "-",
                "lat": 24.6767997,
                "lng": 120.8845452
            },
            {
                "name": "(苗栗縣)統一超商：中群",
                "address": "苗栗縣頭份市中正路319號1樓",
                "link": "http://maps.google.com.tw/maps?q=苗栗縣頭份市中正路319號1樓",
                "tel": "-",
                "lat": 24.6882836,
                "lng": 120.9186482
            },
            {
                "name": "(臺中市)FUNBOX：文心秀泰店",
                "address": "臺中市南屯區文心南路289號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區文心南路289號4樓",
                "tel": "04-24734289",
                "lat": 24.1297104,
                "lng": 120.6455746
            },
            {
                "name": "(臺中市)FUNBOX：台中大遠百",
                "address": "臺中市西區臺灣大道3段251號5樓5樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區臺灣大道3段251號5樓5樓",
                "tel": "04-22591960",
                "lat": 24.1644656,
                "lng": 120.6445957
            },
            {
                "name": "(臺中市)FUNBOX：台中新時代",
                "address": "臺中市東區復興路四段186號7樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區復興路四段186號7樓",
                "tel": "04-22241809",
                "lat": 24.1362498,
                "lng": 120.6878506
            },
            {
                "name": "(臺中市)FUNBOX：台中麗寶二期",
                "address": "臺中市后里區月眉東路2段181號D棟1樓(店號1004)",
                "link": "http://maps.google.com.tw/maps?q=臺中市后里區月眉東路2段181號D棟1樓(店號1004)",
                "tel": "04-25585645",
                "lat": 24.316827,
                "lng": 120.693477
            },
            {
                "name": "(臺中市)FUNBOX：廣三SOGO",
                "address": "臺中市西區臺灣大道二段459號8樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區臺灣大道二段459號8樓",
                "tel": "04-23190128",
                "lat": 24.1556104,
                "lng": 120.6615703
            },
            {
                "name": "(臺中市)FUNBOX：豐原太平洋",
                "address": "臺中市豐原區復興路2號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區復興路2號5樓",
                "tel": "04-25200529",
                "lat": 24.2509879,
                "lng": 120.7206061
            },
            {
                "name": "(臺中市)GSE：老虎城店",
                "address": "臺中市西屯區河南路三段120號B2樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區河南路三段120號B2樓",
                "tel": "04-36069280",
                "lat": 24.1640826,
                "lng": 120.6381276
            },
            {
                "name": "(臺中市)TOYWORLD：台中綠園道",
                "address": "臺中市西區健行路1049號6樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區健行路1049號6樓",
                "tel": "04-37073966",
                "lat": 24.1557808,
                "lng": 120.6632083
            },
            {
                "name": "(臺中市)TOYWORLD：台中麗寶",
                "address": "臺中市后里區福容路201號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市后里區福容路201號2樓",
                "tel": "04-37007597",
                "lat": 24.3242712,
                "lng": 120.6991944
            },
            {
                "name": "(臺中市)TOYWORLD：愛買水湳",
                "address": "臺中市西屯區中清路二段1199號3樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區中清路二段1199號3樓",
                "tel": "04-37069511",
                "lat": 24.1927064,
                "lng": 120.6598764
            },
            {
                "name": "(臺中市)王者娛樂休閒館",
                "address": "臺中市南屯區惠文路497號一樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區惠文路497號一樓",
                "tel": "04-23809991",
                "lat": 24.1459802,
                "lng": 120.643343
            },
            {
                "name": "(臺中市)台中夢幻之星",
                "address": "臺中市南區復興路二段188號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南區復興路二段188號",
                "tel": "04-22610782",
                "lat": 24.127353,
                "lng": 120.6664452
            },
            {
                "name": "(臺中市)老虎歡樂世界：愛買復興",
                "address": "臺中市南區復興路一段395號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市南區復興路一段395號2樓",
                "tel": "-",
                "lat": 24.1159044,
                "lng": 120.6558165
            },
            {
                "name": "(臺中市)玩具e哥：台中文心店",
                "address": "臺中市北屯區文心路四段225號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區文心路四段225號",
                "tel": "04-37076188",
                "lat": 24.1734775,
                "lng": 120.6775299
            },
            {
                "name": "(臺中市)玩具反斗城：台中老虎城店",
                "address": "臺中市西屯區河南路三段120號B2",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區河南路三段120號B2",
                "tel": "04-22517510",
                "lat": 24.1640826,
                "lng": 120.6381276
            },
            {
                "name": "(臺中市)哈佛書局",
                "address": "臺中市東勢區豐勢路中盛巷6號",
                "link": "http://maps.google.com.tw/maps?q=臺中市東勢區豐勢路中盛巷6號",
                "tel": "04-2588-9188",
                "lat": 24.2580088,
                "lng": 120.8292134
            },
            {
                "name": "(臺中市)唐采文具玩具批發：五權店",
                "address": "臺中市南屯區五權西路二段245號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區五權西路二段245號",
                "tel": "04-24730195",
                "lat": 24.1398034,
                "lng": 120.6477616
            },
            {
                "name": "(臺中市)家樂福：文心店",
                "address": "臺中市南屯區文心路一段521號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區文心路一段521號2樓",
                "tel": "-",
                "lat": 24.1540313,
                "lng": 120.6463498
            },
            {
                "name": "(臺中市)統一超商：上楓樹",
                "address": "臺中市南屯區中和里黎明路1段263號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區中和里黎明路1段263號",
                "tel": "-",
                "lat": 24.1182174,
                "lng": 120.6243041
            },
            {
                "name": "(臺中市)統一超商：大秀",
                "address": "臺中市清水區秀水里五權路328號",
                "link": "http://maps.google.com.tw/maps?q=臺中市清水區秀水里五權路328號",
                "tel": "-",
                "lat": 24.2776029,
                "lng": 120.5605364
            },
            {
                "name": "(臺中市)統一超商：大肚",
                "address": "臺中市大肚區沙田路二段740號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大肚區沙田路二段740號",
                "tel": "-",
                "lat": 24.1532573,
                "lng": 120.5448281
            },
            {
                "name": "(臺中市)統一超商：天仁",
                "address": "臺中市沙鹿區沙田路17之19號",
                "link": "http://maps.google.com.tw/maps?q=臺中市沙鹿區沙田路17之19號",
                "tel": "-",
                "lat": 24.2231297,
                "lng": 120.5569258
            },
            {
                "name": "(臺中市)統一超商：明義",
                "address": "臺中市西區明義街6號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區明義街6號",
                "tel": "-",
                "lat": 24.1547642,
                "lng": 120.6613425
            },
            {
                "name": "(臺中市)統一超商：松潭",
                "address": "臺中市北屯區軍功路二段183號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區軍功路二段183號",
                "tel": "-",
                "lat": 24.180021,
                "lng": 120.719513
            },
            {
                "name": "(臺中市)統一超商：南美",
                "address": "臺中市南區南平路182號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南區南平路182號",
                "tel": "-",
                "lat": 24.1232101,
                "lng": 120.6657123
            },
            {
                "name": "(臺中市)統一超商：美群",
                "address": "臺中市大里區美群路60號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大里區美群路60號",
                "tel": "-",
                "lat": 24.0854231,
                "lng": 120.7081913
            },
            {
                "name": "(臺中市)統一超商：淡溝",
                "address": "臺中市北區民權路361號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區民權路361號",
                "tel": "-",
                "lat": 24.156828,
                "lng": 120.6703845
            },
            {
                "name": "(臺中市)統一超商：新甲后",
                "address": "臺中市外埔區甲后路三段1025號",
                "link": "http://maps.google.com.tw/maps?q=臺中市外埔區甲后路三段1025號",
                "tel": "-",
                "lat": 24.3317049,
                "lng": 120.6533101
            },
            {
                "name": "(臺中市)統一超商：新堤",
                "address": "臺中市大里區甲堤南路71號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大里區甲堤南路71號",
                "tel": "-",
                "lat": 24.1025867,
                "lng": 120.6954339
            },
            {
                "name": "(臺中市)統一超商：溪洲",
                "address": "臺中市太平區新平路二段221號",
                "link": "http://maps.google.com.tw/maps?q=臺中市太平區新平路二段221號",
                "tel": "-",
                "lat": 24.1408928,
                "lng": 120.7146818
            },
            {
                "name": "(臺中市)統一超商：潭豐",
                "address": "臺中市潭子區崇德路四段250之1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市潭子區崇德路四段250之1號",
                "tel": "-",
                "lat": 24.2104068,
                "lng": 120.686867
            },
            {
                "name": "(臺中市)統一超商：豐王",
                "address": "臺中市豐原區三豐路二段496號",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區三豐路二段496號",
                "tel": "-",
                "lat": 24.2745331,
                "lng": 120.7221255
            },
            {
                "name": "(臺中市)統一超商：豐鑫",
                "address": "臺中市豐原區向陽路276號",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區向陽路276號",
                "tel": "-",
                "lat": 24.2514631,
                "lng": 120.7275493
            },
            {
                "name": "(臺中市)TOYWORLD：中港三井",
                "address": "臺中市梧棲區臺灣大道十段168號(櫃號：30300)",
                "link": "http://maps.google.com.tw/maps?q=臺中市梧棲區臺灣大道十段168號(櫃號：30300)",
                "tel": "04-37077665",
                "lat": 24.2588747,
                "lng": 120.5184163
            },
            {
                "name": "(臺中市)鼎美玩具：台中中友",
                "address": "臺中市北區三民路3段161號B棟7樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區三民路3段161號B棟7樓",
                "tel": "04-37023971",
                "lat": 24.1522437,
                "lng": 120.6848058
            },
            {
                "name": "(臺中市)鼎美玩具：台中新光",
                "address": "臺中市西屯區臺灣大道3段301號6樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區臺灣大道3段301號6樓",
                "tel": "04-37023722",
                "lat": 24.1647673,
                "lng": 120.6434748
            },
            {
                "name": "(臺中市)德周電玩：大雅店",
                "address": "臺中市大雅區雅環路2段18號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大雅區雅環路2段18號",
                "tel": "04-25608355",
                "lat": 24.2246749,
                "lng": 120.6536627
            },
            {
                "name": "(臺中市)玩的夥：台中店",
                "address": "臺中市北區錦新街49號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區錦新街49號",
                "tel": "04-2220-1899",
                "lat": 24.1532551,
                "lng": 120.6861689
            },
            {
                "name": "(臺中市)家樂福：西屯店",
                "address": "臺中市西屯區台灣大道四段1086號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區台灣大道四段1086號2樓",
                "tel": "-",
                "lat": 24.184133,
                "lng": 120.614969
            },
            {
                "name": "(臺中市)統一超商：媽祖",
                "address": "臺中市大甲區光明路1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大甲區光明路1號",
                "tel": "-",
                "lat": 24.3434606,
                "lng": 120.6256425
            },
            {
                "name": "(臺中市)統一超商：榮田",
                "address": "臺中市烏日區三榮路二段199號",
                "link": "http://maps.google.com.tw/maps?q=臺中市烏日區三榮路二段199號",
                "tel": "-",
                "lat": 24.1083563,
                "lng": 120.5969986
            },
            {
                "name": "(臺中市)統一超商：墩業",
                "address": "臺中市南屯區大墩路717-5號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區大墩路717-5號",
                "tel": "-",
                "lat": 24.153495,
                "lng": 120.6495541
            },
            {
                "name": "(臺中市)統一超商：醫德",
                "address": "臺中市北區大德街87號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區大德街87號1樓",
                "tel": "-",
                "lat": 24.1586704,
                "lng": 120.6786563
            },
            {
                "name": "(臺中市)統一超商：順太",
                "address": "臺中市北屯區太順路112號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區太順路112號1樓",
                "tel": "-",
                "lat": 24.1586931,
                "lng": 120.7247265
            },
            {
                "name": "(臺中市)TOYWORLD：台中秀泰",
                "address": "臺中市東區南京路66號3樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區南京路66號3樓",
                "tel": "04-37023852",
                "lat": 24.1402335,
                "lng": 120.6918434
            },
            {
                "name": "(臺中市)統一超商：浤淶",
                "address": "臺中市大雅區中清路四段408號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大雅區中清路四段408號",
                "tel": "04-25607490",
                "lat": 24.2324524,
                "lng": 120.6392667
            },
            {
                "name": "(臺中市)統一超商：文豐",
                "address": "臺中市南屯區文心南五路ㄧ段319號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區文心南五路ㄧ段319號",
                "tel": "04-24738232",
                "lat": 24.1320659,
                "lng": 120.6450712
            },
            {
                "name": "(臺中市)統一超商：茂華",
                "address": "臺中市大甲區順天里蔣公路",
                "link": "http://maps.google.com.tw/maps?q=臺中市大甲區順天里蔣公路",
                "tel": "04-26805206",
                "lat": 24.3464456,
                "lng": 120.621624
            },
            {
                "name": "(臺中市)統一超商：夏督",
                "address": "臺中市西屯區寧夏路170號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區寧夏路170號",
                "tel": "04-23168687",
                "lat": 24.1672876,
                "lng": 120.6612278
            },
            {
                "name": "(臺中市)統一超商：軟體",
                "address": "臺中市大里區東湖里中山路131號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大里區東湖里中山路131號",
                "tel": "04-24966941",
                "lat": 24.0824839,
                "lng": 120.694202
            },
            {
                "name": "(臺中市)FUNBOX：青海家樂福",
                "address": "臺中市西屯區青海路二段207-18號B1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區青海路二段207-18號B1樓",
                "tel": "04-24525915",
                "lat": 24.1704761,
                "lng": 120.6448712
            },
            {
                "name": "(臺中市)統一超商：鄉林夏都",
                "address": "臺中市西區忠明南路117號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區忠明南路117號",
                "tel": "-",
                "lat": 24.1526766,
                "lng": 120.6575001
            },
            {
                "name": "(臺中市)統一超商：港區",
                "address": "臺中市梧棲區文化路二段55號",
                "link": "http://maps.google.com.tw/maps?q=臺中市梧棲區文化路二段55號",
                "tel": "-",
                "lat": 24.2533375,
                "lng": 120.5295956
            },
            {
                "name": "(臺中市)統一超商：文雅",
                "address": "臺中市梧棲區文匯街66號",
                "link": "http://maps.google.com.tw/maps?q=臺中市梧棲區文匯街66號",
                "tel": "-",
                "lat": 24.2444051,
                "lng": 120.5463039
            },
            {
                "name": "(臺中市)統一超商：原義",
                "address": "臺中市西屯區忠義街80號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區忠義街80號",
                "tel": "-",
                "lat": 24.1615357,
                "lng": 120.6595589
            },
            {
                "name": "(臺中市)玩具e哥：豐原家樂福",
                "address": "臺中市豐原區成功路500號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區成功路500號4樓",
                "tel": "-",
                "lat": 24.2519553,
                "lng": 120.706442
            },
            {
                "name": "(臺中市)統一超商：大維",
                "address": "臺中市梧棲區四維路73號",
                "link": "http://maps.google.com.tw/maps?q=臺中市梧棲區四維路73號",
                "tel": "-",
                "lat": 24.2611391,
                "lng": 120.5367709
            },
            {
                "name": "(臺中市)統一超商：民生路",
                "address": "臺中市大雅區民生路三段159號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大雅區民生路三段159號",
                "tel": "-",
                "lat": 24.2317849,
                "lng": 120.6599029
            },
            {
                "name": "(臺中市)統一超商：市鑫",
                "address": "臺中市中區自由路2段9號",
                "link": "http://maps.google.com.tw/maps?q=臺中市中區自由路2段9號",
                "tel": "-",
                "lat": 24.1385875,
                "lng": 120.6804619
            },
            {
                "name": "(臺中市)統一超商：新麗寶",
                "address": "臺中市后里區福容路201號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市后里區福容路201號1樓",
                "tel": "-",
                "lat": 24.3246703,
                "lng": 120.6998789
            },
            {
                "name": "(臺中市)統一超商：三和",
                "address": "臺中市烏日區三榮路一段558號",
                "link": "http://maps.google.com.tw/maps?q=臺中市烏日區三榮路一段558號",
                "tel": "-",
                "lat": 24.1072688,
                "lng": 120.602344
            },
            {
                "name": "(臺中市)統一超商：后宥",
                "address": "臺中市后里區甲后路一段955號",
                "link": "http://maps.google.com.tw/maps?q=臺中市后里區甲后路一段955號",
                "tel": "-",
                "lat": 24.3107548,
                "lng": 120.7101995
            },
            {
                "name": "(臺中市)統一超商：忠權",
                "address": "臺中市北區忠明路426號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區忠明路426號1樓",
                "tel": "-",
                "lat": 24.1627131,
                "lng": 120.669354
            },
            {
                "name": "(臺中市)統一超商：春安",
                "address": "臺中市南屯區嶺東南路165號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區嶺東南路165號",
                "tel": "-",
                "lat": 24.1354086,
                "lng": 120.610094
            },
            {
                "name": "(臺中市)統一超商：陜西",
                "address": "臺中市北區陜西路48號48之1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北區陜西路48號48之1號",
                "tel": "-",
                "lat": 24.1683327,
                "lng": 120.6683961
            },
            {
                "name": "(臺中市)統一超商：逢華",
                "address": "臺中市西屯區文華路10-7號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區文華路10-7號",
                "tel": "-",
                "lat": 24.1756993,
                "lng": 120.6453384
            },
            {
                "name": "(臺中市)統一超商：福田",
                "address": "臺中市南區文心南路883號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市南區文心南路883號1樓",
                "tel": "-",
                "lat": 24.1111464,
                "lng": 120.6591242
            },
            {
                "name": "(臺中市)統一超商：黎明東",
                "address": "臺中市南屯區黎明東街22號",
                "link": "http://maps.google.com.tw/maps?q=臺中市南屯區黎明東街22號",
                "tel": "-",
                "lat": 24.1428219,
                "lng": 120.6388334
            },
            {
                "name": "(臺中市)統一超商：鎮揚",
                "address": "臺中市沙鹿區南陽路439號",
                "link": "http://maps.google.com.tw/maps?q=臺中市沙鹿區南陽路439號",
                "tel": "-",
                "lat": 24.2162933,
                "lng": 120.5711252
            },
            {
                "name": "(臺中市)統一超商：寶慶",
                "address": "臺中市西屯區逢甲里西屯路二段256巷8號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區逢甲里西屯路二段256巷8號1樓",
                "tel": "-",
                "lat": 24.170958,
                "lng": 120.647366
            },
            {
                "name": "(臺中市)統一超商：鑫工和",
                "address": "臺中市西屯區協和里工業區三十八路30號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區協和里工業區三十八路30號1樓",
                "tel": "-",
                "lat": 24.1762168,
                "lng": 120.589785
            },
            {
                "name": "(臺中市)統一超商：鑫和睦",
                "address": "臺中市神岡區神清路260號",
                "link": "http://maps.google.com.tw/maps?q=臺中市神岡區神清路260號",
                "tel": "-",
                "lat": 24.2706796,
                "lng": 120.6574313
            },
            {
                "name": "(臺中市)統一超商：鑫建德",
                "address": "臺中市東區建德街174號",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區建德街174號",
                "tel": "-",
                "lat": 24.1295462,
                "lng": 120.692032
            },
            {
                "name": "(臺中市)統一超商：昌盛",
                "address": "臺中市北屯區昌平路二段45號之8及45號之9",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區昌平路二段45號之8及45號之9",
                "tel": "-",
                "lat": 24.1904748,
                "lng": 120.6847723
            },
            {
                "name": "(臺中市)統一超商：旅順路",
                "address": "臺中市北屯區旅順路2段357、359號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區旅順路2段357、359號1樓",
                "tel": "-",
                "lat": 24.1737545,
                "lng": 120.695727
            },
            {
                "name": "(臺中市)FUNBOX：家福中清店",
                "address": "臺中市西屯區中清路3段436號B1",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區中清路3段436號B1",
                "tel": "04-2426-5820",
                "lat": 24.2068968,
                "lng": 120.6526608
            },
            {
                "name": "(臺中市)統一超商：敦富",
                "address": "臺中市北屯區敦富路367、369、371號",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區敦富路367、369、371號",
                "tel": "-",
                "lat": 24.1866998,
                "lng": 120.7076463
            },
            {
                "name": "(臺中市)FUNBOX：中港三井",
                "address": "臺中市梧棲區台灣大道十段166號 (店鋪號60300)",
                "link": "http://maps.google.com.tw/maps?q=臺中市梧棲區台灣大道十段166號 (店鋪號60300)",
                "tel": "(04)2656-0153",
                "lat": 24.2557484,
                "lng": 120.5206826
            },
            {
                "name": "(臺中市)全家：大里順發店",
                "address": "臺中市大里區永隆路209號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市大里區永隆路209號1樓",
                "tel": "-",
                "lat": 24.1080964,
                "lng": 120.6765462
            },
            {
                "name": "(臺中市)全家：太平金永億店",
                "address": "臺中市太平區長億路172號",
                "link": "http://maps.google.com.tw/maps?q=臺中市太平區長億路172號",
                "tel": "-",
                "lat": 24.1160852,
                "lng": 120.7166947
            },
            {
                "name": "(臺中市)全家：台中上安店",
                "address": "臺中市西屯區上安路136號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區上安路136號1樓",
                "tel": "-",
                "lat": 24.1714046,
                "lng": 120.6399581
            },
            {
                "name": "(臺中市)全家：台中仁美店",
                "address": "臺中市北屯區昌平東二路179號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市北屯區昌平東二路179號1樓",
                "tel": "-",
                "lat": 24.188366,
                "lng": 120.6873825
            },
            {
                "name": "(臺中市)全家：台中天保店",
                "address": "臺中市西屯區中工三路214之1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西屯區中工三路214之1號",
                "tel": "-",
                "lat": 24.1758448,
                "lng": 120.6175545
            },
            {
                "name": "(臺中市)全家：豐原社興店",
                "address": "臺中市豐原區社興五街1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區社興五街1號",
                "tel": "-",
                "lat": 24.246357,
                "lng": 120.705076
            },
            {
                "name": "(臺中市)GSE：台中三井",
                "address": "臺中市東區進德路700號南館3F（LaLaport）",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區進德路700號南館3F（LaLaport）",
                "tel": "04-2211-8510",
                "lat": 24.13424,
                "lng": 120.6922313
            },
            {
                "name": "(臺中市)愛買：豐原店",
                "address": "臺中市豐原區水源路420號",
                "link": "http://maps.google.com.tw/maps?q=臺中市豐原區水源路420號",
                "tel": "-",
                "lat": 24.2567943,
                "lng": 120.7345013
            },
            {
                "name": "(臺中市)統一超商：美生",
                "address": "臺中市西區美村路一段54號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區美村路一段54號",
                "tel": "04-23275818",
                "lat": 24.1532212,
                "lng": 120.6615553
            },
            {
                "name": "(臺中市)統一超商：倍沅",
                "address": "臺中市神岡區中山路473號",
                "link": "http://maps.google.com.tw/maps?q=臺中市神岡區中山路473號",
                "tel": "(04)25633834",
                "lat": 24.2468371,
                "lng": 120.6868578
            },
            {
                "name": "(臺中市)統一超商：新永大",
                "address": "臺中市大里區大明路340號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市大里區大明路340號1樓",
                "tel": "-",
                "lat": 24.115187,
                "lng": 120.6808488
            },
            {
                "name": "(臺中市)統一超商：模範",
                "address": "臺中市西區雙龍里模範街34巷1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區雙龍里模範街34巷1號",
                "tel": "-",
                "lat": 24.149164,
                "lng": 120.6668599
            },
            {
                "name": "(臺中市)統一超商：美生",
                "address": "臺中市西區美村路1段54號",
                "link": "http://maps.google.com.tw/maps?q=臺中市西區美村路1段54號",
                "tel": "-",
                "lat": 24.1430604,
                "lng": 120.6631289
            },
            {
                "name": "(臺中市)統一超商：倍沅",
                "address": "臺中市神岡區中山路473號",
                "link": "http://maps.google.com.tw/maps?q=臺中市神岡區中山路473號",
                "tel": "-",
                "lat": 24.2468371,
                "lng": 120.6868578
            },
            {
                "name": "(臺中市)Lalaport 台中 Toyworld",
                "address": "臺中市東區進德路600號4樓 40370櫃位",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區進德路600號4樓 40370櫃位",
                "tel": "-",
                "lat": 24.135779,
                "lng": 120.6925039
            },
            {
                "name": "(臺中市)統一超商：潭北",
                "address": "臺中市潭子區福潭路645號",
                "link": "http://maps.google.com.tw/maps?q=臺中市潭子區福潭路645號",
                "tel": "-",
                "lat": 24.2155886,
                "lng": 120.7078157
            },
            {
                "name": "(臺中市)全家：大雅金學府店",
                "address": "臺中市大雅區學府路176-3號",
                "link": "http://maps.google.com.tw/maps?q=臺中市大雅區學府路176-3號",
                "tel": "-",
                "lat": 24.2208442,
                "lng": 120.650218
            },
            {
                "name": "(臺中市)萊爾富：后里甲后店",
                "address": "臺中市后里區甲后路1037號、1041號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺中市后里區甲后路1037號、1041號1樓",
                "tel": "-",
                "lat": 24.3142224,
                "lng": 120.689522
            },
            {
                "name": "(臺中市)統一超商：東英",
                "address": "臺中市東區自由路4段339號",
                "link": "http://maps.google.com.tw/maps?q=臺中市東區自由路4段339號",
                "tel": "-",
                "lat": 24.1429219,
                "lng": 120.7058365
            },
            {
                "name": "(臺中市)統一超商：吉宏",
                "address": "臺中市烏日區九德里20鄰中華路593號",
                "link": "http://maps.google.com.tw/maps?q=臺中市烏日區九德里20鄰中華路593號",
                "tel": "-",
                "lat": 24.1072106,
                "lng": 120.6342289
            },
            {
                "name": "(臺中市)統一超商：育見",
                "address": "臺中市太平區育賢路321、323號",
                "link": "http://maps.google.com.tw/maps?q=臺中市太平區育賢路321、323號",
                "tel": "-",
                "lat": 24.1592555,
                "lng": 120.7150114
            },
            {
                "name": "(臺中市)統一超商：神圳",
                "address": "臺中市神岡區厚生路66-1號",
                "link": "http://maps.google.com.tw/maps?q=臺中市神岡區厚生路66-1號",
                "tel": "-",
                "lat": 24.2615401,
                "lng": 120.6742439
            },
            {
                "name": "(臺中市)統一超商：峰資",
                "address": "臺中市霧峰區樹仁路26號",
                "link": "http://maps.google.com.tw/maps?q=臺中市霧峰區樹仁路26號",
                "tel": "-",
                "lat": 24.0642085,
                "lng": 120.6970191
            },
            {
                "name": "(彰化縣)FUNBOX：彰化家樂福",
                "address": "彰化縣彰化市金馬路二段321號2樓",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市金馬路二段321號2樓",
                "tel": "04-7357475",
                "lat": 24.0944302,
                "lng": 120.5425197
            },
            {
                "name": "(彰化縣)大利市百貨：員林店",
                "address": "彰化縣員林市溝皂東街32號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣員林市溝皂東街32號",
                "tel": "(04)834-3399",
                "lat": 23.9482623,
                "lng": 120.5747635
            },
            {
                "name": "(彰化縣)金玉堂：員林店",
                "address": "彰化縣員林市大同路一段348號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣員林市大同路一段348號",
                "tel": "04-8365812",
                "lat": 23.9633766,
                "lng": 120.5797577
            },
            {
                "name": "(彰化縣)金玉堂：彰化三民店",
                "address": "彰化縣彰化市三民路404號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市三民路404號",
                "tel": "04-7286689",
                "lat": 24.086312,
                "lng": 120.5478104
            },
            {
                "name": "(彰化縣)家樂福：彰化店",
                "address": "彰化縣彰化市金馬路二段321號B1",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市金馬路二段321號B1",
                "tel": "-",
                "lat": 24.0944853,
                "lng": 120.5424481
            },
            {
                "name": "(彰化縣)統一超商：三春",
                "address": "彰化縣花壇鄉彰員路一段臨551號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣花壇鄉彰員路一段臨551號",
                "tel": "-",
                "lat": 24.0142926,
                "lng": 120.5677837
            },
            {
                "name": "(彰化縣)統一超商：大陽",
                "address": "彰化縣彰化市延平里大埔路405號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市延平里大埔路405號",
                "tel": "-",
                "lat": 24.0627066,
                "lng": 120.5435382
            },
            {
                "name": "(彰化縣)統一超商：斗苑",
                "address": "彰化縣埤頭鄉埤頭村斗苑東路588號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣埤頭鄉埤頭村斗苑東路588號",
                "tel": "-",
                "lat": 23.8894838,
                "lng": 120.4783151
            },
            {
                "name": "(彰化縣)統一超商：巨峰",
                "address": "彰化縣彰化市天祥路359號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市天祥路359號",
                "tel": "-",
                "lat": 24.0615314,
                "lng": 120.5332522
            },
            {
                "name": "(彰化縣)統一超商：和冠",
                "address": "彰化縣和美鎮彰新路六段臨566號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣和美鎮彰新路六段臨566號",
                "tel": "-",
                "lat": 24.1379192,
                "lng": 120.5089493
            },
            {
                "name": "(彰化縣)統一超商：芬園",
                "address": "彰化縣芬園鄉彰南路4段172號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣芬園鄉彰南路4段172號",
                "tel": "-",
                "lat": 24.015245,
                "lng": 120.6287082
            },
            {
                "name": "(彰化縣)統一超商：金佳旺",
                "address": "彰化縣社頭鄉中山路一段516號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣社頭鄉中山路一段516號",
                "tel": "-",
                "lat": 23.8961247,
                "lng": 120.583374
            },
            {
                "name": "(彰化縣)統一超商：中圳",
                "address": "彰化縣北斗鎮斗中路319號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣北斗鎮斗中路319號",
                "tel": "-",
                "lat": 23.8705342,
                "lng": 120.5442361
            },
            {
                "name": "(彰化縣)統一超商：花壇",
                "address": "彰化縣花壇鄉中山路二段1號1樓",
                "link": "http://maps.google.com.tw/maps?q=彰化縣花壇鄉中山路二段1號1樓",
                "tel": "-",
                "lat": 24.025708,
                "lng": 120.539009
            },
            {
                "name": "(彰化縣)全家：福興福鹿店",
                "address": "彰化縣福興鄉橋頭村復興路120號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣福興鄉橋頭村復興路120號",
                "tel": "-",
                "lat": 24.0526405,
                "lng": 120.4388296
            },
            {
                "name": "(彰化縣)玩具E哥：彰化中山",
                "address": "彰化縣彰化市中山路2段489號1樓",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市中山路2段489號1樓",
                "tel": "-",
                "lat": 24.0780751,
                "lng": 120.5443831
            },
            {
                "name": "(彰化縣)統一超商：員農",
                "address": "彰化縣員林市萬年里員水路二段19鄰433號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣員林市萬年里員水路二段19鄰433號",
                "tel": "-",
                "lat": 23.9545964,
                "lng": 120.5886304
            },
            {
                "name": "(彰化縣)金石堂：光復店",
                "address": "彰化縣彰化市民生路249號1樓",
                "link": "http://maps.google.com.tw/maps?q=彰化縣彰化市民生路249號1樓",
                "tel": "04-7229-212",
                "lat": 24.0805973,
                "lng": 120.5425746
            },
            {
                "name": "(彰化縣)統一超商：好修",
                "address": "彰化縣埔鹽鄉員鹿路二段95號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣埔鹽鄉員鹿路二段95號",
                "tel": "-",
                "lat": 24.0034632,
                "lng": 120.4612336
            },
            {
                "name": "(彰化縣)統一超商：員慶",
                "address": "彰化縣員林市山腳路1段386號",
                "link": "http://maps.google.com.tw/maps?q=彰化縣員林市山腳路1段386號",
                "tel": "-",
                "lat": 23.9639808,
                "lng": 120.6005821
            },
            {
                "name": "(彰化縣)玩具e哥：彰化員林店",
                "address": "彰化縣員林市靜修路24之3、24之4號  (雙門牌)",
                "link": "http://maps.google.com.tw/maps?q=彰化縣員林市靜修路24之3、24之4號  (雙門牌)",
                "tel": "04-706-2750",
                "lat": 23.9626413,
                "lng": 120.5721937
            },
            {
                "name": "(南投縣)FUNBOX：南投家樂福",
                "address": "南投縣南投市三和三路21號B1",
                "link": "http://maps.google.com.tw/maps?q=南投縣南投市三和三路21號B1",
                "tel": "049-2247996",
                "lat": 23.9058494,
                "lng": 120.6891447
            },
            {
                "name": "(南投縣)家樂福：南投店",
                "address": "南投縣南投市三和三路21號",
                "link": "http://maps.google.com.tw/maps?q=南投縣南投市三和三路21號",
                "tel": "-",
                "lat": 23.9058857,
                "lng": 120.6892076
            },
            {
                "name": "(南投縣)統一超商：向日葵",
                "address": "南投縣草屯鎮芬草路三段219-1號",
                "link": "http://maps.google.com.tw/maps?q=南投縣草屯鎮芬草路三段219-1號",
                "tel": "-",
                "lat": 24.000662,
                "lng": 120.6576762
            },
            {
                "name": "(南投縣)統一超商：龍星",
                "address": "南投縣草屯鎮碧山路739號",
                "link": "http://maps.google.com.tw/maps?q=南投縣草屯鎮碧山路739號",
                "tel": "-",
                "lat": 23.9762713,
                "lng": 120.6685116
            },
            {
                "name": "(南投縣)統一超商：龍揚",
                "address": "南投縣埔里鎮樹人路221-2號",
                "link": "http://maps.google.com.tw/maps?q=南投縣埔里鎮樹人路221-2號",
                "tel": "-",
                "lat": 23.9600139,
                "lng": 120.9729084
            },
            {
                "name": "(南投縣)玩具e哥：南投埔里",
                "address": "南投縣埔里鎮中正路399號1樓",
                "link": "http://maps.google.com.tw/maps?q=南投縣埔里鎮中正路399號1樓",
                "tel": "-",
                "lat": 23.9646798,
                "lng": 120.9675867
            },
            {
                "name": "(南投縣)統一超商：前山",
                "address": "南投縣竹山鎮集山路三段1089號",
                "link": "http://maps.google.com.tw/maps?q=南投縣竹山鎮集山路三段1089號",
                "tel": "-",
                "lat": 23.7538797,
                "lng": 120.6795371
            },
            {
                "name": "(南投縣)全家：埔里金車店",
                "address": "南投縣埔里鎮中正路534號",
                "link": "http://maps.google.com.tw/maps?q=南投縣埔里鎮中正路534號",
                "tel": "-",
                "lat": 23.9688898,
                "lng": 120.9644923
            },
            {
                "name": "(南投縣)統一超商：祖祠",
                "address": "南投縣南投市祖祠路16-4號",
                "link": "http://maps.google.com.tw/maps?q=南投縣南投市祖祠路16-4號",
                "tel": "-",
                "lat": 23.9169377,
                "lng": 120.683359
            },
            {
                "name": "(雲林縣)玩具e哥：雲林斗六店",
                "address": "雲林縣斗六市西平路159之1號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣斗六市西平路159之1號",
                "tel": "05-7709978",
                "lat": 23.711691,
                "lng": 120.5355
            },
            {
                "name": "(雲林縣)玩具e哥：雲林虎尾店",
                "address": "雲林縣虎尾鎮立德路6號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣虎尾鎮立德路6號",
                "tel": "05-770-6615",
                "lat": 23.7034363,
                "lng": 120.4249355
            },
            {
                "name": "(雲林縣)金玉堂：虎尾店",
                "address": "雲林縣虎尾鎮林森路二段61號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣虎尾鎮林森路二段61號",
                "tel": "05-6310081",
                "lat": 23.7065678,
                "lng": 120.4302833
            },
            {
                "name": "(雲林縣)金玉堂：麥寮店",
                "address": "雲林縣麥寮鄉中山路399號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣麥寮鄉中山路399號",
                "tel": "05-6936548",
                "lat": 23.750527,
                "lng": 120.249799
            },
            {
                "name": "(雲林縣)家樂福：北港店",
                "address": "雲林縣北港鎮華南路101號2樓",
                "link": "http://maps.google.com.tw/maps?q=雲林縣北港鎮華南路101號2樓",
                "tel": "-",
                "lat": 23.5721164,
                "lng": 120.3001859
            },
            {
                "name": "(雲林縣)統一超商：育北",
                "address": "雲林縣斗六市明德北路一段110號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣斗六市明德北路一段110號",
                "tel": "-",
                "lat": 23.7174699,
                "lng": 120.5512052
            },
            {
                "name": "(雲林縣)統一超商：保庄",
                "address": "雲林縣斗六市明德北路三段285號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣斗六市明德北路三段285號",
                "tel": "-",
                "lat": 23.7090668,
                "lng": 120.5305407
            },
            {
                "name": "(雲林縣)統一超商：興平",
                "address": "雲林縣西螺鎮中興里延平路418號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣西螺鎮中興里延平路418號",
                "tel": "-",
                "lat": 23.8006645,
                "lng": 120.4550865
            },
            {
                "name": "(雲林縣)FUNBOX：斗六家樂福",
                "address": "雲林縣斗六市雲林路二段297號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣斗六市雲林路二段297號",
                "tel": "05-5370127",
                "lat": 23.7013858,
                "lng": 120.5302709
            },
            {
                "name": "(雲林縣)全家：土庫新建國店",
                "address": "雲林縣土庫鎮建國路161號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣土庫鎮建國路161號",
                "tel": "-",
                "lat": 23.6795094,
                "lng": 120.3921267
            },
            {
                "name": "(雲林縣)全家：莿桐饒平店",
                "address": "雲林縣莿桐鄉四合村后埔128號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣莿桐鄉四合村后埔128號",
                "tel": "-",
                "lat": 23.777328,
                "lng": 120.5289
            },
            {
                "name": "(雲林縣)統一超商：晟泰",
                "address": "雲林縣虎尾鎮光復路521號",
                "link": "http://maps.google.com.tw/maps?q=雲林縣虎尾鎮光復路521號",
                "tel": "-",
                "lat": 23.7119738,
                "lng": 120.4321446
            },
            {
                "name": "(嘉義市)FUNBOX：嘉義新光",
                "address": "嘉義市西區垂陽路726號9樓",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區垂陽路726號9樓",
                "tel": "05-2227933",
                "lat": 23.4736912,
                "lng": 120.4410656
            },
            {
                "name": "(嘉義市)FUNBOX：嘉義遠東",
                "address": "嘉義市西區垂楊路537號4樓",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區垂楊路537號4樓",
                "tel": "05-2352655",
                "lat": 23.472695,
                "lng": 120.44116
            },
            {
                "name": "(嘉義市)TOYWORLD：嘉義秀泰",
                "address": "嘉義市西區文化路299號2樓",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區文化路299號2樓",
                "tel": "05-3209879",
                "lat": 23.4853912,
                "lng": 120.4477
            },
            {
                "name": "(嘉義市)玩具e哥：嘉義忠孝店",
                "address": "嘉義市東區忠孝路576號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市東區忠孝路576號",
                "tel": "05-3208268",
                "lat": 23.495667,
                "lng": 120.4525168
            },
            {
                "name": "(嘉義市)統一超商：八大",
                "address": "嘉義市西區八德路237號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區八德路237號",
                "tel": "-",
                "lat": 23.48891,
                "lng": 120.4301636
            },
            {
                "name": "(嘉義市)統一超商：北社尾",
                "address": "嘉義市西區北社尾路165號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區北社尾路165號",
                "tel": "-",
                "lat": 23.4937819,
                "lng": 120.4264293
            },
            {
                "name": "(嘉義市)統一超商：資砡",
                "address": "嘉義市西區玉山路422號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區玉山路422號",
                "tel": "-",
                "lat": 23.4704926,
                "lng": 120.4185195
            },
            {
                "name": "(嘉義市)嘉舜遊戲王模型玩具店",
                "address": "嘉義市東區嘉北街72號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市東區嘉北街72號",
                "tel": "05-2781882",
                "lat": 23.4939235,
                "lng": 120.4541909
            },
            {
                "name": "(嘉義市)興義發記",
                "address": "嘉義市西區中正路433號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區中正路433號",
                "tel": "05-2271576",
                "lat": 23.4786429,
                "lng": 120.448509
            },
            {
                "name": "(嘉義市)FUNBOX：嘉義耐斯",
                "address": "嘉義市西區忠孝路600號4樓",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區忠孝路600號4樓",
                "tel": "05-2765840",
                "lat": 23.4964966,
                "lng": 120.4527107
            },
            {
                "name": "(嘉義市)統一超商：新港坪",
                "address": "嘉義市西區玉山路203號",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區玉山路203號",
                "tel": "-",
                "lat": 23.471903,
                "lng": 120.4261071
            },
            {
                "name": "(嘉義市)FUNBOX：大潤發嘉義店",
                "address": "嘉義市西區博愛路二段281號B1",
                "link": "http://maps.google.com.tw/maps?q=嘉義市西區博愛路二段281號B1",
                "tel": "05-291-0341",
                "lat": 23.4781287,
                "lng": 120.4380783
            },
            {
                "name": "(嘉義縣)統一超商：保祥",
                "address": "嘉義縣太保市祥和三路東段226號",
                "link": "http://maps.google.com.tw/maps?q=嘉義縣太保市祥和三路東段226號",
                "tel": "-",
                "lat": 23.4546523,
                "lng": 120.2943672
            },
            {
                "name": "(嘉義縣)統一超商：彩虹",
                "address": "嘉義縣中埔鄉義仁村5鄰十字路2-25號",
                "link": "http://maps.google.com.tw/maps?q=嘉義縣中埔鄉義仁村5鄰十字路2-25號",
                "tel": "-",
                "lat": 23.4417167,
                "lng": 120.5226644
            },
            {
                "name": "(嘉義縣)統一超商：嘉大",
                "address": "嘉義縣民雄鄉文隆村鴨母水土1-92號",
                "link": "http://maps.google.com.tw/maps?q=嘉義縣民雄鄉文隆村鴨母水土1-92號",
                "tel": "-",
                "lat": 23.5377068,
                "lng": 120.4256805
            },
            {
                "name": "(嘉義縣)全家：朴子樸仔腳店",
                "address": "嘉義縣朴子市大同路166號",
                "link": "http://maps.google.com.tw/maps?q=嘉義縣朴子市大同路166號",
                "tel": "-",
                "lat": 23.4613981,
                "lng": 120.2423039
            },
            {
                "name": "(臺南市)1+1玩具",
                "address": "臺南市麻豆區興南路42號",
                "link": "http://maps.google.com.tw/maps?q=臺南市麻豆區興南路42號",
                "tel": "0984-363437",
                "lat": 23.1830394,
                "lng": 120.249563
            },
            {
                "name": "(臺南市)8點文具",
                "address": "臺南市北區西門路4段153號",
                "link": "http://maps.google.com.tw/maps?q=臺南市北區西門路4段153號",
                "tel": "06-283-0868",
                "lat": 23.0094972,
                "lng": 120.2076121
            },
            {
                "name": "(臺南市)FUNBOX：南紡購物中心",
                "address": "臺南市東區中華東路1段366號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區中華東路1段366號4樓",
                "tel": "06-2084034",
                "lat": 22.9913966,
                "lng": 120.2342904
            },
            {
                "name": "(臺南市)FUNBOX：家樂福仁德店",
                "address": "臺南市仁德區中山路711號2樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市仁德區中山路711號2樓",
                "tel": "06-2794638",
                "lat": 22.9722729,
                "lng": 120.246868
            },
            {
                "name": "(臺南市)FUNBOX：家樂福新仁店",
                "address": "臺南市仁德區大同路3段755號",
                "link": "http://maps.google.com.tw/maps?q=臺南市仁德區大同路3段755號",
                "tel": "06-2600571",
                "lat": 22.9472142,
                "lng": 120.2200691
            },
            {
                "name": "(臺南市)玩具e哥：台南Focus店",
                "address": "臺南市中西區中山路一段166號5樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區中山路一段166號5樓",
                "tel": "06-703-0018",
                "lat": 23.2356129,
                "lng": 120.2641802
            },
            {
                "name": "(臺南市)玩具e哥：台南東寧店",
                "address": "臺南市東區東寧路61號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區東寧路61號1樓",
                "tel": "06-703-5700",
                "lat": 22.9920502,
                "lng": 120.2218964
            },
            {
                "name": "(臺南市)玩具e哥：台南麻豆店",
                "address": "臺南市麻豆區中山路141號",
                "link": "http://maps.google.com.tw/maps?q=臺南市麻豆區中山路141號",
                "tel": "06-703-2210",
                "lat": 23.1835504,
                "lng": 120.2449864
            },
            {
                "name": "(臺南市)玩具e哥：台南新營店",
                "address": "臺南市新營區復興路155之2號",
                "link": "http://maps.google.com.tw/maps?q=臺南市新營區復興路155之2號",
                "tel": "06-7035710",
                "lat": 23.3029656,
                "lng": 120.3077159
            },
            {
                "name": "(臺南市)金玉堂：安和店",
                "address": "臺南市安南區安和路一段121號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區安和路一段121號",
                "tel": "(06)283-0736",
                "lat": 23.0286451,
                "lng": 120.214077
            },
            {
                "name": "(臺南市)金玉堂：海佃店",
                "address": "臺南市安南區海佃路一段361號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區海佃路一段361號",
                "tel": "06-2507518",
                "lat": 23.0274757,
                "lng": 120.1904394
            },
            {
                "name": "(臺南市)金玉堂：善化店",
                "address": "臺南市善化區中正路515號",
                "link": "http://maps.google.com.tw/maps?q=臺南市善化區中正路515號",
                "tel": "06-5814666",
                "lat": 23.1316808,
                "lng": 120.293787
            },
            {
                "name": "(臺南市)金玉堂：新營店",
                "address": "臺南市新營區三民路96號",
                "link": "http://maps.google.com.tw/maps?q=臺南市新營區三民路96號",
                "tel": "06-6331011",
                "lat": 23.3072605,
                "lng": 120.3153741
            },
            {
                "name": "(臺南市)金佳人玩具",
                "address": "臺南市佳里區中和街80號",
                "link": "http://maps.google.com.tw/maps?q=臺南市佳里區中和街80號",
                "tel": "06-7227692",
                "lat": 23.1608186,
                "lng": 120.1757983
            },
            {
                "name": "(臺南市)家樂福：新仁店",
                "address": "臺南市南區大同路3段755號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區大同路3段755號",
                "tel": "-",
                "lat": 22.9472142,
                "lng": 120.2200691
            },
            {
                "name": "(臺南市)統一超商：土定富",
                "address": "臺南市南區大成路二段86號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區大成路二段86號",
                "tel": "-",
                "lat": 22.9750856,
                "lng": 120.1949877
            },
            {
                "name": "(臺南市)統一超商：仁興",
                "address": "臺南市歸仁區南保里大德路307號",
                "link": "http://maps.google.com.tw/maps?q=臺南市歸仁區南保里大德路307號",
                "tel": "-",
                "lat": 22.9734481,
                "lng": 120.2878786
            },
            {
                "name": "(臺南市)統一超商：永玉",
                "address": "臺南市永康區永明街175號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區永明街175號",
                "tel": "-",
                "lat": 23.0248737,
                "lng": 120.2625858
            },
            {
                "name": "(臺南市)統一超商：安中",
                "address": "臺南市安南區安中路一段711號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區安中路一段711號",
                "tel": "-",
                "lat": 23.043011,
                "lng": 120.1952593
            },
            {
                "name": "(臺南市)統一超商：南龍",
                "address": "臺南市佳里區安南路256號",
                "link": "http://maps.google.com.tw/maps?q=臺南市佳里區安南路256號",
                "tel": "-",
                "lat": 23.1519356,
                "lng": 120.1744432
            },
            {
                "name": "(臺南市)統一超商：喬興",
                "address": "臺南市西港區新興街8-77號",
                "link": "http://maps.google.com.tw/maps?q=臺南市西港區新興街8-77號",
                "tel": "-",
                "lat": 23.1181709,
                "lng": 120.2020688
            },
            {
                "name": "(臺南市)統一超商：陽光城",
                "address": "臺南市善化區蓮潭里陽光大道198號",
                "link": "http://maps.google.com.tw/maps?q=臺南市善化區蓮潭里陽光大道198號",
                "tel": "-",
                "lat": 23.1118706,
                "lng": 120.3074521
            },
            {
                "name": "(臺南市)統一超商：新新善",
                "address": "臺南市新市區復興路59號61號63號",
                "link": "http://maps.google.com.tw/maps?q=臺南市新市區復興路59號61號63號",
                "tel": "-",
                "lat": 23.0812443,
                "lng": 120.2953116
            },
            {
                "name": "(臺南市)統一超商：新樹人",
                "address": "臺南市善化區中山路143-2號",
                "link": "http://maps.google.com.tw/maps?q=臺南市善化區中山路143-2號",
                "tel": "-",
                "lat": 23.1327027,
                "lng": 120.3015868
            },
            {
                "name": "(臺南市)統一超商：裕信",
                "address": "臺南市東區裕信路352號",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區裕信路352號",
                "tel": "-",
                "lat": 22.9797301,
                "lng": 120.2448731
            },
            {
                "name": "(臺南市)統一超商：樂豐",
                "address": "臺南市南區新都路460號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區新都路460號",
                "tel": "-",
                "lat": 22.9672471,
                "lng": 120.193183
            },
            {
                "name": "(臺南市)統一超商：豐平",
                "address": "臺南市安平區平豐路430號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安平區平豐路430號",
                "tel": "-",
                "lat": 22.9942434,
                "lng": 120.1639253
            },
            {
                "name": "(臺南市)萊登童創館",
                "address": "臺南市佳里區建南里公園路270號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市佳里區建南里公園路270號1樓",
                "tel": "0983870055",
                "lat": 23.1582491,
                "lng": 120.1728044
            },
            {
                "name": "(臺南市)鼎美玩具：台南新光",
                "address": "臺南市中西區中山路162號8樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區中山路162號8樓",
                "tel": "06-7030677",
                "lat": 22.9955106,
                "lng": 120.2098278
            },
            {
                "name": "(臺南市)鼎美玩具：西門新光",
                "address": "臺南市中西區西門路一段658號3樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區西門路一段658號3樓",
                "tel": "06-7030678",
                "lat": 22.9868277,
                "lng": 120.1977034
            },
            {
                "name": "(臺南市)福盛泰玩具行",
                "address": "臺南市中西區西賢里和緯路5段283號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區西賢里和緯路5段283號1樓",
                "tel": "06 280 1015",
                "lat": 23.0049907,
                "lng": 120.1794934
            },
            {
                "name": "(臺南市)領先書局",
                "address": "臺南市北區和緯路三段228號",
                "link": "http://maps.google.com.tw/maps?q=臺南市北區和緯路三段228號",
                "tel": "06-258-5959#11",
                "lat": 23.0107591,
                "lng": 120.1979284
            },
            {
                "name": "(臺南市)101文具：本淵寮店",
                "address": "臺南市安南區海佃路三段317號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區海佃路三段317號",
                "tel": "(06)245-8020",
                "lat": 23.0531184,
                "lng": 120.1784367
            },
            {
                "name": "(臺南市)101文具：安平店",
                "address": "臺南市安平區慶平路413號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安平區慶平路413號",
                "tel": "06 298 3812",
                "lat": 22.9967065,
                "lng": 120.1754363
            },
            {
                "name": "(臺南市)FUNBOX：台南遠百",
                "address": "臺南市北區前鋒路210號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市北區前鋒路210號4樓",
                "tel": "06-2081597",
                "lat": 22.997192,
                "lng": 120.212851
            },
            {
                "name": "(臺南市)玩具反斗城：南紡購物中心",
                "address": "臺南市東區中華東路1段366號4樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區中華東路1段366號4樓",
                "tel": "06-2086296",
                "lat": 22.9913966,
                "lng": 120.2342904
            },
            {
                "name": "(臺南市)統一超商：加吉吉",
                "address": "臺南市安南區新順里培安路155號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區新順里培安路155號",
                "tel": "-",
                "lat": 23.0438494,
                "lng": 120.2114445
            },
            {
                "name": "(臺南市)統一超商：立東",
                "address": "臺南市東區東門路三段220號",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區東門路三段220號",
                "tel": "-",
                "lat": 22.9771189,
                "lng": 120.234473
            },
            {
                "name": "(臺南市)統一超商：東楨",
                "address": "臺南市白河區新興路507號",
                "link": "http://maps.google.com.tw/maps?q=臺南市白河區新興路507號",
                "tel": "-",
                "lat": 23.3525458,
                "lng": 120.4178314
            },
            {
                "name": "(臺南市)統一超商：社頂",
                "address": "臺南市新市區大社里大社710號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市新市區大社里大社710號1樓",
                "tel": "-",
                "lat": 23.089296,
                "lng": 120.31755
            },
            {
                "name": "(臺南市)統一超商：竹篙厝",
                "address": "臺南市東區仁和路126號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區仁和路126號1樓",
                "tel": "06-2677562",
                "lat": 22.9704502,
                "lng": 120.232814
            },
            {
                "name": "(臺南市)鼎美玩具：台南三井",
                "address": "臺南市歸仁區歸仁大道101號3樓30680櫃位",
                "link": "http://maps.google.com.tw/maps?q=臺南市歸仁區歸仁大道101號3樓30680櫃位",
                "tel": "-",
                "lat": 22.9253188,
                "lng": 120.286926
            },
            {
                "name": "(臺南市)金玉堂：南門店",
                "address": "臺南市中西區南門路229號之1",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區南門路229號之1",
                "tel": "06-214-8828",
                "lat": 22.9837646,
                "lng": 120.2044198
            },
            {
                "name": "(臺南市)金玉堂：關廟店",
                "address": "臺南市關廟區中山路一段393號",
                "link": "http://maps.google.com.tw/maps?q=臺南市關廟區中山路一段393號",
                "tel": "(06)596-0818",
                "lat": 22.9596606,
                "lng": 120.3280594
            },
            {
                "name": "(臺南市)統一超商：文南",
                "address": "臺南市南區健康路二段268-1號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區健康路二段268-1號",
                "tel": "-",
                "lat": 22.9818705,
                "lng": 120.1900162
            },
            {
                "name": "(臺南市)統一超商：永龍",
                "address": "臺南市永康區埔園里中山路398號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區埔園里中山路398號",
                "tel": "-",
                "lat": 23.0354002,
                "lng": 120.254747
            },
            {
                "name": "(臺南市)統一超商：橋富",
                "address": "臺南市永康區大橋二街130號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區大橋二街130號",
                "tel": "-",
                "lat": 23.0199062,
                "lng": 120.2291512
            },
            {
                "name": "(臺南市)統一超商：鑫永康",
                "address": "臺南市永康區中華路617-1號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區中華路617-1號",
                "tel": "-",
                "lat": 23.014523,
                "lng": 120.229882
            },
            {
                "name": "(臺南市)統一超商：雙永",
                "address": "臺南市永康區永大一路60號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區永大一路60號",
                "tel": "-",
                "lat": 23.0179659,
                "lng": 120.2605967
            },
            {
                "name": "(臺南市)全家：台南三喜店",
                "address": "臺南市南區喜樹路220號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區喜樹路220號",
                "tel": "-",
                "lat": 22.9413884,
                "lng": 120.178234
            },
            {
                "name": "(臺南市)全家：台南林森店",
                "address": "臺南市東區林森路二段188號",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區林森路二段188號",
                "tel": "-",
                "lat": 22.9891118,
                "lng": 120.2240232
            },
            {
                "name": "(臺南市)全家：新化鑫義店",
                "address": "臺南市新化區信義路371號",
                "link": "http://maps.google.com.tw/maps?q=臺南市新化區信義路371號",
                "tel": "-",
                "lat": 23.034487,
                "lng": 120.3042356
            },
            {
                "name": "(臺南市)統一超商：新民",
                "address": "臺南市新營區民生里三民路152-13號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市新營區民生里三民路152-13號1樓",
                "tel": "-",
                "lat": 23.3065053,
                "lng": 120.3103892
            },
            {
                "name": "(臺南市)統一超商：新麻豆",
                "address": "臺南市麻豆區中山路11號",
                "link": "http://maps.google.com.tw/maps?q=臺南市麻豆區中山路11號",
                "tel": "-",
                "lat": 23.1835983,
                "lng": 120.247762
            },
            {
                "name": "(臺南市)玩具e哥：台南中正",
                "address": "臺南市永康區中正南路358號B1 商店街",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區中正南路358號B1 商店街",
                "tel": "-",
                "lat": 23.032457,
                "lng": 120.228126
            },
            {
                "name": "(臺南市)統一超商：新北",
                "address": "臺南市新營區民治路228號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市新營區民治路228號1樓",
                "tel": "-",
                "lat": 23.3081043,
                "lng": 120.3044429
            },
            {
                "name": "(臺南市)統一超商：新北",
                "address": "臺南市新營區民治路228號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市新營區民治路228號1樓",
                "tel": "06-656-4239",
                "lat": 23.3081043,
                "lng": 120.3044429
            },
            {
                "name": "(臺南市)統一超商：城中",
                "address": "臺南市安南區安中路六段599號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區安中路六段599號",
                "tel": "06-2570930",
                "lat": 23.0622636,
                "lng": 120.1295413
            },
            {
                "name": "(臺南市)統一超商：紅瓦厝",
                "address": "臺南市歸仁區大成路211號",
                "link": "http://maps.google.com.tw/maps?q=臺南市歸仁區大成路211號",
                "tel": "-",
                "lat": 22.9607216,
                "lng": 120.2962258
            },
            {
                "name": "(臺南市)統一超商：城中",
                "address": "臺南市安南區安中路6段599號",
                "link": "http://maps.google.com.tw/maps?q=臺南市安南區安中路6段599號",
                "tel": "-",
                "lat": 23.0622636,
                "lng": 120.1295413
            },
            {
                "name": "(臺南市)玩具e哥：台南大潤發",
                "address": "臺南市北區臨安路2段310號B1",
                "link": "http://maps.google.com.tw/maps?q=臺南市北區臨安路2段310號B1",
                "tel": "06-700-3669",
                "lat": 23.0044879,
                "lng": 120.2035689
            },
            {
                "name": "(臺南市)玩具e哥：台南安平店",
                "address": "臺南市中西區中華西路2段16號B1  櫃位:MAPB1S00070",
                "link": "http://maps.google.com.tw/maps?q=臺南市中西區中華西路2段16號B1  櫃位:MAPB1S00070",
                "tel": "06-703-0036",
                "lat": 22.9888192,
                "lng": 120.1872869
            },
            {
                "name": "(臺南市)統一超商：崇道",
                "address": "臺南市東區崇善路571號",
                "link": "http://maps.google.com.tw/maps?q=臺南市東區崇善路571號",
                "tel": "-",
                "lat": 22.9726118,
                "lng": 120.2299061
            },
            {
                "name": "(臺南市)統一超商：奇佳",
                "address": "臺南市新化區信義路373號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市新化區信義路373號1樓",
                "tel": "-",
                "lat": 23.0344869,
                "lng": 120.3042312
            },
            {
                "name": "(臺南市)統一超商：東橋",
                "address": "臺南市永康區東橋一路28號",
                "link": "http://maps.google.com.tw/maps?q=臺南市永康區東橋一路28號",
                "tel": "-",
                "lat": 23.0170457,
                "lng": 120.23531
            },
            {
                "name": "(臺南市)統一超商：新佳興",
                "address": "臺南市佳里區東寧里文化路196號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺南市佳里區東寧里文化路196號1樓",
                "tel": "-",
                "lat": 23.163283,
                "lng": 120.1773269
            },
            {
                "name": "(臺南市)統一超商：大忠",
                "address": "臺南市南區大忠里中華南路1段178號",
                "link": "http://maps.google.com.tw/maps?q=臺南市南區大忠里中華南路1段178號",
                "tel": "-",
                "lat": 22.969614,
                "lng": 120.210913
            },
            {
                "name": "(高雄市)FUNBOX：大立百貨",
                "address": "高雄市前金區五福三路59號5樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前金區五福三路59號5樓",
                "tel": "07-215-4352",
                "lat": 22.6217177,
                "lng": 120.2974801
            },
            {
                "name": "(高雄市)FUNBOX：高雄漢神",
                "address": "高雄市前金區成功一路266-1號8樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前金區成功一路266-1號8樓",
                "tel": "07-2159653",
                "lat": 22.6193366,
                "lng": 120.2960446
            },
            {
                "name": "(高雄市)FUNBOX：高雄遠百",
                "address": "高雄市苓雅區三多四路21號6樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市苓雅區三多四路21號6樓",
                "tel": "07-5362116",
                "lat": 22.6127672,
                "lng": 120.3043248
            },
            {
                "name": "(高雄市)FUNBOX：義大世界",
                "address": "高雄市大樹區學城路一段12號C區2樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市大樹區學城路一段12號C區2樓",
                "tel": "07-6569312",
                "lat": 22.7303876,
                "lng": 120.402402
            },
            {
                "name": "(高雄市)FUNBOX：夢時代",
                "address": "高雄市前鎮區中華五路789號5樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區中華五路789號5樓",
                "tel": "07-812-5562",
                "lat": 22.5950439,
                "lng": 120.3070139
            },
            {
                "name": "(高雄市)文仁文具王",
                "address": "高雄市小港區漢民路292號B1",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區漢民路292號B1",
                "tel": "07-8055559",
                "lat": 22.5666812,
                "lng": 120.3539548
            },
            {
                "name": "(高雄市)卡豆生活休閒館",
                "address": "高雄市岡山區中山北路82號",
                "link": "http://maps.google.com.tw/maps?q=高雄市岡山區中山北路82號",
                "tel": "07-621-9775",
                "lat": 22.7947638,
                "lng": 120.2990392
            },
            {
                "name": "(高雄市)谷玖玩具",
                "address": "高雄市左營區菜公里曾子路410號",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區菜公里曾子路410號",
                "tel": "07-341-8058",
                "lat": 22.6824449,
                "lng": 120.3039418
            },
            {
                "name": "(高雄市)玩具反斗城：夢時代",
                "address": "高雄市前鎮區中華五路789號5樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區中華五路789號5樓",
                "tel": "07-8233118",
                "lat": 22.5950439,
                "lng": 120.3070139
            },
            {
                "name": "(高雄市)玩具貓模型店",
                "address": "高雄市岡山區岡山路199號",
                "link": "http://maps.google.com.tw/maps?q=高雄市岡山區岡山路199號",
                "tel": "07-6214940",
                "lat": 22.7916424,
                "lng": 120.2959553
            },
            {
                "name": "(高雄市)金玉堂：小港店",
                "address": "高雄市小港區康莊路80號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區康莊路80號",
                "tel": "07-8071919",
                "lat": 22.5681701,
                "lng": 120.3556663
            },
            {
                "name": "(高雄市)金玉堂：崇德店",
                "address": "高雄市左營區新光里崇德路356號",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區新光里崇德路356號",
                "tel": "07-345-1334",
                "lat": 22.67677,
                "lng": 120.3022966
            },
            {
                "name": "(高雄市)金玉堂：瑞隆店",
                "address": "高雄市前鎮區瑞隆路476號",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區瑞隆路476號",
                "tel": "07-752-7188",
                "lat": 22.6055786,
                "lng": 120.3291482
            },
            {
                "name": "(高雄市)金玉堂：路竹店",
                "address": "高雄市路竹區國昌路16號",
                "link": "http://maps.google.com.tw/maps?q=高雄市路竹區國昌路16號",
                "tel": "07-6966802",
                "lat": 22.8543452,
                "lng": 120.2605801
            },
            {
                "name": "(高雄市)金玉堂：鼎中店",
                "address": "高雄市三民區金鼎路339號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區金鼎路339號",
                "tel": "07-3109810",
                "lat": 22.6648828,
                "lng": 120.3195576
            },
            {
                "name": "(高雄市)金玉堂：橋頭店",
                "address": "高雄市橋頭區仕和里仕豐路11號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市橋頭區仕和里仕豐路11號1樓",
                "tel": "07-611-6606",
                "lat": 22.7512851,
                "lng": 120.3085059
            },
            {
                "name": "(高雄市)家樂福：五甲店",
                "address": "高雄市鳳山區林森路291號2樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區林森路291號2樓",
                "tel": "-",
                "lat": 22.5963886,
                "lng": 120.336807
            },
            {
                "name": "(高雄市)家樂福：成功店",
                "address": "高雄市前鎮區中華五路1111號 2樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區中華五路1111號 2樓",
                "tel": "-",
                "lat": 22.6049796,
                "lng": 120.3042279
            },
            {
                "name": "(高雄市)家樂福：楠梓店",
                "address": "高雄市楠梓區藍田路288號3樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區藍田路288號3樓",
                "tel": "-",
                "lat": 22.7280541,
                "lng": 120.2903102
            },
            {
                "name": "(高雄市)家樂福：鼎山店",
                "address": "高雄市三民區鼎山街529號3樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區鼎山街529號3樓",
                "tel": "-",
                "lat": 22.6530991,
                "lng": 120.3187922
            },
            {
                "name": "(高雄市)統一超商：千湖",
                "address": "高雄市湖內區葉厝里保生路135號",
                "link": "http://maps.google.com.tw/maps?q=高雄市湖內區葉厝里保生路135號",
                "tel": "-",
                "lat": 22.907169,
                "lng": 120.220654
            },
            {
                "name": "(高雄市)統一超商：仁富",
                "address": "高雄市岡山區大仁路138號",
                "link": "http://maps.google.com.tw/maps?q=高雄市岡山區大仁路138號",
                "tel": "-",
                "lat": 22.8043308,
                "lng": 120.3014525
            },
            {
                "name": "(高雄市)統一超商：文康",
                "address": "高雄市左營區新光里文康路156號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區新光里文康路156號1樓",
                "tel": "-",
                "lat": 22.6752279,
                "lng": 120.3047753
            },
            {
                "name": "(高雄市)統一超商：宏華",
                "address": "高雄市小港區松舍里漢民路829號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區松舍里漢民路829號",
                "tel": "-",
                "lat": 22.5692985,
                "lng": 120.3653168
            },
            {
                "name": "(高雄市)統一超商：金山角",
                "address": "高雄市大寮區會社里1鄰鳳林三路1之10號",
                "link": "http://maps.google.com.tw/maps?q=高雄市大寮區會社里1鄰鳳林三路1之10號",
                "tel": "-",
                "lat": 22.5924468,
                "lng": 120.4024742
            },
            {
                "name": "(高雄市)統一超商：客宭",
                "address": "高雄市鹽埕區建國四路312號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鹽埕區建國四路312號",
                "tel": "-",
                "lat": 22.6322,
                "lng": 120.2841441
            },
            {
                "name": "(高雄市)統一超商：美澄",
                "address": "高雄市鳳山區文山里八德路二段116號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區文山里八德路二段116號",
                "tel": "-",
                "lat": 22.6429963,
                "lng": 120.3550724
            },
            {
                "name": "(高雄市)統一超商：新立寧",
                "address": "高雄市三民區自立一路287號289號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區自立一路287號289號",
                "tel": "-",
                "lat": 22.642996,
                "lng": 120.296139
            },
            {
                "name": "(高雄市)統一超商：新保泰",
                "address": "高雄市鳳山區鎮南里龍成路242-1號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區鎮南里龍成路242-1號",
                "tel": "-",
                "lat": 22.5992541,
                "lng": 120.330838
            },
            {
                "name": "(高雄市)雄大書局：鼎山店",
                "address": "高雄市三民區鼎山街290號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區鼎山街290號",
                "tel": "07-3943135",
                "lat": 22.6584517,
                "lng": 120.3217413
            },
            {
                "name": "(高雄市)雄大書局：鳳山店",
                "address": "高雄市鳳山區南榮路161號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區南榮路161號",
                "tel": "07-7712828",
                "lat": 22.6017381,
                "lng": 120.3363889
            },
            {
                "name": "(高雄市)鼎美玩具：左營新光",
                "address": "高雄市左營區高鐵路123號5樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區高鐵路123號5樓",
                "tel": "07-9741201",
                "lat": 22.6878245,
                "lng": 120.3092324
            },
            {
                "name": "(高雄市)鼎美玩具：高雄新光",
                "address": "高雄市前鎮區三多三路213號8樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區三多三路213號8樓",
                "tel": "07-9743697",
                "lat": 22.6143845,
                "lng": 120.3067471
            },
            {
                "name": "(高雄市)鼎美玩具：漢神巨蛋",
                "address": "高雄市左營區博愛二路777號6樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區博愛二路777號6樓",
                "tel": "07-9741200",
                "lat": 22.6697552,
                "lng": 120.3023717
            },
            {
                "name": "(高雄市)蟲之森",
                "address": "高雄市鼓山區龍德路45號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鼓山區龍德路45號",
                "tel": "07-5529255",
                "lat": 22.654131,
                "lng": 120.30189
            },
            {
                "name": "(高雄市)瀚林文化廣場：自由店",
                "address": "高雄市左營區自由三路296號",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區自由三路296號",
                "tel": "07-3457890",
                "lat": 22.6743324,
                "lng": 120.3122937
            },
            {
                "name": "(高雄市)101文具：高雄桂林店",
                "address": "高雄市小港區桂林里孔鳳路557號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區桂林里孔鳳路557號",
                "tel": "07-793-2317",
                "lat": 22.5834683,
                "lng": 120.3586076
            },
            {
                "name": "(高雄市)瀚林文化廣場：天祥店",
                "address": "高雄市三民區天祥一路90號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區天祥一路90號",
                "tel": "07-359-7631",
                "lat": 22.6675027,
                "lng": 120.3206194
            },
            {
                "name": "(高雄市)101文具：鹽埕店",
                "address": "高雄市鹽埕區大智路122號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鹽埕區大智路122號",
                "tel": "(07)521-5101",
                "lat": 22.6230103,
                "lng": 120.2864617
            },
            {
                "name": "(高雄市)玩具e哥：高雄楠梓店",
                "address": "高雄市楠梓區藍昌路370號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區藍昌路370號1樓",
                "tel": "07-972-1270",
                "lat": 22.7257117,
                "lng": 120.2918058
            },
            {
                "name": "(高雄市)瀚林文化廣場：右昌店",
                "address": "高雄市楠梓區右昌街50號",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區右昌街50號",
                "tel": "07-364-1699",
                "lat": 22.709633,
                "lng": 120.292058
            },
            {
                "name": "(高雄市)HAPPY100：高雄夢時代店",
                "address": "高雄市前鎮區中華五路789號9",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區中華五路789號9",
                "tel": "07-9703399",
                "lat": 22.5949041,
                "lng": 120.3066113
            },
            {
                "name": "(高雄市)統一超商：牛潮埔",
                "address": "高雄市鳳山區鎮北里鳳北路60之17號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區鎮北里鳳北路60之17號",
                "tel": "-",
                "lat": 22.6411033,
                "lng": 120.367261
            },
            {
                "name": "(高雄市)統一超商：達仁",
                "address": "高雄市三民區吉林街68號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區吉林街68號",
                "tel": "-",
                "lat": 22.641849,
                "lng": 120.306261
            },
            {
                "name": "(高雄市)統一超商：鳳埤",
                "address": "高雄市鳳山區過埤里過埤路170號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區過埤里過埤路170號",
                "tel": "-",
                "lat": 22.5903627,
                "lng": 120.3630458
            },
            {
                "name": "(高雄市)玩具e哥：高雄文衡店",
                "address": "高雄市鳳山區文衡路259號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區文衡路259號1樓",
                "tel": "07-976-9997",
                "lat": 22.6400561,
                "lng": 120.3543397
            },
            {
                "name": "(高雄市)TOYWORLD：高雄明華店",
                "address": "高雄市左營區博愛二路320號3樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區博愛二路320號3樓",
                "tel": "07-976-6965",
                "lat": 22.6637641,
                "lng": 120.3036624
            },
            {
                "name": "(高雄市)TOYWOLRD：澄清佳瑪",
                "address": "高雄市三民區澄清路339號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區澄清路339號1樓",
                "tel": "07- 9768066",
                "lat": 22.6380311,
                "lng": 120.3446507
            },
            {
                "name": "(高雄市)FUNBOX：義享天地",
                "address": "高雄市鼓山區大順一路115號5樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市鼓山區大順一路115號5樓",
                "tel": "07-550-7467",
                "lat": 22.6550842,
                "lng": 120.3065506
            },
            {
                "name": "(高雄市)統一超商：新茄萣",
                "address": "高雄市茄萣區茄萣路二段403號",
                "link": "http://maps.google.com.tw/maps?q=高雄市茄萣區茄萣路二段403號",
                "tel": "07-6900544",
                "lat": 22.9065748,
                "lng": 120.1835883
            },
            {
                "name": "(高雄市)統一超商：超全",
                "address": "高雄市鳳山區海洋一路31號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區海洋一路31號",
                "tel": "-",
                "lat": 22.6098913,
                "lng": 120.3424957
            },
            {
                "name": "(高雄市)統一超商：龍順",
                "address": "高雄市鼓山區龍德路87號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鼓山區龍德路87號",
                "tel": "07-5523961",
                "lat": 22.6540362,
                "lng": 120.3011208
            },
            {
                "name": "(高雄市)統一超商：雙興",
                "address": "高雄市三民區正興路1號3號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區正興路1號3號",
                "tel": "07-3925474",
                "lat": 22.6460558,
                "lng": 120.3230519
            },
            {
                "name": "(高雄市)統一超商：長青",
                "address": "高雄市鳥松區鳥松里大智路5號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳥松區鳥松里大智路5號",
                "tel": "07-7327025",
                "lat": 22.659132,
                "lng": 120.3612123
            },
            {
                "name": "(高雄市)玩具e哥：高雄建工店",
                "address": "高雄市三民區建工路405號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區建工路405號",
                "tel": "07-9721770",
                "lat": 22.6520786,
                "lng": 120.3293106
            },
            {
                "name": "(高雄市)FUNBOX：大魯閣新光",
                "address": "高雄市前鎮區中山四路100號2F(02023)",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區中山四路100號2F(02023)",
                "tel": "07-7911227",
                "lat": 22.5837753,
                "lng": 120.3291928
            },
            {
                "name": "(高雄市)統一超商：九曲堂",
                "address": "高雄市大樹區久堂路城隍巷15之8號",
                "link": "http://maps.google.com.tw/maps?q=高雄市大樹區久堂路城隍巷15之8號",
                "tel": "-",
                "lat": 22.659364,
                "lng": 120.4212579
            },
            {
                "name": "(高雄市)TOYWORLD：岡山秀泰",
                "address": "高雄市岡山區大遼里捷安路1巷2號",
                "link": "http://maps.google.com.tw/maps?q=高雄市岡山區大遼里捷安路1巷2號",
                "tel": "-",
                "lat": 22.7821898,
                "lng": 120.3003148
            },
            {
                "name": "(高雄市)玩具e哥：光華家樂福",
                "address": "高雄市前鎮區光華二路157號商店街",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區光華二路157號商店街",
                "tel": "-",
                "lat": 22.6112273,
                "lng": 120.3173351
            },
            {
                "name": "(高雄市)統一超商：高昌",
                "address": "高雄市楠梓區創新路615號",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區創新路615號",
                "tel": "-",
                "lat": 22.7471051,
                "lng": 120.330501
            },
            {
                "name": "(高雄市)統一超商：重惠",
                "address": "高雄市左營區華夏路1152號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區華夏路1152號1樓",
                "tel": "-",
                "lat": 22.6835373,
                "lng": 120.3088189
            },
            {
                "name": "(高雄市)統一超商：正港",
                "address": "高雄市梓官區智蚵里中正路186號",
                "link": "http://maps.google.com.tw/maps?q=高雄市梓官區智蚵里中正路186號",
                "tel": "-",
                "lat": 22.7289733,
                "lng": 120.2565782
            },
            {
                "name": "(高雄市)統一超商：赤山",
                "address": "高雄市仁武區仁孝路368號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市仁武區仁孝路368號1樓",
                "tel": "-",
                "lat": 22.6748181,
                "lng": 120.3481127
            },
            {
                "name": "(高雄市)統一超商：明仁",
                "address": "高雄市三民區鼎泰里明仁路8號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區鼎泰里明仁路8號",
                "tel": "-",
                "lat": 22.6603179,
                "lng": 120.3142816
            },
            {
                "name": "(高雄市)統一超商：松興",
                "address": "高雄市小港區高鳳路34-3號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區高鳳路34-3號",
                "tel": "-",
                "lat": 22.5742112,
                "lng": 120.371473
            },
            {
                "name": "(高雄市)統一超商：新三華",
                "address": "高雄市新興區中東里復興一路72號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市新興區中東里復興一路72號1樓",
                "tel": "-",
                "lat": 22.6329208,
                "lng": 120.3085197
            },
            {
                "name": "(高雄市)統一超商：銀川",
                "address": "高雄市鼓山區鼓山三路8-25號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市鼓山區鼓山三路8-25號1樓",
                "tel": "-",
                "lat": 22.649178,
                "lng": 120.2769056
            },
            {
                "name": "(高雄市)統一超商：鳳儀",
                "address": "高雄市鳳山區頂庄路209號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區頂庄路209號",
                "tel": "-",
                "lat": 22.5882275,
                "lng": 120.3602362
            },
            {
                "name": "(高雄市)統一超商：鑫漢王",
                "address": "高雄市鹽埕區港都里五福四路265號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市鹽埕區港都里五福四路265號1樓",
                "tel": "-",
                "lat": 22.6247654,
                "lng": 120.2808487
            },
            {
                "name": "(高雄市)101文具：陽明店",
                "address": "高雄市三民區陽明路188號",
                "link": "http://maps.google.com.tw/maps?q=高雄市三民區陽明路188號",
                "tel": "07-387-6058",
                "lat": 22.64192,
                "lng": 120.3421318
            },
            {
                "name": "(高雄市)FUNBOX：高雄SOGO",
                "address": "高雄市前鎮區三多三路217號7樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區三多三路217號7樓",
                "tel": "07-3352535",
                "lat": 22.6142319,
                "lng": 120.306026
            },
            {
                "name": "(高雄市)統一超商：艾文",
                "address": "高雄市林園區東林西路99號101號",
                "link": "http://maps.google.com.tw/maps?q=高雄市林園區東林西路99號101號",
                "tel": "-",
                "lat": 22.5037435,
                "lng": 120.3931462
            },
            {
                "name": "(高雄市)統一超商：新東專",
                "address": "高雄市湖內區湖東里中山路1段229號",
                "link": "http://maps.google.com.tw/maps?q=高雄市湖內區湖東里中山路1段229號",
                "tel": "-",
                "lat": 22.8725902,
                "lng": 120.2546442
            },
            {
                "name": "(高雄市)玩具e哥：家福鳳山店",
                "address": "高雄市鳳山區中山西路236號2樓 美食街",
                "link": "http://maps.google.com.tw/maps?q=高雄市鳳山區中山西路236號2樓 美食街",
                "tel": "-",
                "lat": 22.6285692,
                "lng": 120.3480502
            },
            {
                "name": "(高雄市)全家：高雄天誠店",
                "address": "高雄市鼓山區裕誠路1900號",
                "link": "http://maps.google.com.tw/maps?q=高雄市鼓山區裕誠路1900號",
                "tel": "-",
                "lat": 22.6599869,
                "lng": 120.2939961
            },
            {
                "name": "(高雄市)全家：高雄鄭和店",
                "address": "高雄市前鎮區鄭和南路420-1號",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區鄭和南路420-1號",
                "tel": "-",
                "lat": 22.6063572,
                "lng": 120.3151193
            },
            {
                "name": "(高雄市)統一超商：惠豐",
                "address": "高雄市楠梓區壽豐路517號519號521號",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區壽豐路517號519號521號",
                "tel": "-",
                "lat": 22.7239964,
                "lng": 120.2940561
            },
            {
                "name": "(高雄市)玩具e哥：新楠家樂福",
                "address": "高雄市楠梓區土庫一路60號B1商店街",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區土庫一路60號B1商店街",
                "tel": "07-971-5550",
                "lat": 22.736215,
                "lng": 120.331072
            },
            {
                "name": "(高雄市)玩具反斗城：義大店",
                "address": "高雄市大樹區學城路一段12號A區B1",
                "link": "http://maps.google.com.tw/maps?q=高雄市大樹區學城路一段12號A區B1",
                "tel": "07-656-9228",
                "lat": 22.7298377,
                "lng": 120.4067286
            },
            {
                "name": "(高雄市)統一超商：管仲",
                "address": "高雄市前鎮區管仲路20號",
                "link": "http://maps.google.com.tw/maps?q=高雄市前鎮區管仲路20號",
                "tel": "-",
                "lat": 22.60628,
                "lng": 120.312324
            },
            {
                "name": "(高雄市)統一超商：觀雲",
                "address": "高雄市小港區港平路29號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區港平路29號",
                "tel": "-",
                "lat": 22.5649911,
                "lng": 120.3364727
            },
            {
                "name": "(高雄市)統一超商：港后",
                "address": "高雄市小港區平和路156號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區平和路156號",
                "tel": "-",
                "lat": 22.567277,
                "lng": 120.332135
            },
            {
                "name": "(高雄市)統一超商：復橫",
                "address": "高雄市新興區復興一路28號30號32號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市新興區復興一路28號30號32號1樓",
                "tel": "-",
                "lat": 22.6294505,
                "lng": 120.308229
            },
            {
                "name": "(高雄市)統一超商：六龜",
                "address": "高雄市六龜區光復路98號",
                "link": "http://maps.google.com.tw/maps?q=高雄市六龜區光復路98號",
                "tel": "-",
                "lat": 22.9957741,
                "lng": 120.6347642
            },
            {
                "name": "(高雄市)全家：路竹一甲店",
                "address": "高雄市路竹區大仁路326號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市路竹區大仁路326號1樓",
                "tel": "-",
                "lat": 22.8711336,
                "lng": 120.2708427
            },
            {
                "name": "(高雄市)統一超商：武漢",
                "address": "高雄市苓雅區武漢街72號",
                "link": "http://maps.google.com.tw/maps?q=高雄市苓雅區武漢街72號",
                "tel": "-",
                "lat": 22.6208392,
                "lng": 120.3283817
            },
            {
                "name": "(高雄市)統一超商：路好",
                "address": "高雄市路竹區大社路162號",
                "link": "http://maps.google.com.tw/maps?q=高雄市路竹區大社路162號",
                "tel": "-",
                "lat": 22.8652045,
                "lng": 120.264366
            },
            {
                "name": "(高雄市)玩具e哥：家福漢民店",
                "address": "高雄市小港區漢民路798號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區漢民路798號1樓",
                "tel": "-",
                "lat": 22.5684899,
                "lng": 120.3643142
            },
            {
                "name": "(高雄市)萊爾富：仁武仁春市場",
                "address": "高雄市仁武區中正路93號、95號",
                "link": "http://maps.google.com.tw/maps?q=高雄市仁武區中正路93號、95號",
                "tel": "-",
                "lat": 22.7015489,
                "lng": 120.3475124
            },
            {
                "name": "(高雄市)TOYWORLD：左營新光HOBBY WORLD",
                "address": "高雄市左營區高鐵路115號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市左營區高鐵路115號1樓",
                "tel": "07-9741203",
                "lat": 22.6877488,
                "lng": 120.3093913
            },
            {
                "name": "(高雄市)統一超商：愛之船",
                "address": "高雄市前金區河東路165號",
                "link": "http://maps.google.com.tw/maps?q=高雄市前金區河東路165號",
                "tel": "-",
                "lat": 22.623047,
                "lng": 120.29094
            },
            {
                "name": "(高雄市)統一超商：華秀",
                "address": "高雄市小港區山明路1之36號",
                "link": "http://maps.google.com.tw/maps?q=高雄市小港區山明路1之36號",
                "tel": "-",
                "lat": 22.5655021,
                "lng": 120.3698298
            },
            {
                "name": "(高雄市)統一超商：惠民",
                "address": "高雄市楠梓區翠屏里惠民路88號1樓",
                "link": "http://maps.google.com.tw/maps?q=高雄市楠梓區翠屏里惠民路88號1樓",
                "tel": "-",
                "lat": 22.7243407,
                "lng": 120.2974812
            },
            {
                "name": "(屏東縣)FUNBOX：屏東太平洋",
                "address": "屏東縣屏東市中正路72號5樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市中正路72號5樓",
                "tel": "08-7330150",
                "lat": 22.6741739,
                "lng": 120.4901696
            },
            {
                "name": "(屏東縣)TOYWORLD：屏東驛站",
                "address": "屏東縣屏東市擇仁里公勇路62號1樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市擇仁里公勇路62號1樓",
                "tel": "08-820-3300",
                "lat": 22.6689314,
                "lng": 120.4855623
            },
            {
                "name": "(屏東縣)TOYWORLD：潮州驛站",
                "address": "屏東縣潮州鎮信義路111號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣潮州鎮信義路111號",
                "tel": "08-820-3350",
                "lat": 22.550009,
                "lng": 120.536108
            },
            {
                "name": "(屏東縣)統一超商：吉春",
                "address": "屏東縣恆春鎮恆南路1巷6之1號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣恆春鎮恆南路1巷6之1號",
                "tel": "-",
                "lat": 21.986402,
                "lng": 120.749407
            },
            {
                "name": "(屏東縣)統一超商：新樂興",
                "address": "屏東縣屏東市興樂里杭州街30號1樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市興樂里杭州街30號1樓",
                "tel": "-",
                "lat": 22.6738905,
                "lng": 120.4915979
            },
            {
                "name": "(屏東縣)統一超商：廣得亨",
                "address": "屏東縣萬丹鄉廈北村南北路二段289號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣萬丹鄉廈北村南北路二段289號",
                "tel": "-",
                "lat": 22.5987502,
                "lng": 120.4665278
            },
            {
                "name": "(屏東縣)統一超商：鎮海",
                "address": "屏東縣東港鎮鎮海里鎮海路1-100號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣東港鎮鎮海里鎮海路1-100號",
                "tel": "-",
                "lat": 22.4626213,
                "lng": 120.4439018
            },
            {
                "name": "(屏東縣)FUNBOX：屏東環球",
                "address": "屏東縣屏東市仁愛路90號4樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市仁愛路90號4樓",
                "tel": "08-7668830",
                "lat": 22.6731158,
                "lng": 120.4939575
            },
            {
                "name": "(屏東縣)統一超商：順越",
                "address": "屏東縣內埔鄉南寧路19、21號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣內埔鄉南寧路19、21號",
                "tel": "-",
                "lat": 22.6173719,
                "lng": 120.5653981
            },
            {
                "name": "(屏東縣)統一超商：林美",
                "address": "屏東縣林邊鄉中林路295號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣林邊鄉中林路295號",
                "tel": "-",
                "lat": 22.4384551,
                "lng": 120.5191387
            },
            {
                "name": "(屏東縣)金玉堂：內埔店",
                "address": "屏東縣內埔鄉廣濟路349號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣內埔鄉廣濟路349號",
                "tel": "-",
                "lat": 22.6166865,
                "lng": 120.5656563
            },
            {
                "name": "(屏東縣)統一超商：清順",
                "address": "屏東縣潮州鎮光華里光華路153號1樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣潮州鎮光華里光華路153號1樓",
                "tel": "-",
                "lat": 22.5452632,
                "lng": 120.5434188
            },
            {
                "name": "(屏東縣)統一超商：瑞光",
                "address": "屏東縣屏東市瑞光里民生東路58-2號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市瑞光里民生東路58-2號",
                "tel": "-",
                "lat": 22.6601808,
                "lng": 120.5110851
            },
            {
                "name": "(屏東縣)統一超商：鼎東",
                "address": "屏東縣東港鎮興東里中正路二段491號1樓",
                "link": "http://maps.google.com.tw/maps?q=屏東縣東港鎮興東里中正路二段491號1樓",
                "tel": "-",
                "lat": 22.4809283,
                "lng": 120.4669772
            },
            {
                "name": "(屏東縣)全家：高樹農會店",
                "address": "屏東縣高樹鄉南興路141-5號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣高樹鄉南興路141-5號",
                "tel": "-",
                "lat": 22.8240159,
                "lng": 120.6012238
            },
            {
                "name": "(屏東縣)統一超商：崇蘭",
                "address": "屏東縣屏東市潭漧里廣東路1588、1590號",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市潭漧里廣東路1588、1590號",
                "tel": "-",
                "lat": 22.6827064,
                "lng": 120.4747703
            },
            {
                "name": "(屏東縣)玩具e哥：屏東家福店",
                "address": "屏東縣屏東市仁愛路188號B1",
                "link": "http://maps.google.com.tw/maps?q=屏東縣屏東市仁愛路188號B1",
                "tel": "-",
                "lat": 22.6828726,
                "lng": 120.4979963
            },
            {
                "name": "(臺東縣)統一超商：成貞",
                "address": "臺東縣臺東市豐年里中興路三段399號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市豐年里中興路三段399號1樓",
                "tel": "-",
                "lat": 22.771196,
                "lng": 121.1098379
            },
            {
                "name": "(臺東縣)101文具：台東新生店",
                "address": "臺東縣臺東市新生路268號之2",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市新生路268號之2",
                "tel": "(08)933-8101",
                "lat": 22.7556794,
                "lng": 121.1448188
            },
            {
                "name": "(臺東縣)FUNBOX：台東秀泰",
                "address": "臺東縣臺東市新生路93號",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市新生路93號",
                "tel": "089-350211",
                "lat": 22.7523536,
                "lng": 121.147811
            },
            {
                "name": "(臺東縣)統一超商：仁毅",
                "address": "臺東縣臺東市新生路680號1樓",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市新生路680號1樓",
                "tel": "-",
                "lat": 22.7635596,
                "lng": 121.1360761
            },
            {
                "name": "(臺東縣)統一超商：冠美",
                "address": "臺東縣臺東市仁昌街148號",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市仁昌街148號",
                "tel": "-",
                "lat": 22.7492908,
                "lng": 121.133573
            },
            {
                "name": "(臺東縣)統一超商：東漢",
                "address": "臺東縣臺東市正氣北路182號",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市正氣北路182號",
                "tel": "-",
                "lat": 22.7559911,
                "lng": 121.1388739
            },
            {
                "name": "(臺東縣)玩具e哥：台東大潤發",
                "address": "臺東縣臺東市中興路3段592號B1",
                "link": "http://maps.google.com.tw/maps?q=臺東縣臺東市中興路3段592號B1",
                "tel": "089-71-9295",
                "lat": 22.772708,
                "lng": 121.1062513
            },
            {
                "name": "(花蓮縣)FUNBOX：花蓮遠東",
                "address": "花蓮縣花蓮市和平路581號2樓",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣花蓮市和平路581號2樓",
                "tel": "03-8330064",
                "lat": 23.9781431,
                "lng": 121.5996077
            },
            {
                "name": "(花蓮縣)老虎歡樂世界：花蓮愛買店",
                "address": "花蓮縣花蓮市和平路581號B1",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣花蓮市和平路581號B1",
                "tel": "-",
                "lat": 23.9781431,
                "lng": 121.5996077
            },
            {
                "name": "(花蓮縣)玩具e哥：花蓮和平店",
                "address": "花蓮縣花蓮市和平路449號",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣花蓮市和平路449號",
                "tel": "03-8909122",
                "lat": 23.9756749,
                "lng": 121.6019789
            },
            {
                "name": "(花蓮縣)統一超商：蓮慶",
                "address": "花蓮縣花蓮市林森路160號1樓",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣花蓮市林森路160號1樓",
                "tel": "-",
                "lat": 23.9779391,
                "lng": 121.6005483
            },
            {
                "name": "(花蓮縣)玩具e哥：家福花蓮店",
                "address": "花蓮縣新城鄉嘉里路15號1樓",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣新城鄉嘉里路15號1樓",
                "tel": "-",
                "lat": 24.0156018,
                "lng": 121.6103187
            },
            {
                "name": "(花蓮縣)統一超商：文景",
                "address": "花蓮縣吉安鄉中山路二段73號",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣吉安鄉中山路二段73號",
                "tel": "-",
                "lat": 23.9709049,
                "lng": 121.5832983
            },
            {
                "name": "(花蓮縣)統一超商：富翔",
                "address": "花蓮縣吉安鄉東昌村海岸路77號",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣吉安鄉東昌村海岸路77號",
                "tel": "-",
                "lat": 23.9622558,
                "lng": 121.5913921
            },
            {
                "name": "(花蓮縣)統一超商：蓮恆",
                "address": "花蓮縣吉安鄉北昌村建國路一段51號",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣吉安鄉北昌村建國路一段51號",
                "tel": "-",
                "lat": 23.98482,
                "lng": 121.5956154
            },
            {
                "name": "(花蓮縣)統一超商：蓮恆",
                "address": "花蓮縣吉安鄉建國路1段51號",
                "link": "http://maps.google.com.tw/maps?q=花蓮縣吉安鄉建國路1段51號",
                "tel": "-",
                "lat": 23.9847018,
                "lng": 121.5969012
            },
            {
                "name": "(宜蘭縣)FUNBOX：新月廣場",
                "address": "宜蘭縣宜蘭市民權路二段38巷6號3F",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣宜蘭市民權路二段38巷6號3F",
                "tel": "03-9324857",
                "lat": 24.7541808,
                "lng": 121.7508165
            },
            {
                "name": "(宜蘭縣)玩具e哥：羅東店",
                "address": "宜蘭縣羅東鎮興東路242之1號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣羅東鎮興東路242之1號",
                "tel": "03-9109897",
                "lat": 24.6829538,
                "lng": 121.770172
            },
            {
                "name": "(宜蘭縣)統一超商：新羅興",
                "address": "宜蘭縣羅東鎮興東路23之2號1樓2",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣羅東鎮興東路23之2號1樓2",
                "tel": "-",
                "lat": 24.6769966,
                "lng": 121.7679856
            },
            {
                "name": "(宜蘭縣)統一超商：金站",
                "address": "宜蘭縣羅東鎮公正路31號1樓",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣羅東鎮公正路31號1樓",
                "tel": "-",
                "lat": 24.6778145,
                "lng": 121.7736649
            },
            {
                "name": "(宜蘭縣)玩轉地球",
                "address": "宜蘭縣宜蘭市女中路三段613號1樓",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣宜蘭市女中路三段613號1樓",
                "tel": "-",
                "lat": 24.747981,
                "lng": 121.7334835
            },
            {
                "name": "(宜蘭縣)統一超商：嘉融",
                "address": "宜蘭縣礁溪鄉吳沙村礁溪路一段142號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣礁溪鄉吳沙村礁溪路一段142號",
                "tel": "-",
                "lat": 24.7860674,
                "lng": 121.7616745
            },
            {
                "name": "(宜蘭縣)統一超商：潤霖",
                "address": "宜蘭縣羅東鎮公正路136號1樓",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣羅東鎮公正路136號1樓",
                "tel": "-",
                "lat": 24.6786199,
                "lng": 121.7700849
            },
            {
                "name": "(宜蘭縣)統一超商：頭城",
                "address": "宜蘭縣頭城鎮青雲路三段96號1樓",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣頭城鎮青雲路三段96號1樓",
                "tel": "-",
                "lat": 24.8558859,
                "lng": 121.824191
            },
            {
                "name": "(宜蘭縣)統一超商：蘭陽",
                "address": "宜蘭縣宜蘭市中山路二段101號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣宜蘭市中山路二段101號",
                "tel": "-",
                "lat": 24.7462968,
                "lng": 121.755041
            },
            {
                "name": "(宜蘭縣)統一超商：礁溪",
                "address": "宜蘭縣礁溪鄉礁溪路4段85、87號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣礁溪鄉礁溪路4段85、87號",
                "tel": "-",
                "lat": 24.8195917,
                "lng": 121.7688544
            },
            {
                "name": "(宜蘭縣)統一超商：廣安",
                "address": "宜蘭縣冬山鄉廣興路331號333號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣冬山鄉廣興路331號333號",
                "tel": "-",
                "lat": 24.6693174,
                "lng": 121.7461143
            },
            {
                "name": "(宜蘭縣)統一超商：美功",
                "address": "宜蘭縣壯圍鄉美功路2段158號",
                "link": "http://maps.google.com.tw/maps?q=宜蘭縣壯圍鄉美功路2段158號",
                "tel": "-",
                "lat": 24.7836356,
                "lng": 121.7838077
            },
            {
                "name": "(澎湖縣)FUNBOX：昇恆昌澎湖",
                "address": "澎湖縣馬公市同和路158號3樓3-03",
                "link": "http://maps.google.com.tw/maps?q=澎湖縣馬公市同和路158號3樓3-03",
                "tel": "(06)926-5490",
                "lat": 23.56734,
                "lng": 119.572906
            }
        ];
        console.error("error")
    });
}

function loadingComplete() {
    document.getElementById('loading').style.display = "none";
}

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('用戶已經重新進入畫面！');
        // 接著寫確認了座標後要執行的事
        getNavigator();
    }
});

const crosshairs = document.getElementById('crosshairs-btn');

crosshairs.addEventListener('click', function() {
    resetNavigator();
});

function getNavigator() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        center = [lat, lng]
        marker.setLatLng(center);
    });
}

// 每十秒調用一次 getNavigator 函數
setInterval(getNavigator, 10000);

function resetNavigator() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        center = [lat, lng]
        marker.setLatLng(center);
        map.panTo(center)
    });
}

function checkNavigator() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGPS, errorGPS);
    } else {
        window.alert('您的裝置不具備GPS，無法使用此功能');
        // 接著寫使用者裝置不支援位置資訊時要執行的事
    }
}

// 跟使用者要位置
function successGPS(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    center = [lat, lng];
    // 接著寫確認了座標後要執行的事
    setMap(center);
};

function errorGPS() {
    window.alert('無法判斷您的所在位置，無法使用此功能。預設地點將為高雄85大樓');
    // 接著寫使用者「封鎖」位置資訊請求後要執行的事
    setMap(center)
}

function setMap(center) {
    // *** 放置地圖
    L.tileLayer.provider('CartoDB.Voyager', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20
    }).addTo(map);
    map.setView(center, zoom);

    var svg = '<svg id="mePin" xmlns="http://www.w3.org/2000/svg" width="43.3" height="42.4" viewBox="0 0 43.3 42.4"><path class="ring_outer" fill="#878787" d="M28.6 23c6.1 1.4 10.4 4.4 10.4 8 0 4.7-7.7 8.6-17.3 8.6-9.6 0-17.4-3.9-17.4-8.6 0-3.5 4.2-6.5 10.3-7.9.7-.1-.4-1.5-1.3-1.3C5.5 23.4 0 27.2 0 31.7c0 6 9.7 10.7 21.7 10.7s21.6-4.8 21.6-10.7c0-4.6-5.7-8.4-13.7-10-.8-.2-1.8 1.2-1 1.4z"/><path class="ring_inner" fill="#5F5F5F" d="M27 25.8c2 .7 3.3 1.8 3.3 3 0 2.2-3.7 3.9-8.3 3.9-4.6 0-8.3-1.7-8.3-3.8 0-1 .8-1.9 2.2-2.6.6-.3-.3-2-1-1.6-2.8 1-4.6 2.7-4.6 4.6 0 3.2 5.1 5.7 11.4 5.7 6.2 0 11.3-2.5 11.3-5.7 0-2-2.1-3.9-5.4-5-.7-.1-1.2 1.3-.7 1.5z"/><path class="mePin" d="M21.6 8.1a4 4 0 0 0 4-4 4 4 0 0 0-4-4.1 4.1 4.1 0 0 0-4.1 4 4 4 0 0 0 4 4.1zm4.9 8v-3.7c0-1.2-.6-2.2-1.7-2.6-1-.4-1.9-.6-2.8-.6h-.9c-1 0-2 .2-2.8.6-1.2.4-1.8 1.4-1.8 2.6V16c0 .9 0 2 .2 2.8.2.8.8 1.5 1 2.3l.2.3.4 1 .1.8.2.7.6 3.6c-.6.3-.9.7-.9 1.2 0 .9 1.4 1.7 3.2 1.7 1.8 0 3.2-.8 3.2-1.7 0-.5-.3-.9-.8-1.2l.6-3.6.1-.7.2-.8.3-1 .1-.3c.3-.8 1-1.5 1.1-2.3.2-.8.2-2 .2-2.8z" fill="#282828"/></svg>';

    var meIcon = L.divIcon({
		className: "leaflet-data-marker",
        html: svg.replace('#','%23'),
        iconAnchor  : [22, 28], // 錨點
        iconSize    : [10, 10], // 大小
    });

    marker = L.marker(center, {icon: meIcon}).addTo(map).bindPopup('目前位置');

    var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false
    });

    for(let i =0;tableData.length>i;i++){
        markers.addLayer(
            L.marker([tableData[i].lat, tableData[i].lng]).bindPopup(
                `<figure class="text-end">
                    <blockquote class="blockquote">
                        <p>${tableData[i].name}</p>
                    </blockquote>
                    <p class="pb-2">${tableData[i].address}</p>
                    <figcaption class="blockquote-footer">
                        <a data-v-a5e48eb8="" href="http://maps.google.com.tw/maps?q=${tableData[i].address}${tableData[i].name}" target="_blank" class="text-primary flex-shrink-0 h4">
                            Google 地圖
                        </a>
                    </figcaption>
                </figure>`)
        );
    }

    map.addLayer(markers);
}
