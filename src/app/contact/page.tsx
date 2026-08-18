import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = pageMetadata("contact");

import { WHATSAPP_URL } from "@/lib/flags";


export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  // Set by the no-JavaScript path, where the route handler redirects back here
  // with the outcome rather than leaving the visitor on a blank response.
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = params.error ?? null;

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16 bg-gray-50">
      
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 tracking-tight">
            Let&apos;s have the first conversation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto">
            Real growth starts with the right conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-gray-100">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-6">Send Us a Message</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
              Our team reads every inquiry personally. Tell us what you’re working through and we’ll follow up within one working day.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-6 group-hover:bg-primary transition-colors">
                  <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Email Us</p>
                  <a href="mailto:hello@pivotprime.ae" className="text-xl font-bold text-black hover:text-primary transition-colors">hello@pivotprime.ae</a>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-6 group-hover:bg-primary transition-colors">
                  <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">WhatsApp / Call</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-black hover:text-primary transition-colors">+971 52 440 1075</a>
                </div>
              </div>
            </div>
          </div>

          {/* Spec 2.3. Delivers to hello@pivotprime.ae with reply-to set to
              the submitter, plus an autoresponder. Works with JavaScript off:
              the form posts natively and the route answers with a redirect. */}
          <EnquiryForm initialStatus={sent ? "sent" : null} initialError={error} />
        </div>
      </section>

    </div>
  );
}
