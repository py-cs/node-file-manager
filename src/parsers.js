import path from "path";

export const parseUserName = () => {
  const args = process.argv.slice(2);
  const userNameArg = args.find((arg) => arg.startsWith("--username"));

  return userNameArg?.split("=")[1] ?? "Anonimous_User";
};

export const parsePathArray = ([cdw, ...pathArr]) =>
  pathArr.map((p) => path.resolve(cdw, p));

export const parseCommand = (line) => {
  const [command] = line.split(/\s+/);
  const argsStr = line.slice(command.length);

  const args = argsStr
    .split(argsStr.includes(`"`) ? `"` : /\s+/)
    .map((arg) => arg.trim())
    .filter((arg) => Boolean(arg));
  return [command, args];
};
