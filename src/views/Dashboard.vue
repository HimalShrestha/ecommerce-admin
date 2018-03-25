<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">{{this.users.length}}</h4>
            <p>Registered Users</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
              <template slot="button-content">
                <i class="icon-location-pin"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">{{this.pendingOrders.length}}</h4>
            <p>Pending Orders</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-table class="mb-0 table-outline" responsive="sm" hover :items="pendingOrders" :fields="tableFields" head-variant="light">
      <template slot="index" slot-scope="data">
        {{data.index + 1}}
      </template>
      <template slot="OrderStatus" slot-scope="data">
        <b-badge v-if="data.item.OrderStatus===0" variant="warning">Pending</b-badge>
        <b-badge v-if="data.item.OrderStatus===1" variant="success">Completed</b-badge>
        <b-badge v-if="data.item.OrderStatus===2" variant="danger">Canceled</b-badge>
      </template>
      <template slot="image" slot-scope="data">
        <img :src="API_ENDPOINT+'/admin/product/image/'+data.item.ProductID" alt="" style="max-width:100px;">
      </template>
      <template slot="option" slot-scope="data">
        <b-button variant="info" @click="$router.push(`/orders/${data.item.DetailID}`)">View</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  components: {
  },
  data: function () {
    return {
      selected: 'Month',
      orders: [],
      pendingOrders: [],
      users: [],
      tableFields: [
        { key: 'index', label: 'SN' },
        { key: 'image', label: 'Image' },
        { key: 'OrderID', label: 'Order ID' },
        { key: 'ProductName', label: 'Name' },
        { key: 'OrderStatus', label: 'Status' },
        { key: 'OrderAmount', label: 'Order Amount' },
        { key: 'TotalPrice', label: 'Total Price' },
        { key: 'option', label: 'Options' }
      ]
    }
  },
  methods: {
    getAllOrders () {
      this.$http.get(this.API_ENDPOINT + '/admin/order/detail', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.orders = response.data
        this.orders.forEach(item => {
          if (item.OrderStatus === 0) {
            this.pendingOrders.push(item)
          }
        })
      }).catch(err => {
        console.log('this is an error ', err)
      })
    },
    getAllUsers () {
      this.$http.get(this.API_ENDPOINT + '/admin/member/user', {headers: { 'Content-Type': 'application/json' }}).then(response => {
        this.users = response.data
      }).catch(err => {
        console.log('this is an error ', err)
      })
    }
  },
  created () {
    this.getAllOrders()
    this.getAllUsers()
  }
}
</script>
