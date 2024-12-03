import React from 'react';
import { Lock } from 'lucide-react';

interface PaymentMethodModalProps {
  onClose: () => void;
  onSubmit: (method: string) => void;
}

const paymentMethods = [
  {
    id: 'ideal',
    name: 'iDEAL',
    icon: 'https://www.ideal.nl/img/ideal-logo.svg',
  },
  {
    id: 'card',
    name: 'Credit Card',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
  },
];

export default function PaymentMethodModal({ onClose, onSubmit }: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = React.useState('ideal');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-white mb-6">Update Payment Method</h3>
        
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'bg-white/10 border-accent'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="text-accent"
                />
                <span className="text-white">{method.name}</span>
              </div>
              <div className="h-6 w-16 flex items-center justify-end">
                <img 
                  src={method.icon} 
                  alt={method.name} 
                  className="h-full object-contain"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(selectedMethod);
              onClose();
            }}
            className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
          >
            Update Payment Method
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
          <Lock className="w-4 h-4" />
          Secure payment powered by Stripe
        </div>
      </div>
    </div>
  );
}