package ma.ac.emi.declare.jedeclaremobile.models.declarant;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ac.emi.declare.jedeclaremobile.models.decalaration.ModeDeclaration;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Declarant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The CIN must not be blank.")
    @Length(min=7, max=7, message = "The CIN must be 8 characters long.")
    private String cin;

    @NotBlank(message = "The name must not be blank.")
    @Length(min=3, message = "The name must at lease be 3 characters long.")
    private String nom;

    @NotBlank(message = "The CIN must not be blank")
    @Length(min=3, message = "The surname must at lease be 3 characters long.")
    @Length(min=3)
    private String prenom;

    private LocalDate dateNaissance;

    @NotBlank(message = "The email should not be blank")
    @Email
    private String email;

    @OneToOne
    private Telephone telephone;

    @ManyToOne
    private Adresse adresse;
}
