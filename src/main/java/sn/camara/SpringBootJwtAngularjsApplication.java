package sn.camara;

import java.util.ArrayList;
import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class SpringBootJwtAngularjsApplication {

	public static void main(String[] args) {
		//SpringApplication.run(SpringBootJwtAngularjsApplication.class, args);
		ApplicationContext ctx=SpringApplication.run(SpringBootJwtAngularjsApplication.class, args);
		UserRepository userRepo=ctx.getBean(UserRepository.class);
		RoleRepository roleRepo=ctx.getBean(RoleRepository.class);
	
		//User u1=new User("dame","passer",true);
		//User u2=new User("aziz","aziz",true);
		User u1=new User("camaradame@gmail.com","passer","Camara","Dame","77 506 76 61",true);
		u1.setPassword(new BCryptPasswordEncoder().encode(u1.getPassword()));
		User u2=new User("bayediggy@yahoo.fr","aziz","Zoumarou","aziz","78 758 85 34",true);
		Role r=new Role("ADMIN","Administration");
		roleRepo.save(r);
		Collection<Role> roles = new ArrayList<>();
		roles.add(r);
		u1.setRoles(roles);;
		u2.setRoles(roles);
		userRepo.save(u1);
		userRepo.save(u2);
		double a=Math.random()*1000000;
		int z=(int) a;
		Logger logger = LoggerFactory.getLogger(SpringBootJwtAngularjsApplication.class);
		logger.info("RANDOM==========>");
		System.out.println("RANDOM==========>"+z);
		System.out.println("Mon log est dans "+System.getProperty("user.dir"));
	}
}
