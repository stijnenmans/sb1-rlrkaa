import React from 'react';
import TestimonialSlider from './TestimonialSlider';

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden" id="reviews">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
}