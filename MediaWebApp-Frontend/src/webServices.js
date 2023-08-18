import axios from 'axios';

const API_BASE_URL = 'http://localhost';

class WebServices {

    getVideos() {
        return axios.get(`${API_BASE_URL}/videos`);
    }

    getVideo(url) {
        return axios.get(url);
    }

    postVideo(idToken, videoId, videoData) {
        return axios.post(`${API_BASE_URL}/videos`, videoData, {
            params: {
                videoId: videoId
            },
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        });
    }

    updateVideo(idToken, id, videoData, videoId) {
        return axios.put(`${API_BASE_URL}/videos/${id}`, videoData, {
            params: {
                videoId: videoId
            },
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        });
    }

    deleteVideo(idToken, id) {
        return axios.delete(`${API_BASE_URL}/videos/${id}`, {
            headers: {
                'Authorization': `Bearer ${idToken}`
            },
        });
    }

    getAudios() {
        return axios.get(`${API_BASE_URL}/audios`);
    }

    getAudio(url) {
        return axios.get(url);
    }

    postAudio(idToken, audioData) {
        return axios.post(`${API_BASE_URL}/audios`, audioData, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        });
    }

    updateAudio(idToken, id, audioData) {
        return axios.put(`${API_BASE_URL}/audios/${id}`, audioData, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
        });
    }

    deleteAudio(idToken, id) {
        return axios.delete(`${API_BASE_URL}/audios/${id}`, {
            headers: {
                'Authorization': `Bearer ${idToken}`
            },
        });
    }
}

export default new WebServices();
