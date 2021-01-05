<template>
	<view>
		<video :src="getimg(src)"  :poster='getimg(cover)' :show-center-play-btn='true' :enable-play-gesture='true'></video>
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
				src:'',
				cover:''
			}
		},
		onLoad(option) {
			this.src=option.src
			this.cover=option.cover
		},
		methods: {
			getimg(str){
				return service.getimg(str)
			}
		}
	}
</script>

<style>
	video{
		width: 100vw;
		height: 100vh;
	}
</style>
