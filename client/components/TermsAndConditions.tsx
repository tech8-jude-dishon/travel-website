import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Hero Banner */}
            <div className="bg-[#00A9D7] py-16 px-6 text-center">
                <span className="inline-block text-white/70 text-sm font-black uppercase tracking-widest mb-3">
                    Legal
                </span>
                <h1 className="text-4xl md:text-[52px] font-black text-white leading-tight">
                    Terms and Conditions
                </h1>
                <p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
                    Please read these terms carefully before using our services.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

                <p className="text-slate-500 text-sm">Last updated: March 2026</p>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">1. Acceptance of Terms</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        By accessing or using the services provided by Global Connect World Travel ("GCWT", "we", "us", or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">2. Booking and Reservations</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        All bookings are subject to availability and confirmation by GCWT. A booking is confirmed only upon receipt of the required deposit or full payment as specified at the time of booking. We reserve the right to decline any booking at our discretion.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">3. Payments</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Full payment is required at least 15 days prior to the travel date unless otherwise agreed in writing. Prices quoted are in AED or INR as specified and are subject to change without prior notice until a booking is confirmed. All bank charges and transaction fees are the responsibility of the client.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">4. Cancellations and Refunds</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Cancellation requests must be submitted in writing. The following cancellation charges apply:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                        <li>More than 30 days before departure: 10% of total booking value</li>
                        <li>15–30 days before departure: 25% of total booking value</li>
                        <li>7–14 days before departure: 50% of total booking value</li>
                        <li>Less than 7 days before departure: 100% non-refundable</li>
                    </ul>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Refunds (where applicable) will be processed within 10–15 working days of cancellation confirmation.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">5. Travel Documents and Visas</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        It is the client's sole responsibility to ensure they hold valid passports, visas, and any other required travel documents for the duration of the trip. GCWT will assist with visa applications where offered but does not guarantee visa approvals. No refunds will be made for bookings where travel is prevented due to invalid or insufficient documentation.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">6. Travel Insurance</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We strongly recommend that all clients purchase comprehensive travel insurance covering trip cancellation, medical emergencies, baggage loss, and personal liability. GCWT is not liable for any costs arising from the absence of adequate travel insurance.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">7. Liability</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        GCWT acts as an agent for hotels, airlines, transport companies, and other service providers. We are not liable for any injury, damage, loss, delay, or irregularity that may be caused directly or indirectly by any service provider. Our liability is limited to the total amount paid for the booking in question.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">8. Changes to Itinerary</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        GCWT reserves the right to alter, amend, or cancel any itinerary due to unforeseen circumstances such as weather conditions, natural disasters, civil unrest, or supplier issues. We will make every effort to provide an equivalent alternative. No refunds will be issued for itinerary changes beyond our control.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">9. Online Booking Discount</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        The 5–10% discount applicable to first online bookings is valid for new customers only, applies to the base package price, and cannot be combined with any other promotional offer. GCWT reserves the right to modify or withdraw this offer at any time without prior notice.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">10. Privacy</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Personal information collected during the booking process is used solely for the purpose of arranging your travel. We do not sell or share your data with third parties except as required to complete your booking. Please refer to our Privacy Policy for full details.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">11. Governing Law</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        These Terms and Conditions are governed by the laws of the United Arab Emirates and India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Dubai, UAE, or Kannur, Kerala, India, as applicable.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">12. Contact Us</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        For any questions regarding these Terms and Conditions, please contact us:
                    </p>
                    <div className="text-slate-600 text-sm space-y-1">
                        <p><span className="font-bold text-slate-800">Email:</span> booking@globalconnectworldtravel.com</p>
                        <p><span className="font-bold text-slate-800">Phone:</span> +971 58 952 0398 | +91 89210 95973</p>
                        <p><span className="font-bold text-slate-800">Address:</span> No 413, Hamsah A Building, Al Karama, Dubai, UAE</p>
                    </div>
                </section>

                <div className="pt-6 border-t border-slate-100 text-slate-400 text-xs">
                    &copy; 2026 Global Connect World Travel. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
