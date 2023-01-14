package com.bezkoder.springjwt.service;


import com.bezkoder.springjwt.models.decalaration.Declaration;
import com.bezkoder.springjwt.models.decalaration.ModeDeclaration;
import com.bezkoder.springjwt.repository.DeclarationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeclarationService {
    private final DeclarationRepository declarationRepository;

    public DeclarationService(DeclarationRepository declarationRepository) {
        this.declarationRepository = declarationRepository;
    }

    public void submitDeclaration(Declaration declaration, ModeDeclaration modeDeclaration) {
        if (modeDeclaration == ModeDeclaration.ANONYME) {
            declaration.setDeclarant(null);
        }

        declarationRepository.save(declaration);
    }

    public List<Declaration> getAllDeclarations(){
        return declarationRepository.findAll();
    }
}
