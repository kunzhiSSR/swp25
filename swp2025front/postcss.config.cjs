// postcss.config.js   ✅ 推荐
module.exports = {
  plugins: [
    require('tailwindcss'),   // <== 数组元素
    require('autoprefixer'),
  ],
};
