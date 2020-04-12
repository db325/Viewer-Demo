if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}



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


let testArray=[]


var LG= new ol.layer.Group({
  layers:createBaseLayersGroup(BASES)
})


let l= LG.getLayers()



var map = new Map({
  layers: [OSM,LG,DLG],
  target: document.getElementById('map'),
  view: new View({
    center: fromLonLat.fromLonLat([-97.6114, 38.8403]),
    zoom: 3.6,
    maxZoom:10
  })
});




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

map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});

//map.addLayer(vectLay)

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

  })

 
  })

  butt.addEventListener("mouseover",()=>{
    butt.className="hvr-radial-out"
  })
  
  
  // butt.addEventListener("mouseout",()=>{
  //   butt.className="base-btn"
  // })


}



//map.addLayer(vectLayer)
//console.log(vectLayer.getProperties())
let feat=[]
let fty= new ol.format.EsriJSON()
    function featureGetter(url){
       
     fetch(DATALAYER[2].url+fmtString)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // Read the response as json.
        return response.json();
      })
      .then(function(responseAsJson) {
        // Do stuff with the JSON
        feat.push(responseAsJson)
        console.log(responseAsJson);
      })
      .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
      });
      return feat
    }

let u=featureGetter()


console.log(u)

