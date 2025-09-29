import React, { useState, useEffect } from "react";
import {
  Heart,
  Award,
  Users,
  Leaf,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion"; // Importing motion for animations

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "2000+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Craftsmen", icon: Heart },
    { number: "100%", label: "Sustainable Wood", icon: Leaf },
  ];

  const services = [
    {
      title: "Custom Furniture Design",
      description:
        "Bespoke pieces tailored to your unique style and space requirements.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    },
    {
      title: "Interior Consultation",
      description:
        "Expert guidance to transform your space with our curated furniture collections.",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    },
    {
      title: "Restoration Services",
      description:
        "Breathe new life into your cherished furniture pieces with our restoration expertise.",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
    },
    {
      title: "Sustainable Crafting",
      description:
        "Eco-friendly furniture made from responsibly sourced materials.",
      image:
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
    },
  ];

  const testimonials = [
    {
      name: "Kasun Mapalagama",
      role: "Interior Designer",
      content:
        "WoodWise transformed our vision into reality. Their attention to detail is unmatched.",
      rating: 5,
    },
    {
      name: "Kosala Edirisinghe",
      role: "Homeowner",
      content:
        "The quality of craftsmanship exceeded our expectations. Truly exceptional work.",
      rating: 5,
    },
    {
      name: "Niroshan Perera",
      role: "Restaurant Owner",
      content:
        "Professional, reliable, and incredibly talented. Our restaurant looks amazing!",
      rating: 5,
    },
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every piece is meticulously crafted with attention to detail and built to last generations.",
    },
    {
      title: "Sustainable Practices",
      description:
        "We source only responsibly harvested wood and use eco-friendly finishes and processes.",
    },
    {
      title: "Customer-Centric",
      description:
        "Your vision guides our work. We collaborate closely to bring your dream furniture to life.",
    },
    {
      title: "Innovation & Tradition",
      description:
        "Blending time-honored techniques with modern design to create timeless pieces.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`relative max-w-7xl mx-auto px-4 py-20 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
              WoodWise
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
              Crafting exceptional furniture with passion, precision, and
              purpose since 2009
            </p>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Discover Our Story
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </section> */}

      {/* Header Section - Enhanced Hero */}
      <div
        className="relative py-24 md:py-32 bg-cover bg-center rounded-b-3xl shadow-xl"
        style={{
          backgroundImage: `url('https://ceylonfurniture.lk/cdn/shop/files/Ceylon_Furniture_Hero_8.png?v=1746130988&width=2000')`,
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-3xl"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg"
          >
            About WoodWise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl max-w-3xl mx-auto px-4 drop-shadow-md"
          >
            Crafting Timeless Furniture with Passion and Precision for
            Generations
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="m-20 rounded-[100px] py-20 bg-gradient-to-r from-slate-600 via-gray-900 to-slate-500 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Our Achievements
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center group hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:shadow-amber-500/25 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>
                  <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2009 by master craftsman David Wilson, WoodWise began
                as a small workshop with a simple mission: to create furniture
                that tells a story. What started with hand-carved chairs for
                local families has grown into a renowned furniture house serving
                clients worldwide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every piece we create carries the essence of traditional
                woodworking combined with contemporary design sensibilities. We
                believe furniture should not just fill a space, but enhance the
                way you live, work, and connect with your environment.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Handcrafted Excellence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">10 Years Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Sustainable Materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Custom Design</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://ceylonfurniture.lk/cdn/shop/files/Ceylon_Furniture_Workspace_12.jpg?v=1746592867&width=1000"
                alt="Craftsman at work"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-gray-800">Master Craftsman</h4>
                <p className="text-gray-600">David Wilson, Founder</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to creating furniture that enriches lives while
              respecting our planet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to completion, we offer comprehensive furniture
              solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            What Our Clients Say
          </h2>

          <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-amber-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Let's bring your furniture dreams to life with our expert
            craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Get Free Consultation
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105">
              View Our Portfolio
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;
