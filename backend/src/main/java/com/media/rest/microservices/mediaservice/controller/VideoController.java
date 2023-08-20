package com.media.rest.microservices.mediaservice.controller;

import com.media.rest.microservices.mediaservice.bean.Video;
import com.media.rest.microservices.mediaservice.proxy.YoutubeProxy;
import com.media.rest.microservices.mediaservice.repository.VideoRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class VideoController {

    @Autowired
    private YoutubeProxy proxy;

    @Autowired
    private VideoRepository repository;

    @GetMapping("/videos")
    @Cacheable(value = "videos")
    // @CrossOrigin(origins = "https://whatsgoodie.org")
    public ResponseEntity<List<Video>> retrieveAllVideos() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/videos/{id}")
    @Cacheable(value = "videos")
    // @CrossOrigin(origins = "https://whatsgoodie.org")
    public ResponseEntity<Video> retrieveVideo(@PathVariable long id) {
        Optional<Video> video = repository.findById(id);
        if(video.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(video.get());
    }

    @PostMapping("/videos")
    @CacheEvict(value = "videos", allEntries = true)
    // @CrossOrigin(origins = "https://whatsgoodie.org")
    public ResponseEntity<Object> createVideo(@RequestBody Video body, @RequestParam String videoId) {
        System.out.println(body.toString());
        setBody(body, videoId);
        Video newVideo = repository.save(body);
        URI location  = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newVideo.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    public void setBody(@RequestBody Video body, @RequestParam String videoId) {
        String response = proxy.getVideoDetails(videoId);
        JSONObject res = new JSONObject(response);

        body.setYoutubeID(res.getJSONArray("items").getJSONObject(0).getString("id"));
        body.setTitle(res.getJSONArray("items").getJSONObject(0).getJSONObject("snippet").getString("title"));
        body.setCreationDate(res.getJSONArray("items").getJSONObject(0).getJSONObject("snippet").getString("publishedAt"));
        body.setViewCount(res.getJSONArray("items").getJSONObject(0).getJSONObject("statistics").getInt("viewCount"));
        body.setLikeCount(res.getJSONArray("items").getJSONObject(0).getJSONObject("statistics").getInt("likeCount"));
        body.setCommentCount(res.getJSONArray("items").getJSONObject(0).getJSONObject("statistics").getInt("commentCount"));

        java.time.Duration dur = java.time.Duration.parse(res.getJSONArray("items").getJSONObject(0).getJSONObject("contentDetails").getString("duration"));
        long totalSeconds = dur.get(java.time.temporal.ChronoUnit.SECONDS);
        long hours = totalSeconds / 3600;
        long minutes = (totalSeconds % 3600) / 60;
        long seconds = totalSeconds % 60;
        String timeString = String.format("%02d:%02d:%02d", hours, minutes, seconds);
        body.setLength(timeString);
    }

    @PutMapping("/videos/{id}")
    @CacheEvict(value = "videos", allEntries = true)
    // @CrossOrigin(origins = "https://whatsgoodie.org")
    public ResponseEntity<Object> updateVideo(@PathVariable long id, @RequestBody Video body, @RequestParam String videoId) {
        System.out.println(body.toString());
        Optional<Video> oldVideo = repository.findById(id);
        if(oldVideo.isPresent()) {
            setBody(body, videoId);
            body.setId(id);
            repository.save(body);
            return ResponseEntity.ok(body);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/videos/{id}")
    @CacheEvict(value = "videos", allEntries = true)
    // @CrossOrigin(origins = "https://whatsgoodie.org")
    public ResponseEntity<Object> deleteVideo(@PathVariable long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }

}
