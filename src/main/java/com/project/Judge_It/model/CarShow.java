package com.project.Judge_It.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CarShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;

    private String showName;
    private LocalDate date;
    private String city;
    private String state;
    private double cost;

    public CarShow(){

    }

    public CarShow(Long userId, String showName, LocalDate date, String city, String state, double cost) {
        this.userId = userId;
        this.showName = showName;
        this.date = date;
        this.city = city;
        this.state = state;
        this.cost = cost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getShowName() {
        return showName;
    }

    public void setName(String showName) {
        this.showName = showName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    // toString() method for logging and debugging
    @Override
    public String toString() {
        return "CarShow{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + showName + '\'' +
                ", date=" + date +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", cost=" + cost +
                '}';
    }
}
