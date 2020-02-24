<template>
  <div id="app" class="certificateForm">
    <div class="q-pt-md row">
      <div class="col-12">
        <div class="q-pa-lg q-mb-lg">
          <div class="row">
            <div class="col-12">
              <div class="text-center" v-for="logo in certificates" :key="logo.id">
                <img :src="logo.logo" width="250px" />
              </div>

              <p
                style=" font-family:Palatino Linotype; font-size:22px; text-align:center; text-decoration: underline; "
              >
                <strong>CERTIFICATE OF REGISTRATION</strong>
              </p>
              <q-separator style="border-bottom: 2px solid black;" spaced></q-separator>
              <div class="q-my-lg">
                <q-item-label style="font-size:16px; " class="col text-justify">
                  THIS CERTIFIES THAT THE PROJECT EQUIPMENT
                  <strong>__________________</strong>HAS BEEN TESTED BY
                  PEOPLE360 CONSULTING CORPORATION AND FOUND TO BE IN
                  CONFORMANCE TO THE FOLLOWING STANDARD(S):
                </q-item-label>
              </div>
              <div class="q-pt-lg" style="border-bottom: 2px solid black;" spaced></div>
            </div>
          </div>
          <div class="col q-mt-xl" id="customers">
            <div class="q-py-sm" style="text-align:center; font-size:18px;">
              <q-item-label>THIS CERTIFICATE IS ISSUED TO:</q-item-label>
            </div>
            <div class="row">
              <div style="text-align:left; font-size:16px;">
                <q-item-label class="q-my-xs">COMPANY NAME:</q-item-label>
                <q-item-label class="q-my-xs">COMPANY ADDRESS:</q-item-label>
                <q-item-label class="q-my-xs">INSPECTION ADDRESS:</q-item-label>
                <q-item-label class="q-my-xs">CHECKLIST NUMBER:</q-item-label>
                <q-item-label class="q-my-xs">TYPE OF EQUIPMENT:</q-item-label>
                <q-item-label class="q-my-xs">RESULTS:</q-item-label>
                <q-item-label class="q-my-xs">DETAILS:</q-item-label>
              </div>
              <q-space></q-space>
              <div>
                <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
              </div>
            </div>
          </div>

          <div class="col q-mt-xl" id="customers">
            <div style="text-align:left; font-size:16px;">
              <q-item-label class="q-my-xs">CERTIFICATE NUMBER:</q-item-label>
              <q-item-label class="q-my-xs">CERTIFICATE ISSUE DATE:</q-item-label>
              <q-item-label class="q-my-xs">REGISTRATION DATE:</q-item-label>
              <q-item-label class="q-my-xs">VALID UNTIL:</q-item-label>
            </div>
          </div>

          <!-- <div class="row q-mt-xl">
            <div class="row col-6">
              <div></div>
              <q-item-label class="col-12 text-justify">For</q-item-label>
            </div>
            <div class="row col-6">
              <q-item-label class="col-12 text-justify">Conforme:</q-item-label>
              <q-item-label class="col-12 text-justify">For</q-item-label>
            </div>
          </div>-->

          <div class="row q-py-xl q-mt-xl" id="customers">
            <div class="col-6" style="text-align:center; font-size:16px;">
              <div class="q-mx-xl" style="border-bottom: 2px solid black;">{{date}}</div>
              <q-item-label class="q-my-xs">Date</q-item-label>
            </div>
            <div
              class="col-6"
              style="text-align:center; font-size:16px;"
              v-for="director in certificates"
              :key="director.id"
            >
              <div class="q-mx-xl" style="border-bottom: 2px solid black;">{{director.director}}</div>
              <q-item-label class="q-my-xs">Signature</q-item-label>
              <q-item-label class="q-my-xs">DIRECTOR</q-item-label>
            </div>
          </div>

          <div class="row">
            <q-page-sticky class="printButton" position="bottom-right" :offset="[18, 18]">
              <q-fab icon="print" direction="up" color="primary">
                <q-fab-action @click="print" color="primary" icon="print">
                  <q-tooltip content-class="bg-deep-orange">Print</q-tooltip>
                </q-fab-action>
              </q-fab>
            </q-page-sticky>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="customers">
      
    </div>-->
    <!-- <q-btn @click="downloadPDF">PDF</q-btn> -->
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
// import jsPDF from "jspdf";
import { mapState, mapActions, mapGetters } from "vuex";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import $ from "jquery";

