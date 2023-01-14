package com.bezkoder.springjwt.models.decalaration;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

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
