<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Product: {{product.ProductID}}</h3>
      </b-card-header>
      <b-card-body>
        <div class="product-single">
          <b-row>
            <b-col sm="12">
              <div>
                <div class="d-block">
                  <b-row>
                    <b-col sm="12">
                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.product.ProductName.$error">
                            <label for="name">Product Name</label>
                            <b-form-input type="text" id="name" :state="$v.product.ProductName.$error?false:null" @blur.native="$v.product.ProductName.$touch" placeholder="Enter your product name" v-model.trim="product.ProductName"></b-form-input>
                            <div v-if="$v.product.ProductName.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductName.required">Name is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductName.minLength">Must have atleast {{ $v.product.ProductName.$params.minLength.min}} letters</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductName.maxLength">Must not exceed {{ $v.product.ProductName.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.product.ProductPrice.$error">
                            <label for="price">Price</label>
                            <b-form-input type="number" id="price" :state="$v.product.ProductPrice.$error?false:null" @blur.native="$v.product.ProductPrice.$touch" placeholder="Enter price" v-model.trim="product.ProductPrice"></b-form-input>
                            <div v-if="$v.product.ProductPrice.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductPrice.required">Price is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductPrice.numeric">Must be numbers only</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductPrice.maxLength">Must not exceed {{ $v.product.ProductPrice.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.product.ProductLocation.$error">
                            <label for="location">Location</label>
                            <b-form-input type="text" id="location" :state="$v.product.ProductLocation.$error?false:null" @blur.native="$v.product.ProductLocation.$touch" placeholder="Enter Product Location" v-model.trim="product.ProductLocation"></b-form-input>
                            <div v-if="$v.product.ProductLocation.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductLocation.required">Location is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductLocation.minLength">Must have atleast {{ $v.product.ProductLocation.$params.minLength.min}} letters</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductLocation.maxLength">Must not exceed {{ $v.product.ProductLocation.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.product.ProductStock.$error">
                            <label for="stock">Stock</label>
                            <b-form-input type="number" id="stock" :state="$v.product.ProductStock.$error?false:null" @blur.native="$v.product.ProductStock.$touch" placeholder="Enter Product Stock" v-model.trim="product.ProductStock"></b-form-input>
                            <div v-if="$v.product.ProductStock.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductStock.required">Stock is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductStock.numeric">Must be numbers only</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductStock.maxLength">Must not exceed {{ $v.product.ProductStock.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group
                            label="Category"
                            label-for="category"
                            :label-cols="11"
                            :horizontal="false"
                            :state="!$v.selectedCategory.$error">
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
                            label="Seller"
                            label-for="seller"
                            :label-cols="11"
                            :horizontal="false"
                            :state="!$v.selectedSeller.$error">
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
                          <b-form-group :state="!$v.product.ProductName.$error">
                            <label for="cartD">Cart Description</label>
                            <b-form-textarea id="cartD"
                                             v-model.trim="product.ProductCartDesc"
                                             placeholder="Enter Cart Description here...."
                                             :state="$v.product.ProductCartDesc.$error?false:null"
                                             @blur.native="$v.product.ProductCartDesc.$touch"
                                             :rows="3"
                                             :max-rows="3">
                            </b-form-textarea>
                            <div v-if="$v.product.ProductCartDesc.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductCartDesc.required">Cart Description is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductCartDesc.minLength">Must have atleast {{ $v.product.ProductCartDesc.$params.minLength.min}} letters</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductCartDesc.maxLength">Must not exceed {{ $v.product.ProductCartDesc.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.product.ProductShortDesc.$error">
                            <label for="shortD">Short Description</label>
                            <b-form-textarea id="shortD"
                                             v-model.trim="product.ProductShortDesc"
                                             placeholder="Enter Short Product Description here...."
                                             :state="$v.product.ProductShortDesc.$error?false:null"
                                             @blur.native="$v.product.ProductShortDesc.$touch"
                                             :rows="3"
                                             :max-rows="3">
                            </b-form-textarea>
                            <div v-if="$v.product.ProductShortDesc.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductShortDesc.required">Short Description is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductShortDesc.minLength">Must have atleast {{ $v.product.ProductShortDesc.$params.minLength.min}} letters</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductShortDesc.maxLength">Must not exceed {{ $v.product.ProductShortDesc.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="12">
                          <b-form-group :state="!$v.product.ProductLongDesc.$error">
                            <label for="longD">Long Description</label>
                            <b-form-textarea id="longD"
                                             v-model.trim="product.ProductLongDesc"
                                             placeholder="Enter long Description here...."
                                             :state="$v.product.ProductLongDesc.$error?false:null"
                                             @blur.native="$v.product.ProductLongDesc.$touch"
                                             :rows="3"
                                             :max-rows="6">
                            </b-form-textarea>
                            <div v-if="$v.product.ProductLongDesc.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.product.ProductLongDesc.required">Long Description is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductLongDesc.minLength">Must have atleast {{ $v.product.ProductLongDesc.$params.minLength.min}} letters</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.product.ProductLongDesc.maxLength">Must not exceed {{ $v.product.ProductLongDesc.$params.maxLength.max}} letters</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.mainImage.size.$error">
                            <label for="Image" style="width:100%">Product Image</label>
                            <!-- <croppa ref="mainImage" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="Image"></croppa> -->
                            <!-- <input type="file"  accept="image/*"> -->
                            <img :src="this.API_ENDPOINT+'/admin/product/image/'+product.ProductID+'?x='+Date.now()" :alt="product.ProductName" style="width:100%" class="mb-3"/>
                            <b-form-file v-model="mainImage" ref="mainImage" placeholder="Replace image..." accept="image/*"
                            :state="$v.mainImage.size.$error?false:null"
                            @change.native="$v.mainImage.size.$touch"
                            ></b-form-file>
                            <div v-if="$v.mainImage.size.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.mainImage.size.maxValue">Must be less than {{ ($v.mainImage.size.$params.maxValue.max)/(1024*1024)}} MB</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.thumbnail.size.$error">
                            <label for="thumb" style="width:100%">Product Thumbnail</label>
                            <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                            <!-- <input type="file" ref="thumbnail" accept="image/*"> -->
                            <img :src="this.API_ENDPOINT+'/admin/product/thumbnail/'+product.ProductID+'?x='+Date.now()" :alt="product.ProductName" style="width:100%" class="mb-3"/>
                            <b-form-file v-model="thumbnail" ref="thumbnail" placeholder="Replace Thumbnail..." accept="image/*"
                            :state="$v.thumbnail.size.$error?false:null"
                            @change.native="$v.thumbnail.size.$touch"
                            ></b-form-file>
                            <div v-if="$v.thumbnail.size.$error">
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
                <b-btn class="mt-3" variant="primary" @click="updateProduct" :disabled="$v.$invalid">Update Product</b-btn>
              </div>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Product ID: {{this.product.ProductID}}</div>
    </b-card>
    <b-modal ref="info" size="sm" centered header-bg-variant="info" hide-footer title="Info">
      <div class="mb-3 text-center">
        Product Updated
      </div>
      <b-button variant="outline-success" @click="closeModal" block>Close</b-button>
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
  name: 'ProductSingle',
  components: {
    cSwitch
  },
  data () {
    return {
      product: '',
      category: [],
      selectedCategory: null,
      sellers: [],
      selectedSeller: null,
      productActive: true,
      mainImage: '',
      thumbnail: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
  },
  validations: {
    selectedCategory: { required },
    selectedSeller: { required },
    product: {
      ProductName: { required, minLength: minLength(2), maxLength: maxLength(100) },
      ProductPrice: { required, numeric, maxLength: maxLength(20) },
      ProductLocation: { required, minLength: minLength(2), maxLength: maxLength(250) },
      ProductStock: { required, numeric, maxLength: maxLength(20) },
      ProductCartDesc: { required, minLength: minLength(2), maxLength: maxLength(250) },
      ProductLongDesc: { required, minLength: minLength(2), maxLength: maxLength(1000) },
      ProductShortDesc: { required, minLength: minLength(2), maxLength: maxLength(5000) }
    },
    mainImage: {
      size: { maxValue: maxValue(2 * 1024 * 1024) }
    },
    thumbnail: {
      size: { maxValue: maxValue(2 * 1024 * 1024) }
    }
  },
  methods: {
    closeModal () {
      this.$refs.info.hide()
    },
    getProduct () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/' + this.productId, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.product = response.data
        this.selectedCategory = response.data.CategoryID
        this.selectedSeller = response.data.SellerID
        if (response.data.ProductVisible === 1) {
          this.productActive = true
        } else {
          this.productActive = false
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    getCategories () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/category', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.category = response.data
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    },
    getSellers () {
      this.$http.get(this.API_ENDPOINT + '/admin/seller', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.sellers = response.data
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    },
    updateProduct () {
      console.log(this.mainImage)
      var formData = new FormData()
      if (this.mainImage !== '') {
        var productImage = this.mainImage
        formData.append('productImage', productImage)
      }
      if (this.thumbnail !== '') {
        var thumbnail = this.thumbnail
        formData.append('thumbnail', thumbnail)
      }
      formData.append('name', this.product.ProductName)
      formData.append('price', this.product.ProductPrice)
      formData.append('location', this.product.ProductLocation)
      formData.append('stock', this.product.ProductStock)
      formData.append('cartDescription', this.product.ProductCartDesc)
      formData.append('shortDescription', this.product.ProductShortDesc)
      formData.append('longDescription', this.product.ProductLongDesc)
      formData.append('categoryID', this.selectedCategory)
      formData.append('sellerID', this.selectedSeller)
      formData.append('visible', this.productActive ? '1' : '0')
      this.$http.put(this.API_ENDPOINT + '/admin/product/' + this.product.ProductID, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getProduct()
          this.$refs.info.show()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        window.alert(err.response.data)
        Events.$emit('alert', err.response.data, 'danger', true)
      })
    }
  },
  created () {
    this.getProduct()
    this.getCategories()
    this.getSellers()
  },
  props: ['productId']
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