import { fb, db, fs } from "boot/firebase";
import QrcodeVue from "qrcode.vue";
export default {
  firestore() {
    return {
      certificates: fs.collection("certificates")
    };
  },
  data() {
    return {
      // value: "https://example.com",
      date: "",
      size: 120,
      values: {
        ptfNumber: "IM-IN-55454",
        date: "04-20-2020",
        contactPerson: "Ariel Espinoza",
        designation: "Developer",
        department: "ICT Department",
        company: "DICT",
        address: "Quezon City",
        projectTitle: "Heavy Equipment Testing",
        termsOfPayment: "Bank Deposit",
        noOfDaysWork: "2",
        noOfDaysDoc: "2"
      }
    };
  },
  methods: {
    print() {
      window.print();
    },
    downloadPDF() {
      // ================///From demoFromHTML
      var doc = new jsPDF();
      doc.canvas.height = 72 * 11;
      doc.canvas.width = 72 * 8.5;

      // ================///From demoFromHTML

      doc.setFontSize(12);
      doc.setFont("times");
      doc.addImage(
        // Inser Image here
        60, //left
        10, //top
        null, //right
        null, //bottom
        "center"
      );
      doc.text("Ref: " + this.ptfNumber, 15, 60);
      doc.text("Date " + this.date, 15, 65);

      doc.setFontStyle("bold");
      doc.text(this.contactPerson, 15, 75);
      doc.setFontStyle("normal");
      doc.text(this.designation, 15, 80);
      doc.text(this.department, 15, 85);
      doc.setFontStyle("bold");
      doc.text(this.company, 15, 90);
      doc.setFontStyle("normal");
      doc.text(this.address, 15, 95);

      doc.setFontStyle("bold");
      doc.text("Project Title:", 20, 105);
      doc.setFontStyle("normal");
      doc.text(this.projectTitle, 45, 105);

      doc.setFontStyle("bold");
      doc.text("Terms of Payment:", 20, 110);
      doc.setFontStyle("normal");
      doc.text(this.termsOfPayment, 55, 110);

      doc.setFontStyle("bold");
      doc.text("Project Timeline:", 20, 115);
      doc.setFontStyle("normal");
      doc.text(this.noOfDaysWork + "," + this.noOfDaysDoc, 55, 115);

      // var source = $("#customers")[0];
      // doc.fromHTML(source, 15, 150, { width: 500 });
      var source = $("#paragraph")[0];
      doc.fromHTML(source, 15, 150, { width: 180 });

      doc.autoTable({
        theme: "grid",
        headerStyles: { 0: { halign: "center", fillColor: [255, 255, 0] } },
        margin: { top: 120 },
        head: [
          ["Item", "Description", "Unit Price", "Qty", "Total Investment"]
        ],
        body: [
          ["David", "david@example.com", "Sweden", "Jose", "Pedro"],
          ["Castille", "castille@example.com", "Norway", "Finland", "China"]
        ]
      });

      // doc.setFontSize(12);
      // doc.setFontStyle("normal");
      // doc.text("GROSS TOTAL INVESTMENT:", 85, 160);
      // doc.text("ADD 12% VAT:", 85, 165);
      // doc.text("MOBILIZATION FEE:", 85, 170);
      // doc.text("TOTAL INVESTMENT:", 85, 175);

      // doc.text(
      //   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis obcaecati eaque molestiae, quam molestias, ipsam voluptatibus sapiente porro hic sequi doloribus voluptates, animi possimus fuga eius aspernatur! Eum unde, inventore maiores commodi voluptate aliquam consequatur, ad quasi quisquam sapiente provident dolore minima, veniam possimus reprehenderit ab laborum accusantium quia assumenda.",
      //   10,
      //   180
      // );

      window.open(doc.output("bloburl"), "_blank");
    }
  },
  computed: {
    ...mapState("storeservices", ["cart"]),
    value() {
      return JSON.stringify(this.values);
    }
  },
  components: {
    QrcodeVue
  },
  mounted() {
    var today = new Date().toString().substr(3, 12);
    // var year = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = mm + "-" + yyyy + "-" + dd;
    this.date = today;
  }
};
</script>

<style>
.certificateForm {
  background: linear-gradient(-20deg, #e9752f 10%, #ffffff 5%, #fad780);
  background-repeat: no-repeat;
}
@media print {
  @page {
    margin-left: -170px;
    /* margin-left: -120px; */
    margin-top: -30px;
    margin-bottom: 50px;
  }
  .certificateForm {
    margin-left: -50px;
    /* content: url(../../../draft.jpg); */
  }
  .invoice {
    padding: 10px 20px;
  }
  .invoice {
    background-position: center center;
    background-repeat: no-repeat;
  }
  .printButton {
    display: none;
  }
}
</style>
