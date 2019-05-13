module.exports = {
    publicPath: '/chess/',
    module: {
		loaders: [
			{ test: /jquery-mousewheel/, loader: "imports?define=>false&this=>window" },
			{ test: /malihu-custom-scrollbar-plugin/, loader: "imports?define=>false&this=>window" }
		]
	}
}