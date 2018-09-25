package sn.camara;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;


@Service
public class MonUserDetails implements UserDetailsService {
	@Autowired
	private UserMetier metier;

	@Override
	public UserDetails loadUserByUsername(String mailUser) throws UsernameNotFoundException {
		
		System.out.println("*************UTILISATEUR PAR DAME CAMARA*****************");
		User u=metier.chercherUser(mailUser);
		if(u==null)
			//return null;
		System.out.println("*************UTILISATEUR PAR DAME CAMARA*****************"+u.getPrenom()+" "+u.getNom());
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for (Role role : u.getRoles()){
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getNomRole()));
        }
        return new MyUserPrincipal(u);
		//return new org.springframework.security.core.userdetails.User(u.getUsername(),u.getPassword(),grantedAuthorities);
	}

}