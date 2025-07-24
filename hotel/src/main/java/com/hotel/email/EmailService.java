package com.hotel.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
	@Autowired
	private JavaMailSender javaMailSender;
//
//	@Value("${mail.username}")
//	private String FROM_EMAIL;
	
}
