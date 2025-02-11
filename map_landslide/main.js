var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            })
        })
        
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([13.8333, 42.2167]),
        zoom: 9
    })
});


fetch('json/aree_poly_abruzzo_opendata.json')
    .then(response => response.json())
    .then(data => {
        this.filterData_4 = data.features.filter(f => f.properties.nome_tipo === 'Aree con sprofondamenti diffusi')
        this.filterData_5 = data.features.filter(f => f.properties.nome_tipo === 'Aree con frane superficiali diffuse')
        this.filterData_6 = data.features.filter(f => f.properties.tipo_movimento === 'Aree con crolli/ribaltamenti diffusi')
        


        filterJson_5 = {
            "type": "FeatureCollection",
            "features": filterData_5,
            "totalFeatures": 0,
            "numberMatched": 0,
            "numberReturned": 0,
            "timeStamp": "2025-02-06T03:12:57.163Z",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        VectorSource_5 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_5, {
                featureProjection: 'EPSG:3857'
            })
        });


        vectorLayer_5 = new ol.layer.Vector({
            source: VectorSource_5,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(195, 215, 17, 0.66)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(185, 215, 17, 0.66)'
                }),
            })
        });
        map.addLayer(vectorLayer_5);


        filterJson_4 = {
            "type": "FeatureCollection",
            "features": filterData_4,
            "totalFeatures": 0,
            "numberMatched": 0,
            "numberReturned": 0,
            "timeStamp": "2025-02-06T03:12:57.163Z",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        VectorSource_4 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_4, {
                featureProjection: 'EPSG:3857'
            })
        });


        vectorLayer_4= new ol.layer.Vector({
            source: VectorSource_4,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(17, 175, 215, 0.66)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(17, 175, 215, 0.66)'
                }),
            })
        });
        map.addLayer(vectorLayer_4);

        filterJson_6 = {
            "type": "FeatureCollection",
            "features": filterData_6,
            "totalFeatures": 0,
            "numberMatched": 0,
            "numberReturned": 0,
            "timeStamp": "2025-02-06T03:12:57.163Z",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        VectorSource_6 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_6, {
                featureProjection: 'EPSG:3857'
            })
        });


        vectorLayer_6 = new ol.layer.Vector({
            source: VectorSource_6,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(17, 215, 106, 0.66)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(17, 215, 66, 0.66)'
                }),
            })
        });
        map.addLayer(vectorLayer_6);
        console.log(data)
    })
    .catch(error => console.error('Errore nel caricamento del file JSON Aree:', error));



