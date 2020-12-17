<template>
	<view>
		<view class="wq_list">
			<block v-for="(item,index) in datas">
				<view v-if="type==0" class="wq_li" @tap="jump" :data-url="'/pages/fx_jieguo/fx_jieguo?id='+item.id">
					<view class="wq_L">
						<view class="oh2 wq_tit">北京大学生的就业时间与高等教育改革调研研燕究与分分析。</view>
						<view class="wq_time">2020-09-23 12:00:00</view>
					</view>
					<view class="wq_R">
						<text style="color: #2194FF;">已分析</text>
					</view>
				</view>
				<view v-if="type==1" class="wq_li" @tap="jump" :data-url="'/pages/dati/dati?id='+item.id">
					<view class="wq_L">
						<view class="oh2 wq_tit">北京大学生的就业时间与高等教育改革调研研燕究与分分析。</view>
						<view class="wq_type">
							<text v-if="index==0">未参与</text>
							<text v-else style="color: #2194FF;">已参与</text>
						</view>
					</view>
				</view>
			</block>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view v-if="data_last" class="data_last">没有更多了~~~</view>
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
				type:0,
				data_last:false,
				page:1,
				size:20,
				datas:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				btnkg:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			if(option.type==1){
				this.type=1
				// uni.setNavigationBarTitle({
				// 	title:'视频分析'
				// })
			}
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		methods: {
			onRetry(){
				this.page=1
				this.data_last=false
				this.datas=[]
				this.getdata()
			},
			getdata() {
				var that = this
				if(this.datas.length>40){
					that.data_last = true
					return
				}
				var datas=[1,1,1,1,1,1,1,1,1,1,1]
				that.datas = that.datas.concat(datas)
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
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
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
		}
	}
</script>

<style scoped>
	.wq_list{
		width: 100%;
		padding: 30upx;
	}
	.wq_li{
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
	.wq_L{
		width: 560upx;
	}
	.wq_R{
		width: 90upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
	}
	.wq_tit{
		width: 560upx;
		line-height: 40upx;
		margin-bottom: 20upx;
		
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
	}
	.wq_time{
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.wq_type{
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #F16583;
	}
</style>
