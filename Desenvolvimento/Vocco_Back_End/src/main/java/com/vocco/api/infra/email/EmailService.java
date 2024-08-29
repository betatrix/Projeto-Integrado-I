package com.vocco.api.infra.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

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

            String htmlMsg = "<!DOCTYPE html>"
                    + "<html lang='pt-BR'>"
                    + "<head>"
                    + "<meta charset='UTF-8'>"
                    + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                    + "<style>"
                    + "body {font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;}"
                    + ".container {max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}"
                    + ".header {background-color: #007BFF; color: #ffffff; padding: 20px 0; text-align: center; border-radius: 8px 8px 0 0;}"
                    + ".header h3 {margin: 0; font-size: 24px;}"
                    + ".content {padding: 20px; font-size: 18px;}"
                    + ".content p {line-height: 1.6;}"
                    + ".button-container {text-align: center; margin-top: 20px;}"
                    + ".button {display: inline-block; padding: 15px 30px; font-size: 18px; font-weight: bold; color: #ffffff !important; background-color: #0056b3; text-decoration: none; border-radius: 5px;}"
                    + ".footer {margin-top: 20px; font-size: 14px; color: #555555; text-align: center;}"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<div class='container'>"
                    + "<div class='header'><h3>Vocco - Recuperação de Senha</h3></div>"
                    + "<div class='content'>"
                    + "<p>Olá!</p>"
                    + "<p>Recebemos uma solicitação para redefinição de senha da sua conta Vocco.</p>"
                    + "<p>Defina uma nova senha clicando no botão abaixo:</p>"
                    + "<div class='button-container'><a href=\"" + url + "\" class='button'>Redefinir Senha</a></div>"
                    + "<p>Se você não reconhece esta solicitação ou não deseja alterar sua senha, basta ignorar esta mensagem.</p>"
                    + "<p>Em caso de dúvidas, entre em contato com o nosso suporte: <a href='mailto:voccosupp@outlook.com'>voccosupp@outlook.com</a></p>"
                    + "</div>"
                    + "<div class='footer'>"
                    + "<p>Esta é uma mensagem automática, por favor, não responda.</p>"
                    + "</div>"
                    + "</div>"
                    + "</body>"
                    + "</html>";

            helper.setTo(para);
            helper.setSubject("Vocco - Recuperação de Senha");
            helper.setText(htmlMsg, true); // Set to true to indicate the email body is HTML
            helper.setFrom("voccosupp@outlook.com");
            helper.setReplyTo("no-reply@vocco.com"); // Set the Reply-To header

            emailSender.send(mimeMessage);
            log.info("Email enviado");
        } catch (MessagingException e) {
            log.error("Erro ao enviar email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

