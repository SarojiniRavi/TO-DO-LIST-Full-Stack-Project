package com.userauthenticationservice.UserAuthenticationService.controller;

import com.userauthenticationservice.UserAuthenticationService.domain.User;
import com.userauthenticationservice.UserAuthenticationService.exception.InvalidCredentialsException;
import com.userauthenticationservice.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.userauthenticationservice.UserAuthenticationService.security.SecurityTokenGenerator;
import com.userauthenticationservice.UserAuthenticationService.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private IUserService userService;
    private SecurityTokenGenerator securityTokenGenerator;
    private ResponseEntity responseEntity;

    @Autowired
    public UserController(IUserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody User user)throws UserAlreadyExistsException {
       try{
           responseEntity= new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
       }catch (UserAlreadyExistsException e){
           responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
           throw new UserAlreadyExistsException();
       }
       return responseEntity;
    }
    @PostMapping("/login")
    public ResponseEntity<?>loginUser(@RequestBody User user)throws InvalidCredentialsException {
        User retrivedUser = userService.findByUserIdAndUserPassword(user.getUserEmail(), user.getUserPassword());
        if (retrivedUser == null) {
            responseEntity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            throw new InvalidCredentialsException();
        } else {
            String token = securityTokenGenerator.createToken(user);
            responseEntity = new ResponseEntity<>(token, HttpStatus.OK);
        }
        return responseEntity;
    }
}
