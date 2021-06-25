const { defaults } = require('./utils/options');
const isManualMode = answers => answers.preset === '__manual__';

class Creator {
  constructor() {
    this.injectedPrompts = [];
    const { presetPrompt, featurePrompt } = this.getDefaultPrompts();
    this.featurePrompt = featurePrompt;
    this.presetPrompt = presetPrompt;
  }

  getDefaultPrompts() {
    const presets = { ...defaults.presets };

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

  getFinalPrompts() {
    this.injectedPrompts.forEach(prompt => {
      // REVIEW: ？？
      const originalWhen = prompt.when || (() => true);
      prompt.when = answers => isManualMode(answers) && originalWhen(answers);
    });

    const prompts = [this.presetPrompt, this.featurePrompt, ...this.injectedPrompts];

    return prompts;
  }
}

module.exports = Creator;
