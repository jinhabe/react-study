package com.study.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "http://125.136.6.90:3000")
public class RootController {
}
