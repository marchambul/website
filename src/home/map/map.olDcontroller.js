// $http.get("/api/tournees.json").then(function(res) {
//     console.log('res : '  + JSON.stringify(res));
//   for (let tournee of res.data.features) {
//       console.log('tournee : '  + JSON.stringify(tournee));
//     let popup = L.popup({
//       closeButton: false,
//       maxWidth: 150,
//       minWidth: 150,
//       className: 'custom-popup'
//     });
//
//     popup.setContent('<h4>' + tournee.properties.name + '</h4><p>' + tournee.properties.description + '</p>');
//     console.log('tournee.geometry.coordinates : '  + JSON.stringify(tournee.geometry.coordinates));
//     let coordinates = [tournee.geometry.coordinates[1], tournee.geometry.coordinates[0]];
//     L.marker(coordinates, {
//       icon: marchambulIcon
//     }).addTo(map).bindPopup(popup);
//
// popup.setLatLng(coordinates);
//     map.addLayer(popup);
//     console.log('ttt');
//   }
// });
