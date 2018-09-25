package sn.camara;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface RoleRepository extends JpaRepository<Role, String> {
	@Query("select r from Role r where upper(r.nomRole) =upper(:x) ")
	public Role chercherRole(@Param("x") String nomRole);

}
