import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Replace with your actual public key
    emailjs.init("TtF5JmIp2Y8j6p6ao");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    // Validate form
    if (!email || !message) {
      setSubmitStatus({ success: false, message: 'Please fill in all fields' });
      return;
    }
    
    setIsSubmitting(true);
    
    // EmailJS service, template, and public key
    // Replace these with your actual IDs from EmailJS dashboard
    const serviceId = 'Contact_form';
    const templateId = 'template_b3g9gmv';
    
    // Create template parameters - MUST match your EmailJS template variables exactly
    const templateParams = {
      from_email: email,
      message: message,
      // Add any other variables your template uses
    };
    
    try {
      console.log("Attempting to send email with:", {
        serviceId,
        templateId,
        templateParams
      });
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      // Clear form on success
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ 
        success: false, 
        message: `Failed to send message. Error: ${error.message || 'Unknown error'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-between gap-10 md:gap-20 py-10 border-b border-white/30">

        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            EduVritti is a smart and user friendly LMS platform offering structured, text based educational courses. Designed for learners of all levels, it makes learning simple, flexible, and effective anytime, anywhere.
          </p>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#bottom">About us</a></li>
            <li><a href="#bottom">Contact us</a></li>
            
          </ul>
        </div>

        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Contact Us</h2>
          <p className="text-sm text-white/80 mb-4">
            Have a question or feedback? Reach out to us.
          </p>
          <div className="flex flex-col w-full gap-3">
            <form onSubmit={handleSubmit}>
              <input 
                className="border border-orange-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-full h-9 rounded px-2 text-sm" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea 
                className="border border-orange-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-full rounded px-2 py-2 text-sm h-24 resize-none mt-3" 
                placeholder="Your message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button 
                className="bg-orange-600 w-full h-9 text-white rounded text-sm hover:bg-orange-700 transition-colors mt-3 flex items-center justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus && (
                <p className={`text-sm mt-2 ${submitStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                  {submitStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2025 © Eduvritti. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
