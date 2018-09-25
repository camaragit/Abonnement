package sn.camara.SecurityConfig;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import static java.util.Collections.emptyList;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import sn.camara.UserMetier;

public class TokenAuthenticationService {

	  private UserMetier metier;
	  private final long EXPIRATIONTIME = 864_000_000; // 10 days
	  private final String SECRET = "ThisIsASecret";
	  private final String TOKEN_PREFIX = "Bearer";
	  private final String HEADER_STRING = "Authorization";
	
	  public void addAuthentication(HttpServletResponse res, String username,Object o) throws JsonProcessingException {
		    String JWT = Jwts.builder()
		        .setSubject(username)
		        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
		        .signWith(SignatureAlgorithm.HS512, SECRET)
		        .compact();
		    ObjectMapper mapper = new ObjectMapper();
		    String userinfo = mapper.writeValueAsString(o);
		    res.addHeader("user",userinfo);
		    res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
		    
		  }
	  public Authentication getAuthentication(HttpServletRequest request) {
		  
		    String token = request.getHeader(HEADER_STRING);
		    if (token != null) {
		      // parse the token.
		      String user = Jwts.parser()
		          .setSigningKey(SECRET)
		          .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
		          .getBody()
		          .getSubject();

		      if (user != null){
		    	 System.out.println("***********USER FROM TOKEN*************  "+user);

		    	  return new UsernamePasswordAuthenticationToken(user,null,emptyList());
				
		      }
			else
				return null;
		    }
		    return null;
		  }

}
