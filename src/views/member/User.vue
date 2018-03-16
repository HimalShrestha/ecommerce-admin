<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Manage Users</h3>
        <!-- <b-button variant="primary" class="float-right" @click="showModal">Add User</b-button> -->
      </b-card-header>
      <b-card-body>
        <div class="user">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="users" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="UserEmailVerified" slot-scope="data">
                  <b-badge v-if="data.item.UserEmailVerified===0" variant="danger">No</b-badge>
                  <b-badge v-if="data.item.UserEmailVerified===1" variant="success">Yes</b-badge>
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editUser(data.item.UserID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.UserID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Users</div>
    </b-card>
    <!-- <b-modal ref="addUser" size="lg" header-bg-variant="primary" hide-footer title="Add User">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" id="username" placeholder="Enter Username" v-model="username"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="password">Password</label>
                  <b-form-input type="text" id="password" placeholder="Enter Password" v-model="password"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="fname">Firstname</label>
                  <b-form-input type="text" id="fname" placeholder="Enter Firstname" v-model="fname"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" placeholder="Enter Lastname" v-model="lname"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" id="email" placeholder="Enter Email" v-model="email"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="Roles">
                  <b-form-checkbox-group stacked v-model="roles" name="flavour2" :options="rolesOptions">
                  </b-form-checkbox-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="addUser">Add User</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal> -->

    <b-modal ref="editUser" size="lg" header-bg-variant="primary" hide-footer title="Update User">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" id="username" disabled placeholder="Enter Email" v-model="userSingle.UserEmail"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.changePassword.$error">
                  <label for="password">Password</label>
                  <b-form-input type="text" id="password" :state="$v.changePassword.$error?false:null" placeholder="Enter Password to change" @blur.native="$v.changePassword.$touch" v-model.trim="changePassword"></b-form-input>
                  <div v-if="$v.changePassword.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.changePassword.minLength">Must have atleast {{ $v.changePassword.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.changePassword.maxLength">Must not exceed {{ $v.changePassword.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserFirstName.$error">
                  <label for="fname">Firstname</label>
                  <b-form-input type="text" id="fname" :state="$v.userSingle.UserFirstName.$error?false:null" @blur.native="$v.userSingle.UserFirstName.$touch" placeholder="Enter Firstname" v-model.trim="userSingle.UserFirstName"></b-form-input>
                  <div v-if="$v.userSingle.UserFirstName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserFirstName.required">Firstname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserFirstName.alpha">Must be only alphabets</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserFirstName.minLength">Must have atleast {{ $v.userSingle.UserFirstName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserFirstName.maxLength">Must not exceed {{ $v.userSingle.UserFirstName.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserLastName.$error">
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" :state="$v.userSingle.UserLastName.$error?false:null" @blur.native="$v.userSingle.UserLastName.$touch" placeholder="Enter Lastname" v-model.trim="userSingle.UserLastName"></b-form-input>
                  <div v-if="$v.userSingle.UserLastName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserLastName.required">Lastname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserLastName.alpha">Must be only alphabets</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserLastName.minLength">Must have atleast {{ $v.userSingle.UserLastName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserLastName.maxLength">Must not exceed {{ $v.userSingle.UserLastName.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserAddress.$error">
                  <label for="address">Address</label>
                  <b-form-input type="text" id="address" :state="$v.userSingle.UserAddress.$error?false:null" @blur.native="$v.userSingle.UserAddress.$touch" placeholder="Enter Address" v-model.trim="userSingle.UserAddress"></b-form-input>
                  <div v-if="$v.userSingle.UserAddress.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserAddress.minLength">Must have atleast {{ $v.userSingle.UserAddress.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserAddress.maxLength">Must not exceed {{ $v.userSingle.UserAddress.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserAddress2.$error">
                  <label for="address2">Address 2</label>
                  <b-form-input type="text" id="address2" :state="$v.userSingle.UserAddress2.$error?false:null" @blur.native="$v.userSingle.UserAddress2.$touch" placeholder="Enter Address 2" v-model.trim="userSingle.UserAddress2"></b-form-input>
                  <div v-if="$v.userSingle.UserAddress2.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserAddress2.minLength">Must have atleast {{ $v.userSingle.UserAddress2.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserAddress2.maxLength">Must not exceed {{ $v.userSingle.UserAddress2.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6" :state="!$v.userSingle.UserCity.$error">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" id="city" :state="$v.userSingle.UserCity.$error?false:null" @blur.native="$v.userSingle.UserCity.$touch" placeholder="Enter City" v-model.trim="userSingle.UserCity"></b-form-input>
                  <div v-if="$v.userSingle.UserCity.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserCity.minLength">Must have atleast {{ $v.userSingle.UserCity.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserCity.maxLength">Must not exceed {{ $v.userSingle.UserCity.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserState.$error">
                  <label for="state">State</label>
                  <b-form-input type="text" id="state" :state="$v.userSingle.UserState.$error?false:null" @blur.native="$v.userSingle.UserState.$touch" placeholder="Enter State" v-model.trim="userSingle.UserState"></b-form-input>
                  <div v-if="$v.userSingle.UserState.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserState.minLength">Must have atleast {{ $v.userSingle.UserState.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserState.maxLength">Must not exceed {{ $v.userSingle.UserState.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserZip.$error">
                  <label for="zip">Zip</label>
                  <b-form-input type="text" id="zip" :state="$v.userSingle.UserZip.$error?false:null" @blur.native="$v.userSingle.UserZip.$touch" placeholder="Enter Zip" v-model.trim="userSingle.UserZip"></b-form-input>
                  <div v-if="$v.userSingle.UserZip.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserZip.numeric">Zip must be number only</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserZip.minLength">Must have atleast {{ $v.userSingle.UserZip.$params.minLength.min}} numbers</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserZip.maxLength">Must not exceed {{ $v.userSingle.UserZip.$params.maxLength.max}} numbers</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserPhone.$error">
                  <label for="phone">Phone</label>
                  <b-form-input type="text" id="phone" :state="$v.userSingle.UserPhone.$error?false:null" @blur.native="$v.userSingle.UserPhone.$touch" placeholder="Enter Phone" v-model.trim="userSingle.UserPhone"></b-form-input>
                  <div v-if="$v.userSingle.UserPhone.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserPhone.numeric">Phone must be number only</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserPhone.minLength">Must have atleast {{ $v.userSingle.UserPhone.$params.minLength.min}} numbers</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserPhone.maxLength">Must not exceed {{ $v.userSingle.UserPhone.$params.maxLength.max}} numbers</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.userSingle.UserCountry.$error">
                  <label for="Country">Country</label>
                  <b-form-input type="text" id="Country" :state="$v.userSingle.UserCountry.$error?false:null" @blur.native="$v.userSingle.UserCountry.$touch" placeholder="Enter Country" v-model.trim="userSingle.UserCountry"></b-form-input>
                  <div v-if="$v.userSingle.UserCountry.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserCountry.alpha">Must be alphabets only</div>
                    <div class="invalid-feedback d-block" v-if="!$v.userSingle.UserCountry.minLength">Must have atleast {{ $v.userSingle.UserCountry.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.userSingle.UserCountry.maxLength">Must not exceed {{ $v.userSingle.UserCountry.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="userip">User IP</label>
                  <b-form-input type="text" id="userip" disabled placeholder="IP" v-model="userSingle.UserIP"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="userReg">Registration Date</label><br/>
                  <b-form-input type="text" id="userReg" disabled placeholder="IP" v-model="userSingle.UserRegistrationDate"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="status">Status</label><br/>
                  <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="userSingle.UserStatus"/>
                </b-form-group>
              </b-col>
            </b-row>


            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="fname">Is Seller</label><br/>
                  <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="userSingle.UserRole"/>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="fname">Email Verified</label><br/>
                  <c-switch type="text" variant="primary" on="On" off="Off" :pill="true" :checked="true" v-model="userSingle.UserEmailVerified"/>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateUser" :disabled="$v.userSingle.$invalid">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>

    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteUser">Yes</b-button>
      <b-button variant="outline-danger" @click="cancelDelete">Cancel</b-button>
    </b-modal>

  </div>
</template>

<script>
import {Events} from '../../events.js'
import cSwitch from '../../components/Switch'
const {required, numeric, minLength, alpha, maxLength} = require('vuelidate/lib/validators')
export default {
  name: 'User',
  components: {
    cSwitch
  },
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'UserEmail', label: 'Username' },
        { key: 'UserFirstName', label: 'Firstname' },
        { key: 'UserLastName', label: 'Lastname' },
        { key: 'UserEmailVerified', label: 'Verified' },
        { key: 'option', label: 'Options' }
      ],
      users: [],
      userSingle: {
        UserCountry: '',
        UserEmail: '',
        UserEmailVerified: '',
        UserFirstName: '',
        UserID: '',
        UserIP: '',
        UserLastName: '',
        UserPhone: '',
        UserRole: '',
        UserSellerID: '',
        UserStatus: '',
        UserAddress: '',
        UserAddress2: ''
      },
      changePassword: '',
      deleteId: ''
    }
  },
  validations: {
    userSingle: {
      UserFirstName: { required, alpha, minLength: minLength(2), maxLength: maxLength(50) },
      UserLastName: { required, alpha, minLength: minLength(2), maxLength: maxLength(50) },
      UserCity: { minLength: minLength(2), maxLength: maxLength(90) },
      UserState: { minLength: minLength(2), maxLength: maxLength(20) },
      UserZip: { numeric, minLength: minLength(2), maxLength: maxLength(12) },
      UserPhone: { numeric, minLength: minLength(10), maxLength: maxLength(20) },
      UserCountry: { alpha, minLength: minLength(2), maxLength: maxLength(20) },
      UserAddress: { minLength: minLength(2), maxLength: maxLength(100) },
      UserAddress2: { minLength: minLength(2), maxLength: maxLength(50) }
    },
    changePassword: { minLength: minLength(6), maxLength: maxLength(45) }
  },
  methods: {
    updateUser () {
      var body = {
        'fname': this.userSingle.UserFirstName,
        'lname': this.userSingle.UserLastName,
        'city': this.userSingle.UserCity,
        'state': this.userSingle.UserState,
        'zip': this.userSingle.UserZip,
        'phone': this.userSingle.UserPhone,
        'country': this.userSingle.UserCountry,
        'address': this.userSingle.UserAddress,
        'address2': this.userSingle.UserAddress2,
        'status': this.userSingle.UserStatus ? 1 : 0,
        'role': this.userSingle.UserRole ? 1 : 0
      }
      if (this.changePassword !== '') {
        body['password'] = this.changePassword
      }
      this.$http.put(this.API_ENDPOINT + '/admin/member/user/' + this.userSingle.UserID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllUsers()
          this.closeEdit()
          Events.$emit('alert', 'User successfully updated', 'success', true)
        }
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    },
    editUser (id) {
      this.$http.get(this.API_ENDPOINT + '/admin/member/user/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.userSingle = response.data
        this.userSingle.UserRegistrationDate = this.userSingle.UserRegistrationDate.substring(0, 19).replace('T', ' ')
        if (this.userSingle.UserRole === 0) {
          this.userSingle.UserRole = false
        } else {
          this.userSingle.UserRole = true
        }
        if (this.userSingle.UserStatus === 0) {
          this.userSingle.UserStatus = false
        } else {
          this.userSingle.UserStatus = true
        }
        if (this.userSingle.UserEmailVerified === 0) {
          this.userSingle.UserEmailVerified = false
        } else {
          this.userSingle.UserEmailVerified = true
        }
        this.$v.userSingle.$touch()
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
      this.changePassword = ''
      this.$refs.editUser.show()
    },
    closeEdit () {
      this.$refs.editUser.hide()
    },
    cancelDelete () {
      this.$refs.confirm.hide()
    },
    confirm (id) {
      this.$refs.confirm.show()
      this.deleteId = id
    },
    showModal () {
      this.$refs.addUser.show()
    },
    hideModal () {
      this.$refs.addUser.hide()
    },
    getAllUsers () {
      this.$http.get(this.API_ENDPOINT + '/admin/member/user', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.users = response.data
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    },
    // addUser () {
    //   var body = {
    //     'username': this.username,
    //     'password': this.password,
    //     'email': this.email,
    //     'roles': this.roles,
    //     'fname': this.fname,
    //     'lname': this.lname
    //   }
    //   this.$http.post(this.API_ENDPOINT + '/admin/member/register', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
    //     if (response.data.code === 'Success') {
    //       this.hideModal()
    //       this.alertText = 'Admin successfully added'
    //       this.alertVariant = 'success'
    //       this.alertVisible = true
    //       window.setTimeout(() => {
    //         this.alertVisible = false
    //       }, 2000)
    //       this.getAllUsers()
    //     }
    //   }).catch(err => {
    //     console.log('this is an error ', err.response)
    //   })
    // },
    deleteUser () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/member/user/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllUsers()
          this.cancelDelete()
          Events.$emit('alert', 'User successfully Deleted', 'success', true)
        }
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllUsers()
  }
}
</script>
<style>
</style>
