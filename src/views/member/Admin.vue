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
      <b-btn class="mt-3" variant="primary" @click="addAdmin">Add Admin</b-btn>
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
                  <b-form-input type="text" id="fname" placeholder="Enter Firstname" v-model="adminSingle.AdminFirstName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group>
                  <label for="lname">Lastname</label>
                  <b-form-input type="text" id="lname" placeholder="Enter Lastname" v-model="adminSingle.AdminLastName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" id="email" placeholder="Enter Email" v-model="adminSingle.AdminEmail"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group label="Roles">
                  <b-form-checkbox-group stacked v-model="adminSingle.AdminRoles" name="flavour2" :options="rolesOptions">
                  </b-form-checkbox-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-btn class="mt-3" variant="primary" @click="updateAdmin">Update</b-btn>
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
      alertText: 'test'
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
        }
      }).catch(err => {
        console.log('this is an error ', err)
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
    makeAlert () {
      this.$refs.confirm.show()
      Events.$emit('alert', 'warning', 3000)
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
          this.alertText = 'Admin successfully added'
          this.alertVariant = 'success'
          this.alertVisible = true
          window.setTimeout(() => {
            this.alertVisible = false
          }, 2000)
          this.getAllAdmins()
        }
      }).catch(err => {
        console.log('this is an error ', err.response)
      })
    },
    deleteProduct () {
      var id = this.deleteId
      this.$http.delete(this.API_ENDPOINT + '/admin/member/admin/' + id, {headers: { 'Content-Type': 'application/json' }}).then(response => {
        if (response.data.code === 'Success') {
          this.getAllAdmins()
          this.cancelDelete()
        }
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllAdmins()
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
