package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.GmailParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class GmailService {


    private final JavaMailSender javaMailSender;

    public GmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    public void sendMessage(GmailParam gmailParam) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("oussamabouzekraoui01@gmail.com");
        mimeMessageHelper.setTo(gmailParam.getTo());
        mimeMessage.setText(gmailParam.getBody());
        mimeMessage.setSubject(gmailParam.getTopic());

//        FileSystemResource fileSystemResource = new FileSystemResource(new File(gmailParam.getPath()));
//        mimeMessageHelper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);



        javaMailSender.send(mimeMessage);
        System.out.println("email sent");
    }

}
