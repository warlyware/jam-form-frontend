<template>
  <div class="text-center mx-auto">
    <h1 class="text-2xl">My Forms</h1>
    <ul>
      <li v-for="form in published_form" :key="form.id">
        <span class="font-bold">
          {{form.headline}}
        </span> -
        <nuxt-link :to="{ path: `/form/${form.id}` }">
          Preview
        </nuxt-link>
      </li>
    </ul>
    <button @click="addForm">
      Add Form
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import forms from '~/apollo/queries/forms/fetch-by-user-id'

export default {
  layout: 'secure',
  data() {
    return {
      publishedForms: ''
    }
  },
  computed: mapState(['currentUser']),
  methods: {
    addForm() {
      const newFormId = uuidv4()
      this.$router.push(`/editor/${newFormId}`)
    }
  },
  apollo: {
    published_form: {
      prefetch: true,
      query: forms,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>
