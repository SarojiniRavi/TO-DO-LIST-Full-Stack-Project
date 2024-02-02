package com.userauthenticationservice.UserAuthenticationService.security;

import com.userauthenticationservice.UserAuthenticationService.domain.User;

public interface SecurityTokenGenerator {
    String createToken(User user);
}
