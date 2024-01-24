package com.media.rest.microservices.mediaservice.repository;

import com.media.rest.microservices.mediaservice.bean.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query("SELECT MAX(v.order) FROM Video v")
    Integer findMaxOrder();
}
