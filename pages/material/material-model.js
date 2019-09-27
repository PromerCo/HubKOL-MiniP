/**
 * Created by jimmy on 17/2/26.
 */

import { Base } from '../../utils/base.js';

class Material extends Base {
  constructor() {
    super();
  }
  /*
  获取角色状态
  */
  roleStatus(callback) {
    var param = {
      url: 'means/miexhibit',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

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

  saveData(param, callback) {
    var that = this
    var object = param
    var param = {
      url: 'means/material',
      data: {
        phone: object.phone,     //手机号
        wechat: object.wx_name,   //微信名称
        city: object.city,  //城市 
        city_code: object.city_code,  //城市 code 码
        province: object.province,  //省份
        province_code: object.province_code,  //省份 code 码
        email: object.email, //邮箱
        profile: '简介',
        //HOL
        company: object.compony, //公司
        brand: object.moc,  //品牌
        position_code: object.position,   //职位
        industry: object.hangye,  //行业
        //KOL
        account: object.kol_account,   //账户
        follow_level: object.kol_fans,   //粉丝
        platform: object.kol_terrace,   //平台
        mcn_organization: object.kol_mcn,   //机构
        mcn_company: object.kol_compony,   //公司
        tags: object.kol_territory,   //领域
        type: object.type   //类型
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

export { Material };