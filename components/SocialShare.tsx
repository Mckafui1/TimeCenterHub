import React from 'react';
import { Twitter, Facebook, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = 'Check out this tool on TimeCenterHub',
  description = 'Free online time calculators and tools.'
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 border-t border-slate-100 mt-6">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Share this Calculation</p>
      <div className="flex flex-wrap justify-center gap-3">
        {/* X (Twitter) */}
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-black text-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          aria-label="Share on X"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">X</span>
        </a>

        {/* Facebook */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#1877F2] text-white rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">Post</span>
        </a>

        {/* LinkedIn */}
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#0A66C2] text-white rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">Post</span>
        </a>

        {/* Reddit */}
        <a 
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#FF4500] text-white rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300"
          aria-label="Share on Reddit"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
             <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">Reddit</span>
        </a>

        {/* Email */}
        <a 
          href={`mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`}
          className="group relative flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl hover:-translate-y-1 hover:bg-slate-200 transition-all duration-300"
          aria-label="Share via Email"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">Email</span>
        </a>

        {/* Copy Link */}
        <button 
          onClick={copyToClipboard}
          className="group relative flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl hover:-translate-y-1 hover:bg-slate-200 transition-all duration-300"
          aria-label="Copy Link"
        >
          <LinkIcon className="w-5 h-5" />
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider transition-opacity text-slate-500">Copy</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
