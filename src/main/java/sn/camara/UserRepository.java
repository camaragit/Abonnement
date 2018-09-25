package sn.camara;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User, String> {
	@Query("select u from utilisateur u where upper(u.username) =upper(:x) ")
	public User chercherUser(@Param("x") String nomUser);
	@Query(value="select * from utilisateur,users_role where utilisateur.username=users_role.utilisateur_username and users_role.roles_nom_role='ABONNE'",nativeQuery=true)
	public List<User> getAbonnes();
	public List<User> findByUsername(String username);
	@Query("select u from utilisateur u where u.codevalidation=:x and u.username=:y ")	
	public User userByCode(@Param("x") int code,@Param("y") String mail);

}
