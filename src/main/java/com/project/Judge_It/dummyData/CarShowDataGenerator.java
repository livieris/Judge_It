package com.project.Judge_It.dummyData;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.Judge_It.model.CarShow;
import com.project.Judge_It.model.CarShowCategories;
import com.project.Judge_It.repository.CarShowCategoriesRepository;
import com.project.Judge_It.repository.CarShowRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CarShowDataGenerator {

    private static final Logger logger = LoggerFactory.getLogger(CarShowDataGenerator.class);

    @Autowired
    private CarShowRepository carShowRepository;
    @Autowired
    private CarShowCategoriesRepository carShowCategoriesRepository;

    public void generateDummyData(int count) {
        logger.info("IN GENERATOR");
        Random random = new Random();

        logger.info("LOOP TO INSERT SHOWS");
        for (int i = 0; i < count; i++) {
            // Generate random data
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

            logger.info("IN LOOP TO INSERT SHOW CATEGORIES");
            String[] classificationList = new String[] { "Stock", "Modified", "Conv", "Import", "Vettes", "Hot Rod" };
            String[] classDescList = new String[] { "Car", "Truck" };

            Random r = new Random();
            int classificationRandomIndex = r.nextInt(classificationList.length);
            List<String> yearRanges = generateYearRanges(5);
            Map<String, Character> categoryDescriptionToLetter = new HashMap<>();
            char nextLetter = 'A';
            long showId = i;
            int catCount = count / 2;

            //Create half the car show count of categories
            //#TODO first insert needs to have empty detail points
            for (int j = 0; j < catCount; j++) {
                String classification = classificationList[classificationRandomIndex];

                r = new Random();
                int classDescRandomIndex = r.nextInt(classDescList.length);               
                String classDescription = yearRanges.get(r.nextInt(yearRanges.size())) + " " + classDescList[classDescRandomIndex];
                //Get Class Letter using class Description as the key.
                String lowerCaseDescription = classDescription.toLowerCase();
            
                if (!categoryDescriptionToLetter.containsKey(lowerCaseDescription)) {
                    categoryDescriptionToLetter.put(lowerCaseDescription, nextLetter);
                    nextLetter++;
                }
                String classLetter = "" + categoryDescriptionToLetter.get(lowerCaseDescription);
                Map<String, List<String>>[] componentDetailAssArray = getComponentAndDetail();
                for (Map<String, List<String>> associativeArray : componentDetailAssArray) {
                    // Loop through components
                    for (Map.Entry<String, List<String>> entry : associativeArray.entrySet()) {
                        String component = entry.getKey();
                        List<String> details = entry.getValue();
                        
                        // Insert component with empty detail
                        CarShowCategories carShowCategoriesEmptyDetials = new CarShowCategories();
                        carShowCategoriesEmptyDetials.setShowId(showId);
                        carShowCategoriesEmptyDetials.setClassification(classification);
                        carShowCategoriesEmptyDetials.setClassLetter(classLetter);
                        carShowCategoriesEmptyDetials.setClassDescription(classDescription);
                        carShowCategoriesEmptyDetials.setComponent(component);

                        logger.info(carShowCategoriesEmptyDetials.toString());
                        try {
                            // Save to the database
                            carShowCategoriesRepository.save(carShowCategoriesEmptyDetials);
                        } catch (Exception e) {
                            // TODO: handle exception
                            logger.error("DUMMY DATA INSERT ERROR CATEGORIES: ", e);
                            logger.info("CATEGORIES ERROR: ", e);
                        }
                        // Loop through details of each component and insert everything.
                        for (String detail : details) {
                            CarShowCategories carShowCategories = new CarShowCategories();
                            carShowCategories.setShowId(showId);
                            carShowCategories.setClassification(classification);
                            carShowCategories.setClassLetter(classLetter);
                            carShowCategories.setClassDescription(classDescription);
                            carShowCategories.setComponent(component);
                            carShowCategories.setDetail(detail);
                            carShowCategories.setPoints((random.nextInt(6) + 1) * 5);

                            logger.info(carShowCategories.toString());
                            try {
                                // Save to the database
                                carShowCategoriesRepository.save(carShowCategories);
                            } catch (Exception e) {
                                // TODO: handle exception
                                logger.error("DUMMY DATA INSERT ERROR CATEGORIES: ", e);
                                logger.info("CATEGORIES ERROR: ", e);
                            }
                        }
                    }
                }
            }
        }
    }

    public static List<String> generateYearRanges(int numOfRanges) {
        List<String> yearRanges = new ArrayList<>();
        Random random = new Random();

        int startYear = 1950;
        int endYear = 2000;

        for (int i = 0; i < numOfRanges; i++) {
            int start = random.nextInt(endYear - startYear + 1) + startYear;
            int end = random.nextInt(endYear - start + 1) + start;
            yearRanges.add(start + "-" + end);
        }

        return yearRanges;
    }

    public static Map<String, List<String>>[] getComponentAndDetail() {
        // Create an array of associative arrays (maps)
        Map<String, List<String>>[] arrayOfAssociativeArrays = new HashMap[3];

        // Create the first associative array for "Engine"
        Map<String, List<String>> engineAssociativeArray = new HashMap<>();
        List<String> engineValues = new ArrayList<>();
        engineValues.add("Shine");
        engineValues.add("Clean");
        engineValues.add("Custom");
        engineValues.add("Hoses");
        engineValues.add("Chrome");
        engineAssociativeArray.put("Engine", engineValues);

        // Create the second associative array for "Paint"
        Map<String, List<String>> paintAssociativeArray = new HashMap<>();
        List<String> paintValues = new ArrayList<>();
        paintValues.add("Shine");
        paintValues.add("Bodywork");
        paintValues.add("Gloss");
        paintValues.add("Clean");
        paintAssociativeArray.put("Paint", paintValues);

        // Create the third associative array for "Paint"
        Map<String, List<String>> interiorAssociativeArray = new HashMap<>();
        List<String> interiorValues = new ArrayList<>();
        interiorValues.add("Seats");
        interiorValues.add("Dash");
        interiorValues.add("Carpet");
        interiorValues.add("Headliner");
        interiorValues.add("Panels");
        interiorAssociativeArray.put("Interior", interiorValues);

        // Add the associative arrays to the array of associative arrays
        arrayOfAssociativeArrays[0] = engineAssociativeArray;
        arrayOfAssociativeArrays[1] = paintAssociativeArray;
        arrayOfAssociativeArrays[2] = interiorAssociativeArray;

        return arrayOfAssociativeArrays;
    }
}
