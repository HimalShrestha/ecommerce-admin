<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Payment Methods</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Methods</b-button>
      </b-card-header>
      <b-card-body>
        <div class="methods">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="methods" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editMethod(data.item.PaymentID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.PaymentID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Payment Methods</div>
    </b-card>
    <b-modal ref="addMethod" size="lg" header-bg-variant="primary" hide-footer title="Add Method">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="mName">Payment Type</label>
                  <b-form-input type="text" id="mName" placeholder="Enter Method Name" v-model="paymentType"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addMethod">Add Method</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editMethod" size="lg" header-bg-variant="primary" hide-footer title="Edit Method">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="metName">Method Name</label>
                  <b-form-input type="text" id="metName" placeholder="Enter Method Name" v-model="paymentType"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateMethod">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteMethod">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
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
  name: 'Category',
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'PaymentID', label: 'Payment ID' },
        { key: 'PaymentType', label: 'Payment Type' },
        { key: 'option', label: 'Options' }
      ],
      methods: [],
      paymentType: '',
      methodId: '',
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
  },
  methods: {
    updateMethod () {
      this.$http.put(this.API_ENDPOINT + '/admin/payment/' + this.methodId, {'paymentType': this.paymentType}, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getMethods()
          this.closeEdit()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    editMethod (id) {
      this.methods.forEach(item => {
        if (item.PaymentID === id) {
          this.paymentType = item.PaymentType
          this.methodId = id
        }
      })
      this.$refs.editMethod.show()
    },
    closeEdit () {
      this.$refs.editMethod.hide()
    },
    cancelDelete () {
      this.$refs.confirm.hide()
    },
    confirm (id) {
      this.$refs.confirm.show()
      this.deleteId = id
    },
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
    },
    showModal () {
      this.$refs.addMethod.show()
    },
    hideModal () {
      this.$refs.addMethod.hide()
    },
    getMethods () {
      this.$http.get(this.API_ENDPOINT + '/admin/payment', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.methods = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addMethod () {
      var body = {
        'paymentType': this.paymentType
      }
      this.$http.post(this.API_ENDPOINT + '/admin/payment', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.alertText = 'Method successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getMethods()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
      })
    },
    deleteMethod () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/payment/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getMethods()
          this.cancelDelete()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    // this.getAllOrders()
    this.getMethods()
    // this.getSellers()
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
