<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Subscriber</h3>
      </b-card-header>
      <b-card-body>
        <div class="message">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="subscribers" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index+1 + ((currentPage-1)*SIZE)}}
                </template>
                <template slot="Date" slot-scope="data">
                  {{data.item.Date.substring(0, 19).replace('T', ' ')}}
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div style="padding: 0.75rem 1.25rem;background-color: #f0f3f5;border-top: 1px solid #c2cfd6;"><b-pagination align="right" :total-rows="count" :per-page="this.SIZE" v-model="currentPage" style="margin: 0px;"></b-pagination></div>
    </b-card>

  </div>
</template>

<script>
// import {Events} from '../../events.js'
export default {
  name: 'Subscriber',
  data () {
    return {
      subscribers: [],
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'NewsletterID', label: 'ID' },
        { key: 'NewsletterEmail', label: 'Email' },
        { key: 'Date', label: 'Date' },
        { key: 'NewsletterIP', label: 'IP' }
      ],
      currentPage: 1,
      count: 0
    }
  },
  watch: {
    currentPage: function (naya, purano) {
      this.getAllSubscribers()
    }
  },
  methods: {
    getAllSubscribers () {
      this.$http.get(this.API_ENDPOINT + '/admin/subscribe?size=' + this.SIZE + '&page=' + this.currentPage, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.subscribers = response.data.data
        this.count = response.data.count
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllSubscribers()
  }
}
</script>
