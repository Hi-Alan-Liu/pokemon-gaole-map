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
        maxClusterRadius: 60
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
