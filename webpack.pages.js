// One list of pages, used by webpack.dev.config.js and webpack.prod.config.js.
// To add a page: add src/<name>.{html,js,css}, an entry here, a redirect rule
// in netlify.toml, a nav link on every page and a sitemap.xml entry.
module.exports = [
  { chunk: 'index',              template: 'index.html',               script: 'index.js' },
  { chunk: 'about',              template: 'about.html',               script: 'about.js' },
  { chunk: 'eatingDisorders',    template: 'eating-disorders.html',    script: 'eating-disorders.js' },
  { chunk: 'consultations',      template: 'consultations.html',       script: 'consultations.js' },
  { chunk: 'qualifications',     template: 'qualifications.html',      script: 'qualifications.js' },
  { chunk: 'contact',            template: 'contact.html',             script: 'contact.js' },
  { chunk: 'nutritionalTherapy', template: 'nutritional-therapy.html', script: 'nutritional-therapy.js' },
  { chunk: 'podcast',            template: 'podcast.html',             script: 'podcast.js' },
  { chunk: 'notFound',           template: '404.html',                 script: '404.js' },
];
