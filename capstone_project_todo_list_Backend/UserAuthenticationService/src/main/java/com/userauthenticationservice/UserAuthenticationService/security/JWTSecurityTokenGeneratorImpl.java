package com.userauthenticationservice.UserAuthenticationService.security;

import com.userauthenticationservice.UserAuthenticationService.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTSecurityTokenGeneratorImpl implements SecurityTokenGenerator {
    @Override
    public String createToken(User user) {
        Map<String, Object> claims= new HashMap<>();
        claims.put("userEmail",user.getUserEmail());
        return generateToken(claims,user.getUserEmail());
    }
    public String generateToken (Map<String,Object> claims, String subject){
        String jwtToken = Jwts.builder().setIssuer("Task")
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"privateKey")
                .compact();
        return jwtToken;
    }

}