<template>
	<div>
		<footer id="footer">
			<div class="footer-top" :style="{ backgroundColor: colors.data[0].color}">
				<div class="container">
					<NuxtLink class="logo" :to="localePath('/')">
						<img src="~/assets/images/svg/logo.svg" alt="in out" width="83" height="72">
					</NuxtLink>
					<div class="list">
						<NuxtLink :to="localePath('/')" class="item">
							<div class="box">
								<img src="~/assets/images/svg/calendar.svg" alt="calendar" width="24" height="24">
							</div>
							<div class="top-wrapper">
								<p class="num">{{ store.setting?.data.time }}</p>
								<!-- <p class="top-text">ПН-ПТ</p> -->
							</div>
						</NuxtLink>
						<NuxtLink :to="localePath('/')" class="item">
							<div class="box">
								<img src="~/assets/images/svg/location.svg" alt="location" width="24" height="24">
							</div>
							<div class="top-wrapper">
								<p class="num">{{ store.setting?.data.location }}</p>
								<!-- <p class="top-text">По все регионам</p> -->
							</div>
						</NuxtLink>
						<a :href="'mailto:' + store.setting?.data.email" class="item">
							<div class="box">
								<img src="~/assets/images/svg/mail.svg" alt="mail" width="24" height="24">
							</div>
							<div class="top-wrapper">
								<p class="num">{{ store.setting?.data.email }}</p>
								<!-- <p class="top-text">Inoutadsagency@gmail.com</p> -->
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="footer-bottom" :style="{ backgroundColor: colors.data[1].color}">
				<div class="container">
					<div class="footer-bottom-top-wrapper">
						<!-- <button class="footer-advertising"></button> -->
						<div class="footer-bottom-text-wrapper">
							<p class="footer-bottom-inout">{{ $t("inout_group") }}</p>
							<p class="footer-bottom-text">{{ $t("copyright") }}</p>
						</div>
						<div>
						</div>
						<div class="footer-social">
							<div class="footer-app-list" v-for="item in store.media?.data" :key="item.icon">
								<a :href="item.url" class="footer-app-item">
									<img :src="item.img" alt="icone">
								</a>
							</div>
						</div>
					</div>
					<div class="footer-bottom-bottom-text-wrapper">
						<p class="footer-bottom-bottom-inout">{{ $t("inout_group") }}</p>
						<p class="footer-bottom-bottom-text">{{ $t("copyright") }}</p>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { useStore } from "../stores/counter"
const store = useStore()
const colors = await $fetch(store.baseUrl + '/color')
</script>

<style lang="scss" scoped>
@media print {
	#footer {
    display: none !important;
  }
}
.footer-social {
	display: flex;
	align-items: center;
	gap: 12px;
}
</style>