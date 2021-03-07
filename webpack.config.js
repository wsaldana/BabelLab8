const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist1'),
        filename: "main.bundle.js",
    },
    module: {
        rules: [
                    {
                        test: /\.css$/i, 
                        use: ["style-loader", "css-loader"]
                    },
                    
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader",
                        ],
                    },

                    {
                        test: /\.m?js$/,
                        loader: "babel-loader",
                        exclude: /(node_modules|bower_components)/
                    }
                ],
    }
}
