<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Orders: {{orderDetailId}}</h3>
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
                          <img :src="this.API_ENDPOINT+'/admin/product/image/'+orderDetail.ProductID+'?x='+Date.now()" :alt="product.ProductName" style="width:100%" />
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="name">Product Name</label>
                            <b-form-input type="text" id="name" disabled placeholder="Enter your product name" v-model="orderDetail.ProductName"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="price">Price</label>
                            <b-form-input type="number" id="price" disabled placeholder="Enter price" v-model="orderDetail.ProductPrice"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <h1 class="section">Order Details</h1>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="orderId">Order ID</label>
                            <b-form-input type="text" id="orderId" disabled v-model="order.OrderID"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="pType">Payment Type</label>
                            <b-form-input type="text" id="pType" disabled v-model="order.PaymentType"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="orderUser">Order Username</label>
                            <b-form-input type="text" id="orderUser" disabled v-model="order.OrderUsername"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="orderTax">Order Tax</label>
                            <b-form-input type="number" id="orderTax" disabled v-model="order.OrderTax"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderEmail.$error">
                            <label for="orderEmail">Order Email</label>
                            <b-form-input type="email" id="orderEmail" :state="$v.order.OrderEmail.$error?false:null" @blur.native="$v.order.OrderEmail.$touch" v-model.trim="order.OrderEmail"></b-form-input>
                            <div v-if="$v.order.OrderEmail.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderEmail.required">Order Email is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderEmail.email">Must be valid email</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderAmount.$error">
                            <label for="orderAmount">Order Amount</label>
                            <b-form-input type="number" id="orderAmount" :state="$v.order.OrderAmount.$error?false:null" @blur.native="$v.order.OrderAmount.$touch" v-model.trim="order.OrderAmount"></b-form-input>
                            <div v-if="$v.order.OrderAmount.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderAmount.required">Order Amount is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderAmount.numeric">Must be number only</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderAmount.maxLength">Must not exceed {{ $v.order.OrderAmount.$params.maxLength.max}} number</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderPhone.$error">
                            <label for="orderPhone">Order Phone</label>
                            <b-form-input type="text" id="orderPhone" :state="$v.order.OrderPhone.$error?false:null" @blur.native="$v.order.OrderPhone.$touch" v-model.trim="order.OrderPhone"></b-form-input>
                            <div v-if="$v.order.OrderPhone.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderPhone.required">Phone is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderPhone.numeric">Must be number only</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderPhone.minLength">Must have atleast {{ $v.order.OrderPhone.$params.minLength.min}} number</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderPhone.maxLength">Must not exceed {{ $v.order.OrderPhone.$params.maxLength.max}} number</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderCountry.$error">
                            <label for="ordercountry">Order Country</label>
                            <b-form-input type="text" id="ordercountry" :state="$v.order.OrderCountry.$error?false:null" @blur.native="$v.order.OrderCountry.$touch" v-model.trim="order.OrderCountry"></b-form-input>
                            <div v-if="$v.order.OrderCountry.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderCountry.required">Country is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderCountry.minLength">Must have atleast {{ $v.order.OrderCountry.$params.minLength.min}} letter</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderCountry.maxLength">Must not exceed {{ $v.order.OrderCountry.$params.maxLength.max}} letter</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderShipAddress.$error">
                            <label for="address">Address</label>
                            <b-form-textarea id="address"
                                             v-model.trim="order.OrderShipAddress"
                                             placeholder="Address.."
                                             :rows="3"
                                             :max-rows="6"
                                             :state="$v.order.OrderShipAddress.$error?false:null" @blur.native="$v.order.OrderShipAddress.$touch">
                            </b-form-textarea>
                            <div v-if="$v.order.OrderShipAddress.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderShipAddress.required">Ship Address is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderShipAddress.minLength">Must have atleast {{ $v.order.OrderShipAddress.$params.minLength.min}} letter</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderShipAddress.maxLength">Must not exceed {{ $v.order.OrderShipAddress.$params.maxLength.max}} letter</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderShipAddress2.$error">
                            <label for="address2">Address 2</label>
                            <b-form-textarea id="address2"
                                             v-model.trim="order.OrderShipAddress2"
                                             placeholder="Address 2.."
                                             :rows="3"
                                             :max-rows="6"
                                             :state="$v.order.OrderShipAddress2.$error?false:null" @blur.native="$v.order.OrderShipAddress2.$touch">
                            </b-form-textarea>
                            <div v-if="$v.order.OrderShipAddress2.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderShipAddress2.minLength">Must have atleast {{ $v.order.OrderShipAddress2.$params.minLength.min}} letter</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderShipAddress2.maxLength">Must not exceed {{ $v.order.OrderShipAddress2.$params.maxLength.max}} letter</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderState.$error">
                            <label for="orderState">Order State</label>
                            <b-form-input type="text" id="orderState" :state="$v.order.OrderState.$error?false:null" @blur.native="$v.order.OrderState.$touch" v-model.trim="order.OrderState"></b-form-input>
                            <div v-if="$v.order.OrderState.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderState.required">State is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderState.minLength">Must have atleast {{ $v.order.OrderState.$params.minLength.min}} letter</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderState.maxLength">Must not exceed {{ $v.order.OrderState.$params.maxLength.max}} letter</div>
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderCity.$error">
                            <label for="orderCity">Order City</label>
                            <b-form-input type="text" id="orderCity" :state="$v.order.OrderCity.$error?false:null" @blur.native="$v.order.OrderCity.$touch" v-model.trim="order.OrderCity"></b-form-input>
                            <div v-if="$v.order.OrderCity.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderCity.required">City is required</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderCity.minLength">Must have atleast {{ $v.order.OrderCity.$params.minLength.min}} letter</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderCity.maxLength">Must not exceed {{ $v.order.OrderCity.$params.maxLength.max}} letter</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group :state="!$v.order.OrderZip.$error">
                            <label for="orderZip">Order Zip</label>
                            <b-form-input type="text" id="orderZip" :state="$v.order.OrderZip.$error?false:null" @blur.native="$v.order.OrderZip.$touch" v-model.trim="order.OrderZip"></b-form-input>
                            <div v-if="$v.order.OrderZip.$error">
                              <div class="invalid-feedback d-block" v-if="!$v.order.OrderZip.numeric">Must be number only</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderZip.minLength">Must have atleast {{ $v.order.OrderZip.$params.minLength.min}} number</div>
                              <div class="invalid-feedback d-block" v-else-if="!$v.order.OrderZip.maxLength">Must not exceed {{ $v.order.OrderZip.$params.maxLength.max}} number</div>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <h1 class="section">Order Process Details</h1>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group
                            label="Order Status"
                            label-for="orderStatus"
                            :label-cols="3"
                            :horizontal="true">
                            <b-form-radio-group
                              id="orderStatus"
                              stacked>
                              <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" v-model="order.OrderStatus" class="custom-control-input" value="0">
                                <label class="custom-control-label" for="customRadio1">Pending</label>
                              </div>
                              <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" v-model="order.OrderStatus" class="custom-control-input" value="1" checked>
                                <label class="custom-control-label" for="customRadio2">Completed</label>
                              </div>
                              <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio3" v-model="order.OrderStatus" class="custom-control-input" value="2">
                                <label class="custom-control-label" for="customRadio3">Canceled</label>
                              </div>
                            </b-form-radio-group>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="orderDate">Order Date</label>
                            <b-form-input type="text" id="orderDate" disabled v-model="order.OrderDate"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="adminController">Last Updated By</label>
                            <b-form-input type="text" id="adminController" disabled v-model="order.AdminUsername"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col sm="6">
                          <b-form-group>
                            <label for="orderUpdate">Last Update Date</label>
                            <b-form-input type="text" id="orderUpdate" disabled v-model="order.orderUpdateDate"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
                <b-btn class="mt-3" variant="primary" @click="updateOrder">Update Order</b-btn>
              </div>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Order ID: {{this.orderDetailId}}</div>
    </b-card>
    <b-modal ref="info" size="sm" centered header-bg-variant="info" hide-footer title="Info">
      <div class="mb-3 text-center">
        Order Updated
      </div>
      <b-button variant="outline-success" @click="closeModal" block>Close</b-button>
    </b-modal>
    <!-- <div class="position-alert">
      <b-alert :variant="alertVariant"
               dismissible
               :show="alertVisible"
               @dismissed="alertVisible=false">
        {{alertText}}
      </b-alert>
    </div> -->

  </div>
