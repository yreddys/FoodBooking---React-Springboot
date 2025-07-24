package com.hotel.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.entity.Users;
import com.hotel.repository.UserRepo;

import io.jsonwebtoken.io.IOException;
@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepo userRepository;

	public Product addProduct(String name, Double price, String type, MultipartFile image, UserDetails userDetails)
			throws IOException, java.io.IOException {
		Optional<Users> user = userRepository.findByUserName(userDetails.getUsername());

		Product product = new Product();
		product.setProductName(name);
		product.setPrice(price);
		product.setType(type);
		product.setImage(image.getBytes());
		product.setCreatedBy(user);

		return productRepository.save(product);
	}

	public Product updateProduct(Long id, String name, Double price, String type, MultipartFile image,
			UserDetails userDetails) throws IOException, java.io.IOException {
		Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

		product.setProductName(name);
		product.setPrice(price);
		product.setType(type);
		if (image != null && !image.isEmpty()) {
			product.setImage(image.getBytes());
		}

		return productRepository.save(product);
	}

	public List<Product> getProductsByType(String type) {
		return productRepository.findByType(type);
	}

	public void deleteProduct(Long id, UserDetails userDetails) {
		productRepository.deleteById(id);
	}
}
