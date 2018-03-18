<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Products</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Product</b-button>
      </b-card-header>
      <b-card-body>
        <div class="product">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="products" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="image" slot-scope="data">
                  <img :src="API_ENDPOINT+'/admin/product/image/'+data.item.ProductID" alt="" style="max-width:100px;">
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="$router.push(`/product/${data.item.ProductID}`)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.ProductID)">Delete</b-button>
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
                <b-form-group :state="!$v.name.$error">
                  <label for="name">Product Name</label>
                  <b-form-input type="text" id="name" :state="$v.name.$error?false:null" @blur.native="$v.name.$touch" placeholder="Enter your product name" v-model.trim="name"></b-form-input>
                  <div v-if="$v.name.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.name.required">Name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.name.minLength">Must have atleast {{ $v.name.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.name.maxLength">Must not exceed {{ $v.name.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.price.$error">
                  <label for="price">Price</label>
                  <b-form-input type="number" id="price" :state="$v.price.$error?false:null" @blur.native="$v.price.$touch" placeholder="Enter price" v-model.trim="price"></b-form-input>
                  <div v-if="$v.price.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.price.required">Price is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.price.numeric">Must be numbers only</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.price.maxLength">Must not exceed {{ $v.price.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.location.$error">
                  <label for="location">Location</label>
                  <b-form-input type="text" id="location" :state="$v.location.$error?false:null" @blur.native="$v.location.$touch" placeholder="Enter Product Location" v-model.trim="location"></b-form-input>
                  <div v-if="$v.location.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.location.required">Location is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.location.minLength">Must have atleast {{ $v.location.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.location.maxLength">Must not exceed {{ $v.location.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.stock.$error">
                  <label for="stock">Stock</label>
                  <b-form-input type="number" id="stock" :state="$v.stock.$error?false:null" @blur.native="$v.stock.$touch" placeholder="Enter Product Stock" v-model.trim="stock"></b-form-input>
                  <div v-if="$v.stock.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.stock.required">Stock is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.stock.numeric">Must be numbers only</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.stock.maxLength">Must not exceed {{ $v.stock.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group
                  :state="!$v.selectedCategory.$error"
                  label="Category"
                  label-for="category"
                  :label-cols="11"
                  :horizontal="false">
                  <b-form-select id="category"
                    :plain="false"
                    v-model.trim="selectedCategory"
                    :state="$v.selectedCategory.$error?false:null" @blur.native="$v.selectedCategory.$touch"
                    >
                    <option :value="null">Please select</option>
                    <option v-for="c in category" :value="c.CategoryID">{{ c.CategoryName }}</option>
                  </b-form-select>
                  <div v-if="$v.selectedCategory.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedCategory.required">Category is required</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                  :state="!$v.selectedSeller.$error"
                  label="Seller"
                  label-for="seller"
                  :label-cols="11"
                  :horizontal="false">
                  <b-form-select id="seller"
                    :plain="false"
                    v-model.trim="selectedSeller"
                    :state="$v.selectedSeller.$error?false:null" @blur.native="$v.selectedSeller.$touch"
                    >
                    <option :value="null">Please select</option>
                    <option v-for="s in sellers" :value="s.SellerID">{{ s.SellerName }}</option>
                  </b-form-select>
                  <div v-if="$v.selectedSeller.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.selectedSeller.required">Seller is required</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.cartDesc.$error">
                  <label for="cartD">Cart Description</label>
                  <b-form-textarea id="cartD" :state="$v.cartDesc.$error?false:null" @blur.native="$v.cartDesc.$touch"
                                   v-model.trim="cartDesc"
                                   placeholder="Enter Cart Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                  <div v-if="$v.cartDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.cartDesc.required">Cart Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.cartDesc.minLength">Must have atleast {{ $v.cartDesc.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.cartDesc.maxLength">Must not exceed {{ $v.cartDesc.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.shortDesc.$error">
                  <label for="shortD">Short Description</label>
                  <b-form-textarea id="shortD" :state="$v.shortDesc.$error?false:null" @blur.native="$v.shortDesc.$touch"
                                   v-model.trim="shortDesc"
                                   placeholder="Enter Short Product Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                  <div v-if="$v.shortDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.shortDesc.required">Short Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.shortDesc.minLength">Must have atleast {{ $v.shortDesc.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.shortDesc.maxLength">Must not exceed {{ $v.shortDesc.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12">
                <b-form-group :state="!$v.longDesc.$error">
                  <label for="longD">Long Description</label>
                  <b-form-textarea id="longD" :state="$v.longDesc.$error?false:null" @blur.native="$v.longDesc.$touch"
                                   v-model.trim="longDesc"
                                   placeholder="Enter long Description here...."
                                   :rows="3"
                                   :max-rows="6">
                  </b-form-textarea>
                  <div v-if="$v.longDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.longDesc.required">Long Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.longDesc.minLength">Must have atleast {{ $v.longDesc.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.longDesc.maxLength">Must not exceed {{ $v.longDesc.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.mainImage.$error">
                  <label for="Image" style="width:100%">Product Image</label>
                  <!-- <croppa ref="mainImage" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="Image"></croppa> -->
                  <!-- <input type="file"  accept="image/*"> -->
                  <b-form-file v-model="mainImage" ref="mainImage" placeholder="Replace image..." accept="image/*"
                  :state="$v.mainImage.$error?false:null"
                  @click.native="$v.mainImage.$touch"
                  ></b-form-file>
                  <div v-if="$v.mainImage.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.mainImage.required">Image is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.mainImage.size.maxValue">Must be less than {{ ($v.mainImage.size.$params.maxValue.max)/(1024*1024)}} MB</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.thumbnail.size.$error">
                  <label for="thumb" style="width:100%">Product Thumbnail</label>
                  <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                  <!-- <input type="file" ref="thumbnail" accept="image/*"> -->
                  <b-form-file v-model="thumbnail" ref="thumbnail" placeholder="Replace Thumbnail..." accept="image/*"
                  :state="$v.thumbnail.$error?false:null"
                  @click.native="$v.thumbnail.$touch"
                  ></b-form-file>
                  <div v-if="$v.thumbnail.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.thumbnail.required">Thumbnail is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.thumbnail.size.maxValue">Must be less than {{ ($v.thumbnail.size.$params.maxValue.max)/(1024*1024)}} MB</div>
                  </div>
                </b-form-group>
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
      <b-btn class="mt-3" variant="primary" @click="addProduct" :disabled="$v.$invalid">Add Product</b-btn>
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
const {required, numeric, minLength, maxLength, maxValue} = require('vuelidate/lib/validators')
export default {
  name: 'Product',
  components: {
    cSwitch
  },
  data () {
    return {
      products: [],
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'image', label: 'Image' },
        { key: 'ProductID', label: 'ID' },
        { key: 'ProductName', label: 'Name' },
        { key: 'ProductPrice', label: 'Price' },
        { key: 'SellerName', label: 'Seller' },
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
  validations: {
    selectedCategory: { required },
    selectedSeller: { required },
    name: { required, minLength: minLength(2), maxLength: maxLength(100) },
    price: { required, numeric, maxLength: maxLength(20) },
    location: { required, minLength: minLength(2), maxLength: maxLength(250) },
    stock: { required, numeric, maxLength: maxLength(20) },
    cartDesc: { required, minLength: minLength(2), maxLength: maxLength(250) },
    shortDesc: { required, minLength: minLength(2), maxLength: maxLength(1000) },
    longDesc: { required, minLength: minLength(2), maxLength: maxLength(5000) },
    mainImage: {
      required,
      size: { maxValue: maxValue(2 * 1024 * 1024) }
    },
    thumbnail: {
      required,
      size: { maxValue: maxValue(2 * 1024 * 1024) }
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
    showModal () {
      this.$refs.addProduct.show()
    },
    hideModal () {
      this.$refs.addProduct.hide()
    },
    getAllProducts () {
      this.$http.get(this.API_ENDPOINT + '/admin/product', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.products = response.data
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    getCategories () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/category', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.category = response.data
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    getSellers () {
      this.$http.get(this.API_ENDPOINT + '/admin/seller', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.sellers = response.data
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    addProduct () {
      var formData = new FormData()
      formData.append('productImage', this.productImage)
      formData.append('thumbnail', this.thumbnail)
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
          Events.$emit('alert', 'Product successfully added', 'success', true)
          this.getAllProducts()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
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
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    }
  },
  created () {
    this.getAllProducts()
    this.getCategories()
    this.getSellers()
  }
}
</script>
