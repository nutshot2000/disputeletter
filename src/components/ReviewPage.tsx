import { FormData, DisputeType, DISPUTE_TYPES } from '../types';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ReviewPageProps {
  type: DisputeType;
  formData: FormData;
  onBack: () => void;
  onConfirm: () => void;
}

export function ReviewPage({ type, formData, onBack, onConfirm }: ReviewPageProps) {
  const currencySymbol = formData.country === 'UK' ? '£' : '$';

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" /> Edit Details
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Review Your Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {DISPUTE_TYPES[type].title}
            </p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {Object.entries(formData).map(([key, value]) => {
              if (!value) return null;
              // Format key to readable label (e.g., userFullName -> User Full Name)
              let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
              if (key === 'state') label = formData.country === 'UK' ? 'Region' : 'State';
              return (
                <div key={key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">{label}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onConfirm}
            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Proceed to Payment ({currencySymbol}19)
          </button>
        </div>
      </div>
    </div>
  );
}
