"use client";
import { FaShieldAlt, FaUserLock, FaDatabase, FaEye, FaCookie, FaExclamationTriangle } from "react-icons/fa";

export default function PrivacyPolicyPage() {
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
            <FaShieldAlt className="text-orange-400 text-xl" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Privacy <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Policy</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Horoo. We are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Horoo</strong> operates as a platform that links property seekers with property owners. 
              We verify and list properties but do not directly handle bookings or payments. All transactions occur directly between property owners and seekers.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Profile pictures and user preferences</li>
                  <li>Location data (when you search for properties)</li>
                  <li>Account credentials and authentication information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Owner Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Property details, images, and descriptions</li>
                  <li>Ownership verification documents</li>
                  <li>Contact information for property inquiries</li>
                  <li>Property location and pricing information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Browsing history and search queries on our platform</li>
                  <li>Device information and IP address</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaEye className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Platform Connection:</strong> To facilitate connections between property seekers and property owners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Verification:</strong> To verify property listings and ensure authenticity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Communication:</strong> To enable direct communication between owners and seekers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Service Improvement:</strong> To enhance our platform and user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Legal Compliance:</strong> To comply with legal obligations and prevent fraudulent activities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold">•</span>
                <span><strong>Notifications:</strong> To send you updates about property listings, inquiries, and platform features</span>
              </li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUserLock className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing and Disclosure</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Horoo does not sell your personal information.</strong> We may share your information only in the following circumstances:
            </p>

            <div className="space-y-3 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Between Users</h3>
                <p className="text-sm">
                  When you express interest in a property, your contact information is shared with the property owner to facilitate direct communication.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Service Providers</h3>
                <p className="text-sm">
                  We may share information with trusted third-party service providers who help us operate our platform (e.g., hosting, analytics).
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Legal Requirements</h3>
                <p className="text-sm">
                  We may disclose information when required by law or to protect our rights and the safety of our users.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. These measures include:
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication protocols</li>
              <li>Secure data storage and backup systems</li>
            </ul>

            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet 
                or electronic storage is 100% secure. Please use caution when sharing sensitive information.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaCookie className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              Cookies help us remember your preferences, understand how you use our site, and provide personalized content.
            </p>

            <p className="text-gray-700 leading-relaxed">
              You can control cookie settings through your browser. However, disabling cookies may limit certain features of our platform.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            
            <div className="space-y-3 text-gray-700">
              <p><strong>Access:</strong> You can request access to your personal information we hold.</p>
              <p><strong>Correction:</strong> You can update or correct your information through your account settings.</p>
              <p><strong>Deletion:</strong> You can request deletion of your account and associated data.</p>
              <p><strong>Opt-Out:</strong> You can opt-out of marketing communications at any time.</p>
              <p><strong>Data Portability:</strong> You can request a copy of your data in a structured format.</p>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:support@horoo.com" className="text-orange-600 hover:underline">support@horoo.com</a>
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Links and Services</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices 
              of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform is not intended for users under the age of 18. We do not knowingly collect personal information from children. 
              If you believe we have inadvertently collected information from a child, please contact us immediately.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the updated policy on our platform and updating the "Last Updated" date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 md:p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> <a href="mailto:support@horoo.com" className="hover:underline">support@horoo.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919166260477" className="hover:underline">+91 9166260477</a></p>
              <p><strong>Address:</strong> 123 Business Park, Sector 44, Gurgaon, Haryana 122003</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
