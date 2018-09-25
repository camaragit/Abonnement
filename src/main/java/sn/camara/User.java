package sn.camara;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;


@Entity(name="utilisateur")
public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	private String username;
	@JsonIgnore
	private String password;
	private String nom;
	private String prenom;
	private String tel;
	@JsonIgnore
	private int codevalidation;
	@JsonIgnore
	private boolean actived;
	@ManyToMany(fetch=FetchType.EAGER)// fetch=FetchType.EAGER a resole le probleme suivant org.springframework.security.authentication.InternalAuthenticationServiceException: failed to lazily initialize a collection of role:
	@JoinTable(name="USERS_ROLE")
	private Collection<Role> roles;
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getTel() {
		return tel;
	}
	
	public int getCodevalidation() {
		return codevalidation;
	}
	public void setCodevalidation(int codevalidation) {
		this.codevalidation = codevalidation;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public boolean isActived() {
		return actived;
	}
	public void setActived(boolean actived) {
		this.actived = actived;
	}
	
	public User(String username, String password, String nom, String prenom, String tel, boolean actived) {
		super();
		this.username = username;
		this.password = password;
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.actived = actived;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Collection<Role> getRoles() {
		return roles;
	}
	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}
	
	

}