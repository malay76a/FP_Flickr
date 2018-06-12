import _ from "rambda";
import $ from "jquery";

const trace = _.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const Impure = {
  getJSON: _.curry((callback, url) => {
    $.getJSON(url, callback);
  }),
  setHtml: _.curry((sel, html) => {
    $(sel).html(html);
  })
};

const url = term =>
  `https://api.flickr.com/services/feeds/photos_public.gne?tags=${term}&format=json&jsoncallback=?`;

const app = _.compose(Impure.getJSON(trace("response")), url);

app("cats");
