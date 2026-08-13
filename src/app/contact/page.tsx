

export default function Contact() {
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
                  <a href="https://wa.me/971524401075" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-black hover:text-primary transition-colors">+971 52 440 1075</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input type="text" id="name" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white" placeholder="john@company.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white resize-none" placeholder="Tell us what you're working through..."></textarea>
              </div>
              <button type="button" className="w-full py-4 px-8 bg-primary hover:bg-mid/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wider">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
