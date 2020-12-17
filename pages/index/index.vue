<template>
	<view class="content_wrap" :style="style0">
		<image class="index_bg" src="/static/images/index_top_01.png"></image>

		<view class="head_box" :class="{'cur_H':PageScroll>5}" :style="style">
			心理咨询
		</view>
		
		<view class="list_box dis_flex_c" :style="style1">
			<scroll-view class="flex_1" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
			 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" @scrolltolower="getdata">
				<view class="scroll_nbox">
					<view class="i_li dis_flex aift" v-for="item in datas" @tap="jump" :data-login='login_kg' :data-haslogin='hasLogin'
					 :data-url="'/pages/dati/dati?id='+item.id">
						<view class="i_li_l" @tap="jump" :data-url="'/pages/video/video?src='+item.src">
							<!-- <image class="i_li_l_img1" :src="getimg(item.img)" lazy-load="true" mode="aspectFill"></image> -->
							<image class="i_li_l_img1" :src="item.img" lazy-load="true" mode="aspectFill"></image>
							<image class="i_li_l_img2" src="../../static/images/play_btn.png" mode="aspectFill"></image>
						</view>
						<view class="i_li_msg">
							<view class="d1">上传日期：{{item.time}}</view>
							<view class="d2">分析状态：<text class="d21" v-if="item.type==1">已分析</text><text class="d22" v-if="item.type==2">分析中</text></view>
							<view class="d2">问卷调查：<text>{{item.num}}</text>份</view>
							<view class="d2 dis_flex aic ju_b">
								<view class="index_btn" @tap="jump" data-url="/pages/fx_jieguo/fx_jieguo?type=1">视频分析</view>
								<view class="index_btn index_btn1" @tap="jump" data-url="/pages/wenquan_list/wenquan_list">问卷分析</view>
							</view>
						</view>
					</view>

					<view v-if="datas.length==0" class="zanwu dis_flex_c aic">
						<image class="data_null" src="../../static/images/data_null.png" mode="aspectFill"></image>
						<text style="line-height: 30upx;">暂无视频</text>
					</view>
					<view v-if="data_last" class="data_last">没有更多了~~~</view>
				</view>
			</scroll-view>

		</view>
		<image  @tap="fabu_fuc" data-url="/pages/order/order" class="xiandan" src="../../static/images/fabu_btn.png"></image>
		<view v-if="show_tk" class="tk_big_box dis_flex aic ju_c">
			<view class="dis_flex_c aic ju_c">
				<view class="dis_flex_c tk_box">
					<view class="tk_tit">提示</view>
					<view class="tk_msg">为了更好的服务，小程序需要在答题开始前向您发送消息</view>
					<view class="dis_flex ju_a ">
						<view class="dy_btn dy_btn1" @tap="authMsg">订阅</view>
						<view class="dy_btn" @tap="authMsg_on">取消</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btn_kg: 0,
				time_zz: '你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: [
					{
						img:'../../static/images/index_03.jpg',
						time:'2020-09-01 20:20',
						type:1,
						num:2,
						id:1,
						src:'http://www.wanbonet.com/suxin/images/mp4.mp4'
					},
					{
						img:'../../static/images/index_06.jpg',
						time:'2020-09-01 20:20',
						type:1,
						num:2,
						id:1,
						src:'http://www.wanbonet.com/suxin/images/mp4.mp4'
					
					},
					{
						img:'../../static/images/index_08.jpg',
						time:'2020-09-01 20:20',
						type:2,
						num:0,
						id:1,
						src:'http://www.wanbonet.com/suxin/images/mp4.mp4'
					},
					{
						img:'../../static/images/index_03.jpg',
						time:'2020-09-01 20:20',
						type:2,
						num:0,
						id:1,
						src:'https://tb-video.bdstatic.com/tieba-smallvideo-transcode-cae/20013224_853bd96109a3af682b1c97d9da8ee5ef_0_cae.mp4?vt=1&pt=3&cr=3&cd=3&sid=&ft=2&tbau=2020-12-16_911f9f26f2c29f2e2c899690f33b93c33e67771f1a90696c7dcf1ff512a5d838'
					},
					{
						img:'../../static/images/index_06.jpg',
						time:'2020-09-01 20:20',
						type:2,
						num:0,
						id:1,
						src:'https://tb-video.bdstatic.com/tieba-smallvideo-transcode-cae/20013224_853bd96109a3af682b1c97d9da8ee5ef_0_cae.mp4?vt=1&pt=3&cr=3&cd=3&sid=&ft=2&tbau=2020-12-16_911f9f26f2c29f2e2c899690f33b93c33e67771f1a90696c7dcf1ff512a5d838'
					},
				],
				
				PageScroll: '',
				page: 1,
				size: 15,
				search_key: '',
				sort: 1,
				triggered: true, //设置当前下拉刷新状态
				data_last: false,
				login_kg: false,
				
				
				
				show_tk:false
			};
		},
		watch: {
			hasLogin() {
				var that =this
				this.btn_kg = 0
				this.onRetry()
				wx.getSetting({
					withSubscriptions:true,
				  success (res) {
				    console.log('res.authSetting')
				    console.log(res)
				    console.log(res.authSetting)
						var itemSettings = res.subscriptionsSetting.itemSettings
						console.log('itemSettings')
						console.log(itemSettings)
						/*if (itemSettings) {
							 if (itemSettings['-I6lIPrxg8bcr5AdAUtzPuksKa9hodpyD58cKPHfR8I'] === 'accept') {
								 console.log('is accredit：ok')
							 }else{
								 that.show_tk=true
							 }
						}else{
							 that.show_tk=true
						}*/
				    
				  }
				})
			}
		},
		onLoad() {
			var yhxy = uni.getStorageSync('yhxy')
		
			this._freshing = false;
			this.onRetry()
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop

		},
		onShareAppMessage() {

		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;

				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},
			style1() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `top:${CustomBar}px;`;

				return style
			}
		},
		onPullDownRefresh() {
			console.log('下拉')
			this.onRetry()
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			fabu_fuc(){
				uni.chooseVideo({
						count: 1,
						sourceType: ['camera', 'album'],
						compressed:true,
						maxDuration:'15',
						success: function (res) {
								var src = res.tempFilePath;
								console.log(src)
								uni.showLoading({
									mask:true,
									title:'正在上传视频'
								})
								setTimeout(()=>{
									uni.hideLoading()
									uni.showToast({
										icon:'none',
										title:'上传成功'
									})
								},4000)
						}
				});
			},
			authMsg(event) {
				var that =this
				uni.requestSubscribeMessage({
					tmplIds: ['-I6lIPrxg8bcr5AdAUtzPuksKa9hodpyD58cKPHfR8I'],
					success: function(res) {
						console.log(res)
						that.show_tk=false
						uni.showToast({
							icon:'none',
							title:'订阅消息成功'
						})
					},
					fail: function(err) {
						console.log(err)
						uni.showToast({
							icon:'none',
							title:'订阅消息失败'
						})
					}

				})

			},
			authMsg_on(e){
				var that =this
				uni.showModal({
						title: '温馨提示',
						content: '拒绝后您将无法获取提示消息',
						confirmText:"知道了",
						showCancel:false,
						success: function (res) {
							///点击知道了的后续操作 
							///如跳转首页面 
							that.show_tk=false
						}
				});
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				var that = this
				
				if (this._freshing) return;
				this._freshing = true;
				
				setTimeout(()=>{
					this.triggered=false
					this._freshing =false
				},300)
				
				return
				var datas = {
					token: that.loginDatas.userToken,
					page: 1,
					size: that.size,
					title: that.search_key,
					sort: that.sort
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, datas).then(res => {
					this.triggered = false
					this._freshing = false
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						if (res.resfj_data) {
							that.setfj_data(res.resfj_data)
						}

						that.datas = datas

						that.page = 2

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					this.triggered = false
					this._freshing = false
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
				
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			paixu() {
				if (this.sort == 1) {
					this.sort = 2
				} else if (this.sort == 2) {
					this.sort = 1
				}

				this.onRetry()
			},
			onRetry() {
				this.page = 1
				this.data_last = false
				this.getdata()
			},
		
			getimg(img) {
				return service.getimg(img)
			},
			getdata(num) {
				var that = this
				return
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.userToken || '',
					page: that.page,
					size: that.size,
					title: that.search_key,
					sort: that.sort
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						if (res.fj_data) {
							that.setfj_data(res.fj_data)
							if (res.fj_data.is_any_dy == 1) {
								that.login_kg = true
							} else if (res.fj_data.is_any_dy == 2) {
								that.login_kg = false
							}

						}
						if (page_that == 1) {

							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},
			jumpurl(e) {
				var that = this

				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
				var datas = e.currentTarget.dataset
				console.log('../webview/webview?url=' + datas.url)
				uni.navigateTo({
					url: '../webview/webview'
				})
				uni.navigateTo({
					url: '../webview/webview?url=' + datas.url
				})
				// window.location.href = datas.url
			},
			jump(e) {
				var that = this
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}

				service.jump(e)
			},
			dblogin() {
				var that = this
				if (!uni.getStorageSync('phone')) {
					// uni.reLaunch({
					// 	url:'../login/login'
					// })
					return
				}
				var account = uni.getStorageSync('phone')
				var password = uni.getStorageSync('password')
				console.log(account)
				const data = {
					phone: account,
					password: password
				}
				var jkurl = '/api/login/login'

				service.post(jkurl, data,
					function(res) {
						that.btn_kg = 0
						if (res.code == 1) {
							that.login(res.data.nickname);
							that.logindata(res.data.data)
							uni.setStorageSync('loginmsg', JSON.stringify(res.data.data))
							uni.setStorageSync('phone', account)
							var phone = uni.getStorageSync('phone')
							console.log(phone)
							uni.setStorageSync('password', password)




						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '请重新登录账号'
								})
							}
							setTimeout(() => {
								uni.hideToast()
								uni.navigateTo({
									url: '../login/login'
								})
							}, 2000)
						}
					},
					function(err) {
						that.btn_kg = 0
						if (err.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				)
			}
		}
	}
</script>

<style scoped>
	.tk_big_box {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, .5);
	}

	.tk_box {
		width: 400rpx;
		padding: 20upx;
		background: #FFF;
	}
	.tk_tit{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		margin-bottom: 30upx;
	}
	.tk_msg{
		font-size: 24upx;
		margin-bottom: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px solid #ddd;
	}
	.dy_btn{
		width: 150upx;
		height: 60upx;
		font-size: 24upx;
		border: 1px solid #ddd;
		color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dy_btn1{
		width: 152upx;height: 62upx;
		background: linear-gradient(90deg, rgba(61, 127, 255, 0.91), rgba(60, 142, 255, 0.91));
		color: #fff;
		border: 0;
	}

	.content_wrap {
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;
	}

	.cu_custom_box {
		z-index: 800;
	}

	.index_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 355upx;
		z-index: 0;
	}

	.head_box {
		position: fixed;
		width: 100%;
		top: 0;
		text-align: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		z-index: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;
	}

	.cur_H {
		background: #fff;
		color: #333;
	}



	
	.list_box {
		position: fixed;
		z-index: 1;
		box-sizing: border-box;

		width: 100%;
		/* height: 100%; */
		bottom: 0;
	}

	.list_box scroll-view {
		height: 100%;
	}

	.scroll_nbox {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.i_li {
		width: 100%;
		min-height: 259upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0upx rgba(49, 49, 49, 0.1);
		border-radius: 4upx;
		padding: 15upx;
		box-sizing: border-box;
	/* }

	.i_li+.i_li { */
		margin-top: 32upx;
	}
	.i_li_l{
		width: 173upx;
		height: 227upx;
		position: relative;
	}
	.i_li_l_img1{
		width: 100%;
		height: 100%;
	}
	.i_li_l_img2{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 44upx;
		height: 44upx;
		margin-top: -22upx;
		margin-left: -22upx;
		z-index: 9;
	}
	.i_li_msg{
		margin-left: 44upx;
		width: 420upx;
	}
	.i_li_msg .d1{
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}
	.i_li_msg .d2{
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 20upx;
	}
	.i_li_msg .d2 .d21{
		color: #2E95F5;
	}
	.i_li_msg .d2 .d22{
		color: #FD8D8D;
	}
	.index_btn{
		width: 193upx;
		height: 63upx;
		background: rgba(0, 207, 161, .77);
		border-radius: 32upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.index_btn1{
		background: rgba(46, 149, 245, 1);
	}
	.xiandan{
		width: 111upx;
		height: 111upx;
		/* background: #30A1FF; */
		/* box-shadow: 0px 3upx 7upx 0px rgba(0, 0, 0, 0.35); */
		border-radius: 50%;
		position: fixed;
		bottom: 50upx;
		/* #ifndef MP-WEIXIN */
		bottom:120upx;
		/* #endif */
		right: 30upx;
		z-index:900;
	}
</style>
