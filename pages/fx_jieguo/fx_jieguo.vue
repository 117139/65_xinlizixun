<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0"  class="warp_box">
			<view class="fx_box">
				<image class="fx_top" src="../../static/images/fx_bg_03.png" mode=""></image>
				<view class="fx_main">
					<view class="fx_tit">分析结果</view>
					<scroll-view class="fx_scroll" scroll-y="true">
						<block v-if="datas">
							<view v-html="get_fwb(datas)"></view>
							<!-- 1、绊脚石：这种人害人不浅的目地，是以便让自身的日常生活或是境遇，变好，境况有一定的提高。在她们眼里遇害的人是自身取得成功道上的绊脚石，根据陷害与自身有竞争能力的人，来考虑的自身的冲动。
							<br>2、妒忌：这种人陷害他人，便是由于本身的品性不太好，小肚鸡肠，见不可他人好，见到比自身出色的人，如同摧毁。这种人的心里是不自信的，妒忌让她们失去理智，作出一些害人不浅不自私自利的事儿。
							<br>心理学专家觉得，一个人要想陷害你，并不会没什么目地，也不会随便刚开始，她们以便让自身的陷害更为的极致，以便保证做错事以后本身的安全性，都是提早搞好这3个埋下伏笔： -->
						</block>
						<view  v-else class="zanwu dis_flex_c aic">
							<image class="data_null" src="../../static/images/data_null.png" style="margin-top: 50upx;" mode="aspectFill"></image>
							<text style="line-height: 30upx;">暂无结果</text>
						</view>
					</scroll-view>
					<view v-if="type==0" class="go_btn" @tap="jump" :data-url="'/pages/wenquan_list/wenquan_list?type=1&video_id='+video_id">继续参与问卷调查</view>
					<view v-if="type==1" class="go_btn" @tap="jump" :data-url="'/pages/wenquan_list/wenquan_list?type=1&video_id='+video_id">参与问卷调查</view>
					<view v-if="type==1" class="go_tip">参加调查问卷能够进一步准确的心理分析</view>
				</view>
				<image class="fx_top fx_bottom" src="../../static/images/fx_bg_06.png" mode=""></image>
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
	var that 
	export default {
		data() {
			return {
				type:0,
				htmlReset:-1,
				id:'',
				video_id:'',
				datas:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that =this
			this.id=option.id
			this.video_id=option.video_id
			if(option.type==1){
				this.type=1
				
				uni.setNavigationBarTitle({
					title:'视频分析'
				})
			}
			this.getdata()
		},
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(num) {
				var that = this
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
					video_id:that.video_id
				}
				if (that.btn_kg == 1) {
					return
				}
				that.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/my/getSurveyShow'
				if(that.type==1){
					jkurl = '/issue/show'
				}
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						if(that.type==1){
							that.datas = datas.body||''
						}else{
							that.datas = datas.result||''
						}
					} else {
						that.htmlReset=1
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
						that.htmlReset=1
					that.btn_kg = 0
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
		}
	}
</script>

<style scoped>
	.warp_box{
		height: 100vh;
		background: linear-gradient(135deg, #77A9FE, #7696F9);
	}
	.fx_box{
		display: flex;
		flex-direction: column;
		width: 690upx;
		height: 100vh;
		margin: 0 auto;
	}
	.fx_top{
		width: 100%;
		height: 190upx;
		flex:none;
	}
	.fx_bottom{
		width: 100%;
		height: 100upx;
		flex:none;
	}
	.fx_main{
		width: 100%;
		flex: 1;
		position: relative;
		background: #fff;
		padding: 30upx;
	}
	.fx_tit{
		height: 30upx;
		font-size: 30upx;
		line-height: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		padding-left: 15upx;
		position: relative;
		margin-bottom: 30upx;
	}
	.fx_tit::before{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 4upx;
		height: 30upx;
		background: #77A7FD;
	}
	.fx_scroll{
		position: absolute;
		width: 630upx;
		top: 90upx;
		left: 30upx;
		right: 30upx;
		bottom: 140upx;
		
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}
	br{
		height: 20upx;
	}
	.go_btn{
		position: absolute;
		bottom: 50upx;
		left: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 516upx;
		height: 73upx;
		margin-left: -258upx;
		background: #30A1FF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 37upx;
		
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.go_tip{
		position: absolute;
		bottom: 10upx;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ACACAC;
	}
</style>
