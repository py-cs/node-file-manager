# File Manager

## Simple CLI file manager

#### [RSSchool NodeJS Course Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

---

#### Install

```
$ git clone https://github.com/py-cs/node-file-manager.git
```

```
$ npm run start -- --username=[Your name]
```

---

#### Supported commands

- .exit
- up
- cd [path_to_directory]
- ls
- cat [path_to_file]
- add [file_name]
- rn [path_to_file] [file_name]
- cp [path_to_file] [path_to_directory]
- mv [path_to_file] [path_to_directory]
- rm [path_to_file]
- os [--EOL / --cpus / --homedir / --username / --architecture]
- hash [path_to_file]
- compress [path_to_file] [path_to_file]
- decompress [path_to_file] [path_to_file]

---

#### Validation

> Command and parameters are validated against the set of rules before command execution. If command or parameters doesn't meet all of these requirements operation will result in **Input Error**

- Command should be one of the above list of commands.
- Number of passed parameters should be:
  - none for .exit, up, ls.
  - one for cd, cat, add, rm, os, hash.
  - two for rn, cp, mv, compress, decompress.
- [file_name] parameters: shouldn't include invalid characters, can't end with a dot, can't contain path separators. If filename contains spaces it should be wrapped in double quotes ("Filename with spaces.txt")
- [file_to_path] and [path_to_directory] parameters: should be a valid path. If path contains spaces it should be wrapped in double quotes ("c:\Users\All users")
- os command parameter: should be one of the list
  - --EOL
  - --cpus
  - --homedir
  - --username
  - --architecture

---

#### Execution

> When command is executed its result is printed to console. If command fails to execute (for example user provided path to file or directory that doesn't exist) **Operation failed** message will be shown.

#### Exit

> To exit File Manager type .exit in console or press CTRL + C.
