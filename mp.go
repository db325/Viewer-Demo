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
	tmpl = template.Must(template.ParseFiles("index.html"))
}

func main() {
	http.HandleFunc("/", rooter)
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	http.Handle("/geo/", http.StripPrefix("/geo/", http.FileServer(http.Dir("./geo"))))
	http.Handle("/svg/", http.StripPrefix("/svg/", http.FileServer(http.Dir("./svg"))))
	http.Handle("/csv/", http.StripPrefix("/csv/", http.FileServer(http.Dir("./csv"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	fmt.Println("server running.")
	http.ListenAndServe(":8080", nil)
}

//GetMapData returns a string of json map data
func getMapData(url string) string {
	c := &http.Client{}
	resp, err := c.Get(url)
	if err != nil {
		fmt.Println("oh shit")
	}
	b, _ := ioutil.ReadAll(resp.Body)
	//xml := strings.NewReader(string(b))
	fmt.Println(string(b))
	//json, err := xj.Convert(b)
	//fmt.Println(xml, "\t", json)
	return string(b)
}

func rooter(resp http.ResponseWriter, req *http.Request) {
	

	tmpl.ExecuteTemplate(resp, "index.html", nil)
}

var url = "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer/0?f=pjson"
var ur2 = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?service=WMS&version=1.3.0&request=GetCapabilities"
