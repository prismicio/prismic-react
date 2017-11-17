## JavaScript library with static helpers to render React Components with Prismic API V2 BETA

[![npm version](https://badge.fury.io/js/prismic-reactjs.svg)](http://badge.fury.io/js/prismic-reactjs)
[![Build Status](https://api.travis-ci.org/prismicio/prismic-reactjs.png)](https://travis-ci.org/prismicio/prismic-reactjs)

* The [source code](https://github.com/prismicio/prismic-reactjs) is on Github.
* The [Changelog](https://github.com/prismicio/prismic-reactjs/releases) is on Github's releases tab.
* The [API reference](https://prismicio.github.io/prismic-javascript/globals.html) is on Github.

It's meant to work in pair with the prismic-javascript library, a new javascript kit for the prismic API v2 available here:
* [prismic-javascript](https://github.com/prismicio/prismic-javascript) is on Github.

### Installation

#### Prismic Api Endpoint
Your endpoint must contains "v2" at the end, otherwise it means that you're working on the API V1 so this library won't work for you.

```javascript
apiEndpoint: your-repo-name.prismic.io/api/v2
```

#### NPM

```sh
npm install prismic-reactjs --save
```

#### CDN

```
https://unpkg.com/prismic-reactjs
```

(You may need to adapt the version number)

#### Downloadable version

On our release page: [https://github.com/prismicio/prismic-reactjs/releases](https://github.com/prismicio/prismic-reactjs/releases).

The kit is universal, it can be used:

* Server-side with NodeJS
* Client-side as part of your build with Browserify, Webpack
* Client-side with a simple script tag

### Usage

* Import Prismic React or directly the helpers inside
``` javascript
import {Link, RichText, Date} from 'prismic-reactjs';
```

Render a RichText:

 * As React Component
```javascript
  RichText.render(mydoc.data.myrichtext, linkResolver)
```

 * As Text
```javascript
  DOM.RichText.asText(mydoc.data.myrichtext)
```

Get a URL from a Link fragment of any kind

```javascript
//link resolver not required if sure that it's not a document link
Link.url(mydoc.data.mylink, ctx.linkResolver)
```

Convert a Date as string from the API to an ISO Date:

```javascript
Date(mydoc.data.mydate)
```

#### Install the kit locally

Source files are in the `src/` directory. You only need [Node.js and npm](http://www.joyent.com/blog/installing-node-and-npm/)
to work on the codebase.

```
npm install
npm run dev
```

#### Documentation

Please document any new feature or bugfix using the [JSDoc](http://usejsdoc.org/) syntax. You don't need to generate the documentation, we'll do that.

If you feel an existing area of code is lacking documentation, feel free to write it; but please do so on its own branch and pull-request.

If you find existing code that is not optimally documented and wish to make it better, we really appreciate it; but you should document it on its own branch and its own pull request.

### License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013-2017 Prismic.io (http://prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
