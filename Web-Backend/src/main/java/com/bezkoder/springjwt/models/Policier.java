package com.bezkoder.springjwt.models;

import com.bezkoder.springjwt.models.decalaration.Localisation;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Entity
public class Policier extends User{
    private String mle;
    private Status status;
    private LocalDate dateMiseEnService;
    @OneToOne
    private Localisation localisation;
    public Policier(String username, String password, String firstName, String lastName, Status status, LocalDate dateMiseEnService) {
        super(username, password, firstName,lastName);
        this.status=status;
        this.dateMiseEnService = dateMiseEnService;
    }

    public Policier() {
    }

    public Policier(Long id, String username,String password, String firstName, String lastName) {
        super(id, username,password, firstName,lastName);
    }

    public String getMle() {
        return mle;
    }

    public void setMle(String mle) {
        this.mle = mle;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getDateMiseEnService() {
        return dateMiseEnService;
    }

    public void setDateMiseEnService(LocalDate dateMiseEnService) {
        this.dateMiseEnService = dateMiseEnService;
    }

    public Localisation getLocalisation() {
        return localisation;
    }

    public void setLocalisation(Localisation localisation) {
        this.localisation = localisation;
    }
}
