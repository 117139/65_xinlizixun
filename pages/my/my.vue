<template>
	<view class="content_wrap" :class="tk_show?'tk_class':''">
		<view class="head_box" :class="{'cur_H':PageScroll>10}" :style="style">
			<view class="my_tit_box" :style="style1">
				个人中心
			</view>
		</view>

		<view v-if="hasLogin" class="my_box">
			<image class="my_box_bg" src="/static/images/my_01.jpg"></image>
			<view class="user_box dis_flex aic">
				<view class="user_tx">
					<image class="user_tx" @tap="jump" data-url="/pages/my_msg/my_msg" :src="loginDatas.userInfo.avatar?getimg(loginDatas.userInfo.avatar):tximg"></image>


				</view>
				<view class="flex_1">
					<view class="user_name">{{loginDatas.userInfo.nickname}}</view>
					<view class="user_time" v-if="loginDatas.userInfo.real_phone">手机号：{{loginDatas.userInfo.real_phone}}</view>
				</view>
				<view class="iconfont iconxiugai user_edit" @tap="jump" data-url="/pages/my_msg/my_msg"></view>
			</view>
		</view>
		<view v-else class="my_box">
			<image class="my_box_bg" src="/static/images/my_01.jpg"></image>

			<view class="user_box dis_flex aic ju_c">
				<!-- <image class="user_tx" src="/static/logo.png"></image> -->
				<view class="flex_1 dis_flex aic ju_c">
					<view class="user_name" @tap="jump" data-url="../login/login">登录/注册</view>
				</view>
			</view>
		</view>
		<view class="my_list">
			<view class="my_li" @tap="jump" data-url="/pages/about/about?type=sm" :data-login='false' :data-haslogin='hasLogin'>
				<view class="my_icon"><text class="iconfont iconfabu"></text></view>
				<view class="flex_1">小程序说明</view>
				<text class="iconfont iconnext-m"></text>
			</view>
			<view class="my_li" @tap="jump" data-url="/pages/about/about?type=fw" :data-login='false' :data-haslogin='hasLogin'>
				<view class="my_icon"><text class="iconfont iconyinsi"></text></view>
				<view class="flex_1">用户服务条款</view>
				<text class="iconfont iconnext-m"></text>
			</view>
			<view class="my_li dis_flex aic ju_b">
				<view class="my_icon"><text class="iconfont iconguanyuwomen"></text></view>
				<view class="flex_1">联系方式</view>
				<view class="my_kxfs">
					<text v-if="kf_tel.body" @tap="call" :data-tel="kf_tel.body">电话:{{kf_tel.body}}</text>
					<br><text v-if="kf_email.body">邮箱:{{kf_email.body}}</text>
				</view>
			</view>
		</view>



		<!-- tk -->
		<view v-if="!tk_show" class="tk_box dis_flex_c">
			<view class="tk_off" @tap="tk_show=false"></view>
			<view class="tk_main">
				<view class="tk_top">
					<image class="tk_top_bg" src="../../static/images/yh_tk_02.png" mode=""></image>
					<view class="tk_top_box">
						<scroll-view class=" scroll_list" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
						 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
						 @refresherabort="onAbort" @scrolltolower="getdata">
							<view class="scroll_list_box">
								<view class="scroll_top"></view>
								<view class="yhq_li " v-for="(item,index) in yh_list">
									<image class="yhq_bg" src="../../static/images/yh_bg_03.png" mode="aspectFill"></image>
									<view class="dis_flex">
										<view class="yhq_l dis_flex_c ju_c aic">
											<view v-if="item.type==1" class="yhql_pri flex_1 dis_flex aife">￥<text>{{item.pri1}}</text></view>
											<view v-if="item.type==2" class="yhql_pri flex_1 dis_flex aic ju_c">
												<view class="dis_flex aife"><text>{{item.pri1}}</text>折</view>
											</view>
											<view v-if="item.type==1" class="yhql_text">满{{item.pri}}元可用</view>
										</view>
										<view class="yhq_msg">
											<view class="yh_msg dis_flex aife ju_b">
												<view class="yh_msg_l">
													<view class="yh_msg_d1">{{item.name}}</view>
													<view class="yh_msg_d2">{{item.time}}</view>
												</view>
												<view class="yh_btn">立即领取</view>

											</view>
											<view class="yhq_sm">{{item.sm}}</view>
										</view>
									</view>

								</view>
								<view v-if="fw1.length==0" class="zanwu">暂无数据</view>
								<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
							</view>
						</scroll-view>

					</view>
				</view>
				<view class="dis_flex aic ju_c" style="width: 100%;">
					<view class="tk_bottom iconfont icon-Close" @tap="tk_show=false"></view>
				</view>
			</view>
			<view class="" style="height: 20upx;" @tap="tk_show=false"></view>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btnkg: 0,
				time_zz: '你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: '',

				PageScroll: '',
				fk_show: false,
				tk_show: true,
				tximg: '/static/logo.png',
				
				
				kf_tel:'',
				kf_email:''
			};
		},
		onLoad() {
			
			that=this
			that.getdata()
			// this.login('问心')
			// var datas={
			// 	name:'问心',
			// 	img_url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiaCBO9f33YY9M3aWrjN2NWicT1n96dGNBQSzSKEpwXSn95gsPNNcM2IqOmoAvAbDHtxFdf9uU7d5w/132'
			// }
			// this.logindata(datas)

		},
		onShow() {
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop

		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),

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
				var style = `top:${StatusBar}px;`;

				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;

				return style
			}
		},

		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			call(str) {
				service.call(str)
			},
			getdata(num) {
				var that = this
				
				var datas = {
					keyword: 'tel,email',
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
				
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
						that.kf_tel=datas.tel[0]
						that.kf_email=datas.email[0]

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取失败'
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

			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},

		}
	}
