import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex justify-center items-center h-full w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 backdrop-blur-sm py-8">
      <div className="grid gap-8 w-full max-w-4xl mx-4">
        <section
          id="back-div"
          className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-3xl p-1"
        >
          <div
            className="border-8 border-violet-500 rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2 max-h-[80vh] overflow-y-auto"
          >
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={handleBack}
                className="flex items-center text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-2">
                🔐 YumLoop – Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Effective Date: June 27, 2025 | Last Updated: June 27, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-6">
                At YumLoop, we value your privacy. This policy outlines how we collect, use, and protect your personal data.
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">1. Information We Collect</h2>
                  <p className="mb-3">We collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Account Data:</strong> Name, email, phone number, profile picture</li>
                    <li><strong>Usage Data:</strong> Posts, likes, orders, shopping cart activity</li>
                    <li><strong>Location Data:</strong> For delivery and local services</li>
                    <li><strong>Device Info:</strong> Browser, IP address, device type</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">2. How We Use Your Data</h2>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>To provide and improve the YumLoop experience</li>
                    <li>To deliver your food, products, and messages</li>
                    <li>To personalize content and recommendations</li>
                    <li>For customer support and communication</li>
                    <li>To ensure platform security and prevent fraud</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">3. Who We Share With</h2>
                  <p className="mb-3">We only share data with:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Vendors and delivery partners (limited to necessary order data)</li>
                    <li>Payment processors (encrypted)</li>
                    <li>Analytics tools (anonymized usage statistics)</li>
                  </ul>
                  <p className="mt-3">
                    We do not sell your personal data.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">4. Your Rights</h2>
                  <p className="mb-3">You can:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Access, update, or delete your personal data</li>
                    <li>Withdraw consent for marketing emails</li>
                    <li>Request account deletion via <a href="mailto:privacy@yumloop.in" className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">privacy@yumloop.in</a></li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">5. Cookies & Tracking</h2>
                  <p className="mb-3">We use cookies to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Remember user preferences</li>
                    <li>Measure site/app performance</li>
                    <li>Enable secure login sessions</li>
                  </ul>
                  <p className="mt-3">
                    You can disable cookies via your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">6. Data Security</h2>
                  <p>
                    We use SSL encryption, secure databases, and firewalls to protect your data. However, no system is 100% secure, so please use strong passwords and logout on shared devices.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">7. Updates</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you via the app or email when significant changes are made.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">8. Contact</h2>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p>
                      📧 <a href="mailto:privacy@yumloop.in" className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">privacy@yumloop.in</a>
                    </p>
                    <p>
                      🌐 <a href="https://yumloop.in/privacy" className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">https://yumloop.in/privacy</a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 