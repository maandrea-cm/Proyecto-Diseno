export function vectorPoli ({polireal}) {

    var polyline=[],idinit,idfin,latlon,centeri,centerf,lat,long;
    if(polireal.length>1){
        console.log('entramos aqui')
        polireal.map(datos =>{
            latlon=[datos.Latitud,datos.Longitud];
            polyline.push(latlon)
        }) 

        idinit=polireal[0].IdEnvio
        idfin=polireal[polireal.length-1].IdEnvio

        latlon=polyline[0]
        lat=latlon[0].toString();
        long=latlon[1].toString();
        centeri=[lat,long]

        latlon=polyline[polyline.length-1]
        lat=latlon[0].toString();
        long=latlon[1].toString();
        centerf=[lat,long]
    }else{
        polyline=polireal[0]
        idinit=polyline.IdEnvio
        idfin=idinit
        centerf=[polyline.Latitud.toString(),polyline.Longitud.toString()]
        centeri=[0,0]
    }
    
    return{polyline,idinit,idfin,centeri,centerf}
    
}