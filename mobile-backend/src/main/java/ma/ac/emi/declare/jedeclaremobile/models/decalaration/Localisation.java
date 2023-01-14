package ma.ac.emi.declare.jedeclaremobile.models.decalaration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Localisation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private double altitude;

    @NotBlank
    private double latitude;

    @NotBlank
    private double longitude;
}
