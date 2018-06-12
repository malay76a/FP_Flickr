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

const img = url => $('<img />', { src: url });

const url = term =>
  `https://api.flickr.com/services/feeds/photos_public.gne?tags=${term}&format=json&jsoncallback=?`;

const mediaUrl = _.compose(_.prop('m'), _.prop('media'));
const srcs = _.compose(_.map(mediaUrl), _.prop('items'));

const images = _.compose(_.map(img), srcs);
const renderImages = _.compose(Impure.setHtml('body'), images);
const app = _.compose(Impure.getJSON(renderImages), url);

app("cats");