(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-fabu_xq-fabu_xq"],{"03f9":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAA1ElEQVRIie3WMUrEQBSA4S9D3FPsAcSjbCebWi+w2CQg23iCdHaKiH0EwWIP4CW8gZWWFltsLDKYRgyrTiHMDw9mHm/ez8ArXrGsezjHCeYGer+niPGKx651VizrfoXLP2g+xV2Ji3hZ4yGB5Aj3OC1xEJNXeNu3U9dOljxXjS1mAduYnH/z4MdUjYAdBOMwFClkxkEREgm+JMuyLMuyLMuy7B/LPje1gFk8v6Qwde2wEkBpXAcWhi1oL6pmsuRQ/FCJG9S4jZGKp4AG13hPJNlhg+MPTXMj7XFj3ggAAAAASUVORK5CYII="},"22ab":function(t,e,i){"use strict";var a=i("93c5"),n=i.n(a);n.a},"2a59":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"hx10"}),a("v-uni-view",{staticClass:"fabu_list"},[a("v-uni-view",{staticClass:"fabu_li"},[a("v-uni-view",{staticClass:" fabu_name"},[t._v(t._s(t.title))]),a("v-uni-view",{staticClass:"fabu_time"},[t._v(t._s(t.create_time))])],1),a("v-uni-view",{staticClass:"dynum_box"},[a("v-uni-view",[t._v(t._s(t.participation_man?t.participation_man:0)+"人参与")]),a("v-uni-view",[t._v("调研次数："+t._s(t.research_number?t.research_number:0)+"次")])],1)],1),a("v-uni-view",{staticClass:"down_btns"},[a("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.down_fuc.apply(void 0,arguments)}}},[t._v("下载统计")])],1),a("v-uni-view",{staticClass:"down_tip"},[t._v("注：详细内容下载统计后查看")]),a("v-uni-view",{staticClass:"hx10",staticStyle:{"margin-top":"50upx"}}),a("v-uni-view",{staticClass:"fabu_msg"},[t._v("发布信息")]),a("v-uni-view",{staticClass:"fabu_int"},[a("v-uni-input",{staticStyle:{color:"#333"},attrs:{type:"text",disabled:!0,value:t.title}})],1),t.explain?a("v-uni-view",{staticClass:"fabu_int"},[a("v-uni-input",{staticStyle:{color:"#333"},attrs:{type:"text",disabled:!0,value:t.explain}})],1):t._e(),t.addition_explain?a("v-uni-view",{staticClass:"fabu_int"},[a("v-uni-input",{staticStyle:{color:"#333"},attrs:{type:"text",disabled:!0,value:t.addition_explain}})],1):t._e(),a("v-uni-view",{staticClass:"problem_list"},t._l(t.datas,(function(e,n){return a("v-uni-view",{staticClass:"problem_li"},[a("v-uni-view",{staticClass:"problem_msg"},[a("v-uni-view",{staticClass:"problem_tit"},[t._v(t._s(n+1)+"."+t._s(e.problem.title)),a("v-uni-text",[t._v("("+t._s(e.type_value)+")")])],1),e.problem.problem_img.length>0?a("v-uni-view",{staticClass:"ans_file"},t._l(e.problem.problem_img,(function(e,i){return a("v-uni-image",{attrs:{src:t.getimg(e),mode:"aspectFit","lazy-load":"true","data-src":t.getimg(e)},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pveimg.apply(void 0,arguments)}}})})),1):t._e(),1==e.type?a("v-uni-view",{staticClass:"ans_list"},t._l(e.answer,(function(e,n){return a("v-uni-view",{staticClass:"ans_li"},[a("v-uni-view",{staticClass:"ans_tit dis_flex"},[a("v-uni-view",{staticClass:"ans_xzicon"},[a("v-uni-image",{attrs:{src:i("5479")}})],1),a("v-uni-view",{staticClass:"ans_xztext"},[a("v-uni-view",{staticClass:"ans_v_text"},[t._v(t._s(e.answer.title))]),e.answer.img.length>0?a("v-uni-view",{staticClass:"ans_file"},[a("v-uni-image",{attrs:{src:t.getimg(e.answer.img[0]),mode:"aspectFit","lazy-load":"true","data-src":t.getimg(e.answer.img[0])},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pveimg.apply(void 0,arguments)}}})],1):t._e()],1)],1)],1)})),1):t._e(),2==e.type?a("v-uni-view",{staticClass:"ans_list"},t._l(e.answer,(function(e,n){return a("v-uni-view",{staticClass:"ans_li"},[a("v-uni-view",{staticClass:"ans_tit dis_flex"},[a("v-uni-view",{staticClass:"ans_xzicon"},[a("v-uni-image",{attrs:{src:i("03f9")}})],1),a("v-uni-view",{staticClass:"ans_xztext"},[a("v-uni-view",{staticClass:"ans_v_text"},[t._v(t._s(e.answer.title))]),e.answer.img.length>0?a("v-uni-view",{staticClass:"ans_file"},[a("v-uni-image",{attrs:{src:t.getimg(e.answer.img[0]),mode:"aspectFit","lazy-load":"true","data-src":t.getimg(e.answer.img[0])},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pveimg.apply(void 0,arguments)}}})],1):t._e()],1)],1),e.answer.img.length>0?a("v-uni-view",{staticClass:"ans_file"},[a("v-uni-view",{staticClass:"ans_xzicon"}),a("v-uni-image",{attrs:{src:t.getimg(e.answer.img[0]),mode:"aspectFit","lazy-load":"true","data-src":t.getimg(e.answer.img[0])},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pveimg.apply(void 0,arguments)}}})],1):t._e()],1)})),1):t._e(),3==e.type?a("v-uni-view",{staticClass:"ans_list"},[a("v-uni-textarea")],1):t._e(),4==e.type?a("v-uni-view",{staticClass:"ans_list"},t._l(e.answer,(function(e,i){return a("v-uni-view",{staticClass:"ans_li"},[a("v-uni-view",{staticClass:"ans_tit dis_flex"},[a("v-uni-view",{staticClass:"ans_xztext"},[a("v-uni-view",{staticClass:"ans_v_text"},[t._v(t._s(e.answer.title))]),e.answer.img.length>0?a("v-uni-view",{staticClass:"ans_file"},[a("v-uni-image",{attrs:{src:t.getimg(e.answer.img[0]),mode:"aspectFit","lazy-load":"true","data-src":t.getimg(e.answer.img[0])},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pveimg.apply(void 0,arguments)}}})],1):t._e()],1),a("v-uni-view",{staticClass:"ans_xzicon"},[a("v-uni-text",{staticClass:"iconfont icon-shangyi"})],1),a("v-uni-view",{staticClass:"ans_xzicon"},[a("v-uni-text",{staticClass:"iconfont icon-xiayi"})],1)],1)],1)})),1):t._e(),5==e.type?a("v-uni-view",{staticClass:"ans_list"},[a("v-uni-view",{staticClass:"hd_box"},[a("v-uni-view",{staticClass:"hd_text dis_flex aic ju_b"},[a("v-uni-view",[t._v(t._s(e.answer.min_text)+"（"+t._s(e.answer.min_num)+"）")]),a("v-uni-view",[t._v(t._s(e.answer.max_text)+"（"+t._s(e.answer.max_num)+"）")])],1),a("v-uni-slider",{attrs:{value:"0",min:e.answer.min_num,max:e.answer.max_num,activeColor:"linear-gradient(-89deg, #65AEE1, #326CFA)",backgroundColor:"#ECEBF1","block-color":"#8A6DE9","block-size":"10",step:e.answer.step_size},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.sliderChange.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"step_d"},t._l(t.get_hd(e.answer.min_num,e.answer.max_num),(function(e,i){return a("v-uni-view",{staticClass:"step_d_li"},[a("v-uni-text",[t._v(t._s(e))])],1)})),1)],1)],1):t._e()],1)],1)})),1)],1)},s=[]},5479:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAC0ElEQVRIibXWW4iVVRTA8d98FQkTk4U0UVCI1NANLxUIWgheCouI5rz05EMPQRlSHemhx8IoNj1U0FNF0IPQViQ1uphdkZookq5TUNJLRBedpnoxtYe9vjmfo55zmjwLNmutvdfe/29fvr3X0PiDx/Qhy3EjlmAsyhn4DpPYj3052dtroKEewHFsxKp+vgqf4amcvPBfgRfiOaxv1H2Bj/ApvsYxLMJSZQWubcR+iLty8lU/wBXYjXPD340t2HeyL8up6FbbFdiEuxvNd+Zkazfgdfi4W4de0mpbia24OKpuy8nOur1qxA7j/bB/w7KcfIJtmFKWsFuZwrac/IyrlWWFV1ptl50MuAvzwl6Rk78xgTsw0sfkRiJ2IiejuAE/RNubs4FrdU7ieE4mlX2b3wdotszHlpz80xjz0lbbPU3g46Hfxvaw18wBVss6yMmPeDbqHmm1zauU47w0Ku9tdOpnGU8l5zTszTiC83FrhZui4Vvl/zqtkpO/sCfctRWuCee90w1ryK7QiytcGc7EAIH1pbGowuXhfDlA4MHQCyqdk3p0gMAZqfB92GMD5NSn9mDFzI1+/QCB9dgHKnwezsoBAm8Jvb/CW+EsxgWNoD/+B+DPWf660O9UygtRX7JPNIL2mLu8URuttgeUPTyMHfUJfSj0BiwL+2EcmgPsUPTVajtb555+NCdTNfBlncPzegR+o6QO2zHdB2g6YpdHX3gNZ0bbYxz/Ht4cegHebbUNKxnZuHKRD/UoIxE7GbN7Xud5Wp+Tw5yYYrRithqwrjdQndPMDNA2ihd1HoX7cvJM3V4dHy7j9rDHlEztaVzUDRqg4VbbZiVXrWEbmzBOnSYuwUu4KvyjeBV7lVzl16g/L2LXYLXy5sFP2JBTJ7XoBaTsyybcj0u6z29GppHwZE4n/Is9gbWcpSzzKmU2CzGqbMcvOKCk+h9gZ05+7zbYv4gDvmXhIbqwAAAAAElFTkSuQmCC"},"6f04":function(t,e,i){"use strict";i.r(e);var a=i("9da1"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"93c5":function(t,e,i){var a=i("f4bb");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2a18a20a",a,!0,{sourceMap:!1,shadowMode:!1})},"9da1":function(t,e,i){"use strict";var a=i("4ea4");i("b680"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("5530")),s=a(i("1cc4")),o=i("2f62"),c={data:function(){return{datas:[],title:"",explain:"",addition_explain:"",participation_man:"",research_number:"",create_time:""}},onLoad:function(t){t.id&&(this.id=t.id,this.getdata())},onShow:function(){console.log(this.new_problem)},computed:(0,n.default)({},(0,o.mapState)(["new_problem","loginDatas"])),methods:(0,n.default)((0,n.default)({},(0,o.mapMutations)(["setnew_problem"])),{},{get_hd:function(t,e){var i=[t,t,t,t,t,e];return i[1]=(.2*(e-t)+1*t).toFixed(2),i[2]=(.4*(e-t)+1*t).toFixed(2),i[3]=(.6*(e-t)+1*t).toFixed(2),i[4]=(.8*(e-t)+1*t).toFixed(2),i},sliderChange:function(t){console.log(t)},down_fuc:function(){var t=this;uni.showLoading({title:"正在拉取数据"}),console.log(s.default.IPurl+"/user/getExcel?id="+t.id+"&token="+t.loginDatas.userToken);Date.parse(new Date);uni.downloadFile({url:s.default.IPurl+"/user/getExcel?id="+t.id+"&token="+t.loginDatas.userToken,success:function(t){if(200===t.statusCode){console.log("下载成功"),console.log(t),uni.hideLoading();var e=t.tempFilePath;wx.openDocument({filePath:e,showMenu:!0,success:function(t){console.log("打开文档成功")},fail:function(t){console.log(t)},complete:function(t){console.log(t)}})}}})},getdata:function(){var t=this,e={token:t.loginDatas.userToken||"",id:t.id},i="/user/issueDetails";uni.showLoading({title:"正在获取数据"}),s.default.P_get(i,e).then((function(e){if(t.btn_kg=0,console.log(e),1==e.code){var i=e.data;console.log(typeof i),"string"==typeof i&&(i=JSON.parse(i)),t.title=i.title,t.explain=i.explain,t.addition_explain=i.addition_explain,t.participation_man=i.participation_man,t.research_number=i.research_number,t.create_time=i.create_time,t.datas=i.problem,console.log(i)}else e.msg?uni.showToast({icon:"none",title:e.msg}):uni.showToast({icon:"none",title:"操作失败"})})).catch((function(e){t.btn_kg=0,console.log(e),uni.showToast({icon:"none",title:"获取数据失败"})}))},sub:function(){uni.showModal({title:"请仔细确认发布内容，发布后不可修改",success:function(t){t.confirm?(console.log("用户点击确定"),uni.navigateTo({url:"../fabu2/fabu2"})):t.cancel&&console.log("用户点击取消")}})},jump:function(t){s.default.jump(t)},pveimg:function(t){s.default.pveimg(t)},getimg:function(t){return s.default.getimg(t)}})};e.default=c},da5c:function(t,e,i){"use strict";i.r(e);var a=i("2a59"),n=i("6f04");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("22ab");var o,c=i("f0c5"),l=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"546cae2c",null,!1,a["a"],o);e["default"]=l.exports},f4bb:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.fabu_list[data-v-546cae2c]{width:100%;padding:%?20?% 0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.fabu_li[data-v-546cae2c]{width:100%;min-height:%?160?%;background:#fff;-webkit-border-radius:%?4?%;border-radius:%?4?%;margin-bottom:%?20?%;padding:%?20?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.fabu_name[data-v-546cae2c]{margin-bottom:%?27?%;font-size:%?30?%;color:#333;font-weight:700}.fabu_time[data-v-546cae2c]{font-size:%?24?%;color:#999}.dynum_box[data-v-546cae2c]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;\n\t/* height: 100upx; */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?28?%;color:#666;margin-bottom:%?20?%}.down_btns[data-v-546cae2c]{width:100%;padding:%?30?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.down_btns uni-view[data-v-546cae2c]{width:%?529?%;height:%?80?%;background:-webkit-gradient(linear,left top,right top,from(#65aee1),to(#326cfa));background:-webkit-linear-gradient(left,#65aee1,#326cfa);background:linear-gradient(90deg,#65aee1,#326cfa);-webkit-box-shadow:0 0 %?7?% 0 rgba(67,130,243,.1);box-shadow:0 0 %?7?% 0 rgba(67,130,243,.1);-webkit-border-radius:%?40?%;border-radius:%?40?%;font-size:%?32?%;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.down_tip[data-v-546cae2c]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?26?%;color:#999}.fabu_msg[data-v-546cae2c]{margin-top:%?20?%;margin-bottom:%?20?%;width:100%;height:%?100?%;padding:0 %?30?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-weight:700;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:1px solid #eee}.fabu_int[data-v-546cae2c]{width:100%;height:%?94?%;border-bottom:1px solid #ededed;padding:0 %?30?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.fabu_int uni-input[data-v-546cae2c]{width:100%;font-size:%?32?%;color:#999}.problem_list[data-v-546cae2c]{width:100%}.problem_li[data-v-546cae2c]{border-bottom:%?9?% solid #ddd}.problem_msg[data-v-546cae2c]{width:100%;padding:0 %?30?%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding-top:%?30?%}.problem_tit[data-v-546cae2c]{font-size:%?28?%;color:#333;margin-bottom:%?20?%;font-weight:700}.problem_tit uni-text[data-v-546cae2c]{color:#5885de}.ans_list[data-v-546cae2c]{width:100%;padding-bottom:%?20?%;border-bottom:1px solid #f3f3f3}.ans_li[data-v-546cae2c]{width:100%}.ans_tit[data-v-546cae2c]{width:100%;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start;padding-bottom:%?18?%;line-height:%?35?%;margin-top:%?19?%}.ans_xzicon[data-v-546cae2c]{width:%?70?%;height:%?35?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-flex:0;-webkit-flex:none;flex:none}.ans_xzicon uni-image[data-v-546cae2c]{width:%?28?%;height:%?28?%}.ans_xzicon uni-text[data-v-546cae2c]{color:#4c7cdb;font-size:%?34?%}.ans_xztext[data-v-546cae2c]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;line-height:%?35?%;color:#333}.ans_v_text[data-v-546cae2c]{margin-bottom:%?15?%}.ans_file[data-v-546cae2c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-top:%?15?%}.ans_file uni-image[data-v-546cae2c]{width:%?158?%;height:%?158?%;margin-right:%?15?%;margin-bottom:%?15?%}.ans_list uni-textarea[data-v-546cae2c]{width:100%;height:%?224?%;background:#eaeaea}.hd_box[data-v-546cae2c]{width:100%;position:relative;margin-top:%?50?%;margin-bottom:%?50?%}.hd_box uni-slider[data-v-546cae2c]{width:100%;margin:0}.hd_text[data-v-546cae2c]{width:100%;position:absolute;top:%?-30?%;font-size:%?26?%;color:#111}.step_d[data-v-546cae2c]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:absolute;bottom:%?-40?%}.step_d_li[data-v-546cae2c]{width:2px;font-size:%?24?%;color:#111;position:relative;padding-top:%?19?%;text-align:center}.step_d_li uni-text[data-v-546cae2c]{width:3em;margin-left:-1.5em;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.step_d_li[data-v-546cae2c]::before{content:"";position:absolute;top:0;left:50%;width:%?2?%;height:%?19?%;background:#c4c4c4}.problem_cz[data-v-546cae2c]{width:100%;height:%?86?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around;font-size:%?26?%;color:#333}.problem_cz uni-view[data-v-546cae2c]{width:%?180?%;text-align:center}.problem_cz uni-text[data-v-546cae2c]{color:#666;margin-right:%?8?%;font-size:%?28?%}.hx10[data-v-546cae2c]{width:100%;height:%?15?%;background:#ddd}.sub_box[data-v-546cae2c]{width:100%;height:%?160?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center\n\t/* position: fixed;\n\tbottom: 0; */}.sub_btn[data-v-546cae2c]{width:%?603?%;height:%?80?%;background:-webkit-gradient(linear,left top,right top,from(#65aee1),to(#326cfa));background:-webkit-linear-gradient(left,#65aee1,#326cfa);background:linear-gradient(90deg,#65aee1,#326cfa);-webkit-box-shadow:0 0 %?7?% 0 rgba(67,130,243,.1);box-shadow:0 0 %?7?% 0 rgba(67,130,243,.1);-webkit-border-radius:40px;border-radius:40px;font-size:%?32?%;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.xz_add_btn[data-v-546cae2c]{width:%?215?%;height:%?83?%;background:-webkit-gradient(linear,left top,right top,from(rgba(61,127,255,.91)),to(rgba(60,142,255,.91)));background:-webkit-linear-gradient(left,rgba(61,127,255,.91),rgba(60,142,255,.91));background:linear-gradient(90deg,rgba(61,127,255,.91),rgba(60,142,255,.91));-webkit-box-shadow:0 0 %?10?% 0 rgba(0,0,0,.18);box-shadow:0 0 %?10?% 0 rgba(0,0,0,.18);-webkit-border-radius:%?42?%;border-radius:%?42?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:fixed;bottom:%?300?%;right:%?30?%;z-index:300;font-size:%?32?%;color:#fff}.xz_add_btn uni-text[data-v-546cae2c]{font-size:%?38?%;color:#fff;margin-right:%?4?%;cursor:pointer}',""]),t.exports=e}}]);