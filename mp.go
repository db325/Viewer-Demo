package main

import (
	//"database/sql"

	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

var tmpl *template.Template

func init() {
	tmpl = template.Must(template.ParseFiles("index.gohtml"))
}

func main() {
	//	ld := getLayerData(urls)
	//fmt.Println(ld)
	//getMapData("https://idpgis.ncep.noaa.gov/arcgis/rest/services/radar/radar_base_reflectivity_time/ImageServer/?f=json")
	http.HandleFunc("/", rooter)
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	http.Handle("/geo/", http.StripPrefix("/geo/", http.FileServer(http.Dir("./geo"))))
	http.Handle("/svg/", http.StripPrefix("/svg/", http.FileServer(http.Dir("./svg"))))
	http.Handle("/csv/", http.StripPrefix("/csv/", http.FileServer(http.Dir("./csv"))))

	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("./images"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	http.HandleFunc("/favicon.ico/", favico)
	http.HandleFunc("/sw.js", sw)
	fmt.Println("server running.")
	http.ListenAndServe(":8080", nil)
}

//GetMapData returns a string of json map data
func getMapData(url string) string {
	c := &http.Client{}
	resp, err := c.Get(url)
	if err != nil {
		fmt.Println("sorry")
	}
	b, _ := ioutil.ReadAll(resp.Body)
	//xml := strings.NewReader(string(b))
	//fmt.Println(string(b))

	//fmt.Println(xml, "\t", json)
	return string(b)
}

func favico(resp http.ResponseWriter, req *http.Request) {
	http.ServeFile(resp, req, "/images/favicon.png")
}

type MpData struct {
	UrlArray  []string
	DataArray []string
}

func rooter(resp http.ResponseWriter, req *http.Request) {
	datString, urlArray := getLayerData(urls)
	mp := MpData{
		UrlArray:  urlArray,
		DataArray: datString,
	}
	//json.NewEncoder(resp).Encode(peter)

	tmpl.ExecuteTemplate(resp, "index.gohtml", mp)
}

func getLayerData(urlArr []string) ([]string, []string) {
	//var dataArr []map[string]interface{}
	var strArr []string
	var retArray []string
	// enc := json.NewEncoder(os.Stdout)
	// var m map[string]interface{}
	for i, v := range urlArr {
		d := getMapData(v + "/?f=json")
		// dec := json.NewDecoder(strings.NewReader(d))
		// dec.Decode(&m)
		// enc.Encode(&m)
		//dataArr = append(dataArr, m)
		retArray = append(retArray, urlArr[i])
		strArr = append(strArr, d)
	}

	return strArr, retArray
}

var urls = []string{"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/radar/radar_base_reflectivity_time/ImageServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NHC_E_Pac_trop_cyclones/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/NDFD_temp/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/natl_fcst_wx_chart/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_precip_hazards/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_prob_winter_precip/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/SPC_wx_outlks/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/sig_riv_fld_outlk/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_hourly_qpe/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_dly_qpe/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/rfc_gridded_ffg/MapServer", "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/aprfc_RiverBreakupStatus/MapServer"}

func sw(resp http.ResponseWriter, req *http.Request) {
	fmt.Println("sw hit")
	resp.Header().Set("Service-Worker-Allowed", "/")
	http.ServeFile(resp, req, "./sw.js")
}
