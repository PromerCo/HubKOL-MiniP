/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Category extends Base {
  constructor() {
    super();
  }



  getList(param,callback){
    var msg = param;
    console.log(msg.start_page)

    if (msg['type'] == 0){
      var param = {
        url: 'kol/spread',
        type: 'POST',
        data: {
          start_page: msg.start_page,
          platform_id: msg.platform_id
   
        },
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
          start_page: msg.start_page,
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