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
                <b-form-group>
                  <label for="password">Password</label>
                  <b-form-input type="text" id="password" placeholder="Enter Password to change" v-model="changePassword"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="fname">Firstname</label>
                  <b-form-input type="text" id="fname" placeholder="Enter Firstname" v-model="userSingle.UserFirstName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" placeholder="Enter Lastname" v-model="userSingle.UserLastName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="address">Address</label>
                  <b-form-input type="text" id="address" placeholder="Enter Address" v-model="userSingle.UserAddress"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="address2">Address 2</label>
                  <b-form-input type="text" id="address2" placeholder="Enter Address 2" v-model="userSingle.UserAddress2"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" id="city" placeholder="Enter City" v-model="userSingle.UserCity"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="state">State</label>
                  <b-form-input type="text" id="state" placeholder="Enter State" v-model="userSingle.UserState"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="zip">Zip</label>
                  <b-form-input type="text" id="zip" placeholder="Enter Zip" v-model="userSingle.UserZip"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="phone">Phone</label>
                  <b-form-input type="text" id="phone" placeholder="Enter Phone" v-model="userSingle.UserPhone"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="Country">Country</label>
                  <b-form-input type="text" id="Country" placeholder="Enter Country" v-model="userSingle.UserCountry"></b-form-input>
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
      <b-btn class="mt-3" variant="primary" @click="updateUser">Update</b-btn>
      <b-btn class="mt-3" variant="outline-danger" @click="closeEdit">Cancel</b-btn>
    </b-modal>

    <b-modal ref="confirm" size="sm" centered header-bg-variant="primary" hide-footer title="Alert">
      <div class="mb-3">
        Are you sure?
      </div>
      <b-button variant="success" @click="deleteUser">Yes</b-button>
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
import cSwitch from '../../components/Switch'
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
        UserStatus: ''
      },
      changePassword: '',
      deleteId: '',
      alertVariant: 'success',
      alertVisible: false,
      alertText: 'test'
    }
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
        }
      }).catch(err => {
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
      }).catch(err => {
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
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
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
        }
      }).catch(err => {
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
  .position-alert{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index: 20000
  }
</style>
