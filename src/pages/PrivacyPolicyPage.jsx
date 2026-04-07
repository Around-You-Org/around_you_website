import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivacyPolicyPage() {


    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


  return (
    <>
    
      <Helmet>
        <title>Privacy Policy | AroundYou</title>
        <meta name="description" content="Privacy Policy for AroundYou - Learn how we collect, use, and protect your personal data." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-[#0D6B6E] to-[#3EC6C8] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-100">Last Updated: April 7, 2026</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              AroundYou ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal information in connection with our website (aroundyou.com.ng), mobile applications, and related services (collectively, the "Platform").
            </p>
            <p className="text-gray-700">
              Please read this Privacy Policy carefully. By accessing or using AroundYou, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.
            </p>
          </section>

          {/* Data We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.1 Waitlist Registration Information</h3>
                <p className="text-gray-700 mb-3">When you join our waitlist, we collect the following information:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Name:</strong> Your full name</li>
                  <li><strong>Email Address:</strong> Your email for communications and account access</li>
                  <li><strong>Phone Number:</strong> Your phone number for contact and verification purposes</li>
                  <li><strong>Role:</strong> Whether you're interested as a customer or service provider</li>
                  <li><strong>Location:</strong> Your city or service area</li>
                  <li><strong>Services of Interest:</strong> Types of services you're interested in</li>
                  <li><strong>Referral Source:</strong> How you heard about AroundYou</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.2 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-3">When you interact with our Platform, we automatically collect:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>Referral source</li>
                  <li>Timestamps of your interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.3 Location Information</h3>
                <p className="text-gray-700">When you use our mobile application, you may grant us permission to access your device's GPS location data to help us find professionals near you.</p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and improve our services</li>
              <li>To manage your waitlist registration and send updates about AroundYou</li>
              <li>To match you with relevant professionals or customers based on your location and service interests</li>
              <li>To communicate with you about changes to our policies or services</li>
              <li>To verify your identity and prevent fraudulent activity</li>
              <li>To comply with legal obligations</li>
              <li>To analyze trends and improve user experience</li>
              <li>To provide customer support</li>
              <li>To send marketing communications (only with your consent)</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing and Disclosure</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Service Providers</h3>
                <p className="text-gray-700">We may share your information with third-party service providers who perform services on our behalf, including email marketing platforms (Brevo), hosting providers, and analytics services. These service providers are obligated to protect your information and use it only for the purposes we specify.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Legal Obligations</h3>
                <p className="text-gray-700">We may disclose your information when required by law or when we believe in good faith that such disclosure is necessary to comply with legal obligations, protect our rights, or protect the safety of our users.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Business Transfers</h3>
                <p className="text-gray-700">If AroundYou is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.4 With Your Consent</h3>
                <p className="text-gray-700">We will not share your information with third parties for marketing purposes without your explicit consent.</p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the internet is fully secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. For waitlist registrations, we retain your information until you request deletion or for a period of one year of inactivity, whichever comes first. We may retain certain information longer if required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Right to Access</h3>
                <p className="text-gray-700">You have the right to request and receive a copy of the personal information we hold about you.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Right to Correction</h3>
                <p className="text-gray-700">You may request that we correct or update inaccurate or incomplete personal information.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6.3 Right to Deletion</h3>
                <p className="text-gray-700">You may request that we delete your personal information, subject to certain exceptions (such as when we need to retain it for legal compliance).</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6.4 Right to Opt-Out</h3>
                <p className="text-gray-700">You can opt-out of receiving marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact us using the information provided in Section 8 below.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our Platform. Cookies are small files stored on your device that help us remember your preferences and analyze usage patterns. You can control cookie settings through your browser preferences, though disabling cookies may affect some features of our Platform.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> support@aroundyou.com.ng</p>
              <p className="text-gray-700 mb-2"><strong>Website:</strong> aroundyou.com.ng</p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The "Last Updated" date at the top of this page indicates when the Privacy Policy was last modified. Continued use of our Platform after changes are posted constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Footer Links */}
          <div className="border-t pt-8 mt-12">
            <p className="text-gray-600">
              <Link to="/" className="text-[#0D6B6E] hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
