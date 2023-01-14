package ma.ac.emi.declare.jedeclaremobile.models.decalaration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ac.emi.declare.jedeclaremobile.models.declarant.Declarant;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Declaration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "a declaration must have a title")
    private String titre;

    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    private Localisation localisation;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="declaration_id")
    List<Attachment> piecesJointes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="declarant_id")
    private Declarant declarant;

    private final LocalDateTime declarationInstant = LocalDateTime.now();
}
