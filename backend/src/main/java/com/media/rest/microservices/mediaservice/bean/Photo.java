package com.media.rest.microservices.mediaservice.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

    @Entity
    public class Photo {
        @Id
        @GeneratedValue
        private long id;
        @Column(name = "url", nullable = false)
        private String url;
        private String title;
        @Column(name = "description", length = 3000)
        private String description;
        private String author;
        @Column(name = "order_sequence")
        private Integer order;
        @Column(name = "object_key", nullable = false)
        private String objectKey;

        public Photo() {
        }

        @Override
        public String toString() {
            return "Photo{" +
                    "id=" + id +
                    ", url='" + url + '\'' +
                    ", title='" + title + '\'' +
                    ", description='" + description + '\'' +
                    ", author='" + author + '\'' +
                    ", order=" + order +
                    ", objectKey='" + objectKey + '\'' +
                    '}';
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public Integer getOrder() {
            return order;
        }

        public void setOrder(Integer order) {
            this.order = order;
        }

        public String getObjectKey() {
            return objectKey;
        }

        public void setObjectKey(String objectKey) {
            this.objectKey = objectKey;
        }
    }
