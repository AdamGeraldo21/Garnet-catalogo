/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ganet: {
          // Versiones suavizadas de la paleta del manual (menos saturadas y fondos menos oscuros).
          ink: '#1A3552',
          night: '#203E5D',
          deep: '#274968',
          blue: '#2F8FDB',
          sky: '#4AB4E6',
          cyan: '#5CD3E6',
          lime: '#8DBB57',
          green: '#43884A',
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
        pagina: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        kenburns: {
          from: { transform: 'scale(1.02) translate(0, 0)' },
          to: { transform: 'scale(1.14) translate(-1.5%, -1%)' },
        },
        progreso: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        barra: {
          '0%': { transform: 'scaleY(.25)' },
          '50%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(.6)' },
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
        pagina: 'pagina .45s ease-out both',
        kenburns: 'kenburns 9s ease-out both',
        progreso: 'progreso linear both',
        barra: 'barra 2.4s ease-in-out infinite alternate',
        'float-lento': 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
