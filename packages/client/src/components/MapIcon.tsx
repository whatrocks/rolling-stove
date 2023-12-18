import L from "leaflet";

export default function Icon(image: string) {
  return L.icon({
    iconUrl: image, // URL to the custom marker image
    iconSize: [50, 50], // size of the icon
    iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
  });
}

// const truckIcon = L.icon({
// iconUrl: 'truck.png', // URL to the custom marker image
// iconSize: [50, 50], // size of the icon
// iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
// });

// const personIcon = L.icon({
// iconUrl: 'mobile-device.png', // URL to the custom marker image
// iconSize: [50, 50], // size of the icon
// iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
// });

// const targetIcon = L.icon({
// iconUrl: 'bullseye.png', // URL to the custom marker image
// iconSize: [50, 50], // size of the icon
// iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
// });
