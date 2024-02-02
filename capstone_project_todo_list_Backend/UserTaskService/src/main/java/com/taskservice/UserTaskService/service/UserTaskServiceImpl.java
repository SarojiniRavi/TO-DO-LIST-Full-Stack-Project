package com.taskservice.UserTaskService.service;

import com.taskservice.UserTaskService.domain.SequenceOrder;
import com.taskservice.UserTaskService.domain.Task;
import com.taskservice.UserTaskService.domain.User;
import com.taskservice.UserTaskService.exception.TaskAlreadyExistsException;
import com.taskservice.UserTaskService.exception.TaskNotFoundException;
import com.taskservice.UserTaskService.exception.UserAlreadyExistsException;
import com.taskservice.UserTaskService.exception.UserNotFoundException;
import com.taskservice.UserTaskService.proxy.UserProxy;
import com.taskservice.UserTaskService.repository.UserTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class UserTaskServiceImpl implements UserTaskService {
     private MongoOperations mongoOperations;
    private UserTaskRepository userTaskRepository;
    private UserProxy userProxy;

    @Autowired
    public UserTaskServiceImpl(UserTaskRepository userTaskRepository,MongoOperations mongoOperations,  UserProxy userProxy) {
        this.userTaskRepository = userTaskRepository;
        this.userProxy = userProxy;
        this.mongoOperations=mongoOperations;
    }


    @Override
    public User saveUser(User user) throws UserAlreadyExistsException {
        if (userTaskRepository.findById(user.getUserEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        User users = userTaskRepository.save(user);
        if (!(users.getUserEmail().isEmpty())) {
            ResponseEntity response = userProxy.saveTask(user);
        }
        return users;
    }
    @Override
    public Task getTaskByTaskId(Integer id, String userEmail) throws TaskNotFoundException ,UserNotFoundException{
        try {
            Optional<User> userOptional = userTaskRepository.findById(userEmail);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<Task> taskOptional = user.getTaskList().stream()
                        .filter(task -> id==(task.getId()))
                        .findFirst();

                if (taskOptional.isPresent()) {
                    return taskOptional.get();
                } else {
                    throw new TaskNotFoundException();
                }
            } else {
                throw new UserNotFoundException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new TaskNotFoundException();
        }
    }

    @Override
    public User saveUserTaskToList(Task task, String userEmail) throws UserNotFoundException, TaskAlreadyExistsException {
        Optional<User> optionalUser = userTaskRepository.findById(userEmail);

        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException();
        }

        User user = optionalUser.get();
        if (user.getTaskList() == null) {
            user.setTaskList(new ArrayList<>());
        }
        for (Task existingTask : user.getTaskList()) {
            if (existingTask.getId() != null && existingTask.getId().equals(task.getId())) {
                throw new TaskAlreadyExistsException();
            }
        }
        user.getTaskList().add(task);

        User savedUser = userTaskRepository.save(user);
        return savedUser;
    }





    @Override
    public User deleteTask(String userEmail, Integer id) throws UserNotFoundException, TaskNotFoundException {
        boolean taskIdIsPresent = false;
        if (userTaskRepository.findById(userEmail).isEmpty()) {
            throw new UserNotFoundException();
        }
        User users = userTaskRepository.findById(userEmail).get();
        List<Task> list = users.getTaskList();
        taskIdIsPresent = list.removeIf(task -> task.getId()==id);
        if (!taskIdIsPresent) {
            throw new TaskNotFoundException();
        }
        users.setTaskList(list);
        User user1 = userTaskRepository.save(users);
        return user1;
    }
    @Override
    public User updateUserTaskListWithGivenTask(Integer id, Task task, String userEmail)
            throws UserNotFoundException, TaskNotFoundException, TaskAlreadyExistsException {
        Optional<User> userOptional = userTaskRepository.findById(userEmail);

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException();
        }

        User user = userOptional.get();

        if (user.getTaskList() == null) {
            throw new TaskNotFoundException();
        }

        List<Task> taskList = user.getTaskList();

        for (Task task1 : taskList) {
            if (task1.getId() != null && task1.getId().equals(task.getId())) {
                taskList.remove(task1);
                task1.setId(id);
                taskList.add(task);
                user.setTaskList(taskList);
                System.out.println("Hi, I am service layer");
                break;
            }
        }

        return userTaskRepository.save(user);
    }


    @Override
    public int sequenceGenerate(String sequenceName) {
        SequenceOrder counter = mongoOperations.findAndModify(query(where("_id").is(sequenceName)), new Update().inc("seq",1), options().returnNew(true).upsert(true),
                SequenceOrder.class);
        return !Objects.isNull(counter) ? (int) counter.getSeq() : 1;
    }

    @Override
    public List<Task> getAllUserTaskFromList(String userEmail) throws Exception {
        if (userTaskRepository.findById(userEmail).isEmpty()) {
            throw new Exception();
        }
        return userTaskRepository.findById(userEmail).get().getTaskList();
    }
    @Override
    public List<Task> archiveTask(Task task, String userId, Integer id) {
        Optional<User> optionalUser = userTaskRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Task> taskList = user.getTaskList();
            Optional<Task> optionalTask = taskList.stream()
                    .filter(userTask -> userTask.getId().equals(id))
                    .findFirst();

            if (optionalTask.isPresent()) {
                Task archivedTask = optionalTask.get();
                archivedTask.setTaskStatus(true);
                userTaskRepository.save(user);
                return taskList;
            }
        }
        return null;
    }



}



