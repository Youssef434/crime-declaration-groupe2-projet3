package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.decalaration.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeclarationRepository extends JpaRepository<Declaration, Long> {
}
