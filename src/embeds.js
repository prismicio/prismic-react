export function createScript({ property, d, s, src, id, setWindow }) {
  if (!window) {
    return
  }
  const res = (function(d, s, src, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window[property] || {};
    if (d.getElementById(id)) {
      return t;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = src
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(d, s, src, id));

  if (setWindow) {
    window[property] = res;
  }
}

export const embeds = {
  Twitter: {
    property: 'twttr',
    setWindow: true,
    src: 'https://platform.twitter.com/widgets.js',
    id: 'twitter-wjs',
    load: function() {
      if (window && window.twttr) {
        window.twttr.widgets.load();
      }
    }
  },
  Facebook: {
    property: 'FB',
    src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3',
    setWindow: false,
    id: 'fb-wjs',
    load: (ref) => {
      if (window && window.FB) {
         window.FB.XFBML.parse(ref);
      }
    }
  },
  Instagram: {
    property: 'instgrm',
    setWindow: false,
    src: 'https://www.instagram.com/embed.js',
    id: 'insta-wjs',
    load: () => {
      if (window && window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  },
}
