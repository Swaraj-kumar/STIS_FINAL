// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CreditCard, Calendar, Mail, User } from 'lucide-react';
// import { submitRegistration } from '../services/registrationService';
// import './Registration.css';
// import axios from "axios";

// const Registration = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     country: '',
//     institution: '',
//     registrationType: 'regular',
//     dietaryRequirements: '',
//     specialNeeds: ''
//   });
//   const [errors, setErrors] = useState({});

//   const registrationTypes = {
//     regular: {
//       price: 299,
//       description: 'Regular Registration'
//     },
//     student: {
//       price: 149,
//       description: 'Student Registration'
//     },
//     earlyBird: {
//       price: 249,
//       description: 'Early Bird Registration'
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateStep = (currentStep) => {
//     const newErrors = {};
//     if (currentStep === 1) {
//       if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//       if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//       if (!formData.email.trim()) newErrors.email = 'Email is required';
//       else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//       if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
//       if (!formData.country.trim()) newErrors.country = 'Country is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(step)) {
//       setStep(prev => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setStep(prev => prev - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateStep(step)) return;
  
//     try {
//       setLoading(true);
//       const amount = registrationTypes[formData.registrationType].price * 100; // Convert to cents/paise
  
//       // Step 1: Create an order on the backend
//       const { data } = await axios.post("http://localhost:5000/create-order", {
//         amount,
//         currency: "USD", // Change to "INR" if only domestic payments
//       });
  
//       // Step 2: Redirect to Razorpay
//       const options = {
//         key: "rzp_test_9KRXZtQ9Db1R9f", // Get this from Razorpay Dashboard
//         amount: data.amount,
//         currency: data.currency,
//         name: "STIS-V Conference",
//         description: "Conference Registration Fee",
//         order_id: data.id,
//         handler: function (response) {
//           // Handle successful payment
//           alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
//           navigate("/payment-success"); // Redirect to success page
//         },
//         prefill: {
//           name: formData.firstName + " " + formData.lastName,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//       };
  
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       setErrors((prev) => ({
//         ...prev,
//         submit: "Payment failed. Please try again.",
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="registration-container">
//       <div className="registration-form-wrapper">
//         <div className="registration-progress">
//           <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
//             <User size={20} /> Personal Info
//           </div>
//           <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
//             <Calendar size={20} /> Registration Details
//           </div>
//           <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
//             <CreditCard size={20} /> Payment
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="registration-form">
//           {step === 1 && (
//             <div className="form-step">
//               <h2>Personal Information</h2>
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className={errors.firstName ? 'error' : ''}
//                 />
//                 {errors.firstName && <span className="error-message">{errors.firstName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className={errors.lastName ? 'error' : ''}
//                 />
//                 {errors.lastName && <span className="error-message">{errors.lastName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={errors.email ? 'error' : ''}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={errors.phone ? 'error' : ''}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   className={errors.country ? 'error' : ''}
//                 />
//                 {errors.country && <span className="error-message">{errors.country}</span>}
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="form-step">
//               <h2>Registration Details</h2>
//               <div className="form-group">
//                 <label>Registration Type</label>
//                 <select
//                   name="registrationType"
//                   value={formData.registrationType}
//                   onChange={handleInputChange}
//                 >
//                   {Object.entries(registrationTypes).map(([key, value]) => (
//                     <option key={key} value={key}>
//                       {value.description} - ${value.price}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Institution/Organization</label>
//                 <input
//                   type="text"
//                   name="institution"
//                   value={formData.institution}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Dietary Requirements</label>
//                 <textarea
//                   name="dietaryRequirements"
//                   value={formData.dietaryRequirements}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Special Needs/Requirements</label>
//                 <textarea
//                   name="specialNeeds"
//                   value={formData.specialNeeds}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           )}

//           {step === 3 && (
//             <div className="form-step">
//               <h2>Payment Details</h2>
//               <div className="payment-summary">
//                 <h3>Registration Summary</h3>
//                 <div className="summary-item">
//                   <span>Registration Type:</span>
//                   <span>{registrationTypes[formData.registrationType].description}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Amount:</span>
//                   <span>${registrationTypes[formData.registrationType].price}</span>
//                 </div>
//               </div>

//               <div className="payment-notice">
//                 <p>You will be redirected to PhonePe to complete your payment securely.</p>
//               </div>

//               {errors.submit && (
//                 <div className="error-message text-center mt-4">
//                   {errors.submit}
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="form-navigation">
//             {step > 1 && (
//               <button 
//                 type="button" 
//                 onClick={handleBack} 
//                 className="back-button"
//                 disabled={loading}
//               >
//                 Back
//               </button>
//             )}
//             {step < 3 ? (
//               <button 
//                 type="button" 
//                 onClick={handleNext} 
//                 className="next-button"
//                 disabled={loading}
//               >
//                 Next
//               </button>
//             ) : (
//               <button 
//                 type="submit" 
//                 className="submit-button"
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Proceed to Payment'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;









// import React from 'react';
// import './Registration.css';

// const Registration = () => {
//     return (
//         <div className="registration-container">
//             <h1 className="coming-soon-message">COMING SOON</h1>
//         </div>
//     );
// };

// export default Registration;





import React from 'react';
import './Registration.css';

const UserRegistration = () => {
    return (
        <div className="user-registration-container">
            <h1 className="coming-soon-message">COMING SOON</h1>
        </div>
    );
};

export default UserRegistration;
