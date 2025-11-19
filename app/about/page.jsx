"use client";
import { FaHome, FaUsers, FaHandshake, FaShieldAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBed, FaBuilding, FaHotel, FaStore, FaCheckCircle, FaStar, FaRegLightbulb } from "react-icons/fa";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Pattern */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8 shadow-lg">
              <FaStar className="text-orange-400" />
              <span className="text-sm font-bold text-white">India's Trusted Property Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              About <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Horoo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted platform connecting property owners and seekers across India with verified listings and seamless experience
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-gray-300">Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-300">Owners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">2000+</div>
                <div className="text-sm text-gray-300">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-sm text-gray-300">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-6">
                <FaRegLightbulb />
                <span className="text-sm font-bold">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built For Your Convenience
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-orange-600">Horoo</strong> was founded with a simple yet powerful vision: 
                  to make property search and listing effortless for everyone. We understand the challenges both 
                  property seekers and owners face in today's fast-paced world.
                </p>
                <p>
                  Whether you're a student looking for a budget-friendly room, a professional seeking a comfortable 
                  flat, a traveler searching for a hotel, or a business owner hunting for commercial space - 
                  <strong className="text-orange-600"> Horoo connects you with verified properties instantly</strong>.
                </p>
                <p>
                  Our platform seamlessly bridges the gap between property owners and seekers, 
                  providing a trusted marketplace and ensuring quality service at every step.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern Property"
                  className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Dream Space Awaits</h3>
                    <p className="text-gray-600">Connecting people with perfect properties across India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Properties We Specialize In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individual rooms to large commercial spaces, we cover all your accommodation needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBed className="text-5xl text-orange-600" />,
                title: "Rooms & PG",
                description: "Budget-friendly rooms and paying guest accommodations perfect for students and working professionals."
              },
              {
                icon: <FaHome className="text-5xl text-orange-600" />,
                title: "Flats & Apartments",
                description: "Fully furnished and semi-furnished flats for families and individuals looking for comfortable living."
              },
              {
                icon: <FaBuilding className="text-5xl text-orange-600" />,
                title: "Hostels",
                description: "Secure and affordable hostel accommodations with modern amenities for students."
              },
              {
                icon: <FaHotel className="text-5xl text-orange-600" />,
                title: "Hotels & Guest Houses",
                description: "Short-term and long-term hotel stays for travelers and temporary accommodation seekers."
              },
              {
                icon: <FaHome className="text-5xl text-orange-600" />,
                title: "Independent Houses",
                description: "Spacious independent houses with complete privacy for families seeking standalone properties."
              },
              {
                icon: <FaStore className="text-5xl text-orange-600" />,
                title: "Commercial Spaces",
                description: "Shops, offices, and commercial properties for business owners and entrepreneurs."
              }
            ].map((property, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {property.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {property.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and customer satisfaction drives everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-4xl text-orange-600" />,
                title: "100% Verified Properties",
                description: "Every listing undergoes rigorous verification by our expert team to ensure authenticity and quality"
              },
              {
                icon: <FaUsers className="text-4xl text-orange-600" />,
                title: "Quick Response System",
                description: "Submit your inquiry and get connected with property owners rapidly - our platform ensures fast and efficient communication"
              },
              {
                icon: <FaCheckCircle className="text-4xl text-orange-600" />,
                title: "Easy Listing Process",
                description: "List your property with our simple and hassle-free process. Reach thousands of genuine seekers across multiple cities"
              },
              {
                icon: <FaHandshake className="text-4xl text-orange-600" />,
                title: "Dedicated Support Team",
                description: "Round-the-clock customer assistance with instant response to all your queries and concerns"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border-2 border-transparent hover:border-orange-200"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Horoo Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and transparent process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Property Seekers */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-10 rounded-3xl shadow-xl border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-orange-600 mb-8 flex items-center gap-3">
                <FaUsers className="text-3xl" />
                For Tenants & Buyers
              </h3>
              <div className="space-y-6">
                {[
                  { step: "1", text: "Explore verified listings filtered by location, budget, and property type" },
                  { step: "2", text: "Check detailed property information with high-quality photos and amenities" },
                  { step: "3", text: "Submit booking request through our secure platform to connect with owner" },
                  { step: "4", text: "Schedule visit, negotiate terms, and finalize your deal" }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-lg text-gray-700 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Property Owners */}
            <div className="bg-gradient-to-br from-green-50 to-white p-10 rounded-3xl shadow-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-green-600 mb-8 flex items-center gap-3">
                <FaHome className="text-3xl" />
                For Property Owners
              </h3>
              <div className="space-y-6">
                {[
                  { step: "1", text: "Fill simple listing form with property details and upload photos" },
                  { step: "2", text: "Our verification team reviews and approves within 24 hours" },
                  { step: "3", text: "Property gets published with unique Horoo ID across platform" },
                  { step: "4", text: "Receive direct inquiries from genuine, verified tenants/buyers" }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-lg text-gray-700 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Student",
                text: "Found a perfect PG near my college within 2 days! Horoo's platform made connecting with the owner seamless and trustworthy.",
                rating: 5
              },
              {
                name: "Rahul Verma",
                role: "Business Owner",
                text: "Listed my commercial property and got genuine inquiries within a week. Excellent platform!",
                rating: 5
              },
              {
                name: "Anjali Singh",
                role: "Working Professional",
                text: "Horoo made my property search so simple! Found my dream flat quickly with complete transparency. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              We're here to help you find or list your perfect property
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-2xl p-12 border-2 border-orange-200">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaPhone className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phone Support</h3>
                <p className="text-gray-600 mb-2">Call us anytime</p>
                <p className="text-2xl font-bold text-orange-600">+91 9166260477</p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaEnvelope className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-2">Quick response guaranteed</p>
                <p className="text-lg font-bold text-orange-600">support@horoo.in</p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <FaMapMarkerAlt className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Service Area</h3>
                <p className="text-gray-600 mb-2">Expanding across</p>
                <p className="text-lg font-bold text-orange-600">All Major Cities in India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed">
            Join thousands of satisfied users who found their perfect space through Horoo
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl hover:scale-105"
            >
              <FaHome className="text-2xl" />
              Browse Properties
            </a>
            <a
              href="/listproperty"
              className="inline-flex items-center justify-center gap-3 bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-800 transition-all shadow-2xl hover:scale-105"
            >
              <FaBuilding className="text-2xl" />
              List Your Property
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
