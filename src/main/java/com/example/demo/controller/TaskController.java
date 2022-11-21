package com.example.demo.controller;

import com.sun.istack.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class TaskController {

    @GetMapping("/")
    public String start() {
        return "start";
    }
    @GetMapping("/game")
    public String game() {
        return "game";
    }
    @GetMapping("/reward")
    public String reward() {
        return "reward";
    }
    @PostMapping("/saveGameData")
    @ResponseStatus(HttpStatus.OK)
    public void saveGameData(@RequestBody String request) {
        Logger logger = LoggerFactory.getLogger(TaskController.class);
        logger.info(request);
    }
}

