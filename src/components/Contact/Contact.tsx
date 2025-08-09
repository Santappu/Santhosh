import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "success" | "error" | null;

const SERVICE_ID = "service_bteonpo";
const TEMPLATE_ID = "template_qt9btum";
const PUBLIC_KEY = "Hiehdg8tGQCRpf0Kw";

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="contact-content"
        >
          <motion.div variants={itemVariants} className="contact-header">
            <h2>Let's Work Together</h2>
            <div className="section-divider"></div>
            <p className="contact-subtitle">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div variants={itemVariants} className="contact-info">
              <h3>Get In Touch</h3>
              <p>
                I'm always interested in new opportunities and exciting projects. 
                Whether you're a company looking to hire, or you're a fellow developer 
                wanting to collaborate, I'd love to hear from you.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-info">
                    <h4>Email</h4>
                    <a href="mailto:santappumac@gmail.com" aria-label="Send email to santappumac@gmail.com">
                      santappumac@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💼</div>
                  <div className="method-info">
                    <h4>LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/santhosh-achary-354975a1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Visit LinkedIn profile"
                    >
                      linkedin.com/in/santhosh_Achary
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💻</div>
                  <div className="method-info">
                    <h4>GitHub</h4>
                    <a 
                      href="https://github.com/Santappu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Visit GitHub profile"
                    >
                      github.com/santhosh_Achary
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">🌐</div>
                  <div className="method-info">
                    <h4>Location</h4>
                    <span>Bengaluru, India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div variants={itemVariants} className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={errors.name ? "true" : "false"}
                    required
                  />
                  {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="your.email@example.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={errors.email ? "true" : "false"}
                    required
                  />
                  {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? "error" : ""}`}
                    placeholder="What would you like to discuss?"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    aria-invalid={errors.subject ? "true" : "false"}
                    required
                  />
                  {errors.subject && <span id="subject-error" className="error-message">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? "error" : ""}`}
                    placeholder="Tell me about your project..."
                    rows={6}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={errors.message ? "true" : "false"}
                    required
                  />
                  {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
                </div>

                {/* Submit */}
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Status */}
                {submitStatus === "success" && (
                  <div id="submit-status" className="status-message success">
                    ✅ Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div id="submit-status" className="status-message error">
                    ❌ Sorry, there was an error sending your message.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
