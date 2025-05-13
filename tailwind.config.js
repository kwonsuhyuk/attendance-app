/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "point-color": "#FFD369",
        "vacation-color": "#609966",
        "vacation-dark-color": "#325834",
        "dark-bg": "#09090B",
        "dark-card-bg": "#202020",
        "dark-text": "#FFFFFF",
        "dark-border": "#FFFFFF80",
        "dark-border-sub": "#FFFFFF33",
        "dark-nav-text": "#909090",
        "dark-nav-selected": "#FFFFFF",
        "dark-table-header": "#4b5563",
        "white-bg": "#EEEEEE",
        "white-card-bg": "#FFFFFF",
        "white-text": "#000000",
        "white-border": "#00000080",
        "white-border-sub": "#00000033",
        "white-nav-text": "#6F6F6F",
        "white-nav-selected": "#000000",
        "white-hover": "#f3f4f6",
        "white-table-header": "#e5e7eb",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        baseFont: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        underline: {
          from: {
            width: "0%",
          },
          to: {
            width: "100%",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        underline: "underline 0.5s ease-in-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: ["class"],
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
  important: true,
  mode: "jit",
};
