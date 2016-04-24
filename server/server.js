// Development Server
// ==================
//
// This file defines how the development server works.
//
// Import Modules
// --------------
//
// ### Node.js Modules

import path from 'path';

// ### NPM Modules

import Express from 'express';
import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// ### Local Modules

import WEBPACK_CONFIG from 'configs/webpack';

// Define Values
// -------------

const app = Express();
const compiler = Webpack(WEBPACK_CONFIG);
const PORT = 5566;

// Configure Express Middleware
// ----------------------------
//
// ### Webpack Dev Middleware
//
// Serves the files emitted from Webpack over Express.

app.use(WebpackDevMiddleware(compiler));

// ### Webpack Hot Middleware
//
// Enable [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html).

app.use(WebpackHotMiddleware(compiler));

// Configure Routing
// -----------------

app.get('*', (request, response, next) =>
  response.sendFile(path.join(global.__projectRoot, 'source/index.html'))
);

// Listen for Connection
// ---------------------

app.listen(PORT, 'localhost', error =>
  console.log(error || `Listening at http://localhost:${PORT}`)
);
