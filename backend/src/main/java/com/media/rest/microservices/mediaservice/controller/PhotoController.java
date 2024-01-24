package com.media.rest.microservices.mediaservice.controller;

import com.media.rest.microservices.mediaservice.bean.Photo;
import com.media.rest.microservices.mediaservice.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/photos") // Added a base route for photos
public class PhotoController {

    @Autowired
    private PhotoRepository repository;

    @GetMapping
    @Cacheable(value = "photos")
    public ResponseEntity<List<Photo>> retrieveAllPhotos() {
        List<Photo> photos = repository.findAll(Sort.by(Sort.Direction.ASC, "order"));
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/{id}")
    @Cacheable(value = "photos")
    public ResponseEntity<Photo> retrievePhoto(@PathVariable long id) {
        Optional<Photo> photo = repository.findById(id);
        if (photo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(photo.get());
    }

    @PostMapping
    @CacheEvict(value = "photos", allEntries = true)
    public ResponseEntity<Object> createPhoto(@RequestBody Photo body) {
        Integer maxOrder = repository.findMaxOrder();
        if (maxOrder == null) {
            maxOrder = 0;
        }
        body.setOrder(maxOrder + 1);

        Photo newPhoto = repository.save(body);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newPhoto.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    @CacheEvict(value = "photos", allEntries = true)
    public ResponseEntity<Object> updatePhoto(@PathVariable long id, @RequestBody Photo body) {
        Optional<Photo> oldPhoto = repository.findById(id);
        if (oldPhoto.isPresent()) {
            body.setId(id);
            body.setOrder(oldPhoto.get().getOrder());
            repository.save(body);
            return ResponseEntity.ok(body);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/reorder")
    @CacheEvict(value = "photos", allEntries = true)
    public ResponseEntity<Object> reorderPhotos(@RequestBody List<Long> photoIds) {
        AtomicInteger order = new AtomicInteger(1);
        for (Long photoId : photoIds) {
            repository.findById(photoId).ifPresent(photo -> {
                photo.setOrder(order.getAndIncrement());
                repository.save(photo);
            });
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @CacheEvict(value = "photos", allEntries = true)
    public ResponseEntity<Object> deletePhoto(@PathVariable long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }
}