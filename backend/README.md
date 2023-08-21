To build the backend image, execute the following:
docker build -t backend:latest .

REST APIs:
GET /videos
GET /videos/{id}
POST /videos
PUT /videos/{id}
DELETE /videos/{id}

GET /audios
GET /audios/{id}
POST /audios
PUT /audios/{id}
DELETE /audios/{id}

Please note that in the original implementation, the audio and video services where split into two independent microservices. However, due to harsh resource constraints, these were then merged into one.
