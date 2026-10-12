/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ganet: {
          ink: '#05111D',
          night: '#0a1a2b',
          deep: '#0e2236',
          blue: '#039EFF',
          sky: '#22BDFA',
          cyan: '#03E9FF',
          lime: '#7BB331',
          green: '#308527',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Poppins', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.08)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        orbit: 'orbit 40s linear infinite',
        'orbit-rev': 'orbit 40s linear infinite reverse',
        'fade-up': 'fadeUp .6s ease-out both',
        glow: 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
