import * as colors from 'colors/safe';
import * as eac from 'english-article-classifier';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as lodash from 'lodash';
import * as inquirer from 'inquirer';
import * as pluralize from 'pluralize';

export async function add(flags: any) {
  const cwd = process.cwd();
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'model',
      default: 'sample',
      message: 'Model',
    },
    {
      type: 'input',
      name: 'endpoint',
      default: (answers: any) => `/${pluralize(answers.model)}`,
      message: 'Endpoint',
    },
    {
      type: 'input',
      name: 'path',
      default: (answers: any) => `${cwd}/src/${answers.model}`,
      message: 'Path',
      validate: input => {
        if (fs.existsSync(input)) {
          return colors.red(`API Path ${input} already exits`);
        }
        return true;
      },
    },
  ]);
  flags.model = answers.model;
  flags.endpoint = answers.endpoint;
  flags.path = answers.path;

  try {
    // mkdir
    await fse.mkdirp(flags.path);

    // readfile
    const controllerSpecTmp = await fse.readFile(
      __dirname + '/../templates/api/controller.spec.ts'
    );
    const controllerTmp = await fse.readFile(
      __dirname + '/../templates/api/controller.ts'
    );
    const entityTmp = await fse.readFile(
      __dirname + '/../templates/api/entity.ts'
    );
    const moduleTmp = await fse.readFile(
      __dirname + '/../templates/api/module.ts'
    );
    const paramsTmp = await fse.readFile(
      __dirname + '/../templates/api/params.ts'
    );
    const modelTmp = await fse.readFile(__dirname + '/../templates/api/ts');

    // prepare options
    const modelUppercase = lodash.capitalize(flags.model);
    const options: any = {
      model: flags.model,
      modelUppercase: modelUppercase,
      modelUppercasePlural: pluralize(modelUppercase),
      article: eac.classifyArticle(flags.model).type,
      endpoint: flags.endpoint,
    };

    // render template
    const controllerSpec = lodash.template(controllerSpecTmp.toString())(
      options
    );
    const controller = lodash.template(controllerTmp.toString())(options);
    const entity = lodash.template(entityTmp.toString())(options);
    const module = lodash.template(moduleTmp.toString())(options);
    const params = lodash.template(paramsTmp.toString())(options);
    const model = lodash.template(modelTmp.toString())(options);

    // output files
    await fse.outputFile(
      `${flags.path}/${flags.model}.controller.spec.ts`,
      controllerSpec
    );
    await fse.outputFile(
      `${flags.path}/${flags.model}.controller.ts`,
      controller
    );
    await fse.outputFile(`${flags.path}/${flags.model}.entity.ts`, entity);
    await fse.outputFile(`${flags.path}/${flags.model}.module.ts`, module);
    await fse.outputFile(`${flags.path}/${flags.model}.params.ts`, params);
    await fse.outputFile(`${flags.path}/${flags.model}.ts`, model);

    // success
    console.log('Api', colors.cyan(flags.model), 'has been created');
    console.log(
      'Do',
      colors.red('NOT'),
      'forget to import',
      colors.cyan(modelUppercase + 'Module'),
      'to',
      colors.cyan('AppModule')
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
