package com.hotel.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/add")
	public ResponseEntity<Product> addProduct(@RequestParam String productName, @RequestParam Double price,
			@RequestParam String type, @RequestParam MultipartFile image,
			@AuthenticationPrincipal UserDetails userDetails) throws IOException {
		return ResponseEntity.ok(productService.addProduct(productName, price, type, image, userDetails));
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestParam String productName,
			@RequestParam Double price, @RequestParam String type, @RequestParam(required = false) MultipartFile image,
			@AuthenticationPrincipal UserDetails userDetails) throws IOException {
		return ResponseEntity.ok(productService.updateProduct(id, productName, price, type, image, userDetails));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
		productService.deleteProduct(id, userDetails);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/type/{type}")
	public ResponseEntity<List<Product>> getByType(@PathVariable String type) {
		return ResponseEntity.ok(productService.getProductsByType(type));
	}
}
