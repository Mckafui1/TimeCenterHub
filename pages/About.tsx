import React from 'react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Helmet>
        <title>About TimeCenterHub - Our Mission for Accurate Time & Date Tools</title>
        <meta name="description" content="Learn about TimeCenterHub's mission to provide the world's most accurate, free, and privacy-focused time calculation tools. Discover how we help millions manage their time effectively." />
        <link rel="canonical" href="https://timecenterhub.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About TimeCenterHub - Our Mission for Accurate Time & Date Tools" />
        <meta property="og:description" content="Learn about TimeCenterHub's mission to provide the world's most accurate, free, and privacy-focused time calculation tools. Discover how we help millions manage their time effectively." />
        <meta property="og:url" content="https://timecenterhub.com/about" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About TimeCenterHub - Our Mission for Accurate Time & Date Tools" />
        <meta name="twitter:description" content="Learn about TimeCenterHub's mission to provide the world's most accurate, free, and privacy-focused time calculation tools. Discover how we help millions manage their time effectively." />
      </Helmet>
      <h1 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">About TimeCenterHub</h1>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
        <p className="text-xl text-slate-900 font-black">
          TimeCenterHub was founded on a simple premise: that time calculation should be accessible, accurate, and completely free for everyone on the planet.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Our Core Mission</h2>
          <p>
            In a world that is moving faster than ever, the way we measure and manage our minutes matters. We believe that tools which help people manage their most precious resource—time—should be high-quality and available without barriers. Our mission is to eliminate the confusion often associated with temporal mathematics. Whether it's adding up shift hours for a paycheck or calculating the exact age for a legal document, we provide the certainty that only precision algorithms can offer.
          </p>
          <p>
            We serve millions of users globally, from students in London tracking study cycles to project managers in Tokyo coordinating global launches. Our platform is designed to be a universal resource that speaks the language of time across every culture and timezone. We are committed to maintaining a neutral, ad-supported model that keeps our core engines free for life.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">The Technology Behind the Hub</h2>
          <p>
            Building a suite of time tools is more complex than it appears on the surface. Time is not a simple decimal system. We deal with sexagesimal math (base-60), varying month lengths, leap year adjustments, and the intricacies of daylight savings time. Our engineering team utilizes the industry-standard ISO-8601 format for all internal calculations, ensuring that our results are compatible with international systems.
          </p>
          <p>
            We leverage the IANA Time Zone Database (also known as the tz database) to power our world clock and conversion engines. This database is updated multiple times a year to reflect the ever-changing landscape of global time zones and political shifts in temporal policy. By keeping our platform updated with the latest technological standards, we provide a level of reliability that matches professional software used in banking and logistics. Our front-end is optimized for lightning-fast delivery, ensuring that calculations happen instantly regardless of your internet connection speed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Historical Significance of Time</h2>
          <p>
            Throughout history, the measurement of time has evolved from sundials and water clocks to the atomic clocks that define the modern second. At TimeCenterHub, we respect this lineage. Our calculators are digital versions of tools that have helped humanity build civilizations. The calendar logic we use traces its roots back to the Gregorian reform of 1582, adapted for the digital era with high-performance algorithms. 
          </p>
          <p>
            Understanding time is also about understanding milestones. Whether it is a wedding countdown or a retirement plan, humans have always looked for ways to visualize the gap between the 'now' and the 'future'. We see our tools as part of that human tradition—bringing clarity to the invisible dimensions of our lives.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">A Commitment to User Privacy</h2>
          <p>
            One of the defining features of TimeCenterHub is our "Privacy-First" architecture. Most of our calculators perform their math locally, right inside your web browser. This means that when you enter sensitive information—like your date of birth or your work schedule—that data stays on your device. We do not store your personal temporal data on our servers.
          </p>
          <p>
            In an era where personal data is often treated as a product, we treat it as a sacred trust. You don't need to create an account to use our tools, and we don't track your calculations. Our revenue comes from simple, non-intrusive advertising that allows us to keep the lights on and the tools free for the people who need them most. We believe privacy is a fundamental human right, especially when it concerns personal time and life milestones.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Who We Serve</h2>
          <p>
            Our user base is as diverse as the tools we offer. Professional attorneys use our billable hours calculator to ensure their billing is fair and standardized. Parents use our pregnancy due date calculator to prepare for life's biggest changes. Developers use our Unix Timestamp tool to decode system logs and synchronize servers. And countless individuals use our Pomodoro Timer to maintain focus and well-being in their daily work.
          </p>
          <p>
            We are proud to be the "hidden engine" behind so many daily tasks. Our goal is not to be flashy, but to be useful. When you need to know exactly how much time has passed or how much is left, we want to be the first place you look. We support educators who use our tools to teach students about intervals and time math, and we support retirees who use our countdowns to visualize their coming freedom.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 pt-6">Looking Forward</h2>
          <p>
            The future of TimeCenterHub is one of expansion and refinement. We are constantly listening to user feedback to add new calculators and improve existing ones. We are currently working on deep-integration tools for educational planning and historical date tracking, as well as enhancing our accessibility features to ensure that everyone, regardless of ability, can use our platform with ease.
          </p>
          <p>
            Time is the one thing we can never get more of. At TimeCenterHub, we help you make sense of the time you have. We are expanding our mobile-first initiatives to ensure that no matter where you are—in a factory, in a courtroom, or at home—you have the world's most accurate time hub in your pocket. Thank you for making us a part of your journey through time.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
