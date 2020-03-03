<template>
  <q-page>
    <div class>
      <div class>
        <q-table
          :filter="filter"
          title="Certificates for print"
          color="primary"
          :data="forPrintCertificate"
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
              <q-td :props="props" key="certificateNumber">{{props.row.certificateNumber}}</q-td>
              <q-td :props="props" key="checklistNumber">{{props.row.checklistNumber}}</q-td>
              <q-td :props="props" key="companyName">{{props.row.companyName}}</q-td>
              <q-td :props="props" key="type">{{props.row.type}}</q-td>
              <q-td :props="props" key="model">{{props.row.model}}</q-td>
              <!-- <q-td :props="props" key="equipmentNumber">{{props.row.equipmentNumber}}</!-->

              <q-td :props="props" key="serialNumber">{{props.row.serialNumber}}</q-td>
              <q-td :props="props" key="power">{{props.row.power}}</q-td>
              <q-td :props="props" key="date">{{props.row.date}}</q-td>
              <q-td :props="props" key="brand">{{props.row.brand}}</q-td>
              <q-td :props="props" key="year">{{props.row.year}}</q-td>
              <q-td :props="props" key="operatingWeight">{{props.row.operatingWeight}}</q-td>
              <!-- <q-td :props="props" key="bucketData">{{props.row.bucketData}}</q-td> -->
              <!-- <q-td :props="props" key="volume">{{props.row.volume}}</q-td> -->
              <q-td :props="props" key="result">{{props.row.result}}</q-td>
              <q-td>
                <q-btn
                  @click="addToCertificate(props.row)"
                  to="/certificates"
                  round
                  color="primary"
                  flat
                  dense
                  icon="print"
                >
                  <q-tooltip content-class="bg-deep-orange">Print</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="showEditCertificate">
      <edit-certificate @close="showEditCertificate = false" :certificate="certificate" :id="id"></edit-certificate>
    </q-dialog>
  </q-page>
</template>

<script>
import { fb, db, fs } from "boot/firebase";
export default {
  firestore() {
    return {
      printingCertificates: fs.collection("printingCertificates")
    };
  },
  data() {
    return {
      forPrintCertificate: [],
      certificate: {},
      filter: "",
      id: "",
      showEditCertificate: false,
      columns: [
        {
          name: "certificateNumber",
          align: "left",
          label: "Certificate Number",
          sortable: true,
          field: "certificateNumber"
        },
        {
          name: "checklistNumber",
          align: "left",
          label: "Checklist Number",
          sortable: true,
          field: "checklistNumber"
        },
        {
          name: "companyName",
          align: "left",
          label: "Company Name",
          sortable: true,
          field: "companyName"
        },
        {
          name: "type",
          align: "left",
          label: "Type",
          sortable: true,
          field: "type"
        },
        {
          name: "model",
          align: "left",
          label: "Model",
          sortable: true,
          field: "model"
        },
        // {
        //   name: "equipmentNumber",
        //   align: "left",
        //   label: "Equipment Number",
        //   sortable: true,
        //   field: "equipmentNumber"
        // },
        {
          name: "serialNumber",
          align: "left",
          label: "Serial Number",
          sortable: true,
          field: "serialNumber"
        },
        {
          name: "power",
          align: "left",
          label: "Power",
          sortable: true,
          field: "power"
        },
        {
          name: "date",
          align: "left",
          label: "Date",
          sortable: true,
          field: "date"
        },
        {
          name: "brand",
          align: "left",
          label: "Brand",
          sortable: true,
          field: "brand"
        },
        {
          name: "year",
          align: "left",
          label: "Year",
          sortable: true,
          field: "year"
        },
        // {
        //   name: "bucketData",
        //   align: "left",
        //   label: "Bucket Data",
        //   sortable: true,
        //   field: "bucketData"
        // },
        // {
        //   name: "volume",
        //   align: "left",
        //   label: "Volume",
        //   sortable: true,
        //   field: "volume"
        // },
        {
          name: "result",
          align: "left",
          label: "Result",
          sortable: true,
          field: "result"
        },
        {
          align: "left",
          label: "Action"
        }
      ],
      forQRCode: {
        certificateNumber: "",
        checklistNumber: "",
        companyName: "",
        serialNumber: "",
        year: "",
        inspectionAddress: "",
        type: "",
        result: "",
        details: ""
      }
    };
  },
  methods: {
    addToCertificate(props) {
      console.log(props);
      this.forQRCode.certificateNumber = props.certificateNumber;
      this.forQRCode.checklistNumber = props.checklistNumber;
      this.forQRCode.companyName = props.companyName;
      this.forQRCode.serialNumber = props.serialNumber;
      this.forQRCode.date = props.date;
      this.forQRCode.inspectionAddress = props.inspectionAddress;
      this.forQRCode.type = props.type;
      this.forQRCode.result = props.result;
      this.forQRCode.details = props.details;
      this.$store.commit("storecertificates/addToCertificate", this.forQRCode);
    }
  },
  mounted() {
    this.$binding(
      "forPrintCertificate",
      fs
        .collection("printingCertificates")
        .where("result", "==", "SAFE FOR USE")
        .orderBy("date")
    );
  }
};
</script>

<style>
</style>