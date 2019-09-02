var app=getApp()
import {
  Home
} from 'home-model.js';
var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false,
    },

  onLoad:function(){
   console.log("onload")
   var that=this
  }
})