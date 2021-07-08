// 提示语模块
module.exports = class PromptModuleAPI {
  constructor(creator) {
    this.creator = creator;
  }

  // 可选的特性：features 对应的可选项
  injectFeature(feature) {
    this.creator.featurePrompt.choices.push(feature);
  }

  // 注入用户所选的特性：除了 features 其他的属性
  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }
};
