/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Category extends Base {
  constructor() {
    super();
  }

  column(callback) {
      var param = {
        url: 'kol/list',
        type: 'POST',
        sCallback: function (data) {
          callback && callback(data);
        }
      };
      this.request(param);
};


  getList(param,callback){
    var msg = param;
    if (msg['type'] == 0){
      var param = {
        url: 'kol/spread',
        type: 'POST',
        sCallback: function (data) {
          callback && callback(data);
        }
      };
    }else{
 
      var param = {
        url: 'kol/spread',
        type: 'POST',
        data: {
          platform_id: msg.platform_id,
          // tages_id: msg.tages_id,
          type: msg.type
        },
        sCallback: function (data) {
          callback && callback(data);
        }
      };
    }


  this.request(param);
};

};


export { Category };