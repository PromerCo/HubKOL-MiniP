/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Enroll extends Base {
  constructor() {
    super();
  }

  partake(param, callback) {
    var push_id = param;
    var param = {
      url: 'means/enroll',
      type: 'POST',
      data: {
        'push_id': push_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  };


};


export { Enroll };