const path = require("path");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: "source-map",

    entry: "./frontend/js/phoneBookScript.js",

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [{
            "test": /\.css$/,
            "use": [
                MiniCssExtractPlugin.loader, "css-loader"
            ]
        },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use: "file-loader?name=[path][name].[ext]?[hash]"
            }
        ]
    },
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ]
};