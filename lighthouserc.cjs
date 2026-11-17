// Lighthouse CI: mobile, laboratory data from the published .shop only.
module.exports = {
  ci: {
    collect: {
      url: [
        'https://mensagemstudio.shop/',
        'https://mensagemstudio.shop/servicos/',
        'https://mensagemstudio.shop/video-ia/',
        'https://mensagemstudio.shop/landing-pages/'
      ],
      numberOfRuns: 2,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    }
  }
};
