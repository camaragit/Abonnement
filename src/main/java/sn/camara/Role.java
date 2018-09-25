package sn.camara;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Role implements Serializable {
	@Id
	private String nomRole;
	private String description;
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getNomRole() {
		return nomRole;
	}

	public void setNomRole(String nomRole) {
		this.nomRole = nomRole;
	}

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(String nomRole, String description) {
		super();
		this.nomRole = nomRole;
		this.description = description;
	}


	

}
