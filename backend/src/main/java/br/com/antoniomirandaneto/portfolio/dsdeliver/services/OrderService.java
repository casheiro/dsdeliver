package br.com.antoniomirandaneto.portfolio.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.antoniomirandaneto.portfolio.dsdeliver.dto.OrderDTO;
import br.com.antoniomirandaneto.portfolio.dsdeliver.entities.Order;
import br.com.antoniomirandaneto.portfolio.dsdeliver.repositories.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll(){
		List<Order> list = repository.FindOrdersWithProducts();
		
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
}
