/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arrow: {
          DEFAULT: "#E4002B",
          dark: "#B00021",
        },
        vmware: {
          DEFAULT: "#00A1E0",
          green: "#34B34A",
          blue: "#007B8A",
          slate: "#0F172A",
        },
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
