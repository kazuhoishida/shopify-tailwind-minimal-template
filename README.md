# Shopify Theme Template

A Shopify theme bootstrapped with Liquid and Tailwind CSS.

### Tech Stack

- Tailwind CSS
- PostCSS
- TypeScript / JavaScript
- ESBuild

### Development

To start developing the theme, follow these steps:

```bash
# First time setup
shopify theme develop --store=my-liquid-tailwind-template.myshopify.com
yarn start

# For subsequent runs
yarn start

# To logout of the Shopify store
yarn theme:logout

# Check for Liquid errors
yarn theme:check

# Format code with Prettier
yarn format

# Run ESLint
yarn lint

# Fix ESLint errors
yarn lint:fix

# Open the Shopify cheat sheet page in your browser
yarn cheat
```

### Production Build

To create a production-ready build, run:

```bash
yarn build
```

### Note

Building a Tailwind CSS file may take longer than a minute, so please be patient.
