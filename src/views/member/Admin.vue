<template>
  <div>
    <b-card no-body>
      <b-card-header>
        <h3 class="float-left">Manage Admin</h3>
        <b-button variant="primary" class="float-right" @click="showModal">Add Admin</b-button>
      </b-card-header>
      <b-card-body>
        <div class="admin">
          <b-row>
            <b-col sm="12">
              <b-table hover outlined stacked="md" :items="admins" :fields="fields">
                <template slot="index" slot-scope="data">
                  {{data.index + 1}}
                </template>
                <template slot="AdminRegistrationDate" slot-scope="data">
                  {{data.item.AdminRegistrationDate.substring(0, 19).replace('T', ' ')}}
                </template>
                <template slot="option" slot-scope="data">
                  <b-button variant="warning" @click="editAdmin(data.item.AdminID)">Edit</b-button>
                  <b-button variant="danger" @click="confirm(data.item.AdminID)">Delete</b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>

        </div>
      </b-card-body>
      <div slot="footer">Admins</div>
    </b-card>
    <b-modal ref="addAdmin" size="lg" header-bg-variant="primary" hide-footer title="Add Admin">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.username.$error">
                  <label for="username">Username</label>
                  <b-form-input type="text" id="username" :state="$v.username.$error?false:null || usernameInUse?false:null" placeholder="Enter Username" v-model.trim="username" @blur.native="$v.username.$touch" @input.native="usernameInUse=false"></b-form-input>
                  <div v-if="$v.username.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.username.required">Username is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.username.minLength">Must have atleast {{ $v.username.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.username.maxLength">Must not exceed {{ $v.username.$params.maxLength.max}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.username.alphaNum">Must be only Alpha Numeric</div>
                  </div>
                  <div class="invalid-feedback d-block" v-if="usernameInUse">Username is already in use</div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.password.$error">
                  <label for="password">Password</label>
                  <b-form-input type="text" id="password" :state="$v.password.$error?false:null" placeholder="Enter Password" v-model.trim="password" @blur.native="$v.password.$touch"></b-form-input>
                  <div v-if="$v.password.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.password.required">Password is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.password.minLength">Must have atleast {{ $v.password.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.password.maxLength">Must not exceed {{ $v.password.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.fname.$error">
                  <label for="fname">Firstname</label>
                  <b-form-input type="text" id="fname" :state="$v.fname.$error?false:null" placeholder="Enter Firstname" v-model.trim="fname" @blur.native="$v.fname.$touch"></b-form-input>
                  <div v-if="$v.fname.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.fname.required">Firstname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.fname.minLength">Must have atleast {{ $v.fname.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.fname.maxLength">Must not exceed {{ $v.fname.$params.maxLength.max}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.fname.alpha">Must be only Alphabet</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.lname.$error">
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" :state="$v.lname.$error?false:null" placeholder="Enter Lastname" v-model.trim="lname" @blur.native="$v.lname.$touch"></b-form-input>
                  <div v-if="$v.lname.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.lname.required">Lastname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.lname.minLength">Must have atleast {{ $v.lname.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.lname.maxLength">Must not exceed {{ $v.lname.$params.maxLength.max}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.lname.alpha">Must be only Alphabet</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.email.$error">
                  <label for="email">Email</label>
                  <b-form-input type="text" id="email" :state="$v.email.$error?false:null" placeholder="Enter Email" v-model.trim="email"  @blur.native="$v.email.$touch"></b-form-input>
                  <div v-if="$v.email.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.email.required">Email is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.email.minLength">Must be valid email</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="Roles">
                  <b-form-checkbox-group stacked v-model="roles" name="flavour2" :options="rolesOptions">
                  </b-form-checkbox-group>
                  <div class="invalid-feedback d-block" v-if="roles.length===0">Select atleast one role</div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- two same button below to tackle button disable on non  vuelidate element -->
      <b-btn class="mt-3" variant="primary" @click="addAdmin" disabled v-if="roles.length===0">Add Admin</b-btn>
      <b-btn class="mt-3" variant="primary" @click="addAdmin" :disabled="isValid" v-else>Add Admin</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="hideModal">Cancel</b-btn>
    </b-modal>

    <b-modal ref="editAdmin" size="lg" header-bg-variant="primary" hide-footer title="Update Admin">
      <div class="d-block">
        <b-row>
          <b-col sm="12">
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" id="username" disabled placeholder="Enter Username" v-model="adminSingle.AdminUsername"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.changePassword.$error">
                  <label for="password">Password</label>
                  <b-form-input type="text" id="password" :state="$v.changePassword.$error?false:null" placeholder="Enter Password" v-model.trim="changePassword" @blur.native="$v.changePassword.$touch"></b-form-input>
                  <div v-if="$v.changePassword.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.changePassword.minLength">Must have atleast {{ $v.changePassword.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.changePassword.maxLength">Must not exceed {{ $v.changePassword.$params.maxLength.max}} letters</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.adminSingle.AdminFirstName.$error">
                  <label for="AdminFirstName">Firstname</label>
                  <b-form-input type="text" id="AdminFirstName" :state="$v.adminSingle.AdminFirstName.$error?false:null" placeholder="Enter Firstname" v-model.trim="adminSingle.AdminFirstName" @blur.native="$v.adminSingle.AdminFirstName.$touch"></b-form-input>
                  <div v-if="$v.adminSingle.AdminFirstName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.adminSingle.AdminFirstName.required">Firstname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminFirstName.minLength">Must have atleast {{ $v.adminSingle.AdminFirstName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminFirstName.maxLength">Must not exceed {{ $v.adminSingle.AdminFirstName.$params.maxLength.max}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminFirstName.alpha">Must be only Alphabet</div>
                  </div>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group :state="!$v.adminSingle.AdminLastName.$error">
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" :state="$v.adminSingle.AdminLastName.$error?false:null" placeholder="Enter Lastname" v-model.trim="adminSingle.AdminLastName" @blur.native="$v.adminSingle.AdminLastName.$touch"></b-form-input>
                  <div v-if="$v.adminSingle.AdminLastName.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.adminSingle.AdminLastName.required">Lastname is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminLastName.minLength">Must have atleast {{ $v.adminSingle.AdminLastName.$params.minLength.min}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminLastName.maxLength">Must not exceed {{ $v.adminSingle.AdminLastName.$params.maxLength.max}} letters</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminLastName.alpha">Must be only Alphabet</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group :state="!$v.adminSingle.AdminEmail.$error">
                  <label for="email">Email</label>
                  <b-form-input type="text" id="email" :state="$v.adminSingle.AdminEmail.$error?false:null" placeholder="Enter Email" v-model.trim="adminSingle.AdminEmail"  @blur.native="$v.adminSingle.AdminEmail.$touch"></b-form-input>
                  <div v-if="$v.adminSingle.AdminEmail.$error">
                    <div class="invalid-feedback d-block" v-if="!$v.adminSingle.AdminEmail.required">Email is required</div>
                    <div class="invalid-feedback d-block" v-else-if="!$v.adminSingle.AdminEmail.minLength">Must be valid email</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="Roles">
                  <b-form-checkbox-group stacked v-model="adminSingle.AdminRoles" name="flavour2" :options="rolesOptions">
                  </b-form-checkbox-group>
                  <div class="invalid-feedback d-block" v-if="adminSingle.AdminRoles.length===0">Select atleast one role</div>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- <b-btn class="mt-3" variant="primary" @click="updateAdmin">Update</b-btn> -->
      <b-btn class="mt-3" variant="primary" @click="updateAdmin" disabled v-if="adminSingle.AdminRoles.length===0">Update</b-btn>
      <b-btn class="mt-3" variant="primary" @click="updateAdmin" :disabled="$v.adminSingle.$invalid" v-else>Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
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
import {Events} from '../../events.js'
const {required, minLength, alpha, maxLength, email, alphaNum} = require('vuelidate/lib/validators')
export default {
  name: 'Admin',
  data () {
    return {
      fields: [
        { key: 'index', label: 'SN' },
        { key: 'AdminUsername', label: 'Username' },
        { key: 'AdminFirstName', label: 'Firstname' },
        { key: 'AdminLastName', label: 'Lastname' },
        { key: 'AdminRegistrationDate', label: 'Register Date' },
        { key: 'option', label: 'Options' }
      ],
      admins: [],
      adminSingle: {
        AdminUsername: '',
        AdminEmail: '',
        AdminRoles: [],
        AdminFirstName: '',
        AdminLastName: '',
        AdminID: '',
        AdminRegistrationDate: ''
      },
      changePassword: '',
      roles: [],
      rolesOptions: [
        {text: 'View Products', value: 'PRO'},
        {text: 'View Orders', value: 'ORD'},
        {text: 'View Sellers', value: 'SEL'},
        {text: 'Manage Admins', value: 'ADM'},
        {text: 'Manage Users', value: 'USE'}
      ],
      username: '',
      email: '',
      password: '',
      fname: '',
      lname: '',
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test',
      usernameInUse: false
    }
  },
  validations: {
    username: { required, minLength: minLength(5), maxLength: maxLength(45), alphaNum },
    password: { required, minLength: minLength(6), maxLength: maxLength(45) },
    fname: { required, alpha, minLength: minLength(2), maxLength: maxLength(45) },
    lname: { required, alpha, minLength: minLength(2), maxLength: maxLength(45) },
    email: { required, email },
    adminSingle: {
      AdminUsername: { required, minLength: minLength(5), maxLength: maxLength(45), alphaNum },
      AdminEmail: { required, email },
      AdminFirstName: { required, alpha, minLength: minLength(2), maxLength: maxLength(45) },
      AdminLastName: { required, alpha, minLength: minLength(2), maxLength: maxLength(45) }
    },
    changePassword: { minLength: minLength(6), maxLength: maxLength(45) }
  },
  computed: {
    isValid () {
      if (this.$v.username.$invalid || this.$v.password.$invalid || this.$v.fname.$invalid || this.$v.lname.$invalid || this.$v.email.$invalid) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updateAdmin () {
      var body
      if (this.changePassword === '') {
        body = {
          'email': this.adminSingle.AdminEmail,
          'roles': this.adminSingle.AdminRoles,
          'fname': this.adminSingle.AdminFirstName,
          'lname': this.adminSingle.AdminLastName
        }
      } else {
        body = {
          'email': this.adminSingle.AdminEmail,
          'roles': this.adminSingle.AdminRoles,
          'fname': this.adminSingle.AdminFirstName,
          'lname': this.adminSingle.AdminLastName,
          'password': this.changePassword
        }
      }
      this.$http.put(this.API_ENDPOINT + '/admin/member/admin/' + this.adminSingle.AdminID, body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllAdmins()
          this.closeEdit()
          Events.$emit('alert', 'Admin successfully updated', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    editAdmin (id) {
      this.$http.get(this.API_ENDPOINT + '/admin/member/admin/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.adminSingle = response.data
        // var temp = JSON.stringify(this.adminSingle.AdminRoles)
        // console.log(temp)
        // this.adminSingle.AdminRoles = temp
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
      this.changePassword = ''
      this.$refs.editAdmin.show()
    },
    closeEdit () {
      this.$refs.editAdmin.hide()
    },
    cancelDelete () {
      this.$refs.confirm.hide()
    },
    confirm (id) {
      this.$refs.confirm.show()
      this.deleteId = id
    },
    showModal () {
      this.$refs.addAdmin.show()
    },
    hideModal () {
      this.$refs.addAdmin.hide()
    },
    getAllAdmins () {
      this.$http.get(this.API_ENDPOINT + '/admin/member/admin', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.admins = response.data
      }).catch(err => {
        console.log('this is an error ', err)
        Events.$emit('alert', 'Something went wrong', 'danger', true)
      })
    },
    addAdmin () {
      var body = {
        'username': this.username,
        'password': this.password,
        'email': this.email,
        'roles': this.roles,
        'fname': this.fname,
        'lname': this.lname
      }
      this.$http.post(this.API_ENDPOINT + '/admin/member/register', body, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.hideModal()
          this.getAllAdmins()
          Events.$emit('alert', 'Admin successfully added', 'success', true)
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
        Events.$emit('alert', err.response.data.errors, 'danger', true)
        if (err.response.data.hasOwnProperty('username')) {
          if (err.response.data.errors.username.msg === 'this username is already in use') {
            this.usernameInUse = true
          }
        }
        this.hideModal()
      })
    },
    deleteProduct () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/member/admin/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllAdmins()
          this.cancelDelete()
          Events.$emit('alert', 'Admin successfully deleted', 'success', true)
        }
      }).catch(err => {
        Events.$emit('alert', 'Something went wrong', 'danger', true)
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllAdmins()
  }
}
</script>
