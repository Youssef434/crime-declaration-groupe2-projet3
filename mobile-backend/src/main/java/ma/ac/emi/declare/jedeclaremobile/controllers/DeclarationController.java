package ma.ac.emi.declare.jedeclaremobile.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.ac.emi.declare.jedeclaremobile.exceptions.InvalidFileException;
import ma.ac.emi.declare.jedeclaremobile.models.decalaration.Declaration;
import ma.ac.emi.declare.jedeclaremobile.models.decalaration.ModeDeclaration;
import ma.ac.emi.declare.jedeclaremobile.services.DeclarationService;
import ma.ac.emi.declare.jedeclaremobile.services.UploadAttachmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.time.LocalDateTime;
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
}
