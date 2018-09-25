
app.controller("serviceCtrl",function($scope,$state,$rootScope,$http,gesCompte,Consult,Flash){
	$scope.test=function(){
		gesCompte.estAutorise();
	$scope.data={};
	$scope.bouton = "valider";
	$scope.mode="Nouveau";
	Consult.getServices();
	Consult.getRubriques();
	$scope.data.rubriques = [];
	}
	$scope.affichenew=function(){
		$scope.etat="new";
		$scope.titre="Nouvelle Rubrique";
		$scope.connexionModale=true;
		$scope.existe=false;
		$scope.data.nomRubrique=$scope.data.prix="";

	}
	$scope.verifExisencerub=function(){
		
			gesCompte.gets("chercheRubrique/" + $scope.data.nomRubrique).success(function(data) {
			if(data){
				$scope.existe=true;
				$scope.messagemodal="Une rubrique du même nom existe déjà"
			}
		
			})
			
		
	}
	$scope.resetnomrub=function(){
		$scope.existe="";
	}
	$scope.saverubrique=function()
	{
		gesCompte.posts("rubrique", {
			"nomRubrique" : $scope.data.nomRubrique,
			"prix":$scope.data.prix,
			"description":$scope.data.description
				}).success(function(r) {
					if(!r)
						$rootScope.err=true;
					else{
						$scope.connexionModale=false;
						Consult.getRubriques();
						Flash.create('success', 'Rubrique Créee avec succès', 'large-text text-center');
					
					}
			
		}).error(function(err) {
			alert(err.message);
		})
	}
	$scope.verifExisence=function(){
		
		if($scope.mode == "Nouveau")
			{
			console.log("ok");
			gesCompte.gets("chercheService/" + $scope.data.nomService).success(function(data) {
			if(data){
				$scope.existe=true;
				$scope.message="Un Service du même nom existe déjà";
			}
		
			})
			}
		
	}
	$scope.resetnomserv=function(){
		$scope.existe="";
	}
	
$scope.voir=function(){
	console.log($scope.data.rubriques.length)
}
	$scope.valider = function() {
		gesCompte.estAutorise();
		if ($scope.bouton == "valider") {
			var valide=false;
			var rub=[];
			gesCompte.posts("service", {
				"nomService" : $scope.data.nomService,"description":$scope.data.description,"rubriques":$scope.data.rubriques
					}).success(function(service) {
						if(service)
							{
							Flash.create('success', 'Service  crée  avec succès', 'large-text text-center');
							$scope.data={};
							Consult.getServices();
							
						}
				
			}).error(function(err) {
				alert(err.message);
			})
		} else {
			$http.put("service", {
				"nomService" : $scope.data.nomService,"idService":$scope.data.idService,"description":$scope.data.description,"rubriques":$scope.data.rubriques
			}).success(function(data) {
				if(data)
					{
					$scope.bouton = "valider";
				$scope.mode='Nouveau';
				$scope.data={};
				Flash.create('success', 'Service  modifié  avec succès', 'large-text text-center');
				Consult.getServices();
					}
				else{
					Flash.create('danger', 'Modification echouée', 'large-text text-center');
					
				}
				
			})
		}
	
	}
	$scope.editer = function(id) {
		gesCompte.estAutorise();
		gesCompte.gets("service/" + id).success(function(data) {
			console.log(data);
			$scope.data = data;
			$scope.bouton = "Modifier";
			$scope.mode="Modification";
		})
		
	}
	$scope.editermod = function(id,code) {
		gesCompte.estAutorise();
		gesCompte.gets("service/" + id).success(function(data) {
			console.log(code)
			if(code==1)
				{
					$scope.etat="details";
					$scope.titre="Détails du Service "+data.nomService
				}
			else{
				$scope.etat="suppression";
				$scope.titre="Suppréssion du Service "+data.nomService
			}
			$scope.connexionModale=true;
		
			$scope.dataedition = data;
			
		})

			
			
		}
		

	$scope.supprimer = function(id) {
		gesCompte.estConnecte();
		gesCompte.gets("supprimerServ/" + id).success(function(data) {
			$scope.bouton = "valider"
			$scope.data = {};
			$scope.connexionModale=false;
			Flash.create('success', 'Service supprimé', 'large-text text-center');
			Consult.getServices();
			Consult.getRubriques();
		})
	}
});