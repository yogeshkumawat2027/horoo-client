"use client";
import { FaGavel, FaHandshake, FaExclamationTriangle, FaCheckCircle, FaUserShield } from "react-icons/fa";

export default function TermsOfServicePage() {
  const lastUpdated = "January 26, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-6">
            <FaGavel className="text-orange-400 text-xl" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Terms of <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Horoo</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your access to and use of Horoo's platform, website, and services. 
              By accessing or using our platform, you agree to be bound by these Terms.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
              <p className="text-gray-800 font-semibold">
                <strong>Important:</strong> Please read these Terms carefully before using our platform. 
                If you do not agree with these Terms, you may not access or use our services.
              </p>
            </div>
          </div>

          {/* Platform Overview */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaHandshake className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Our Platform's Role</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                <strong>Horoo operates as a platform.</strong> We facilitate connections between property seekers 
                and property owners but do not engage in property rentals, sales, or management ourselves.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">What We Do:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>List and verify property information provided by owners</li>
                  <li>Display properties on our platform for seekers to browse</li>
                  <li>Enable direct communication between property owners and seekers</li>
                  <li>Maintain a secure platform for property listings</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">What We Don't Do:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We do not handle bookings or reservations</li>
                  <li>We do not process payments or collect security deposits</li>
                  <li>We do not manage properties or act as property managers</li>
                  <li>We do not guarantee the availability or condition of any property</li>
                  <li>We are not party to any agreements between owners and seekers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>To use certain features of our platform, you must create an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your information to keep it accurate and current</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-sm">
                  <strong>Note:</strong> You must be at least 18 years old to create an account and use our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Listings</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Property Owners:</h3>
                <p className="text-gray-700 mb-2">When listing a property on Horoo, you represent and warrant that:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>You have the legal right to list and rent the property</li>
                  <li>All information provided is accurate, complete, and not misleading</li>
                  <li>Property images accurately represent the current condition</li>
                  <li>You will comply with all applicable laws and regulations</li>
                  <li>You have all necessary permits, licenses, and authorizations</li>
                  <li>You will honor the pricing and terms displayed on the listing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Process:</h3>
                <p className="text-gray-700">
                  We verify property listings to the best of our ability, but we cannot guarantee the accuracy of all information. 
                  Property seekers should conduct their own due diligence before entering into any agreement.
                </p>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Direct Transactions</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <p className="font-semibold mb-2">IMPORTANT - Please Read Carefully:</p>
                <p className="leading-relaxed">
                  All bookings, agreements, and payments are made <strong>directly between property owners and property seekers</strong>. 
                  Horoo is not involved in these transactions and does not:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Collect or process payments</li>
                  <li>Hold security deposits or advance payments</li>
                  <li>Draft or enforce rental agreements</li>
                  <li>Mediate disputes between parties</li>
                  <li>Provide insurance or guarantees</li>
                </ul>
              </div>

              <p className="leading-relaxed">
                You acknowledge that Horoo is not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The actions or omissions of property owners or seekers</li>
                <li>The condition, safety, or legality of any property</li>
                <li>The accuracy of property descriptions or availability</li>
                <li>Any disputes, damages, or losses arising from transactions</li>
                <li>Payment issues or non-payment between parties</li>
              </ul>
            </div>
          </div>

          {/* User Conduct */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUserShield className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">User Conduct and Prohibited Activities</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Post false, inaccurate, or misleading information</li>
                <li>Impersonate any person or entity</li>
                <li>Engage in fraudulent activities or scams</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Upload viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape, copy, or duplicate content without permission</li>
                <li>Interfere with the platform's operation</li>
                <li>Use the platform for any illegal or unauthorized purpose</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                All content, features, and functionality on our platform, including but not limited to text, graphics, logos, 
                and software, are owned by Horoo and protected by copyright, trademark, and other intellectual property laws.
              </p>

              <div>
                <h3 className="font-semibold mb-2">User Content:</h3>
                <p className="leading-relaxed">
                  By posting content (property listings, images, reviews), you grant Horoo a non-exclusive, royalty-free, 
                  worldwide license to use, display, and distribute your content on our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold mb-2">PLATFORM PROVIDED "AS IS"</p>
                <p className="text-sm">
                  Our platform is provided on an "as is" and "as available" basis. We make no warranties, express or implied, 
                  regarding the platform's operation, content, or availability.
                </p>
              </div>

              <p className="leading-relaxed">
                <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Horoo shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or any transactions 
                between users.
              </p>

              <p className="leading-relaxed">
                <strong>Indemnification:</strong> You agree to indemnify and hold Horoo harmless from any claims, damages, losses, 
                or expenses arising from your use of the platform or violation of these Terms.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <div className="space-y-3 text-gray-700">
              <p>We reserve the right to suspend or terminate your account and access to the platform at any time, without notice, for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activities</li>
                <li>Behavior that harms other users or our platform</li>
                <li>Non-payment of applicable fees (when implemented)</li>
              </ul>
              <p className="mt-3">You may also terminate your account at any time through your account settings.</p>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated 
              Terms on our platform and updating the "Last Updated" date. Your continued use of the platform after changes constitutes 
              acceptance of the modified Terms.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Dispute Resolution</h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising from these Terms or your use of the platform shall be subject to the exclusive jurisdiction 
                of the courts in Gurgaon, Haryana.
              </p>
              
              <p className="leading-relaxed">
                We encourage users to contact us first to resolve any disputes informally before pursuing legal action.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 md:p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> <a href="mailto:support@horoo.com" className="hover:underline">horoobooking@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+918279053200" className="hover:underline">+91 8279053200</a></p>
              <p><strong>Address:</strong> kota , Rajasthan</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
