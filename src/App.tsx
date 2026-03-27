/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { DisputeForm } from './components/DisputeForm';
import { ReviewPage } from './components/ReviewPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProcessingPage } from './components/ProcessingPage';
import { SuccessPage } from './components/SuccessPage';
import { DisputeType, FormData } from './types';

type AppState = 'landing' | 'form' | 'review' | 'checkout' | 'processing' | 'success';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [disputeType, setDisputeType] = useState<DisputeType | null>(null);
  const [formData, setFormData] = useState<Partial<FormData>>({ country: 'US' });
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectType = (type: DisputeType) => {
    setDisputeType(type);
    setAppState('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setAppState('review');
  };

  const handleReviewConfirm = () => {
    setAppState('checkout');
  };

  const handlePaymentSuccess = () => {
    setAppState('processing');
  };

  const handleProcessingComplete = (letter: string) => {
    setGeneratedLetter(letter);
    setAppState('success');
  };

  const handleProcessingError = (errMsg: string) => {
    setError(errMsg);
    setAppState('review'); // Go back to review on error
  };

  const handleRestart = () => {
    setAppState('landing');
    setDisputeType(null);
    setFormData({ country: 'US' });
    setGeneratedLetter('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 
            className="text-3xl font-bold text-gray-900 cursor-pointer flex items-center"
            onClick={() => appState !== 'processing' && handleRestart()}
          >
            <span className="text-blue-600 mr-1">DisputeLetter</span>.org
          </h1>
          {appState !== 'landing' && appState !== 'processing' && appState !== 'success' && (
            <div className="text-sm text-gray-500">
              Step: {appState === 'form' ? '1' : appState === 'review' ? '2' : '3'} of 3
            </div>
          )}
        </div>
      </header>
      
      <main>
        {error && (
          <div className="max-w-3xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === 'landing' && (
          <LandingPage onSelectType={handleSelectType} />
        )}
        
        {appState === 'form' && disputeType && (
          <DisputeForm 
            type={disputeType} 
            initialData={formData} 
            onBack={() => setAppState('landing')} 
            onSubmit={handleFormSubmit} 
          />
        )}
        
        {appState === 'review' && disputeType && formData && (
          <ReviewPage 
            type={disputeType} 
            formData={formData as FormData} 
            onBack={() => setAppState('form')} 
            onConfirm={handleReviewConfirm} 
          />
        )}
        
        {appState === 'checkout' && formData && (
          <CheckoutPage 
            formData={formData as FormData}
            onBack={() => setAppState('review')} 
            onSuccess={handlePaymentSuccess} 
          />
        )}
        
        {appState === 'processing' && disputeType && formData && (
          <ProcessingPage 
            type={disputeType} 
            formData={formData as FormData} 
            onComplete={handleProcessingComplete} 
            onError={handleProcessingError} 
          />
        )}
        
        {appState === 'success' && (
          <SuccessPage 
            letter={generatedLetter} 
            country={formData.country || 'US'}
            onRestart={handleRestart} 
          />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 DisputeLetter.org. All rights reserved.</p>
          <p className="mt-2">Not a law firm. Does not provide legal advice.</p>
        </div>
      </footer>
    </div>
  );
}
