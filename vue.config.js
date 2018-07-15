const webpack = require('webpack');

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
    pages: {
        index: {
            entry: "src/main.ts",
            template: "public/index.html",
            filename: "index.html"
        },
        signin: {
            entry: "src/main.ts",
            template: "public/signin.html",
            filename: "signin.html"
        },
        "post-list": {
            entry: "src/post-list.ts",
            template: "public/post-list.html",
            filename: "post-list.html"
        },
        "post-edit": {
            entry: "src/post-edit.ts",
            template: "public/index.html",
            filename: "post-edit.html"
        }
    },
    chainWebpack: config => {
        config
            .plugin('provide')
            .use(webpack.ProvidePlugin, [{
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }]);
    }
}