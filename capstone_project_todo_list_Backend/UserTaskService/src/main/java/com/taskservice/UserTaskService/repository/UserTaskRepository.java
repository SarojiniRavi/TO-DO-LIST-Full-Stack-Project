package com.taskservice.UserTaskService.repository;


import com.taskservice.UserTaskService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTaskRepository extends MongoRepository<User,String> {

}
