/**
 * 生成交互提示：
 * 注入提示
 */
const { defaults, loadOptions } = require('./utils/options');
const isManualMode = answers => answers.preset === '__manual__'; // 是否为「手动」

class Creator {
  constructor() {
    this.injectedPrompts = [];
    const { presetPrompt, featurePrompt } = this.getDefaultPrompts();
    this.featurePrompt = featurePrompt;
    this.presetPrompt = presetPrompt;
  }

  getFinalPrompts() {
    this.injectedPrompts.forEach(prompt => {
      const originalWhen = prompt.when || (() => true); // 赋值 when 属性，并执行得到结果
      prompt.when = answers => isManualMode(answers) && originalWhen(answers);
    });

    const prompts = [
      this.presetPrompt,
      this.featurePrompt,
      ...this.injectedPrompts,
      ...this.getOtherPrompts(),
    ];

    return prompts;
  }

  getOtherPrompts() {
    const otherPrompts = [
      {
        name: 'save',
        when: isManualMode,
        type: 'confirm',
        message: 'Save this as a preset for future projects?',
        default: false,
      },
      {
        name: 'saveName',
        when: answers => answers.save,
        type: 'input',
        message: 'Save preset as:',
      },
    ];

    return otherPrompts;
  }

  getPresets() {
    const savedOptions = loadOptions();
    return { ...savedOptions.presets, ...defaults.presets };
  }

  getDefaultPrompts() {
    const presets = this.getPresets();

    const presetChoices = Object.entries(presets).map(([name, preset]) => {
      let displayName = name;

      return { name: `${displayName} (${preset.features})`, value: name };
    });

    const presetPrompt = {
      name: 'preset',
      type: 'list',
      message: `Please pick a preset:`,
      choices: [
        ...presetChoices,
        {
          name: 'Manually select features',
          value: '__manual__',
        },
      ],
    };

    const featurePrompt = {
      name: 'features',
      type: 'checkbox',
      when: isManualMode,
      message: 'Check the features needed for your project:',
      pageSize: 10,
      choices: [],
    }; // inquirer prompt

    return {
      presetPrompt,
      featurePrompt,
    };
  }
}

module.exports = Creator;
