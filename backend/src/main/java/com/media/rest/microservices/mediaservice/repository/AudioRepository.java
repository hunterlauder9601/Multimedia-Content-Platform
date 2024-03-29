package com.media.rest.microservices.mediaservice.repository;

import com.media.rest.microservices.mediaservice.bean.Audio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AudioRepository extends JpaRepository<Audio, Long> {

    @Query("SELECT MAX(a.order) FROM Audio a")
    Integer findMaxOrder();

}