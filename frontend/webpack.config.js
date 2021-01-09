const path = require('path'); 
module.exports = { 
  entry: './test.js', 
  output: {
    path: path.resolve('dist'), 
    filename: 'main.js' 
  },   
}