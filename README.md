# Shopify Theme Template

A Shopify theme bootstrapped with Liquid and Tailwind CSS.

### Tech Stack

- Shopify (Liquid)
- Tailwind CSS
- PostCSS
- TypeScript / JavaScript
- ESBuild

### Development

Touch `.env` file and set the following variable:

```
SHOPIFY_STORE_URL=otsuka-fineart.myshopify.com
```

To start developing the theme, follow these steps:

```bash
# Run dev server
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
