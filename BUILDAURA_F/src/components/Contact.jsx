import React from "react";
import {MapPin,Phone, Mail,Send,MessageSquare,Clock,} from "lucide-react";
import contactpImage from "../assets/contactp.jpeg"; 


function Contact() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wide uppercase">
              Contact Us
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Get In Touch.{" "}
                  <span className="text-orange-500">Let's build</span> something
                  great!
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Contact us for a consultation or quote on your next commercial
                  project. We're here to bring your vision to life with
                  innovative design and exceptional craftsmanship.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-4">
                <div className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow rounded-md">
                  <div className="p-6 flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        No. 125, Builder Street, Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow rounded-md">
                  <div className="p-6 flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+7 (212) 64-33-35</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow rounded-md">
                  <div className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@buildsura.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={contactpImage}
                  alt="Modern commercial building architectural rendering"
                  className="w-full h-auto object-cover"
                  width={600}
                  height={400}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Quick Response</p>
                    <p className="text-xs text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* Business Hours Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 justify-center">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Business Hours</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                When We're Available
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-gray-50 shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Monday - Friday</h4>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gray-50 shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Saturday</h4>
                  <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-gray-50 shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">Sunday</h4>
                  <p className="text-gray-600">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
