<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Product Category</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Category</b-button>
      </b-card-header>
      <b-card-body>
        <div class="orders">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="category" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index+1 + ((currentPage-1)*SIZE)}}
                </template>
                <template slot="image" slot-scope="data">
                  <img :src="API_ENDPOINT+'/admin/product/image/'+data.item.ProductID" alt="" style="max-width:100px;">
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editCategory(data.item.CategoryID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.CategoryID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div style="padding: 0.75rem 1.25rem;background-color: #f0f3f5;border-top: 1px solid #c2cfd6;"><b-pagination align="right" :total-rows="count" :per-page="this.SIZE" v-model="currentPage" style="margin: 0px;"></b-pagination></div>
    </b-card>
    <b-modal ref="addCategory" size="lg" header-bg-variant="primary" hide-footer title="Add Category">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group :state="!$v.categoryName.$error">
                  <label for="cat">Category Name</label>
                  <b-form-input type="text" id="cat" placeholder="Enter Category Name" v-model.trim="categoryName" :state="$v.categoryName.$error?false:null" @focus.native="$v.categoryName.$touch"></b-form-input>
                  <div v-if="$v.categoryName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.categoryName.required">Category name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.categoryName.minLength">Must have atleast {{ $v.categoryName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.categoryName.maxLength">Must not exceed {{ $v.categoryName.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addCategory" :disabled="$v.$invalid">Add Category</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editCategory" size="lg" header-bg-variant="primary" hide-footer title="Edit Category">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group :state="!$v.categoryName.$error">
                  <label for="cat">Category Name</label>
                  <b-form-input type="text" id="cat" placeholder="Enter Category Name" v-model.trim="categoryName" :state="$v.categoryName.$error?false:null" @focus.native="$v.categoryName.$touch"></b-form-input>
                  <div v-if="$v.categoryName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.categoryName.required">Category name is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.categoryName.minLength">Must have atleast {{ $v.categoryName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.categoryName.maxLength">Must not exceed {{ $v.categoryName.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateCategory" :disabled="$v.$invalid">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteCategory">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
    </b-modal>

  </div>
</template>

<script>
import {Events} from '../../events.js'
const {required, minLength, maxLength} = require('vuelidate/lib/validators')
export default {
  name: 'Category',
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'CategoryName', label: 'Name' },
        { key: 'CategoryID', label: 'Category ID' },
        { key: 'option', label: 'Options' }
      ],
      category: [],
      categoryName: '',
      categoryId: '',
      deleteId: '',
      currentPage: 1,
      count: 0
    }
  },
  validations: {
    categoryName: { required, minLength: minLength(2), maxLength: maxLength(100) }
  },
  watch: {
    currentPage: function (naya, purano) {
      this.getCategories()
    }
  },
  methods: {
    updateCategory () {
      this.$http.put(this.API_ENDPOINT + '/admin/product/category/' + this.categoryId, {'categoryName': this.categoryName}, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCategories()
          this.closeEdit()
          Events.$emit('alert', 'Category Updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    editCategory (id) {
      this.category.forEach(item => {
        if (item.CategoryID === id) {
          this.categoryName = item.CategoryName
          this.categoryId = id
        }
      })
      this.$refs.editCategory.show()
    },
    closeEdit () {
      this.$refs.editCategory.hide()
    },
    cancelDelete () {
      this.$refs.confirm.hide()
    },
    confirm (id) {
      this.$refs.confirm.show()
      this.deleteId = id
    },
    showModal () {
      this.$refs.addCategory.show()
    },
    hideModal () {
      this.$refs.addCategory.hide()
    },
    getCategories () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/category?size=' + this.SIZE + '&page=' + this.currentPage, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.category = response.data.data
        this.count = response.data.count
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    addCategory () {
      var body = {
        'categoryName': this.categoryName
      }
      this.$http.post(this.API_ENDPOINT + '/admin/product/category', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.getCategories()
          Events.$emit('alert', 'Category Added', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    deleteCategory () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/product/category/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCategories()
          this.cancelDelete()
          Events.$emit('alert', 'Category Deleted', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    }
  },
  created () {
    // this.getAllOrders()
    this.getCategories()
    // this.getSellers()
  }
}
</script>
