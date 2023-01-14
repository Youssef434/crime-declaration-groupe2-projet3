package ma.ac.emi.declare.jedeclaremobile.models.declarant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String rue;

    @NotBlank
    private String ville;

    @NotBlank
    private String etat;

    @NotBlank
    @Length(min = 5)
    private String codePostal;
}
