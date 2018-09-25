
app.controller("abonnementCtrl",function($scope,$state,$rootScope,$http,gesCompte,Consult,Flash){
	$scope.bouton = "valider";
	$scope.mode="Nouveau";
	$scope.data={};
	
	$scope.data.serv=[];
	
	
	$scope.coche=[]
	gesCompte.gets("dame").success(function(data){
	console.log("dame "+data.dame);
	})
	gesCompte.gets("camara").success(function(data){
	console.log("camara "+JSON.stringify(data));
	})
	
	$scope.onPageChanged=function(){
		if(!$scope.data.page)
			$scope.data.page=1
		console.log($scope.data.page);
		gesCompte.gets("ServiceParpage/"+$scope.data.page).success(function(data){
			
			$rootScope.service=data.content
			$scope.total=data.totalPages
		})
	}
		
	$scope.changepageAbonnement=function(){
		if(!$scope.data.pageab)
			$scope.data.pageab=1
		console.log($scope.data.pageab);
	gesCompte.gets("abonnementpage/"+$scope.data.pageab).success(function(data){
			console.log(data)
			$rootScope.abonnement=data.content
			$scope.totalab=data.totalPages
		})
	
	}
	$scope.tester=function(id){		
		if($scope.coche[id]==true  )
		{	console.log("decoché "+$scope.coche[id]);
		$scope.coche[id]="bla";

		}else{
		console.log("coché "+$scope.coche[id]);
		$scope.coche[id]=true;
		console.log("tabl service "+JSON.stringify($scope.data.serv));
		}
	
	}
	$scope.resetval=function(){
		$scope.existeab="";
		$scope.nbseanceoublie=""
	}
	$scope.valider=function(){

			var i=0,nbseanceOublie=true;
			while(i<$scope.data.serv.length && nbseanceOublie==true)
				{
				console.log($scope.data.serv[i].nombre);
					if(!$scope.data.serv[i].nombre)
						{
						nbseanceOublie=false;
						}
					else
					i++;
				}
			if(nbseanceOublie==false)
				{
					$scope.nbseanceoublie=true;
					console.log(i);
					$scope.message="Vous n'avez pas indiqué le nombre de séance pour "+$scope.data.serv[i].nomService
				}
			else{
				$scope.data.serv[0].nomab=$scope.data.nomab;
				if($scope.bouton=="Modifier")
					$scope.data.serv[0].idabonnement=$scope.data.idabonnement
					else
						$scope.data.serv[0].idabonnement=-1;
				console.log($scope.data.serv);
				gesCompte.posts("saveabonnement",$scope.data.serv).success(function(data){
					$scope.changepageAbonnement();
					$scope.data=[];
					$scope.coche=[];
					if($scope.bouton=="Modifier")
						$scope.bouton="Valider"
						Flash.create('success', "Type d'abonnement crée avec succès ", 'large-text text-center');
						
					}).error(function(err){
							alert(err.message);
						})
				
			}
		
	
		
	}
	  $scope.chercherAbonnement=function(){
		  if($scope.data.nomab){
			  $http.get("abonnementparnom/"+$scope.data.nomab).success(function(data){
				  console.log(data)
					if(data)
						{
						$scope.existeab=true;
						$scope.message="Un type d'abonnement portant le même nom existe déjà";
						}
				});			  
		  }

		}
	  $scope.editer = function(id) {
			gesCompte.estAutorise();
			gesCompte.gets("abonnementedit/" + id).success(function(data) {
				console.log(data);
				$scope.data.nomab = data.nomabonnement;
				$scope.data.idabonnement=data.idAbonnement;
				$scope.data.serv=[];
				$scope.bouton = "Modifier";
				$scope.mode="Modification";
			})
	  }
		$scope.editerserv = function(id,code) {
			gesCompte.estAutorise();
			gesCompte.gets("service/" + id).success(function(data) {
				console.log(code)
				if(code==1)
					{
						$scope.etat="service";
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
		$scope.supprimer=function(id){
			gesCompte.gets("abonnement/" + id).success(function() {
				$scope.connexionModale=false;
				$scope.changepageAbonnement();
				
			})
		}
		
		$scope.editermod = function(id,code) {
			gesCompte.estAutorise();
			gesCompte.gets("abonnementedit/" + id).success(function(data) {
				console.log(data)
				if(code==2)
					{
						$scope.etat="detailsab";
						$scope.titre="Détails du type d'abonnement "+data.nomabonnement
					}
				else{
					$scope.etat="suppression";
					$scope.titre="Suppréssion du Service "+data.nomabonnement
				}
				$scope.connexionModale=true;
			
				$scope.dataedition = data;
				
			})

							
			}
	  $scope.dame=function(data){
		  console.log(data)
		  $scope.data.t=data.prenom+' '+data.nom
			 $scope.connexionModale=false;
	  }
	  $scope.getAbonne=function(){
		  $http.get("abonne/"+$scope.data.idAbonne).success(function(data){
			  console.log(JSON.stringify(data))
			  if(data!='')
			  $scope.data=data;
			  else{
					$scope.existe=true;
					$scope.message="Aucun abonné n'est associé à code";
			  }
		  })
	  }
});
app.controller("affectatonabonnementCtrl",function($scope,$state,$rootScope,$http,gesCompte,Consult,Flash,$filter){
	$scope.data={};
	$scope.data.serv={};
	$scope.madate=null;
	 $scope.myDate = new Date();
     $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() ,
        $scope.myDate.getDate() +1);
  
     $scope.verification=function(){
    	 var d=$filter('date')($scope.madate, "dd/MM/yyyy")
  
 		
 	}
	$scope.changepageAbonnement=function(){
		if(!$scope.data.pageab)
			$scope.data.pageab=1
		console.log($scope.data.pageab);
			gesCompte.gets("abonnementpage/"+$scope.data.pageab).success(function(data){
			$rootScope.abonnement=data.content
			$scope.totalab=data.totalPages
		})
	
	}
	$scope.getabonne=function(){
		if($scope.data.codeab)
			{
			gesCompte.gets("abonne/"+$scope.data.codeab).success(function(data){
				if(data!="")
					{
					console.log("save "+JSON.stringify(data))
				    $scope.data=data;
					$scope.data.serv=[];
					$scope.data.codeabsvg=data.idAbonne;
				  	 $http.get("verifAbonnement/"+$scope.data.codeabsvg).success(function(data){
			    		 if(data)
			    			 {
			    			 console.log("DAME CAMARA  "+JSON.stringify(data));
			    			 $scope.existeab=true;
								$scope.message=$scope.data.prenomAbonne+" "+$scope.data.nomAbonne+" a deja un abonnement en cours"
			    			 }
			    		 
			    		 else
			    			 console.log("PAS DE DATA")
			    	 })
					}
				else{
					$scope.existeab=true;
					$scope.message="Abonné non inexistant"
				}
				
			})
			}
	
	}
	$scope.resetreleve=function(){
		$scope.data.nomAbonne=$scope.data.telAbonne=$scope.data.prenomAbonne=$scope.data.email="";
		$scope.existeab=false;
	}
	$scope.confirmation=function(){
		$scope.data.serv=JSON.parse($scope.data.serv);
		$scope.etat="detailsabonnement";
		$scope.titre="Confirmation abonnement client"
		$scope.connexionModale=true;
	}
	$scope.tester=function(){
		console.log($scope.myDate);
	}
	$scope.validerAbonnement=function(){
	$scope.data.serv.codeab=$scope.data.codeabsvg;
	var d=$filter('date')($scope.madate, "dd/MM/yyyy")
	$scope.data.serv.dateexp=d;
	console.log("Type vaut "+JSON.stringify($scope.data.serv))
		$http.post("affection",$scope.data.serv).success(function(data){
			
			$scope.data={}
			$scope.madate=null;
			$scope.connexionModale=false;
			Flash.create('success',"Affectation reussie" , 'large-text text-center');
			
		})
		
	}
	
	$scope.editermod = function(id) {
		gesCompte.estAutorise();
		gesCompte.gets("abonnementedit/" + id).success(function(data) {			
			
			$scope.etat="detailsab";
			$scope.titre="Détails du type d'abonnement "+data.nomabonnement
							
		$scope.connexionModale=true;
		$scope.dataedition = data;
			
		})
			
		}

});

app.controller("etatabonnementCtrl",function($scope,$state,$rootScope,$http,gesCompte,Consult,Flash,$filter){
$scope.data={};
$scope.data.trx=[];
$scope.confirmation=function(){
	//$scope.data.serv=JSON.parse($scope.data.serv);
	$scope.etat="detailsabonnement";
	$scope.titre="Confirmation Transaction Abonné"
	$scope.connexionModale=true;
}
$scope.resetreleve=function(){
	$scope.data.nomAbonne=$scope.data.telAbonne=$scope.data.prenomAbonne=$scope.data.email="";
	$scope.existeab=false;
}
	$scope.getabonne=function(){
		if($scope.data.codeab)
			{
			gesCompte.gets("abonne/"+$scope.data.codeab).success(function(data){
				if(data!="")
					{
					console.log("save "+JSON.stringify(data))
				    $scope.data=data;
					$scope.data.serv=[];
					$scope.data.codeabsvg=data.idAbonne;
				  	 $http.get("verifAbonnement/"+$scope.data.codeabsvg).success(function(data){
			    		 if(data)
			    			 {
			    			 $scope.valide="true"
			    			 console.log("DAME CAMARA  "+JSON.stringify(data));
			    			 $scope.data.serv=data;
			    			 }
			    		 
			    		 else{
								$scope.existeab=true;
								$scope.message=$scope.data.prenomAbonne+" "+$scope.data.nomAbonne+" n'a aucun abonnement valide"
									
			    		 }
			    			 
			    	 })
					}
				else{
					$scope.existeab=true;
					$scope.message="Abonné non inexistant"
				}
				
			})
			}
	
	}
	$scope.transaction=function(){
		$http.post("transaction",$scope.data.trx).success(function(data){
		  	 $http.get("verifAbonnement/"+$scope.data.codeabsvg).success(function(data){
	    		 if(data)
	    			 {
	    			 console.log("DAME CAMARA  "+JSON.stringify(data));
	    			 $scope.data.serv=data;
	    			 }
	    		 
	    		 else
	    			 console.log("PAS DE DATA")
	    	 })
			$scope.connexionModale=false;
			Flash.create('success',"Transaction validée avec success" , 'large-text text-center');
		})
	}
})
