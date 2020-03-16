
const sources = [
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/radar/radar_base_reflectivity_time/ImageServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",
    "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NHC_Atl_trop_cyclones/MapServer",
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


for (i=0;i<sources.length;i++){

    fetch(sources[i])
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data)
      // Create and append the li's to the ul
      })
    
}