</template>

<script>
import {Events} from '../../events.js'
const {required, numeric, minLength, maxLength, email} = require('vuelidate/lib/validators')
export default {
  name: 'OrderSingle',
  data () {
    return {
      orderDetail: '',
      order: '',
      product: ''
    }
  },
  validations: {
    order: {
      OrderAmount: { required, numeric, maxLength: maxLength(20) },
      OrderCity: { required, minLength: minLength(2), maxLength: maxLength(50) },
      OrderCountry: { required, minLength: minLength(2), maxLength: maxLength(50) },
      OrderEmail: { required, email },
      OrderPhone: { required, numeric, minLength: minLength(10), maxLength: maxLength(20) },
      OrderShipAddress: { required, minLength: minLength(2), maxLength: maxLength(100) },
      OrderShipAddress2: { minLength: minLength(2), maxLength: maxLength(100) },
      OrderState: { required, minLength: minLength(2), maxLength: maxLength(50) },
      OrderZip: { numeric, minLength: minLength(2), maxLength: maxLength(20) }
    }
  },
  methods: {
    closeModal () {
      this.$refs.info.hide()
    },
    getOrderDetail () {
      this.$http.get(this.API_ENDPOINT + '/admin/order/detail/' + this.orderDetailId, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.orderDetail = response.data
        this.getOrder()
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    getOrder () {
      this.$http.get(this.API_ENDPOINT + '/admin/order/' + this.orderDetail.OrderID, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.order = response.data
        this.order.OrderDate = this.order.OrderDate.substring(0, 19).replace('T', ' ')
        if (this.order.orderUpdateDate) {
          this.order.orderUpdateDate = this.order.orderUpdateDate.substring(0, 19).replace('T', ' ')
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
    updateOrder () {
      var body = {
        'amount': this.order.OrderAmount,
        'shipAddress': this.order.OrderShipAddress,
        'shipAddress2': this.order.OrderShipAddress2,
        'city': this.order.OrderCity,
        'state': this.order.OrderState,
        'zip': this.order.OrderZip,
        'country': this.order.OrderCountry,
        'phone': this.order.OrderPhone,
        'tax': this.order.OrderTax,
        'email': this.order.OrderEmail,
        'status': this.order.OrderStatus
      }
      this.$http.put(this.API_ENDPOINT + '/admin/order/' + this.order.OrderID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.$refs.info.show()
          this.getOrderDetail()
          Events.$emit('alert', 'Order Updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    }

  },
  created () {
    this.getOrderDetail()
    // this.getProduct()
    // this.getSellers()
  },
  props: ['orderDetailId']
}
</script>
<style scoped>
  h1.section{
    font-size: 1.4rem;
    padding-bottom:5px;
    border-bottom: 1px solid #c5c5c5;
    margin-bottom: 20px;
    margin-top: 30px;
    font-weight: 900;
  }
  .position-alert{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 20000
  }
</style>
