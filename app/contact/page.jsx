"use client";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactPage() {

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: "+91 9166260477",
      link: "tel:+919166260477",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: "support@horoo.com",
      link: "mailto:support@horoo.com",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      details: "+91 9166260477",
      link: "https://wa.me/919166260477",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office",
      details: "Gurgaon, Haryana",
      link: null,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: FaFacebook,
      link: "https://facebook.com/horoo",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-600"
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      link: "https://instagram.com/horoo",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      hoverColor: "hover:bg-pink-600"
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      link: "https://linkedin.com/company/horoo",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      link: "https://twitter.com/horoo",
      color: "text-blue-400",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-400"
    }
  ];

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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Get In <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Have questions? We're here to help you find your perfect property
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Contact Information</h2>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    const content = (
                      <>
                        <div className={`${item.bgColor} p-3 rounded-lg flex-shrink-0`}>
                          <IconComponent className={`${item.color} text-lg`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                          <p className="text-gray-600 text-sm break-words">{item.details}</p>
                        </div>
                      </>
                    );

                    return item.link ? (
                      <a
                        key={index}
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Social Media & Business Hours */}
            <div className="space-y-5">
              {/* Social Media */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Connect With Us</h2>
                <p className="text-gray-600 text-sm mb-5">
                  Follow us on social media for updates
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  {socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} hover:scale-110 transition-all duration-300`}
                        title={social.name}
                      >
                        <IconComponent className="text-4xl" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Business Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-900 font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-900 font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-900 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
