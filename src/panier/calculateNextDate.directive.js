function calculateNextDate () {
    return {
        restrict: 'A',
        scope : false,
        link: function (scope, element, attrs) {
            moment.locale('fr');
            let day = moment().day();
            // si on est avant Mercredi
            if (day < 3) {
                scope.nextWed = moment().day(3);
            }
            else {
                scope.nextWed = moment().add(7, 'days').day(3);
            }

            scope.nextWedString = scope.nextWed.format('D MMMM');

            // si on est avant Samedi
            if (day < 6) {
                scope.nextSat = moment().day(6);
            }
            else {
                scope.nextSat = moment().add(7, 'days').day(6);
            }

            scope.nextSatString = scope.nextSat.format('D MMMM');
        }
    };
}

angular.module("marchambul").directive("calculateNextDate", calculateNextDate);
