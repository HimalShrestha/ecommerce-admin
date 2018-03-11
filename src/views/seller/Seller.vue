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
                <b-form-group>
                  <label for="sellername">Name</label>
                  <b-form-input type="text" id="sellername" placeholder="Enter Seller Name" v-model="sellerName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="sellDesc">Seller Description</label>
                  <b-form-textarea id="sellDesc"
                                   v-model="sellerDescription"
                                   placeholder="Enter Seller Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="accname">Account Name</label>
                  <b-form-input type="text" id="accname" placeholder="Enter Account Name" v-model="accountName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="accnum">Account Number</label>
                  <b-form-input type="text" id="accnum" placeholder="Enter Account Number" v-model="accountNumber"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addSeller">Add Seller</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editSeller" size="lg" header-bg-variant="primary" hide-footer title="Edit Seller">
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
                <b-form-group>
                  <label for="sellername">Name</label>
                  <b-form-input type="text" id="sellername" placeholder="Enter Seller Name" v-model="selectedSeller.SellerName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="sellDesc">Seller Description</label>
                  <b-form-textarea id="sellDesc"
                                   v-model="selectedSeller.SellerDesc"
                                   placeholder="Enter Seller Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="accname">Account Name</label>
                  <b-form-input type="text" id="accname" placeholder="Enter Account Name" v-model="selectedSeller.SellerAccountName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="accnum">Account Number</label>
                  <b-form-input type="text" id="accnum" placeholder="Enter Account Number" v-model="selectedSeller.SellerAccountNumber"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateSeller">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteSeller">Yes</b-button>
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
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
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
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    editSeller (id) {
      this.seller.forEach(item => {
        if (item.SellerID === id) {
          var i = this.seller.indexOf(item)
          this.selectedSeller = this.seller[i]
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
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
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
          this.alertText = 'Seller successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getSellers()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
      })
    },
    deleteSeller () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/seller/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getSellers()
          this.cancelDelete()
        }
      }).catch(err => {
        console.log('this is an error ', err)
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
<style>
  .position-alert{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 20000
  }
</style>
