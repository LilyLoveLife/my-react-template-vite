import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    assetsDir: "static",
  },
  resolve: {
    alias: {
      assets: join(__dirname, "./src/assets"),
      layouts: join(__dirname, "./src/layouts"),
      constant: join(__dirname, "./src/constant"),
      libs: join(__dirname, "./src/libs"),
      imgs: join(__dirname, "./src/imgs"),
      src: join(__dirname, "./src"),
      pages: join(__dirname, "./src/pages"),
      components: join(__dirname, "./src/components"),
      config: join(__dirname, "./src/config"),
      services: join(__dirname, "./src/services"),
      types: join(__dirname, "./src/types"),
      utils: join(__dirname, "./src/utils"),
      context: join(__dirname, "./src/context"),
      hooks: join(__dirname, "./src/hooks"),
      store: join(__dirname, "./src/store"),
    },
  },
  base: "./",
  server: {
    host: "0.0.0.0",
    // port: 8080,
    proxy: {
      "/gateway": {
        target: "https://recruit-dev.hrtps.com", // 接口的域名
        secure: false,
        changeOrigin: true,
        configure(proxy, options) {
          // console.log("configure");
          // console.log(proxy);
          // console.log(options);
        },
        bypass(req, res, options) {
          // console.log("bypass");
          // console.log(req);
          // console.log(res);
          // console.log(options);
        },
        // rewrite: path => path.replace(/^\/demo/, '/demo')
      },
    },
  },
})
