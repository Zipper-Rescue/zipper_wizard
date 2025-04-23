# Zipper Wizard

## New website

- Staging: https://staging2.zipperrescue.com/
  Admin: https://staging2.zipperrescue.com/wp-admin

## Updating product database

The product data is updated on build from the spreadsheet: [the google sheet](https://docs.google.com/spreadsheets/d/1Qgz4_OpzAwhGpBsJ635ZHsEmbZSqegtHEvKqLHB4Y1s/edit?gid=593122402#gid=593122402)

It can be manually updated with:

```shell
npm run update-product-info
```

## Deployment

Deployed with netlify:

- Config: https://app.netlify.com/sites/cozy-crepe-84d5f1/review
- Deployed: https://cozy-crepe-84d5f1.netlify.app/

## Local Development

Clone the repository and install the dependencies:

```bash
git clone git@github.com:Zipper-Rescue/zipper_wizard.git
cd zipper_wizard
npm install
```

To start the development server:

```bash
npm run dev
```

## Libraries

### Tailwind

Using tailwindcss for styling: https://tailwindcss.com/docs/installation

### Shad-cn

- Using `shad-cn` for ui components:

Installation: https://ui.shadcn.com/docs/installation/vite

Adding components:

```
npx shadcn@latest add button
```

# TODO

## Yona

- [ ] Dead-end step support in wizard data
- [ ] Publish Storybook
- [ ] Set tailwind breakpoints to match Divi

## High-level

- [ ] Integration with shopping cart
