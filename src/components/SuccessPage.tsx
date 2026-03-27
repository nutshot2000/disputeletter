import { Download, Copy, Mail, CheckCircle, RefreshCcw, FileSignature, Send, CalendarClock } from 'lucide-react';
import jsPDF from 'jspdf';
import ReactMarkdown from 'react-markdown';

interface SuccessPageProps {
  letter: string;
  country: 'US' | 'UK';
  onRestart: () => void;
}

export function SuccessPage({ letter, country, onRestart }: SuccessPageProps) {
  // EMAIL: Send completed letter
  // - Use Resend or SendGrid API
  // - Attach generated PDF
  // - Send confirmation to user
  // - BCC yourself for records

  // DATABASE: Store orders
  // - MongoDB or PostgreSQL
  // - Fields: id, user_email, dispute_type, form_data, status, created_at, paid_at, letter_url

  // ANALYTICS: Track conversions
  // - Stripe payment events
  // - Letter generation events

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Professional PDF formatting
    const margin = 20; // 20mm margin (approx 0.8 inches)
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    
    // Set professional font
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    
    // Strip basic markdown for the PDF (Gemini often returns **bold** or # headers)
    const plainText = letter.replace(/\*\*/g, '').replace(/#/g, '');
    
    const textLines = doc.splitTextToSize(plainText, maxLineWidth);
    
    let y = 25; // Start a bit lower for top margin
    for (let i = 0; i < textLines.length; i++) {
      if (y > 275) { // Bottom margin
        doc.addPage();
        y = 25;
      }
      doc.text(textLines[i], margin, y);
      y += 6; // Line height
    }
    
    doc.save('Demand_Letter.pdf');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    alert('Letter copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          Your Letter is Ready!
        </h2>
        <p className="mt-2 text-lg text-gray-500">
          We've generated your professional demand letter. You can download it as a PDF or copy the text.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Generated Letter
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Copy className="h-4 w-4 mr-1.5" /> Copy Text
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-1.5" /> Download PDF
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="prose max-w-none text-gray-800 whitespace-pre-wrap font-serif border p-8 rounded-md bg-gray-50 shadow-inner">
                <ReactMarkdown>{letter}</ReactMarkdown>
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-1.5" /> A copy has been sent to your email (simulated).
              </p>
              <button
                onClick={onRestart}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <RefreshCcw className="h-4 w-4 mr-1.5" /> Create Another Letter
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 sticky top-6">
            <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-100">
              <h3 className="text-lg leading-6 font-bold text-blue-900">
                Action Plan: What's Next?
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Follow these steps to ensure your letter has maximum legal impact.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <FileSignature className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">1. Sign the Letter</h4>
                    <p className="mt-1 text-sm text-gray-500">Print the PDF and sign it at the bottom in blue or black ink.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Copy className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">2. Make a Copy</h4>
                    <p className="mt-1 text-sm text-gray-500">Keep a signed copy of the letter for your own personal records.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Send className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">3. Send via Tracked Mail</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {country === 'UK' 
                        ? 'Go to the post office and send it via Royal Mail Signed For or Special Delivery. This proves they received it.'
                        : 'Go to the post office and send it via USPS Certified Mail with a Return Receipt. This proves they received it.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <CalendarClock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">4. Wait 30 Days</h4>
                    <p className="mt-1 text-sm text-gray-500">Mark your calendar. If they don't respond or resolve the issue, you can proceed to small claims court.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
