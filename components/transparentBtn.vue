<template>
    <div class="transparentBtn">
        {{ transparentBtnContent }}
    </div>
</template>

<script setup>
const { content } = defineProps({
    transparentBtnContent: {
        required: true
    }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";

.transparentBtn {
    padding: 11px 20px;
    border: 1px solid var(--prColor);
    border-radius: 12px;
    background: transparent;
    transition: .3s linear;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--title);
    cursor: pointer;

    &:hover {
        background: var(--prColor);
        color: white;
    }
}
</style>