package com.userauthenticationservice.UserAuthenticationService.service;

import com.userauthenticationservice.UserAuthenticationService.domain.User;
import com.userauthenticationservice.UserAuthenticationService.exception.InvalidCredentialsException;
import com.userauthenticationservice.UserAuthenticationService.exception.UserAlreadyExistsException;
import com.userauthenticationservice.UserAuthenticationService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUserIdAndUserPassword(String userEmail, String userPassword) throws InvalidCredentialsException {
        User loggedInUser=userRepository.findByUserEmailAndUserPassword(userEmail,userPassword);
        if(loggedInUser==null){
            throw new InvalidCredentialsException();
        }
        return loggedInUser;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistsException {
        if(userRepository.findById(user.getUserEmail()).isPresent()){
            throw new UserAlreadyExistsException();
        }
        return userRepository.save(user);
    }
}
