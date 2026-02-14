import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    document.title = title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph
    const setMeta = (name: string, content: string) => {
        let el = document.querySelector(`meta[property="${name}"]`);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', name);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', window.location.href);
    
    // Update Canonical
    let linkParams = document.querySelector('link[rel="canonical"]');
    if (linkParams) {
        linkParams.setAttribute('href', canonical || window.location.href);
    }
  }, [title, description, canonical]);

  return null;
};

export default Seo;