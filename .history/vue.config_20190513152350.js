module.exports = {
    publicPath: '/chess/',
    configureWebpack:{
        module: {
            loaders: [
                { test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window" },
                { test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window" }
            ]
        }
    }
}