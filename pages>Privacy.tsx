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
            Because our core service involves processing personal dates (like birthdays) and schedules, we have architected our platform to be "client-side first." This means the vast majority of your data never even reaches our servers. We believe this is the gold standard for modern privacy on the web.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">2. Data Processing (Calculations)</h2>
          <p>
            When you use one of our calculators—such as the Age Calculator, Time Between Dates, or Work Hours Tracker—the mathematical processing happens within your web browser. The values you enter into the input fields are processed by our JavaScript code on your device. 
          </p>
          <p>
            We do not log, store, or transmit the specific numbers, dates, or names you enter into these calculators to any remote server. Once you close your browser tab or refresh the page, that information is cleared from your device's temporary memory. We have no record of who you are or what specific calculation you performed. Your personal milestones stay entirely private to you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">3. Information We Do Collect</h2>
          <p>
            Like almost every website on the internet, we collect standard, non-identifiable technical information to help us maintain the site. This includes technical logs that are necessary for the security and maintenance of our hosting infrastructure:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Browser Information:</strong> Which browser and version you are using (e.g., Firefox, Edge).</li>
            <li><strong>Device Type:</strong> Whether you are on a mobile phone, tablet, or desktop.</li>
            <li><strong>Usage Statistics:</strong> Which tool pages are visited most frequently.</li>
            <li><strong>Referrer Data:</strong> Which site or search engine brought you to us.</li>
            <li><strong>Technical Metadata:</strong> IP addresses in server logs (used only for security monitoring and DDoS protection).</li>
          </ul>
          <p>
            This data is aggregated and used solely to improve our site's performance and to decide which new tools we should build next. It is never sold to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">4. California Consumer Privacy Act (CCPA)</h2>
          <p>
            For our users in California, we provide the following disclosures. Under the CCPA, you have the right to know what personal data is collected and to request its deletion. However, since TimeCenterHub does not "collect" personal information in the traditional sense—as we do not store your names, email addresses, or calculation data—there is no personal information database for you to opt-out of.
          </p>
          <p>
            We do not sell personal information to third parties. Any "sharing" of data is limited to technical service providers who help us host the site or serve advertisements, and this data is strictly non-personally identifiable metadata.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">5. General Data Protection Regulation (GDPR)</h2>
          <p>
            For users in the European Economic Area (EEA), we comply with the GDPR. Our legal basis for processing non-personally identifiable metadata is our legitimate interest in maintaining and securing our website. We do not process personal data for profiling or automated decision-making. 
          </p>
          <p>
            Because your calculation data remains on your client device, you remain the "controller" of that data. If you have any concerns regarding how we handle technical metadata, you have the right to lodge a complaint with your local data protection authority.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">6. Cookies and Tracking</h2>
          <p>
            We use minimal cookies. Most of our cookies are "functional," meaning they help the site work. We use third-party analytics (like Google Analytics) to understand site traffic, but we have configured these services to anonymize your IP address and respect "Do Not Track" settings.
          </p>
          <p>
            We also show advertisements to keep our service free. Our advertising partners may use cookies to show you ads that are relevant to your interests. You can manage your ad preferences through your browser settings or via the opt-out links provided by the advertising networks. We strive to only work with reputable partners who respect user choice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">7. Security Measures</h2>
          <p>
            Even though we do not store your data, we take the security of our platform seriously. We use HTTPS encryption across the entire site to protect your connection. We regularly update our server software and perform security audits to prevent malicious code from being served to our users. Your trust is our most important asset.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">8. Contact Us Regarding Privacy</h2>
          <p>
            If you have any questions about this Privacy Policy or our treatment of your data, please contact us at privacy@timecenterhub.com. We take privacy seriously and will respond to your inquiry as quickly as possible. We are committed to complete transparency in how we operate.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
