import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
      include: /\.(mdx|js|jsx|ts|tsx)$/,
    }),
  ],
  // disables commonjs plugin v22 used inside Vite.
  build: {
    commonjsOptions: { include: [] },
  },
  optimizeDeps: {
    disabled: false,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        // target: "https://clickzone.herokuapp.com",
        target: "http://localhost/php/clickzone",
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", function(proxyReq, req, res) {
            console.log("proxyReq: ", {
              host: proxyReq.host,
              path: proxyReq.path,
            });
          });
        },
      },
    },
  },
});
