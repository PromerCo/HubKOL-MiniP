/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Detalis extends Base {
  constructor() {
    super();
  }


  agree(param, callback) {
    var push_id = param
    var param = {
      url: 'partake/enroll',
      type: 'POST',
      data: {'push_id': push_id},
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param); 
  };

  showAgree(param,callback){
    var push_id = param
    var param = {
      url: 'partake/pageviews',
      type: 'POST',
      data: { 'push_id': push_id },
      sCallback: function (data) {
        callback && callback(data);
      }

  }
    this.request(param);

};

};

  

export { Detalis };