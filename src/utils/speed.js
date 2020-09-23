class Speed {
  result;

  constructor(min, max) {
    this.calc(min, max);
  }

  calc = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    this.result = Math.floor(Math.random() * (max - min)) + min;
  };
}

module.exports = Speed;
