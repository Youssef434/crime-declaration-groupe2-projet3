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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Telephone {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Length(min = 1, max = 3, message = "the country number length must be between 1 and 3")
  private int numeroPays;

  @NotBlank
  @Length(min = 7, max = 10, message = "the phone number length must be between 7 and 10")
  private long numeroTel;
}
