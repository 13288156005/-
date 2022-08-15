const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //配置代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        }
    }
})