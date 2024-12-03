import React from 'react';
import { ClipboardList, MessageSquare, Clock } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: "Build your search profile",
    description: "Tell us what type of house you're looking for, and we'll search more than 750+ rental websites to find your ideal home."
  },
  {
    icon: MessageSquare,
    title: "Receive every rental listing 24/7",
    description: "When we find a house that matches your preferences, you'll receive a notification on WhatsApp or Email within seconds."
  },
  {
    icon: Clock,
    title: "Be the first to viewings",
    description: "Responding fast means you'll find a home in weeks instead of months."
  }
];

export default function FeatureSteps() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-secondary/50 transition-all duration-300"
              >
                <div className="inline-block p-4 bg-white/5 rounded-xl mb-6 border border-white/10">
                  <step.icon className={`w-8 h-8 ${index === 1 ? 'text-accent' : 'text-secondary'}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}