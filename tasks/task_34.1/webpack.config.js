const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
            assetModuleFilename: 'assets/[name].[contenthash][ext]',
            publicPath: '',
        },


        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },

        devtool: isProd ? false : 'source-map',

        devServer: {
            static: path.resolve(__dirname, 'dist'),
            port: 3000,
            hot: true,
            open: true,
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },

                {
                    test: /\.(png|jpe?g|gif|webp|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[contenthash][ext]',
                    },
                },

                {
                    test: /\.(woff2?|ttf|otf|eot)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[contenthash][ext]',
                    },
                },
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            }),

            ...(isProd
                ? [
                    new MiniCssExtractPlugin({
                        filename: 'css/styles.[contenthash].css',
                    }),
                ]
                : []),
        ],

        optimization: {
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                name: 'vendors',
            },
            runtimeChunk: 'single',
        },
    };
};