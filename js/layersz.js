

// Default data objects
let radarBaseTime={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
    name:"Radar Base (Time)"

}
let radarBaseImage={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/radar/radar_base_reflectivity_time/ImageServer",

    name:"Radar Base (Image)"

}
let forcastGuidance={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",

    name:"Forceast Guidance Warnings"

}
let radarsnowAnalysis={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",

    name:"Snow Analysis"

}
let tropicalCyclones={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NHC_E_Pac_trop_cyclones/MapServer",

    name:"Tropical Cyclones"

}
let cpcWeatherHaz={
    url:    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer",

    name:"CPC Weather Hazards"

}
let ndfdTemp={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NDFD_temp/MapServer", 
    name:"NDFD Temp"

}
let nationalForecast={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/natl_fcst_wx_chart/MapServer",
    
    name:"National Forecast"

}
let WpcPrecip={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_precip_hazards/MapServer",
    
    name:"WPC Precip Hazards"

}
let wpc_prob_winter_precip={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_prob_winter_precip/MapServer",
    name:"WPC Winter Precip Probability"

}
let spcWxOutlooks={
    url:  "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/SPC_wx_outlks/MapServer",

    name:"SPC Wx Outlooks"

}
let ahps_riv_gauges={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",

    name:"ACHPS River Guages"

}
let sig_riv_fld_outlk={
    url:    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/sig_riv_fld_outlk/MapServer",

    name:"SIG River Flood Outlook"

}
let wpc_qpf={
    url:  "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer",
    
    name:"WPC QPF"

}
let rfc_hourly_qpe={
    url:    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_hourly_qpe/MapServer",

    name:"RFC Hourly QPE"

}
let rfc_dly_qpe={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_dly_qpe/MapServer",

    name:"RFC Daily QPE"

}
let rfc_gridded_ffg={
    url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_gridded_ffg/MapServer",

    name:"RFC Gridded FFG"

}
let aprfc_RiverBreakupStatus={
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/aprfc_RiverBreakupStatus/MapServer",

    name:"APRFC River Breakup Status"

}

//Default DataLayer Array

var DATALAYER =[radarBaseTime,radarBaseImage,forcastGuidance,radarsnowAnalysis,tropicalCyclones,cpcWeatherHaz,ndfdTemp,nationalForecast,wpc_prob_winter_precip,spcWxOutlooks,ahps_riv_gauges,sig_riv_fld_outlk,wpc_qpf,rfc_hourly_qpe,rfc_dly_qpe,rfc_gridded_ffg,aprfc_RiverBreakupStatus]
  

//Default Base Layers
let  WorldPhysical={
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    name:"World Physical"
}
let OceanBase={
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
    name:"Ocean Base"
}
let dark={
    url:'https://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    name:"Dark Carto"
}

let WorldGeo= {
    url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    
    name:"World Geo"
 
}
let OSM = new ol.layer.Tile({
    source:new ol.source.OSM()
    ,
    name:"OSM"
  })
  
const BASES=[WorldPhysical,OceanBase,dark,WorldGeo]


//Query string to add to url
const fmtString="/?f=json"



   
   

function createBase(url,name){
    let base= new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:url
        }),
        name:name,
        visible:false
    })
    return base
}

// function to create baselayers array for map layerGroup

function createBaseLayersGroup(baseObjectArray){
    let baseLayerArray=[]
    for( b =0;b< BASES.length;b++){
    let b1=createBase(BASES[b].url,BASES[b].name)
    baseLayerArray.push(b1)
}
  return baseLayerArray
}

// function to create a single dataLayer
function createDataLayer(url,name){
    let dataLayer= new ol.layer.Tile({
       source:new ol.source.TileArcGISRest({
           url:url
       }),
      
       visible:false
       ,
       crossOrigin:"anonymous",
       cors:true,
       name:name,
       
       
   })
  
   return dataLayer
  }
  

  let DLG= new ol.layer.Group({
    layers:createDataLayersGroup(DATALAYER)
    })
    function createDataLayersGroup(dataObjectArray){
        let dataLayerArray=[]
      
      for(let o=0;o<DATALAYER.length;o++){
        let l= createDataLayer(DATALAYER[o].url,DATALAYER[o].name)
            dataLayerArray.push(l)
           console.log(l)
      
      //d.push(l)
      }
      
        return dataLayerArray
      }
      

      let dlyr= document.getElementById('data-layers')
      let dlg= DLG.getLayers().getArray()
      DATALAYER.forEach(d=>{
          let b= document.createElement('button')
          b.innerText=d.name
          b.value=d.name
          let v=b.value
          b.className="hvr-radial-out"
          b.addEventListener('click',()=>{
   dlg.forEach((l,i)=>{
       if(v===l.get('name')){
           l.setVisible(true)
       }
   })
          })
          dlyr.appendChild(b)
      })
    