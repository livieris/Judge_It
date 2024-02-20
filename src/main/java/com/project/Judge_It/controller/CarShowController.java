package com.project.Judge_It.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Judge_It.model.CarShow;
import com.project.Judge_It.repository.*;
import com.project.Judge_It.dummyData.CarShowDataGenerator;
import com.project.Judge_It.exception.ResourceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/carshows")
public class CarShowController {

    private static final Logger logger = LoggerFactory.getLogger(CarShowController.class);

    @Autowired
    private CarShowRepository carShowRepository;

    // Endpoint to create a new car show
    @PostMapping("/create")
    public CarShow createCarShow(@RequestBody CarShow carShow) {
        return carShowRepository.save(carShow);
    }
    
    // Endpoint to retrieve all car shows
    @GetMapping("/all")
    public List<CarShow> getAllCarShows() {
        return carShowRepository.findAll();
    }
    
    // Endpoint to retrieve a single car show by ID
    @GetMapping("/{id}")
    public ResponseEntity<CarShow> getCarShowById(@PathVariable Long id) {
        CarShow carShow = carShowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car show not found with id: " + id));
        return ResponseEntity.ok(carShow);
    }

    // Endpoint to get all car shows per user
    @GetMapping("/user/{userId}")
    public List<CarShow> getAllCarShowsByUserId(@PathVariable Long userId) {
        return carShowRepository.findByUserId(userId);
    }
    
    // Endpoint to update an existing car show
    @PutMapping("/{id}")
    public ResponseEntity<CarShow> updateCarShow(@PathVariable Long id, @RequestBody CarShow updatedCarShow) {
        CarShow carShow = carShowRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car show not found with id: " + id));
        
        carShow.setName(updatedCarShow.getShowName());
        carShow.setDate(updatedCarShow.getDate());
        carShow.setCity(updatedCarShow.getCity());
        carShow.setState(updatedCarShow.getState());
        carShow.setCost(updatedCarShow.getCost());
        carShow.setTotalClasses(updatedCarShow.getTotalClasses());
        
        CarShow savedCarShow = carShowRepository.save(carShow);
        return ResponseEntity.ok(savedCarShow);
    }
    
    // Endpoint to delete a car show by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarShow(@PathVariable Long id) {
        carShowRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Endpoint to delete all car show by userId
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteAllUsersCarShows(@PathVariable Long userId) {
        logger.info("IN DELETE:  " + userId);
        carShowRepository.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}
