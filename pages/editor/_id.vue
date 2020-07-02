<template>
  <div class="w-screen h-full flex">
    <div class="w-1/2 bg-gray-500 h-full p-4 flex flex-col">
      <div class="flex">
        <label for="headline">
          Headline
        </label>
        <input v-model="headline" class="mb-2 ml-2 flex-grow p-1" type="text" name="headline">
      </div>
      <div class="flex">
        <label for="tagline">
          Tagline
        </label>
        <input v-model="tagline" class="mb-2 ml-2 flex-grow p-1" type="text" name="tagline">
      </div>
      <div class="flex mb-2">
        <label for="buttonText">
          Button Text
        </label>
        <input v-model="buttonText" class="mb-2 ml-2 flex-grow p-1" type="text" name="buttonText">
      </div>
      <div class="flex mb-4">
        <div class="w-1/2">
          <div class="flex mb-2">
            <div class="mr-2 w-6 h-6 rounded cursor-pointer"
            :class="{'border-2 border-red-500': currentlyEditing === 'buttonBackgroundColor'}"
            :style="`background-color: ${colors.buttonBackgroundColor.hex}`"
            @click="currentlyEditing = 'buttonBackgroundColor'"
            />
            Button Background Color
          </div>
          <div class="flex mb-2">
            <div class="mr-2 w-6 h-6 rounded cursor-pointer"
            :class="{'border-2 border-red-500': currentlyEditing === 'buttonTextColor'}"
            :style="`background-color: ${colors.buttonTextColor.hex}`"
            @click="currentlyEditing = 'buttonTextColor'"
            />
            Button Text Color
          </div>
        </div>
        <div class="w-1/2">
          <color-picker v-if="currentlyEditing.length" v-model="colors[currentlyEditing]"
          class=" order-1" />
        </div>
      </div>
      <button class="p-2 bg-blue-500 text-white">
        Save
      </button>
    </div>
    <div class="w-1/2 flex items-center">
      <div id="form" class="w-full flex flex-col items-center justify-center">
        <h1 class="text-2xl mb-2">
          {{ headline }}
        </h1>
        <p class="mb-4">
          {{ tagline }}
        </p>
        <div class="flex items-center mb-2">
          <label class="mr-2 block" for="email">Email</label>
          <input class="border border-black p-1" type="text" name="email" placeholder="Enter email address">
        </div>
        <button :style="buttonStyles" class="p-2 rounded">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  components: {
    ColorPicker: Chrome
  },
  layout: 'secure',
  data() {
    return {
      currentlyEditing: 'buttonBackgroundColor',
      headline: 'My Newsletter',
      tagline: 'Sign up for my great newsletter!',
      buttonText: 'Subscribe',
      colors: {
        buttonBackgroundColor: { hex: '#1A97F0' },
        buttonTextColor: { hex: '#f6f6f6' }
      }
    }
  },
  computed: {
    buttonStyles() {
      return {
        backgroundColor: this.colors.buttonBackgroundColor.hex,
        color: this.colors.buttonTextColor.hex
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
