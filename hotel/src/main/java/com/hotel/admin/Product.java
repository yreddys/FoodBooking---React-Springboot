package com.hotel.admin;

import java.util.Optional;

import com.hotel.entity.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String productName;
	private Double price;
	private String type;

	@Lob
	private byte[] image;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users createdBy;

	// If needed, you can manually define the setter to accept Optional<Users>
	public void setCreatedBy(Optional<Users> user) {
		this.createdBy = user.orElse(null); // Or throw an exception if user is not present
	}
}
