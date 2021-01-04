package br.com.antoniomirandaneto.portfolio.dsdeliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.antoniomirandaneto.portfolio.dsdeliver.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
