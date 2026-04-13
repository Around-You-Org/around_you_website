import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | AroundYou</title>
        <meta
          name="description"
          content="Terms of Service for the AroundYou website and waitlist. Read our terms and conditions before using our services."
        />
        <meta property="og:title" content="Terms of Service | AroundYou" />
        <meta
          property="og:description"
          content="Read the terms that govern your use of the AroundYou website and waitlist."
        />
        <meta property="og:url" content="https://aroundyou.com.ng/terms-of-service" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="bg-linear-to-r from-[#0D6B6E] to-[#3EC6C8] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-100">Last Updated: April 13, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to AroundYou ("we," "us," or "our"). These Terms of Service
              ("Terms") govern your access to and use of the AroundYou website at
              aroundyou.com.ng, our waitlist, and related services (collectively, the
              "Services"). By accessing or using our Services, you agree to be bound
              by these Terms. If you do not agree to these Terms, please do not
              use our Services.
            </p>
            <p className="text-gray-700 mb-4">
              These Terms apply only to our current website and waitlist. They
              do not describe terms for future products or features unless and
              until those features are launched and covered by updated terms.
            </p>
            <p className="text-gray-700">
              These Terms do not govern future marketplace or service interactions
              between users unless and until those features are launched and
              covered by updated terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Eligibility
            </h2>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old or the age of majority in your
              jurisdiction to use our Services. By using the Services, you
              represent and warrant that you meet this eligibility requirement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Waitlist Registration
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.1 Accurate Information
                </h3>
                <p className="text-gray-700">
                  When joining our waitlist, you agree to provide accurate,
                  current, and complete information. You are responsible for
                  maintaining the accuracy of the information you provide and
                  for maintaining access to your email address used for
                  verification.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.2 Email Verification
                </h3>
                <p className="text-gray-700">
                  Waitlist registration requires email verification. You must
                  verify your email address using the verification message we
                  send you to confirm your spot on the waitlist.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  2.3 No Guarantee
                </h3>
                <p className="text-gray-700">
                  Joining the waitlist does not guarantee access to future
                  AroundYou services, any particular launch date, or availability
                  in your area.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Acceptable Use
            </h2>
            <p className="text-gray-700 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li><strong>False information:</strong> Submit false, misleading, or inaccurate information</li>
              <li><strong>Multiple registrations:</strong> Register multiple times with different identities</li>
              <li>
                <strong>Automation:</strong> Use automated tools, bots, or scripts to interact with the
                Services
              </li>
              <li>
                <strong>Disruption:</strong> Attempt to disrupt, overload, or interfere with the proper
                functioning of our website or systems
              </li>
              <li>
                <strong>Unlawful use:</strong> Use the Services for any unlawful purpose or in violation of
                applicable laws
              </li>
              <li>
                <strong>Impersonation:</strong> Impersonate any person or misrepresent your affiliation with any
                entity
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              All content, trademarks, logos, and intellectual property displayed
              on the website are owned by or licensed to AroundYou. You may not
              reproduce, distribute, modify, or create derivative works from our
              content without our prior written consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Communications
            </h2>
            <p className="text-gray-700 mb-4">
              By joining our waitlist, you consent to receive service-related
              communications from us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Email verification messages</li>
              <li>Waitlist confirmation and welcome emails</li>
              <li>Launch notifications and updates</li>
              <li>Important service announcements</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You may opt out of non-essential communications at any time by using
              the unsubscribe option in our emails or contacting us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites or services
              that are not owned or controlled by AroundYou. We are not
              responsible for the content, privacy policies, or practices of any
              third-party websites or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Disclaimers
            </h2>
            <p className="text-gray-700 mb-4">
              The Services are provided "as is" and "as available" without
              warranties of any kind, either express or implied. We do not
              guarantee that the Services will be uninterrupted, error-free, or
              free from viruses or other harmful components.
            </p>
            <p className="text-gray-700">
              We do not guarantee that the Services will be available at all
              times or in all locations, or that any future services will be
              launched.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              To the fullest extent permitted by applicable law, AroundYou and its
              team members, partners, and affiliates shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including but not limited to loss of profits, data, or goodwill,
              arising from your use of or inability to use the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your access to the
              Services at any time, with or without notice, for conduct that we
              believe violates these Terms or is harmful to other users, us, or
              third parties, or for any other reason at our sole discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Service Changes and Availability
            </h2>
            <p className="text-gray-700">
              We may modify, suspend, or discontinue any part of the Services at any time, with or without notice. We are not liable for any such changes, interruptions, or discontinuation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Changes to These Terms
            </h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. When we do, we will
              update the "Last Updated" date at the top of this page. Your
              continued use of the Services after any changes constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with
              the laws of the Federal Republic of Nigeria, without regard to
              conflict of law principles.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. No Relationship Created
            </h2>
            <p className="text-gray-700">
              Nothing in these Terms creates any partnership, employment, or
              agency relationship between you and AroundYou.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              14. Force Majeure
            </h2>
            <p className="text-gray-700">
              We are not liable for delays or failures caused by events beyond
              our reasonable control, including but not limited to natural
              disasters, internet outages, government actions, or other
              unforeseen circumstances.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              15. Entire Agreement
            </h2>
            <p className="text-gray-700">
              These Terms constitute the entire agreement between you and
              AroundYou regarding the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              16. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> support@aroundyou.com.ng
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Website:</strong> aroundyou.com.ng
              </p>
            </div>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-gray-600">
              <Link to="/" className="text-[#0D6B6E] hover:underline">
                Back to Home
              </Link>
              {' · '}
              <Link to="/privacy-policy" className="text-[#0D6B6E] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
