package br.com.antoniomirandaneto.portfolio.dsdeliver.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.antoniomirandaneto.portfolio.dsdeliver.dto.OrderDTO;
import br.com.antoniomirandaneto.portfolio.dsdeliver.dto.ProductDTO;
import br.com.antoniomirandaneto.portfolio.dsdeliver.entities.Order;
import br.com.antoniomirandaneto.portfolio.dsdeliver.entities.OrderStatus;
import br.com.antoniomirandaneto.portfolio.dsdeliver.entities.Product;
import br.com.antoniomirandaneto.portfolio.dsdeliver.repositories.OrderRepository;
import br.com.antoniomirandaneto.portfolio.dsdeliver.repositories.ProductRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll(){
		List<Order> list = orderRepository.FindOrdersWithProducts();
		
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto){
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(),
				dto.getLongitude(), Instant.now(), OrderStatus.PENDING);
		for	(ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setDelivered(Long id){
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.DELIVERED);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
}
