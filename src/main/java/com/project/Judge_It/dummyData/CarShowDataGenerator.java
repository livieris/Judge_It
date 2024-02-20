package com.project.Judge_It.dummyData;

import java.time.LocalDate;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.Judge_It.model.CarShow;
import com.project.Judge_It.repository.CarShowRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CarShowDataGenerator {
    
    private static final Logger logger = LoggerFactory.getLogger(CarShowDataGenerator.class);

    @Autowired
    private CarShowRepository carShowRepository;
    
    public void generateDummyData(int count) {
        logger.info("IN GENERATOR");
        Random random = new Random();
        for (int i = 0; i < count; i++) {
            // Generate random data
            logger.info("IN LOOP TO INSERT");
            long userId = 5;
            String showName = "Car Show " + i;
            LocalDate date = LocalDate.now().plusDays(random.nextInt(30)); // Random date within 30 days
            String city = "City " + i;
            String state = "State " + i;
            double cost = random.nextDouble() * 1000; // Random cost
            int totalClasses = random.nextInt(30); // Random number of classes

            // Create CarShow object
            CarShow carShow = new CarShow();
            carShow.setUserId(userId);
            carShow.setName(showName);
            carShow.setDate(date);
            carShow.setCity(city);
            carShow.setState(state);
            carShow.setCost(cost);
            carShow.setTotalClasses(totalClasses);
            logger.info(carShow.toString());
            try {
                // Save to the database
                carShowRepository.save(carShow);
            } catch (Exception e) {
                // TODO: handle exception
                logger.error("DUMMY DATA INSERT ERROR: ", e);
                logger.info("ERROR: ", e);
            }
   
        }
    }
}
