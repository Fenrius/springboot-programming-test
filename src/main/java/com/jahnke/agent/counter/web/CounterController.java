package com.jahnke.agent.counter.web;


import com.jahnke.agent.counter.model.CounterData;
import com.jahnke.agent.counter.repository.CounterRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class CounterController {

    private final CounterRepository counterRepository;

    public CounterController(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    @GetMapping("/CounterData")
    public Iterable<CounterData> get(){
        return counterRepository.findAll();
    }

    @GetMapping("/CounterData/{id}")
    public CounterData get(@PathVariable Integer id) {
        CounterData coda = counterRepository.findById(id).orElse(null);
        if (coda==null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return coda;
    }

    @DeleteMapping("/CounterData/{id}")
    public void delete(@PathVariable Integer id){
        counterRepository.deleteById(id);
    }

    @PostMapping("/CounterData")
    public CounterData create(@RequestBody @Valid String browser){
        CounterData coda= new CounterData();
        coda.setBrowser(browser);
        counterRepository.save(coda);
        return coda;
    }

}
