/**
 * Created by jimmy on 17/2/26.
 */

// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class My extends Base {
  constructor() {
    super();
  }

  getPhone(param, callback) {
    var that = this
    var object = param
    var iv = object.iv
    var encryptedData = object.encryptedData
    var code = object.code
    console.log(code)
    
    var param = {
      url: 'user/getPhone',
      data: {
        iv: encodeURI(iv),
        encryptedData: encodeURIComponent(encryptedData),
        code: code
      },
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };


    this.request(param);
  }




};

export { My };