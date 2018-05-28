import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod.js';

console.log('Generating minified bundle for production via Webpack. This will take a moment...');

webpack(webpackConfig).run((err, stats) => {
  if (err) { // fatal error occurred. stop here.
    console.log(`Fatal error: ${err}`);
    return 1;
  }

  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    console.log('Webpack generated the following errors');
    return jsonStats.errors.map(error => console.log(error));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log('Your app has been compiled in production mode and written to ./client/dist.');

  return 0;
});
