package com.project.Judge_It.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.Judge_It.model.CarShowCategories;
import com.project.Judge_It.repository.*;
import com.project.Judge_It.exception.ResourceNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/carshowcategories")
public class CarShowCategoriesController {

    @Autowired
    private CarShowCategoriesRepository carShowCategoriesRepository;

    // Endpoint to retrieve all car shows
    @GetMapping("/all")
    public List<CarShowCategories> getAllCarShows() {
        return carShowCategoriesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarShowCategories> getCarShowCategoriesById(@PathVariable Long id) {
        CarShowCategories carShowCategories = carShowCategoriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car show not found with id: " + id));
        return ResponseEntity.ok(carShowCategories);
    }

    // Endpoint to get all classifications for a show.
    @GetMapping("/show/{showId}")
    public List<CarShowCategories> getCarShowCategoriesByShowId(@PathVariable Long showId) {
        return carShowCategoriesRepository.findByShowId(showId);
    }

    @SuppressWarnings("null")
    @PostMapping("/create")
    public CarShowCategories createCarShowCategories(@RequestBody CarShowCategories carShowCategories) {
        return carShowCategoriesRepository.save(carShowCategories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarShowCategories> updateCarShowCategories(@PathVariable Long id,
            @RequestBody CarShowCategories updatedCarShowCategories) {
        CarShowCategories carShowCategories = carShowCategoriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car show not found with id: " + id));

        carShowCategories.setClassDescription(updatedCarShowCategories.getClassDescription());
        carShowCategories.setClassification(updatedCarShowCategories.getClassification());
        carShowCategories.setComponent(updatedCarShowCategories.getComponent());
        carShowCategories.setDetail(updatedCarShowCategories.getDetail());
        carShowCategories.setPoints(updatedCarShowCategories.getPoints());
        carShowCategories.setClassLetter(updatedCarShowCategories.getClassLetter());
        carShowCategories.setShowId(updatedCarShowCategories.getShowId());

        CarShowCategories savedCarShowCategories = carShowCategoriesRepository.save(carShowCategories);
        return ResponseEntity.ok(savedCarShowCategories);
    }

    // Endpoint to delete specific detail.. ex: bodywork, shine..
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarShowCategories(@PathVariable Long id) {
        carShowCategoriesRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Endpoint to delete an entire category/component.. ex: Paint, Engine..
    @DeleteMapping("/classcomponent")
    public ResponseEntity<?> deleteByClassLetterAndComponent(@RequestParam String classLetter, @RequestParam String component) {
        try {
            carShowCategoriesRepository.deleteByClassLetterAndComponent(classLetter, component);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occured trying to delete the component: " + component + " from class: " + classLetter);
        }
    }

    // Endpoint to delete an entire shows categories..
    @DeleteMapping("/showid/{showId}")
    public ResponseEntity<?> deleteByShowId(@PathVariable Long showId) {
        try {
            carShowCategoriesRepository.deleteByShowId(showId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occured trying to delete the SHOW ID: " + showId);
        }
    }    

}
