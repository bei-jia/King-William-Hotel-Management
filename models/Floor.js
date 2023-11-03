const Model = require("./Model.js");

class Floor extends Model {
  constructor(flr_id, flr_num) {
    super("floor");
    this.flr_id = flr_id;
    this.flr_num = flr_num;
  }
}

module.exports = Floor;
