package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.model.Order;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, Long> {

	Order findByOrderId(int orderId);

	List<Order> findAll();

}
