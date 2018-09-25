app.controller("InscriptionCtrl", function($scope, $http, $rootScope, $state,gesCompte,Consult,Flash,$modal) {
	
	gesCompte.estAutorise();
	
		
	$scope.titre = "Inscription";
	Consult.getAbonnes();
	$scope.data = {};
	
	
	$scope.bouton = "valider";
	$scope.mode="Nouveau";
	
	$scope.inscrire=function(){
		gesCompte.estAutorise();
//		console.log("INSCRIPTION !!!"+$scope.data.role)
		if ($scope.bouton == "valider") {
		gesCompte.posts("inscription",{"nom":$scope.data.nom,
								"prenom":$scope.data.prenom,
								"tel":$scope.data.tel,
								"actived":true,
								"password":$scope.data.password,
								"username":$scope.data.username,
								"roles":[{"nomRole":$scope.data.role}]}).success(function(data){
									Flash.create('success', 'Abonné inscrit avec succès', 'large-text text-center');
									Consult.getAbonnes();
									$scope.data = {};}).error(function(err){
										alert(err.message);
									})
	}
		else {
			$http.put("user", {
				"nom" : $scope.data.nom,
				"prenom" : $scope.data.prenom,
				"tel" : $scope.data.tel,
				"username" : $scope.data.username,
				"roles":[{"nomRole":$scope.data.role}]
			}).success(function(data) {
				Flash.create('success', 'Modification effectuée avec succès', 'large-text text-center');
				Consult.getAbonnes();
				$scope.data={};
				$scope.bouton="valider"
				$scope.editmod="";
				$scope.mode="Nouveau";
			})
		}
}
	$scope.editer = function(email) {
		gesCompte.estAutorise();
		gesCompte.posts("abonnemail/",email).success(function(data) {
			console.log(data);
			$scope.data = data[0];
			$scope.data.role=data[0].roles[0].nomRole;
			$scope.data.password=""
			$scope.bouton = "modifier";
			$scope.mode="Modification";
			$scope.editmod=true;
		})
		console.log(email)
	}
	$scope.modalsupprimer = function(email) {
		gesCompte.posts("abonnemail/",email).success(function(data) {
			//console.log(data);
			$scope.supabonne = data[0];
			$scope.connexionModale=true;
		})
	
		

	}
	$scope.supprimer=function(email){
			gesCompte.estAutorise();
		gesCompte.posts("abonnesuppr/", email).success(function(data) {
			$scope.bouton = "valider"
			$scope.editmod="";
			$scope.connexionModale=false;
			$scope.data = {};
			Consult.getAbonnes();
		})
	}
	
	$scope.verifExistence=function(){
		gesCompte.estConnecte();
		if(!$scope.data.username)
			{
			$scope.existmail=true;
			$scope.message="Saisir une adresse mail valide";
			}
		else{
			gesCompte.posts("usermail", $scope.data.username).success(function(data) {
				console.log($scope.data.username)	
						if(data!="")
							{
							$scope.existmail=true;
							$scope.message="Cette adresse mail est déjà attribuée";

							}
						else
							console.log("Rien à voir CIrculez!!!!")
						//Consult.getAbonnes();
					}).error(function(e){
						console.log(e)
					})
		}


			}
	$scope.resetmail=function(){
		$scope.existmail="";
		
	}
	$scope.resetconf=function(){
		
		$scope.pasconf="";
	}
	
	;
	$scope.verifConf=function(){
		if($scope.data.password!=$scope.data.conf){
			$scope.pasconf=true;
			$scope.erreur=true;
		}
		
	}

});
app.controller("newabonneCtrl",function($scope, $http, $rootScope, $state,gesCompte, Consult){
	console.log('dame camara');
	$scope.data={};
	$scope.inscrire=function(){
		gesCompte.posts("inscription",{"nom":$scope.data.nom,
								"prenom":$scope.data.prenom,
								"tel":$scope.data.tel,
								"actived":true,
								"password":$scope.data.password,
								"username":$scope.data.username,
								"roles":[{"nomRole":"ABONNE"}]}).success(function(data){
									if(data.username)
										$state.go("login");
									//console.log(data);
		
			
		})
	}
	$scope.verifExistence=function(){
if(!$scope.data.username)
	{
	$scope.existmail=true;
	$scope.message="Saisir une adresse mail valide";
	}
else{
	gesCompte.posts("usermail", $scope.data.username).success(function(data) {
		console.log($scope.data.username)	
				if(data!="")
					{
					$scope.existmail=true;
					$scope.message="Cette adresse mail est déjà attribuée";

					}
				else
					console.log("Rien à voir CIrculez!!!!")
				//Consult.getAbonnes();
			}).error(function(e){
				console.log(e)
			})
}


	}
	$scope.resetmail=function(){
		$scope.existmail="";
		
	}
	$scope.resetconf=function(){
		
		$scope.pasconf="";
	}
	$scope.verifConf=function(){
		if($scope.data.password!=$scope.data.conf){
			$scope.pasconf=true;
			$scope.erreur=true;
		}
		
	}
});