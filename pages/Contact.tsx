import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">Contact Us</h1>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
        <p className="text-xl text-slate-900 font-black">
          Do you have a question about one of our time calculators? Or perhaps a suggestion for a new tool? We'd love to hear from you.
        </p>

        <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
           <h2 className="text-2xl font-black text-slate-900 mb-6">How to Reach Us</h2>
           <p>
             The fastest way to get in touch is via email. We monitor our inbox constantly and typically respond within 24 to 48 hours. Whether you've found a bug in a calculation or just want to tell us how TimeCenterHub helped you, your feedback is invaluable.
           </p>
           <div className="mt-8 space-y-4 font-black">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">@</div>
                 <span className="text-slate-900">support@timecenterhub.com</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">#</div>
                 <span className="text-slate-900">Press and Business: media@timecenterhub.com</span>
              </div>
           </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Reporting a Calculation Error</h2>
          <p>
            Accuracy is our top priority. We test our algorithms against multiple standards, but the edge cases of time math (leap seconds, historical calendar changes, etc.) can be tricky. If you believe one of our calculators has returned an incorrect result, please let us know immediately.
          </p>
          <p>
            To help us debug the issue, please include the specific inputs you used and the result you were expecting. Our engineering team will review the logic and update the calculator if an error is found. Your diligence helps millions of other users who rely on these tools daily for legal, financial, and personal planning.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Feature Requests and New Tools</h2>
          <p>
            Most of the tools you see on TimeCenterHub today were built because a user asked for them. If there is a specific type of time or date calculation that you find yourself performing manually, we want to hear about it. 
          </p>
          <p>
            Whether it's a specialized payroll logic for your industry or a fun countdown for a specific global event, our mission is to build the most comprehensive hub on the web. We review all feature requests and prioritize them based on how many users they will benefit. No idea is too small or too complex—we love a good temporal challenge!
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Common Questions (FAQ)</h2>
          <p>
            Before sending an email, you might find your answer here in our list of common inquiries. We update this list based on the most frequent questions our support team receives.
          </p>
          
          <div className="space-y-6 mt-8">
             <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <p className="font-black text-slate-900 mb-2">How accurate are your calculators?</p>
                <p className="text-sm">Extremely. We use standard temporal libraries and cross-reference our results with atomic clock standards and the IANA time database. We account for Gregorian leap years and standard timezone offsets.</p>
             </div>
             <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <p className="font-black text-slate-900 mb-2">Can I use your tools on my own website?</p>
                <p className="text-sm">Currently, we do not offer an embeddable widget or public API. We recommend linking directly to the specific tool page on TimeCenterHub so your users always have access to the latest version.</p>
             </div>
             <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <p className="font-black text-slate-900 mb-2">Is my data safe?</p>
                <p className="text-sm">Yes. We do not store the numbers or dates you enter into our calculators. The math happens in your browser and disappears when you close the tab. We take your privacy very seriously.</p>
             </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Partnerships and Collaboration</h2>
          <p>
            TimeCenterHub is open to collaborating with educational institutions, non-profits, and productivity-focused organizations. If you are developing an app or a program that requires accurate time data or if you'd like to feature our tools in your curriculum, please reach out to our media and partnerships team. We believe in the power of open information and accurate measurement to help people live more organized lives.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Office Information</h2>
          <p>
            Although we are a "digital-first" team with contributors around the globe, our administrative hub is located in the heart of the tech sector. We do not currently offer in-person support, but we are always available via the digital channels listed above.
          </p>
          <p className="font-bold">
            TimeCenterHub Administration<br />
            123 Temporal Way, Suite 400<br />
            San Francisco, CA 94105<br />
            United States
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
