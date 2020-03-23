



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
let OSMINTL={
    url:'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}',
    name:"OSM International"
}
let AliDade={
url:'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
name:"Alidade"

}

const BASE=[WorldPhysical,OceanBase,dark,OSMINTL,AliDade]


    const baseStore= new Map()
    for (i=0;i<BASE.length;i++){
        baseStore.set(BASE[i].name,BASE[i])
    }
    


console.log(baseStore)


const dataL=document.getElementById('data-layers')
const baseL=document.getElementById('base-layers')


function displayBase(baseObj){
   
    for (var m in baseStore){
        for (var i=0;i<baseStore[i].length;i++){
            
       //baseStore[m][i]
       console.log(baseStore[m][i])
      
        }
        
    } 
}


    

//Initializion Code Below//
for (const [key, value] of baseStore.entries()) {
    let li= document.createElement('li')
            li.innerText=key
            baseL.appendChild(li)
    console.log(key);
  }





function makeBaseLayer(url){
    let layer = new ol.layer.Tile({
        source:new ol.source.XYZ({
            url:url
        })
    })
    layer.visible=true
    
    return layer
}



function makeBaseArray(urls){
    let urlarray=[]
    
    for( var url in urls){
       urlarray.push( makeBaseLayer(url.url))
    }
    
    return urlarray
}

 // let cnt=0
    // for(i=0;i<baseStore.length;i++){
    //     let li= document.createElement('li')
    //     console.log(baseStore[i][cnt])
    //     li.innerText=baseStore[i][cnt].name
    //     cnt++
    //     li.addEventListener("click",()=>{
    //        createBase(baseObj[i].url)
    //     })
    //     baseL.appendChild(li)
    // }