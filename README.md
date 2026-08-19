# www.microfeed.org theme

This standalone microfeed theme repository contains the theme for
[www.microfeed.org](https://www.microfeed.org/), published under the package
identity `local.www-microfeed-org@1.2.4` and maintained by Listen Notes, Inc. Format v2
adds standalone Page and public Search views while preserving the original
feed, item, and RSS presentation.

The Mustache and XSL files are installed directly by microfeed. The theme's
browser code and styles live under `src/` and are compiled by Vite into the
declared `assets/theme.js` and `assets/theme.css` files. The UI source uses
Tailwind CSS and shadcn/ui's Base UI style.

## Develop

Use Node.js 22.12 or newer and Yarn 4:

```console
yarn install
yarn build
yarn check
yarn preview
```

The repository-local `yarn.lock` keeps this directory independent from any
parent workspace. Run `yarn build` after changing files under `src/`, and
commit the regenerated theme assets with the corresponding source changes.

To preview against a public microfeed JSON Feed instead of a bundled fixture:

```console
yarn preview --feed-url https://example.com/json/
```

Read [THEME.md](./THEME.md), `microfeed-theme.json`, and the schemas under
`.microfeed/schemas/` before editing. Establish a clean validation and test
baseline before the first commit. If this directory is not already a Git
repository, initialize it after those checks pass:

```console
git init --initial-branch main
```

Before installing changed content, increment the semantic version in
`microfeed-theme.json`. Install the new version as inactive, preview it, and
activate it only as a separate confirmed action.
