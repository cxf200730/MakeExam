
module.exports = {
    devServer: {
      proxy: {
        "/up": {
          target: "http://localhost:3000/",
          pathRewrite: {
            "^/up": "",
          },
        },
      },
    },
  };