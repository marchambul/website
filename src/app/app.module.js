angular.module("marchambul", ['ui.router', 'ngSanitize'])

.run(function($rootScope, $timeout, $http){

    $timeout(function(){$('.slogan').addClass('loaded');}, 1000);

    $rootScope.scrollTo = function(selector){
        $('body').animate({
            scrollTop: $(selector).offset().top
        } , 600);
    };

    $rootScope.scrollTo = function(selector){
        $('body').animate({
            scrollTop: $(selector).offset().top
        } , 600);
    };

    $rootScope.message = "Bonjour, je souhaite recevoir votre plaquette d'information";

    $rootScope.checkEmail = function(event, email){
        if (email && email.match(/\S+@\S+\.\S+/)){
            delete $rootScope.errorEmail;
        }
        else{
            $rootScope.errorEmail = true;
            event.preventDefault();
        }
    };

    $rootScope.checkPanier = function(event, address, position, phone, jour){
        console.log('address : '  + JSON.stringify(address));
        console.log('position : '  + JSON.stringify(position));
        console.log('phone : '  + JSON.stringify(phone));
        console.log('jour : '  + JSON.stringify(jour));
        if (phone && phone.match(/^[0-9]{10}$/)){
            delete $rootScope.errorPhone;
        }
        else{
            $rootScope.errorPhone = true;
            event.preventDefault();
        }

        if (address){
            delete $rootScope.errorAddress;
        }
        else{
            $rootScope.errorAddress = true;
            event.preventDefault();
        }

        if (jour){
            delete $rootScope.errorDay;
        }
        else{
            $rootScope.errorDay = true;
            event.preventDefault();
        }
    };


});
