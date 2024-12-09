/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.7' },
        }
      },
      animation: {
        "scroll-slow": "scroll 30s linear infinite",
        opacity: "opacity 1s ease-in-out",
        trail: "trail 1s ease-in-out",
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'delay-200': 'fade-in-right 0.8s ease-out 0.2s forwards',
        'delay-400': 'fade-in-right 0.8s ease-out 0.4s forwards',
        'delay-600': 'fade-in-right 0.8s ease-out 0.6s forwards',
        'delay-800': 'fade-in-right 0.8s ease-out 0.8s forwards',
        'delay-1000': 'fade-in-right 0.8s ease-out 1s forwards',
      },
      opacity: {
        "0%": { "border-right": "1px solid transparent" },
        "10%": { "border-right": "1px solid #bd9f67" },
        "80%": { "border-right": "1px solid #bd9f67" },
        "100%": { "border-right": "1px solid transparent" },
      },
      trail: {
        "0%": {
          background:
            "linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%)",
          opacity: "0",
        },
        "30%": {
          background:
            "linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%)",
          opacity: "1",
        },
        "70%": {
          background:
            "linear-gradient(90deg, rgba(189, 159, 103, 0) 70%, rgb(189, 159, 103) 100%)",
          opacity: "1",
        },
        "95%": {
          background:
            "linear-gradient(90deg, rgba(189, 159, 103, 0) 90%, rgb(189, 159, 103) 100%)",
          opacity: "0",
        },
      },
    },
  },
  plugins: [],
};
