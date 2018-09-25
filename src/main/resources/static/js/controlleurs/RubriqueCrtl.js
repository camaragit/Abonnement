
app.controller("RubriqueCtrl",function($scope,$state,$rootScope,$http,gesCompte,Consult,Flash){
	gesCompte.estAutorise();
	
	$scope.mode="Nouveau";
	$scope.bouton = "valider";
	Consult.getRubriques();
	$scope.valider = function() {
		gesCompte.estConnecte();
		if ($scope.bouton == "valider") {
			gesCompte.posts("rubrique", {
				"nomRubrique" : $scope.data.nomRubrique,
				"prix":$scope.data.prix,
				"description":$scope.data.description
					}).success(function(r) {
						if(!r)
							$rootScope.err=true;
						else{
						
							Consult.getRubriques();
							Flash.create('success', 'Rubrique Créee avec succès', 'large-text text-center');
						
						}
				
			}).error(function(err) {
				alert(err.message);
			})
		} else {
			$http.put("rubrique", {
				"nomRubrique" : $scope.data.nomRubrique,
				"idRubrique":$scope.data.idRubrique,
				"prix":$scope.data.prix,
				"description":$scope.data.description
			}).success(function(data) {
				if(data)
					{
					
					Flash.create('success', 'Rubrique  modifiée  avec succès', 'large-text text-center');
					Consult.getRubriques();
					}
				else{
					Flash.create('danger', 'Modification echouée', 'large-text text-center');
				}
				$scope.bouton = "valider"
					$scope.mode = "Nouveau"
				
			})
		}
		$scope.data = {};
	}
	$scope.editer = function(id) {
		gesCompte.estAutorise();
		gesCompte.gets("rubrique/" + id).success(function(data) {
			console.log(data);
			$scope.data = data;
			$scope.bouton = "modifier";
			$scope.mode="Modification"
		})
	}
	$scope.modalsupprimer = function(id) {
		gesCompte.gets("rubrique/"+id).success(function(data) {
			
			$scope.suprubrique = data;
			$scope.connexionModale=true;
		})
	
	}
	$scope.supprimer = function(id) {
		gesCompte.estAutorise();
		gesCompte.gets("supprimerRub/" + id).success(function(data) {
			$scope.connexionModale=false;
			$scope.bouton = "valider"
			$scope.data = {};
			Consult.getRubriques();
		})
	}
	$scope.verifExisence=function(){
		if($scope.mode == "Nouveau")
			{
			gesCompte.gets("chercheRubrique/" + $scope.data.nomRubrique).success(function(data) {
			if(data){
				$scope.existe=true;
				$scope.message="Une rubrique du même nom existe déjà"
			}
		
			})
			}
		
	}
	$scope.resetnomrub=function(){
		$scope.existe="";
	}
});
