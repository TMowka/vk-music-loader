const { app } = require('electron');
const path = require('path');
const fs = require('fs');

const parseDataFile = (path, defaults) => {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch (error) {
    return defaults;
  }
};

class Settings {
  constructor(opts) {
    this.path = path.join(app.getPath('userData'), opts.configName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  get(key) {
    return key ? this.data[key] : this.data;
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = Settings;