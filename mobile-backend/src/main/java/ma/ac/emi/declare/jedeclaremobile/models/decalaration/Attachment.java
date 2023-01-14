package ma.ac.emi.declare.jedeclaremobile.models.decalaration;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Attachment {
  @Id
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid2")
  private String id;

  private String name;

  private String type;

  @Lob
  private byte[] content;

  public Attachment() {}

  public Attachment(String name, String type, byte[] content) {
    this.name = name;
    this.type = type;
    this.content = content;
  }
}
