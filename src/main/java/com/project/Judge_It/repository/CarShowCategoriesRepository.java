package com.project.Judge_It.repository;

import org.springframework.stereotype.Repository;
import com.project.Judge_It.model.CarShowCategories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface CarShowCategoriesRepository extends JpaRepository<CarShowCategories, Long>{

    List<CarShowCategories> getCarShowCategoriesByShowId(Long showId);

    @Transactional
    void deleteByClassLetterAndComponent(String classLetter, String component);

    @Transactional
    void deleteByShowId(Long showId);

    @Query("SELECT c FROM CarShowCategories c WHERE c.showId= :showId ORDER BY c.classLetter ASC, c.classification ASC, c.classDescription ASC")
    List<CarShowCategories> findByShowIdOrdered(@Param("showId") Long showId);

    
}
