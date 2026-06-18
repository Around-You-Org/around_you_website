import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// Small "In Short" callout used throughout the notice
function InShort({ children }) {
  return (
    <div
      className="rounded-lg px-4 py-3 mb-4 text-sm"
      style={{ background: 'rgba(62,198,200,0.1)', borderLeft: '3px solid #0D6B6E' }}
    >
      <span className="font-semibold text-[#0D6B6E]">In Short: </span>
      <span className="text-gray-700">{children}</span>
    </div>
  );
}

export default function AppPrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>App Privacy Policy | AroundYou</title>
        <meta
          name="description"
          content="Privacy Policy for the AroundYou mobile application. Learn how AROUND YOU TECHNOLOGIES LTD collects, uses, shares, and protects your personal information in the app."
        />
        <meta property="og:title" content="App Privacy Policy | AroundYou" />
        <meta property="og:description" content="How the AroundYou mobile app collects, uses, and protects your information." />
        <meta property="og:url" content="https://aroundyou.com.ng/app-privacy-policy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-linear-to-r from-[#0D6B6E] to-[#3EC6C8] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Mobile App Privacy Policy
            </h1>
            <p className="text-lg text-gray-100">Last Updated: June 03, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <section className="mb-12">
            <p className="text-gray-700 mb-4">
              This Privacy Notice for <strong>AROUND YOU TECHNOLOGIES LTD</strong> ("we," "us," or
              "our") describes how and why we might access, collect, store, use, and/or share
              ("process") your personal information when you use our services ("Services"), including
              when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                Download and use our mobile application (AROUND YOU), or any other application of
                ours that links to this Privacy Notice
              </li>
              <li>
                Use AroundYou — a managed on-demand digital marketplace and technology platform that
                connects residential and commercial property owners ("Households" or "Users") with
                independent, local service professionals and skilled laborers ("Artisans"), including
                but not limited to plumbers, electricians, carpenters, and appliance repair technicians
              </li>
              <li>Engage with us in other related ways, including any marketing or events</li>
            </ul>
            <p className="text-gray-700 mb-4">The platform facilitates this connection through the following core services:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Discovery and Matchmaking:</strong> allowing Users to request specific
                maintenance, repair, or domestic services, and matching those requests with available,
                independent Artisans in their geographic vicinity.
              </li>
              <li>
                <strong>Vetting Facilitation:</strong> implementing a screening process for
                participating Artisans, which may include identity verification, skill assessments,
                and background checks.
              </li>
              <li>
                <strong>Payment Processing:</strong> facilitating secure, split-payment, or direct
                transaction processing for services completed through the platform.
              </li>
              <li>
                <strong>Customer Support and Dispute Resolution:</strong> providing a framework to
                monitor job fulfilment, collect user ratings, and assist in managing dispute
                resolutions between Users and independent Artisans.
              </li>
            </ul>
            <div className="rounded-lg p-4 mb-4" style={{ background: '#f8fafb', border: '1px solid #e8f3f4' }}>
              <p className="text-gray-700 text-sm">
                <strong>Limitation of Liability Notice:</strong> AroundYou acts strictly as an
                intermediary technology platform. All Artisans listed on the platform are independent
                contractors and are not employees, agents, or representatives of AroundYou. AroundYou
                does not directly provide the physical labor, repair services, or maintenance work,
                and holds no liability for the performance, conduct, actions, omissions, or quality of
                work provided by independent Artisans in a user's home or premises.
              </p>
            </div>
            <p className="text-gray-700">
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you
              understand your privacy rights and choices. If you do not agree with our policies and
              practices, please do not use our Services. If you still have any questions or concerns,
              please contact us at{' '}
              <a href="mailto:contact@aroundyou.com.ng" className="text-[#0D6B6E] hover:underline">
                contact@aroundyou.com.ng
              </a>
              .
            </p>
          </section>

          {/* Summary of key points */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Summary of Key Points
            </h2>
            <p className="text-gray-700 mb-4">
              This summary provides key points from our Privacy Notice. You can find more details on
              each topic in the relevant section below.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>What personal information do we process?</strong> We may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
              <li><strong>Do we process sensitive personal information?</strong> We may process sensitive information when necessary with your consent or as otherwise permitted by applicable law.</li>
              <li><strong>Do we collect information from third parties?</strong> We do not collect any information from third parties.</li>
              <li><strong>How do we process your information?</strong> To provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</li>
              <li><strong>When and with whom do we share information?</strong> We may share information in specific situations and with specific categories of third parties.</li>
              <li><strong>How do we keep your information safe?</strong> We use organisational and technical measures, though no system can be guaranteed 100% secure.</li>
              <li><strong>What are your rights?</strong> Depending on your location, applicable privacy law may give you certain rights regarding your personal information.</li>
            </ul>
          </section>

          {/* 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              1. What Information Do We Collect?
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal information you disclose to us</h3>
            <InShort>We collect personal information that you provide to us.</InShort>
            <p className="text-gray-700 mb-3">
              We collect personal information that you voluntarily provide when you register on the
              Services, express interest in our products and Services, participate in activities on the
              Services, or otherwise contact us. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>names</li><li>phone numbers</li><li>email addresses</li><li>job titles</li>
              <li>usernames</li><li>passwords</li><li>contact preferences</li>
              <li>contact or authentication data</li><li>photo</li><li>location</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sensitive Information</h3>
            <p className="text-gray-700 mb-3">
              When necessary, with your consent or as otherwise permitted by applicable law, we process
              the following categories of sensitive information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>ID</li><li>house address</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Data</h3>
            <p className="text-gray-700 mb-4">
              We may collect data necessary to process your payment if you make purchases, such as your
              payment instrument number and the associated security code. All payment data is handled
              and stored by <strong>Paystack Payments Limited</strong>. You may review their privacy
              notice at{' '}
              <a href="https://paystack.com/terms?q=/ke/terms" target="_blank" rel="noopener noreferrer" className="text-[#0D6B6E] hover:underline">
                paystack.com/terms
              </a>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Application Data</h3>
            <p className="text-gray-700 mb-3">
              If you use our application(s), we may also collect the following if you grant access or
              permission:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Geolocation Information.</strong> We may request access to track location-based information from your mobile device, either continuously or while you use the app, to provide location-based services. You can change this in your device's settings.</li>
              <li><strong>Mobile Device Access.</strong> We may request access to features such as your camera, photo library, and storage. You can change this in your device's settings.</li>
              <li><strong>Mobile Device Data.</strong> We may collect device information such as device ID, model, manufacturer, operating system, version and configuration information, browser type, carrier, and IP address.</li>
              <li><strong>Push Notifications.</strong> We may request to send push notifications regarding your account or app features. You can opt out in your device's settings.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Information automatically collected</h3>
            <InShort>Some information — such as your IP address and/or browser and device characteristics — is collected automatically when you use our Services.</InShort>
            <p className="text-gray-700 mb-3">
              This information does not reveal your specific identity but may include device and usage
              information. The information we collect includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Log and Usage Data.</strong> Service-related, diagnostic, usage, and performance information our servers automatically collect (such as IP address, device information, browser type, activity in the Services, and error reports).</li>
              <li><strong>Device Data.</strong> Information about the computer, phone, tablet, or other device you use to access the Services.</li>
              <li><strong>Location Data.</strong> Information about your device's location, which can be precise or imprecise. You can opt out by disabling location access in your device settings, though some features may then be unavailable.</li>
            </ul>
          </section>

          {/* 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              2. How Do We Process Your Information?
            </h2>
            <InShort>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</InShort>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
              <li>To deliver and facilitate delivery of services to the user.</li>
              <li>To respond to user inquiries and offer support.</li>
              <li>To fulfil and manage your orders, payments, returns, and exchanges.</li>
              <li>To enable user-to-user communications.</li>
              <li>To request feedback and contact you about your use of our Services.</li>
              <li>To evaluate and improve our Services, products, marketing, and your experience.</li>
              <li>To identify usage trends.</li>
            </ul>
          </section>

          {/* 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              3. When and With Whom Do We Share Your Personal Information?
            </h2>
            <InShort>We may share information in specific situations described in this section and/or with the following categories of third parties.</InShort>
            <p className="text-gray-700 mb-3">
              We may share your data with third-party vendors, service providers, contractors, or
              agents who perform services for us and require access to such information. The categories
              of third parties we may share personal information with include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Cloud Computing Services</li>
              <li>Communication &amp; Collaboration Tools</li>
              <li>Data Analytics Services</li>
              <li>Data Storage Service Providers</li>
              <li>Payment Processors</li>
              <li>User Account Registration &amp; Authentication Services</li>
              <li>Performance Monitoring Tools</li>
              <li>Government Entities</li>
            </ul>
            <p className="text-gray-700">
              We may also need to share your information in the following situations:{' '}
              <strong>Business Transfers</strong> — in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all or a portion of our
              business to another company.
            </p>
          </section>

          {/* 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              4. Do We Use Cookies and Other Tracking Technologies?
            </h2>
            <InShort>We may use cookies and other tracking technologies to collect and store your information.</InShort>
            <p className="text-gray-700 mb-4">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to
              gather information when you interact with our Services. Some help maintain security,
              prevent crashes, fix bugs, save your preferences, and assist with basic functions. We
              also permit third parties and service providers to use tracking technologies for
              analytics and advertising.
            </p>
            <p className="text-gray-700">
              <strong>Google Analytics.</strong> We may share your information with Google Analytics to
              track and analyse use of the Services. To opt out, visit{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0D6B6E] hover:underline">
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </section>

          {/* 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              5. How Long Do We Keep Your Information?
            </h2>
            <InShort>We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</InShort>
            <p className="text-gray-700">
              No purpose in this notice will require us to keep your personal information for longer
              than eighteen (18) months past the termination of the user's account, unless a longer
              retention period is required or permitted by law. When we have no ongoing legitimate
              business need to process your personal information, we will either delete or anonymise it,
              or securely store and isolate it from further processing until deletion is possible.
            </p>
          </section>

          {/* 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              6. How Do We Keep Your Information Safe?
            </h2>
            <InShort>We aim to protect your personal information through a system of organisational and technical security measures.</InShort>
            <p className="text-gray-700">
              We have implemented appropriate and reasonable technical and organisational security
              measures. However, no electronic transmission over the Internet or information storage
              technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that
              unauthorised third parties will not be able to defeat our security. Transmission of
              personal information to and from our Services is at your own risk, and you should only
              access the Services within a secure environment.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              7. Do We Collect Information From Minors?
            </h2>
            <InShort>We do not knowingly collect data from or market to children under 18 years of age.</InShort>
            <p className="text-gray-700">
              By using the Services, you represent that you are at least 18, or that you are the parent
              or guardian of such a minor and consent to their use of the Services. If we learn that
              personal information from users under 18 has been collected, we will deactivate the
              account and take reasonable measures to promptly delete such data. If you become aware of
              any data we may have collected from children under 18, please contact us at{' '}
              <a href="mailto:contact@aroundyou.com.ng" className="text-[#0D6B6E] hover:underline">
                contact@aroundyou.com.ng
              </a>
              .
            </p>
          </section>

          {/* 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              8. What Are Your Privacy Rights?
            </h2>
            <InShort>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</InShort>
            <p className="text-gray-700 mb-4">
              <strong>Withdrawing your consent:</strong> If we are relying on your consent, you have the
              right to withdraw it at any time by contacting us using the details below. This will not
              affect the lawfulness of processing before withdrawal.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Opting out of marketing communications:</strong> You can unsubscribe at any time
              by clicking the unsubscribe link in our emails or by contacting us. We may still send
              service-related messages necessary for the administration of your account.
            </p>
            <p className="text-gray-700 mb-2"><strong>Account Information.</strong> At any time, you can:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Contact us using the contact information provided.</li>
              <li>Log in to your account settings and update your user account.</li>
            </ul>
            <p className="text-gray-700">
              Upon your request to terminate your account, we will deactivate or delete your account
              and information from our active databases, though we may retain some information to
              prevent fraud, troubleshoot problems, assist investigations, enforce our legal terms,
              and/or comply with legal requirements.
            </p>
          </section>

          {/* 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              9. Controls for Do-Not-Track Features
            </h2>
            <p className="text-gray-700">
              Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT")
              feature you can activate. As no uniform technology standard for recognising DNT signals
              has been finalised, we do not currently respond to DNT browser signals. If a standard is
              adopted that we must follow in the future, we will inform you in a revised version of this
              Privacy Notice.
            </p>
          </section>

          {/* 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              10. Do We Make Updates to This Notice?
            </h2>
            <InShort>Yes, we will update this notice as necessary to stay compliant with relevant laws.</InShort>
            <p className="text-gray-700">
              The updated version will be indicated by an updated "Revised" date at the top of this
              Privacy Notice. If we make material changes, we may notify you by prominently posting a
              notice or by directly sending you a notification.
            </p>
          </section>

          {/* 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              11. How Can You Contact Us About This Notice?
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions or comments about this notice, you may email us at{' '}
              <a href="mailto:contact@aroundyou.com.ng" className="text-[#0D6B6E] hover:underline">
                contact@aroundyou.com.ng
              </a>{' '}
              or contact us by post at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 font-semibold mb-1">AROUND YOU TECHNOLOGIES LTD</p>
              <p className="text-gray-700">15 Myles Dion Street</p>
              <p className="text-gray-700">Asaba, Delta State</p>
              <p className="text-gray-700">Nigeria</p>
            </div>
          </section>

          {/* 12 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              12. How Can You Review, Update, or Delete the Data We Collect From You?
            </h2>
            <p className="text-gray-700">
              Based on the applicable laws of your country, you may have the right to request access to
              the personal information we collect, details about how we process it, correct
              inaccuracies, or delete your personal information. You may also have the right to withdraw
              your consent. To make such a request, please contact us at{' '}
              <a href="mailto:contact@aroundyou.com.ng" className="text-[#0D6B6E] hover:underline">
                contact@aroundyou.com.ng
              </a>
              .
            </p>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-gray-600">
              <Link to="/" className="text-[#0D6B6E] hover:underline">Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
