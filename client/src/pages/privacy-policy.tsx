export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-xl font-bold mb-1">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: March 23, 2026</p>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
        {/* 1. Introduction */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">1. Introduction</h2>
          <p className="leading-relaxed">
            TrueFuel ("we," "us," or "our") is committed to protecting the privacy and security of your personal information.
            This Privacy Policy describes how we collect, use, store, share, and protect the data we obtain through your use
            of our website and services at truefuel.onrender.com (the "Service"), including any integrations with third-party
            platforms such as the Garmin Connect Developer Program APIs.
          </p>
          <p className="leading-relaxed mt-3">
            By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
            If you do not agree, please do not use the Service.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">2. Information We Collect</h2>

          <h3 className="font-medium text-sm text-foreground mt-4 mb-1">2.1 Personal Information</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Account information: name, email address, and shipping address provided during checkout.</li>
            <li>Payment information: processed securely by Stripe — we do not store credit card numbers.</li>
            <li>Order history and transaction details.</li>
          </ul>

          <h3 className="font-medium text-sm text-foreground mt-4 mb-1">2.2 Garmin Connect Data</h3>
          <p className="leading-relaxed">
            With your explicit consent, we may access data from your Garmin Connect account via the
            Garmin Connect Developer Program APIs (including the Training API). This may include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Activity and training data (e.g., workouts, training plans, training status).</li>
            <li>Performance metrics and fitness data.</li>
            <li>Device information associated with your Garmin account.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            Your Garmin data will be transferred to and processed by TrueFuel for the purposes described in Section 3 below.
            For information on how Garmin handles your data, please review the{" "}
            <a href="https://www.garmin.com/privacy/connect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy for Garmin Connect and Compatible Garmin Devices
            </a>.
          </p>

          <h3 className="font-medium text-sm text-foreground mt-4 mb-1">2.3 Usage Data</h3>
          <p className="leading-relaxed">
            We may automatically collect usage data such as your IP address, browser type, pages visited,
            time spent on the Service, and other diagnostic data.
          </p>
        </section>

        {/* 3. How We Use Your Information */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">3. How We Use Your Information</h2>
          <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>To provide and maintain the Service, including processing orders and fulfilling purchases.</li>
            <li>To personalize your experience, including providing tailored nutrition and fueling recommendations based on your Garmin training data.</li>
            <li>To improve the Service through usage analysis and identifying trends.</li>
            <li>To communicate with you about orders, updates, and support.</li>
            <li>To comply with legal obligations and enforce our terms.</li>
          </ul>
        </section>

        {/* 4. Legal Basis for Processing */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">4. Legal Basis for Processing</h2>
          <p className="leading-relaxed">We process personal information based on the following legal grounds:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><span className="text-foreground font-medium">Consent:</span> You explicitly consent to the collection and processing of your Garmin activity data when you connect your Garmin account.</li>
            <li><span className="text-foreground font-medium">Contractual necessity:</span> To fulfill our obligations to provide the Service, including processing and shipping your orders.</li>
            <li><span className="text-foreground font-medium">Legitimate interests:</span> For purposes such as improving the Service and ensuring security, where these interests do not override your rights.</li>
            <li><span className="text-foreground font-medium">Legal obligations:</span> To comply with applicable laws or regulations.</li>
          </ul>
        </section>

        {/* 5. Garmin Data: Consent and Transfer */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">5. Garmin Data: Consent and Transfer</h2>
          <p className="leading-relaxed">
            Before we access any data from your Garmin Connect account, we will:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Provide you with clear notice about what data will be collected, how it will be processed, and for what purpose.</li>
            <li>Obtain your explicit consent before initiating any data transfer.</li>
            <li>Allow you to withdraw your consent at any time (see Section 9).</li>
          </ul>
          <p className="leading-relaxed mt-3">
            Your Garmin data may be transferred to Garmin Connect as part of the integration. By authorizing
            the connection, you acknowledge that your data will be transferred to Garmin in accordance with
            the{" "}
            <a href="https://www.garmin.com/privacy/connect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Garmin Connect Privacy Policy
            </a>.
            You must not upload data to your Garmin Connect account if you are restricted from doing so.
          </p>
        </section>

        {/* 6. AI Transparency Statement */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">6. Artificial Intelligence Transparency Statement</h2>
          <p className="leading-relaxed">
            TrueFuel may use artificial intelligence (AI) systems to process your data for the purpose of providing
            personalized fueling and nutrition recommendations. This section describes how we use AI in connection
            with your data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><span className="text-foreground font-medium">Nature of AI processing:</span> We may use AI-based analysis to interpret your training and activity data to generate personalized carbohydrate fueling recommendations.</li>
            <li><span className="text-foreground font-medium">Purpose:</span> To help you optimize your fueling strategy based on your workout intensity, duration, and training patterns.</li>
            <li><span className="text-foreground font-medium">Consent:</span> We will obtain your explicit consent before processing your data with AI systems. You may withdraw this consent at any time by contacting us (see Section 9).</li>
            <li><span className="text-foreground font-medium">No training on your data:</span> We do not use your personal Garmin data to train AI models unless we obtain separate, explicit consent from you for that specific purpose.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            This AI Transparency Statement will be updated to reflect changes in applicable laws, regulations, or Garmin policies.
          </p>
        </section>

        {/* 7. Data Sharing */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">7. Data Sharing</h2>
          <p className="leading-relaxed">We may share your personal information in the following situations:</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><span className="text-foreground font-medium">With Garmin:</span> To access your activity data via the Garmin Connect APIs, as authorized by you.</li>
            <li><span className="text-foreground font-medium">Service providers:</span> With trusted third-party providers (e.g., Stripe for payment processing, hosting providers) who are contractually obligated to protect your data.</li>
            <li><span className="text-foreground font-medium">Legal requirements:</span> If required by law, regulation, or legal process, we may disclose your information to comply with such obligations.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            We do not sell your personal data, including any data received via the Garmin Connect APIs, without your lawful consent.
          </p>
        </section>

        {/* 8. Data Security */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">8. Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized or unlawful processing and against accidental loss, destruction, or damage. These measures include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Encryption of data in transit using TLS/SSL.</li>
            <li>Secure payment processing through Stripe (PCI-DSS compliant).</li>
            <li>Access controls to restrict data access to authorized personnel only.</li>
            <li>Secure OAuth 2.0 authentication for Garmin API access.</li>
            <li>Regular review of security practices and procedures.</li>
          </ul>
        </section>

        {/* 9. Your Rights */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">9. Your Rights</h2>
          <p className="leading-relaxed">
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><span className="text-foreground font-medium">Access:</span> Request a copy of the personal data we hold about you.</li>
            <li><span className="text-foreground font-medium">Correction:</span> Request correction of inaccurate or incomplete data.</li>
            <li><span className="text-foreground font-medium">Deletion:</span> Request deletion of your data, subject to legal retention requirements.</li>
            <li><span className="text-foreground font-medium">Restriction:</span> Request that we restrict the processing of your data.</li>
            <li><span className="text-foreground font-medium">Portability:</span> Request a copy of your data in a structured, machine-readable format.</li>
            <li><span className="text-foreground font-medium">Objection:</span> Object to certain types of data processing.</li>
            <li><span className="text-foreground font-medium">Withdraw consent:</span> Revoke your consent for data processing at any time. To disconnect your Garmin account or withdraw consent for Garmin data processing, contact us at the email below. Withdrawal of consent may limit your ability to use certain features of the Service.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:mohammadraza.pr@gmail.com" className="text-primary hover:underline">mohammadraza.pr@gmail.com</a>.
            We will respond to your request within the timeframes required by applicable law.
          </p>
        </section>

        {/* 10. Data Retention */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">10. Data Retention</h2>
          <p className="leading-relaxed">
            We retain your personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy,
            or as required by law. Specifically:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Order and transaction data is retained as required for accounting and legal compliance purposes.</li>
            <li>Garmin activity data is retained only for as long as your account is active and you have granted consent. You may request deletion at any time.</li>
            <li>If you delete your account, we will remove your personal information from our systems, except where retention is required for legal or auditing purposes.</li>
          </ul>
        </section>

        {/* 11. Children's Privacy */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">11. Children's Privacy</h2>
          <p className="leading-relaxed">
            The Service is not directed at children under the age of 13 (or 16 in certain jurisdictions).
            We do not knowingly collect personal data from children. If we become aware that we have collected
            personal data from a child without appropriate consent, we will take steps to delete that information.
          </p>
        </section>

        {/* 12. Third-Party Services */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">12. Third-Party Services</h2>
          <p className="leading-relaxed">
            The Service integrates with the Garmin Connect Developer Program APIs, which are subject to
            Garmin's own privacy policy. We encourage you to review the{" "}
            <a href="https://www.garmin.com/privacy/connect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy for Garmin Connect and Compatible Garmin Devices
            </a>{" "}
            to understand how Garmin handles your data. We are not responsible for the privacy practices
            of Garmin or other third-party services.
          </p>
          <p className="leading-relaxed mt-3">
            Payment processing is handled by Stripe. For information on how Stripe processes your data, please review the{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Stripe Privacy Policy
            </a>.
          </p>
        </section>

        {/* 13. Changes */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">13. Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
            legal requirements, or Garmin policies. We will notify you of any material changes by posting the updated
            policy on this page with a revised "Last updated" date. Your continued use of the Service after any changes
            constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        {/* 14. Contact */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-2">14. Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions or concerns about this Privacy Policy, your data, or wish to exercise any of your rights,
            please contact us at:
          </p>
          <div className="mt-3 p-4 bg-muted/50 rounded-md">
            <p className="font-medium text-foreground text-sm">TrueFuel</p>
            <p className="text-sm mt-1">
              Email:{" "}
              <a href="mailto:mohammadraza.pr@gmail.com" className="text-primary hover:underline">mohammadraza.pr@gmail.com</a>
            </p>
            <p className="text-sm mt-1">Website: truefuel.onrender.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
