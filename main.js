// Aggiungi il form HTML nel tuo file HTML (inseriscilo sopra o vicino al widget esistente):
/*
<div id="search-container">
    <input type="text" id="search-input" placeholder="Cerca una città...">
    <button id="search-button">Cerca</button>
</div>
*/

// Cattura gli elementi del DOM
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var widget = document.getElementById("widget");

// Aggiungi un listener per il click sul pulsante di ricerca
searchButton.addEventListener("click", function () {
    var city = searchInput.value.trim(); // Ottieni il valore dell'input
    if (city) {
        searchCityOnMap(city);
    } else {
        alert("Per favore, inserisci una città!");
    }
});

// Funzione per cercare una città usando OpenStreetMap Nominatim API e ottenere i dati meteo
function searchCityOnMap(city) {
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella ricerca della città");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                updateMap(lat, lon, city); // Aggiorna la mappa con le nuove coordinate
                fetchWeather(lat, lon, city); // Recupera i dati meteo
            } else {
                alert("Città non trovata. Prova un altro nome!");
            }
        })
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            alert("Si è verificato un errore durante la ricerca della città.");
        });
}

// Funzione per aggiornare la mappa con le nuove coordinate
function updateMap(lat, lon, city) {
    map.setView([lat, lon], 13); // Centra la mappa sulla nuova posizione
    L.marker([lat, lon]).addTo(map) // Aggiungi un marker
        .bindPopup(`Hai cercato: <strong>${city}</strong><br>Latitudine: ${lat}<br>Longitudine: ${lon}`)
        .openPopup();
}

// Funzione per ottenere i dati meteo
function fetchWeather(lat, lon, city) {
    var key = "c10b86631ad7400dc4ed3982eebd35ac";
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel recupero dei dati meteo");
            }
            return response.json();
        })
        .then(data => {
            updateWidget(data, city); // Aggiorna il widget meteo
        })
        .catch(error => {
            console.error("Errore nella richiesta meteo:", error);
            alert("Impossibile recuperare i dati meteo per questa posizione.");
        });
}

// Funzione per aggiornare il widget con i dati meteo
function updateWidget(data, city) {
    // Map weather conditions to Font Awesome icons
    var weatherIcon = "";
    var weatherCondition = data.weather[0].main.toLowerCase();

    switch (weatherCondition) {
        case "clear":
            weatherIcon = '<i class="fas fa-sun"></i>'; // Sun icon
            break;
        case "clouds":
            weatherIcon = '<i class="fas fa-cloud"></i>'; // Cloud icon
            break;
        case "rain":
            weatherIcon = '<i class="fas fa-cloud-rain"></i>'; // Rain icon
            break;
        case "snow":
            weatherIcon = '<i class="fas fa-snowflake"></i>'; // Snow icon
            break;
        case "thunderstorm":
            weatherIcon = '<i class="fas fa-bolt"></i>'; // Thunderstorm icon
            break;
        default:
            weatherIcon = '<i class="fas fa-question"></i>'; // Default icon
    }

    // Update the widget HTML to include the weather icon
    widget.innerHTML = `
        <h3>Meteo in ${city}</h3>
        <div style="font-size: 24px;">${weatherIcon}</div>
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
                layer.bindPopup(`<strong>Quartiere:</strong> ${feature.properties["NIL"]}`);
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
