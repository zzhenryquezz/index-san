<script setup lang="ts">
import LOptions from './layouts/options.vue'
import LPopup from './layouts/popup.vue'

const isPopup = chrome.extension.getViews({ type: 'popup' }).length
</script>
<template>
    <LPopup v-if="isPopup" />
    <LOptions v-else />
</template>
