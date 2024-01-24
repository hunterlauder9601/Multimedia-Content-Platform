package com.media.rest.microservices.mediaservice.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Audio {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "url", nullable = false)
    private String url;
    private String title;
    @Column(name = "description", length = 3000)
    private String description;
    private String author;
    private String creationDate;
    @Column(name = "order_sequence")
    private Integer order;

    public Audio(long id, String url, String title, String description, String author, String creationDate, Integer order) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
        this.author = author;
        this.creationDate = creationDate;
        this.order = order;
    }

    public Audio() {
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

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Audio{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", author='" + author + '\'' +
                ", creationDate='" + creationDate + '\'' +
                ", order=" + order +
                '}';
    }
}
