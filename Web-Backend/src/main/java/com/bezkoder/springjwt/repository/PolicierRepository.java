package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Policier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicierRepository extends JpaRepository<Policier,Long> {
}
