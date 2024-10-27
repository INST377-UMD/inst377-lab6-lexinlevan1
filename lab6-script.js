function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

async function getData(lat, long) { 
    const geoData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    .then((res) =>
        res.json()
    );

    return geoData;
}

async function makeMarker(map){ 

    for (var i = 1; i <= 3; i++) {
        var lat = getRandomInRange(30, 35, 3);
        var long = getRandomInRange(-90, -100, 3);

        L.marker([lat, long]).addTo(map);

        document.getElementById(`marker${i}`).innerHTML = `Marker ${i} Latitude: ${lat} Longitude: ${long}`;

        // get data from API 
        const geoData = await getData(lat, long);
        console.log(geoData.locality);

        document.getElementById(`marker${i}-locality`).innerHTML = `Locality: ${geoData.locality}`;

    }
}

function createMap() {
    var map = L.map('map').setView([40,-80], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // marker 1
    makeMarker(map);

}


window.onload = createMap;