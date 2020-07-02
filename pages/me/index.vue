<template>
  <div class="flex max-w-2xl mx-auto">
    <div class="w-1/3 p-4">
      <h1 class="text-2xl mb-2">
        Campaigns
      </h1>
      <!-- <ul>
        <li v-for="campaign in published_form" :key="form.id">
          <span class="font-bold">
            {{ form.headline }}
          </span> -
          <nuxt-link :to="{ path: `/form/${form.id}` }">
            Preview
          </nuxt-link>
        </li>
      </ul> -->
      <button class="border border-black rounded p-2" @click="addCampaign">
        Add Campaign
      </button>
    </div>
    <div class="w-2/3 p-4">
      <template v-if="selectedCampaign">
        <h1 class="text-2xl mb-2">
          My Forms
        </h1>
        <ul>
          <li v-for="form in published_form" :key="form.id">
            <span class="font-bold">
              {{ form.headline }}
            </span> -
            <nuxt-link :to="{ path: `/form/${form.id}` }">
              Preview
            </nuxt-link>
          </li>
        </ul>
        <button class="border border-black rounded p-2" @click="addForm">
          Add Form
        </button>
      </template>
      <template v-else>
        <p class="italic">
          Select a campain
        </p>
      </template>
    </div>
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
      publishedForms: '',
      selectedCampaign: true
    }
  },
  computed: mapState(['currentUser']),
  methods: {
    addForm() {
      const newFormId = uuidv4()
      this.$router.push(`/editor/${newFormId}`)
    },
    addCampaign() {
      const newFormId = uuidv4()
      this.$router.push(`/editor/${newFormId}`)
    }
  },
  apollo: {
    published_form: {
      prefetch: true,
      query: forms,
      variables() {
        return { userId: this.currentUser.id }
      }
    }
  }
}
</script>
