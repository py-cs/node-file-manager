import { osOperations } from "./os-operations.js";

const FILE_REGEX = /[<>:"/\\|?*\u0000-\u001F]/g;
const PATH_REGEX = /[<>"|?*\u0000-\u001F]/g;

const validationFunctions = {
  required: (arg) => Boolean(arg),
  includes: (arg, list) => list?.includes(arg),
  isFileName: (arg) => !FILE_REGEX.test(arg) && !arg.endsWith("."),
  isPath: (arg) => !PATH_REGEX.test(arg),
};

const validationConfig = {
  ".exit": [],
  up: [],
  cd: [{ required: true, isPath: true }],
  ls: [],
  cat: [{ required: true, isPath: true }],
  add: [{ required: true, isFileName: true }],
  rn: [
    { required: true, isPath: true },
    { required: true, isFileName: true },
  ],
  cp: [
    { required: true, isPath: true },
    { required: true, isPath: true },
  ],
  mv: [
    { required: true, isPath: true },
    { required: true, isPath: true },
  ],
  rm: [{ required: true, isPath: true }],
  os: [
    {
      includes: Object.keys(osOperations),
    },
  ],
  hash: [{ required: true, isPath: true }],
  compress: [
    { required: true, isPath: true },
    { required: true, isPath: true },
  ],
  decompress: [
    { required: true, isPath: true },
    { required: true, isPath: true },
  ],
};

class Validator {
  constructor(config, functions) {
    this.config = config;
    this.functions = functions;
  }

  validate(command, args) {
    const config = this.config[command];

    if (config?.length !== args.length) {
      return false;
    }

    return config?.every((arg, index) =>
      Object.keys(arg)?.every((rule) =>
        this.functions[rule](args[index], arg[rule])
      )
    );
  }
}

export const inputValidator = new Validator(
  validationConfig,
  validationFunctions
);
