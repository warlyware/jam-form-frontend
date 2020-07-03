<template>
  <div class="flex max-w-2xl mx-auto">
    <modal name="create-campaign" width="250" height="150" @before-close="addCampaign">
      <div class="flex flex-col items-center justify-center h-full">
        Campain Name:
        <input v-model="newCampaignName"
        type="text"
        class="p-1 border border-black mb-2">
        <button class="p-2 rounded bg-blue-300 font-bold"
        @click="$modal.hide('create-campaign'); addCampaign">
          Create
        </button>
      </div>
    </modal>
    <modal name="embed-code" width="400" height="180">
      <div class="flex flex-col items-center justify-center h-full p-2">
        <textarea v-model="embedCode" readonly class="w-full h-24 text-left border border-black m-2 p-2" />
        <button class="p-2 rounded bg-blue-300 font-bold"
        @click="$modal.hide('embed-code')">
          Close
        </button>
      </div>
    </modal>
    <div class="w-1/3 p-4">
      <h1 class="text-2xl mb-2">
        Campaigns
      </h1>
      <button class="border border-black rounded p-2 mb-4"
      @click="showAddCampaignModal">
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
          {{ selectedCampaign.name }}
        </h1>
        <button class="border border-black p-2 rounded mb-4"
        @click="removeCampaign">
          Delete Campaign
        </button>
        <h2 class="text-lg mb-2">
          Forms
        </h2>
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
            </nuxt-link> -
            <button @click="showEmbedCodeModal(form)">
              Embed
            </button> -
            <button @click="deleteForm(form.id)">
              Delete
            </button>
          </li>
        </ul>
        <h2 class="text-lg mb-2">
          Emails
        </h2>
        <ul v-if="emails.length" class="mb-4">
          <li v-for="{ email } in emails" :key="email.id">
            <span class="font-bold">
              {{ email }}
            </span>
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
import generate from 'project-name-generator'

import forms from '~/apollo/queries/forms/fetch-by-user-id'
import campaigns from '~/apollo/queries/campaigns/fetch-by-user-id'
import emails from '~/apollo/queries/email-list/fetch-by-user-id'
import addCampaign from '~/apollo/mutations/campaigns/create-campaign'
import deleteCampaign from '~/apollo/mutations/campaigns/remove-campaign'
import addForm from '~/apollo/mutations/forms/create-form'
import deleteForm from '~/apollo/mutations/forms/remove-form'

export default {
  layout: 'secure',
  data() {
    return {
      newCampaignName: '',
      selectedFormId: null,
      selectedCampaign: null
    }
  },
  computed: {
    embedCode() {
      return `<iframe src="${process.env.BASE_URL}/form/${this.selectedFormId}" frameborder="0"></iframe>`
    },
    ...mapState(['currentUser']),
    publishedForms() {
      if (this.published_form && this.published_form.length) {
        return this.published_form.filter(({ campaignId }) => campaignId === this.selectedCampaign.id)
      } else {
        return []
      }
    },
    campaigns() { return this.campaign },
    emails() {
      if (this.email_list && this.email_list.length) {
        return this.email_list.filter(({ campaignId }) => campaignId === this.selectedCampaign.id)
      } else {
        return []
      }
    }
  },
  watch: {
    campaigns() {
      if (this.campaigns && this.campaigns.length) {
        this.selectedCampaign = this.campaigns[0]
      }
    }
  },
  mounted() {
    this.refetchForms()
  },
  methods: {
    refetchCampaigns() { this.$apollo.queries.campaign.refetch() },
    refetchForms() { this.$apollo.queries.published_form.refetch() },
    async deleteForm(id) {
      await this.$apollo.mutate({
        mutation: deleteForm,
        variables: { id }
      })
      this.$toasted.show('Form Deleted')
      this.refetchForms()
    },
    async removeCampaign() {
      await this.$apollo.mutate({
        mutation: deleteCampaign,
        variables: { id: this.selectedCampaign.id }
      })
      this.refetchCampaigns()
    },
    async addForm() {
      const { data } = await this.$apollo.mutate({
        mutation: addForm,
        variables: {
          campaignId: this.selectedCampaign.id,
          userId: this.currentUser.id,
          name: generate().dashed
        }
      })

      const id = data.insert_published_form.returning[0].id
      this.$router.push(`/editor/${id}`)
    },
    showEmbedCodeModal({ id }) {
      this.selectedFormId = id
      this.$modal.show('embed-code')
    },
    showAddCampaignModal() {
      this.$modal.show('create-campaign')
    },
    async addCampaign() {
      await this.$apollo.mutate({
        mutation: addCampaign,
        variables: {
          userId: this.currentUser.id,
          name: this.newCampaignName
        }
      })
      this.refetchCampaigns()
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
    email_list: {
      prefetch: true,
      query: emails,
      pollInterval: 60000,
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
