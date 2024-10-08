// // esbuild.config.js
// const esbuild = require("esbuild");
// const { copy } = require('esbuild-plugin-copy');

// const isDev = process.argv.includes("--dev");
// const isProd = process.argv.includes("--prod");

// const config = {
//   entryPoints: ["app/javascript/application.js"],
//   bundle: true,
//   outdir: "app/assets/builds",
//   loader: {
//     '.js': 'jsx',
//     '.css': 'css',
//     '.woff': 'file',
//     '.woff2': 'file',
//     '.ttf': 'file',
//     '.eot': 'file',
//     '.svg': 'file',
//   },
//   // 他の必要な設定を追加
//   plugins: [
//     copy({
//       assets: {
//         from: ['./node_modules/@blocknote/core/src/fonts/**/*'],
//         to: ['./fonts']
//       }
//     })
//   ]
// };

// if (isDev) {
//   esbuild.context(config).then(context => {
//     context.watch();
//   });
// } else {
//   esbuild.build(config).catch(() => process.exit(1));
// }
