import { useState, useEffect } from 'react';
import { FormData, DisputeType, DISPUTE_TYPES } from '../types';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface DisputeFormProps {
  type: DisputeType;
  initialData: Partial<FormData>;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

export function DisputeForm({ type, initialData, onBack, onSubmit }: DisputeFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>(initialData);
  const [savedMessage, setSavedMessage] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`dispute_draft_${type}`);
    const isFreshStart = Object.keys(initialData).length === 0 || (Object.keys(initialData).length === 1 && initialData.country !== undefined);
    
    if (savedDraft && isFreshStart) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (e) {
        console.error('Failed to parse saved draft');
      }
    }
  }, [type, initialData]);

  // Save draft to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(`dispute_draft_${type}`, JSON.stringify(formData));
    }
  }, [formData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setValidationError(null);
    setStep((s) => s + 1);
  };
  const handlePrev = () => {
    setValidationError(null);
    setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Date consistency validation
    if (type === 'security_deposit') {
      const moveIn = new Date(formData.moveInDate || '');
      const moveOut = new Date(formData.moveOutDate || '');
      const incident = new Date(formData.incidentDate || '');

      if (moveOut < moveIn) {
        setValidationError('Move-out date cannot be before move-in date.');
        return;
      }
      if (incident < moveOut) {
        setValidationError('Incident date (when you realized deposit was withheld) should be after move-out date.');
        return;
      }
    }

    if (type === 'contractor_work') {
      const contract = new Date(formData.contractDate || '');
      const incident = new Date(formData.incidentDate || '');
      if (incident < contract) {
        setValidationError('Incident date cannot be before the contract date.');
        return;
      }
    }

    // Clear draft on successful submission
    localStorage.removeItem(`dispute_draft_${type}`);
    onSubmit(formData as FormData);
  };

  const handleManualSave = () => {
    localStorage.setItem(`dispute_draft_${type}`, JSON.stringify(formData));
    setSavedMessage('Draft saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const renderUniversalFieldsStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Your Information</h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <div className="mt-1">
            <select required name="country" id="country" value={formData.country || 'US'} onChange={(e) => setFormData({ ...formData, country: e.target.value as 'US' | 'UK', state: '' })} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white">
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="userFullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1">
            <input required type="text" name="userFullName" id="userFullName" value={formData.userFullName || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="mt-1">
            <input required type="email" name="userEmail" id="userEmail" value={formData.userEmail || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1">
            <input required type="tel" name="userPhone" id="userPhone" value={formData.userPhone || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">Your Address</label>
          <div className="mt-1">
            <input required type="text" name="userAddress" id="userAddress" value={formData.userAddress || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUniversalFieldsStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Recipient Information</h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">Recipient Name (Company or Person)</label>
          <div className="mt-1">
            <input required type="text" name="recipientName" id="recipientName" value={formData.recipientName || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700">Recipient Address</label>
          <div className="mt-1">
            <input required type="text" name="recipientAddress" id="recipientAddress" value={formData.recipientAddress || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUniversalFieldsStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Incident Details</h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700">Date of Incident</label>
          <div className="mt-1">
            <input required type="date" name="incidentDate" id="incidentDate" value={formData.incidentDate || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="disputeAmount" className="block text-sm font-medium text-gray-700">Amount in Dispute ({formData.country === 'UK' ? '£' : '$'})</label>
          <div className="mt-1">
            <input type="number" step="0.01" name="disputeAmount" id="disputeAmount" value={formData.disputeAmount || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            {formData.country === 'UK' ? 'Region / Nation' : 'State'}
          </label>
          <div className="mt-1">
            {formData.country === 'UK' ? (
              <select required name="state" id="state" value={formData.state || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white">
                <option value="">Select Region...</option>
                <option value="England">England</option>
                <option value="Scotland">Scotland</option>
                <option value="Wales">Wales</option>
                <option value="Northern Ireland">Northern Ireland</option>
              </select>
            ) : (
              <input required type="text" name="state" id="state" placeholder="e.g. California" value={formData.state || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
            )}
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="situationDescription" className="block text-sm font-medium text-gray-700">Detailed Description of Situation</label>
          <div className="mt-1">
            <textarea required name="situationDescription" id="situationDescription" rows={4} value={formData.situationDescription || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="desiredResolution" className="block text-sm font-medium text-gray-700">Desired Resolution</label>
          <div className="mt-1">
            <textarea required name="desiredResolution" id="desiredResolution" rows={2} value={formData.desiredResolution || ''} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
          </div>
        </div>
        <div className="sm:col-span-6">
          <label htmlFor="letterTone" className="block text-sm font-medium text-gray-700">Letter Tone</label>
          <p className="text-xs text-gray-500 mb-2">How aggressive do you want this letter to be?</p>
          <div className="mt-1">
            <select name="letterTone" id="letterTone" value={formData.letterTone || 'standard'} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white">
              <option value="polite">Polite & Collaborative (Best for preserving relationships)</option>
              <option value="standard">Firm & Professional (Standard legal demand tone)</option>
              <option value="assertive">Maximum Assertiveness (Threaten immediate legal action)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpecificFields = () => {
    switch (type) {
      case 'security_deposit':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Security Deposit Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Move-in Date</label>
                <input required type="date" name="moveInDate" value={formData.moveInDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Move-out Date</label>
                <input required type="date" name="moveOutDate" value={formData.moveOutDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Deposit Amount Paid ({formData.country === 'UK' ? '£' : '$'})</label>
                <input required type="number" name="depositAmountPaid" value={formData.depositAmountPaid || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
            </div>
          </div>
        );
      case 'hoa_violation':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">HOA Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">HOA Name</label>
                <input required type="text" name="hoaName" value={formData.hoaName || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Violation Date</label>
                <input required type="date" name="violationDate" value={formData.violationDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Rule Being Disputed</label>
                <input required type="text" name="disputedRule" value={formData.disputedRule || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
            </div>
          </div>
        );
      case 'contractor_work':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Contractor Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Contract Date</label>
                <input required type="date" name="contractDate" value={formData.contractDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Payment Made ({formData.country === 'UK' ? '£' : '$'})</label>
                <input required type="number" name="paymentMade" value={formData.paymentMade || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Work Description</label>
                <textarea required name="workDescription" rows={3} value={formData.workDescription || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
              </div>
            </div>
          </div>
        );
      case 'insurance_claim':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Insurance Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                <input required type="text" name="policyNumber" value={formData.policyNumber || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Claim Number</label>
                <input required type="text" name="claimNumber" value={formData.claimNumber || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Denial Reason</label>
                <textarea required name="denialReason" rows={3} value={formData.denialReason || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
              </div>
            </div>
          </div>
        );
      case 'medical_billing':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Medical Billing Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                <input required type="text" name="providerName" value={formData.providerName || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Bill Date</label>
                <input required type="date" name="billDate" value={formData.billDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Service Description</label>
                <textarea required name="serviceDescription" rows={3} value={formData.serviceDescription || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
              </div>
            </div>
          </div>
        );
      case 'product_warranty':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Warranty Details</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input required type="text" name="productName" value={formData.productName || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input required type="date" name="purchaseDate" value={formData.purchaseDate || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">Warranty Terms</label>
                <textarea required name="warrantyTerms" rows={3} value={formData.warrantyTerms || ''} onChange={handleChange} className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </button>
        <div className="flex items-center space-x-4">
          {savedMessage && <span className="text-sm text-green-600 font-medium">{savedMessage}</span>}
          <button onClick={handleManualSave} type="button" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            <Save className="mr-1 h-4 w-4" /> Save Draft
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
        <div className="mt-2 text-xs font-medium text-gray-500 text-right">
          Step {step} of 4
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {DISPUTE_TYPES[type].title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please provide accurate details for your demand letter.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {step === 1 && renderUniversalFieldsStep1()}
            {step === 2 && renderUniversalFieldsStep2()}
            {step === 3 && renderUniversalFieldsStep3()}
            {step === 4 && renderSpecificFields()}

            {validationError && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{validationError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Previous
                </button>
              ) : <div></div>}
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {step === 4 ? 'Review Details' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
