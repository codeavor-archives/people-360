<template>
  <div id="app" class="certificateForm">
    <div class="q-pt-md row">
      <div class="col-12">
        <div class="q-pa-lg q-mb-lg">
          <div class="row">
            <div class="col-12">
              <div class="text-center">
                <img src="../../../logo-with-CIP.jpg" width="250px" />
              </div>

              <p
                style=" font-family:Palatino Linotype; font-size:22px; text-align:center; text-decoration: underline; "
              >
                <strong>CERTIFICATE OF REGISTRATION</strong>
              </p>
              <q-separator
                style="border-bottom: 2px solid black;"
                spaced
              ></q-separator>
              <div class="q-my-lg">
                <q-item-label style="font-size:16px; " class="col text-justify">
                  THIS CERTIFIES THAT THE PROJECT EQUIPMENT
                  <strong>__________________</strong>HAS BEEN TESTED BY
                  PEOPLE360 CONSULTING CORPORATION AND FOUND TO BE IN
                  CONFORMANCE TO THE FOLLOWING STANDARD(S):
                </q-item-label>
              </div>
              <div
                class="q-pt-lg"
                style="border-bottom: 2px solid black;"
                spaced
              ></div>
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
              <q-item-label class="q-my-xs"
                >CERTIFICATE ISSUE DATE:</q-item-label
              >
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
              <div
                class="q-mx-xl"
                style="border-bottom: 2px solid black;"
              ></div>
              <q-item-label class="q-my-xs">Date</q-item-label>
            </div>
            <div class="col-6" style="text-align:center; font-size:16px;">
              <div
                class="q-mx-xl"
                style="border-bottom: 2px solid black;"
              ></div>
              <q-item-label class="q-my-xs">Signature</q-item-label>
              <q-item-label class="q-my-xs">DIRECTOR</q-item-label>
            </div>
          </div>

          <div class="row">
            <q-page-sticky
              class="printButton"
              position="bottom-right"
              :offset="[18, 18]"
            >
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
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import $ from "jquery";

