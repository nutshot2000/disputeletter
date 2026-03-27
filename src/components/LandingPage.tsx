import { Home, ShieldAlert, Hammer, FileText, Stethoscope, Package, CheckCircle2, Clock, Scale } from 'lucide-react';
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
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          DisputeLetter.org
        </h1>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
          Generate professional, legally-sound demand letters for common disputes in minutes.
        </p>
        
        <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-gray-600">
          <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> Professionally written templates</div>
          <div className="flex items-center"><Clock className="h-5 w-5 text-blue-500 mr-2" /> Ready in 60 seconds</div>
          <div className="flex items-center"><Scale className="h-5 w-5 text-indigo-500 mr-2" /> Regional/State laws</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.entries(DISPUTE_TYPES) as [DisputeType, any][]).map(([type, info]) => {
          const IconComponent = icons[info.icon as keyof typeof icons];
          return (
            <div
              key={type}
              onClick={() => onSelectType(type)}
              className="pt-6 cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg ring-1 ring-gray-900/5 h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{info.title}</h3>
                  <p className="mt-5 text-base text-gray-500">{info.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-24 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-12 sm:px-12 lg:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">How it Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">1</div>
              <h3 className="text-lg font-medium text-gray-900">Tell us what happened</h3>
              <p className="mt-2 text-gray-500">Answer a few simple questions about your dispute, the dates, and the amount owed.</p>
            </div>
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">2</div>
              <h3 className="text-lg font-medium text-gray-900">AI drafts your letter</h3>
              <p className="mt-2 text-gray-500">Our legal AI generates a formal demand letter citing relevant state laws and setting a deadline.</p>
            </div>
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">3</div>
              <h3 className="text-lg font-medium text-gray-900">Download & Send</h3>
              <p className="mt-2 text-gray-500">Instantly download your PDF and follow our action plan to send it securely.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Disclaimer</h3>
        <p className="text-sm text-gray-600">
          IMPORTANT: This letter is generated for informational purposes only and does not constitute legal advice. We are not attorneys. Consult with a qualified legal professional for advice tailored to your specific situation. Use of this service does not create an attorney-client relationship.
        </p>
      </div>
    </div>
  );
}
