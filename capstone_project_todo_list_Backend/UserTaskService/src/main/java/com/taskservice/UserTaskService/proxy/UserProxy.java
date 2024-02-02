package com.taskservice.UserTaskService.proxy;

import com.taskservice.UserTaskService.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="user-authentication-service", url="localhost:8083")
public interface UserProxy {

    @PostMapping("/api/v1/register")
    public ResponseEntity saveTask(@RequestBody User user);
}
