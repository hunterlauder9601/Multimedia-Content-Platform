# Media Service API Documentation

This document outlines the RESTful API endpoints for managing media content, including audio, photos, videos, and AWS S3 operations.

## Photo API

### Retrieve All Photos
- **GET** `/photos`
- Retrieves a list of all photo files.

### Retrieve Specific Photo
- **GET** `/photos/{id}`
- Retrieves a specific photo by its ID.

### Create New Photo
- **POST** `/photos`
- Creates a new photo entry.

### Update Photo
- **PUT** `/photos/{id}`
- Updates an existing photo by its ID.

### Reorder Photos
- **PUT** `/photos/reorder`
- Reorders photos based on a list of IDs.

### Delete Photo
- **DELETE** `/photos/{id}`
- Deletes a photo by its ID.

## S3 API

### Get S3 Upload URL
- **GET** `/s3Url`
- Generates a signed URL for uploading to AWS S3.

### Delete S3 Object
- **DELETE** `/s3Url/{objectKey}`
- Deletes an object from AWS S3 by its key.

## Audio API

### Retrieve All Audio
- **GET** `/audios`
- Retrieves a list of all audio files.

### Retrieve Specific Audio
- **GET** `/audios/{id}`
- Retrieves a specific audio file by its ID.

### Create New Audio
- **POST** `/audios`
- Creates a new audio file entry.

### Update Audio
- **PUT** `/audios/{id}`
- Updates an existing audio file by its ID.

### Reorder Audios
- **PUT** `/audios/reorder`
- Reorders audio files based on a list of IDs.

### Delete Audio
- **DELETE** `/audios/{id}`
- Deletes an audio file by its ID.

## Video API

### Retrieve All Videos
- **GET** `/videos`
- Retrieves a list of all video files.

### Retrieve Specific Video
- **GET** `/videos/{id}`
- Retrieves a specific video by its ID.

### Create New Video
- **POST** `/videos`
- Creates a new video entry.

### Update Video
- **PUT** `/videos/{id}`
- Updates an existing video by its ID.

### Reorder Videos
- **PUT** `/videos/reorder`
- Reorders videos based on a list of IDs.

### Delete Video
- **DELETE** `/videos/{id}`
- Deletes a video by its ID.
