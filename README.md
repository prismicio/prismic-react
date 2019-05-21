![alt text](https://prismic.io/...1b58998/images/logo-dark.svg)

[![npm version](https://badge.fury.io/js/prismic-reactjs.svg)](http://badge.fury.io/js/prismic-reactjs)
[![Build Status](https://api.travis-ci.org/prismicio/prismic-reactjs.png)](https://travis-ci.org/prismicio/prismic-reactjs)

# Prismic Rich (💰) Text, but for React
### A simple utility to render Rich Text with Prismic API V2

Prismic provides content writers with a WYSIWYG editor. It's awesome for formatting text but harder to deal with on client side. Fortunately, Prismic React provides utilities to tackle this exact issue!

Based on [prismic-richtext](https://github.com/prismicio/prismic-richtext), it allows you to render Prismic generated Rich Text as React components. It's meant to work in pair with the prismic-javascript library, a new javascript kit for the prismic API v2 [available here](https://github.com/prismicio/prismic-javascript).

* The [source code](https://github.com/prismicio/prismic-reactjs) is on Github.
* The [Changelog](https://github.com/prismicio/prismic-reactjs/releases) is on Github's releases tab.
* The [API reference](https://prismicio.github.io/prismic-javascript/globals.html) is on Github.


## Installation

#### Prismic Api Endpoint
First and foremost, make sure you're using the V2 API.
Your `prismic-configuration.js` (or equivalent) should probably contain a line like this one (or equivalent) 👇

```javascript
apiEndpoint: your-repo-name.prismic.io/api/v2
```

#### NPM
👇 Prismic React is on npm...
```sh
npm install prismic-reactjs --save
```

#### CDN
... and on CDN!
```
https://unpkg.com/prismic-reactjs
```

(You may need to adapt the version number)

#### Downloadable version

You'll find downloadable versions on our release page: [https://github.com/prismicio/prismic-reactjs/releases](https://github.com/prismicio/prismic-reactjs/releases).

The kit is universal, it can be used:

* Server-side with NodeJS
* Client-side as part of your build with Browserify, Parcel, webpack...
* Client-side with a simple script tag

# Usage

Prismic React exposes 3 utilities.
Import them in your project this way:


``` javascript
import {Date, Link, RichText} from 'prismic-reactjs';
```

## Date utility

Like `Link`, `Date` is directly imported from [prismic-helpers](https://github.com/prismicio/prismic-helpers). It converts a Date string received from the API, to an ISO (8601) Javascript Date (ie. something you're used to work with):
```javascript
Date(mydoc.data.mydate)
```

## Link utility

`Link` generates links to documents within your website (and outside).
Give it a Link fragment and you'll get a full fledged url:
```javascript
Link.url(mydoc.data.mylink, ctx.linkResolver)
```
👆Note that `linkResolver` argument is not required if you are 100% sure that your're not linking to a document !

## RichText Component

RichText is a simple React component used to _render_ or _renderAsText_ a Rich Text.
If you've been used to work with `RichText.render`, you're pretty much good to go!

#### Basic example

This is the most basic way to make it work, where `myDoc.data.title` is (obviously) a Rich Text object.
`linkResolver` will be triggered everytime RichText meets a link and wants to correctly resolve it.
```javascript
  import { RichText } from 'prismic-reactjs';

  // Use linkResolver if you *actually* have links
  const linkResolver = (doc) => {
    switch (doc.type) {
        case ('homepage'): return '/'
    }
  }

  const Header = (myDoc) => (
    <header>
        <RichText
            render={myDoc.data.title}
            linkResolver={linkResolver}
        />
    </header>
  );
  export default Header;
```

#### Rendering as text

Some time to time, you don't want to render a component, but simply some good old text:
```javascript
  const Title = (myDoc) => (
    <h1>
        <RichText renderAsText={myDoc.data.title} />
    </h1>
  )
```

#### Creating a custom Link
Under the hood, [prismic-richtext](https://github.com/prismicio/prismic-richtext) takes your rich text data and _serializes_ it. Based on your data type (ie. heading, paragraph, list, link...), it creates an HTML template and renders it as a React component. Most of the time, it's enough: a list will always be a list. But if you work with React, you'll probably want to render Prismic links as React router dom `Link` instead of `<a>` tags. We created a property called `serializeHyperlink`, just for that:

```javascript
const myCustomLink = (type, element, content, children, index) => (
  <Link key={element.data.id} to={linkResolver(element.data)}>
    <a>{content}</a>
  </Link>
);
  const MyComponent = (myDoc) => (
    <h1>
        <RichText
            renderAsText={myDoc.data.textWithLinks}
            serializeHyperlink={myCustomLink}
        />
    </h1>
```

#### Passing your own serializer
If `serializeHyperlink` is not enough, you can alternatively pass an `htmlSerializer` function.
Full example and all accessible elements can be found [here](https://prismic.io/docs/javascript/beyond-the-api/html-serializer). If you need examples or help on this, feel free to open an issue!


#### Wrapping your rich text in a React component
Out of the box, RichText wraps your content in a `React.fragment`. But you can pass an optional Component property to RichText component. Re-writing our first example, we could simply pass `header` to Component:
```javascript
  const Header = (myDoc) => <RichText render={myDoc.data.title} Component="header" />
```

## Deprecation
In earlier versions of Prismic React, rich text rendering was deferred to 2 methods called `render` and `asText`.
Although these methods are still accessible, they don't seem to offer any advantage over a React component. If you disagree, please let me know!

#### example use

```javascript

import { RichText } from 'prismic-reactjs';

const Header = (myDoc) => (
    <header>
        {RichText.render(myDoc.data.title)}
        <span>{RichText.asText(myDoc.data.subTitle)}</span>
    </header>
);
```
👆 Please note that these methods are now static properties of `RichText` component.


## Install the kit locally

Source files are in the `src/` directory. You only need [Node.js and npm](http://www.joyent.com/blog/installing-node-and-npm/) to work on the codebase.

```
npm install
npm run dev
```

### License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013-2019 Prismic.io (http://prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
