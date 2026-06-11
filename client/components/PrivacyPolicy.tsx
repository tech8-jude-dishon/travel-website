import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Hero Banner */}
            <div className="bg-[#00A9D7] py-16 px-6 text-center">
                <span className="inline-block text-white/70 text-sm font-black uppercase tracking-widest mb-3">
                    Legal
                </span>
                <h1 className="text-4xl md:text-[52px] font-black text-white leading-tight">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
                    Your privacy matters to us. Learn how we collect, use, and protect your information.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

                <p className="text-slate-500 text-sm">Last updated: March 2026</p>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">1. Introduction</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Global Connect World Travel ("GCWT", "we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data when you use our website or services.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">2. Information We Collect</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We may collect the following types of personal information:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                        <li><span className="font-semibold text-slate-700">Identity data:</span> Full name, date of birth, nationality, passport details</li>
                        <li><span className="font-semibold text-slate-700">Contact data:</span> Email address, phone number, postal address</li>
                        <li><span className="font-semibold text-slate-700">Booking data:</span> Travel preferences, itinerary details, payment information</li>
                        <li><span className="font-semibold text-slate-700">Technical data:</span> IP address, browser type, pages visited, cookies</li>
                        <li><span className="font-semibold text-slate-700">Communication data:</span> Messages, enquiries, and feedback you send us</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">3. How We Use Your Information</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We use your personal information for the following purposes:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                        <li>To process and manage your travel bookings</li>
                        <li>To communicate booking confirmations, updates, and reminders</li>
                        <li>To process payments and prevent fraud</li>
                        <li>To respond to your enquiries and provide customer support</li>
                        <li>To comply with legal and regulatory obligations</li>
                        <li>To send promotional offers and travel inspiration (only with your consent)</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">4. Sharing Your Information</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We do not sell your personal data. We may share it with trusted third parties only as necessary to fulfil your booking, including:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                        <li>Airlines, hotels, and ground transport providers</li>
                        <li>Visa processing agencies</li>
                        <li>Payment processing partners</li>
                        <li>Government authorities where required by law</li>
                    </ul>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        All third parties are required to handle your data in accordance with applicable data protection laws.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">5. Cookies</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Our website uses cookies to improve your browsing experience and analyse site traffic. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">6. Data Retention</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Booking records are typically retained for 7 years in accordance with financial regulations. You may request deletion of your data at any time, subject to legal retention requirements.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">7. Data Security</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Payment information is processed through secure, encrypted channels and is never stored on our servers.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">8. Your Rights</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Depending on your location, you may have the following rights regarding your personal data:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 pl-2">
                        <li><span className="font-semibold text-slate-700">Access:</span> Request a copy of the data we hold about you</li>
                        <li><span className="font-semibold text-slate-700">Correction:</span> Request correction of inaccurate data</li>
                        <li><span className="font-semibold text-slate-700">Deletion:</span> Request erasure of your data where applicable</li>
                        <li><span className="font-semibold text-slate-700">Objection:</span> Object to processing for direct marketing purposes</li>
                        <li><span className="font-semibold text-slate-700">Portability:</span> Request transfer of your data in a machine-readable format</li>
                    </ul>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        To exercise any of these rights, please contact us using the details below.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">9. Third-Party Links</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">10. Children's Privacy</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Our services are not directed to children under 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected such data, please contact us immediately for deletion.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">11. Changes to This Policy</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after changes are posted constitutes your acceptance of the revised policy.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-black text-slate-900">12. Contact Us</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        For any questions or concerns about this Privacy Policy, or to exercise your data rights, please contact us:
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

export default PrivacyPolicy;
