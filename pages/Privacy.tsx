import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">Privacy Policy</h1>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
        <p className="text-xl text-slate-900 font-black">
          Last Updated: February 2025
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">1. Our Commitment to Your Privacy</h2>
          <p>
            At TimeCenterHub, we believe that your time is your business. We are committed to protecting the privacy of our users while providing the best possible calculation tools. This policy explains how we handle your data, or more accurately, how we avoid handling it whenever possible.
          </p>
          <p>
            Because our core service involves processing personal dates (like birthdays) and schedules, we have architected our platform to be "client-side first." This means the vast majority of your data never even reaches our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">2. Data Processing (Calculations)</h2>
          <p>
            When you use one of our calculators—such as the Age Calculator, Time Between Dates, or Work Hours Tracker—the mathematical processing happens within your web browser. The values you enter into the input fields are processed by our JavaScript code on your device.
          </p>
          <p>
            We do not log, store, or transmit the specific numbers, dates, or names you enter into these calculators. Once you close your browser tab or refresh the page, that information is cleared from your device's temporary memory. We have no record of who you are or what you calculated.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">3. Information We Do Collect</h2>
          <p>
            Like almost every website on the internet, we collect standard, non-identifiable technical information to help us maintain the site. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Browser Information:</strong> Which browser and version you are using (e.g., Firefox, Edge).</li>
            <li><strong>Device Type:</strong> Whether you are on a mobile phone, tablet, or desktop.</li>
            <li><strong>Usage Statistics:</strong> Which tool pages are visited most frequently.</li>
            <li><strong>Referrer Data:</strong> Which site or search engine brought you to us.</li>
          </ul>
          <p>
            This data is aggregated and used solely to improve our site's performance and to decide which new tools we should build next.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">4. Cookies and Tracking</h2>
          <p>
            We use minimal cookies. Most of our cookies are "functional," meaning they help the site work (for example, remembering if you prefer a dark or light mode, if we offered one). We do use third-party analytics (like Google Analytics) to understand site traffic, but we have configured these services to anonymize your IP address and respect "Do Not Track" settings.
          </p>
          <p>
            We also show advertisements to keep our service free. Our advertising partners may use cookies to show you ads that are relevant to your interests. You can manage your ad preferences through your browser settings or via the opt-out links provided by the advertising networks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">5. Third-Party Links</h2>
          <p>
            Our site contains links to other websites (for example, in our "About Us" section or via advertisements). We are not responsible for the privacy practices of these other sites. We encourage you to read the privacy policies of any site you visit after leaving TimeCenterHub.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">6. Children's Privacy</h2>
          <p>
            Our tools are designed for general audiences. We do not knowingly collect personal information from children under the age of 13. Since we don't collect personal information from *any* of our users, we are inherently compliant with COPPA and similar international standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">7. Policy Updates</h2>
          <p>
            As technology and privacy laws change, we may update this policy. When we do, we will update the "Last Updated" date at the top of the page. We recommend checking this page occasionally to stay informed about our privacy practices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">8. Contact Us Regarding Privacy</h2>
          <p>
            If you have any questions about this Privacy Policy or our treatment of your data, please contact us at privacy@timecenterhub.com. We take privacy seriously and will respond to your inquiry as quickly as possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;