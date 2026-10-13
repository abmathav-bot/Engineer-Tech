const Section = ({ title, children }) => (
  <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
    <h2 className="headline text-[clamp(1.8rem,3vw,2.7rem)]">{title}</h2>
    <div className="mt-4 max-w-[76ch] space-y-4 text-ink2">{children}</div>
  </section>
)

const Item = ({ title, children }) => (
  <div>
    <h3 className="font-semibold text-ink">{title}</h3>
    <div className="mt-1.5 space-y-3">{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <main id="top" className="px-5 pb-24 pt-16 md:px-6 md:pb-32 md:pt-24">
      <article className="mx-auto max-w-[1100px]">
        <p className="tag">Engineer Tech</p>
        <h1 className="headline mt-4 text-[clamp(3.2rem,8vw,6.5rem)]">Privacy Policy</h1>
        <p className="mt-7 max-w-[76ch] text-lg text-ink2">
          Welcome to Engineer Tech. We respect your privacy and are committed to protecting the information you share with us. This page outlines our privacy practices regarding your data, as well as the intellectual property rights governing our products, services, courses, and workshops.
        </p>

        <div className="mt-16">
          <Section title="Privacy Policy">
            <Item title="1. Information We Collect">
              <p>We collect information to provide and improve our services to you. This includes:</p>
              <p><strong className="text-ink">Information You Provide Voluntarily:</strong> When you engage with us—such as enrolling in a course or workshop, purchasing our products, or contacting us for support—we collect the details you provide, including your name, email address, billing details, and any other information necessary to deliver the service.</p>
            </Item>
            <Item title="2. How We Use Your Information">
              <p>The details you provide are used strictly to fulfill our commitments to you. We use your data to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Deliver the products, services, courses, or workshops you registered for.</li>
                <li>Process payments and provide transactional receipts.</li>
                <li>Communicate important updates regarding your enrolled courses or requested services.</li>
                <li>Provide customer support and respond to your direct inquiries.</li>
                <li>Maintain the security and infrastructure of our website.</li>
              </ul>
            </Item>
            <Item title={'3. The “No Sell” Guarantee'}>
              <p>We will never sell, rent, lease, or trade your personal data to third parties. The information you entrust to us is used exclusively for internal purposes to provide you with the best possible educational or technical experience.</p>
            </Item>
            <Item title="4. Essential Third-Party Providers">
              <p>To operate our business effectively, we use secure, trusted third-party platforms (such as Render for hosting, payment gateways, or course hosting platforms). We only share the absolute minimum data required with these services to process your transactions or keep the website running securely. These providers are prohibited from using your data for their own marketing purposes.</p>
            </Item>
            <Item title="5. Data Protection and Security">
              <p>We take the protection of your personal information seriously. Client details are safeguarded using industry-standard security measures to prevent unauthorized access, disclosure, alteration, or destruction. However, please note that no electronic storage or transmission over the internet is 100% secure.</p>
            </Item>
          </Section>

          <Section title="Intellectual Property Rights (IPR) & Copyright">
            <Item title="1. Ownership of Content">
              <p>All products, services, course materials, workshop content, software code, written guides, and related intellectual property provided by Engineer Tech are officially registered and protected by copyright, trademark, and applicable intellectual property laws.</p>
            </Item>
            <Item title="2. License and Authorized Use">
              <p>When you purchase or access our products, courses, or services, you are granted a limited, personal, non-exclusive license for your own educational or authorized use only. You may not copy, reproduce, distribute, resell, modify, or create derivative works from any of our materials without our explicit, prior written permission.</p>
            </Item>
            <Item title="3. Strict Legal Enforcement">
              <p>We actively monitor the use and distribution of our intellectual property across the web. Any unauthorized use, piracy, theft, or infringement of our products and services by any individual, organization, or entity is strictly prohibited.</p>
              <p>If our intellectual property or course materials are used, hosted, or distributed without our explicit permission, we will take immediate and severe legal action against the offending parties. This includes, but is not limited to, civil lawsuits for financial damages, immediate takedown notices, injunctions, and prosecution under applicable international and domestic laws.</p>
            </Item>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy, how we handle your data, or requests regarding licensing and our intellectual property, please contact us at:</p>
            <p><a className="text-olive underline underline-offset-4" href="mailto:engineertecher@gmail.com">Email: engineertecher@gmail.com</a><br /><a className="text-olive underline underline-offset-4" href="tel:+916383314975">Phone: +91 6383314975</a></p>
          </Section>
        </div>
      </article>
    </main>
  )
}
