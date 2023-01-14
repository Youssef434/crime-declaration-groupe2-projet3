package com.bezkoder.springjwt;

import com.bezkoder.springjwt.models.Policier;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.Status;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.models.decalaration.Declaration;
import com.bezkoder.springjwt.models.decalaration.Localisation;
import com.bezkoder.springjwt.models.decalaration.ModeDeclaration;
import com.bezkoder.springjwt.repository.LocalisationRepository;
import com.bezkoder.springjwt.repository.PolicierRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.service.DeclarationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import static com.bezkoder.springjwt.models.ERole.*;

@SpringBootApplication
public class SpringBootSecurityJwtApplication {
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PolicierRepository policierRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	DeclarationService declarationService;

	@Autowired
	LocalisationRepository localisationRepository;


	public static void main(String[] args) {
    SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner() {
		return (args) -> {
			roleRepository.save(new Role(ROLE_ADMIN));
			roleRepository.save(new Role(ROLE_USER));
			roleRepository.save(new Role(ROLE_MODERATOR));
			roleRepository.save(new Role(ROLE_POLICIER));

			Localisation localisation1 = new Localisation(120,33.9715904,-6.8498129);
			Localisation localisation2 = new Localisation(130,33.9715904,-6.8498129);
			Localisation localisation3 = new Localisation(140,33.9715904,-6.8498129);
			Localisation localisation4 = new Localisation(150,33.9715904,-6.8498129);

			localisationRepository.save(localisation1);
			localisationRepository.save(localisation2);
			localisationRepository.save(localisation3);
			localisationRepository.save(localisation4);

			User user1 = new User("hammou@gmail.com", encoder.encode("password123"));
			Set<Role> roles = new HashSet<>();
			roles.add(roleRepository.findByName(ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
			user1.setRoles(roles);
			user1.setFirstName("Ilyas");
			user1.setLastName("Hammou");
			userRepository.save(user1);
			Set<Role> roles2 = new HashSet<>();
			roles2.add(roleRepository.findByName(ROLE_POLICIER).orElseThrow(() -> new RuntimeException("Error: Role is not found.")));

			List<Policier> policiers = Arrays.asList(new Policier("fatmi@gmail.com",encoder.encode("password123"),"fatmi","youssef", Status.EN_SERVICE, LocalDate.now()),
					new Policier("azzaoui@gmail.com",encoder.encode("password123"),"azzaoui", "hamza", Status.EN_SERVICE, LocalDate.now()),
					new Policier("ouboujemaa@gmail.com",encoder.encode("password123"),"ouboujemaa","Nizar", Status.EN_SERVICE,LocalDate.now()),
					new Policier("bouzekraoui@gmail.com",encoder.encode("password123"),"bouzekraoui","oussama", Status.EN_SERVICE,LocalDate.now()),
					new Policier("arrouk@gmail.com",encoder.encode("password123"),"Arrouk","Amine", Status.EN_SERVICE,LocalDate.now()),
					new Policier("arrouk2@gmail.com",encoder.encode("password123"),"Arrouk","Amine", Status.EN_SERVICE,LocalDate.now()),
					new Policier("arrouk3@gmail.com",encoder.encode("password123"),"Arrouk","Amine", Status.EN_SERVICE,LocalDate.now()),
					new Policier("arrouk4@gmail.com",encoder.encode("password123"),"Arrouk","Amine", Status.EN_SERVICE,LocalDate.now()),
					new Policier("arrouk5@gmail.com",encoder.encode("password123"),"Arrouk","Amine", Status.EN_SERVICE,LocalDate.now()));
			AtomicInteger i= new AtomicInteger(5);
			policiers.forEach(policier -> {
				i.getAndIncrement();
				policier.setRoles(roles2);
				policier.setMle("pol-012" + i);
				policier.setLocalisation(localisationRepository.findById(1L).get());
				policierRepository.save(policier);
			});


			declarationService.submitDeclaration(new Declaration("vol d'une voiture","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",localisationRepository.findById(1L).get(),null,null), ModeDeclaration.ANONYME);
			declarationService.submitDeclaration(new Declaration("vol d'une moto","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",localisationRepository.findById(2L).get(),null,null), ModeDeclaration.ANONYME);
			declarationService.submitDeclaration(new Declaration("vol d'un magasin","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",localisationRepository.findById(3L).get(),null,null), ModeDeclaration.ANONYME);
			declarationService.submitDeclaration(new Declaration("agression d'une femme","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",localisationRepository.findById(4L).get(),null,null), ModeDeclaration.ANONYME);

		};
	};


}
