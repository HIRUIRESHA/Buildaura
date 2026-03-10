import React from 'react';

function Services() {
  const services = [
    {
      id: 1,
      title: "Project Management",
      description:
        "Our platform helps you manage every aspect of your construction projects. Track timelines, budgets, milestones, and resource allocation to ensure that your project is completed efficiently and on schedule.",
      icon: "🏗️",
      features: [
        "Task scheduling and tracking",
        "Budget monitoring",
        "Real-time progress updates",
        "Team collaboration tools",
      ],
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 2,
      title: "Site Supervision",
      description:
        "Ensure construction quality and safety by monitoring activities on-site. The system allows supervisors to log inspections, report issues, and track compliance.",
      icon: "👷",
      features: [
        "Daily site reports",
        "Safety and quality checklists",
        "Issue reporting and resolution",
        "Progress tracking",
      ],
      color: "from-sky-400 to-sky-500",
    },
    {
      id: 3,
      title: "Material Management & Procurement",
      description:
        "Manage the procurement and inventory of construction materials. Avoid shortages or delays by keeping track of stock levels and supplier orders.",
      icon: "📦",
      features: [
        "Material inventory management",
        "Supplier and purchase order tracking",
        "Automated low-stock alerts",
        "Cost tracking and reporting",
      ],
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 4,
      title: "Team & Workforce Management",
      description:
        "Coordinate your workforce efficiently. Assign tasks, track working hours, and monitor employee performance.",
      icon: "👥",
      features: ["Employee scheduling", "Attendance tracking", "Role-based task assignment", "Performance analytics"],
      color: "from-sky-400 to-sky-500",
    },
    {
      id: 5,
      title: "Budget & Financial Tracking",
      description:
        "Stay in control of your project finances. Track expenses, invoices, and payments for full financial visibility.",
      icon: "💰",
      features: [
        "Budget creation and tracking",
        "Expense recording",
        "Invoice management",
        "Financial reports and analytics",
      ],
      color: "from-violet-500 to-violet-600",
    },
    {
      id: 6,
      title: "Reports & Analytics",
      description:
        "Make informed decisions with detailed reports and dashboards. Track project performance, resource utilization, and financial health.",
      icon: "📊",
      features: [
        "Progress and completion reports",
        "Resource allocation analysis",
        "Cost and budget reports",
        "Customizable dashboards",
      ],
      color: "from-sky-400 to-sky-500",
    },
    {
      id: 7,
      title: "Client & Stakeholder Communication",
      description:
        "Keep clients and stakeholders updated with automated notifications, reports, and project summaries.",
      icon: "📢",
      features: [
        "Project status updates",
        "Automated email/SMS notifications",
        "Document sharing",
        "Stakeholder dashboards",
      ],
      color: "from-violet-500 to-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive construction management solutions designed to streamline your projects from start to finish
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-6 w-full bg-gradient-to-r ${service.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Construction Management?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get started with our comprehensive construction management system today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
