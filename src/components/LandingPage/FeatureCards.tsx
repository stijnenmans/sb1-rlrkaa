import React from 'react';
import { Key, Clock, Heart } from 'lucide-react';

const features = [
  {
    icon: Key,
    title: 'Access 750+ rental websites',
    description: 'We aggregate listings from all major Dutch rental websites and agencies in one place.'
  },
  {
    icon: Clock,
    title: 'Real-time notifications',
    description: 'Get instant alerts via WhatsApp or email when new properties match your criteria.'
  },
  {
    icon: Heart,
    title: 'Save time and energy',
    description: 'No more constant refreshing of websites. We do the hard work for you.'
  }
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-secondary/50 transition-all duration-300"
            >
              <div className="inline-block p-4 bg-white/5 rounded-xl mb-6 border border-white/10">
                <feature.icon className={`w-8 h-8 ${index === 1 ? 'text-accent' : 'text-secondary'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}