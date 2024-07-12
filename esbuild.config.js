const esbuild = require('esbuild');
const path = require('path');

const config = {
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  loader: {
    '.woff': 'file',
    '.woff2': 'file',
  },
  publicPath: '/assets',
  assetNames: '[name]-[hash].digested',
  plugins: [
    {
      name: 'font-loader',
      setup(build) {
        build.onResolve({ filter: /\.(woff|woff2)$/ }, args => {
          return {
            path: path.join(args.resolveDir, args.path),
            namespace: 'font-loader',
          }
        })
        build.onLoad({ filter: /\.(woff|woff2)$/, namespace: 'font-loader' }, async (args) => {
          return {
            contents: await require('fs').promises.readFile(args.path),
            loader: 'file',
          }
        })
      },
    },
  ],
};

if (process.argv.includes('--watch')) {
  esbuild.context(config).then(context => {
    context.watch();
  });
} else {
  esbuild.build(config).catch(() => process.exit(1));
}