</script>

<style scoped>
	.my_tit_box {
		width: calc(100% - 440rpx);
		position: absolute;
		text-align: center;
		/* width: calc(100% - 340rpx); */
		left: 0;

		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}







	.content_wrap {
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;
		background: #EDEDED;
	}

	.cu_custom_box {
		z-index: 99999;
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
		left: 0;
		/* text-align: center; */
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		transition: all .5s;


		padding-right: 220rpx;
		-webkit-box-shadow: 0rpx 0rpx 0rpx;
		box-shadow: 0rpx 0rpx 0rpx;
		z-index: 9999;
	}

	.cur_H {
		background: #fff;
		color: #333;
	}


	.my_box {
		width: 100%;

		height: 354upx;
		position: relative;
	}

	.my_box_bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 366upx;
		z-index: 0;
	}

	.user_box {
		position: absolute;
		top: 252upx;
		left: 30upx;
		width: 690upx;
		height: 195upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 40upx;
	}

	.user_tx {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	view.user_tx {
		margin-right: 58upx;
		position: relative;
	}

	.user_set {
		position: absolute;
		width: 35upx;
		height: 35upx;
		bottom: 0;
		right: 0;
		background: #3775F6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user_set text {
		font-size: 16upx;
		color: #fff;
	}

	.user_name {
		font-size: 40upx;
		font-weight: bold;
		line-height: 90upx;
		color: #333333;
	}

	.user_time {
		font-size: 30upx;
		color: #666666;
	}

	.my_sq {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 10upx;
	}

	.my_sq image {
		width: 100%;
		height: 108upx;
	}

	.my_list {
		width: 100%;
		/* min-height: calc(100vh - 354rpx - 93upx - 254upx); */
		padding: 95upx 30upx 0upx;
		box-sizing: border-box;
		background: #fff;
	}

	.my_li {
		width: 100%;
		height: 122upx;
		/* border-bottom: 1px solid #EDEDED; */
		display: flex;
		align-items: center;

		font-size: 30upx;
		color: #333333;
		border-bottom: 1px solid #EDEDED;
	}

	.my_icon {
		width: 54upx;
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #999;
	}

	.my_icon>.iconfont {
		font-size: 35upx;
		color: #999;
	}

	.my_li>.iconfont {
		font-size: 22upx;
		color: #999;
	}

	.zzc_box {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fk_box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		width: 600upx;
		height: 302upx;
		background: #FFFFFF;
		border-radius: 20upx;
	}

	.fk_box .d1 {
		font-size: 32upx;
		color: #444;
		margin: 25upx auto;
	}

	.fk_box .d2 {
		font-size: 28upx;
		color: #666;
		margin: 25upx auto;
	}

	.user_edit {
		font-size: 34upx;
		color: #30A1FF;
	}

	.my_li_r {
		font-size: 26upx;
		color: #999999;
	}

	button::after {
		display: none;

	}

	button {
		text-align: left;
		background: rgba(0, 0, 0, 0);
		padding: 0;
	}

	.my_kxfs {
		text-align: right;

		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
