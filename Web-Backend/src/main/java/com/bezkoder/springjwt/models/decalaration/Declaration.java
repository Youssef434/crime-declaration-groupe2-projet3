package com.bezkoder.springjwt.models.decalaration;

import com.bezkoder.springjwt.models.declarant.Declarant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    //(cascade = CascadeType.ALL)
    @OneToOne
    private Localisation localisation;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="declaration_id")
    List<Attachment> piecesJointes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="declarant_id")
    private Declarant declarant;

    private final LocalDateTime declarationInstant = LocalDateTime.now();

    public Declaration(String titre, String description, Localisation localisation, List<Attachment> piecesJointes, Declarant declarant) {
        this.titre = titre;
        this.description = description;
        this.localisation = localisation;
        this.piecesJointes = piecesJointes;
        this.declarant = declarant;
    }
}
