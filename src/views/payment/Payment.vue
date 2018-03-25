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
                  {{data.index+1 + ((currentPage-1)*SIZE)}}
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
      <div style="padding: 0.75rem 1.25rem;background-color: #f0f3f5;border-top: 1px solid #c2cfd6;"><b-pagination align="right" :total-rows="count" :per-page="this.SIZE" v-model="currentPage" style="margin: 0px;"></b-pagination></div>
    </b-card>
    <b-modal ref="addMethod" size="lg" header-bg-variant="primary" hide-footer title="Add Method">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group :state="!$v.paymentType.$error">
                  <label for="mName">Payment Type</label>
                  <b-form-input type="text" id="mName" :state="$v.paymentType.$error?false:null" @blur.native="$v.paymentType.$touch" placeholder="Enter Method Name" v-model.trim="paymentType" @input="alreadyExists=false"></b-form-input>
                  <div v-if="$v.paymentType.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.paymentType.required">Payment is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.paymentType.maxLength">Must not exceed {{ $v.paymentType.$params.maxLength.max}} letters</div>
                  </div>
                  <div class="invalid-feedback d-block" v-if="alreadyExists">Payment already exists</div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addMethod" :disabled="$v.$invalid">Add Method</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editMethod" size="lg" header-bg-variant="primary" hide-footer title="Edit Method">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group :state="!$v.paymentType.$error">
                  <label for="mtName">Payment Type</label>
                  <b-form-input type="text" id="mtName" :state="$v.paymentType.$error?false:null" @blur.native="$v.paymentType.$touch" placeholder="Enter Method Name" v-model.trim="paymentType" @input="alreadyExists=false"></b-form-input>
                  <div v-if="$v.paymentType.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.paymentType.required">Payment is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.paymentType.maxLength">Must not exceed {{ $v.paymentType.$params.maxLength.max}} letters</div>
                  </div>
                  <div class="invalid-feedback d-block" v-if="alreadyExists">Payment already exists</div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateMethod" :disabled="$v.$invalid">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteMethod">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
    </b-modal>

  </div>
</template>

<script>
import {Events} from '../../events.js'
const {required, maxLength} = require('vuelidate/lib/validators')
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
      alreadyExists: false,
      currentPage: 1,
      count: 0
    }
  },
  validations: {
    paymentType: { required, maxLength: maxLength(20) }
  },
  watch: {
    currentPage: function (naya, purano) {
      this.getMethods()
    }
  },
  methods: {
    updateMethod () {
      this.$http.put(this.API_ENDPOINT + '/admin/payment/' + this.methodId, {'paymentType': this.paymentType}, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getMethods()
          this.closeEdit()
          Events.$emit('alert', 'Payment Type updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        if (err.response.data.errors.paymentType.msg === 'type.already.exist') {
          this.alreadyExists = true
        }
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
    showModal () {
      this.$refs.addMethod.show()
    },
    hideModal () {
      this.$refs.addMethod.hide()
    },
    getMethods () {
      this.$http.get(this.API_ENDPOINT + '/admin/payment?size=' + this.SIZE + '&page=' + this.currentPage, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.methods = response.data.data
        this.count = response.data.count
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
          this.getMethods()
          Events.$emit('alert', 'Payment Type Added', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        if (err.response.data.errors.paymentType.msg === 'type.already.exist') {
          this.alreadyExists = true
        }
      })
    },
    deleteMethod () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/payment/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getMethods()
          this.cancelDelete()
          Events.$emit('alert', 'Deleted', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
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
