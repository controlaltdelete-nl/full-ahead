# Tailwind in an existing Magento 2 store

While Hyva is great, not everyone can use it for different reasons. This module is an experiment to see if I could integrate Tailwind into an existing Magento site. It can be helpful if you want to move your site to Hyva but want a transitioning phase.

## How does this work?

On a high level: The tailwind.css file contains the default Tailwind handlers. The npm script compiles this and places the result directly in your theme's `pub/static` folder.

## Installation

This code is meant to be added to your installation, so I didn't add a Composer file. You can copy it in the `app/code/ControlAltDelete/FullAhead` folder. After this, check the paths in the `tailwind.config.js` file and alter them to your needs. The fewer paths it tries to read, the better.

After copying the code, go into the folder and run `npm install` or `yarn install`. Please don't commit the `node_modules` folder. Committing `package-lock.json` or `yarn.lock` file is recommended.

## Compiling the CSS

Now that everything is installed, run one of the following commands **from within the `app/code/ControlAltDelete/FullAhead` folder**:

- `npm run dev` (Compile for development)
- `npm run watch` (Compile for development and watch for changes, fastest way to develop)
- `npm run production` (Compile for production, minifies)

## Adding this to your deployment pipeline

**(Warning: These steps are hypothetical and untested)**

Run these steps *after* the `setup:static-content:deploy` step.
```
cd app/code/ControlAltDelete/FullAhead && \
npm ci # (Or yarn install --frozen-lockfile) && \
npm run production
```

## Questions

### Does this make my site faster?

Probably not. It adds CSS, so most likely, it becomes a bit slower. If you move enough elements from the default Magento

### Does this improve development speed?

It depends on which developer you ask and if they like Tailwind, but if you ask me: Yes.

### Can I use Tailwind UI components?

Yes!

### Is this production-ready?

It is not tested on production. But it only adds CSS, it doesn't remove or alter existing code, so it's relatively safe to try this out.

### Does this work with Snowdogs frontools?

This works standalone. It is untested but I assume it does.

## Know limitations

- Does not work with content that is generated in the backend (CMS blocks/pages, products, etc.).
- This code is experimental. You may fail on things that are unforeseen. Please feel free to fix and PR them. 
