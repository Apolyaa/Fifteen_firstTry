package com.example.fifteen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Calendar;

import static javax.persistence.GenerationType.AUTO;
@Entity
public class Game implements Serializable {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Integer id;
    private Calendar time;
    private Integer clicks;

    private Integer userID;

    public Game(Calendar time, Integer clicks, Integer userID) {
        this.time = time;
        this.clicks = clicks;
        this.userID = userID;
    }

    public Game() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Calendar getTime() {
        return time;
    }

    public void setTime(Calendar time) {
        this.time = time;
    }

    public Integer getClicks() {
        return clicks;
    }

    public void setClicks(Integer clicks) {
        this.clicks = clicks;
    }
}
