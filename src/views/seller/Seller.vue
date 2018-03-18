<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Sellers</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Seller</b-button>
      </b-card-header>
      <b-card-body>
        <div class="seller">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="seller" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editSeller(data.item.SellerID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.SellerID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Sellers</div>
    </b-card>
    <b-modal ref="addSeller" size="lg" header-bg-variant="primary" hide-footer title="Add Seller">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.sellerName.$error">
                  <label for="sellername">Name</label>
                  <b-form-input type="text" id="sellername" :state="$v.sellerName.$error?false:null" @blur.native="$v.sellerName.$touch" placeholder="Enter Seller Name" v-model.trim="sellerName"></b-form-input>
                  <div v-if="$v.sellerName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.sellerName.required">Seller Name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.sellerName.minLength">Must have atleast {{ $v.sellerName.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.sellerName.maxLength">Must not exceed {{ $v.sellerName.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.sellerDescription.$error">
                  <label for="sellDesc">Seller Description</label>
                  <b-form-textarea id="sellDesc"
                                   v-model.trim="sellerDescription"
                                   placeholder="Enter Seller Description here...."
                                   :rows="3"
                                   :max-rows="3"
                                   :state="$v.sellerDescription.$error?false:null" @blur.native="$v.sellerDescription.$touch">
                  </b-form-textarea>
                  <div v-if="$v.sellerDescription.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.sellerDescription.required">Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.sellerDescription.minLength">Must have atleast {{ $v.sellerDescription.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.sellerDescription.maxLength">Must not exceed {{ $v.sellerDescription.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.accountName.$error">
                  <label for="accname">Account Name</label>
                  <b-form-input type="text" id="accname" :state="$v.accountName.$error?false:null" @blur.native="$v.accountName.$touch" placeholder="Enter Account Name" v-model.trim="accountName"></b-form-input>
                  <div v-if="$v.accountName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.accountName.required">Account Name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.accountName.minLength">Must have atleast {{ $v.accountName.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.accountName.maxLength">Must not exceed {{ $v.accountName.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.accountNumber.$error">
                  <label for="accnum">Account Number</label>
                  <b-form-input type="text" id="accnum" :state="$v.accountNumber.$error?false:null" @blur.native="$v.accountNumber.$touch" placeholder="Enter Account Number" v-model.trim="accountNumber"></b-form-input>
                  <div v-if="$v.accountNumber.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.accountNumber.required">Account Number is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.accountNumber.minLength">Must have atleast {{ $v.accountNumber.$params.minLength.min}} number</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.accountNumber.maxLength">Must not exceed {{ $v.accountNumber.$params.maxLength.max}} number</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addSeller" :disabled="isValid">Add Seller</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editSeller" size="lg" header-bg-variant="primary" hide-footer title="Edit Seller" @hidden="getSellers">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <label>Seller ID:</label>
                <span>{{selectedSeller.SellerID}}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.selectedSeller.SellerName.$error">
                  <label for="sellername">Name</label>
                  <b-form-input type="text" id="sellername" :state="$v.selectedSeller.SellerName.$error?false:null" @blur.native="$v.selectedSeller.SellerName.$touch" placeholder="Enter Seller Name" v-model.trim="selectedSeller.SellerName"></b-form-input>
                  <div v-if="$v.selectedSeller.SellerName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedSeller.SellerName.required">Seller Name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerName.minLength">Must have atleast {{ $v.selectedSeller.SellerName.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerName.maxLength">Must not exceed {{ $v.selectedSeller.SellerName.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.selectedSeller.SellerDesc.$error">
                  <label for="sellDesc">Seller Description</label>
                  <b-form-textarea id="sellDesc"
                                   v-model.trim="selectedSeller.SellerDesc"
                                   placeholder="Enter Seller Description here...."
                                   :rows="3"
                                   :max-rows="3"
                                   :state="$v.selectedSeller.SellerDesc.$error?false:null" @blur.native="$v.selectedSeller.SellerDesc.$touch">
                  </b-form-textarea>
                  <div v-if="$v.selectedSeller.SellerDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedSeller.SellerDesc.required">Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerDesc.minLength">Must have atleast {{ $v.selectedSeller.SellerDesc.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerDesc.maxLength">Must not exceed {{ $v.selectedSeller.SellerDesc.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.selectedSeller.SellerAccountName.$error">
                  <label for="accname">Account Name</label>
                  <b-form-input type="text" id="accname" :state="$v.selectedSeller.SellerAccountName.$error?false:null" @blur.native="$v.selectedSeller.SellerAccountName.$touch" placeholder="Enter Account Name" v-model.trim="selectedSeller.SellerAccountName"></b-form-input>
                  <div v-if="$v.selectedSeller.SellerAccountName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedSeller.SellerAccountName.required">Account Name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerAccountName.minLength">Must have atleast {{ $v.selectedSeller.SellerAccountName.$params.minLength.min}} letter</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerAccountName.maxLength">Must not exceed {{ $v.selectedSeller.SellerAccountName.$params.maxLength.max}} letter</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.selectedSeller.SellerAccountNumber.$error">
                  <label for="accnum">Account Number</label>
                  <b-form-input type="text" id="accnum" :state="$v.selectedSeller.SellerAccountNumber.$error?false:null" @blur.native="$v.selectedSeller.SellerAccountNumber.$touch" placeholder="Enter Account Number" v-model.trim="selectedSeller.SellerAccountNumber"></b-form-input>
                  <div v-if="$v.selectedSeller.SellerAccountNumber.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedSeller.SellerAccountNumber.required">Account Number is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerAccountNumber.minLength">Must have atleast {{ $v.selectedSeller.SellerAccountNumber.$params.minLength.min}} number</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.selectedSeller.SellerAccountNumber.maxLength">Must not exceed {{ $v.selectedSeller.SellerAccountNumber.$params.maxLength.max}} number</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateSeller" :disabled="$v.selectedSeller.$invalid">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteSeller">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
    </b-modal>

  </div>
</template>

<script>
import {Events} from '../../events.js'
const {required, minLength, maxLength} = require('vuelidate/lib/validators')
export default {
  name: 'Seller',
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'SellerID', label: 'Seller ID' },
        { key: 'SellerName', label: 'Name' },
        { key: 'SellerAccountName', label: 'Account Name' },
        { key: 'SellerAccountNumber', label: 'Account Number' },
        { key: 'option', label: 'Options' }
      ],
      seller: [],
      selectedSeller: '',
      sellerName: '',
      sellerDescription: '',
      accountNumber: '',
      accountName: '',
      deleteId: ''
    }
  },
  validations: {
    sellerName: { required, minLength: minLength(2), maxLength: maxLength(45) },
    sellerDescription: { required, minLength: minLength(2), maxLength: maxLength(100) },
    accountNumber: { required, minLength: minLength(2), maxLength: maxLength(45) },
    accountName: { required, minLength: minLength(2), maxLength: maxLength(45) },
    selectedSeller: {
      SellerName: { required, minLength: minLength(2), maxLength: maxLength(45) },
      SellerDesc: { required, minLength: minLength(2), maxLength: maxLength(100) },
      SellerAccountNumber: { required, minLength: minLength(2), maxLength: maxLength(45) },
      SellerAccountName: { required, minLength: minLength(2), maxLength: maxLength(45) }
    }
  },
  computed: {
    isValid () {
      if (this.$v.sellerName.$invalid || this.$v.sellerDescription.$invalid || this.$v.accountNumber.$invalid || this.$v.accountName.$invalid) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updateSeller () {
      var body = {
        'name': this.selectedSeller.SellerName,
        'sellerDescription': this.selectedSeller.SellerDesc,
        'accountName': this.selectedSeller.SellerAccountName,
        'accountNumber': this.selectedSeller.SellerAccountNumber
      }
      this.$http.put(this.API_ENDPOINT + '/admin/seller/' + this.selectedSeller.SellerID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getSellers()
          this.closeEdit()
          Events.$emit('alert', 'Seller Updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    editSeller (id) {
      var clone = this.seller.slice(0)
      clone.forEach(item => {
        if (item.SellerID === id) {
          var i = clone.indexOf(item)
          this.selectedSeller = clone[i]
        }
      })
      console.log(this.selectedSeller)
      this.$refs.editSeller.show()
    },
    closeEdit () {
      this.$refs.editSeller.hide()
    },
    cancelDelete () {
      this.$refs.confirm.hide()
    },
    confirm (id) {
      this.$refs.confirm.show()
      this.deleteId = id
    },
    showModal () {
      this.$refs.addSeller.show()
    },
    hideModal () {
      this.$refs.addSeller.hide()
    },
    getSellers () {
      this.$http.get(this.API_ENDPOINT + '/admin/seller', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.seller = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addSeller () {
      var body = {
        'name': this.sellerName,
        'sellerDescription': this.sellerDescription,
        'accountName': this.accountName,
        'accountNumber': this.accountNumber
      }
      this.$http.post(this.API_ENDPOINT + '/admin/seller', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.getSellers()
          Events.$emit('alert', 'Seller Added', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    deleteSeller () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/seller/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getSellers()
          this.cancelDelete()
          Events.$emit('alert', 'Seller Deleted', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    }
  },
  created () {
    // this.getAllOrders()
    this.getSellers()
    // this.getSellers()
  }
}
</script>
