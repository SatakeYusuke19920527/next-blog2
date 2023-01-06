/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
            animation: {
                "slide-in-bck-center": "slide-in-bck-center 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
            },
            keyframes: {
                "slide-in-bck-center": {
                    "0%": {
                        transform: "translateZ(600px)",
                        opacity: "0"
                    },
                    to: {
                        transform: "translateZ(0)",
                        opacity: "1"
                    }
                }
            }
        }
    },
  plugins: [],
}