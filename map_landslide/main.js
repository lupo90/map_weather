var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([13.8333, 42.2167]),
        zoom: 10
    })
});


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
        console.log(data)
        console.log(' ')
        console.log(filterJson)

        var VectorSource = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson, {
                featureProjection: 'EPSG:3857'
            })
        });

        // console.log (typeof(data))

        var vectorLayer = new ol.layer.Vector({
            source: VectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(15, 176, 69, 0.71)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(15, 176, 69, 0.71)'
                })
            })
        });
        map.addLayer(vectorLayer);

        var VectorSource_1 = new ol.source.Vector({
            features: new ol.format.GeoJSON().readFeatures(filterJson_1, {
                featureProjection: 'EPSG:3857'
            })
        });

        // console.log (typeof(data))

        var vectorLayer_1 = new ol.layer.Vector({
            source: VectorSource_1,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(176, 15, 120, 0.71)',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(176, 15, 120, 0.71)'
                })
            })
        });
        map.addLayer(vectorLayer_1);
    })
    .catch(error => console.error('Errore nel caricamento del file JSON:', error));


