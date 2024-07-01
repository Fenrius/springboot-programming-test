package com.jahnke.agent.counter.repository;

import com.jahnke.agent.counter.model.CounterData;
import org.springframework.data.repository.CrudRepository;

public interface CounterRepository extends CrudRepository <CounterData, Integer> {

}
