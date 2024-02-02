package com.userauthenticationservice.UserAuthenticationService.service;

import com.userauthenticationservice.UserAuthenticationService.domain.User;
import com.userauthenticationservice.UserAuthenticationService.exception.InvalidCredentialsException;
import com.userauthenticationservice.UserAuthenticationService.exception.UserAlreadyExistsException;



public interface IUserService {
    User findByUserIdAndUserPassword(String userEmail, String userPassword) throws InvalidCredentialsException;
    User saveUser(User user)throws UserAlreadyExistsException;
}
