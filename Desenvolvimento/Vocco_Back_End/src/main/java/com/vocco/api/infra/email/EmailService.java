package com.vocco.api.infra.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@Slf4j
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void enviarEmailRecuperacaoSenha(String para, String url) {
        log.info("Enviando email");
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String htmlMsg = Files.readString(Paths.get("src/main/java/com/vocco/api/infra/email/templates/RecoverPassword.html"));

            htmlMsg = htmlMsg.replace("${url}", url);

            helper.setTo(para);
            helper.setSubject("Vocco - Recuperação de Senha");
            helper.setText(htmlMsg, true); // Set to true to indicate the email body is HTML
            helper.setFrom("voccosupp@gmail.com");
            helper.setReplyTo("no-reply@vocco.com"); // Set the Reply-To header

            emailSender.send(mimeMessage);
            log.info("Email enviado");
        } catch (MessagingException e) {
            log.error("Erro ao enviar email: " + e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

