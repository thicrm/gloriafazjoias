import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Old Baskerville', 'serif'],
        'body': ['Amasis MT Pro Light', 'serif'],
      },
      colors: {
        'refined': {
          'gold': '#D4AF37',
          'cream': '#F5F5DC',
          'charcoal': '#2C2C2C',
          'ivory': '#FFFEF7',
          'royal-blue': '#1E3A8A',
        }
      },
    },
  },
  plugins: [],
}
export default config

