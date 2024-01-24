package com.media.rest.microservices.mediaservice.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AwsS3Service {

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKey}")
    private String secretKey;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.bucketName}")
    private String bucketName;

    private AmazonS3 s3Client() {
        BasicAWSCredentials awsCred = new BasicAWSCredentials(accessKeyId, secretKey);
        return AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(awsCred))
                .build();
    }

    public Map<String, String> generateUploadURL() {
//        String bucketName = "wg-photo-bucket";
        String objectKey = generateUniqueKey();

        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60; // 1 minute expiration
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration);

        URL url = s3Client().generatePresignedUrl(generatePresignedUrlRequest);
        Map<String, String> response = new HashMap<>();
        response.put("url", url.toString());
        response.put("objectKey", objectKey);
        return response;
    }

    private String generateUniqueKey() {
        return UUID.randomUUID().toString();
    }

    public void deleteObject(String objectKey) {
//        String bucketName = "wg-photo-bucket";
        s3Client().deleteObject(new DeleteObjectRequest(bucketName, objectKey));
    }
}