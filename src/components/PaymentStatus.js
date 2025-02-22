import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyPaymentStatus } from '../services/registrationService';

const PaymentStatus = () => {
  const [status, setStatus] = useState('checking');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const registrationId = params.get('registrationId');
        const paymentId = params.get('paymentId');

        if (!registrationId || !paymentId) {
          setStatus('error');
          return;
        }

        const result = await verifyPaymentStatus(registrationId, paymentId);
        setStatus(result.status);

        if (result.status === 'completed') {
          setTimeout(() => {
            navigate('/registration/success');
          }, 3000);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-status-container">
      {status === 'checking' && (
        <div className="status-message">
          <h2>Verifying Payment...</h2>
          <div className="spinner"></div>
        </div>
      )}
      {status === 'completed' && (
        <div className="status-message success">
          <h2>Payment Successful!</h2>
          <p>Redirecting to confirmation page...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="status-message error">
          <h2>Payment Verification Failed</h2>
          <p>Please contact support if the amount was deducted.</p>
          <button onClick={() => navigate('/registration')}>
            Return to Registration
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;