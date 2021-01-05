<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="dati_box" v-if="datas">
				<view class="dati_tit">{{datas.title}}</view>
				<view class="dati_tip" v-html="get_fwb(datas.description)">
					测试前有三个注意事项：
					<br>1.在10分钟内不假思索完成。
					<br>2.真实呈现自己，而非期待的样子。
					<br>3.尽量避免“中立”的答案。
				</view>
				<view class="dati_pro">
					<view class="dati_1" :style="style1"></view>
					<view class="dati_y" :style="style2">{{style3}}</view>
				</view>
				<view class="dati_title">
					{{cur+1}}.{{question[cur].title}}
				</view>
				<view v-if="question.length>0" class="dati_ans_list dis_flex aic ju_b" style="margin-bottom: 100upx;">
					<view class="dis_flex aic ans_lis">
						<view v-for="(item,index) in question[cur].score" class="ans_li" :class="index>0&&index<question[cur].score.length-1? 'ans_li_z':''" @tap="set_ans(item)">
							<text v-if="question[cur].active==item" class="iconfont iconyuanquan"></text>
							<text v-else class="iconfont iconyuanquan-copy"></text>
						</view>
						<!-- <view class="ans_li ans_li_z" @tap="set_ans(2)">
							<text v-if="question[cur].active==2" class="iconfont iconyuanquan"></text>
							<text v-else class="iconfont iconyuanquan-copy"></text>
						</view> -->
						
					<!-- </view>
					<view class="dis_flex aic ans_lis"> -->
						
						<text class="ans_text" style="text-align: left;">不同意</text>
						<text class="ans_text" style="text-align: right;">同意</text>
					</view>
				</view>
				<view class="cz_btns dis_flex aic ju_b">
					<view class="jump_btn" @tap="pro_perv">上一步</view>
					<view v-if="cur<question.length-1" class="jump_btn" @tap="pro_next">下一步</view>
					<view v-else class="jump_btn" @tap="pro_next">提交</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				type: 0,
				id:'',
				video_id:'',
				data_last: false,
				page: 1,
				size: 20,
				htmlReset:-1,
				datas:'',
				question: [],
				btnkg: false,
				cur: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style1() {
				if(this.question.length==0){
					return
				}
				var cur_num = this.cur / this.question.length
				if (this.question[this.cur].active > -1) {
					cur_num = (this.cur * 1 + 1) / this.question.length
				}
				var style = `width:calc(100% * ${cur_num});`;

				return style
			},
			style2() {
			
				if(this.question.length==0){
					return
				}
				var cur_num = this.cur / this.question.length
				if (this.question[this.cur].active > -1) {
					cur_num = (this.cur * 1 + 1) / this.question.length
				}
				var style = `left:calc(100% * ${cur_num});`;

				return style
			},
			style3() {

				if(this.question.length==0){
					return
				}
				var cur_num = this.cur
				if (this.question[this.cur].active > -1) {
					cur_num = this.cur * 1 + 1
				}
				cur_num = cur_num.toFixed(0)
				// var style = `left:calc(100% * ${cur_num});`;

				return cur_num
			},
		},
		onLoad(option) {
			that=this
			this.id=option.id
			this.video_id=option.video_id
			this.getdata()
		},
		methods: {
			getdata() {
				var that = this

				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
					video_id:that.video_id
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/survey/show'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)

						that.datas = datas
						that.question = datas.question
						// Vue.set(that.question[0], 'active', num)
					} else {
						that.htmlReset = 1
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
					that.htmlReset = 1
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},
			get_fwb(str){
				return service.get_fwb(str)
			},
			set_ans(num) {
				var that = this
				Vue.set(that.question[that.cur], 'active', num)
			},
			pro_next() {
				if (this.question[this.cur].active > -1) {
					if (this.cur < this.question.length - 1) {
						this.cur++
					} else {
						uni.showModal({
							title: '提示',
							content: '是否提交',
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
									var body=[]
									for(var i=0;i<that.question.length;i++){
										var new_score=that.question[i].active-1
										var new_a={
											id:that.question[i].id,
											title:that.question[i].title,
											score:that.question[i].active,
											type:that.question[i].active>1? 1:0
										}
										body.push(new_a)
									}
									console.log(body)
									var datas = {
										token: that.loginDatas.token || '',
										id: that.id,
										body:JSON.stringify(body),
										video_id:that.video_id
									}
									if (that.btnkg == 1) {
										return
									}
									that.btnkg = 1
									//selectSaraylDetailByUserCard
									var jkurl = '/survey/save'
									uni.showLoading({
										title: '正在获取数据'
									})
									var page_that = that.page
									service.P_post(jkurl, datas).then(res => {
										that.btnkg = 0
										console.log(res)
										if (res.code == 1) {
											that.htmlReset = 0
											var datas = res.data
											console.log(typeof datas)
									
											if (typeof datas == 'string') {
												datas = JSON.parse(datas)
											}
											console.log(res)
											uni.showToast({
												icon: 'none',
												title: '提交成功'
											})
											setTimeout(() => {
												uni.redirectTo({
													url:'/pages/fx_jieguo/fx_jieguo?id='+datas.id+'&video_id='+that.video_id
												})
												// uni.switchTab({
												// 	url: '../index/index'
												// })
											}, 1000)
										} else {
											that.htmlReset = 1
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
										that.htmlReset = 1
										that.btnkg = 0
										console.log(e)
										uni.showToast({
											icon: 'none',
											title: '获取数据失败'
										})
									})
									
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先答题'
					})
				}

			},
			pro_perv() {
				if (this.cur > 0) {
					this.cur--
				}
			}
		}
	}
</script>

<style scoped>
	.dati_box {
		width: 100%;
		padding: 30upx;
	}

	.dati_tit {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #464646;
		margin-bottom: 30upx;
	}

	.dati_tip {
		line-height: 55upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #464646;
	}

	.dati_pro {
		width: 100%;
		height: 10upx;
		background: #F5F5F5;
		border-radius: 4upx;
		margin: 50upx auto;
		position: relative;
	}

	.dati_1 {
		width: 0;
		height: 10upx;
		background: #30A1FF;
		border-radius: 4upx;
	}

	.dati_y {
		position: absolute;
		top: -14upx;
		margin-left: -19upx;
		width: 38upx;
		height: 38upx;
		border-radius: 50%;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 6upx solid #F6F6F6;
		background: #fff;
		color: #5AB3C3;
		font-size: 18upx;
		line-height: 18upx;
	}

	.dati_title {
		margin: 50upx auto;
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #464646;
		text-align: center;
	}

	.ans_li {
		font-size: 40upx;
		color: #498E6E;
		margin: 0 24upx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.ans_li .iconfont {
		font-size: 40upx;
	}

	.ans_li1 {
		color: #91617B;
	}

	.ans_lis {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.ans_text {
		position: absolute;
		bottom: -60upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #464646;
		left: 0;
		right: 0;
	}

	.ans_li_z,
	.ans_li_z .iconfont {
		font-size: 30upx;
	}

	.cz_btns {
		margin-top: 100upx;
	}

	.jump_btn {
		width: 289upx;
		height: 73upx;
		background: #30A1FF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 37upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
