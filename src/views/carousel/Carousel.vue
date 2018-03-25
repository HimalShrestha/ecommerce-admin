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
                  {{data.index+1 + ((currentPage-1)*SIZE)}}
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
      <div style="padding: 0.75rem 1.25rem;background-color: #f0f3f5;border-top: 1px solid #c2cfd6;"><b-pagination align="right" :total-rows="count" :per-page="this.SIZE" v-model="currentPage" style="margin: 0px;"></b-pagination></div>
    </b-card>
    <b-modal ref="addCarousel" size="lg" header-bg-variant="primary" hide-footer title="Add Carousel">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <!-- <label for="postImage" style="width:100%">Image</label>
                <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa>
                <input type="file" id="postImage" ref="image" @change="showImage" accept="image/*"/> -->
                <b-form-group :state="!$v.image.$error">
                  <label for="Image" style="width:100%">Image</label>
                  <b-form-file v-model="image" ref="image" placeholder="Upload image..." accept="image/*"
                  :state="$v.image.$error?false:null"
                  @click.native="$v.image.$touch"
                  @input="showImage"
                  ></b-form-file>
                  <div v-if="$v.image.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.image.required">Image is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.image.size.maxValue">Must be less than {{ ($v.image.size.$params.maxValue.max)/(1024*1024)}} MB</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <img :src="imageURL" alt="" style="max-width:300px;">
              </b-col>
              <b-col sm="12">
                <b-form-group :state="!$v.imageDesc.$error">
                  <label for="carDesc">Description</label>
                  <b-form-textarea id="carDesc" :state="$v.imageDesc.$error?false:null" @blur.native="$v.imageDesc.$touch"
                                   v-model.trim="imageDesc"
                                   placeholder="Enter Image Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                  <div v-if="$v.imageDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.imageDesc.required">Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.imageDesc.minLength">Must have atleast {{ $v.imageDesc.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.imageDesc.maxLength">Must not exceed {{ $v.imageDesc.$params.maxLength.max}} letters</div>
                  </div>
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
      <b-btn class="mt-3" variant="primary" @click="addCarousel" :disabled="isValid">Add Carousel</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>
    <b-modal ref="editCarousel" size="lg" header-bg-variant="primary" hide-footer title="Edit Carousel">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="12">
                <!-- <label for="putImage" style="width:100%">Image</label>
                <croppa ref="thumbnail" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="thumb"></croppa>
                <input type="file" id="putImage" ref="putImage" @change="putShowImage" accept="image/*" /> -->
                <b-form-group :state="!$v.putImage.$error">
                  <label for="Image" style="width:100%">Image</label>
                  <!-- <croppa ref="mainImage" :accept="'image/*'" :file-size-limit="0" :width="200" :height="100" id="Image"></croppa> -->
                  <!-- <input type="file"  accept="image/*"> -->
                  <b-form-file v-model="putImage" ref="putImage" placeholder="Upload image..." accept="image/*"
                  :state="$v.putImage.$error?false:null"
                  @click.native="$v.putImage.$touch"
                  @input="putShowImage"
                  ></b-form-file>
                  <div v-if="$v.putImage.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.putImage.required">Image is required</div>
                    <div class="invalid-feedback d-block" v-if="!$v.putImage.size.maxValue">Must be less than {{ ($v.putImage.size.$params.maxValue.max)/(1024*1024)}} MB</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <img :src="imageURL" alt="" style="max-width:300px;">
              </b-col>
              <b-col sm="12">
                <b-form-group :state="!$v.carouselSingle.CarouselDesc.$error">
                  <label for="carDesc">Description</label>
                  <b-form-textarea id="carDesc" :state="$v.carouselSingle.CarouselDesc.$error?false:null" @blur.native="$v.carouselSingle.CarouselDesc.$touch"
                                   v-model.trim="carouselSingle.CarouselDesc"
                                   placeholder="Enter Image Description here...."
                                   :rows="3"
                                   :max-rows="3">
                  </b-form-textarea>
                  <div v-if="$v.carouselSingle.CarouselDesc.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.carouselSingle.CarouselDesc.required">Description is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.carouselSingle.CarouselDesc.minLength">Must have atleast {{ $v.carouselSingle.CarouselDesc.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.carouselSingle.CarouselDesc.maxLength">Must not exceed {{ $v.carouselSingle.CarouselDesc.$params.maxLength.max}} letters</div>
                  </div>
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
      <b-btn class="mt-3" variant="primary" @click="updateCarousel" :disabled="$v.carouselSingle.$invalid">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>
    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteCarousel">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
    </b-modal>

  </div>
</template>

<script>
import cSwitch from '../../components/Switch'
import {Events} from '../../events.js'
const {required, minLength, maxLength, maxValue} = require('vuelidate/lib/validators')
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
      deleteId: '',
      image: '',
      putImage: '',
      currentPage: 1,
      count: 0
    }
  },
  validations: {
    imageDesc: { required, minLength: minLength(2), maxLength: maxLength(45) },
    image: {
      required,
      size: { maxValue: maxValue(2 * 1024 * 1024) }
    },
    putImage: {
      required,
      size: { maxValue: maxValue(2 * 1024 * 1024) }
    },
    carouselSingle: {
      CarouselDesc: { required, minLength: minLength(2), maxLength: maxLength(45) }
    }
  },
  watch: {
    currentPage: function (naya, purano) {
      this.getCarousels()
    }
  },
  computed: {
    isValid () {
      if (this.$v.image.$invalid || this.$v.imageDesc.$invalid) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    putShowImage () {
      var image = this.putImage
      var reader = new FileReader()
      reader.onloadend = () => {
        this.imageURL = reader.result
      }
      reader.readAsDataURL(image)
    },
    showImage () {
      var img = this.image
      var reader = new FileReader()
      reader.onloadend = () => {
        this.imageURL = reader.result
      }
      reader.readAsDataURL(img)
    },
    updateCarousel () {
      var body = new FormData()
      var image = this.putImage
      if (image !== '') {
        body.append('image', image)
      }
      body.append('imageDesc', this.carouselSingle.CarouselDesc)
      body.append('status', this.putStatus ? 1 : 0)
      this.$http.put(this.API_ENDPOINT + '/admin/carousel/' + this.carouselSingle.CarouselID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCarousels()
          this.closeEdit()
          Events.$emit('alert', 'Image Updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
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
      this.$http.get(this.API_ENDPOINT + '/admin/carousel?size=' + this.SIZE + '&page=' + this.currentPage, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.carousels = response.data.data
        this.count = response.data.count
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    addCarousel () {
      var body = new FormData()
      var image = this.image
      body.append('image', image)
      body.append('imageDesc', this.imageDesc)
      body.append('status', this.status ? 1 : 0)
      this.$http.post(this.API_ENDPOINT + '/admin/carousel', body, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.getCarousels()
          Events.$emit('alert', 'Image Added', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    deleteCarousel () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/carousel/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getCarousels()
          this.cancelDelete()
          Events.$emit('alert', 'Image Deleted', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
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
