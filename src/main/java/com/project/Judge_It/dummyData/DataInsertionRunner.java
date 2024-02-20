package com.project.Judge_It.dummyData;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataInsertionRunner implements ApplicationRunner{
    
    @Autowired
    private CarShowDataGenerator carShowDataGenerator;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Run the data generation process
        carShowDataGenerator.generateDummyData(10);
    }
}
