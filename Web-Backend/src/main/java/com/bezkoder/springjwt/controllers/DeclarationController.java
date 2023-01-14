package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.exceptions.InvalidFileException;
import com.bezkoder.springjwt.models.decalaration.Declaration;
import com.bezkoder.springjwt.models.decalaration.ModeDeclaration;
import com.bezkoder.springjwt.service.DeclarationService;
import com.bezkoder.springjwt.service.UploadAttachmentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class DeclarationController {
  private final DeclarationService declarationService;
  private final UploadAttachmentService uploadAttachmentService;

  public DeclarationController(DeclarationService declarationService, UploadAttachmentService uploadAttachmentService) {
    this.declarationService = declarationService;
    this.uploadAttachmentService = uploadAttachmentService;
  }

  @PostMapping("/submit-declaration")
  public ResponseEntity<Map<String, Object>> submitDeclaration(@RequestParam MultipartFile[] files,
                                                               @RequestParam String declarationStr,
                                                               @RequestParam ModeDeclaration modeDeclaration) {
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      @Valid Declaration declaration = objectMapper.readValue(declarationStr, Declaration.class);
      declaration.setPiecesJointes(uploadAttachmentService.storeAttachments(files));
      declarationService.submitDeclaration(declaration, modeDeclaration);
    } catch (JsonProcessingException e) {
      return new ResponseEntity<>(
          Map.of("message", "There's an issue with the JSON format of the body.",
              "timestamp", LocalDateTime.now()),
          HttpStatus.BAD_REQUEST
      );
    } catch (InvalidFileException e) {
      return new ResponseEntity<>(
          Map.of("message", e.getMessage(),
              "timestamp", LocalDateTime.now()),
          HttpStatus.BAD_REQUEST
      );
    }

    return new ResponseEntity<>(
        Map.of("message", "The declaration has been successfully submitted",
            "timestamp", LocalDateTime.now()),
        HttpStatus.CREATED
    );
  }

  @GetMapping("/get-all-declarations")
  public List<Declaration> getAllDeclarations() {
    return declarationService.getAllDeclarations();
  }
}
