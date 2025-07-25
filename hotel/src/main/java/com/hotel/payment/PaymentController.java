package com.hotel.payment;

import com.hotel.entity.Users;

import com.hotel.repository.UserRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import jakarta.transaction.Transactional;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin
public class PaymentController {

	@Value("${razorpay.key.id}")
	private String razorpayKey;

	@Value("${razorpay.key.secret}")
	private String razorpaySecret;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PaymentRepository paymentRepository;

	// ✅ Step 1: Create Razorpay Order

	@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@AuthenticationPrincipal UserDetails userDetails) {
		System.out.println("userDetails" + userDetails.toString());
		try {
			Users user = userRepo.findByUserName(userDetails.getUsername()).orElseThrow();

			RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

			int amount = 100;

			JSONObject options = new JSONObject();
			options.put("amount", amount);
			options.put("currency", "INR");
			options.put("receipt", "txn_noteapp_" + user.getUserId());
			options.put("payment_capture", true);

			Order order = client.Orders.create(options);

			// Save payment record with status CREATED
			Payment payment = new Payment();
			payment.setRazorpayOrderId(order.get("id"));
			payment.setAmount(amount);
			payment.setStatus("CREATED");
			payment.setUser(user);
			paymentRepository.save(payment);

			return ResponseEntity.ok(order.toString());

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order");
		}
	}

	// ✅ Step 2: Confirm payment & activate premium
	@PostMapping("/confirm")
	@Transactional
	public ResponseEntity<?> confirmPayment(@RequestBody PaymentConfirmationRequest request,
			@AuthenticationPrincipal UserDetails userDetails) {
		System.out.println("request" + request.toString());
		try {
			Users user = userRepo.findByUserName(userDetails.getUsername()).orElseThrow();
			Optional<Payment> paymentOpt = paymentRepository.findByRazorpayOrderId(request.getOrderId());

			if (paymentOpt.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment record not found");
			}

			Payment payment = paymentOpt.get();

			if (!validateSignature(request)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
			}

			// Mark payment as successful
			payment.setRazorpayPaymentId(request.getPaymentId());
			payment.setRazorpaySignature(request.getSignature());
			payment.setStatus("SUCCESS");
			paymentRepository.save(payment);

			// Activate premium on user
			user.setIsPremium(true);
			userRepo.save(user);

			return ResponseEntity.ok("Payment successful. Premium access activated.");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment confirmation failed");
		}
	}

	// ✅ Signature Validation
	private boolean validateSignature(PaymentConfirmationRequest request) throws Exception {
		String payload = request.getOrderId() + '|' + request.getPaymentId();
		String actualSignature = hmacSHA256(payload, razorpaySecret);
		return actualSignature.equals(request.getSignature());
	}

	private String hmacSHA256(String data, String key) throws Exception {
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
		sha256_HMAC.init(secret_key);
		return new String(Hex.encodeHex(sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8))));
	}
}
