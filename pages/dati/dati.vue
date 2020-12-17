<template>
	<view>
		<view class="dati_box">
			<view class="dati_tit">THE BIG FIVE 大五类人格测试（ 麻省理工）</view>
			<view class="dati_tip">
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
				{{cur+1}}.{{datas[cur].title}}
			</view>
			<view class="dati_ans_list dis_flex aic ju_b" style="margin-bottom: 100upx;">
				<view class="dis_flex aic ans_lis">
					<view class="ans_li" @tap="set_ans(1)">
						<text v-if="datas[cur].active==1" class="iconfont iconyuanquan"></text>
						<text v-else class="iconfont iconyuanquan-copy"></text>
					</view>
					<view class="ans_li ans_li_z" @tap="set_ans(2)">
						<text v-if="datas[cur].active==2" class="iconfont iconyuanquan"></text>
						<text v-else class="iconfont iconyuanquan-copy"></text>
					</view>
					<text class="ans_text" style="text-align: left;">不同意</text>
				</view>
				<view class="dis_flex aic ans_lis">
					<view class="ans_li ans_li1 ans_li_z" @tap="set_ans(3)">
						<text v-if="datas[cur].active==3" class="iconfont iconyuanquan"></text>
						<text v-else class="iconfont iconyuanquan-copy"></text>
					</view>
					<view class="ans_li ans_li1" @tap="set_ans(4)">
						<text v-if="datas[cur].active==4" class="iconfont iconyuanquan"></text>
						<text v-else class="iconfont iconyuanquan-copy"></text>
					</view>
					<text class="ans_text" style="text-align: right;">同意</text>
				</view>
			</view>
			<view class="cz_btns dis_flex aic ju_b">
				<view class="jump_btn" @tap="pro_perv">上一步</view>
				<view v-if="cur<datas.length-1" class="jump_btn" @tap="pro_next">下一步</view>
				<view v-else class="jump_btn" @tap="pro_next">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
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
				datas:[
					{
						title:"我认为自己是一个易于紧张的人1"
					},
					{
						title:"我认为自己是一个易于紧张的人2"
					},
					{
						title:"我认为自己是一个易于紧张的人3"
					},
					{
						title:"我认为自己是一个易于紧张的人4"
					},
					{
						title:"我认为自己是一个易于紧张的人5"
					},
					{
						title:"我认为自己是一个易于紧张的人6"
					},
					{
						title:"我认为自己是一个易于紧张的人7"
					},
					{
						title:"我认为自己是一个易于紧张的人8"
					},
				],
				btnkg:false,
				cur:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style1(){
				
				var cur_num=this.cur/this.datas.length
				if(this.datas[this.cur].active>0){
					cur_num=(this.cur*1+1)/this.datas.length
				}
				var style = `width:calc(100% * ${cur_num});`;
				
				return style
			},
			style2(){
				
				var cur_num=this.cur/this.datas.length
				if(this.datas[this.cur].active>0){
					cur_num=(this.cur*1+1)/this.datas.length
				}
				var style = `left:calc(100% * ${cur_num});`;
				
				return style
			},
			style3(){
				
				var cur_num=this.cur
				if(this.datas[this.cur].active>0){
					cur_num=this.cur*1+1
				}
				cur_num=cur_num.toFixed(0)
				// var style = `left:calc(100% * ${cur_num});`;
				
				return cur_num
			},
		},
		methods: {
			set_ans(num){
				var that=this
				Vue.set(that.datas[that.cur],'active',num)
			},
			pro_next(){
				if(this.datas[this.cur].active>0){
					if(this.cur<this.datas.length-1){
						this.cur++
					}else{
						uni.showModal({
						    title: '提示',
						    content: '是否提交',
						    success: function (res) {
						        if (res.confirm) {
						            // console.log('用户点击确定');
												uni.showToast({
													icon:'none',
													title:'提交成功'
												})
												setTimeout(()=>{
													uni.switchTab({
														url:'../index/index'
													})
												},1000)
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'请先答题'
					})
				}
				
			},
			pro_perv(){
				if(this.cur>0){
					this.cur--
				}
			}
		}
	}
</script>

<style scoped>
	.dati_box{
		width: 100%;
		padding: 30upx;
	}
	.dati_tit{
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #464646;
		margin-bottom: 30upx;
	}
	.dati_tip{
		line-height: 55upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #464646;
	}
	.dati_pro{
		width: 100%;
		height: 10upx;
		background: #F5F5F5;
		border-radius: 4upx;
		margin: 50upx auto;
		position: relative;
	}
	.dati_1{
		width: 0;
		height: 10upx;
		background: #30A1FF;
		border-radius: 4upx;
	}
	.dati_y{
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
		border:6upx solid #F6F6F6;
		background: #fff;
		color: #5AB3C3;
		font-size: 18upx;
		line-height: 18upx;
	}
	.dati_title{
		margin: 50upx auto;
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #464646;
		text-align: center;
	}
	.ans_li{
		font-size: 40upx;
		color: #498E6E;
		margin: 0 24upx;
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.ans_li .iconfont{
		font-size: 40upx;
	}
	.ans_li1{
		color: #91617B;
	}
	.ans_lis{
		position: relative;
	}
	.ans_text{
		position: absolute;
		bottom: -60upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #464646;
		left: 0;
		right: 0;
	}
	.ans_li_z,.ans_li_z .iconfont{
		font-size: 30upx;
	}
	.cz_btns{
		margin-top: 100upx;
	}
	.jump_btn{
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
