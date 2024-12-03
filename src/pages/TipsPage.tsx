import React from 'react';
import { Lightbulb } from 'lucide-react';
import DashboardSubmenu from '../components/DashboardSubmenu';

const tips = [
  {
    title: "Be Quick to Respond",
    description: "The rental market moves fast. When you receive a notification about a new property, try to respond within the first hour for the best chance of securing a viewing."
  },
  {
    title: "Prepare Your Documents",
    description: "Have these documents ready: proof of income (last 3 payslips), employment contract, ID/passport copy, and bank statements. This speeds up the application process."
  },
  {
    title: "Write a Strong Application Letter",
    description: "Use our letter generator to create a professional application. Personalize it with specific details about why you're interested in the property."
  },
  {
    title: "Know Your Budget",
    description: "Most landlords require your monthly income to be 3-4 times the rent. Factor in additional costs like utilities, internet, and municipal taxes."
  },
  {
    title: "Understanding Dutch Rental Terms",
    description: "Learn key terms: 'kale huur' (basic rent) vs 'inclusief' (inclusive), 'servicekosten' (service costs), and 'borg' (deposit, usually 1-2 months rent)."
  },
  {
    title: "Registration Requirements",
    description: "Check if you can register at the address ('inschrijven'). This is important for official documents and may be required by your employer."
  },
  {
    title: "Viewing Etiquette",
    description: "Be punctual, dress professionally, and prepare questions about the property. First impressions matter when meeting potential landlords."
  },
  {
    title: "Location Research",
    description: "Research the neighborhood: check public transport connections, nearby amenities, and safety. Use Google Maps street view to explore the area."
  }
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-dark pt-16 relative overflow-hidden">
      <DashboardSubmenu />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-accent" />
              <h1 className="text-2xl font-bold text-white">Tips & Tricks</h1>
            </div>
            <p className="text-gray-400">
              Expert advice to help you find and secure your dream rental property in the Netherlands.
            </p>
          </div>

          <div className="grid gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-semibold text-white mb-3">{tip.title}</h2>
                <p className="text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}