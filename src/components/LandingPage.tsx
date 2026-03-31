import { 
  Home, ShieldAlert, Hammer, FileText, Stethoscope, Package, 
  CheckCircle2, Clock, Scale, ArrowRight, ShieldCheck, Zap, 
  FileCheck, Star, Download, ChevronRight 
} from 'lucide-react';
import { useRef } from 'react';
import { DisputeType, DISPUTE_TYPES } from '../types';

interface LandingPageProps {
  onSelectType: (type: DisputeType) => void;
}

const icons = {
  Home,
  ShieldAlert,
  Hammer,
  FileText,
  Stethoscope,
  Package,
};

export function LandingPage({ onSelectType }: LandingPageProps) {
  const templatesRef = useRef<HTMLDivElement>(null);

  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pb-40 border-b border-gray-200">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" />
        
        {/* Decorative Grid Patterns for tech-feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 border border-blue-200 mb-8 shadow-sm animate-fade-in">
            <Zap className="h-4 w-4 mr-2 text-blue-600" />
            Professional Legal Demand Letters
          </div>
          
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Get What You're Owed.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Without the Lawyer Fees.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            Generate a professional, legally-sound demand letter citing your state's laws in just 60 seconds. Stop ignoring disputes and start taking action.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={scrollToTemplates}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden ring-4 ring-blue-50"
            >
              <span className="relative z-10 flex items-center">
                Generate Demand Letter – $19
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <p className="text-sm w-full sm:w-auto justify-center text-gray-500 sm:ml-4 font-medium flex items-center py-2 px-4 bg-gray-50/80 rounded-full border border-gray-100">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" /> Secure via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-10 w-full">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-2 md:pt-0 pb-4 md:pb-0">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-blue-600 font-bold text-lg">$19</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">Flat Rate</p>
              <p className="text-sm text-gray-500 font-medium">Per generated letter</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center py-4 md:py-0">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">Ready in 60s</p>
              <p className="text-sm text-gray-500 font-medium">Fast & instant process</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center py-4 md:py-0">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <Scale className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">State Laws</p>
              <p className="text-sm text-gray-500 font-medium">Tailored to your region</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-4 md:pt-0">
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <FileCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">Instant PDF</p>
              <p className="text-sm text-gray-500 font-medium">Download immediately</p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <section ref={templatesRef} className="py-24 bg-gray-50 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Select Your Dispute Type</h2>
            <p className="text-lg text-gray-600">
              Choose from our professionally structured templates tailored to specific situations. Provide simple details, and our AI does the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.entries(DISPUTE_TYPES) as [DisputeType, any][]).map(([type, info]) => {
              const IconComponent = icons[info.icon as keyof typeof icons] || FileText;
              return (
                <div
                  key={type}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
                  onClick={() => onSelectType(type)}
                >
                  {/* Decorative background circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                  
                  <div className="relative z-10 flex min-w-0">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <IconComponent className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-gray-500 flex-grow mb-8 line-clamp-3 leading-relaxed">
                    {info.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-blue-600 font-bold text-sm bg-blue-50/50 py-2.5 px-4 rounded-lg group-hover:bg-blue-100 transition-colors w-full justify-center">
                    Use this template
                    <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Three simple steps to generate a professional, legally-sound demand letter that demands attention.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 text-center relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-200 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="mb-6 h-24 w-24 rounded-full bg-blue-50 border-8 border-white shadow-xl shadow-blue-100/50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110 duration-300">
                <FileText className="h-10 w-10" />
              </div>
              <div className="absolute top-16 -right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold mb-4 shadow-sm border-2 border-white focus:outline-none">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tell us what happened</h3>
              <p className="text-gray-500 leading-relaxed px-4">Answer a few simple questions about your dispute, the relevant dates, and the amount owed.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="mb-6 h-24 w-24 rounded-full bg-indigo-50 border-8 border-white shadow-xl shadow-indigo-100/50 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110 duration-300 delay-75">
                <Zap className="h-10 w-10" />
              </div>
              <div className="absolute top-16 -right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold mb-4 shadow-sm border-2 border-white focus:outline-none">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">We Draft Your Letter</h3>
              <p className="text-gray-500 leading-relaxed px-4">Our system creates a professional, legally-sound demand letter citing relevant state laws and setting a strict deadline.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="mb-6 h-24 w-24 rounded-full bg-emerald-50 border-8 border-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110 duration-300 delay-150">
                <Download className="h-10 w-10" />
              </div>
              <div className="absolute top-16 -right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-bold mb-4 shadow-sm border-2 border-white focus:outline-none">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Download & Send</h3>
              <p className="text-gray-500 leading-relaxed px-4">Pay a transparent $19 flat fee. Instantly download your PDF and follow our action plan to send it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Trusted by over 5,000+ users</h2>
            <p className="text-xl text-slate-400">See what others are saying about the results they got from our demand letters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 relative">
              <div className="absolute top-6 right-6 text-slate-700 opacity-20">
                <FileText className="h-20 w-20" />
              </div>
              <div className="flex text-yellow-500 mb-6 gap-1 relative z-10">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed relative z-10 text-lg">
                "My landlord was holding my $1,500 deposit for 3 months. I sent the letter generated here, and he overnighted the check on day 2. Best $19 I've ever spent."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-inner">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-white">Sarah M.</h4>
                  <p className="text-sm text-slate-400">Security Deposit Dispute</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 relative">
              <div className="absolute top-6 right-6 text-slate-700 opacity-20">
                <Hammer className="h-20 w-20" />
              </div>
              <div className="flex text-yellow-500 mb-6 gap-1 relative z-10">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed relative z-10 text-lg">
                "A contractor walked off the job with my $5,000 upfront payment. This letter cited the exact state statutes he violated. He settled within a week."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white shadow-inner">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-white">James D.</h4>
                  <p className="text-sm text-slate-400">Contractor Dispute</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors duration-300 relative">
              <div className="absolute top-6 right-6 text-slate-700 opacity-20">
                <CheckCircle2 className="h-20 w-20" />
              </div>
              <div className="flex text-yellow-500 mb-6 gap-1 relative z-10">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed relative z-10 text-lg">
                "Incredibly easy to use. I didn't want to hire a lawyer for a $800 unpaid invoice, but this letter sounded like it came directly from a law firm."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white shadow-inner">
                  AL
                </div>
                <div>
                  <h4 className="font-bold text-white">Amanda L.</h4>
                  <p className="text-sm text-slate-400">Freelance Invoice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA / Disclaimer Component Area */}
      <div className="bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm flex items-start gap-5">
            <div className="bg-amber-100 p-3 rounded-xl shrink-0">
              <ShieldAlert className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Disclaimer</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                IMPORTANT: This letter is generated for informational purposes only and does not constitute legal advice. We are not attorneys. Consult with a qualified legal professional for advice tailored to your specific situation. Use of this service does not create an attorney-client relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
