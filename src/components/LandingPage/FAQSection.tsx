import React from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How quickly will I receive notifications?",
    answer: "You'll receive notifications within seconds of a new property being listed that matches your criteria. We send updates twice daily at 13:00 and 17:00."
  },
  {
    question: "Can I customize my search preferences?",
    answer: "Yes! You can set preferences for city, price range, number of bedrooms, and minimum surface area. You can update these preferences once every 24 hours."
  },
  {
    question: "How many rental websites do you monitor?",
    answer: "We monitor over 750+ rental websites and agencies across the Netherlands, ensuring you never miss a potential home."
  },
  {
    question: "What happens after the free trial?",
    answer: "After your 14-day free trial, you'll be charged based on your selected plan. You can cancel anytime during the trial period."
  },
  {
    question: "Can I receive notifications via WhatsApp?",
    answer: "Yes! You can choose to receive notifications via email, WhatsApp, or both. You can change your notification preferences at any time."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary via-secondary to-secondary/80 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about RentalBot
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-secondary shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-secondary shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}