package com.media.rest.microservices.mediaservice.repository;

import com.media.rest.microservices.mediaservice.bean.Audio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudioRepository extends JpaRepository<Audio, Long> {

}