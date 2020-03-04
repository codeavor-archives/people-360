<template>
  <div>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Billing Table"
          color="primary"
          :data="inspectedProjects"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td :props="props" key="companyName">{{props.row.companyName}}</q-td>
              <q-td
                :props="props"
                key="totalPrice"
              >{{props.row.totalPrice | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td
                :props="props"
                key="balance"
              >{{props.row.balance | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td
                :props="props"
                key="downPayment"
              >{{props.row.downPayment | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td
                :props="props"
                key="payment"
              >{{props.row.payment | currency("₱", 2, { decimalSeparator: "." })}}</q-td>
              <q-td :props="props" key="datePaid">{{props.row.datePaid}}</q-td>
              <q-td :props="props" key="paymentStatus">{{props.row.paymentStatus}}</q-td>
              <q-td>
                <q-btn
                  @click="showEditBillModal(props.row)"
                  round
                  color="primary"
                  flat
                  dense
                  icon="remove_red_eye"
                >
                  <q-tooltip content-class="bg-deep-orange">View</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog persistent v-model="showEditBill">
      <edit-bill @close="showEditBill = false" :bill="bill"></edit-bill>
    </q-dialog>
  </div>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      billings: fs.collection("billings"),
      preproposals: fs.collection("preproposals")
    };
  },
  data() {
    return {
      bill: {},
      showEditBill: false,
      inspectedProjects: [],
      totalBalance: "",
      filter: "",
      columns: [
        {
          name: "companyName",
          align: "left",
          label: "Company Name",
          sortable: true,
          field: "companyName"
        },
        {
          name: "totalPrice",
          align: "left",
          label: "Project Cost",
          sortable: true,
          field: "totalPrice"
        },
        {
          name: "balance",
          align: "left",
          label: "Balance",
          sortable: true,
          field: "balance"
        },
        {
          name: "downPayment",
          align: "left",
          label: "Down Payment",
          sortable: true,
          field: "downPayment"
        },
        {
          name: "payment",
          align: "left",
          label: "Payment",
          sortable: true,
          field: "payment"
        },
        {
          name: "paymentStatus",
          align: "left",
          label: "Date Paid",
          sortable: true,
          field: "paymentStatus"
        },
        {
          align: "left",
          label: "Action"
        }
      ]
    };
  },
  methods: {
    showEditBillModal(props) {
      console.log(props);
      this.showEditBill = true;
      this.bill = props;
    }
  },
  computed: {
    computeBalance() {
      return this.$firestore.preproposals.downPayment;
    }
  },
  mounted() {
    // this.$binding(
    //   "inspectedProjects",
    //   fs.collection("preproposals").where("status", "==", "ongoing")
    // );
    this.$binding("inspectedProjects", fs.collection("preproposals"));
  },
  components: {
    "edit-bill": require("components/Billing/Modals/EditBills").default
  }
};
</script>

<style>
</style>