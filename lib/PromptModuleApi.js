module.exports = class PromptModuleAPI {
  constructor(creator) {
    this.creator = creator;
  }

  // 可选的特性
  injectFeature(feature) {
    this.creator.featurePrompt.choices.push(feature);
  }

  // 注入模版类型
  injectPrompt(prompt) {
    this.creator.injectedPrompts.push(prompt);
  }
};
