/**
 * 
 */
app.controller("loginCrtl",function($scope,$http,$state,$rootScope,gesCompte,Flash){
	$scope.data={}
	$scope.titre="Connexion"
	gesCompte.deconnexion();
	$scope.login=function(){
		//console.log($scope.data)
	//	$state.reload();
		//gesCompte.connexion("?username="+$scope.data.login+"&password="+$scope.data.motp);
		$http.post("/login",{username:$scope.data.login,password:$scope.data.motp}).then(function(res,status,header,config,statusText){
			console.log(res.headers());
			console.log(res.headers().authorization);
			var data=JSON.parse(res.headers().user)
			console.log(data);
			localStorage.setItem('dataconnexion',angular.toJson(data));
			$rootScope.utilisateur = data.prenom+" "+data.nom;
			$http.defaults.headers.common['Authorization'] = res.headers().authorization;
			$state.go("main");
		  
		})
		
	}	
});
app.controller("resetpassCtrl",function($scope,$http,gesCompte,Flash){
$scope.data={};
	
	$scope.verifExistence=function(){
		if(!$scope.data.login){
			$scope.nonexiste=true;
			
			$scope.message="Saisir une adresse mail valide";
		}
		else
			{
			gesCompte.posts("usermail", $scope.data.login).success(function(data) {
			//	console.log($scope.data.login)	
						if(data!="")
							{
								//console.log("Rien à voir CIrculez!!!!")
							}
						else{
							$scope.nonexiste=true;
							$scope.message="Aucun utilisateur n'est associé à cette adresse";
						}
							
							
					
					}).error(function(e){
						console.log(e)
					})
			}
		
		}
	$scope.retablir=function(){
		$scope.nonexiste="";
		$scope.noncode="";
		$scope.envoye="";
	}
	$scope.envoyer=function(){
		 $scope.encours = true;
		 $scope.message="Envoi en cours ..."
		gesCompte.posts("envoimail",$scope.data.login).success(function(data){
			$scope.isPaneShown = false;
			$scope.data.login=""
			$scope.envoye=true;
			 $scope.encours ="";
			 Flash.create('info', "Les détails de réinitialisation viennent d'etre envoyés", 'large-text text-center');
			// $scope.message="Les détails de réinitialisation viennent d'etre envoyés"
		}).error(function(){
			 $scope.encours ="";
		})
	}	
})
app.controller("modifpasswordCtrl",function($scope,$http,gesCompte,$state,Flash){
	$scope.data={};
	$scope.verifExistence=function(){
		//console.log($scope.data)
		if(!$scope.data.login){
			$scope.nonexiste=true;
			$scope.message="Saisir une adresse mail valide";
		}
		else
			{
			gesCompte.posts("usermail", $scope.data.login).success(function(data) {
				//console.log($scope.data.login)	
						if(data!="")
							{
								console.log("Rien à voir CIrculez!!!!")
							}
						else{
							$scope.nonexiste=true;
							$scope.message="Aucun utilisateur n'est associé à cette adresse";
						}
							
							
					
					}).error(function(e){
						console.log(e)
					})
			}
		
		}
	$scope.retablir=function(){
	console.log('dame')
		$scope.nonexiste="";
		$scope.noncode="";
		$scope.nonconf="";
		$scope.envoye="";
	}
	$scope.verifCode=function(){
		if($scope.data.code){
				gesCompte.posts("verifcode",{"username":$scope.data.login,
				"codevalidation":$scope.data.code}).success(function(data){
				//	console.log(data)
			if(!data.username){
				$scope.noncode=true;
				$scope.message="Code invalide";
			}
		})
		}
	}
	$scope.verifconf=function(){
		if($scope.data.password !=$scope.data.conf)
			{
			$scope.nonconf=true;
			$scope.message="Les mots de passe ne sont pas identiques"
			}
	}
	$scope.modifpassword=function(){
		$http.put("modifpass", {
					"password" : $scope.data.password,
					"username" : $scope.data.login
		}).success(function(data){
			$scope.modif=true;
			$scope.data={};
			$scope.envoye=true;
			// Flash.create('info', "Les détails de réinitialisation viennent d'etre envoyés", 'large-text text-center');
			
			$state.go("login")
			//console.log(data)
		})
		
	}
})