package com.project.Judge_It.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Judge_It.model.CarShow;

@Repository
public interface CarShowRepository extends JpaRepository<CarShow, Long> {
    // Add custom query methods if needed
    List<CarShow> findByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId); 
}
