package com.taskservice.UserTaskService.service;

import com.taskservice.UserTaskService.domain.Task;
import com.taskservice.UserTaskService.domain.User;
import com.taskservice.UserTaskService.exception.TaskAlreadyExistsException;
import com.taskservice.UserTaskService.exception.TaskNotFoundException;
import com.taskservice.UserTaskService.exception.UserAlreadyExistsException;
import com.taskservice.UserTaskService.exception.UserNotFoundException;

import java.util.List;

public interface UserTaskService {

    User saveUser(User user) throws UserAlreadyExistsException;
    Task getTaskByTaskId(Integer id,String userEmail)throws TaskNotFoundException,UserNotFoundException;
    User saveUserTaskToList(Task task, String userEmail)throws TaskAlreadyExistsException,UserNotFoundException;
    User deleteTask(String userEmail,Integer id)throws UserNotFoundException, TaskNotFoundException;
    List<Task> getAllUserTaskFromList(String userEmail)throws Exception;
    User updateUserTaskListWithGivenTask(Integer id, Task task, String userEmail) throws UserNotFoundException, TaskNotFoundException,TaskAlreadyExistsException;
     int sequenceGenerate(String sequenceName);
    public List<Task> archiveTask(Task task,String userId, Integer id);
}
