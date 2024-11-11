// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/consumersignup.css"; // Ensure you have the updated CSS file
// import csignupImage from "../assests/images/signup2.jpg";
// import axios from "axios";
// import Header from "../component/Header";
// import Footer from "../component/Footer";

// export const ConsumerSignup = () => {
//   const navigate = useNavigate();
//   /*
//      "name": "Bgmh",
//   "email": "bgmh12312@example.com",
//   "companyCode":"+92300",
//   "phonenumber": "1234567",
//   "address": "123 Main St, Lahore, Pakistan",
//   "password": "Password123!",
//   "confirmpassword": "Password123!"
  
//   */


//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     companyCode: '+92',
//     phonenumber: '',
//     address: '',
//     password: '',
//     confirmpassword: ''
//   });
//   const [error, setError] = useState({});
//   const [success, setSuccess] = useState('');

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     const nameRegex = /^[A-Za-z]{3,15}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{7}$/;
//     const addressRegex = /^[A-Za-z0-9\s,.-]{10,}$/;
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

//     // Validation checks
//     if (!form.name) errors.name = "Name is required.";
//     else if (!nameRegex.test(form.name)) errors.name = "Name must be 3-15 letters.";

//     if (!form.email) errors.email = "Email is required.";
//     else if (!emailRegex.test(form.email)) errors.email = "Enter a valid email address.";

//     if (!form.phone) errors.phone = "Phone number is required.";
//     else if (!phoneRegex.test(form.phone)) errors.phone = "Phone number must be exactly 7 digits.";

//     if (!form.address) errors.address = "Address is required.";
//     else if (!addressRegex.test(form.address)) errors.address = "Address must be at least 10 characters.";

//     if (!form.password) errors.password = "Password is required.";
//     else if (!passwordRegex.test(form.password)) errors.password = "Password must be 8-15 characters, with 1 uppercase letter and 1 special character.";

//     if (!form.confirmpassword) errors.confirmpassword = "Confirm password is required.";
//     else if (form.password !== form.confirmpassword) errors.confirmpassword = "Passwords do not match.";

//     console.log("Errors:", errors);  // Debugging line

//     return errors;
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Concatenate companyCode and phone to form the full phone number
//   const fullPhoneNumber = form.companyCode + form.phonenumber;  // Changed 'phone' to 'phonenumber'

//   // Prepare form data with the concatenated phone number
//   const formData = {
//     name: form.name,
//     email: form.email,
//     companyCode: form.companyCode,  // Keeping the company code as it is
//     phonenumber: fullPhoneNumber,   // Send the concatenated phone number
//     address: form.address,
//     password: form.password,
//     confirmpassword: form.confirmpassword
//   };

//   try {
//     // Send POST request to the signup endpoint
//     const response = await axios.post(`http://localhost:5000/api/Auth/signup`, formData);

//     // Handle successful signup response
//     if (response.data.success) {
//       setSuccess("Signup successful! Please verify your email.");
//       setError({});

//       // Redirect to login page after a delay
//       setTimeout(() => navigate('/login'), 3000);
//     }
//   } catch (err) {
//     // Handle errors and display the message
//     const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
//     setError({ general: errorMessage });
//     setSuccess('');
//   }
// };


//   return (
//     <div className="vh-100 d-flex flex-column">
//       <Header />
//       <section className="container py-5 flex-center">
//         <div className="row d-flex align-items-center justify-content-center">
//           <div className="col-md-8 col-lg-7 col-xl-6">
//             <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
//           </div>
//           <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
//             <div className="form-container shadow p-4">
//             <form onSubmit={handleSubmit}>
//                 {success && <p className="success-message">{success}</p>}
//                 {error.general && <p className="error-message">{error.general}</p>}

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="form-control form-control-lg"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                   />
//                   {error.name && <p className="error-message">{error.name}</p>}
//                 </div>

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="email">Email address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="form-control form-control-lg"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                   />
//                   {error.email && <p className="error-message">{error.email}</p>}
//                 </div>

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="phone">Phone Number</label>
//                   <div className="phone-input">
//                     <select
//                       name="companyCode"
//                       value={form.companyCode}
//                       onChange={handleChange}
//                       className="phone-code"
//                     >
//                       <option value="+92">+92 (Pakistan)</option>
//                       <option value="+92300">+92 300 (Mobilink)</option>
//                       <option value="+92345">+92 345 (Telenor)</option>
//                       <option value="+92321">+92 321 (Warid)</option>
//                       <option value="+92301">+92 301 (Zong)</option>
//                     </select>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       className="form-control form-control-lg phone-number"
//                       value={form.phone}
//                       onChange={handleChange}
//                       placeholder="Enter 7-digit phone number"
//                     />
//                   </div>
//                   {error.phone && <p className="error-message">{error.phone}</p>}
//                 </div>

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="address">Address</label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     className="form-control form-control-lg"
//                     value={form.address}
//                     onChange={handleChange}
//                     placeholder="Enter your address"
//                   />
//                   {error.address && <p className="error-message">{error.address}</p>}
//                 </div>

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="form-control form-control-lg"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                   />
//                   {error.password && <p className="error-message">{error.password}</p>}
//                 </div>

