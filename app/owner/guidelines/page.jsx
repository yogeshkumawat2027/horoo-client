"use client";
import { FaCheckCircle, FaImages, FaFileAlt, FaUserCheck, FaStar, FaExclamationTriangle, FaHandshake, FaClipboardList } from "react-icons/fa";

export default function OwnerGuidelinesPage() {
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
            <FaClipboardList className="text-orange-400 text-xl" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Owner <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Guidelines</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Best practices for listing your property on Horoo
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Property Owners!</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Thank you for choosing Horoo to list your property. As a platform, we help you reach genuine property seekers 
              who are looking for verified accommodations. This guide will help you create effective listings and maintain quality standards.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-gray-800 font-semibold">
                <FaHandshake className="inline mr-2 text-blue-600" />
                Our platform connects you directly with property seekers. All bookings and payments are handled directly between you and the tenant.
              </p>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUserCheck className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Eligibility Requirements</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold">To list a property on Horoo, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be the legal owner or authorized representative of the property</li>
                <li>Have all necessary permissions and legal rights to rent the property</li>
                <li>Comply with local laws, regulations, and housing codes</li>
                <li>Possess valid property ownership documents</li>
                <li>Be 18 years of age or older</li>
                <li>Have a valid phone number and email address</li>
              </ul>
            </div>
          </div>

          {/* Documentation Required */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaFileAlt className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Required Documentation</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">For verification purposes, you'll need to provide:</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Property Documents:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Property ownership proof (title deed, sale deed, or registry)</li>
                  <li>Property tax receipts</li>
                  <li>NOC (No Objection Certificate) if applicable</li>
                  <li>Occupancy certificate (for new constructions)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Owner Identity Documents:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Government-issued photo ID (Aadhaar, PAN card, Passport, or Driver's License)</li>
                  <li>Address proof</li>
                  <li>Contact verification (phone and email)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm text-gray-700">
                  <FaExclamationTriangle className="inline mr-2 text-yellow-600" />
                  <strong>Note:</strong> All documents are verified by our team. We maintain strict confidentiality and use documents solely for verification purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Creating Listing */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating an Effective Listing</h2>
            
            <div className="space-y-5">
              {/* Property Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Accurate Property Information
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Provide complete and truthful property details</li>
                  <li>Specify the exact location with correct address</li>
                  <li>List all amenities and facilities available</li>
                  <li>Mention nearby landmarks and connectivity</li>
                  <li>State clear rental terms, deposit requirements, and lock-in period</li>
                  <li>Specify property type, size, and configuration accurately</li>
                  <li>Include utilities included/excluded in rent</li>
                </ul>
              </div>

              {/* Photos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaImages className="text-blue-600" />
                  High-Quality Property Images
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium">Image Guidelines:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Upload clear, well-lit, recent photographs</li>
                    <li>Include images of all rooms and common areas</li>
                    <li>Show bathroom, kitchen, and balcony (if available)</li>
                    <li>Capture exterior and building views</li>
                    <li>Use horizontal orientation for better display</li>
                    <li>Minimum 5-10 high-resolution images recommended</li>
                    <li>Avoid using filters or heavily edited photos</li>
                    <li>Ensure images accurately represent current condition</li>
                  </ul>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Competitive Pricing</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Research market rates for similar properties in your area</li>
                  <li>Set realistic and competitive rental prices</li>
                  <li>Clearly mention what's included in the rent</li>
                  <li>Be transparent about additional charges (maintenance, electricity, etc.)</li>
                  <li>Update pricing if market conditions change</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Best Practices for Success</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✓ Do's</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Respond promptly to inquiries</li>
                  <li>• Keep property information updated</li>
                  <li>• Be honest about property condition</li>
                  <li>• Maintain property cleanliness</li>
                  <li>• Provide complete contact details</li>
                  <li>• Honor the pricing shown on listing</li>
                  <li>• Be professional in communication</li>
                  <li>• Update availability status regularly</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">✗ Don'ts</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Don't post fake or misleading information</li>
                  <li>• Don't use old or inaccurate photos</li>
                  <li>• Don't inflate prices unreasonably</li>
                  <li>• Don't discriminate against seekers</li>
                  <li>• Don't ignore inquiries</li>
                  <li>• Don't list properties you don't own</li>
                  <li>• Don't hide major property issues</li>
                  <li>• Don't share incorrect contact details</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Communication with Property Seekers</h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Professional Communication:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Respond to inquiries within 24 hours</li>
                  <li>Be courteous, respectful, and professional</li>
                  <li>Provide clear and detailed answers</li>
                  <li>Schedule property viewings promptly</li>
                  <li>Be available at agreed viewing times</li>
                  <li>Discuss terms and conditions clearly</li>
                </ul>
              </div>

              <p className="leading-relaxed">
                <strong>Direct Contact:</strong> Horoo enables direct communication between you and property seekers. 
                Exchange contact information freely and arrange viewings, agreements, and payments directly.
              </p>
            </div>
          </div>

          {/* Safety & Legal */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-orange-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Safety & Legal Compliance</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Safety Guidelines:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ensure property meets safety standards</li>
                  <li>Install smoke detectors and fire safety equipment</li>
                  <li>Maintain electrical and plumbing systems</li>
                  <li>Provide secure locks and entry systems</li>
                  <li>Keep common areas well-maintained</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal Obligations:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Comply with all local rental laws and regulations</li>
                  <li>Obtain necessary permits and licenses</li>
                  <li>Draft proper rental agreements</li>
                  <li>Follow tenant rights and fair housing laws</li>
                  <li>Maintain transparency in all dealings</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> You are solely responsible for all agreements, transactions, and legal compliance. 
                  Horoo is a Rental platform and not party to any rental agreements.
                </p>
              </div>
            </div>
          </div>

          {/* Listing Management */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Listing</h2>
            
            <div className="space-y-3 text-gray-700">
              <p className="font-semibold">Regular Maintenance:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update availability status immediately when property is rented</li>
                <li>Refresh photos periodically if property condition changes</li>
                <li>Update pricing based on market conditions</li>
                <li>Respond to all inquiries, even if property is unavailable</li>
                <li>Remove listing if you no longer wish to rent</li>
                <li>Keep your contact information current</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>Dashboard Access:</strong> Use your owner dashboard to manage listings, view inquiries, and track property performance.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Guidelines */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Usage Guidelines</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Quality Standards:</h3>
                <p className="mb-2">Horoo maintains quality standards to ensure a positive experience for all users. We may:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Review and verify all listings before publication</li>
                  <li>Request additional information or documentation</li>
                  <li>Remove listings that don't meet quality standards</li>
                  <li>Suspend accounts for violations of guidelines</li>
                  <li>Conduct periodic re-verification of properties</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Support:</strong> Our team is available to assist you with listing creation, verification, and any questions. 
                  Contact us at <a href="mailto:support@horoo.com" className="text-orange-600 hover:underline">support@horoo.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 md:p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="leading-relaxed mb-4">
              Our support team is here to help you succeed on Horoo. Contact us for:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Listing creation assistance</li>
              <li>Verification support</li>
              <li>Technical issues</li>
              <li>General questions</li>
            </ul>
            <div className="space-y-2 border-t border-orange-500 pt-4 mt-4">
              <p><strong>Email:</strong> <a href="mailto:support@horoo.com" className="hover:underline">support@horoo.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+918279053200" className="hover:underline">+91 8279053200</a></p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
