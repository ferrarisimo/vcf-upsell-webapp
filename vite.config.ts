import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arrow: {
          primary: '#E4002B', // Arrow red
          dark: '#B00021'
        },
        vmw: {
          primary: '#34B34A',
          blue: '#007B8A',
          slate: '#0F172A'
        }
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
