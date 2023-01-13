# steps needed to setup react

### 1. pre setup

---

`npm init`

`npm install --save-dev --save-exact prettier`

**.prettierrc.json**

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

**.prettierignore**

```bash
build
coverage
```

`npx prettier --check`
`npx prettier --write`

### 2. Install and setup webpack

---

`npm install --save-dev webpack webpack-cli webpack-dev-server`

**webpack.config.js**

```javascript
const path = require('path');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = {
  entry: `${APP_PATH}/index.js`,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_PATH,
    },
  },
};
```

**update `package.json`**

```json
"scripts": {
  "dev": "webpack server --mode=development",
  "build": "webpack --mode=production --progress",
  "prettier:format": "prettier --write"
},
```

### 3. Install and setup Babel

---

`npm install --save-dev @babel/core @babel/preset-env babel-loader`

`npm install --save core-js`

**babel.config.json**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

more in `useBuiltIns` and `corejs` [here](https://babeljs.io/docs/en/babel-preset-env#usebuiltins)

**update webpack.config.js**

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = {
  // ...rest
  module: {
    rules: [
      {
        test: /\.(js|ts)?x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

### 4. Add css support

---

`npm install --save-dev style-loader css-loader`

**update webpack.config.js**

```js
// ... other config
{
  test: /\.(js|ts)x?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
},
{
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
},
// ...other config
```

### 5. Add React

---

`npm install react react-dom`

`npm install --save-dev @babel/preset-react`

**update `babel.config.json`**

```json
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

**update `webpack.config.js`**

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = {
  // ...rest
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
};
```

**create index.jsx, index.html, RootApp.jsx at `src/`**

index.jsx

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

import RootApp from './root-app/RootApp';

const root = createRoot(document.getElementById('root'));
root.render(<RootApp />);
```

create index.html with `div#root` at `src/index.html` so that our bundle can be loaded from browser

create src/root-app/RootApp.jsx

```jsx
import React from 'react';

export default function RootApp() {
  return <h2>Root App</h2>;
}
```

update entries in webpack.config.js from index.js to index.jsx

**Create HTML file from webpack**

`npm install --save-dev html-webpack-plugin`

**update webpack.config.js (final)**

```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = (env) => ({
  entry: `${APP_PATH}/index.tsx`,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_PATH,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html'),
    }),
    new webpack.DefinePlugin({
      TARGET_ENV: JSON.stringify(env.TARGET),
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
});
```

### 6. Add typescript

---

`npm install --save-dev @babel/preset-typescript @types/react @types/react-dom typescript`

**update babel.config.json**

```json
{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

rename `index.jsx` and `RootApp.js` to `.tsx` and update entry of `webpack.config.js` accrodingly

**create .browserslistrc**

```bash
> 0.2% and not dead
```

### 7. Environment variables

---

update scripts under package.json

```json
"scripts": {
  "dev:live": "webpack server --mode=development --env TARGET=development",
  "build": "webpack --mode=production --progress",
  "build:production": "webpack --mode=production --progress --env TARGET=production"
}
```

**DefinePlugin**

`webpack.config.js`

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = (env) => ({
  entry: `${APP_PATH}/index.tsx`,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_PATH,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html'),
    }),
    new webpack.DefinePlugin({
      TARGET_ENV: JSON.stringify(env.TARGET),
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
});
```

**create global.d.ts**

```ts
declare const TARGET_ENV: 'development' | 'production';
```

### 8. setup eslint

---
