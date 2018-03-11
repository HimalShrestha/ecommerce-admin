<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Orders</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Orders</b-button>
      </b-card-header>
      <b-card-body>
        <div class="orders">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="orders" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="OrderStatus" slot-scope="data">
                  <b-badge v-if="data.item.OrderStatus===0" variant="warning">Pending</b-badge>
                  <b-badge v-if="data.item.OrderStatus===1" variant="success">Completed</b-badge>
                  <b-badge v-if="data.item.OrderStatus===2" variant="danger">Canceled</b-badge>
                </template>
                <template slot="image" slot-scope="data">
                  <img :src="API_ENDPOINT+'/admin/product/image/'+data.item.ProductID" alt="" style="max-width:100px;">
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="info" @click="$router.push(`/orders/${data.item.DetailID}`)">View</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Card footer</div>
    </b-card>
    <b-modal ref="addProduct" size="lg" header-bg-variant="primary" hide-footer title="Add Product">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="name">Product Name</label>
                  <b-form-input type="text" id="name" placeholder="Enter your product name" v-model="name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="price">Price</label>
                  <b-form-input type="number" id="price" placeholder="Enter price" v-model="price"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="location">Location</label>
                  <b-form-input type="text" id="location" placeholder="Enter Product Location" v-model="location"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="stock">Stock</label>
                  <b-form-input type="number" id="stock" placeholder="Enter Product Stock" v-model="stock"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group
                  label="Category"
                  label-for="category"
                  :label-cols="11"
                  :horizontal="false">
                  <b-form-select id="category"
                    :plain="false"
                    v-model="selectedCategory"
                    >
                    <option :value="null">Please select</option>
                    <option v-for="c in category" :value="c.CategoryID">{{ c.CategoryName }}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  label="Seller"
                  label-for="seller"
                  :label-cols="11"
                  :horizontal="false">
                  <b-form-select id="seller"
                    :plain="false"
                    v-model="selectedSeller"
                    >
                    <option :value="null">Please select</option>
                    <option v-for="s in sellers" :value="s.SellerID">{{ s.SellerName }}</option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="cartD">Cart Description</label>
                  <b-form-textarea id="cartD"
                                   v-model="cartDesc"
                                   placeholder="Enter Cart Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="shortD">Short Description</label>
                  <b-form-textarea id="shortD"
                                   v-model="shortDesc"
                                   placeholder="Enter Short Product Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="longD">Long Description</label>
                  <b-form-textarea id="longD"
                                   v-model="longDesc"
                                   placeholder="Enter long Description here...."
                                   :rows="3"
                                   :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <label for="Image" style="width:100%">Product Image</label>
                <!-- <croppa ref="mainImage" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="Image"></croppa> -->
                <input type="file" ref="mainImage">
              </b-col>
              <b-col sm="6">
                <label for="thumb" style="width:100%">Thumbnail</label>
                <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                <input type="file" ref="thumbnail">
              </b-col>
            </b-row>
            <b-row>&nbsp;</b-row>
            <b-row>
              <b-col sm="6">

                <b-form-group>
                  <label>Active</label>
                  </br>
                  <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="productActive"/>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addProduct">Add Product</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteProduct">Yes</b-button>
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
import cSwitch from '../../components/Switch'
import {Events} from '../../events.js'
export default {
  name: 'Orders',
  components: {
    cSwitch
  },
  data () {
    return {
      orders: [],
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'image', label: 'Image' },
        { key: 'OrderID', label: 'Order ID' },
        { key: 'ProductName', label: 'Name' },
        { key: 'OrderStatus', label: 'Status' },
        { key: 'OrderAmount', label: 'Order Amount' },
        { key: 'TotalPrice', label: 'Total Price' },
        { key: 'option', label: 'Options' }
      ],
      category: [],
      selectedCategory: null,
      sellers: [],
      selectedSeller: null,
      productActive: true,
      name: '',
      price: '',
      location: '',
      stock: '',
      cartDesc: '',
      shortDesc: '',
      longDesc: '',
      mainImage: '',
      thumbnail: '',
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
  },
  methods: {
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
      this.$refs.addProduct.show()
    },
    hideModal () {
      this.$refs.addProduct.hide()
    },
    getAllOrders () {
      this.$http.get(this.API_ENDPOINT + '/admin/order/detail', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.orders = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    getCategories () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/category', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.category = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    getSellers () {
      this.$http.get(this.API_ENDPOINT + '/admin/seller', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.sellers = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addProduct () {
      var formData = new FormData()
      var productImage = this.$refs.mainImage.files[0]
      var thumbnail = this.$refs.thumbnail.files[0]
      formData.append('productImage', productImage)
      formData.append('thumbnail', thumbnail)
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('location', this.location)
      formData.append('stock', this.stock)
      formData.append('cartDescription', this.cartDesc)
      formData.append('shortDescription', this.shortDesc)
      formData.append('longDescription', this.longDesc)
      formData.append('categoryID', this.selectedCategory)
      formData.append('sellerID', this.selectedSeller)
      formData.append('visible', this.productActive ? '1' : '0')
      this.$http.post(this.API_ENDPOINT + '/admin/product', formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.alertText = 'Product successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getAllProducts()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
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
    this.getAllOrders()
    this.getCategories()
    this.getSellers()
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
