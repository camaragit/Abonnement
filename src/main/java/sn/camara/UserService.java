package sn.camara;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sn.camara.error.CustomException;


@RestController
public class UserService {
@Autowired
private UserMetier uMetier;
@Autowired
private RoleRepository roleRepo;

	@RequestMapping(value="/users",method=RequestMethod.GET)
	public   List<User> listeUsers () throws CustomException{
			List<User> users =  uMetier.listeUser();
			if(users.isEmpty())
				throw new CustomException("Pas de data");
			return users;
	}
	@RequestMapping(value="/authenticate",method=RequestMethod.POST)
	public Map<String, Object> connexion(@RequestBody String username){
		Map<String, Object> tokenMap = new HashMap<String, Object>();
		
		return tokenMap;
	}
	@GetMapping(value ="/utilisateurs")


	public ResponseEntity<List<User>> listAllProducts() {
		List<User> products = uMetier.listeUser();
		if (products.isEmpty()) {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<List<User>>(products, HttpStatus.OK);
	}

	@RequestMapping(value="/abonnemail",method=RequestMethod.POST)
	public List<User> abonne(@RequestBody String username){
		return uMetier.listeAbonnes(username);
	}
	@RequestMapping(value="/abonne",method=RequestMethod.GET)
	public List<User> getAbonnes(){
		return uMetier.getAbonnes();
	}
	@RequestMapping(value="/verifcode",method=RequestMethod.POST)
	public User envoimail(@RequestBody User u){
		User a=uMetier.verifcode(u.getCodevalidation(),u.getUsername());
					return a;

	}
	public void SaveRole(User u){
		String nomrole = "";
		for(Role r:u.getRoles())
			nomrole=r.getNomRole();
		if(roleRepo.chercherRole(nomrole)==null)
		{
			String desc="";
			if(nomrole.equals("ADMIN"))
				 desc="ROLE ADMINISTRATEUR GENERAL";
			else
				desc="ROLE ABONNE";
			Role role=new Role(nomrole, desc);
			roleRepo.save(role);
		}
	}
}
