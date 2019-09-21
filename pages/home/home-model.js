/**
 * Created by jimmy on 17/2/26.
 */

// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  } 

  roleStatus(callback) {
    var param = {
      url: 'user/role',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getlist(callback){
    var param = {
      url: 'home/index',
      type: 'POST',
      sCallback: function (data) {
        //  后台 data
        callback && callback(data);
      }
    };
    this.request(param);
  }

};

export { Home };