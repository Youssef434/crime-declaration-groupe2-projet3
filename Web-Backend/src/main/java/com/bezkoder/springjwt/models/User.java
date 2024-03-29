package com.bezkoder.springjwt.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
    })
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 40)
  @Email
  private String username;

  @NotBlank
  @Size(max = 120)
  private String password;

  @NotBlank
  private String firstName;

  //@NotBlank
  private String lastName;

  public User(Long id, String username, String fullName) {
    this.id = id;
    this.username = username;
    this.firstName = fullName;
  }

//  public User(String username, String password, String fullName, String lastName) {
//    this.username = username;
//    this.password = password;
//    this.firstName = fullName;
//    this.lastName = lastName;
//  }

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public User(String username, String password, String firstName, String lastName) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public User(Long id,String username, String password, String firstName, String lastName) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
}
