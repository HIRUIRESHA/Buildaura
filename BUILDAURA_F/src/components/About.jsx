import React from "react";
import { Target, Users, Clock, CheckCircle, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import plaza_sImage from "../assets/plaza_s.jpeg"; 
import harborImage from "../assets/harbor.jpeg"; 
import marianaImage from "../assets/mariana.jpeg"; 
import victoriaImage from "../assets/victoria.jpeg"; 
import apexImage from "../assets/apex.jpeg"; 
import plazaImage from "../assets/plaza_s.jpeg"; 


function About() {
  const features = [
    {
      title: "Project Management",
      description:
        "Streamline your construction projects with our comprehensive project management tools. Track progress, manage resources, and ensure timely delivery of every project milestone.",
      icon: Target,
      color: "bg-orange-500",
    },
    {
      title: "AI Team Collaboration",
      description:
        "Enhance team productivity with AI-powered collaboration tools. Real-time communication, automated task assignment, and intelligent workflow optimization.",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Live Progress Tracking",
      description:
        "Monitor your construction projects in real-time with live progress tracking. Get instant updates, visual progress reports, and milestone notifications.",
      icon: Clock,
      color: "bg-green-500",
    },
  ];

  const projects = [
    {
      title: "Queenstown Plaza",
      location: "Auckland",
      image: plaza_sImage,
    },
    {
      title: "Marina Tower",
      location: "Wellington",
      image: marianaImage,
    },
    {
      title: "Victoria Center",
      location: "Hamilton",
      image: victoriaImage,
    },
    {
      title: "Sunset Plaza",
      location: "Christchurch",
      image: plazaImage,
    },
    {
      title: "Harbor Point",
      location: "Dunedin",
      image: harborImage,
    },
    {
      title: "Apex Tower",
      location: "Tauranga",
      image: apexImage,
    },
  ];

  const stats = [
    { number: "25+", label: "Years Managing Construction" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction Rate" },
    { number: "50+", label: "Expert Team Members" },
  ];

  const benefits = [
    "Licensed, Insured & Certified",
    "Modern, Sustainable Construction",
    "Timely & Cost-Effective Execution",
    "24/7 Customer Support",
  ];

  return (
    <div>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block text-orange-600 border border-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
                  About Our Company
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  With years of experience in the construction industry
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We deliver innovative solutions to manage high-quality,
                  efficient, and sustainable projects. From initial idea to
                  large-scale development, we bring structure and clarity to
                  every phase ensuring excellence in every project managed.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/signup">
                    <button className="text-white bg-orange-600 hover:bg-orange-700 rounded px-6 py-3 text-lg font-semibold transition-colors duration-200">
                      Get Started
                    </button>
                  </Link>
                  <button className="border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 rounded px-6 py-3 text-lg font-semibold transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-orange-600">25+</div>
                    <div className="text-xl text-gray-700">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Simplify Your Construction Workflow with Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how our innovative solutions can transform your
                construction projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                  >
                    <div className="p-8 space-y-6">
                      <div
                        className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700 p-0 font-semibold">
                        Learn More →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Proven results in construction project management
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Explore our portfolio of successful construction projects across
                New Zealand
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800 border border-gray-700 overflow-hidden rounded-lg hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300">{project.location}</p>
                    <button className="bg-orange-600 hover:bg-orange-700 w-full text-white rounded px-4 py-2 font-semibold transition-colors duration-200">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    Why Choose Us?
                  </h2>
                  <p className="text-lg text-gray-600">
                    We combine years of experience with cutting-edge technology to
                    deliver exceptional results for every construction project.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-xl bg-gray-50"
                    >
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-700">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                <button className="text-white bg-gray-900 hover:bg-gray-800 rounded px-6 py-3 text-lg font-semibold transition-colors duration-200">
                  Contact Us Today
                </button></Link>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8" />
                    <h3 className="text-2xl font-bold">
                      Timely & Cost-Effective Execution
                    </h3>
                  </div>
                  <p className="text-orange-100 leading-relaxed">
                    Our proven methodology ensures projects are completed on time
                    and within budget, while maintaining the highest quality
                    standards in the construction industry.
                  </p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">Licensed & Insured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Quality Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
