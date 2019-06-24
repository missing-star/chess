<template>
	<div class="alerts">
		<!-- 背景音乐 -->
		<audio ref="loadBg">
			<source src="../assets/audio/启动背景音乐.mp3">
		</audio>
		<img src="../assets/images/elephant.png" class="ele" />
		<img src="../assets/images/home-icon.png" class="che" />
		<div class="game">象棋</div>
		<div class="jindu" ref="progresswrapper">
			<div ref="progress"></div>
		</div>
	</div>
</template>
<script>
	export default {
		created() {
			this.$nextTick(() => {
				this.$refs.loadBg.addEventListener('canplay', () => {
					this.$refs.loadBg.play();
					setTimeout(() => {
						this.$router.push({
							path: '/home'
						});
					}, 2000);
				});
			})
		}
	}
</script>
<style scoped>
	.alerts {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: #000;
		z-index: 9;
	}

	.ele {
		width: 15rem;
		position: absolute;
		top: 22%;
		left: 44%;
	}

	.che {
		width: 5rem;
		height: 5rem;
		position: absolute;
		top: 50%;
		left: 40%;
	}

	.ele1 {
		width: 4.05rem;
		position: absolute;
		top: 44%;
		left: 28%;
	}

	.che1 {
		width: 0.9rem;
		height: 0.9rem;
		position: absolute;
		top: 65%;
		left: 25%;
	}

	.jindu {
		background: #faf3e1;
		border: 0.06rem solid #b1733a;
		box-shadow: inset 0 0.01rem 0.04rem 0 rgba(0, 0, 0, 0.50);
		border-radius: 2rem;
		width: 20rem;
		height: 2rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 65%;
	}

	.jindu>div {
		background: #ff6f1c;
		box-shadow: inset 0 0.01rem 0.04rem 0.01rem rgba(255, 255, 255, 0.50);
		border-radius: 1rem;
		height: 100%;
		animation: loading 1.5s linear forwards;
	}

	@keyframes loading {
		from {
			width: 0;
		}

		to {
			width: 100%;
		}
	}

	.game {
		font-size: 2rem;
		color: #ffffff;
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>