fetch('json/frane_poly_abruzzo_opendata.json')
    .then(response => response.json())
    .then(data => {


        // accedo all'array fetaures 

        /*
        var array_iniziale = data.features
        array_iniziale.forEach(function(f) {
            if (f.properties.nome_tipo === 'Complesso'){
                console.log('Complesso')
            }
        });
        */


        var filterData = data.features.filter(f => f.properties.nome_tipo === 'Scivolamento rotazionale/traslativo')
        var filterData_1 = data.features.filter(f => f.properties.nome_tipo === 'Complesso')
        var filterData_2 = data.features.filter(f => f.properties.nome_tipo === 'Colamento lento')
        var filterData_3 = data.features.filter(f => f.properties.nome_tipo === 'Colamento rapido')

        
        var filterJson = {
            "type": "FeatureCollection",
            "features": filterData,
            "totalFeatures": 1308,
            "numberMatched": 1308,
            "numberReturned": 1308,
            "timeStamp": "2025-02-06T03:12:57.163Z",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        var filterJson_1 = {
            "type": "FeatureCollection",
            "features": filterData_1,
            "totalFeatures": 1308,
            "numberMatched": 1308,
            "numberReturned": 1308,
            "timeStamp": "2025-02-06T03:12:57.163Z",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        var filterJson_2 = {
            "type": "FeatureCollection",
            "features": filterData_2,
            "totalFeatures": 2342,
            "numberMatched": 2342,
            "numberReturned": 2342,
            "timeStamp": "",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }

        var filterJson_3 = {
            "type": "FeatureCollection",
            "features": filterData_3,
            "totalFeatures": 633,
            "numberMatched": 633,
            "numberReturned": 633,
            "timeStamp": "",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::32632"
                }
            },
            "bbox": [
                840098.0432,
                4631932.4413,
                973824.8555,
                4760013.1335
            ]
        }


        var VectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson, {
                featureProjection: 'EPSG:3857'
            })
        });

        /*
        function createVPattern() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
        
            // Dimensioni del pattern
            canvas.width = 20;
            canvas.height = 20;

            // Sfondo rosso con 70% di trasparenza (RGBA)
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Rosso con opacità al 70%
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Riempiamo tutto il canvas

            // Ruotiamo il disegno di 45 gradi
            ctx.translate(10, 10); // Spostiamo l'origine al centro
            ctx.rotate(Math.PI / 4); // Ruotiamo di 45 gradi
            ctx.translate(-10, -10); // Riportiamo l'origine indietro
        
            // Imposta il colore e lo stile della "V"
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2
        
            // Disegniamo una "V" più piccola
            ctx.beginPath();
            ctx.moveTo(3, 8);  // Punto in alto a sinistra
            ctx.lineTo(10, 15); // Punto in basso al centro
            ctx.lineTo(17, 8);  // Punto in alto a destra
            ctx.stroke();

        
            return ctx.createPattern(canvas, 'repeat');
        }
        */

        var vectorLayer = new ol.layer.Vector({
            source: VectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(215, 17, 17, 0.66)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(215, 17, 17, 0.66)'
                }),
            })
        });
        map.addLayer(vectorLayer);

        var VectorSource_1 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_1, {
                featureProjection: 'EPSG:3857'
            })
        });

        /*
        function createVPatternSlide() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
        
            // Dimensioni del pattern
            canvas.width = 20;
            canvas.height = 20;

            // Sfondo rosso con 70% di trasparenza (RGBA)
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Rosso con opacità al 70%
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Riempiamo tutto il canvas

            // Ruotiamo il disegno di 45 gradi
            ctx.translate(10, 10); // Spostiamo l'origine al centro
            ctx.rotate(Math.PI / 4); // Ruotiamo di 45 gradi
            ctx.translate(-10, -10); // Riportiamo l'origine indietro
        
            // Imposta il colore e lo stile della "V"
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2
        
            // Disegna la linea diagonale da sinistra in basso a destra in alto (/)
            ctx.beginPath();
            ctx.moveTo(0, 20);
            ctx.lineTo(20, 0);
            ctx.stroke();

            // Disegna la linea diagonale da sinistra in alto a destra in basso (\)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(20, 20);
            ctx.stroke();

        
            return ctx.createPattern(canvas, 'repeat');
        }
        */

        var vectorLayer_1 = new ol.layer.Vector({
            source: VectorSource_1,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 50, 50, 0.7)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 50, 50, 0.7)'
                })
            })
        });
        map.addLayer(vectorLayer_1);


        var VectorSource_2 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_2, {
                featureProjection: 'EPSG:3857'
            })
        });

        var vectorLayer_2 = new ol.layer.Vector({
            source: VectorSource_2,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 100, 100, 0.6)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 100, 100, 0.6)'
                })
            })
        });
        map.addLayer(vectorLayer_2);


        var VectorSource_3 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_3, {
                featureProjection: 'EPSG:3857'
            })
        });

        var vectorLayer_3 = new ol.layer.Vector({
            source: VectorSource_3,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(147, 62, 204, 0.4)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(147, 62, 204, 0.4)'
                })
            })
        });
        map.addLayer(vectorLayer_3);
    })
    .catch(error => console.error('Errore nel caricamento del file JSON Frane:', error));



    // Aggiunge evento click sulla mappa per selezionare una feature
    map.on('click', function (event) {
        let selectedFeature = null;

        // Trova la feature cliccata
        map.forEachFeatureAtPixel(event.pixel, function (feature) {
            selectedFeature = feature; // Seleziona la feature cliccata
            console.log(selectedFeature)

            document.getElementById('widget_info').innerHTML = `<strong>Dati Frana</strong><br>
                    <strong>ID Frana:</strong> ${feature.values_.id_frana}<br>
                    
                    <strong>Comune:</strong> ${feature.values_.nome_com} <br>

                    <strong>Provincia:</strong> ${feature.values_.nome_prov}<br>

                    <strong>Regione:</strong> ${feature.values_.nome_reg} <br>

                    <strong>Distretto:</strong> ${feature.values_.nome_distr} <br>
                    
                    <strong>Movimento:</strong> ${feature.values_.nome_tipo}<br>`;
        });
    });


// Funzione di ricerca via con Nominatim OpenStreetMap
document.getElementById('calcite-button').addEventListener('click', function () {
    let searchQuery = document.getElementById('calcite-input').value;

    if (searchQuery) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let lon = parseFloat(data[0].lon);
                    let lat = parseFloat(data[0].lat);
                    let coordinates = ol.proj.fromLonLat([lon, lat]);

                    map.getView().animate({ center: coordinates, zoom: 15 });
                } else {
                    alert("Località non trovata!");
                }
            })
            .catch(error => console.error("Errore nella ricerca:", error));
    }
});




