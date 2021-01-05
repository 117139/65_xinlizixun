<template>
	<view class="h_main" style="min-height: 100vh;background-color: #F6F7F9;">
		<view class="mymsg_li dis_flex aic ju_b">
			<view class="msg_l">头像</view>
			<avatar stretch="short" inner="true" selWidth="400upx" selHeight="400upx" @upload="myUpload" :avatarSrc="getimg(loginDatas_data.avatar)"
			 avatarStyle="width: 100upx; height: 100upx; border-radius: 100%;">
			</avatar>
		</view>
		<view class="mymsg_list">
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">姓名</view>
				<input class="msg_r" type="text" placeholder="请输入" v-model="loginDatas_data.real_name">
			</view>
			<picker mode="date" :value="date" :start="startDate" @change="bindDateChange">
				<view class="mymsg_li dis_flex aic ju_b">
					<view class="msg_l">生日</view>
					<!-- <input class="msg_r" type="text" placeholder="请选择" disabled="true" v-model="getBirthday(loginDatas_data.birthday)"> -->
					<input class="msg_r" type="text" placeholder="请选择" disabled="true" v-model="loginDatas_data.birthday">
				</view>
			</picker>
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">部门</view>
				<input class="msg_r" type="text" placeholder="请输入" v-model="loginDatas_data.department">
			</view>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="mymsg_li dis_flex aic ju_b">
					<view class="msg_l">学历</view>
					<input class="msg_r" type="text" placeholder="请选择" disabled="true" v-model="loginDatas_data.education_background">
				</view>
			</picker>
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">籍贯</view>
				<input class="msg_r" type="text" placeholder="请输入" v-model="loginDatas_data.native_place">
			</view>
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">手机</view>
				<input class="msg_r" type="number" placeholder="请输入" v-model="loginDatas_data.real_phone">
			</view>
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">邮箱</view>
				<input class="msg_r" type="text" placeholder="请输入" v-model="loginDatas_data.email">
			</view>
			<view class="mymsg_li dis_flex aic ju_b">
				<view class="msg_l">住址</view>
				<input class="msg_r" type="text" placeholder="请输入" v-model="loginDatas_data.address">
			</view>
			<!-- <picker class="w100" :value="getregion(loginDatas_data)" mode="region" @change="getaddress">
				<view class="mymsg_li dis_flex aic ju_b">
					<view class="msg_l">所在地区</view>
					<input class="msg_r" type="text" placeholder="请输入" disabled="" :value="loginDatas_data.region">
				</view>
			</picker> -->

		</view>
		<view class="sub_btn_box" >
			<view class="sub_btn" @tap="sub">确定</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btn_kg: 0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				loginDatas_data: {},
				array: [
					'初中及以下',
					'高中/中专',
					'大专',
					'本科',
					'硕士',
					'博士',
				],
				startDate: '1770',

			}
		},
		components: {
			avatar
		},
		onLoad() {
			var that = this
			this.loginDatas_data=JSON.parse(JSON.stringify(that.loginDatas.userInfo))
			// Vue.set(that.loginDatas_data, 'img_url', that.loginDatas.img_url)
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			}
		},
		methods: {
			...mapMutations(['login', 'logout', 'logindata']),
			bindDateChange(e) {
				var that = this
				console.log(e.detail.value)
				Vue.set(that.loginDatas_data, 'birthday', e.detail.value)
			},
			bindPickerChange(e) {
				var that = this
				console.log(e.detail.value)
				Vue.set(that.loginDatas_data, 'education_background', that.array[e.detail.value])
			},
			getimg(img) {
				return service.getimg(img)
			},
			getaddress(e) {
				var that = this
				console.log(e.detail.value)
				// this.region=e.detail.value
				var region = e.detail.value
				region = region.join(',')
				Vue.set(that.loginDatas_data, 'region', region)
			},
			getregion(loginDatas_data) {
				var region
				if (!loginDatas_data || !loginDatas_data.region || loginDatas_data.region.length == 0) {
					return ''
				}
				region = loginDatas_data.region.split(',')
				return region
			},
			getBirthday(time){
				
			},
			sub() {
				var that = this
				if (!this.loginDatas_data.real_name) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的姓名'
					})
					return
				}
				if (!this.loginDatas_data.birthday) {
					uni.showToast({
						icon: 'none',
						title: '请选择您的生日'
					})
					return
				}
				if (!this.loginDatas_data.department) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的部门'
					})
					return
				}
				if (!this.loginDatas_data.education_background) {
					uni.showToast({
						icon: 'none',
						title: '请选择您的学历'
					})
					return
				}
				if (!this.loginDatas_data.native_place) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的籍贯'
					})
					return
				}
				if (!this.loginDatas_data.real_phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的手机'
					})
					return
				}
				if (this.loginDatas_data.real_phone == '' || !(/^1\d{10}$/.test(this.loginDatas_data.real_phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!this.loginDatas_data.email) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的邮箱'
					})
					return
				}
				if (!this.loginDatas_data.address) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的住址'
					})
					return
				}
				//my/setInfo
				var datas = {
					token: that.loginDatas.token,
					avatar: that.loginDatas_data.avatar,
					real_name: that.loginDatas_data.real_name,
					birthday: that.loginDatas_data.birthday,
					department: that.loginDatas_data.department,
					education_background: that.loginDatas_data.education_background,
					native_place: that.loginDatas_data.native_place,
					phone: that.loginDatas_data.real_phone,
					email: that.loginDatas_data.email,
					address: that.loginDatas_data.address,
				}
				console.log(datas)
				var jkurl = '/my/setInfo'
				
				service.P_post(jkurl, datas).then(res => {
				
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						})
						service.wxlogin()
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
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
						title: '操作失败'
					})
				})
				
			


			},
			myUpload(rsp) {
				var that = this
				var tximg = rsp.path; //更新头像方式一
				// Vue.set(that.loginDatas_data,'avatarurl',tximg)
				// return
				uni.uploadFile({
					url: service.IPurl + '/upload', //仅为示例，非真实的接口地址
					filePath: tximg,
					name: 'file',
					formData: {
						token: that.loginDatas.token,
						type:1
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
						var ndata = JSON.parse(uploadFileRes.data)
						if (ndata.code == 1) {
							Vue.set(that.loginDatas_data, 'avatar', ndata.data)

						}
					}
				});
				//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			onGetPhoneNumber: function(e) {
				var that = this
				console.log(e.detail.errMsg)
				console.log(e.detail.iv)
				console.log(e.detail.encryptedData)
				console.log(e.detail.encryptedData)
				// return
				if (e.detail.iv) {
					//用户按了允许授权按钮后需要处理的逻辑方法体
					wx.login({
						success: (res) => {
							if (res.code) { //微信登录成功 已拿到code  
								console.log(e.detail.iv)
								var token = uni.getStorageSync('token')
								var datas = {
									token: token,
									encryptedData: e.detail.encryptedData,
									iv: e.detail.iv,
									code: res.code,
									type: 2
								}
								//selectSaraylDetailByUserCard
								var jkurl = '/user/decodePhone'

								service.P_post(jkurl, datas).then(res => {

									that.btn_kg = 0
									console.log(res)
									if (res.code == 1) {
										var datas = res.data.data
										console.log(typeof datas)
										console.log(datas)

										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										service.wxlogin()
									} else {
										that.btnkg = 0
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

									uni.showToast({
										icon: 'none',
										title: '操作失败'
									})

								})

							} else {
								console.log('登录失败！' + res.errMsg)
							}
						}
					})


				} else {
					//用户按了拒绝按钮
					uni.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法获取手机号，请点击返回授权!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击了“返回授权”')
							}
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	.h_main {
		/* background: #fff !important; */
		height: 100%;
	}

	.mymsg_li {
		width: 100%;
		height: 118upx;
		padding: 15upx 30upx;
		background: #fff;
	}

	.msg_l {
		font-size: 30upx;
		color: #444;
		width: 6em;
		flex: none;
	}

	.msg_r {
		font-size: 28upx;
		color: #444;
		text-align: right;
		flex: 1;
	}

	.mymsg_list {
		border-top: 8upx solid #F6F7F9;
		background: #fff;
		padding: 0 30upx;
	}

	.mymsg_list .mymsg_li {
		padding: 15upx 0;
		border-bottom: 1px solid #F4F4F4;
	}
	.sub_btn_box{
		padding: 50upx 0;
		width: 100%;
		background-color: #F6F7F9;
	}
	.sub_btn {
		margin: 0 auto;
		width: 576upx;
		height: 72upx;
		background: #30A1FF;
		border-radius: 36upx;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FDFDFD;
	}

	button::after {
		display: none;

	}

	button {
		text-align: left;
	}
</style>
