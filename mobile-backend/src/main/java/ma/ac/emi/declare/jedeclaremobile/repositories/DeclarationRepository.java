package ma.ac.emi.declare.jedeclaremobile.repositories;

import ma.ac.emi.declare.jedeclaremobile.models.decalaration.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeclarationRepository extends JpaRepository<Declaration, Long> {
}
