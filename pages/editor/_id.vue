<template>
  <div class="w-screen">
    <div class="w-1/3 bg-gray-700">
      <input type="text" v-model="headline">
      <input type="text" v-model="tagline">
    </div>
    <div class="w-2/3">
      <h1 class="text-2xl">{{ headline }}</h1>
      <p>
        {{ tagline }}
      </p>
      <input type="text">
      <button :style="buttonStyles">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'secure',
  data() {
    return {
      buttonStyles: { backgroundColor: 'blue' }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
