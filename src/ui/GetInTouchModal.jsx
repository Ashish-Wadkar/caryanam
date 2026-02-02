// getInTouch
 
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCreateEnquiryMutation } from "../services/enquiryApi";
 
export default function GetInTouchModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    message: "",
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEnquiry] = useCreateEnquiryMutation();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
 
   
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    // Name
    const nameTrim = formData.name.trim();
    if (!nameTrim) newErrors.name = "Name is required!";
    else if (!/^[A-Za-z\s]+$/.test(nameTrim))
      newErrors.name = "Name should contain only letters and spaces!";
    else if (nameTrim.length < 2)
      newErrors.name = "Name must be at least 2 characters long!";
 
    // Email
    const emailTrim = formData.email.trim();
    if (!emailTrim || !/\S+@\S+\.\S+/.test(emailTrim))
      newErrors.email = "Valid email is required!";
 
    // Mobile Number
    const mobileTrim = formData.mobileNumber.trim();
    if (!/^[0-9]{10}$/.test(mobileTrim))
      newErrors.mobileNumber = "Enter your 10 Digit Mobile Number!";
    else if (/^(\d)\1{9}$/.test(mobileTrim))
      newErrors.mobileNumber = "Mobile number cannot have all same digits!";
 
    // Address
    const addressTrim = formData.address.trim();
    if (!addressTrim) newErrors.address = "Address is required!";
    else if (addressTrim.length < 10)
      newErrors.address = "Address must be at least 10 characters long!";
    else if (!/^[A-Za-z0-9\s,.-]+$/.test(addressTrim))
      newErrors.address = "Address contains invalid characters!";
 
    // Message
    const messageTrim = formData.message.trim();
    if (!messageTrim) newErrors.message = "Message is required!";
    else if (messageTrim.length < 10)
      newErrors.message = "Message must be at least 10 characters long!";
    else if (formData.message.length > 500)
      newErrors.message = "Message cannot exceed 500 characters!";
 
    return newErrors;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const v = validateForm();
    setErrors(v);
 
    if (Object.keys(v).length > 0) {
      // stop if validation errors exist (no popup)
      return;
    }
 
    const enquiryData = {
      ...formData,
      email: formData.email.trim(),
      dateTime: new Date().toISOString(),
    };
 
    setIsSubmitting(true);
    try {
      await createEnquiry(enquiryData).unwrap();
 
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your enquiry has been sent successfully.",
        confirmButtonColor: "#f97316",
      });
 
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        address: "",
        message: "",
      });
      setErrors({});
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  if (!isOpen) return null;
 
  const inputBase =
    "w-full border px-4 py-3 rounded-lg outline-none text-gray-800 placeholder-gray-500";
  const inputNormal = "border-gray-300 focus:border-orange-400";
  const inputError = "border-red-500 focus:border-red-500";
 
  const fieldError = (msg) =>
    msg ? <p className="text-red-600 text-sm mt-1">{msg}</p> : null;
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✖
        </button>
 
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Get in Touch
        </h2>
 
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`${inputBase} ${
                errors.name ? inputError : inputNormal
              }`}
            />
            {fieldError(errors.name)}
          </div>
 
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`${inputBase} ${
                errors.email ? inputError : inputNormal
              }`}
            />
            {fieldError(errors.email)}
          </div>
 
          {/* Mobile */}
          <div>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={`${inputBase} ${
                errors.mobileNumber ? inputError : inputNormal
              }`}
            />
            {fieldError(errors.mobileNumber)}
          </div>
 
          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={`${inputBase} ${
                errors.address ? inputError : inputNormal
              }`}
            />
            {fieldError(errors.address)}
          </div>
 
          {/* Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`${inputBase} h-28 resize-none focus:ring-1 ${
                errors.message
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-orange-400 border-gray-300"
              }`}
            />
            {fieldError(errors.message)}
          </div>
 
          <button
            type="submit"
            disabled={isSubmitting}
            className={`align-middle font-bold text-center uppercase
              bg-orange-400 text-black px-10 py-3 rounded-lg shadow-md
              transition-all w-full
              ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-500"
              }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
 
GetInTouchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
 
 