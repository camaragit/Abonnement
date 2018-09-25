package sn.camara.SecurityConfig;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.camara.MyUserPrincipal;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {
    TokenAuthenticationService authService = new TokenAuthenticationService();
    //TokenAuthenticationService authService=new TokenAuthenticationService();

  public JWTLoginFilter(String url, AuthenticationManager authManager) {
	    super(new AntPathRequestMatcher(url));
	    setAuthenticationManager(authManager);
	  }




    //essai d'authentifier l'utilisateur
	  @Override
	  public Authentication attemptAuthentication(
	      HttpServletRequest req, HttpServletResponse res)

	      throws AuthenticationException, IOException, ServletException {

		//  Authentication aut;
		  BufferedReader bufferedReader = req.getReader();

		if(bufferedReader.ready())
		{
			try {

				AccountCredentials loginRequest = new ObjectMapper().readValue(bufferedReader, AccountCredentials.class);
			/*AccountCredentials creds = new ObjectMapper()
					.readValue(req.getInputStream(), AccountCredentials.class);*/
				System.out.println("user passwrd ===>"+loginRequest.getPassword());
				System.out.println("user name ===>"+loginRequest.getUsername());

				return getAuthenticationManager().authenticate(
						new UsernamePasswordAuthenticationToken(
								loginRequest.getUsername(),
								loginRequest.getPassword(),
								Collections.emptyList()
						)
				);
			}
			catch (UnrecognizedPropertyException exception){
				throw new AuthenticationServiceException("Revoir les parametres fournis");
			}
			catch (JsonParseException exception){
				throw new AuthenticationServiceException("Parametres mal formés");

			}
			catch (InternalAuthenticationServiceException e){
				throw new AuthenticationServiceException(e.getMessage());

			}

		}
		else {

			throw new AuthenticationServiceException("Parametres mal formés");

		}

	  }
	//la methode appelée si l'authentification échoue
    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
		    String message;

				if(failed.getMessage()!=null)
				{
					if(failed.getMessage().equals("Bad credentials"))
						message ="Login ou Mot de Passe Incorrect";
					else{
						message = failed.getMessage();
					}
					System.out.println(failed.getMessage());
				}
				else message ="Login ou mot de passe Incorrect";



            response.sendError(401,message);

    }


    //la methode appelée si l'authentification se passe bien
	  @Override
	  protected void successfulAuthentication(
	      HttpServletRequest req,
	      HttpServletResponse res, FilterChain chain,
	      Authentication auth) throws IOException, ServletException {
		  MyUserPrincipal mu=(MyUserPrincipal) auth.getPrincipal();
			 System.out.println(mu.getUser().getPrenom());
		// User infoUserconnecte=umetier.chercherUser("");
		 // res.addHeader("user",auth.getPrincipal());
		  authService.addAuthentication(res, auth.getName(),mu.getUser());
		/*  TokenAuthenticationService
	        .addAuthentication(res, auth.getName());*/
	  }

	
	
	}
