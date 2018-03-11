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
                  {{data.index + 1}}
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
      <div slot="footer">Card footer</div>
    </b-card>
    <b-modal ref="addCategory" size="lg" header-bg-variant="primary" hide-footer title="Add Category">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="cat">Category Name</label>
                  <b-form-input type="text" id="cat" placeholder="Enter Category Name" v-model="categoryName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addCategory">Add Category</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editCategory" size="lg" header-bg-variant="primary" hide-footer title="Edit Category">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <b-form-group>
                  <label for="cat">Category Name</label>
                  <b-form-input type="text" id="cat" placeholder="Enter Category Name" v-model="categoryName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateCategory">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteCategory">Yes</b-button>
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
        { key: 'CategoryName', label: 'Name' },
        { key: 'CategoryID', label: 'Category ID' },
        { key: 'option', label: 'Options' }
      ],
      category: [],
      categoryName: '',
      categoryId: '',
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
  },
  methods: {
    updateCategory () {
      this.$http.put(this.API_ENDPOINT + '/admin/product/category/' + this.categoryId, {'categoryName': this.categoryName}, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCategories()
          this.closeEdit()
        }
      }).catch(err => {
        console.log('this is an error ', err)
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
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
    },
    showModal () {
      this.$refs.addCategory.show()
    },
    hideModal () {
      this.$refs.addCategory.hide()
    },
    getCategories () {
      this.$http.get(this.API_ENDPOINT + '/admin/product/category', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.category = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addCategory () {
      var body = {
        'categoryName': this.categoryName
      }
      this.$http.post(this.API_ENDPOINT + '/admin/product/category', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.alertText = 'Category successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getCategories()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
      })
    },
    deleteCategory () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/product/category/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCategories()
          this.cancelDelete()
        }
      }).catch(err => {
        console.log('this is an error ', err)
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
<style>
  .position-alert{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 20000
  }
</style>
