import React, { useEffect, useState } from 'react';
import { createOrder, confirmPayment, getProfile } from './api';
import { useNavigate } from 'react-router-dom';

const SubscribeButton = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  // ✅ Load Razorpay script dynamically
  useEffect(() => {
    const scriptId = 'razorpay-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('✅ Razorpay script loaded');
        setIsRazorpayReady(true);
      };
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay SDK');
        setIsRazorpayReady(false);
      };
      document.body.appendChild(script);
    } else {
      setIsRazorpayReady(true);
    }
  }, []);

  const handlePayment = async () => {
    try {
      if (!window.Razorpay || !isRazorpayReady) {
        alert('❌ Razorpay SDK not loaded. Please refresh the page.');
        return;
      }

      console.log('🔑 Creating Razorpay order...');
      const orderResponse = await createOrder(token);
      const orderData =
        typeof orderResponse.data === 'string'
          ? JSON.parse(orderResponse.data)
          : orderResponse.data;

      console.log('🧾 Order received:', orderData);

      // Get user details from localStorage
      const storedUser = localStorage.getItem('user');
      let userInfo = { name: 'NoteApp User', email: 'user@example.com' };
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          userInfo.name = parsed.name || userInfo.name;
          userInfo.email = parsed.userName || userInfo.email;
        } catch (e) {
          console.warn('⚠️ Could not parse user from localStorage');
        }
      }

      const razorpay = new window.Razorpay({
        key: 'rzp_test_YH1ns2YOwVGPtQ',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'NoteApp',
        description: 'Premium Subscription',
        order_id: orderData.id,
        handler: async function (response) {
          console.log('✅ Payment Success:', response);

          await confirmPayment(
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            token
          );

          const updatedProfile = await getProfile(token);
          localStorage.setItem('user', JSON.stringify(updatedProfile.data));
          alert('🎉 Premium Activated!');
          navigate('/save-note');
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: '#0d6efd',
        },
        modal: {
          ondismiss: function () {
            console.warn('⚠️ Payment popup closed by user');
          },
        },
      });

      console.log('🚀 Opening Razorpay popup...');
      razorpay.open();
    } catch (err) {
      console.error('❌ Payment error occurred:', err);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button className="btn btn-warning" onClick={handlePayment} disabled={!isRazorpayReady}>
      🔐 Unlock Premium
    </button>
  );
};

export default SubscribeButton;
