"use client";
import { FaSearch, FaCheckCircle, FaHandshake, FaUserCheck, FaHome, FaClipboardCheck, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FaSearch,
      title: "Browse Properties",
      description: "Search through our verified listings of rooms, flats, houses, hostels, hotels, and commercial spaces across multiple cities.",
      color: "orange"
    },
    {
      icon: FaCheckCircle,
      title: "Find Your Match",
      description: "Filter by location, price, amenities, and property type to find the perfect space that meets your requirements.",
      color: "blue"
    },
    {
      icon: FaPhoneAlt,
      title: "Contact Owner Directly",
      description: "Get owner's contact details instantly. Connect directly via phone or WhatsApp to discuss terms and schedule visits.",
      color: "green"
    },
    {
      icon: FaHandshake,
      title: "Visit & Finalize",
      description: "Visit the property, negotiate terms directly with the owner, and complete the booking on your own terms.",
      color: "purple"
    }
  ];

  const ownerSteps = [
    {
      icon: FaHome,
      title: "List Your Property",
      description: "Create a detailed listing with photos, amenities, pricing, and location information through our easy process.",
      color: "orange"
    },
    {
      icon: FaClipboardCheck,
      title: "Verification Process",
      description: "Submit ownership documents for verification. Our team reviews and verifies your property to ensure authenticity.",
      color: "blue"
    },
    {
      icon: FaUserCheck,
      title: "Get Listed",
      description: "Once verified, your property goes live on our platform and becomes visible to thousands of property seekers.",
      color: "green"
    },
    {
      icon: FaHandshake,
      title: "Connect & Rent",
      description: "Receive inquiries directly, communicate with interested seekers, and finalize bookings on your own terms.",
      color: "purple"
    }
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Verified Listings",
      description: "All properties are verified by our team with proper documentation to ensure authenticity and trust."
    },
    {
      icon: FaPhoneAlt,
      title: "Direct Communication",
      description: "No middleman. Connect directly with property owners or seekers for transparent and quick communication."
    },
    {
      icon: FaHandshake,
      title: "No Booking Fees",
      description: "Horoo is a Rental platform. All transactions happen directly between owner and seeker with no platform fees."
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: "bg-orange-100 text-orange-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            How <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Horoo</span> Works
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Your trusted platform connecting property seekers with verified property owners across India
          </p>
        </div>
      </section>

      {/* What is Horoo */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What is <span className="text-orange-600">Horoo</span>?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Horoo is a <strong>rental platform</strong> that bridges the gap between property owners and property seekers. 
              We verify property listings and display them on our platform, enabling direct communication and transactions between both parties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Property Seekers */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For <span className="text-orange-600">Property Seekers</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find your perfect property in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow">
                    <div className={`${getColorClasses(step.color)} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-orange-300 text-2xl z-0">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-gray-800">
              <strong>Important:</strong> All bookings, agreements, and payments are made directly between you and the property owner. 
              Horoo provides the platform for connection only.
            </p>
          </div>
        </div>
      </section>

      {/* For Property Owners */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For <span className="text-orange-600">Property Owners</span>
            </h2>
            <p className="text-lg text-gray-600">
              List your property and connect with genuine seekers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownerSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full hover:shadow-xl transition-shadow">
                    <div className={`${getColorClasses(step.color)} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow (hidden on mobile and last item) */}
                  {index < ownerSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-green-300 text-2xl z-0">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <p className="text-gray-800">
              <strong>Note:</strong> Once your property is verified and listed, you'll receive inquiries directly. 
              All negotiations, viewings, and agreements happen directly between you and the seeker.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Horoo */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-600">Horoo</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Seekers</h3>
              <ul className="space-y-3">
                {[
                  "Browse verified properties with authentic details",
                  "Direct contact with property owners",
                  "No platform booking or commission fees",
                  "Wide range of property types and locations",
                  "Transparent pricing and terms",
                  "Detailed property information and photos"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Owners</h3>
              <ul className="space-y-3">
                {[
                  "Reach thousands of genuine property seekers",
                  "Simple and quick listing process",
                  "Property verification adds credibility",
                  "Direct communication with interested parties",
                  "No intermediaries in transactions",
                  "Manage your listing easily through dashboard"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-12 md:py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-orange-100">
            Join thousands of users who trust Horoo for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/rooms"
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Browse Properties
            </a>
            <a 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
