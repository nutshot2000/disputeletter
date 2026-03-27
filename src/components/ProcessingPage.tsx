import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { generateDisputeLetter } from '../services/geminiService';
import { FormData, DisputeType } from '../types';

interface ProcessingPageProps {
  type: DisputeType;
  formData: FormData;
  onComplete: (letter: string) => void;
  onError: (error: string) => void;
}

export function ProcessingPage({ type, formData, onComplete, onError }: ProcessingPageProps) {
  useEffect(() => {
    let isMounted = true;

    const generate = async () => {
      try {
        const letter = await generateDisputeLetter(type, formData);
        if (isMounted) {
          onComplete(letter);
        }
      } catch (error: any) {
        if (isMounted) {
          onError(error.message || 'An error occurred while generating the letter.');
        }
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  }, [type, formData, onComplete, onError]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Loader2 className="mx-auto h-16 w-16 text-blue-600 animate-spin" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Generating Your Letter...
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Our AI legal assistant is drafting your professional demand letter based on the details you provided. This usually takes 10-20 seconds.
        </p>
      </div>
    </div>
  );
}
