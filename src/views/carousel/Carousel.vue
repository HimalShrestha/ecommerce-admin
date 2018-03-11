<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Carousel</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Carousel</b-button>
      </b-card-header>
      <b-card-body>
        <div class="carousel">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="carousels" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="image" slot-scope="data">
                  <img :src="API_ENDPOINT+'/admin/carousel/image/'+data.item.CarouselID+'?x='+Date.now()" alt="" style="max-width:300px;">
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editCarousel(data.item.CarouselID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.CarouselID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Carousel</div>
    </b-card>
    <b-modal ref="addCarousel" size="lg" header-bg-variant="primary" hide-footer title="Add Carousel">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <label for="postImage" style="width:100%">Image</label>
                <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                <input type="file" id="postImage" ref="image" @change="showImage" accept="image/*"/>
              </b-col>
              <b-col sm="12">
                <img :src="imageURL" alt="" style="max-width:300px;">
              </b-col>
              <b-col sm="12">
                <b-form-group>
                  <label for="carDesc">Description</label>
                  <b-form-textarea id="carDesc"
                                   v-model="imageDesc"
                                   placeholder="Enter Image Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="status"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addCarousel">Add Carousel</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editCarousel" size="lg" header-bg-variant="primary" hide-footer title="Edit Carousel">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <label for="putImage" style="width:100%">Image</label>
                <!-- <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa> -->
                <input type="file" id="putImage" ref="putImage" @change="putShowImage" accept="image/*" />
              </b-col>
              <b-col sm="12">
                <img :src="imageURL" alt="" style="max-width:300px;">
              </b-col>
              <b-col sm="12">
                <b-form-group>
                  <label for="carDesc">Description</label>
                  <b-form-textarea id="carDesc"
                                   v-model="carouselSingle.CarouselDesc"
                                   placeholder="Enter Image Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="putStatus"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateCarousel">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteCarousel">Yes</b-button>
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
  name: 'Carousel',
  components: {
    cSwitch
  },
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'CarouselID', label: 'Carousel ID' },
        { key: 'image', label: 'Image' },
        { key: 'CarouselDesc', label: 'Description' },
        { key: 'option', label: 'Options' }
      ],
      carousels: [],
      imageDesc: '',
      imageURL: '',
      status: true,
      carouselSingle: '',
      putStatus: '',
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
    putShowImage () {
      var image = this.$refs.putImage.files[0]
      var reader = new FileReader()
      reader.onloadend = () => {
        this.imageURL = reader.result
      }
      reader.readAsDataURL(image)
    },
    showImage () {
      var image = this.$refs.image.files[0]
      var reader = new FileReader()
      reader.onloadend = () => {
        this.imageURL = reader.result
      }
      reader.readAsDataURL(image)
    },
    updateCarousel () {
      var body = new FormData()
      var image = this.$refs.putImage.files[0]
      if (image !== undefined) {
        body.append('image', image)
      }
      body.append('imageDesc', this.carouselSingle.CarouselDesc)
      body.append('status', this.putStatus ? 1 : 0)
      this.$http.put(this.API_ENDPOINT + '/admin/carousel/' + this.carouselSingle.CarouselID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCarousels()
          this.closeEdit()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    editCarousel (id) {
      this.$http.get(this.API_ENDPOINT + '/admin/carousel/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.carouselSingle = response.data
        this.imageURL = this.API_ENDPOINT + '/admin/carousel/image/' + this.carouselSingle.CarouselID + '?x=' + Date.now()
        if (this.carouselSingle.CarouselStatus === 1) {
          this.putStatus = true
        } else {
          this.putStatus = false
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
      this.$refs.editCarousel.show()
    },
    closeEdit () {
      this.$refs.editCarousel.hide()
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
      this.imageDesc = ''
      this.imageURL = ''
      this.status = true
      this.$refs.addCarousel.show()
    },
    hideModal () {
      this.$refs.addCarousel.hide()
    },
    getCarousels () {
      this.$http.get(this.API_ENDPOINT + '/admin/carousel', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.carousels = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addCarousel () {
      var body = new FormData()
      var image = this.$refs.image.files[0]
      body.append('image', image)
      body.append('imageDesc', this.imageDesc)
      body.append('status', this.status ? 1 : 0)
      this.$http.post(this.API_ENDPOINT + '/admin/carousel', body, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.alertText = 'Carousel successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getCarousels()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
      })
    },
    deleteCarousel () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/carousel/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCarousels()
          this.cancelDelete()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    // this.getAllOrders()
    this.getCarousels()
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
