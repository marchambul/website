app = angular.module 'marchambul'

app.directive 'producteur', ($timeout)->
  restrict: 'E'
  link: (scope, element, attrs)->
    $timeout ->

      map = L.map element[0],
        zoomControl: false
      .setView([48.911, 2.528], 9)

      L.tileLayer 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          attribution: ''
          maxZoom: 18
          id: 'marchambul.6b67e8ac'
          accessToken: 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ#4/48.86/2.35'
      .addTo(map)

      popup = L.popup
        closeButton: false
        maxWidth: 500
        minWidth: 200
        className: 'custom-popup'

      popup.setContent("Le Jardin d’Hippolyte, Rue d’Iverny - 77410 VILLEROY")


      L.marker [48.986857, 2.782072]
      .addTo(map)
      .bindPopup(popup)
      .openPopup()

    , 2000
