/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './src/scripts/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['"Anton"', '"Oswald"', '"Impact"', 'sans-serif'],
      condensed: ['"Oswald"', '"Inter"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          secondary: '#141414',
          tertiary: '#1C1C1C',
          carbon: '#0F0F0F',
        },
        border: {
          subtle: '#2A2A2A',
          strong: '#3A3A3A',
          titan: '#4A4842',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A8A8A8',
          muted: '#6B6B6B',
        },
        titan: {
          DEFAULT: '#B8B5A8',
          dark: '#8A8680',
          light: '#D4D1C7',
        },
        burnt: {
          DEFAULT: '#C87533',
          hover: '#A85E24',
          glow: 'rgba(200, 117, 51, 0.18)',
        },
        cta: {
          DEFAULT: '#C8102E',
          hover: '#9E0C22',
          glow: 'rgba(200, 16, 46, 0.22)',
        },
        success: '#4ADE80',
        error: '#EF4444',
      },
      fontSize: {
        'display-mega': ['clamp(4.5rem,9vw,10rem)', { lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-hero': ['clamp(3.5rem,6vw,7rem)', { lineHeight: '0.95', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-section': ['clamp(2.75rem,5vw,5rem)', { lineHeight: '0.98', letterSpacing: '-0.01em', fontWeight: '400' }],
        'display-card': ['clamp(1.75rem,2.5vw,2.25rem)', { lineHeight: '1.05', letterSpacing: '0', fontWeight: '400' }],
        'body-lg': ['19px', { lineHeight: '30px' }],
        'body': ['16px', { lineHeight: '26px' }],
        'caption': ['11px', { lineHeight: '16px', letterSpacing: '0.18em', fontWeight: '600' }],
        'micro': ['10px', { lineHeight: '14px', letterSpacing: '0.2em', fontWeight: '500' }],
      },
      maxWidth: {
        'container': '1440px',
      },
      spacing: {
        'section': '140px',
        'section-mobile': '88px',
        'card-inner': '32px',
        'card-inner-lg': '48px',
      },
      gap: {
        'grid': '24px',
      },
      backgroundImage: {
        'gradient-burnt': 'linear-gradient(135deg, #C87533 0%, #6B3816 100%)',
        'gradient-cta': 'linear-gradient(180deg, #C8102E 0%, #8A0B20 100%)',
        'carbon-weave': 'repeating-linear-gradient(45deg, #0F0F0F 0 2px, #141414 2px 4px)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'stripe-slide': 'stripe-slide 18s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'stripe-slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-40px)' },
        },
      },
    },
  },
  plugins: [],
};
