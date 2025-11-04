import brandLock from './BRAND_LOCK.json';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			brand: {
  				primary: brandLock.colors['--color-bg-primary'], // Deep Blue #001F3F
  				gold: brandLock.colors['--color-accent-gold'], // Metallic Gold #D4AF37
  				black: brandLock.colors['--color-bg-dark'], // Pure Black #000000
  				surface: brandLock.colors['--color-surface'], // Dark Surface #0B0B0B
  				light: brandLock.colors['--color-text-light'], // White #FFFFFF
  				charcoal: brandLock.colors['--color-text-dark'], // Charcoal #1A1A1A
  				
  				cream: brandLock.colors['--color-bg-primary'], // Map cream → deep blue
  				ivory: brandLock.colors['--color-text-light'], // Map ivory → white
  				green: brandLock.colors['--color-accent-gold'], // Map green → gold
  				emerald: brandLock.colors['--color-accent-gold'] // Map emerald → gold
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			heading: ['Playfair Display', 'serif'],
  			body: ['Inter', 'sans-serif']
  		},
  		boxShadow: {
  			'gold-glow': brandLock.effects.goldGlow,
  			'gold-glow-hover': brandLock.effects.goldGlowHover,
  			'card': brandLock.effects.cardShadow,
  			'card-hover': brandLock.effects.cardShadowHover
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'gold-underline': {
  				from: {
  					width: '0%'
  				},
  				to: {
  					width: '100%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'gold-underline': 'gold-underline 0.3s ease-out'
  		}
  	}
  },
  plugins: [
  	import("tailwindcss-animate"),
  	function({ addBase }) {
  		addBase({
  			':root': {
  				'--color-bg-primary': brandLock.colors['--color-bg-primary'],
  				'--color-accent-gold': brandLock.colors['--color-accent-gold'],
  				'--color-bg-dark': brandLock.colors['--color-bg-dark'],
  				'--color-text-light': brandLock.colors['--color-text-light'],
  				'--color-surface': brandLock.colors['--color-surface'],
  				'--color-text-dark': brandLock.colors['--color-text-dark'],
  				'--color-border-gold': brandLock.colors['--color-border-gold'],
  				'--color-hover-gold': brandLock.colors['--color-hover-gold']
  			}
  		});
  	},
  	function({ addUtilities }) {
  		addUtilities({
  			'.bg-gold-metallic': {
  				'background-color': brandLock.colors['--color-accent-gold'],
  				'background-image': brandLock.gradients['gold-metallic'],
  				'background-blend-mode': 'overlay'
  			},
  			'.gold-underline-hover': {
  				'position': 'relative',
  				'&::after': {
  					'content': '""',
  					'position': 'absolute',
  					'bottom': '-2px',
  					'left': '0',
  					'width': '0',
  					'height': '2px',
  					'background-color': brandLock.colors['--color-accent-gold'],
  					'transition': 'width 0.3s ease-out'
  				},
  				'&:hover::after': {
  					'width': '100%'
  				}
  			},
  			'.section-divider-gold': {
  				'border-bottom': `1px solid ${brandLock.colors['--color-accent-gold']}`,
  				'padding-bottom': '0.5rem',
  				'margin-bottom': '1.5rem'
  			}
  		});
  	}
  ],
}

