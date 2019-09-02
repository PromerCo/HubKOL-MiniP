/**
 * Created by jimmy on 17/2/26.
 */

// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Login extends Base {
  constructor() {
    super();
  }

  getUserAhth(param,callback) {
    var object = JSON.parse(param); 
    console.log(object)
    var nickName = object.nickName
    var avatarUrl = object.avatarUrl
    var param = {
      url:'user/saveUser',
      data:{ 
        nickName: nickName,
        avatarUrl: avatarUrl
        },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  doOrder(param, callback) {
  }

};

export { Login };

