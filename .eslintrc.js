module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 规则配置写在这里
    // "off"或者0    //关闭规则关闭
    // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
    // "error"或者2    //把规则作为一个错误（退出代码触发时为1）

    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "camelcase": 0, //强制驼峰法命名 否
    "@typescript-eslint/camelcase": 0,
    "space-before-function-paren": [0, "always"], //函数定义时括号前面是否有空格 否
    "quotes": [0, "single"], //引号类型 不限制/单引号
    "eol-last": 0, //文件以单一的换行符结束 否
    "semi": [0, "always"], //语句强制分号结尾 否
    "eqeqeq": 0, //必须使用全等 否
    "comma-dangle": 0, //对象字面量项尾不能有逗号 没必要
    "spaced-comment": 0, //注释风格要不要有空格什么的
    "import/no-duplicates": [0, {
      "considerQueryString": true
    }],
    "no-trailing-spaces": 0, //一行结束后面不要有空格
    "prefer-const": 0, //首选const
    "no-empty-function": [0], // 禁止空方法 否
    "no-unused-expressions": 0,
    "key-spacing": [0, {
      "beforeColon": false,
      "afterColon": true
    }], //对象字面量中冒号的前后空格
    "indent": [0, 2], //缩进风格
    "dot-notation": [0, {
      "allowKeywords": true
    }], //避免不必要的方括号
    "padded-blocks": 0, //块语句内行首行尾是否要空行
    "@typescript-eslint/no-this-alias": 0, // “ this”意外别名到局部变量
    "no-unused-vars": ["error", { // 未使用的声明 （忽略参数）
      "args": "none"
    }],
    "@typescript-eslint/no-unused-vars": ["error", {
      "args": "none"
    }],
    "no-multiple-empty-lines": [1, {
      "max": 2
    }], //空行最多不能超过2行
    "@typescript-eslint/no-var-requires": 0
  }
}
