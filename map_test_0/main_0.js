var key = "c10b86631ad7400dc4ed3982eebd35ac";
var city = "Milano";
var url = `https://api.openweathermap.org/data/2.5/weather?lat=42.7532&lon=13.9628&appid=${key}&units=metric&q=${city}`; // Aggiunto units=metric per temperature in Celsius

// Crea l'oggetto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Configura il tipo di richiesta (GET) e l'URL
xhr.open("GET", url, true);

// Aggiungi un listener per quando la richiesta è completata
xhr.onload = function () {
    if (xhr.status === 200) {
        // Successo: Parsifica la risposta
        var response = JSON.parse(xhr.responseText);
        console.log(response); // Log della risposta

        // Aggiorna il widget con i dati JSON
        updateWidget(response);
    } else {
        // Errore: Mostra il messaggio di errore
        document.getElementById("widget").innerHTML = `<div class="error">Error: ${xhr.status} - ${xhr.statusText}</div>`;
    }
};

// Aggiungi un listener per gestire errori di rete
xhr.onerror = function () {
    document.getElementById("widget").innerHTML = "<div class='error'>Network error</div>";
};

// Invia la richiesta
xhr.send();

// Funzione per aggiornare il widget con i dati meteo
function updateWidget(data) {
    var widget = document.getElementById("widget");
    widget.innerHTML = `<h3>Meteo in ${city}</h3>
        <p><b>Temperatura:</b> ${data.main.temp} °C</p>
        <p><b>Descrizione:</b> ${data.weather[0].description}</p>
        <p><b>Umidità:</b> ${data.main.humidity}%</p>
        <p><b>Velocità del vento:</b> ${data.wind.speed} m/s</p>
    `;
}

// Inizializza la mappa
var map = L.map('map').setView([45.4642, 9.1900], 13); // Coordinate iniziali (latitudine, longitudine) e zoom

// Aggiungi il layer tile (piastrelle della mappa) di OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var featureService = L.esri.featureLayer({
    url: 'https://sire.rtil1s.it/server/rest/services/MEL/Cluster_Stazioni_Mobilit%C3%A0_Elettrica/MapServer'
}).addTo(map); 
console.log(featureService)

// Carica il file GeoJSON
fetch('quart.json') // Nome del file
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore nel caricamento del GeoJSON!");
        }
        return response.json();
    })
    .then(data => {
        // Aggiungi il layer GeoJSON alla mappa
        L.geoJSON(data, {
            style: feature => ({
                color: 'blue',
                weight: 1,
                fillColor: 'lightgreen',
                fillOpacity: 0.3
            }),
            onEachFeature: (feature, layer) => {
                // Aggiungi un popup con il nome del quartiere
                layer.bindPopup(`<strong>Quartiere:</strong> ${feature.properties.name}`);
            }
        }).addTo(map);
    })
    .catch(error => console.error("Errore:", error));

    
// Aggiungi un popup personalizzato cliccando sulla mappa
map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    // I metodi di L.popup() restituiscono this, permettendo di concatenarli con il method chaining.
    // Es.: setLatLng().setContent().openOn() per creare e aprire il popup in modo compatto.
    L.popup()
        .setLatLng(e.latlng)
        .setContent("Hai cliccato su:<br>Latitudine: " + lat + "<br>Longitudine: " + lng)
        .openOn(map);
});

