/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 17:07:08 
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 17:12:14
 */

import * as args from 'args';
import { newProject } from './new';
import { add as addApi } from './api';

const NEW_COMMAND = 'new';
const NEW_COMMAND_DESCRIPTION = 'Start a new project';
const ADD_API_COMMAND = 'add-api';
const ADD_API_COMMAND_DESCRIPTION = 'Add an api';

export function startProgram(argv: string[]): any {
  args.option(NEW_COMMAND, NEW_COMMAND_DESCRIPTION);
  args.option(ADD_API_COMMAND, ADD_API_COMMAND_DESCRIPTION);

  const flags = args.parse(argv);

  if (flags.n) return newProject(flags);
  if (flags.a) return addApi(flags);
  return args.showHelp();
}
