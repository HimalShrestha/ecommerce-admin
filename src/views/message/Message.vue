<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Message</h3>
      </b-card-header>
      <b-card-body>
        <div class="message">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="messages" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="ContactStatus" slot-scope="data">
                  <b-badge v-if="data.item.ContactStatus===0" variant="warning">Not Responded</b-badge>
                  <b-badge v-if="data.item.ContactStatus===1" variant="success">Responded</b-badge>
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="info" @click="replyMessage(data.item.ContactID)">View &amp; Reply</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Messages</div>
    </b-card>
    <b-modal ref="replyMessage" size="lg" header-bg-variant="primary" hide-footer title="Reply to Messages">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label>Message ID</label>
                  <b-form-input type="text" disabled v-model="messageSingle.ContactID"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label>Name</label>
                  <b-form-input type="text" disabled v-model="messageSingle.ContactName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label>Email</label>
                  <b-form-input type="text" disabled v-model="messageSingle.ContactEmail"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label>Subject</label>
                  <b-form-input type="text" disabled v-model="messageSingle.ContactSubject"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label>Message</label>
                  <b-form-textarea v-model="messageSingle.ContactMessage"
                                   :rows="8"
                                   disabled>
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label>Your Reply</label>
                  <b-form-textarea v-model="repMessage"
                                   :rows="8">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="reply">Reply</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Close</b-btn>
    </b-modal>
    <div class="position-alert">
      <b-alert :variant="alertVariant"
               dismissible
               :show="alertVisible"
               @dismissed="alertVisible=false">
        {{alertText}}
      </b-alert>
    </div>

  </div>
</template>

<script>
import {Events} from '../../events.js'
export default {
  name: 'Message',
  data () {
    return {
      messages: [],
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'ContactName', label: 'Name' },
        { key: 'ContactEmail', label: 'Email' },
        { key: 'ContactStatus', label: 'Status' },
        { key: 'ContactSubject', label: 'Subject' },
        { key: 'option', label: 'Options' }
      ],
      messageSingle: {
        ContactID: '',
        ContactEmail: '',
        ContactName: '',
        ContactSubject: '',
        ContactMessage: '',
        ContactStatus: ''
      },
      repMessage: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
  },
  methods: {
    reply () {

    },
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
    },
    replyMessage (id) {
      this.messages.forEach(item => {
        if (item.ContactID === id) {
          this.messageSingle = item
        }
      })
      this.showModal()
    },
    showModal () {
      this.$refs.replyMessage.show()
    },
    hideModal () {
      this.$refs.replyMessage.hide()
    },
    getAllMessages () {
      this.$http.get(this.API_ENDPOINT + '/admin/message', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.messages = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    deleteProduct () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/product/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllProducts()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllMessages()
  }
}
</script>
<style>
  .position-alert{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 20000
  }
</style>
