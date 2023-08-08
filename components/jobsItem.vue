<template>
  <div>
    <div class="jobs-item">
      <h3 class="jobs-item-title">{{ jobs.title }}</h3>
      <!-- <h4 class="jobs-item-small-title">{{ $t('jobsItemTitle') }}</h4> -->
      <h4 class="jobs-item-small-title">{{ jobs.jobs[0]?.title }}</h4>
      <div class="jobs-item-list">
        <div v-for="check in jobs?.jobs[0]?.options" :key="check" class="jobs-item-list-item">
          <div class="box">
            <img src="~/assets/images/svg/check.svg" alt="check" width="24" height="24">
          </div>
          <p class="jobs-item-list-item-text">{{ check.title }}</p>
        </div>
      </div>
      <PrButton :to="localePath('/jobsMore')" class="jobs-item-list-btn" @click="setActiveJob(jobs)"
        :content="$t('next')">
      </PrButton>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/counter';
import { activeJob } from '../helper/activeJob.js'
const store = useStore()
const { jobs } = defineProps({
  jobs: {
    required: true
  }
})
function setActiveJob(index) {
  store.activeJob = index
  localStorage.setItem('activeJob', JSON.stringify(index))
}


</script>

<style lang="scss" scoped></style>