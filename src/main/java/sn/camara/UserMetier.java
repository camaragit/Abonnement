package sn.camara;

import java.util.List;

import org.springframework.data.domain.Page;

public interface UserMetier {
	public User saveUser(User ab);
	public List<User> listeUser();
	public User getRubrique(long id);
	public Page<User> getPageUser(int page,int taille);
	public void supprimerUser(User ab);
	public List<User> listeUserParnom(String nomrub);
	public List<User> listeAbonne();
	public List<User> listeAbonnes(String username);
	public User chercherUser(String mailUser);
	public User modifierAbonne(User u);
	public void EnvoiMessage(User u);
	public void EnvoiMail(String contenu,String email);
	public User verifcode(int code,String mail);
	public List<User> getAbonnes();

}
