
var app=angular.module("abonne",['ui.router','checklist-model','angular-loading-bar','flash','ui.bootstrap','ngMaterial','ngAnimate','cl.paging','mdPickers']);
app.run(function($rootScope){
	$rootScope.utilisateur;
})
app.config(function($stateProvider,$urlRouterProvider,$mdDateLocaleProvider){
//	 $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', 'Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
//	    $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', 'Avrl','Juin','Juil','Aout','Sept','Oct','Nove','Dece'];
//	    $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', 'Mercredi','Jeudi','Vendredi','Samedi'];
//	    $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', 'Me','Je','Ve','Sa'];
//	    $mdDateLocaleProvider.formatDate = function(date) {
//	        return moment(date).format('DD-MM-YYYY');
//	     };
//	     $mdDateLocaleProvider.formatDate = function(date) {
//	    	   var m = moment(date);
//	    	   return m.isValid()? m.format('DD-MM-YYYY') : '';
//	    	};
//
//	    // Can change week display to start on Monday.
//	    $mdDateLocaleProvider.firstDayOfWeek = 1;
	 $stateProvider
 
         .state('main', {
             url: "/main",
             templateUrl: "home.html",
             controller: 'HomeCtrl',
             
         })
         .state('main.inscription', {
       url: "/registration",
       templateUrl: "registration.html",
       controller: 'InscriptionCtrl',
           })
    .state('main.newabonnement', {
       url: "/newabonnement",
       templateUrl: "newabonnement.html",
       controller: 'abonnementCtrl',
           })
    .state('main.etatabonnement', {
       url: "/etatabonnement",
       templateUrl: "etatabonnement.html",
       controller: 'etatabonnementCtrl',
           })
          
      .state('modifpassword', {
       url: "/modifpassword",
       templateUrl: "modifpassword.html",
       controller: 'modifpasswordCtrl'
     })
     .state('bess', {
       url: "/bess",
       templateUrl: "newabonne.html",
       controller: 'newabonneCtrl'
     })
     .state('main.affectatonabonnement', {
       url: "/affectatonabonnement",
       templateUrl: "affectationabonnement.html",
       controller: 'affectatonabonnementCtrl'
     })
     
      .state('resetpass', {
       url: "/resetpass",
       templateUrl: "resetpass.html",
       controller: 'resetpassCtrl'
     })
      .state('main.service', {
       url: "/service",
       templateUrl: "gesService.html",
       controller: 'serviceCtrl'
     })
      .state('main.rubrique', {
       url: "/rubrique",
       templateUrl: "gesRubrique.html",
       controller: 'RubriqueCtrl'
     })

      .state('login', {
       url: "/login",
       templateUrl: "log.html",
       controller: 'loginCrtl'
     });
     $urlRouterProvider.otherwise("login");
});





