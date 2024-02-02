package com.taskservice.UserTaskService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;


import java.util.Date;

@Document(collection = "tasks")
public class Task {
    //any field annoatated with @Transient  will not persist in the database
    @Transient
    public static final String sequenceName="taskSequence";
    @Id
    private Integer id;
    private String taskTitle;
    private String taskDescription;
    private String taskCategory;
    private boolean taskStatus;
    private String taskPriority;
    private Date taskDate;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }

    public String getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(String taskPriority) {
        this.taskPriority = taskPriority;
    }

    public Date getTaskDate() {
        return taskDate;
    }

    public boolean isTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(boolean taskStatus) {
        this.taskStatus = taskStatus;
    }
    public boolean getTaskStatus(){return taskStatus;}
    public void setTaskDate(Date taskDate) {
        this.taskDate = taskDate;
    }


    public Task() {
    }

    public Task(Integer id, String taskTitle, String taskDescription, String taskCategory, boolean taskStatus, String taskPriority, Date taskDate) {
        this.id = id;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.taskCategory = taskCategory;
        this.taskStatus = taskStatus;
        this.taskPriority = taskPriority;
        this.taskDate = taskDate;

    }


}
