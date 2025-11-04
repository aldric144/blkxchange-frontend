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
  				primary: brandLock.colors['--color-bg-primary'], // White #FFFFFF
  				gold: brandLock.colors['--color-accent-gold'], // Metallic Gold #D4AF37
  				black: brandLock.colors['--color-bg-dark'], // Pure Black #000000
  				hero: brandLock.colors['--color-bg-hero'], // Hero Black #000000
  				charcoal: brandLock.colors['--color-bg-charcoal'], // Charcoal #1A1A1A
  				light: brandLock.colors['--color-text-light'], // White #FFFFFF
  				dark: brandLock.colors['--color-text-dark'], // Black #000000
  				gray: brandLock.colors['--color-text-gray'], // Gray #6B7280
  				
  				cream: brandLock.colors['--color-bg-primary'], // Map cream → white
  				ivory: brandLock.colors['--color-text-light'], // Map ivory → white
  				green: brandLock.colors['--color-accent-emerald'], // Map green → emerald
  				emerald: brandLock.colors['--color-accent-emerald'] // Emerald #00894C
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
  			'emerald-glow': brandLock.effects.emeraldGlow,
  			'emerald-glow-hover': brandLock.effects.emeraldGlowHover,
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
  				'--color-bg-hero': brandLock.colors['--color-bg-hero'],
  				'--color-bg-dark': brandLock.colors['--color-bg-dark'],
  				'--color-bg-charcoal': brandLock.colors['--color-bg-charcoal'],
  				'--color-accent-gold': brandLock.colors['--color-accent-gold'],
  				'--color-accent-emerald': brandLock.colors['--color-accent-emerald'],
  				'--color-emerald-dark': brandLock.colors['--color-emerald-dark'],
  				'--color-text-light': brandLock.colors['--color-text-light'],
  				'--color-text-dark': brandLock.colors['--color-text-dark'],
  				'--color-text-gray': brandLock.colors['--color-text-gray'],
  				'--color-border-gold': brandLock.colors['--color-border-gold'],
  				'--color-border-light': brandLock.colors['--color-border-light'],
  				'--color-hover-gold': brandLock.colors['--color-hover-gold'],
  				'--color-hover-emerald': brandLock.colors['--color-hover-emerald']
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
  			'.bg-emerald-gradient': {
  				'background-image': brandLock.gradients['emerald-gradient']
  			},
  			'.bg-hero-gradient': {
  				'background-image': brandLock.gradients['hero-gradient']
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

