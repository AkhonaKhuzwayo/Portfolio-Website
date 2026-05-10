'use client';

import { motion } from 'framer-motion';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
  paymentLinkEnvKey?: 'VITE_YOCO_PAYMENT_LINK_STARTER' | 'VITE_YOCO_PAYMENT_LINK_PROFESSIONAL';
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
    cta: 'Pay with Yoco',
    highlighted: false,
    paymentLinkEnvKey: 'VITE_YOCO_PAYMENT_LINK_STARTER',
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
    cta: 'Pay with Yoco',
    highlighted: true,
    badge: '⭐ Most Popular',
    paymentLinkEnvKey: 'VITE_YOCO_PAYMENT_LINK_PROFESSIONAL',
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
  const env = ((import.meta as unknown as Record<string, unknown>)['env'] as Record<string, string | undefined> | undefined) ?? {};

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTierAction = (tier: PricingTier) => {
    const paymentLink = tier.paymentLinkEnvKey ? env[tier.paymentLinkEnvKey] : undefined;

    if (paymentLink) {
      window.open(paymentLink, '_blank', 'noopener,noreferrer');
      return;
    }

    scrollToContact();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
    },
  };

  return (
    <motion.section
      className="pricing"
      id="pricing"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="section-header" variants={headerVariants}>
          <h2>Pricing</h2>
          <p>Transparent rates for every stage of your project</p>
        </motion.div>
        <motion.div
          className="pricing-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {tiers.map((tier) => (
            <motion.div
              className={`pricing-card reveal ${tier.highlighted ? ' pricing-card--featured' : ''}`}
              key={tier.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {tier.badge && (
                <motion.span
                  className="pricing-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {tier.badge}
                </motion.span>
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
                {tier.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  >
                    <span className="pricing-check" aria-hidden="true">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                className={`btn-pricing${tier.highlighted ? ' btn-pricing--featured' : ''}`}
                onClick={() => handleTierAction(tier)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {tier.cta}
              </motion.button>
              {tier.paymentLinkEnvKey && (
                <p className="pricing-gateway-note">Secure checkout via Yoco</p>
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="pricing-note" variants={noteVariants}>
          All prices are in ZAR. International clients welcome — rates adjusted for USD/EUR.
          <br />Starter and Professional can be paid instantly with Yoco.
          <br />Not sure which plan fits? <button className="pricing-link" onClick={scrollToContact}>Let's chat.</button>
        </motion.p>
      </div>
    </motion.section>
  );
}

export default Pricing;
