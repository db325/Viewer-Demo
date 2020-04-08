//import 'ol/ol.css';
let Map = ol.Map;
let View = ol.View;
let EsriJSON = ol.format.EsriJSON;
let TileLayer, Vector =ol.layer;
let tilesrat =ol.loadingstrategy;
let fromLonLat= ol.proj;
let VectorSource = ol.source.Vector;
let XYZ = ol.source.XYZ;
let Style= ol.style;
let createXYZ = ol.tilegrid;







// Get default data

sources.forEach((index)=>{
  getInfo(index)
})









var serviceUrl =     `https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/`;
var layer = '1';

var esrijsonFormat = new EsriJSON();

var styleCache = {
    "Frost Advisory": new ol.style.Style({
    fill: new Style.Fill({
      color: 'rgba(225, 225, 225, 255)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 0, 255)',
      width: 0.4
    })
  }),
  'Flood Warning': new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 0, 0, 255)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(110, 110, 110, 255)',
      width: 0.4
    })
  }),
  'Wind Advisory': new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(56, 168, 0, 255)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(110, 110, 110, 255)',
      width: 0
    })
  }),
  'OILGAS': new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(168, 112, 0, 255)'
    }),
    stroke: new ol.style.Stroke({
      color: 'rgba(110, 110, 110, 255)',
      width: 0.4
    })
  })
};

var vectorSource = new VectorSource({
  loader: function(extent, resolution, projection) {
    var url = serviceUrl + layer + '/query/?f=json&' +
        'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
        encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
            extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
            ',"spatialReference":{"wkid":102100}}') +
        '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
        '&outSR=102100';
    $.ajax({url: url, dataType: 'jsonp', success: function(response) {
      if (response.error) {
        console.log(response.error.message + '\n' +
            response.error.details.join('\n'));
      } else {
        // dataProjection will be read from document
        var features = esrijsonFormat.readFeatures(response, {
          featureProjection: projection
        });
        console.log(features[0],"  features  ")
        if (features.length > 0) {
          vectorSource.addFeatures(features);
        }
      }
    }});
  },
  strategy:new tilesrat.tile ( new createXYZ.createXYZ({
    tileSize: 512
  }))
});

var vector = new Vector.Vector({
  source: vectorSource,
  style: function(feature) {
    var classify = feature.get(`prod_type`);
    return styleCache[classify];
  }
});

var raster = new ol.layer.Tile({
  source: new XYZ({
    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    url:BASES[2].url
  })
});


var LG= new ol.layer.Group({
  layers:createBaseLayersGroup(BASES)
})








let OSM = new ol.layer.Tile({
  source:new ol.source.OSM()
  ,
  name:"OSM"
})

let WorldGeo= new ol.layer.Tile({
  source:new XYZ({
    url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    crossOrigin:"anonymous",
    cors:true,
    zIndex:15
  }),
  name:"World Geo"
})

let l= LG.getLayers()
l.push(WorldGeo)
console.log(l)

const Dlg= new ol.layer.Group({
  layers:[]//simpleDataLayers(sources)})
})

  let dlgarr=Dlg.getLayers().getArray()

console.log(dlgarr)
var map = new Map({
  layers: [OSM,LG,Dlg],
  target: document.getElementById('map'),
  view: new View({
    center: fromLonLat.fromLonLat([-97.6114, 38.8403]),
    zoom: 3.6,
  })
});
//map.addLayer(DATAGROUP)


console.log(map.getLayers().getArray()[2])





var displayFeatureInfo = function(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature) {
    features.push(feature);
  });
  if (features.length > 0) {
    var info = [];
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].values_.prod_type)//.get('wfo'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
    map.getTarget().style.cursor = 'pointer';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
    map.getTarget().style.cursor = '';
  }
};

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});
console.log(map.getTarget().values_)
map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});





const buttons= document.getElementsByClassName('base-btn')
let ls= LG.getLayers().getArray()
for (let butt of buttons){
  butt.addEventListener('click',()=>{
  butt.className="btn-clicked"
  let  val = butt.value
  ls.forEach((ind,ele,arr)=>{
    if(val===ind.get('name')){
      ind.setVisible(true)
      ind.zIndex=1
    }else{
      ind.setVisible(false)
    }
  console.log(ind.get("name"), ind.get("visible"))

  })

 
  })

  butt.addEventListener("mouseover",()=>{
    butt.className="hvr-radial-out"
  })
  
  
  // butt.addEventListener("mouseout",()=>{
  //   butt.className="base-btn"
  // })


}



function createDataLayer(url,name,attr){
  let dataLayer= new ol.layer.Tile({
     source:new ol.source.TileArcGISRest({
         url:url
     }),
    
     visible:true
     ,
     crossOrigin:"anonymous",
     cors:true,
     name:name,
     attributions:attr
     
 })

 return dataLayer
}

function simpleDataLayers(array){
  let ar=[]

for(let o=0;o<array.length;o++){
  let l= createDataLayer(array[o])
      ar.push(l)
      console.log(l)
}



  // array.forEach(element => {
  //     let l= createDataLayer(element)
  //     ar.push(l)
  //     console.log(l)
  // });
  return ar
}




function getInfo(url){
let rn={}
  fetch(url+fmtString)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Create and append the li's to the ul
    rn= {
      url:url,
      name:data.mapName,
      attr:data.copyrightText
    }
    dlgarr.push(createDataLayer(rn.url,rn.name,rn.attr))
    testArray.push(createDataLayer(rn.url,rn.name,rn.attr))
    })
    
}


