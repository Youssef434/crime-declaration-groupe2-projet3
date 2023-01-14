package ma.ac.emi.declare.jedeclaremobile.services;

import ma.ac.emi.declare.jedeclaremobile.exceptions.InvalidFileException;
import ma.ac.emi.declare.jedeclaremobile.models.decalaration.Attachment;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UploadAttachmentService {
  private Attachment storeAttachment(MultipartFile file) throws InvalidFileException {
    String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

    try {
      return new Attachment(fileName, file.getContentType(), file.getBytes());
    } catch (IOException e) {
      throw new InvalidFileException("You are uploading an invalid file.");
    }
  }

  public List<Attachment> storeAttachments(MultipartFile[] files) throws InvalidFileException {
    List<Attachment> attachments = new ArrayList<>();

    for (MultipartFile file : files) {
      attachments.add(storeAttachment(file));
    }

    return attachments;
  }


}
