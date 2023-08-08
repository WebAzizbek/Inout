<template>
    <NuxtLink class="prBtn">
        {{ content }}
    </NuxtLink>
</template>
<script setup>
const { content } = defineProps({
    content: {
        required: true
    }
})
</script>

<style lang="scss">
.prBtn {
    cursor: pointer;
    text-align: center;
    background-color: var(--prColor);
    padding: 15px 20px !important;
    color: #fff;
    font-size: 16px;
    font-weight: 600px;
    border-radius: 12px;
    transition: .3s linear;
    display: inline-block;
}
</style>