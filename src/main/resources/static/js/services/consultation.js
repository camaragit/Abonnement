/**
 * 
 */
app.factory("Consult",function($http,$state,$rootScope,gesCompte){
	return{
		getAbonnes:function(){
						gesCompte.estConnecte();
						gesCompte.gets("users").success(function(data){
						//console.log(typeof(data));
						$rootScope.abonne=data.length>0?data:"";
							})

			},
			getRubriques:function(){
				gesCompte.estConnecte();
				gesCompte.gets("rubrique").success(function(data){
					//console.log(data)
						$rootScope.rubrique=data.length>0?data:"";
						})
			},
			getRubriqueSs:function(){
				gesCompte.estConnecte();
				gesCompte.gets("rubriquesansservice").success(function(data){
					//console.log(data)
						$rootScope.rubriquess=data.length>0?data:"";
						})
			},
			getServices:function(){
				gesCompte.estConnecte();
				gesCompte.gets("service").success(function(data){
						$rootScope.service=data.length>0?data:"";
						for(var i=0;i<data.length;i++)
							{
							$rootScope.service[i].nombre=0;
							}
						})
				
			},
			getServicesPage:function(){
				gesCompte.gets("ServiceParpage/1").success(function(data){
					console.log(data);
					$rootScope.service=data.content.length>0?data.content:"";
					$rootScope.total=data.totalPages;
					for(var i=0;i<data.content.length;i++)
						{
						$rootScope.service[i].nombre=0;
						}
				})
			}
			
		}
	});