//                 <div className="form-outline mb-2">
//                   <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
//                   <input
//                     type="password"
//                     id="confirmpassword"
//                     name="confirmpassword"
//                     className="form-control form-control-lg"
//                     value={form.confirmpassword}
//                     onChange={handleChange}
//                     placeholder="Confirm your password"
//                   />
//                   {error.confirmpassword && <p className="error-message">{error.confirmpassword}</p>}
//                 </div>

//                 <button type="submit" className="btn btn-primary mt-3">Sign Up</button>

//                 <p className="login-link">
//                   Already have an account? <a href="/login" className="register-link">Login here</a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// };
// export default ConsumerSignup;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/consumersignup.css"; // Ensure you have the updated CSS file
import csignupImage from "../assests/images/signup2.jpg";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const ConsumerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyCode: '+92',
    phonenumber: '', // Adjusted initial state to '' for all fields
    address: '',
    password: '',
    confirmpassword: ''
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7}$/;
    const addressRegex = /^[A-Za-z0-9\s,.-]{10,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

    if (!form.name) errors.name = "Name is required.";
    else if (!nameRegex.test(form.name)) errors.name = "Name must be 3-15 letters.";

    if (!form.email) errors.email = "Email is required.";
    else if (!emailRegex.test(form.email)) errors.email = "Enter a valid email address.";

    if (!form.phonenumber) errors.phonenumber = "Phone number is required.";
    else if (!phoneRegex.test(form.phonenumber)) errors.phonenumber = "Phone number must be exactly 7 digits.";

    if (!form.address) errors.address = "Address is required.";
    else if (!addressRegex.test(form.address)) errors.address = "Address must be at least 10 characters.";

    // if (!form.password) errors.password = "Password is required.";
    // else if (!passwordRegex.test(form.password)) errors.password = "Password must be 8-15 characters, with 1 uppercase letter and 1 special character.";

    // if (!form.confirmpassword) errors.confirmpassword = "Confirm password is required.";
    // else if (form.password !== form.confirmpassword) errors.confirmpassword = "Passwords do not match.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const fullPhoneNumber = form.companyCode + form.phonenumber;

    const formData = {
      name: form.name,
      email: form.email,
      companyCode: form.companyCode,
      phonenumber: fullPhoneNumber,
      address: form.address,
      password: form.password,
      confirmpassword: form.confirmpassword
    };

    try {
      console.log(formData)

      const response = await axios.post(`http://localhost:5000/api/Auth/signup`, formData);
      if (response.data.success) {
        setSuccess("Signup successful! Please verify your email.");
        setError({});
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError({ general: errorMessage });
      setSuccess('');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <section className="container py-5 flex-center">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="form-container shadow p-4">
              <form onSubmit={handleSubmit}>
                {success && <p className="success-message">{success}</p>}
                {error.general && <p className="error-message">{error.general}</p>}

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {error.name && <p className="error-message">{error.name}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="phonenumber">Phone Number</label>
                  <div className="phone-input">
                    <select
                      name="companyCode"
                      value={form.companyCode}
                      onChange={handleChange}
                      className="phone-code"
                    >
                      <option value="+92">+92 (Pakistan)</option>
                      <option value="+92300">+92 300 (Mobilink)</option>
                      <option value="+92345">+92 345 (Telenor)</option>
                      <option value="+92321">+92 321 (Warid)</option>
                      <option value="+92301">+92 301 (Zong)</option>
                    </select>
                    <input
                      type="tel"
                      id="phonenumber"
                      name="phonenumber"
                      className="form-control form-control-lg phone-number"
                      value={form.phonenumber}
                      onChange={handleChange}
                      placeholder="Enter 7-digit phone number"
                    />
                  </div>
                  {error.phonenumber && <p className="error-message">{error.phonenumber}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control form-control-lg"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                  {error.address && <p className="error-message">{error.address}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="form-control form-control-lg"
                    value={form.confirmpassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {error.confirmpassword && <p className="error-message">{error.confirmpassword}</p>}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Sign Up</button>

                <p className="login-link">
                  Already have an account? <a href="/login" className="register-link">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConsumerSignup;


