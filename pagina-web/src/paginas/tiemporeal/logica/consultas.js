export function verificarcontinuidad(vector){
    var polylines=[]
    let newVectorCircle=[]
    var newVector=[]
    var lastcond=[]
    var conds=[]
    for (let pos of vector){
        if(lastcond.length==0){
            lastcond=[pos.Latitud,pos.Longitud]
        }
        conds=[
            (Math.abs((pos.Latitud-lastcond[0])/pos.Latitud))*100000,
            (Math.abs((pos.Longitud-lastcond[1])/pos.Longitud))*100000
        ]
        if (conds[0]>200 || conds[1]>200){
            newVectorCircle.push(pos)
            polylines.push(newVector)
            newVector=[]
            newVector.push([pos.Latitud,pos.Longitud])
            lastcond=[pos.Latitud,pos.Longitud]
        }
        else if( conds[0]<7 && conds[1]<7){
            console.log('se borro')
            // lastcond=[pos.Latitud,pos.Longitud]
        }
        else{
            newVectorCircle.push(pos)
            newVector.push([pos.Latitud,pos.Longitud])
            lastcond=[pos.Latitud,pos.Longitud]
        }
    }
    polylines.push(newVector)
    return {polylines,newVectorCircle}
}

export function isInCircle(vectorCircle,circle){
    if (vectorCircle.length==0){
        return false
    }
    // console.log(vectorCircle)
    const {lat,lng} = circle
    var inCircle=[]
    for(let pos of vectorCircle){
        if(
            lat >= pos.Latitud - 0.0018 &&
            lat <= pos.Latitud + 0.0018 &&
            lng >= pos.Longitud - 0.0018 &&
            lng <= pos.Longitud + 0.0018
        ){
            inCircle.push(pos)
        }
        
    }
    return inCircle
}
    export const limeOptions = {color:'lime'}
    export const fillBlueOptions = { fillColor: 'blue' }
    export const redOptions = { color: 'red'}