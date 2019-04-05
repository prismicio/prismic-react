# Updating from V0 to V1

If you've been using prismic-reactjs before V1, here is a simple guide to update your code base ✌️

## 1. Replace your calls to render and asText

Our library now exposes a RichText component that you should use in place of your `render` and `asText` calls:

#### Before:
```javascript

import { RichText } from 'prismic-reactjs';

const MyText = (myDoc) => (
    <div>
        <span>{RichText.render(myDoc.data.myTitle)}</span>
        <span>{RichText.asText(myDoc.data.myText)}</span>
    </div>
);
```

#### After:
```javascript

import { RichText } from 'prismic-reactjs';

const MyText = (myDoc) => (
    <div>
        <RichText render={myDoc.data.myTitle} />
        <RichText renderAsText={myDoc.data.myText} />
    </div>
);
```

👆 Please note that `render` was previously wrapping your components with `div`s. We now default to `React.Fragments`. If you actually wanted `div`s in your markup, simply pass a `Component` prop with value `div`.

## 2. Use serializeHyperlink

If you were previously using an `htmlSerializer` to change the behaviour of Links _only_, you can now pass your Link component as a `serializeHyperlink` prop:

#### Before:
```javascript

import { RichText } from 'prismic-reactjs';

const htmlSerializer(type, ...args) {
  switch(type) {
    case 'hyperlink': return myCustomLink(type, ...args)
  }
}

const MyComponent = (myDoc) => (
    <div>
        <span>{RichText.render(myDoc.data.myLink, linkResolver, htmlSerializer)}</span>
    </div>
);
```

#### After:
```javascript
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';

const myCustomLink = (type, element, content, children, index) => (
    <Link to={linkResolver(element)} key={`custom-link-${index + 1}`}>
        {content}
    </Link>
);

const MyContent = (myDoc) => (
    <div>
        <RichText
            render={myDoc.data.myLink}
            serializeHyperLink={myCustomLink}
        />
    </div>
);
```

## 3. Pass htmlSerializer as prop

If you were previously using a custom `htmlSerializer`, simply pass it to your RichText component.

## 4. Change your imports

If you don't want to adopt the component approach _now_, you can alternatively keep using `render` and `asText`. But you will have to change the way you import them:

#### Before:
```javascript
import { RichText } from 'prismic-reactjs';

const title = RichText.render(data.title);
const text = RichText.asText(data.text);
```

#### After:
```javascript
import { render, asText } from 'prismic-reactjs';

const title = render(data.title);
const text = asText(data.text);
```

Questions, remarks? Let us know! 🙌
