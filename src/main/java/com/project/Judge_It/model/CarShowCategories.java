package com.project.Judge_It.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CarShowCategories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long showId;

    private String classification;
    private String classLetter;
    private String classDescription;
    private String component;
    private String detail;
    private int points;

    public CarShowCategories(){

    }

    public CarShowCategories(Long showId, String classification, String classLetter, String classDescription, String component, String detail, int points) {
        this.showId = showId;
        this.classification = classification;
        this.classLetter = classLetter;
        this.classDescription = classDescription;
        this.component = component;
        this.detail = detail;
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getClassLetter() {
        return classLetter;
    }

    public void setClassLetter(String classLetter) {
        this.classLetter = classLetter;
    }

    public String getClassDescription() {
        return classDescription;
    }

    public void setClassDescription(String classDescription) {
        this.classDescription = classDescription;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    // toString() method for logging and debugging
    //id will print null, it is not null. It's a refresh issue with spring H2.
    @Override
    public String toString() {
        return "CarShowCategoires{" +
                "id=" + id +
                ", showId=" + showId +
                ", classification='" + classification + '\'' +
                ", classLetter=" + classLetter +
                ", classDescription='" + classDescription + '\'' +
                ", component='" + component + '\'' +
                ", detail=" + detail + '\'' +
                ", points=" + points +
                '}';
    }
}
