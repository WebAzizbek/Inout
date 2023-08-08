<template>
	<div>
		<div class="jobs">
			<div class="container">
				<h2 class="jobs-title">{{ $t('jobsTitlePr') }}</h2>
				<div class="list">
					<jobs-item :jobs="jobs"  v-for="jobs in store.jobs?.data" :key="jobs.id"></jobs-item>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStore } from "../stores/counter"
const store = useStore()

</script>

<style lang="scss" scoped>
.jobs{
	min-height: 70vh;
}
</style>