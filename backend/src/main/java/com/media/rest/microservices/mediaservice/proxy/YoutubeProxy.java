package com.media.rest.microservices.mediaservice.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="youtube", url = "https://www.googleapis.com")
public interface YoutubeProxy {
    @GetMapping("/youtube/v3/videos?id={videoId}&key=AIzaSyAyk41yYPysuvQmSAa9vwYnWP-sbU1qt54&part=id,snippet,statistics,contentDetails")
    public String getVideoDetails(@PathVariable String videoId);
}
