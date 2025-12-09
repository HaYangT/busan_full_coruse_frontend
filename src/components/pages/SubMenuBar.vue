<template>
    <div class="button-menu">
    <button @click.prevent = "$emit('open-review')">리뷰 보기</button>
    <button @click.prevent = "$emit('add-to-list')">내 일정에 등록</button>
    <button @click.prevent = "$emit('use-ai-recommand')">추천 받기</button>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>