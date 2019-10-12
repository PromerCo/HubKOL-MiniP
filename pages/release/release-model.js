/**
 * Created by jimmy on 17/2/26.
 */

// var Base = require('../../utils/base.js').base;
import { Base } from '../../utils/base.js';

class Release extends Base {
  constructor() {
    super();
  }

/*
  发布
*/
  kolSave(param, callback) {
    var info = param
    var convene = info.convene  //召集人数
    var describe = info.describe  //描述
    var expire_time = info.expire_time  //过期时间
    var follow_level = info.follow_level  //粉丝级别
    var tags = info.tags  //领域（标签）
    var platform = info.platform_code  //平台
    var title = info.title  //标题
    var budget = info.budget
    var param = {
      url: 'publish/push',
      type: 'POST',
      data: {
        'convene': convene,
        'describe': describe,
        'expire_time': expire_time,
        'follow_level': follow_level,
        'tags': tags,
        'platform': platform,
        'budget': budget,
        'title':title
        },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  };



};

export { Release };