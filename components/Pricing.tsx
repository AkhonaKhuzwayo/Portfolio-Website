interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 'R3,500',
    period: 'per project',
    description: 'Perfect for landing pages, portfolios, and small static sites.',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '1 revision round',
      '7-day delivery',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 'R9,500',
    period: 'per project',
    description: 'Ideal for web apps, dashboards, and business websites with dynamic content.',
    features: [
      'Unlimited pages',
      'React / TypeScript frontend',
      'REST API integration',
      'Authentication & user roles',
      '3 revision rounds',
      'Performance optimisation',
      '14-day delivery',
    ],
    cta: 'Most Popular',
    highlighted: true,
    badge: '⭐ Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'let\'s talk',
    description: 'Full-scale products, AI/ML integrations, and long-term contracts.',
    features: [
      'Everything in Professional',
      'Python / AI / NLP features',
      'CI/CD & cloud deployment',
      'Ongoing maintenance plan',
      'Dedicated Slack channel',
      'Priority support',
      'Custom timeline',
    ],
    cta: 'Contact Me',
    highlighted: false,
  },
];

function Pricing() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header reveal">
          <h2>Pricing</h2>
          <p>Transparent rates for every stage of your project</p>
        </div>
        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div
              className={`pricing-card ${index === 0 ? 'reveal-left' : index === 1 ? 'reveal' : 'reveal-right'}${tier.highlighted ? ' pricing-card--featured' : ''}`}
              key={tier.name}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {tier.badge && (
                <span className="pricing-badge">{tier.badge}</span>
              )}
              <div className="pricing-header">
                <h3 className="pricing-name">{tier.name}</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">{tier.price}</span>
                  <span className="pricing-period">/{tier.period}</span>
                </div>
                <p className="pricing-desc">{tier.description}</p>
              </div>
              <ul className="pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <span className="pricing-check" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`btn-pricing${tier.highlighted ? ' btn-pricing--featured' : ''}`}
                onClick={scrollToContact}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="pricing-note reveal">
          All prices are in ZAR. International clients welcome — rates adjusted for USD/EUR.
          <br />Not sure which plan fits? <button className="pricing-link" onClick={scrollToContact}>Let's chat.</button>
        </p>
      </div>
    </section>
  );
}

export default Pricing;
