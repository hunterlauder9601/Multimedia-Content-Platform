package com.media.rest.microservices.mediaservice.controller;

import com.media.rest.microservices.mediaservice.service.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class S3Controller {

    @Autowired
    private AwsS3Service awsS3Service;

    @GetMapping("/s3Url")
    public ResponseEntity<?> getS3UploadUrl() {
        try {
            Map<String, String> response = awsS3Service.generateUploadURL();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting signed URL");
        }
    }

    @DeleteMapping("/s3Url/{objectKey}")
    public ResponseEntity<?> deleteS3Object(@PathVariable String objectKey) {
        try {
            awsS3Service.deleteObject(objectKey);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting object");
        }
    }
}