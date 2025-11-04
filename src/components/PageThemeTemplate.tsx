/**
 * PageThemeTemplate.tsx
 * 
 * Reusable page layout template for Phase 19.6.4: Page-by-Page Alignment Pass
 * Standardizes BlkXchange™ color hierarchy and spacing patterns across all pages
 * 
 * Color Palette (from BRAND_LOCK.json v19.6.3-A):
 * - Deep Black: #000000 (headers, hero sections)
 * - Brand Charcoal: #1A1A1A (dark content sections)
 * - Metallic Gold: #D4AF37 (accents, buttons, borders)
 * - Emerald Green: #00894C (accent banners only, never full backgrounds)
 * - White: #FFFFFF (main content areas)
 */

import React, { ReactNode } from 'react';

interface PageSection {
  id?: string;
  variant: 'hero' | 'dark' | 'light' | 'gold' | 'emerald-gradient';
  children: ReactNode;
  className?: string;
}

interface PageThemeTemplateProps {
  sections: PageSection[];
}

/**
 * Section variant styles following BlkXchange™ color hierarchy
 */
const sectionVariants = {
  hero: 'bg-gradient-to-br from-brand-black to-brand-charcoal text-brand-ivory',
  dark: 'bg-brand-charcoal text-brand-ivory',
  light: 'bg-white text-brand-black',
  gold: 'bg-brand-gold text-brand-black',
  'emerald-gradient': 'bg-emerald-gradient text-brand-light',
};

/**
 * Standard section padding for consistency
 */
const sectionPadding = 'py-16';

/**
 * PageThemeTemplate Component
 * 
 * Usage example:
 * ```tsx
 * <PageThemeTemplate
 *   sections={[
 *     {
 *       variant: 'hero',
 *       children: (
 *         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 *           <h1 className="text-5xl font-heading font-bold text-brand-gold">Page Title</h1>
 *         </div>
 *       )
 *     },
 *     {
 *       variant: 'light',
 *       children: (
 *         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 *           <p>Content goes here</p>
 *         </div>
 *       )
 *     }
 *   ]}
 * />
 * ```
 */
export const PageThemeTemplate: React.FC<PageThemeTemplateProps> = ({ sections }) => {
  return (
    <div className="min-h-screen">
      {sections.map((section, index) => (
        <section
          key={section.id || `section-${index}`}
          id={section.id}
          className={`${sectionPadding} ${sectionVariants[section.variant]} ${section.className || ''}`}
        >
          {section.children}
        </section>
      ))}
    </div>
  );
};

/**
 * Pre-built section components for common patterns
 */

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  actions,
}) => {
  return (
    <section className="bg-gradient-to-br from-brand-black to-brand-charcoal text-brand-ivory py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-400">
              {description}
            </p>
          )}
          {actions && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface ContentSectionProps {
  variant?: 'light' | 'dark' | 'gold' | 'emerald-gradient';
  title?: string;
  titleClassName?: string;
  children: ReactNode;
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  variant = 'light',
  title,
  titleClassName,
  children,
  className,
}) => {
  return (
    <section className={`py-16 ${sectionVariants[variant]} ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className={`text-4xl font-heading font-bold text-center mb-12 ${titleClassName || ''}`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

/**
 * Standard container for consistent max-width and padding
 */
export const PageContainer: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ''}`}>
      {children}
    </div>
  );
};

/**
 * Gold divider line for section separation
 */
export const GoldDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-full h-px bg-brand-gold opacity-30 ${className || ''}`} />
  );
};

/**
 * Standard card component with gold border and hover effects
 */
interface CardProps {
  variant?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'light',
  children,
  className,
  onClick,
}) => {
  const baseStyles = 'rounded-lg shadow-md overflow-hidden transition-all duration-300';
  const variantStyles = {
    light: 'bg-white border border-gray-200 hover:border-brand-gold hover:shadow-xl',
    dark: 'bg-brand-charcoal border border-brand-gold hover:shadow-gold-glow',
  };
  const interactiveStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default PageThemeTemplate;
