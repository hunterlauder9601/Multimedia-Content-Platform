package com.media.rest.microservices.mediaservice.controller;

import com.media.rest.microservices.mediaservice.bean.Audio;
import com.media.rest.microservices.mediaservice.repository.AudioRepository;
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
public class AudioController {

    @Autowired
    private AudioRepository repository;

    @GetMapping("/audios")
    @Cacheable(value = "audios")
    public ResponseEntity<List<Audio>> retrieveAllAudios() {
        List<Audio> audios = repository.findAll(Sort.by(Sort.Direction.ASC, "order"));
        return ResponseEntity.ok(audios);
    }

    @GetMapping("/audios/{id}")
    @Cacheable(value = "audios")
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Audio> retrieveAudio(@PathVariable long id) {
        Optional<Audio> audio = repository.findById(id);
        if(audio.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(audio.get());
    }

    @PostMapping("/audios")
    @CacheEvict(value = "audios", allEntries = true)
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Object> createAudio(@RequestBody Audio body) {
        Integer maxOrder = repository.findMaxOrder();
        if (maxOrder == null) {
            maxOrder = 0;
        }
        body.setOrder(maxOrder + 1);

        Audio newAudio = repository.save(body);
        URI location  = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newAudio.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/audios/{id}")
    @CacheEvict(value = "audios", allEntries = true)
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Object> updateAudio(@PathVariable long id, @RequestBody Audio body) {
        Optional<Audio> oldAudio = repository.findById(id);
        if(oldAudio.isPresent()) {
            body.setId(id);
            body.setOrder(oldAudio.get().getOrder());
            repository.save(body);
            return ResponseEntity.ok(body);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/audios/reorder")
    @CacheEvict(value = "audios", allEntries = true)
    public ResponseEntity<Object> reorderAudios(@RequestBody List<Long> audioIds) {
        AtomicInteger order = new AtomicInteger(1);
        for (Long audioId : audioIds) {
            repository.findById(audioId).ifPresent(audio -> {
                audio.setOrder(order.getAndIncrement());
                repository.save(audio);
            });
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/audios/{id}")
    @CacheEvict(value = "audios", allEntries = true)
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Object> deleteAudio(@PathVariable long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }
}
