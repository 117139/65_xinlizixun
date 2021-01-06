<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="wq_list">
				<block v-for="(item,index) in datas">
					<block v-if="type==0">
						<view v-if="item.is_take==1" class="wq_li" @tap="jump" :data-url="'/pages/fx_jieguo/fx_jieguo?id='+item.id+'&video_id='+video_id">
							<view class="wq_L">
								<view class="oh2 wq_tit">{{item.title}}</view>
								<!-- <view class="wq_time">{{gettime(item.create_time)}}</view> -->
								<view class="wq_time">{{item.create_time}}</view>
							</view>
							<view class="wq_R">
								<text  style="color: #2194FF;">已分析</text>
							</view>
						</view>
						<view v-else class="wq_li" @tap="jump" :data-url="'/pages/dati/dati?id='+item.id+'&video_id='+video_id">
							<view class="wq_L">
								<view class="oh2 wq_tit">{{item.title}}</view>
								<!-- <view class="wq_time">{{gettime(item.create_time)}}</view> -->
								<view class="wq_time">{{item.create_time}}</view>
							</view>
							<view class="wq_R">
								<text>未分析</text>
							</view>
						</view>
					</block>
					<block v-if="type==1">
						<!-- <view  v-if="item.take==1" class="wq_li"  @tap="jump" :data-url="'/pages/fx_jieguo/fx_jieguo?id='+item.id+'&video_id='+video_id"> -->
						<view  v-if="item.take==1" class="wq_li" @tap='join_tip'>
							<view class="wq_L">
								<view class="oh2 wq_tit">{{item.title}}</view>
								<view class="wq_type">
									<text style="color: #2194FF;">已参与</text>
								</view>
							</view>
						</view>
						<view  v-else class="wq_li" @tap="jump" :data-url="'/pages/dati/dati?id='+item.id+'&video_id='+video_id">
							<view class="wq_L">
								<view class="oh2 wq_tit">{{item.title}}</view>
								<view class="wq_type">
									<text>未参与</text>
								</view>
							</view>
						</view>
					</block>
				</block>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">没有更多了~~~</view>
			</view>
		</block>
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
				type: 0,
				data_last: false,
				video_id:'',
				page: 1,
				size: 20,
				htmlReset: -1,
				datas: [],
				btnkg: false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that=this
			this.video_id=option.video_id
			if (option.type == 1) {
				this.type = 1
				
				// uni.setNavigationBarTitle({
				// 	title:'视频分析'
				// })
			}
			this.onRetry()
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		methods: {
			join_tip(){
				uni.showToast({
					icon:'none',
					title:'已参与过该调查'
				})
			},
			onRetry() {
				this.page = 1
				this.data_last = false
				this.datas = []
				this.getdata()
			},
			getdata() {
				var that = this

				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size,
					video_id:that.video_id
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/survey/list'
				if (that.type == 0) {
					jkurl="/my/getSurveyList"
				}
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

						if (page_that == 1) {

							that.datas = datas.data
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas.data)
						}
						that.page++

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
								title: '操作失败'
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

			jump(e) {
				var that = this
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
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
			gettime(time){
				return service.gettime(time)
			}
		}
	}
</script>

<style scoped>
	.wq_list {
		width: 100%;
		padding: 30upx;
	}

	.wq_li {
		width: 100%;
		min-height: 160upx;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 4upx;
		margin-bottom: 30upx;
		padding: 18upx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.wq_L {
		width: 560upx;
	}

	.wq_R {
		width: 90upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.wq_tit {
		width: 560upx;
		line-height: 40upx;
		height: 80upx;
		margin-bottom: 20upx;

		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}

	.wq_time {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.wq_type {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #F16583;
	}
</style>
