package com.media.rest.microservices.mediaservice.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

@Entity
public class Video {

    @Id
    @GeneratedValue
    private long id;
    @Column(name = "youtubeid", nullable = false)
    private String youtubeID;
    private String title;
    private String creationDate;
    private String author;
    @Column(name = "description", length = 3000)
    private String description;
    private String length;
    private int viewCount;
    private int likeCount;
    private int commentCount;
    private String category;
    @Column(name = "order_sequence")
    private Integer order;

    public Video() {
    }

    public Video(long id, String youtubeID, String title, String creationDate, String author, String description, String length, int viewCount, int likeCount, int commentCount, String category, Integer order) {
        this.id = id;
        this.youtubeID = youtubeID;
        this.title = title;
        this.creationDate = creationDate;
        this.author = author;
        this.description = description;
        this.length = length;
        this.viewCount = viewCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.category = category;
        this.order = order;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(creationDate);
        Instant i = Instant.from(ta);
        Date d = Date.from(i);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String date = simpleDateFormat.format(d);
        this.creationDate = date;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    @Override
    public String toString() {
        return "Video{" +
                "id=" + id +
                ", youtubeID='" + youtubeID + '\'' +
                ", title='" + title + '\'' +
                ", creationDate='" + creationDate + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", length='" + length + '\'' +
                ", viewCount=" + viewCount +
                ", likeCount=" + likeCount +
                ", commentCount=" + commentCount +
                ", category='" + category + '\'' +
                ", order=" + order +
                '}';
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public String getYoutubeID() {
        return youtubeID;
    }

    public void setYoutubeID(String videoID) {
        this.youtubeID = videoID;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}
