package com.media.rest.microservices.mediaservice.repository;

import com.media.rest.microservices.mediaservice.bean.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT MAX(p.order) FROM Photo p")
    Integer findMaxOrder();
}