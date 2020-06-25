<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">
      {{form.headline}}
    </h1>
    <p class="mb-2">
      {{form.text}}
    </p>
    <input class="p-2 border border-black" type="text">
    <br>
    <button class="bg-blue-600 p-2 rounded mt-4 text-white">
      {{ form.buttonText || 'Subscribe' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      requred: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
