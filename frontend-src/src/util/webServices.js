import axios from "axios";

const API_BASE_URL = "http://localhost";

class WebServices {

  // Video Controller
  
  getVideos() {
    return axios.get(`${API_BASE_URL}/videos`);
  }

  postVideo(idToken, videoId, videoData) {
    return axios.post(`${API_BASE_URL}/videos`, videoData, {
      params: {
        videoId: videoId,
      },
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  updateVideo(idToken, id, videoData, videoId) {
    return axios.put(`${API_BASE_URL}/videos/${id}`, videoData, {
      params: {
        videoId: videoId,
      },
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteVideo(idToken, id) {
    return axios.delete(`${API_BASE_URL}/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  reorderVideos(idToken, videoIds) {
    return axios.put(`${API_BASE_URL}/videos/reorder`, videoIds, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }


  // Audio Controller

  getAudios() {
    return axios.get(`${API_BASE_URL}/audios`);
  }

  postAudio(idToken, audioData) {
    return axios.post(`${API_BASE_URL}/audios`, audioData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  updateAudio(idToken, id, audioData) {
    return axios.put(`${API_BASE_URL}/audios/${id}`, audioData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  deleteAudio(idToken, id) {
    return axios.delete(`${API_BASE_URL}/audios/${id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  reorderAudios(idToken, audioIds) {
    return axios.put(`${API_BASE_URL}/audios/reorder`, audioIds, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }


  // S3 Controller

  getSecureUrl(idToken) {
    return axios.get(`${API_BASE_URL}/s3Url`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  uploadPhotoToS3(signedUrl, photo) {
    return axios.put(signedUrl, photo, {
      headers: {
        "Content-Type": photo.type,
      },
    });
  }

  deleteS3Object(idToken, objectKey) {
    return axios.delete(`${API_BASE_URL}/s3Url/${objectKey}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  // Photo Controller

  getPhotos() {
    return axios.get(`${API_BASE_URL}/photos`);
  }

  postPhoto(idToken, photoData) {
    return axios.post(`${API_BASE_URL}/photos`, photoData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  updatePhoto(idToken, id, photoData) {
    return axios.put(`${API_BASE_URL}/photos/${id}`, photoData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  deletePhoto(idToken, id) {
    return axios.delete(`${API_BASE_URL}/photos/${id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  reorderPhotos(idToken, photoIds) {
    return axios.put(`${API_BASE_URL}/photos/reorder`, photoIds, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new WebServices();
