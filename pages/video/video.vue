<template>
	<view>
		<video :src="src" :show-center-play-btn='true' :enable-play-gesture='true'></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(option) {
			this.src=option.src
		},
		methods: {
			
		}
	}
</script>

<style>
	video{
		width: 100vw;
		height: 100vh;
	}
</style>
