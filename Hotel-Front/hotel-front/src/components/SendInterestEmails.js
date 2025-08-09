// src/components/SendInterestEmails.js
import React, { useState } from 'react';
import { sendInterestEmails } from './api'; // Adjust path if needed

const SendInterestEmails = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  const handleSendEmails = async () => {
    try {
      setStatusMessage('Sending emails...');

      await sendInterestEmails(token);

      setStatusMessage('✅ Emails sent successfully!');
    } catch (error) {
      console.error('Error sending emails:', error);
      setStatusMessage('❌ Failed to send emails.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Send Interest Emails</h2>
      <button style={styles.button} onClick={handleSendEmails}>
        Send Emails
      </button>
      {statusMessage && <p style={styles.message}>{statusMessage}</p>}
    </div>
  );
};

// Basic inline styles
const styles = {
  container: { padding: '20px', textAlign: 'center' },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
  },
  message: { marginTop: '10px', fontWeight: 'bold' },
};

export default SendInterestEmails;
