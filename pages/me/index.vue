<template>
  <div class="flex max-w-2xl mx-auto">
    <div class="w-1/3 p-4">
      <h1 class="text-2xl mb-2">
        Campaigns
      </h1>
      <button class="border border-black rounded p-2 mb-4"
      @click="addCampaign">
        Add Campaign
      </button>
      <ul class="mb-4 cursor-pointer">
        <li v-for="campaign in campaigns" :key="campaign.id" class="p-2 py-1 hover:bg-blue-200"
        :class="{'bg-blue-300': selectedCampaign === campaign }" @click="selectedCampaign = campaign">
          <span class="font-bold">
            {{ campaign.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="w-2/3 p-4">
      <template v-if="selectedCampaign">
        <h1 class="text-2xl mb-2">
          Forms
        </h1>
        <button class="border border-black rounded p-2 mb-4" @click="addForm">
          Add Form
        </button>
        <ul v-if="publishedForms.length" class="mb-4">
          <li v-for="form in publishedForms" :key="form.id">
            <span class="font-bold">
              {{ form.name }}
            </span> -
            <nuxt-link :to="{ path: `/form/${form.id}` }" target="_blank">
              Preview
            </nuxt-link> -
            <nuxt-link :to="{ path: `/editor/${form.id}` }">
              Edit
            </nuxt-link>
          </li>
        </ul>
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
import campaigns from '~/apollo/queries/campaigns/fetch-by-user-id'

export default {
  layout: 'secure',
  data() {
    return {
      selectedCampaign: null
    }
  },
  computed: {
    ...mapState(['currentUser']),
    publishedForms() {
      if (this.published_form && this.published_form.length) {
        return this.published_form.filter(({ campaignId }) => campaignId === this.selectedCampaign.id)
      } else {
        return []
      }
    },
    campaigns() { return this.campaign }
  },
  watch: {
    campaigns() {
      if (this.campaigns && this.campaigns.length) {
        this.selectedCampaign = this.campaigns[0]
      }
    }
  },
  mounted() {
    this.$apollo.queries.published_form.refetch()
  },
  methods: {
    addForm() {
      const newFormId = uuidv4()
      this.$router.push(`/editor/${newFormId}`)
    },
    addCampaign() {

    }
  },
  apollo: {
    published_form: {
      prefetch: true,
      query: forms,
      variables() {
        return { userId: this.currentUser.id }
      }
    },
    campaign: {
      prefetch: true,
      query: campaigns,
      variables() {
        return { userId: this.currentUser.id }
      }
    }
  }
}
</script>
