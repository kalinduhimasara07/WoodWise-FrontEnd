import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  User,
  Building,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "general",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Showroom Location",
      details: [
        "No 322, School Road,",
        "Batuwatta, Ragama,",
        "Sri Lanka.",
        "11011",
      ],
      color: "text-amber-700",
      bgColor: "bg-amber-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["011 224 9108", "077 418 7068", "Mon-Sat: 9AM-6PM"],
      color: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["woodwise.services@gmail.com"],
      color: "text-orange-700",
      bgColor: "bg-orange-50",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM-7PM", "Sat: 9AM-5PM", "Sun: Closed"],
      color: "text-gray-700",
      bgColor: "bg-gray-50",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "custom", label: "Custom Furniture" },
    { value: "quote", label: "Request Quote" },
    { value: "support", label: "Customer Support" },
    { value: "wholesale", label: "Wholesale Orders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <div
        className="relative py-24 md:py-32 bg-cover bg-center shadow-xl"
        style={{
          backgroundImage: `url('/contact.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Contact WoodWise
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4 drop-shadow-md">
            Connect with Sri Lanka’s trusted furniture experts for custom
            solutions, showroom visits, and more.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Dream Furniture Starts Here
          </h2>
          <p className="text-lg text-gray-600">
            Whether you’re looking for bespoke pieces, business solutions, or
            just have a question, our team is ready to help. Visit our showroom,
            call, or send us a message!
          </p>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Replace Contact Form with Info & Actions */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  How to Reach Us
                </h2>
                <p className="text-gray-600 text-lg">
                  For all inquiries, please use the contact details or visit our showroom. Our team is ready to assist you during business hours.
                </p>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center gap-3 bg-white rounded-xl shadow p-4 w-full">
                  <Phone className="w-6 h-6 text-amber-600" />
                  <span className="font-semibold text-gray-800">011 224 9108 / 077 418 7068</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl shadow p-4 w-full">
                  <Mail className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold text-gray-800">woodwise.services@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl shadow p-4 w-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-gray-800">No 322, School Road, Batuwatta, Ragama</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl shadow p-4 w-full">
                  <Clock className="w-6 h-6 text-gray-700" />
                  <span className="font-semibold text-gray-800">Mon-Fri: 9AM-7PM | Sat: 9AM-5PM</span>
                </div>
              </div>
              {/* Replaced repetitive buttons with a helpful info box */}
              <div className="mt-8 w-full">
                <div className="bg-amber-100 border-l-4 border-amber-500 rounded-xl p-6 flex items-center gap-4 shadow text-amber-900">
                  <MessageCircle className="w-7 h-7 text-amber-600" />
                  <div>
                    <div className="font-semibold text-lg mb-1">Visit Us or Call for Personalized Service</div>
                    <div className="text-base">
                      Our staff is available for walk-in consultations at our showroom. For custom requests, business solutions, or urgent matters, please call during open hours. We look forward to helping you!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map and Quick Contact */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl shadow-lg overflow-hidden h-110">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3959.582353119101!2d79.931106!3d7.05826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDMnMjkuNyJOIDc5wrA1NSc1Mi4wIkU!5e0!3m2!1sen!2slk!4v1758041194875!5m2!1sen!2slk"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-6 text-amber-100">
                  Call us directly for urgent inquiries or to schedule a
                  consultation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+94112345678"
                    className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                  <a
                    href="mailto:woodwise.services@gmail.com"
                    className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does custom furniture take to complete?",
                answer:
                  "Custom furniture typically takes 4-8 weeks depending on complexity and current workload. We'll provide a detailed timeline during consultation.",
              },
              {
                question: "Do you offer delivery and installation services?",
                answer:
                  "Yes, we provide professional delivery and installation services throughout Sri Lanka. Delivery costs vary based on location and furniture size.",
              },
              {
                question: "What types of wood do you work with?",
                answer:
                  "We work with premium woods including Teak, Mahogany, Oak, Walnut, and other sustainably sourced materials. We can recommend the best wood for your specific needs.",
              },
              {
                question: "Do you provide warranties on your furniture?",
                answer:
                  "All our furniture comes with a comprehensive 10-year warranty covering craftsmanship defects. We also offer maintenance services to keep your furniture in perfect condition.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
