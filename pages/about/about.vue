<template>
	<view class="content_wrap">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view v-if="datas" class="xieyi_main" v-html="get_fwb(datas)"></view>
		</block>
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
				title:'隐私协议',
				type:0,
				datas:'',
				htmlReset:-1
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
			
			
			if(Option.type=='yszc'){
				that.type=Option.type
				that.title='隐私政策'
				uni.setNavigationBarTitle({
					title:'隐私政策'
				})
				this.getdata('yszc')
			}
			if(Option.type=='about'){
				that.type=Option.type
				that.title='关于我们'
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
				console.log(that.fj_data)
			}
			if(Option.type=='sm'){
				that.type=Option.type
				that.title='小程序说明'
				uni.setNavigationBarTitle({
					title:'小程序说明'
				})
				this.getdata('specification')
			}
			if(Option.type=='fw'){
				that.type=Option.type
				that.title='用户服务条款'
				uni.setNavigationBarTitle({
					title:'用户服务条款'
				})
				this.getdata('terms_of_service')
			}
			if(Option.type==3){
				that.type=Option.type
				that.title='用户协议'
				this.getdata('yhxy')
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','fj_data']),
		},
		
		methods: {
			get_fwb(str){
				return service.get_fwb(str)
			},
			getdata(keyword){
				
				///api/info/list
				var that =this
				var data = {
					keyword:keyword
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/info/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if(datas.length>0){
							that.datas = datas[0].body
						}else{
							that.datas = datas.body
						}
						
						console.log(datas)
							
							
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
								title: '操作失败'
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
			}
		}
	}
</script>

<style scoped>
	.cu-custom{
		border-bottom: 1px solid #DBDBDB;
	}
	 .xieyi_main{
		 width: 100%;
		 padding: 10px;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
		 font-size: 28upx;
		 color: #444;
	 }
	 
</style>