import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      value: "https://example.com",
      size: 50,

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
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQERUTERMWFhUWGSAaGBcYGRgaGhkZHRoYGhgdGBgdHSggGh8lHBgdITEjJSotLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0mHyYtLystLi8tLS0vMDIrLS4tLS0tLy0tLSsrLS8tLy0vLS8tLS0rLi4tLS0tLS0tLS0rLf/AABEIAKABOwMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYCAwQHAQj/xABCEAACAQMCAgYECgkEAwEAAAABAgMABBESIQUxBhMiQVFhMjNxgQcUFSNScpGTobE1QlNkc7LD0uJDYoLBFtHx8P/EABoBAQEAAwEBAAAAAAAAAAAAAAABAwQFAgb/xAAzEQEAAgECBAMHBAEEAwAAAAAAAQIDBBESITFRE0FhBSJxgZGx0TKhweEUI0Lw8RUzUv/aAAwDAQACEQMRAD8A9xoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFQKBQKBQKD4zADJOB40WI36I/5dtiSqyh2HMRgyEe0IDXjxK92f/EzRG812j15ffZpl6S2iesl6v8AiK6fzKKk5aR1l7roc9v013+ExP2lI293HIAUdWDDIIIOR5eNe4tE9Ja98d6TMWiY2bqrwUCgUCgUCgUCqFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAqBQKBQYSyqilmIVQMkk4AHmaTOy1rNp2jqofGvhDTtLbZxg4lK5DHl2B3jzO1al9THSrvab2LblOX6b9Pj+FXseIRXhK8SupgucqBuh8SwA2+zFYK2i/wD7Jl1MuHJp4idLjrv59/k77zojbMuuxvEZhyRnUE+wggg+2vVsNdt6Wa+P2lmi3DqMUxHfaXcjyS2ga1hkMqPoniMsracD9Vde4NXeZpvSOfnG8sMxSmo4c1o4Zjes8MR9Z2aLi/tEtgstsRcAkiPWwMZ+kGzmPPPSKx2yY4pzrz7f86PdMOotmmaZPc77Rz9O07d1kiueIRRJKjx3UWkHABD6ccwcnUfxrPxZq1i0bWj93OtTSZMk0tE0tv8AL+k3wXjcN2uYzuOaH0h7u8edZsOemWN6tHU6TJp7bXjl3SVZmsUCgUCgUCqFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAqBQKDCWRUUsxAAGSTyAHM032WtZtO0dXlnS/pJLK8T9n4vkSRRE7yAE6XlXGykjIB5itDNlmZifLt+X1Og0NKVtXnx9Jnt3is9+8t/QqztOIdabs9ZcMeRYjs420AbYHgOVXBWmTfi6vHtLLn0nDGDlT+fVzXXR35P4hBqUSW8r6RrAPpbaWztkZBB8q8zi8PJHaWSmt/y9Jfadr1jfl6ecNXSO5EN80Zs7fQrAKhjALrtuG8/LlWPNfhybcMfR70eOcmmi8Zbb7c536T8FhPHYWmSysgsMbNpeVAF7jsnmcY1fZWac1ZtGPHyju5/wDiZIxzqNR71ojeIn+fw773oDbMp6osj9zElsn/AHZ516voqTHLlLBj9sZot7+0x9EN0aS8t5ZYUZQY+0YnPZYfSU93jmtTB41L2pXrHlP8N3Wzp82OuS0TtPLeOsekpBLcySdbBCY5HzkjDIHG+pXU4weRHfmve02txUrtM/ON++8NabxSnBktvWPlO3bae3ktXDb8SruNMg9NDzU+fl4HvFb2HNGSO0+cdnKzYZxzy5x5T3dlZmEoFAoFAqhQKBQV/jYd7y2hEskaMkrN1ZCkldGnJweWTQdHyD+83P3n+NA+Qf3m5+8/xoHyD+83P3n+NA+Qf3m5+8/xoHyD+83P3n+NA+Qv3m5+8/xoHyF+83P3n+NA+Qf3m5+8/wAaB8g/vNz95/jQPkH95ufvP8aDTe8GKRuwubnKqSPnBzAJH6tBM2jExoTzKjP2UG2gUCgUCgVAoFBQvhO4yqoLYNuwDOv0hnZT4A4yfZWpqcm0cLvexdLM28bbpyj8oyPolHc8OF0jMbgqXY52JXIKY7sAYHsFeIwxbHxR1bM+0b4dX4No9zfb6+f8yiuFcDs2s1ubid4iXKrpAJJHLSOeax1x04OK07NvPq9RGonDipE8t+a28I4XFLEszX8s0ETB8SacKyHI1EjUPtrPSlZji494hyNRqL0yTjjDFbTG3Lfz/ZnxWO74onzGIrY+izZ1SjxxzCn8amSMmePd5V+6YLafQ2/1Pev6dI/tSOI8JltZerlGGG4IOxHcVPt+yublpbHbhs7mHUUz04qdF94fx+6t1C3kEhA/1FGc/WxtW9TU5McbZaz8XBy6PBlniwXj4Szlu4Lu5haEliQySDBB6sqefv8AzrzOXHmy1mnPrE/DZ5riy6fDeuTl0mPjujxKeHGWKKQOW5f7PNu7VitS2SdJxUpO8z+3x9WzwxrIre9doj9/6SkNmIUS7hLMSAZQTnUD6R9oNZoxxipXU45meW9vXv8ANq2yzktbT5I+Hp2WaOQMAw3BGQfI11q2i0RMdJcu0TWdpZVUKBQKBVCgUCggeI/pG1/hzf0qCeoFAoKl0t6fWvDyY89bMP8ATU+j4a25L7OdWI3SZU6z6V8c4nk2cKJEdteOz943P3CryTmwuej/AB1e08cM3kr4b3EFT+NTku8o+26V3dtJ1bSTW0o/07jVLEfe3bUeYJFOHscXdf8Aor07juZPi1yvUXPcpOUkB3BjbvBG48a87vS5VUKDm4n6mX6jfymgysvVp9UfkKDfQKBQKBQKgUGEsgVSx2AGSfIbmi1ibTtDxnjEDXVvLxJ2OTNp09wj5L7wMfjXMvHHWck932envGDNXR1j/bvv6+aY6N3V1wpzFcwubeTfUoLqpPeCPHvFZMdrYp2tHJp6zHg11ePDaOOO/JttOjyycKUzP1OiR3VmB9EnAyvPfG1IxROH3p2ecmtmmumKRxbxETt3VLrm6sxBj1ZbVjlk8gSPZ3Vo2tO3D5OvwV4/EmPe22ew9FeIpPbR6SMqoVl71IAHLw22rr6fJF6Rs+O12C2LNbfpMzMT8XF084cJbbWB2o9/+J2b/wDeVYNdj4sW/Zn9l5/DzcPlKL45e3QjtmjZ1VolOUzu+Bzxz9lampy5opS1ZnaYjp3bWlxYJvkreImYmevZJ3HHWbqoFOJH0iRh+oSBqA/3Z28qy31szNcUfqnbee3f5tamjiOLLP6Y32jv2+TfedF4Sh6sEPzByTk+efGvWb2dimk8HVjx+0MkW97o4+jtyUTRIPmnJUHwbvB8M1paDPNK8GT9NpmIntPb5s+sxxa3FT9Uc/l3TPApB1egZzGdJB7vZ5ZzXQ9n3rOPgj/bO0tLVVnj4p8+aSreapQKBQKoUCgUEDxH9I2v8Ob+lQT1AoKT8J3S42EIjiPz8oOk/QUc3/6Hn7KsRukyo/wZdChfE3d0C0IY6VP+q2e0zHvGftOakzuRGz2yNAoAUAADAA2AHcAKKyoI3j3A7e9iMVwgYdx/WU+KnmDQeHdIuBSWc3xOUkgdu0m5Eb5wD3ZbmO5sEc6sxvzSJ2nZ6d8F/Sw39uUlI+MQdmTxYfqtj3EHzFeYVdao5uJ+pl+o38poMrL1afVH5Cg30CgUCgUCoFBG9I1LW0iA4LgID4ayF/7rxk/TMNnSTEZq2ny5/Tm8t4XcZ4Zc27DDakdR4qxAyPEZFaFZ/wBKay+oz021uPLHTnE/GE3bdJbmHickdxJiIMwKEDSqAEoy7Z3AHtzXuM9q5pi08mlfQYcmirfFHvbRz7z5wmbO3Xi4M0xYQKxWOIHGcfrP578u6slYjUe9bp5Q0sl59nz4ePbimN5n+IRXS7ojHbx9dBnSDhlJzjPIg1r6rTRSvFVuez/aV8t/DydfKXyy6OqkMVyl11JZQcnbBPMAg7791Y66eIpGSL7GTXTbJbDbHxbSs1tb3csJVpoZEdSNYU5IIxnY4Nbda5r02m0TE+bmXvp6ZOKtbRMT03arqSZohDZglUAQy5AzpGCEPfy5isOS2W2Pw8Eco5b/AA7PdK465JyZ55zz2+PdVjbPE+lgVZT7we4iuFet8dtp5TDrRkrkrvHOJXfg3GVmAVtpBzHj7P8A1Xf0evpmjhtyt93C1OknFO8dHBcyNCGUAFDM2oEZBBAOPxrn58ttPFqxG9eOd4+PPZsUrGSYmZ58MbJLh7xiVkjGwXn3Egnl44zW7pb4Yz2x4o5bfy1s0XnHFr90pXTahQKBQKoUCgUEDxH9I2v8Ob+lQT1AoPzt06uWvuKyqDzkECeSqQu3/Is3vq25QkdXv3CrJLeGOJBhUUKB7BUV10CgUFI+F3hInsGkx24DrU94HJvw/IVaykpnoPf/ABmwt5yBqZMMQBuykq34qak9VhPUHNxP1Mv1G/lNBlZerT6o/IUG+gUCgUCgVAoIjpWStq7ruYyr+5WDH8BWPL+iZbeh2nNFZ894+sbKP0WltrwxRTx6TbRhlkDY1KhBYP8A7c4NaeGaZNotHR3NdXNpuK+O28XnaY7TPTb1YdN764uCr9UyW36jFfT8GJ5gHuBrHqr3tz29169mYcWGJrxRN/OO3p+W3oR0iW1zFL6tjkN9E9+R4V502pjH7tujz7T0U59r06x+70C7VLiBwpDK6EAg5HLb8a6V9smOdukw+fxzbDliZjaYlUl4NJc2NuUIygbYnAI1HfPurmTp7ZtPSa+W7rzqqYdVki3nt9nGeINHB8WjbbJ1sORz3KfDz76076maYvBrPxn+IZvArfL41o+EfzPqvHA2U28WjkEA9hAwfxrt6Sazhrw9ocLVRaM1uLvKN6V2uQkg5qcH2cx+Nc/2tj92uWPKdm1oMnOaT5vvEriFpurePJyAXGxBOPt5141eo09s/hXpvziN/PeTDjy1x8dbfJlxBgiNHECwB7bHtYPtPf8AlXnW38PFbFhjeI/VPXb6+f2TDHFeL3nbtHRu4MBiPyVv5qyezNprj28ot93jVdbfGPsl67LSKBQKBVCgUCggeI/pG1/hzf0qCeoFB+cIfm+MDX3XZB+8P/urbySvm/R9RSgUCggOnkgXh10W/Zke87CrHUlG/BHGV4VBnvMhHsMr4pbqkdFxqK5uJ+pl+o38poMrL1afVH5Cg30CgUCgUCoFBovo2aN1X0ipA9pBA/GpaN4nZ7xzFbxM9N4eU9IigiRYYTGTGI5nwcawATF4dk8/YB3Vyc8xFYisbctp/D6vRxabzN7785msen/183pllJFd2ynAKSJgjw2wR7Qfyrp1muTH6S+ZyVvp8094lSeHWFvAtyl1HrMLgKRkMQdlwfPY++uXSuOkXjJG+0u5mzZss47YZ24o+XqkOj1nbyB2glmg07suoYx4+Br1pqYr7zS01782vq8uakxGStbduSTgszcwiKJyluvZB/WkxzPkuftrLXH4+PgpO1I5es/192rbL4OSb3je88/SP7Q/FuAtb4IOpDtnG4PnXM1mjtg96J3hvafWRm5dJdvCLK5VBJCww36ufA43B27q96bDqq0jJhnlPkwajLgtbgyRzjzSspuJk6t4sZIy2RjY77Vt3nU56eHfHtzjed42alfBx246239GjjTxCTKj5zvOdh7vGtP2nlwVy+5+vznt/bJpa5Jp736f+fs28KI+LyA+efsrJ7PtWdHkifXf6PGoifGr8nTwW1ZAS3fjHsxn8zWz7L018NZm/ntt92LVZa3mNknXVapQKBQKoUCgUEDxH9I2v8Ob+lQT1AoPBvhb4M1tfmZdknxIp8JFADj27Bveas84eekvXehfHlv7OOZT2saZB9Fxsw/7HkRXmHpOVQoFB5j8M3HlEaWKMA8hDSHOyJns6vDJ39imvUd3mey4dDLq0a2SK0lWVYFVCV5A47/M8/fXnfd6T1BzcT9TL9Rv5TQZWXq0+qPyFBvoFAoFAoFQKBQVl7NFmmtpfV3JMkZ8HPpgeee0PfWrNYi047dLc4+Pn+XTjLacdM1P1U5T8PL8ILgSXNlko8ZHWFHhdgpLKeak7ZIwa0sXiYecTHXaYnl9G/qpw6naLRPSJi0RvynunPiyzyTSTxtFG0Sh9eB2lJOQfId9bHBGS1rZImImI339Gj4k4qUpjtFpi07beqrSug1JCW0HmTzbHLPl5VxcmSsb1xzy+/8ATrVradrZOv2WforxVEj6qQ6cHsk8jnfGe7euh7P1lK18O87dnK1+mta/iVjfusV3AssbKeTDn+RrqZscZcc1nzc7Hecd4t2QMUExtQqZyHYMBzwCf+64kY886KK4994tO+3Xr+XQtfH/AJEzbtGwOIvHF1eTr3yTuVHcPb+VYZ1+TDg8Lf3+fPt6fH7L4FL5OPy+6Ua0R4BpA9HIPfnGefjXTtpcWXSbViOm8T6tOMt65ec+bgsbV+ryu4kGk/7d8Z+yubpNNl8Hipzi8bT6c+rZy5K8e0/7efxT4GK+liNo2c19oFAoFAqhQKBQQPEf0ja/w5v6VBPUCgiOlHAIr+3aGXv3Vu9GHIikTsS8Xs7i+6O3ZDplH2I36uVRyKN9IeHMeyvUxvzh5idur13o70zsr5R1coV++NyFcH2H0vdXnZ6TdxeRRjVJIiDxZgB9poKH0q+FC3hUpZkTSctX+mvnn9b2CvUR3Td5Xwnhl1xa6YJl3Y6pZTyXPex9mwHlivMzvyWI25v0H0a4HFYW6QRDZdye9mPpMfM/+qCUoObifqZfqN/KaDKy9Wn1R+QoN9AoFAoFAqBQKDk4lYJOmh8+KsNirDkVPcRXjJjjJXaWXDmtitxV/wC/RThY/GeuNwRGyAayfpr2dRXwZccvCuTOOMsXnJO23X4x5/OHZ8bweCMUbxPT4T5b+ktdpxYs0Mch1QxkA5/WxnDMPLbbyrWrq97Urad6x+/rL3k021b3rG1p/b0hdryyjnTSwBB5Hw8CDXdy4aZq7Wjk4ePLfFbeFc4fwtEleKcZwNSncZA7x7q4mDS0rmtizR5bxPo6eXU2tjrfHPpLo4VJCXCR9agPLtbfZ3U0mXBOSKY+Ku/Tny+jHnrkivFfafk71mDnqYmwBks/MnffHvPOtuM1c1p0+G20Rvvbz9dv5lrzSaR4l4+EI+/4WYhqB1L+I9tcnW+zbaeOOs71/eGzh1MZOU8pdnDI5kUFcMjDOM4I8cVvez8epxUram1qTz26THwYM9sdpmJ5TCSsYiiAHnv+JJ/7rq6TFOLFFZ9f3ndq5bRa8zDorYYygUCgUCqFAoFBA8R/SNr/AA5v6VBPUHA/GrcSdUZV1g4IzybnpJ5A+Wc0Gr/yG0xq65cZxnfmc4xtvyNTca76+spx1MrRuHXVpbtArjOobYxjvq7myi8d+DvhksjLDP1TgainpqBjVnfcDG/OrxSnCrd38GixuFa9twcA7o2wPInfC57s4pxycMLFw74KLZGHxq5MhwW0JhAVGMnvJAyOXjUnn1VeuAy2EUQS0Maxgn0dhkDLEk8yBzJqK6rbjVvJnRKp04zvjYnAO/cTsDyojtWZSxUEagASO8A5wffpP2VRp4n6mX6jfymgysvVp9UfkKDfQKBQKBQKgUCgUEfxbhonA30upDK3mNxkd4rX1GCMsdpjnHybGnzzimfOJ5S5b62jmXE6iOTufuz5N3jyNa+fHjy12yxwz3/v8suLJfFO+Od47f047eF7ZD86w076calYZ2K+HnWnWt9Ljn35jby6xMd4/nsz3vXPePdjn8p+bqsrnrmEjOvzec9kg4Ix48qyYM8Z7RltaPd68tuvzYsuPw4mlYnn6sfigmyYQqLuCe8+O3cKxTp41MTbTxFY6b+c/iF8WcXLJvM/8+rmfh80R1DO36y93urn5NDqtNbir9a/hmjPiyRtP0lKwCZlyJEdT4r+e9dnDGpyU3jJW0T6f207+HW36Zifi67K36tAuc4z+JzW5pcHgYox79N/3lhy347cTfWwxlAoFAoFAqhQKBQQPEf0ja/w5v6VBN9YucZGR3Z+yoK7bytaoYHWLSHb5xpEVTqYvllO+vtZx386Ki4rGQpFCJjFKuCMzox2Rh82vMKfZyPlQScVsHQCIphLd4mUSBtLtpwCfcdzQZrwh83PaOqRAEQP2T8ykeWX6wIz5CgxiZ7QSZSNlkfVraRUAJVVKvq5404GM7ADuoMJOHyPObsSJqQjQoKkdTg5y/dqyzeGy+FBp+TjPDHoeNgrzEkOGU6pGdVJHiCAfbQbuK2Et4VDxKgQEFSwYuGKhhtyTA95A8KDu4TYtBLKzyBoyqJGxPaAUydlz3kF8A9/fvREjxP1Mv1G/lNUZWXq0+qPyFBvoFAoFAoFQKBQKBQfCKDh+SkEmtSR4rzXzwO7PlWn/hUjJ4lZ29PL+mx/k2mnDP183O/B9TEnTp+io0//AGtS/szjvvbbbtHL/tljV7V2jr3nmDg+k9hmXzzXn/xPDO+K01+Z/l7/AKoiXdBbEDtMSfaw/wC638WnmtfftMz8Z/LXvkiZ92Ps3RxhRhRgVnpjrSNqxsx2tNp3lnXtCgUCgUCgUCqFAoFBA8R/SNr/AA5v6VBz8T4S8skvZYK8sLBlODhV3YHyNRWv5LnZbgSors00bAjBDqqxKWwfROFOR7aI3xWjrfSvocKxTSQkZQgRhTlj2l3GNqKirTgUwglSRNTNAETARRpJBZGxuWBHpHuPjmgkorO6hkcqOsAhCQsT2slsgP46c8+8DxoOe34JNDBLbsqyq2JEIGwcsOtGGJ3Jy/tZqDpvuGyGSYiPUhaE6NgJFQHUo7tttjttQa7yxafr2SBkV4hGVOFaRtWc6QdtK5GTv2vKgzjs7qGSQga8QrHE5PaPbY4fzXPPvA8aDnt+FXFvBLAR1i5WRCnjqBlXDHmWBf8A5nwoLBdy67eRtLLlG7LYBGx54Jqo32Xq0+qPyFBvoFAoFAoFQKBQKBQKBQKBQKBQKBQKBQKCH4xxKaGe2jjRGSZyrFmIK4UtkAAg7A1RCdGOna3s0MIj0s6TM++dBjl0IOX669r2UFzoFAoFBA8R/SNr/Dm/pUE9QKCgT9L7hJMZRt7hViUdtjHLIqZGc6dKbkd48xQS3AuNSzPKiSxXAWFXEiDCrK2r5tiCR3A45gc6CuDpnerGjME1MGaNNPauMPoIXB7sM22crpPfQSnBeks8xj+cjdDcLGXVdmDQCVlBzsUfKn2b70GninTCRJykc9uewrOoIYRKxUa9We3zLYxgKN6DdbdJ7gxq5ePDW8rhiNKlo5erSTVnZGUhvDfnQWLotxE3NrHKTktnJwACQzKSuDgrtsRzGDQS1BzcT9TL9Rv5TQZWXq0+qPyFBvoFAoFAoPz98o8VvOL3FnBfzRfPzBMsdKqjtgADuwMUV2dH+lnEre8ubC5uTNpjmUPsSsiRM6srYz3bg5wfZQRPRXifFr/Xji/UaAPWuq6s/R2oLxZcVvOFWN1c3N8l82VWLS4YK52AbHLx91BXOD2vSPiMDXkd4yruUXVo1456EC4xkYGc5oOvg3whXV1wq+SWQrcwRB0mTssVLAZIGwYd+PGggOGXHGJ7Ge+XiUoWBsMjOcnlyPLv5Gg6+J9O+IS8KgkFw6TLcGJ5EwpderLLqGMZ8cCg9g6BXkk/DbSWVizvCpZjzJI3JqI8h6V9IOItxqe1hvngQyhFywEaDq1bckbDOftqqtXRHhvElvIml4xFcRgkvCsisXGkjkPAkH3UFquOisU0ksvEJDNqY9WhdkjijHohVDAasblzuT4DABFatelfxG3vepdrmKOdYbMuxbW7oupBIT21SQkZzsBig47H5OunC8R4wZ7hjvHHO0UCN9BAmFIB2yTk0Fp6V3dxcXMfDrSUwlk62eZfSjizpUJ4MxB37tJoOSX4NI4xrtLu7iuBuJTM7gt/vRtmBPMUEl0UvDxCGOS5Gm5tJXjlVdh1qgxsQPosDqHtoOvg3RC1tJOthVg+ACSc50xrEM/8VHvyagn6oUCgUEDxH9I2v8Ob+lQT1BH9ILp4bWaSP00Qsu2dwNtqCnR9Jpi0qtMgVZQGmCDRDGwbmTyfUoUhvHPIiglYuLTtw9p1YBlkIVwmBKgl0h9J5a13z7xtQRXGek9yl1LGcwQKoCyvHkLhsPLqO2k50j2Z76DRY9J7yQS5ZUdYnfq+r3j0xxvHIc90hZufu5GglOPdIDF1QWaFHZ0UJgEsWRGIcnaMYY+0FfGg5OG9IbmRSesVtMkIbCeg0jsssB+qApzz7W9BNdFuLvPPco7BhG3Z0AaFXU4VS2AdYC5KnlkeNBZaDm4n6mX6jfymgysvVp9UfkKDfQKBQKBQfmy24Gt/x24tmdow9xOdS+kNLsdqK9Osvg4tOGW91MjPJL8XlUO+OyCjZwBtv40R4/0Mh4U2v5TMgGB1ejP/ACzgUVcr6w4bNwm7i4R1rdW6TyBgxOF2OMj6Iz7qCQ+D74SrO04asM5IkhDBFAJ6wEllwRt343oKb0S4dI3D+KXZGE6rQD3Fy4ZgPHG1BJfBt8H0PFYJJJZpE0SadKYwdgcnPfQS/wALvAIOH8OtIIAQomYkk5LMUbJJoQl+hvwl8NteH20M0jh4olVwEYgEDffvojzvpTLbS8ble4LfFpJFZyM6uraBGGBzzuKKvHQj/wAdhvojZNN17EomrVpOQc5yPAUHooHD+KoQyRXCxuylXQEo4yrAqwyp50R5H0hhi0PEDr4bacRQbElVjdB1yA96LIzDy5UV6n0i4dw4cPk62OAWwjJBAQKBp7JQjv5YxRFH6FXr2LWNzekrHdWiwda+wRkkdoNZ7tUbjBPhQeo8Q4pBbxGaaVEjAzqJGMeXj7qgrnwcQs8VxeMpQXs7TIp5iLZYiR3FlUN7xVFvqBVCgUCggeI/pG1/hzf0qCeoKdxTjs6XUkYfSVeMQwaMm4Rgpdg3PYlht6OjJ50ENJ0rveqLOyx4jV8lQS/z8iHTtgMVUAA9/toO+46VXBnmC9iHqykUrxtpE6qGYs3eMkrjuMZoO+PjEz8Pt50Y62kRWJUdoGXQ+w2wRuGHMYNBXpel931symQIgdhr6vPV6WlVEYdxfQmzbnVkcxQdNr0lvXS4JbTIkbO0ej1LLIFRT4607W/tFBIdIukckUkaRTRiQsVEWM6sKpPWN+qd8ADcll86CHtell2zKOtBUkaG6v1shWEvB5FC778+zvyNBb+i808nXPLIXj6wrDlQp0p2WY47i+rHkoPfQSnE/Uy/Ub+U0GVl6tPqj8hQb6BQKBQKCoAcGt+IBVWJb12J7KkvqfJJYgYUtud6DrTphwy4WZBOjqiMZBg4MY7Lkbdte4kZqCDfhvRxU1mG20CNJc6Tjq3JWMjxyQRjntVVKcAuOEWyl7RY4g8RlYqjKTGhIJORnYg7VEcUvBeAT9bOYIT1arJIQjABXUOrFRgHKkHl31R12XH+D3UPxWJo2hY9X1QRghOC2nGkD9Umg3dGb/hUUaixaJEl1uNAIB6vAkJzy05Gc1B9iu+F8aBQdXciI53UkAnIypIAPeMiggorPo05mCxWxEIJkbSdCgHB7XonfbY1RlP/AOOyxm5eOBl1CNj1bagwUBVK41A6QMbchQZW0nRy2kgljFujuA8UgVsYJKA6sYXfI3xQbeJ2nAbq+aKURm7Y6X0l1LtjOh2XCs2O4nNBI8D4rwiWF7a2MXUxoS8WghdAyGOCO0Mg5O+4oK4lh0ahjiuiEMLseq1dY8YZSdWmM5AIIPMUFovOkPC7m2k62SN4Ais4dTp0PnRsRvnGwG9BWOF8A6NAxTxpGRJL1cYfWVEvPRob0W8moPQeG8QiuE1wsGUMyZAI7SMVYb+BBHuqDroFUKBQKCG4rZTG5gniCsI1kUqzFfT0YIOD9Gg39fd/sY/vD/ZQOvu/2Mf3h/toHX3f7GP7w/2UDr7v9jH94f7KB193+xj+8P8AZQOvu/2Mf3h/toHX3f7GP7w/2UDr7v8AYx/eH+ygdfd/sY/vD/ZQOvu/2Mf3h/soNV0126MvUxjUpHrD3jH0KCTtkKoqnmAB9goNlAoFAoFBSoODXkNzeRrGj2965czB8PHqj0EFcdrBG2Dy9lBXx0O4hJbpC8cSG1tJLeNlfPXM4VVPLsLhckHvPlQfYOgU8Bul6oTQOkXUx9b1bRlWLuEfGVKuSynzorfP0a4qIUJ0TzPbSW8heQgprbKMXx29K7E4ycURLdHOD3lleOBEjwOkKGXXhh1UCxk6Mb5K+PfQcvDuit0kNsjKuY72aZu1/puZSpHie2NqCA4d8Gd2qLGXCJJZvHIA2dFw2kFl8QwUZ9lFWzotwziAlm+NfNxNAkSRpLrRXUFWaJcDQpUKceOaIiYejPEDw0cPaKIfF9DRSB+zMY5A6h105XUBvz5nnQfbrope3Ur3EgEDyzxMVjk7Ucca6S+vGC+fwxQauCdAJ2MMd0SkSQdXKsbjExE7v85tkhgQx8yaK3wdE7wP8XKx/FxfG7E+rt6dfWBNGPSz2Sc4x9lERln0H4hFAyDDPLA8W8mRAXnZj1e3osjAkeIoqTj6H3kVleWa6HVplkhYYQEHQ0gKj0cMDtRHR0h6LXUt1PPEqHD28kas2zmHdlbbs+R8cUEdc9Bbm7ZpJ1SMz3RmdFbPUhYDHEwOO0+sKxx50Fq+DvhE9nYrFc463rJGYg5B1yM2c+ec0FmqBVCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUH//2Q==",
        "JPEG",
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
  mounted() {},
  components: {
    QrcodeVue
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
    margin-left: -160px;
    margin-top: -30px;
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
