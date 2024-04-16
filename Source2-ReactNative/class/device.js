class Device {
  constructor(key, label, value, type) {
    this.aio_feed_name = key;
    this.label = label;
    this.value = value;
    this.type = type;
    this.isManual = true;
    this.power = 0;
    this.numOfPeople = 0;
  }

  switchMode = () => {
    this.isManual = !this.isManual;
    console.log(this.isManual)
    return this;
  };

  setPower = (pow) => {
    this.power = pow;
    return this;
  };

  setNumOfPeople = (num) => {
    this.numOfPeople = num;
    console.log("Set people count in class " + this.numOfPeople);
    return this;
  };
}

export default Device;
