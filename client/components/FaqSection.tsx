
import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How do I book a customized tour package?",
    answer: "You can easily book a customized package by filling out our enquiry form or contacting our travel artisans directly via phone or email. We specialize in tailoring every detail—from flights to local experiences—to match your specific preferences."
  },
  {
    question: "What is included in the price of your tour packages?",
    answer: "Our packages typically include premium accommodations, professional guided tours, internal ground transfers, and selected meals as outlined in the itinerary. Specific inclusions vary by package, but we always aim for a comprehensive, worry-free experience."
  },
  {
    question: "Do you provide visa assistance for international travel?",
    answer: "Yes, we offer expert visa assistance for both UAE and global destinations. Our dedicated team guides you through the entire documentation and application process to ensure a smooth and successful approval for your journey."
  },
  {
    question: "What happens if I need to cancel or reschedule my trip?",
    answer: "We understand that plans can change. While cancellation policies vary depending on the specific tour and airline, we always strive to provide flexible rescheduling options and transparent refund processes wherever possible."
  },
  {
    question: "Are your tours suitable for families with children or seniors?",
    answer: "Absolutely! We design many of our itineraries with family-friendly activities and accessible accommodations in mind. We can customize any tour to include specific requirements for children or seniors to ensure everyone's comfort and enjoyment."
  },
  {
    question: "Do you offer 24/7 support during the trip?",
    answer: "Yes, your peace of mind is our priority. We provide 24/7 emergency assistance for all our travelers. Whether you need a local recommendation or urgent logistical help, our support team is just a call away regardless of your time zone."
  }
];

const AccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-brand-dark/10 last:border-0 overflow-hidden">
      <button 
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left group hover:opacity-80 transition-opacity"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-brand-gold' : 'text-brand-dark'}`}>
          {item.question}
        </span>
        <div className={`shrink-0 w-6 h-6 rounded-full border border-brand-dark/20 flex items-center justify-center transition-all ${isOpen ? 'bg-brand-gold border-brand-gold' : 'bg-transparent'}`}>
          <span className={`text-xl leading-none font-light mb-0.5 ${isOpen ? 'text-white' : 'text-brand-dark/40'}`}>
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-2xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="global-page-container max-w-screen-2xl mx-auto bg-brand-bg">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Header */}
        <div className="lg:w-1/3">
           <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
            Common Inquiries
          </p>
          <h2 className="text-4xl md:text-[30px] font-serif font-bold text-brand-dark mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed font-medium">
            Everything you need to know about planning your next great adventure with our team of global travel experts.
          </p>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-2/3">
          <div className="flex flex-col">
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                item={item} 
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
