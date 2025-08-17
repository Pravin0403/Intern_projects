import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
                ✅ YumLoop – Terms of Service
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Effective Date: June 27, 2025 | Last Updated: June 27, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="mb-6">
                Welcome to YumLoop, your all-in-one platform for food delivery, shopping, social networking, and media sharing. By accessing or using the YumLoop website, mobile application, or any related services, you agree to be bound by the following terms and conditions.
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">1. Eligibility</h2>
                  <p>
                    You must be at least 13 years old to use YumLoop. If you are under the age of 18, you must use the app under the supervision of a parent or legal guardian.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">2. Your Account</h2>
                  <p className="mb-3">You agree to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide accurate and complete registration information.</li>
                    <li>Keep your login credentials secure.</li>
                    <li>Be responsible for all activity under your account.</li>
                  </ul>
                  <p className="mt-3">
                    We reserve the right to suspend accounts with suspicious or harmful activity.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">3. Community Rules</h2>
                  <p className="mb-3">
                    To ensure a safe and inclusive platform, you agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Post offensive, defamatory, or misleading content.</li>
                    <li>Promote violence, abuse, or discrimination.</li>
                    <li>Use bots, scripts, or spam mechanisms.</li>
                    <li>Impersonate others or misrepresent your identity.</li>
                  </ul>
                  <p className="mt-3">
                    Violating these rules may result in content removal, account suspension, or legal action.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">4. Content Ownership & Usage</h2>
                  <p className="mb-3">
                    You retain ownership of any content you upload. By posting on YumLoop, you grant us a non-exclusive, royalty-free, worldwide license to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Display and distribute your content across our platform.</li>
                    <li>Use your content for platform promotions or algorithm training (non-personal data only).</li>
                  </ul>
                  <p className="mt-3">
                    We don't sell your content to third parties without your consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">5. E-Commerce & Food Delivery</h2>
                  <p className="mb-3">
                    YumLoop connects users to vendors, restaurants, and merchants. While we facilitate payments and orders:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>We are not liable for product quality, delivery time, or vendor behavior.</li>
                    <li>Disputes should be resolved between you and the vendor, although YumLoop may assist where possible.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">6. Payments & Refunds</h2>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payments are processed through secure third-party gateways.</li>
                    <li>Refunds, where applicable, are subject to our Refund Policy and vendor policies.</li>
                    <li>Fraudulent transactions may result in legal action.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">7. Third-Party Services</h2>
                  <p className="mb-3">YumLoop integrates services like:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Google, Facebook, and Apple Login</li>
                    <li>Razorpay or Stripe for payments</li>
                    <li>External content hosting (CDNs)</li>
                  </ul>
                  <p className="mt-3">
                    We are not responsible for data or issues on these third-party platforms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">8. Termination</h2>
                  <p className="mb-3">
                    You may delete your account at any time. We may suspend or delete your account for:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Violation of terms</li>
                    <li>Fraudulent activity</li>
                    <li>Legal compliance reasons</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">9. Governing Law</h2>
                  <p>
                    These terms are governed by the laws of India. Disputes shall be settled under the jurisdiction of the courts in Madurai, Tamil Nadu.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">10. Contact</h2>
                  <p className="mb-3">If you have questions, reach out at:</p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p>
                      📧 <a href="mailto:support@yumloop.in" className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">support@yumloop.in</a>
                    </p>
                    <p>
                      📍 Madurai, Tamil Nadu, India
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

export default TermsOfService; 