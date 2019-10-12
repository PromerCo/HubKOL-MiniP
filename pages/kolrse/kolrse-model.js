/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Kolrse extends Base {
  constructor() {
    super();
  }
  //详情
  koldelite(param, callback) {
    var pro_id = param;
    var param = {
      url: 'kol/kolpro',
      type: 'POST',
      data: {
        'pro_id': pro_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  };
  
  //邀请
  invite(param,callback){
    var kol_id = param;
    var param = {
      url: 'kol/invite',
      type: 'POST',
      data: {
        'kol_id': kol_id,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

  }

  /*
    关注
  */
  follow(param, callback){

    var kol_id = param;
    var param = {
      url: 'kol/follow',
      type: 'POST',
      data: {
        'user_id': param.user_id,
        'status': param.status,
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

  }


};


export { Kolrse };