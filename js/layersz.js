var sources =[
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/radar/radar_base_reflectivity_time/ImageServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NHC_E_Pac_trop_cyclones/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NDFD_temp/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/natl_fcst_wx_chart/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_precip_hazards/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_prob_winter_precip/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/SPC_wx_outlks/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/sig_riv_fld_outlk/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_hourly_qpe/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_dly_qpe/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_gridded_ffg/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/aprfc_RiverBreakupStatus/MapServer"
]




const Base={
    "name":"",
    "url":""
}

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

const BASES=[WorldPhysical,OceanBase,dark]




const fmtString="/?f=json"




const dataL=document.getElementById('data-layers')


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



