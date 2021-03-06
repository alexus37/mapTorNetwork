
function initDemoMap(){

    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Esri_DarkGreyCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }
    );

    var baseLayers = {
        "Grey Canvas": Esri_DarkGreyCanvas,
        "Satellite": Esri_WorldImagery
        
    };

    var map = L.map('map', {
        layers: [ Esri_DarkGreyCanvas ]
    });

    var layerControl = L.control.layers(baseLayers);
    layerControl.addTo(map);
    map.setView([48.132360, 11.549680], 3);

    return {
        map: map,
        layerControl: layerControl
    };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;


// load data (u, v grids) from somewhere (e.g. https://github.com/danwild/wind-js-server)
$.getJSON('geocodedIps.json', function (data) {
    data.forEach(function(ip){
        L.marker([ip["latitude"], ip["longitude"]]).addTo(map);
    })
});
