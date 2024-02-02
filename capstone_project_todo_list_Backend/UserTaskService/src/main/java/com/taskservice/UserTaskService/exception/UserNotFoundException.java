package com.taskservice.UserTaskService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "User Already Exists")
public class UserNotFoundException extends Throwable{
}
