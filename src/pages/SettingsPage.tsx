import React, { useState } from 'react';
import { Mail, Phone, MapPin, Euro, BedDouble, Maximize, AlertTriangle, Lock, Bell, CreditCard, Camera } from 'lucide-react';
import DashboardSubmenu from '../components/DashboardSubmenu';
import { FilterOptions } from '../types';
import NumberInput from '../components/registration/NumberInput';
import { cities, priceRanges, bedroomOptions, surfaceAreaOptions } from '../data/mockData';
import Map from '../components/Map';
import PaymentMethodModal from '../components/settings/PaymentMethodModal';
import ProfilePictureModal from '../components/settings/ProfilePictureModal';

export default function SettingsPage() {
  const [showFilterConfirm, setShowFilterConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState('ideal');
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80');
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: false
  });
  const [filters, setFilters] = useState<FilterOptions>({
    city: 'Amsterdam',
    maxPrice: 2000,
    minBedrooms: 2,
    minSurfaceArea: 40,
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePaymentMethodUpdate = (method: string) => {
    setCurrentPaymentMethod(method);
    // Here you would typically update this in your backend
  };

  const handleProfilePictureUpdate = (imageUrl: string) => {
    setProfilePicture(imageUrl);
    // Here you would typically upload the image to your backend
  };

  return (
    <div className="min-h-screen bg-dark pt-16 relative overflow-hidden">
      <DashboardSubmenu />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Filters */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Search Filters</h2>
              </div>
              <p className="text-sm text-gray-400">
                You can update your search filters once every 24 hours. Changes may take up to 1 hour to process while our system finds new matches for you.
              </p>
            </div>

            {/* Map */}
            <div className="h-[250px] border-b border-white/10">
              <div className="w-[calc(100%-48px)] mx-auto h-full py-6">
                <Map selectedCity={filters.city} properties={[]} />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  City
                </label>
                <div className="w-[calc(100%-96px)]">
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-dark">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <NumberInput
                label="Max Price"
                icon={<Euro className="w-4 h-4 text-accent" />}
                value={filters.maxPrice}
                onChange={(value) => handleFilterChange('maxPrice', value)}
                unit="€"
                min={750}
                max={5000}
                options={priceRanges}
              />

              <NumberInput
                label="Min Bedrooms"
                icon={<BedDouble className="w-4 h-4 text-accent" />}
                value={filters.minBedrooms}
                onChange={(value) => handleFilterChange('minBedrooms', value)}
                unit="+"
                min={1}
                max={6}
                options={bedroomOptions}
              />

              <NumberInput
                label="Min Surface Area"
                icon={<Maximize className="w-4 h-4 text-accent" />}
                value={filters.minSurfaceArea}
                onChange={(value) => handleFilterChange('minSurfaceArea', value)}
                unit=" m²"
                min={20}
                max={200}
                options={surfaceAreaOptions}
              />

              <button
                onClick={() => setShowFilterConfirm(true)}
                className="w-full px-4 py-2 bg-accent text-white rounded-lg font-medium mt-4"
              >
                Update Filters
              </button>
            </div>
          </div>

          {/* Right Column - Notifications and Personal Info */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                  />
                  <button
                    onClick={() => setShowProfilePictureModal(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Profile Picture</h3>
                  <button
                    onClick={() => setShowProfilePictureModal(true)}
                    className="text-secondary hover:text-secondary/80"
                  >
                    Change picture
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Payment Method</h3>
                  <p className="text-sm text-gray-400">Manage your payment information</p>
                </div>
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://www.ideal.nl/img/ideal-logo.svg"
                      alt="Current payment method"
                      className="h-6 object-contain"
                    />
                    <span className="text-white">••••4242</span>
                  </div>
                  <span className="text-sm text-gray-400">Expires 12/24</span>
                </div>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-secondary hover:text-secondary/80"
              >
                Update payment method
              </button>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <p className="text-gray-400 mb-6">
                We send rental matches twice a day at 13:00 and 17:00. Choose how you'd like to receive them:
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors bg-white/5 border-white/10 hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                    className="text-accent rounded"
                  />
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive matches in your inbox</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors bg-white/5 border-white/10 hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={notifications.whatsapp}
                    onChange={(e) => setNotifications(prev => ({ ...prev, whatsapp: e.target.checked }))}
                    className="text-accent rounded"
                  />
                  <div>
                    <p className="text-white font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-gray-400">Get instant messages on WhatsApp</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    Email Address
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value="john.doe@example.com"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                      readOnly
                    />
                    <button className="px-4 py-2 bg-accent text-white rounded-lg font-medium">
                      Change
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="tel"
                      placeholder="Add phone number"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                    />
                    <button className="px-4 py-2 bg-accent text-white rounded-lg font-medium">
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Password
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      value="••••••••"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                      readOnly
                    />
                    <button 
                      onClick={() => setShowPasswordModal(true)}
                      className="px-4 py-2 bg-accent text-white rounded-lg font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFilterConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-accent mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Update Filters?</h3>
            </div>
            <p className="text-gray-300 mb-6">
              You can only update your search filters once every 24 hours. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowFilterConfirm(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle filter update
                  setShowFilterConfirm(false);
                }}
                className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-white mb-6">
              <Lock className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold">Change Password</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle password change
                  setShowPasswordModal(false);
                }}
                className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <PaymentMethodModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentMethodUpdate}
        />
      )}

      {showProfilePictureModal && (
        <ProfilePictureModal
          onClose={() => setShowProfilePictureModal(false)}
          onSubmit={handleProfilePictureUpdate}
        />
      )}
    </div>
  );
}