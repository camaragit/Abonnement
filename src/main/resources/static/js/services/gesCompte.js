/**
 * Created by dame on 20/09/16.
 */


app.factory('gesCompte',function ($http,$state,$rootScope) {
  return{
  deconnexion:function(){
	  console.log("je suis en mode deconnexion");
	this.gets("decon").success(function(){
		localStorage.removeItem('dataconnexion');
		$state.go("login");
	})  
  },
  getInfoUser:function(){
	return  angular.fromJson(localStorage.getItem('dataconnexion'));  
  },
  connexion:function(url){
	  
	  var ceci=this;
	this.posts(url).success(function(){
		ceci.estConnecte().success(function(data){
			console.log(data);
			if(data.username)
				{
				$rootScope.role=data.roles[0].nomRole;
				$rootScope.utilisateur=data.prenom+" "+data.nom;
				localStorage.setItem('dataconnexion',angular.toJson(data));
				$state.go("main");
				
				}
			else{
				$rootScope.erreurCon="true";
			}
			
			});
		
	})  
  },
  estConnecte:function(){
	  
	 return this.gets("user").success(function(data){
		  if(!data.username)
			  $state.go("login");
		  else{
			  $rootScope.role=data.roles[0].nomRole;
			  $rootScope.utilisateur=data.prenom+" "+data.nom;
			  //console.log($rootScope.utilisateur);
		  }
			  
			  
	  });
  },
  estAutorise:function(){
	  this.gets("user").success(function(data){
		  if(!data.username)
			  $state.go("login");
		  else{
			  if(data.roles[0].nomRole=="ABONNNE")
				  $state.go("main")
				  else{
					  	  $rootScope.role=data.roles[0].nomRole;
					  	  $rootScope.utilisateur=data.prenom+" "+data.nom;
					  	 
				  }

		  }
			  
			  
	  });
	  
  }
  
	,    posts:function (url,parametres) {
	            return $http.post(url, parametres)
	          .success(function (data) {
	                   return data;
	          }).error(function (erreur) {
	            
	          })

	      },
	      gets:function (url) {
	            return $http.get(url)
	          .success(function (data) {        
	            return data;
	          }).error(function (erreur) {
	            
	          })

	      }

  }


});
