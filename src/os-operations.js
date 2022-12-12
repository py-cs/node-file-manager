import os from "os";

export const osOperations = {
  "--EOL": () => {
    console.log(JSON.stringify(os.EOL));
  },

  "--cpus": () => {
    const cores = os.cpus();
    const coresData = cores.map(({ model, speed }) => ({
      Model: model.trim(),
      Freq: `${speed / 1000} GHz`,
    }));
    console.log(`Overall amount of CPUs: ${cores.length}`);
    console.table(coresData);
  },

  "--homedir": () => {
    console.log(os.homedir());
  },

  "--username": () => {
    console.log(os.userInfo().username);
  },

  "--architecture": () => {
    console.log(os.arch());
  },
};
