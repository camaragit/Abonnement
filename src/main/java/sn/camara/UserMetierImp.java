package sn.camara;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserMetierImp implements UserMetier{
	@Autowired
private UserRepository userRepo;

	@Override
	public User saveUser(User u) {
		// TODO Auto-generated method stub
		u.setPassword(new BCryptPasswordEncoder().encode(u.getPassword()));
		for(Role r:u.getRoles())
		System.out.println(r.getNomRole());
		return userRepo.save(u);
	}

	@Override
	public List<User> listeUser() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public User getRubrique(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<User> getPageUser(int page, int taille) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void supprimerUser(User ab) {
		// TODO Auto-generated method stub
		userRepo.delete(ab);
		
	}

	@Override
	public List<User> listeUserParnom(String nomrub) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User chercherUser(String mailUser) {
		// TODO Auto-generated method stub
		return userRepo.chercherUser(mailUser);
	}

	@Override
	public List<User> listeAbonne() {
		// TODO Auto-generated method stub
	return userRepo.getAbonnes();
	}

	@Override
	public List<User> listeAbonnes(String username) {
		// TODO Auto-generated method stub
		return userRepo.findByUsername(username);
	}

	@Override
	public User modifierAbonne(User u) {
		// TODO Auto-generated method stub
		return userRepo.saveAndFlush(u);
	}


	@Override
	public User verifcode(int code,String mail) {
		// TODO Auto-generated method stub
		return userRepo.userByCode(code,mail);
	}

	@Override
	public List<User> getAbonnes() {
		// TODO Auto-generated method stub
		return userRepo.getAbonnes();
	}

	@Override
	public void EnvoiMessage(User u) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void EnvoiMail(String contenu, String email) {
		// TODO Auto-generated method stub
		
	}


}
