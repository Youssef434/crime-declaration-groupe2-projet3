package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Policier;
import com.bezkoder.springjwt.repository.PolicierRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PolicierRepository policierRepository;

    @GetMapping("policiers")
    public List<Policier> getAlpoliciers(){
        List<Policier> policiers = new ArrayList<>();
        policierRepository.findAll().forEach(policier -> {
            Policier policier1 = new Policier(policier.getId(),policier.getUsername(),null,policier.getFirstName(),policier.getLastName());
            policier1.setId(policier.getId());
            policier1.setMle(policier.getMle());
            policier1.setStatus(policier.getStatus());
            policier1.setDateMiseEnService(policier.getDateMiseEnService());
            policier1.setLocalisation(policier.getLocalisation());
            policiers.add(policier1);
        });
        return policiers;

    }
}
