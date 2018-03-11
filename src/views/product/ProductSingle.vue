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
                          <label for="name">Product Image</label>
                          <img :src="this.API_ENDPOINT+'/admin/product/image/'+product.ProductID+'?x='+Date.now()" :alt="product.ProductName" style="width:100%" />
                        </b-col>
                        <b-col sm="6">
                          <label for="name">Product Thumbnail</label>
                          <img :src="this.API_ENDPOINT+'/admin/product/thumbnail/'+product.ProductID+'?x='+Date.now()" :alt="product.ProductName" style="width:100%" />
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="name">Product Name</label>
                            <b-form-input type="text" id="name" placeholder="Enter your product name" v-model="product.ProductName"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="price">Price</label>
                            <b-form-input type="number" id="price" placeholder="Enter price" v-model="product.ProductPrice"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="location">Location</label>
                            <b-form-input type="text" id="location" placeholder="Enter Product Location" v-model="product.ProductLocation"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="stock">Stock</label>
                            <b-form-input type="number" id="stock" placeholder="Enter Product Stock" v-model="product.ProductStock"></b-form-input>
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
                                             v-model="product.ProductCartDesc"
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
                                             v-model="product.ProductShortDesc"
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
                                             v-model="product.ProductLongDesc"
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
                          <input type="file" ref="mainImage" title="Replace">
                        </b-col>
                        <b-col sm="6">
                          <label for="thumb" style="width:100%">Thumbnail</label>
                          <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                          <input type="file" ref="thumbnail" title="Replace">
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
                <b-btn class="mt-3" variant="primary" @click="updateProduct">Update Product</b-btn>
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
// import {Events} from '../../events.js'
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
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
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
    updateProduct () {
      var formData = new FormData()
      if (this.$refs.mainImage.files[0] !== undefined) {
        var productImage = this.$refs.mainImage.files[0]
        formData.append('productImage', productImage)
      }
      if (this.$refs.thumbnail.files[0] !== undefined) {
        var thumbnail = this.$refs.thumbnail.files[0]
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
