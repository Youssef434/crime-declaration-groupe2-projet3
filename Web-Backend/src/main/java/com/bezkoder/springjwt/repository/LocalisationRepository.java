package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.decalaration.Localisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalisationRepository extends JpaRepository<Localisation,Long> {
}
