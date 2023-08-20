package com.media.rest.microservices.mediaservice.proxy;
//
//import com.media.rest.microservices.mediaservice.bean.Video;
//import com.media.rest.microservices.mediaservice.controller.VideoController;
//import com.media.rest.microservices.mediaservice.repository.VideoRepository;
//import com.media.rest.microservices.mediaservice.service.VideoService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//public class YouTubeAnalyticsScheduler {
//
//    @Autowired
//    private VideoRepository videoRepository;
//    @Autowired
//    private VideoController videoController;
//    @Autowired
//    private VideoService videoService;
//
//
//    @Scheduled(cron = "0 0 0 * * *") // Runs at the beginning of day
//    public void updateAnalytics() {
//        System.out.println("db videos updated!");
//        List<Video> items = videoController.retrieveAllVideos().getBody();
//
//        assert items != null;
//        for (Video item : items) {
//            String videoId = item.getYoutubeID();
//
//            // Fetch analytics data from YouTube API using the method from VideoService
//            videoService.setBody(item, videoId);
//
//            // Save the updated item in the database
//            videoRepository.save(item);
//        }
//    }
//}
import com.media.rest.microservices.mediaservice.bean.Video;
import com.media.rest.microservices.mediaservice.controller.VideoController;
import com.media.rest.microservices.mediaservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class YouTubeAnalyticsScheduler {

    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private VideoController videoController;


    @Scheduled(cron = "0 0 0 * * *") // Runs at the beginning of day
    public void updateAnalytics() {
	System.out.println("db videos updated!");
        List<Video> items = videoController.retrieveAllVideos().getBody();

        assert items != null;
        for (Video item : items) {
            String videoId = item.getYoutubeID();

            // Fetch analytics data from YouTube API using the method from VideoController
            videoController.setBody(item, videoId);

            // Save the updated item in the database
            videoRepository.save(item);
        }
    }
}
