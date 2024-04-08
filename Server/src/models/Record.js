class Record {
    constructor(time, temp, light, humidity, lightvalue, fan) {
        this.time = time;
        this.temp = temp;
        this.light = light;
        this.humidity = humidity;
        this.lightvalue = lightvalue;
        this.fan = fan;
    }
  }

module.exports = Record;