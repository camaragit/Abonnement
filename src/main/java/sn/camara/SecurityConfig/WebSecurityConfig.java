package sn.camara.SecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
    private UserDetailsService userDetailsService;
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	  @Override
	  protected void configure(HttpSecurity http) throws Exception {
	    http.csrf().disable().authorizeRequests()
	        .antMatchers("/").permitAll()
	        .antMatchers(HttpMethod.POST, "/login").permitAll()
	        .anyRequest().authenticated()
	        .and()
	        .cors().and()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

	        // We filter the api/login requests
	        .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
	                UsernamePasswordAuthenticationFilter.class)
	        // And filter other requests to check the presence of JWT in header
	        .addFilterBefore(new JWTAuthenticationFilter(),
	                UsernamePasswordAuthenticationFilter.class);
	  }
	  @Bean
	    CorsConfigurationSource corsConfigurationSource() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
	        return source;
	    }

	  @Override
	  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	    // Create a default account
	 /*   auth.inMemoryAuthentication()
	        .withUser("admin")
	        .password("password")
	        .roles("ADMIN");*/
		  auth.userDetailsService(userDetailsService)
	         .passwordEncoder(new BCryptPasswordEncoder());
	  }
		@Override
		public void configure(WebSecurity web) throws Exception {
		    web.ignoring().antMatchers("/js/**");
		    web.ignoring().antMatchers("/favicon.ico");
		    web.ignoring().antMatchers("/angular/**");
		    web.ignoring().antMatchers("/css/**");
		    web.ignoring().antMatchers("/fonts/**");
		    web.ignoring().antMatchers("/log.html");
		    web.ignoring().antMatchers("/decon");
		    web.ignoring().antMatchers("/inscription");
		    web.ignoring().antMatchers("/envoimail");
		    web.ignoring().antMatchers("/verifcode");
		    web.ignoring().antMatchers("/modifpass");
		    web.ignoring().antMatchers("/usermail/**");
		    web.ignoring().antMatchers("/newabonne.html");
		    web.ignoring().antMatchers("/resetpass.html");
		    web.ignoring().antMatchers("/modifpassword.html");
		    	  
		    
		}
	}