// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: path.join(__dirname, "src", "index.js"),
//     output: {
//         path: path.resolve(__dirname, "dist"),
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.?js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader",
//                     options: {
//                         presets: ['@babel/preset-env', '@babel/preset-react']
//                     }
//                 }
//             },
//             {
//                 test: /\.css$/i,
//                 use: ["style-loader", "css-loader"],
//             },
//             {
//                 test: /\.(png|jp(e*)g|svg|gif)$/,
//                 use: ['file-loader'],
//             },
//             {
//                 test: /\.html$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         name: '[name].[ext]'
//                     },
//                 },
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.join(__dirname, "src", "index.html"),
//         }),
//     ],
// };

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
        mode,
        entry: "./src/index.js",
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.jpe?g|png$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        },
                    },
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "[file].map[query]"
            }),
        ]
    }
};