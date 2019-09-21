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
    var param = {
      url:'user/authorize',
      data:{ 
        nick_name: object.nickName,
        avatar_url: object.avatarUrl,
        city: object.city,
        gender: object.gender,
        language: object.language,
        province: object.province,
        country: object.country,
        company: object.company
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

