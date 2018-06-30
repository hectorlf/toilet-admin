module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
    pages: {
        index: "src/main.ts",
        "post-list": "src/post-list.ts",
        "post-edit": "src/post-edit.ts"
    }
}