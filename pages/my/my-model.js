/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class My extends Base {
  constructor() {
    super();
  }

/*
角色类型
*/
  roleStatus(callback){
    var param = {
      url: 'means/miexhibit',
      type: 'POST',         
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

/*
获取手机号
*/
  getPhone(param, callback) {
    var that = this
    var object = param
    var iv = object.iv
    var encryptedData = object.encryptedData
    var code = object.code
    var param = {
      url: 'user/phone',
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

/*
授权
*/
  getUserAhth(param, callback) {
    var object = JSON.parse(param);
    var param = {
      url: 'user/authorize',
      data: {
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

  blockedOut(param, callback) {

    var that = this
    var object = param
    var param = {
      url: 'means/blocked',
      data: {
        type: object
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