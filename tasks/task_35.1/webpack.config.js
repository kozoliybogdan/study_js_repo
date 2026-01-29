const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',

        entry: path.resolve(__dirname, 'src', 'index.tsx'),

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
            clean: true,
            assetModuleFilename: 'assets/[name].[contenthash][ext]',
            publicPath: '',
        },

        devtool: isProd ? false : 'source-map',

        devServer: {
            static: path.resolve(__dirname, 'dist'),
            hot: true,
            open: true,
            port: 3000,
            liveReload: true,
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },

                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },

                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },

                {
                    test: /\.(sa|sc)ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },

                {
                    test: /\.less$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                },

                {
                    test: /\.(png|jpg|jpeg|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'images/[name].[contenthash][ext]' },
                },

                {
                    test: /\.(woff2?|ttf|otf|eot)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'fonts/[name].[contenthash][ext]' },
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
            }),

            new MiniCssExtractPlugin({
                filename: isProd ? 'css/styles.[contenthash].css' : 'css/styles.css',
            }),

            new ESLintPlugin({
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                failOnError: false,
            }),

            ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
        ],

        optimization: {
            minimizer: ['...', new CssMinimizerPlugin()],
            splitChunks: { chunks: 'all' },
            runtimeChunk: 'single',
        },
    };
};