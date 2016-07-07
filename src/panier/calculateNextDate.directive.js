function calculateNextDate () {
    return {
        restrict: 'A',
        scope : false,
        link: function (scope, element, attrs) {
            moment.locale('fr');
            let day = moment().day();

            let days = {
                nextSun : 0,
                nextMon : 1,
                nextTue : 2,
                nextWed : 3,
                nextThu : 4,
                nextFri : 5,
                nextSat : 6,
            };

            for (let key in days){
                // si on est avant ce jour
                if (day < days[key]) {
                    scope[key] = moment().day(days[key]);
                }
                else {
                    scope[key] = moment().add(7, 'days').day(days[key]);
                }

                let stringKey = key + 'String';
                scope[stringKey] = scope[key].format('D MMMM');
            }
        }
    };
}

angular.module("marchambul").directive("calculateNextDate", calculateNextDate);
