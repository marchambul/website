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
});
