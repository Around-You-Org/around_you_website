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
        <meta
          name="description"
          content="Privacy Policy for the AroundYou website and waitlist. Learn how we collect, use, and protect information submitted through our website, waitlist, contact forms, and chat."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="bg-linear-to-r from-[#0D6B6E] to-[#3EC6C8] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              Website and Waitlist Privacy Policy
            </h1>
            <p className="text-lg text-gray-100">Last Updated: April 9, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              AroundYou ("we," "us," or "our") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and protect personal information in connection with the
              AroundYou website at aroundyou.com.ng, our waitlist, our website
              contact and partnership forms, and our website chat tools.
            </p>
            <p className="text-gray-700">
              This Privacy Policy applies only to our current website and
              waitlist. We only collect the information reasonably necessary for
              the website, waitlist, communications, and support. We do not
              sell or rent your personal data to third parties. It does not
              describe future products or features unless and until they are
              launched and covered by an updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1.1 Waitlist Information
                </h3>
                <p className="text-gray-700 mb-3">
                  When you join our waitlist, we may collect:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Name:</strong> your full name
                  </li>
                  <li>
                    <strong>Email Address:</strong> your email address for
                    waitlist registration, email verification, and updates
                  </li>
                  <li>
                    <strong>Phone Number:</strong> your phone number for
                    waitlist administration, contact, and duplicate prevention
                  </li>
                  <li>
                    <strong>Role:</strong> whether you are joining as a
                    customer or worker
                  </li>
                  <li>
                    <strong>Location:</strong> your city or service area
                  </li>
                  <li>
                    <strong>Services:</strong> the services you are interested
                    in or offer, especially if you join as a worker
                  </li>
                  <li>
                    <strong>Referral Source:</strong> how you heard about
                    AroundYou
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1.2 Contact and Partnership Form Information
                </h3>
                <p className="text-gray-700 mb-3">
                  If you contact us through the website or submit a partnership
                  inquiry, we may collect information you choose to provide,
                  such as:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Profession or role</li>
                  <li>Message or inquiry details</li>
                  <li>Any other information you include in your submission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1.3 Chat and Support Information
                </h3>
                <p className="text-gray-700">
                  If you use our website chat widget powered by Brevo (chat and
                  messaging provider), we may collect the information you submit
                  in chat, along with technical information related to the chat
                  session and delivery of the service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  1.4 Automatically Collected Technical Information
                </h3>
                <p className="text-gray-700 mb-3">
                  When you visit or interact with our website, we and our
                  hosting and infrastructure providers may automatically process
                  certain technical data, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device and operating system information</li>
                  <li>Referral source and page requests</li>
                  <li>Timestamps and basic request metadata</li>
                  <li>
                    Security and anti-abuse information used to protect the
                    website and waitlist
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Lawful Basis for Processing
            </h2>
            <p className="text-gray-700 mb-4">
              We process personal information based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Consent:</strong> when you submit forms, join the
                waitlist, contact us, or otherwise provide information.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> when we need to operate,
                secure, maintain, and improve the website and waitlist, respond
                to inquiries, prevent abuse, and support business operations.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for purposes such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Operating, maintaining, and securing the website</li>
              <li>
                Processing waitlist registrations and sending email
                verification messages
              </li>
              <li>
                Sending service-related emails such as waitlist confirmation,
                email verification, waitlist updates, and launch notifications
              </li>
              <li>
                Understanding interest by city, role, and service category so we
                can plan rollout priorities
              </li>
              <li>Responding to contact, support, and partnership inquiries</li>
              <li>
                Operating our website chat and customer communication tools
              </li>
              <li>
                Allowing you to opt out of non-essential communications where
                applicable
              </li>
              <li>
                Preventing spam, abuse, duplicate registrations, fraud, and
                other security issues
              </li>
              <li>Complying with legal obligations and enforcing our rights</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. How We Share Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.1 Supabase
                </h3>
                <p className="text-gray-700">
                  We use Supabase to help store waitlist information and operate
                  backend functions related to waitlist processing, email
                  verification, and anti-abuse controls.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.2 Brevo
                </h3>
                <p className="text-gray-700">
                  We use Brevo to send waitlist email verification messages and
                  other waitlist emails, and to provide website chat
                  functionality through Brevo Conversations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.3 Formspree
                </h3>
                <p className="text-gray-700">
                  We use Formspree to process contact form and partnership
                  inquiry submissions made through the website.
                </p>
              </div>

              <p className="text-gray-700">
                Supabase, Brevo, and Formspree process personal data on our
                behalf to help operate the website and services. We do not sell
                or rent your personal data to third parties.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.4 Hosting and Infrastructure Providers
                </h3>
                <p className="text-gray-700">
                  Our hosting, delivery, and infrastructure providers may
                  process technical information such as IP address, request
                  logs, and device or browser information to operate the website
                  securely and reliably.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  4.5 Legal or Business Reasons
                </h3>
                <p className="text-gray-700">
                  We may disclose information if required by law, to respond to
                  valid legal requests, to protect our rights or users, or if we
                  are involved in a merger, acquisition, financing, or asset
                  sale.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use reasonable administrative, technical, and organizational
              measures to help protect the information we process. Depending on
              the context, these measures may include encrypted website
              connections, access controls, email verification messages for
              waitlist signups, and anti-spam or rate-limiting protections.
            </p>
            <p className="text-gray-700">
              However, no method of transmission or storage is completely
              secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700">
              We keep personal information only for as long as reasonably
              necessary to operate the website and waitlist, communicate with
              you, respond to inquiries, maintain security, comply with legal
              obligations, and resolve disputes. If you request deletion, we may
              retain limited information where necessary for security, fraud
              prevention, recordkeeping, or legal compliance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Privacy Choices and Rights
            </h2>
            <p className="text-gray-700 mb-4">
              Depending on applicable law, you may have the right to:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  7.1 Access
                </h3>
                <p className="text-gray-700">
                  Request information about the personal information we hold
                  about you.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  7.2 Correction
                </h3>
                <p className="text-gray-700">
                  Ask us to correct inaccurate or incomplete personal
                  information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  7.3 Deletion
                </h3>
                <p className="text-gray-700">
                  Ask us to delete your personal information, subject to
                  applicable exceptions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  7.4 Communication Preferences
                </h3>
                <p className="text-gray-700">
                  Opt out of non-essential email communications by using the
                  unsubscribe option where available or by contacting us
                  directly.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact us using the
              details in Section 10 below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Cookies and Similar Technologies
            </h2>
            <p className="text-gray-700 mb-4">
              Our website and service providers may use essential cookies or
              similar technologies to operate the website, support embedded
              services like chat, improve performance, and maintain security.
            </p>
            <p className="text-gray-700 mb-4">
              We do not use cookies for advertising purposes.
            </p>
            <p className="text-gray-700">
              You can manage cookies through your browser settings, although
              disabling some cookies may affect how parts of the website or chat
              features work.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites, social
              platforms, or external services. We are not responsible for the
              privacy practices, content, or policies of those third parties,
              and we encourage you to review their privacy notices before
              sharing information with them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or wish to
              submit a privacy-related request, please contact us at:
            </p>
            <p className="text-gray-700 mb-4">
              We will respond within a reasonable timeframe.
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

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect
              changes in our website, waitlist process, service providers, legal
              requirements, or business operations. When we do, we will update
              the "Last Updated" date at the top of this page.
            </p>
          </section>

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
