package com.taskmanager.controller;

import com.taskmanager.model.Task;
import com.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTaskByUser(@PathVariable long userId){
        return taskService.getAllTasksByUser(userId);
    }

    @PutMapping("/update/{taskId}")
    public Task updateTask(@RequestBody Task task, @PathVariable long taskId){
        return taskService.updateTask(task);
    }

    @DeleteMapping("/delete/{taskId}")
    public void deleteTask(@PathVariable long taskId){
        taskService.deleteTask(taskId);
    }
}
