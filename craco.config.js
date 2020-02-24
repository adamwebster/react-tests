const path = require('path')
// Fix issue with multiple versions for multiple versions of react when linking the FusedComponents project locally
module.exports = {
  webpack: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'styled-components': path.resolve(__dirname, './node_modules/styled-components'),

    },
  },
}