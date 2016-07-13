function geocomplete(LazyLoadApiService) {
      return {
        restrict: 'EA',
        scope: false,
        link: function (scope, element, attrs) {

          scope.initialize = function() {
            var options = {
                types : [],
              };
            scope.autocomplete = new google.maps.places.Autocomplete(element[0],options);
            scope.map = new google.maps.Map(document.getElementById(attrs.mapId), {
              center: {lat: 48.59, lng:2.25},
              zoom: 14
            });
            scope.marker = new google.maps.Marker({
              map: scope.map,
              anchorPoint: new google.maps.Point(0, -29)
            });

            scope.autocomplete.addListener('place_changed', function() {
              var place = scope.autocomplete.getPlace();
              // If the place has a geometry, then present it on a map.
              if (place.geometry.viewport) {
                scope.map.fitBounds(place.geometry.viewport);
              }
              else {
                scope.map.setCenter(place.geometry.location);
                scope.map.setZoom(16);  // Why 17? Because it looks good.
              }
              scope.marker.setPosition(place.geometry.location);
              scope.marker.setVisible(true);

              scope.address = place.formatted_address;
              scope.position = place.geometry.location;
              scope.$apply();
              console.log(JSON.stringify(scope.round));
            });
          };


          LazyLoadApiService.loadScript().then(function () {
            scope.initialize();
          }, function () {
            // Promise rejected
          });
        }
      };
    }

angular.module("marchambul").directive("geocomplete", geocomplete);
