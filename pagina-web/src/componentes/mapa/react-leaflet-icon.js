import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import redcircle from '/redcircle.png'
import start from '/start2.png'

export const MarkerIcon = L.icon({
    iconUrl: icon,
    iconSize:[32,42],
    iconAnchor:[16,42],
    shadowUrl: iconShadow
});

export const CircleIcon = L.icon({
    iconUrl: redcircle,
    iconSize:[10,10],
});

export const StartIcon = L.icon({
    iconUrl : start,
    iconSize: [30,30]
})