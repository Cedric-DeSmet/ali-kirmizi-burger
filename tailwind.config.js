/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ember: '#dc4f2f',
        charcoal: '#171717',
        cream: '#fff7ea',
        basil: '#3f6f4e',
        mustard: '#f4b43a'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 22px 80px rgba(220, 79, 47, 0.22)'
      }
    }
  },
  plugins: []
};
