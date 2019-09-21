/**
 * Created by jimmy on 17/2/26.
 */

// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Account extends Base {
  constructor() {
    super();
  }

  getlist(callback) {
    var param = {
      url: 'means/account',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};
export { Account };