# Multimedia Content Platform

## Description
The "Multimedia Content Platform" is a client-commissioned freelance project, developed for the brand "WhatsGoodie". This comprehensive web application is designed for showcasing diverse media content. It features work from YouTube and Soundcloud, along with a unique section for photography uploads. Tailored to the brand's image and vision, this platform enhances the visibility and accessibility of various media forms, offering a seamless user experience for content creators and consumers.
* Live Site: https://whatsgoodie.org/
* Admin Demo: https://www.youtube.com/watch?v=riCD1jXMETs

## Why?
This platform addresses the need for a unified and interactive space where different types of media content, including videos, audio, and photography, converge. The goal is to provide an intuitive and user-friendly environment for showcasing and exploring creative works, bridging the gap between content creators and their audiences, all under the "WhatsGoodie" brand umbrella.

## Quick Start

### Prerequisites
* Docker installed on your system.

### Clone Repository
* Clone this repository to your local machine.

### Build and Run
* Navigate to `MediaWebApp-Public/backend/` in your terminal/command prompt.
* Build the backend Docker image: `docker build -t backend:latest .`
* Start the Docker Compose services: `docker-compose up -d`
* Access the app at `http://localhost/`.

## Usage

### Accessing the Application
* Open your web browser and navigate to `http://localhost/` to view the application.

### Setting Up the Admin Portal
* Create your Firebase account and Firebase auth user account.
* Copy your Firebase web project configuration into `MediaWebApp-Frontend/src/util/firebase.js`.
* Rebuild with `npm run build` and replace the build in the root directory.
* Remove the old nginx container and execute `docker-compose up -d` again.
* Access the admin portal at `http://localhost/admin`.

### Configuring AWS S3 for Photography Uploads
* Create an AWS S3 Bucket with the name "wg-photo-bucket".
* Set "Block all public access" to OFF.
* Apply the following bucket policy:
```
  {
      "Version": "2012-10-17",
      "Id": "Policy1705976450171",
      "Statement": [
          {
              "Sid": "Stmt1705976443932",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:GetObject",
              "Resource": "arn:aws:s3:::wg-photo-bucket/*"
          }
      ]
  }
```
* Set the CORS configuration as follows:
```
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "HEAD", "GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```
* Create an IAM policy with the following configuration:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::wg-photo-bucket/*"
        }
    ]
}
```
* Attach this policy to an IAM user and create a permanent access key.
* Insert the access key credentials into `backend/src/main/resources/application.properties`:
```
aws.accessKeyId=<YOURKEYID>
aws.secretKey=<YOURKEYSECRET>
aws.region=<BucketRegion>
aws.bucketName=wg-photo-bucket
```
## Contributing
Contributions to the "WhatsGoodie" brand's Multimedia Content Platform are welcome! If you have ideas for improvements or want to enhance the application, please fork the repository, make your changes, and submit a pull request with your updates.
