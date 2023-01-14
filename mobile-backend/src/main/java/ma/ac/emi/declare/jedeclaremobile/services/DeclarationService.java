package ma.ac.emi.declare.jedeclaremobile.services;


import ma.ac.emi.declare.jedeclaremobile.models.decalaration.Declaration;
import ma.ac.emi.declare.jedeclaremobile.models.decalaration.ModeDeclaration;

import ma.ac.emi.declare.jedeclaremobile.repositories.DeclarationRepository;
import org.springframework.stereotype.Service;

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
}
