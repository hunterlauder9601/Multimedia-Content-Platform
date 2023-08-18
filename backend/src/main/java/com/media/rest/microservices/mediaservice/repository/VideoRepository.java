package com.media.rest.microservices.mediaservice.repository;

import com.media.rest.microservices.mediaservice.bean.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {

}
