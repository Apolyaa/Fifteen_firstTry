package com.example.demo.controller;

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
}
