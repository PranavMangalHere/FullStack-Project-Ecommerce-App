/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "scroll-slow": "scroll 30s linear infinite",
        opacity: "opacity 1s ease-in-out",
        trail: "trail 1s ease-in-out",
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
