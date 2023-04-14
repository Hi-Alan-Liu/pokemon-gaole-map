let center;
let map;

window.onload = async () => {
    checkNavigator();
    loadingComplete();
}

function loadingComplete() {
    document.getElementById('loading').style.display = "none";
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
    center = [22.6119254,120.2976106];
    // 接著寫使用者「封鎖」位置資訊請求後要執行的事
    setMap(center)
}

function setMap(center) {
    // *** 放置地圖
    let zoom = 16; // 0 - 18
    let map = L.map('map', {
        zoom: 0,
        zoomControl: false
    }).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.Control.zoomHome().addTo(map);

    var svg = '<svg id="mePin" xmlns="http://www.w3.org/2000/svg" width="43.3" height="42.4" viewBox="0 0 43.3 42.4"><path class="ring_outer" fill="#878787" d="M28.6 23c6.1 1.4 10.4 4.4 10.4 8 0 4.7-7.7 8.6-17.3 8.6-9.6 0-17.4-3.9-17.4-8.6 0-3.5 4.2-6.5 10.3-7.9.7-.1-.4-1.5-1.3-1.3C5.5 23.4 0 27.2 0 31.7c0 6 9.7 10.7 21.7 10.7s21.6-4.8 21.6-10.7c0-4.6-5.7-8.4-13.7-10-.8-.2-1.8 1.2-1 1.4z"/><path class="ring_inner" fill="#5F5F5F" d="M27 25.8c2 .7 3.3 1.8 3.3 3 0 2.2-3.7 3.9-8.3 3.9-4.6 0-8.3-1.7-8.3-3.8 0-1 .8-1.9 2.2-2.6.6-.3-.3-2-1-1.6-2.8 1-4.6 2.7-4.6 4.6 0 3.2 5.1 5.7 11.4 5.7 6.2 0 11.3-2.5 11.3-5.7 0-2-2.1-3.9-5.4-5-.7-.1-1.2 1.3-.7 1.5z"/><path class="mePin" d="M21.6 8.1a4 4 0 0 0 4-4 4 4 0 0 0-4-4.1 4.1 4.1 0 0 0-4.1 4 4 4 0 0 0 4 4.1zm4.9 8v-3.7c0-1.2-.6-2.2-1.7-2.6-1-.4-1.9-.6-2.8-.6h-.9c-1 0-2 .2-2.8.6-1.2.4-1.8 1.4-1.8 2.6V16c0 .9 0 2 .2 2.8.2.8.8 1.5 1 2.3l.2.3.4 1 .1.8.2.7.6 3.6c-.6.3-.9.7-.9 1.2 0 .9 1.4 1.7 3.2 1.7 1.8 0 3.2-.8 3.2-1.7 0-.5-.3-.9-.8-1.2l.6-3.6.1-.7.2-.8.3-1 .1-.3c.3-.8 1-1.5 1.1-2.3.2-.8.2-2 .2-2.8z" fill="#282828"/></svg>';

    var meIcon = L.divIcon({
		className: "leaflet-data-marker",
        html: svg.replace('#','%23'),
        iconAnchor  : [22, 28], // 錨點
        iconSize    : [10, 10], // 大小
    });

    const marker1 = L.marker(center, {icon: meIcon}).addTo(map).bindPopup('目前位置');

    var data = [
        {'name': 'FUNBOX：大立百貨', lat:22.6218004, lng: 120.2976818, 'address': '高雄市前金區五福三路59號5樓'}
    ]

    for(let i =0;data.length>i;i++){
        L.marker([data[i].lat, data[i].lng]).addTo(map).bindPopup(
            `<figure class="text-end">
                <blockquote class="blockquote">
                    <p>${data[i].name}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                    <a data-v-a5e48eb8="" href="http://maps.google.com.tw/maps?q=${data[i].address}" target="_blank" class="text-secondary flex-shrink-0">＞ 地圖</a>
                </figcaption>
            </figure>`);
    }
}
