package com.media.rest.microservices.mediaservice.controller;

import com.media.rest.microservices.mediaservice.bean.Audio;
import com.media.rest.microservices.mediaservice.repository.AudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class AudioController {

    @Autowired
    private AudioRepository repository;

    @GetMapping("/audios")
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<List<Audio>> retrieveAllAudios() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/audios/{id}")
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Audio> retrieveAudio(@PathVariable long id) {
        Optional<Audio> audio = repository.findById(id);
        if(audio.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(audio.get());
    }

    @PostMapping("/audios")
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Object> createAudio(@RequestBody Audio body) {
        Audio newAudio = repository.save(body);
        URI location  = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newAudio.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/audios/{id}")
    // @CrossOrigin(origins = "http://whatsgoodie.org")
    public ResponseEntity<Object> updateAudio(@PathVariable long id, @RequestBody Audio body) {
        Optional<Audio> oldAudio = repository.findById(id);
        if(oldAudio.isPresent()) {
            body.setId(id);
            repository.save(body);
            return ResponseEntity.ok(body);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/audios/{id}")
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
