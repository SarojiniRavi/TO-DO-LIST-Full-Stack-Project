package com.taskservice.UserTaskService.controller;

import com.taskservice.UserTaskService.domain.Task;
import com.taskservice.UserTaskService.domain.User;
import com.taskservice.UserTaskService.exception.TaskAlreadyExistsException;
import com.taskservice.UserTaskService.exception.TaskNotFoundException;
import com.taskservice.UserTaskService.exception.UserAlreadyExistsException;
import com.taskservice.UserTaskService.exception.UserNotFoundException;
import com.taskservice.UserTaskService.service.UserTaskService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/v2")
public class UserTaskServiceController {

    private UserTaskService userTaskService;
    private ResponseEntity responseEntity;

    @Autowired
    public UserTaskServiceController(UserTaskService userTaskService)
    {
        this.userTaskService = userTaskService;
    }

    @PostMapping("/saveUser")
    public ResponseEntity saveUser(@RequestBody User user)throws UserAlreadyExistsException
    {
        try{
            userTaskService.saveUser(user);
            responseEntity=new ResponseEntity(user, HttpStatus.CREATED);
        }
        catch (UserAlreadyExistsException exception)
        {
            throw new UserAlreadyExistsException();
        }
        catch (Exception exception)
        {
            responseEntity=new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
    @PostMapping("/user/task")
    public ResponseEntity saveTaskWithList(@RequestBody Task task, HttpServletRequest request) throws TaskAlreadyExistsException,UserNotFoundException
    {
        try {
            System.out.println("header" + request.getHeader("Authorization"));
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userEmail from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userEmail :: "+userEmail);
            task.setId(userTaskService.sequenceGenerate(Task.sequenceName));
            responseEntity = new ResponseEntity<>(userTaskService.saveUserTaskToList(task, userEmail), HttpStatus.CREATED);
        }
        catch (TaskAlreadyExistsException e)
        {
            throw new TaskAlreadyExistsException();
        }
        catch (Exception exception)
        {
            responseEntity=new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @GetMapping("/user/tasks")
    public ResponseEntity getAllUserTaskFromList(HttpServletRequest request)throws Exception
    {
        try {
            System.out.println("header" +request.getHeader("Authorization"));
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userEmail from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userId :: "+userEmail);
            responseEntity = new ResponseEntity<>(userTaskService.getAllUserTaskFromList(userEmail), HttpStatus.OK);
        }
        catch (Exception exception)
        {
            responseEntity=new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @DeleteMapping("/user/task/{id}")
    public ResponseEntity deleteTask(@PathVariable Integer id,HttpServletRequest request) throws TaskNotFoundException,UserNotFoundException
    {
        try {
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userEmail from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userEmail :: "+userEmail);
            responseEntity = new ResponseEntity<>(userTaskService.deleteTask(userEmail,id), HttpStatus.OK);
        }
        catch (TaskNotFoundException exception) {
            throw new TaskNotFoundException();
        }
        catch (Exception exception)
        {
            responseEntity=new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task task,@PathVariable Integer id,HttpServletRequest request)throws TaskNotFoundException,UserNotFoundException,TaskAlreadyExistsException {
        try {
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userId from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userEmail :: " + userEmail);
            responseEntity = new ResponseEntity<>(userTaskService.updateUserTaskListWithGivenTask(id,task,userEmail), HttpStatus.OK);
            System.out.println(task);
            System.out.println("Hi i am Update ");
        } catch (TaskNotFoundException e) {
            throw new TaskNotFoundException();
        } catch (Exception exception) {
            responseEntity = new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
    @GetMapping("/user/getTask/{id}")
    public ResponseEntity<?> getTaskByTaskId(@PathVariable Integer id,HttpServletRequest request)throws TaskNotFoundException,UserNotFoundException{
        try{
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userId from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userEmail :: " + userEmail);
            responseEntity=new ResponseEntity<>(userTaskService.getTaskByTaskId(id,userEmail),HttpStatus.FOUND);
        }catch (TaskNotFoundException e){
            responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PutMapping("/user/archiveTask/{id}")
    public ResponseEntity<?> archiveTask(@RequestBody Task task,@PathVariable Integer id ,HttpServletRequest request){
        try{
            Claims claims = (Claims) request.getAttribute("Claims");
            System.out.println("userId from claims :: " + claims.getSubject());
            String userEmail = claims.getSubject();
            System.out.println("userEmail :: " + userEmail);
            responseEntity=new ResponseEntity<>(userTaskService.archiveTask(task,userEmail,id),HttpStatus.FOUND);
        }catch (Exception e){
            responseEntity=new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
}
