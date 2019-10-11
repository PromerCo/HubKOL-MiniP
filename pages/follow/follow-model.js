
import { Base } from '../../utils/base.js';

class Follow extends Base {
  constructor() {
    super();
  }

  follower(parmes, callback) {

    var param = {
      url: 'kol/foluser',
      data: { type: parmes },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export { Follow };