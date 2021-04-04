<template>

<q-page>
    <q-drawer
        side="right"
        v-model="drawerRight"
        overlay=""
        bordered
        :width="350"
        :breakpoint="500"
        content-class="bg-grey-1"
      >
        <div class="text-h6 q-pa-md row justify-between">
            <div class="text-capitalize">{{returnInspector.name}} <span class="text-grey-5">Schedule</span></div>
            <q-btn color="grey-10" icon="close"  size="sm" flat @click="drawerRight = false,selectedStaff = null" />
            
        </div>
        <q-calendar
        v-show="!showConfirmDialog"
        v-model="selectedDate"
        view="day"
        locale="en-us"
        style="height: 85vh;"
        interval-start="7"
        class="calendar-container"
        interval-count="11"
        :column-header-before="true"
        @click:time="openPlottingDialog"
        >
        <template #column-header-before="days">
            <div class="q-ma-xs text-primary text-overline">
            {{returnSelectedProject.start}}
            </div>
        </template>
        <template #day-body="{ date, timeStartPos, timeDurationHeight }">
            <template v-for="(event, index) in getEvents(date)">
            <q-badge
                v-if="event.start"
                :key="index"
                :class="isEventInThisProject(event) == true ? 'my-event text-white bg-orange-8' : 'my-event text-white bg-grey-8'"
                :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
            >
            <div class="row q-gutter-xs relative-position">
            <div class="col-12">
                <span>{{ event.title }}</span>
                
            </div>
            <div class="col-12">{{ event.itemName }}</div>
                <q-btn color="white" icon="close" flat size="xs" @click="removeEvent(event)" class="absolute-top-right" v-show="isEventInThisProject(event) == true"/>
            </div>

            </q-badge>
            </template>
        </template>

        </q-calendar>


        <div v-show="showConfirmDialog" class="q-pa-md">
            <q-banner class="bg-primary text-white">
            <b>NOW PLOTTING</b> <br>
            <div v-if="this.service_seleted.length == 1 && rangeLabel != ''" class="text-caption">{{rangeLabel}}</div>
            <div class="row" v-else v-for="(service,i) in this.service_seleted" :key="i">
                <div class="col-12 text-caption">{{showItemLabel(service)}}</div>
            </div>
            </q-banner>
            <div class="q-gutter-md q-mt-md">
                <q-select v-model="startTime" :options="timeOptions" label="Start Time" filled />
                <q-select v-model="endTime" :options="timeOptions" label="End Time (viewing only)" filled disable/>
            </div>
            
            <div class="row justify-center q-gutter-md q-mt-md">
                <q-btn color="primary" icon="check" label="OK" flat @click="confirmSchedule"/>
                <q-btn color="grey-8" icon="cancel" label="cancel" @click="showConfirmDialog = false"  flat/>
            </div>
        </div>
      </q-drawer>
    <div>
        <q-splitter
            v-model="splitterModel"
            style="height: 85vh"
            vertical
        >
            <template v-slot:before>
                <div class="container q-pa-md q-mr-md">
                    <div class="row justify-between q-mb-md">
                        <h6 class="q-my-sm">ITEMS PURCHASE</h6>
                        <!-- <q-toggle v-model="onSelect" color="primary" label="SELECTION" :disable="showConfirmDialog"/> -->
                    </div>
                    <q-card class="my-card q-pa-md q-mb-md" v-for="(items,i) in returnItemPurchase" :key="i" :class="showPlottingStatus(items) == true ? 'bg-primary text-white': ''" :disable="showConfirmDialog">
                        <div class="row">
                            <div class="col-3">
                                <q-avatar class="fit" square="">
                                    <q-img
                                        :src="items.service_photo"
                                        :ratio="1"
                                        spinner-color="primary"
                                        spinner-size="82px"
                                        v-if="showDoneSchedulingItems(items) == false"
                                    />
                                        <q-icon name="check" v-else color="orange"/>
                                </q-avatar>
                            </div>
                            <div class="col q-ml-md text-left q-gutter-xs">
                                <div class="text-subtitle2">{{items.service_name}} x {{items.service_quantity}}</div>   
                                <div class="text-caption">{{items.service_equipment}}</div>  
                                <div class="text-caption">  {{returnTimeRange(items.service_name)}} </div>    
                                <q-btn color="primary" icon="send" label="plot schedule" size="xs" @click="showInspectorsforPlotting(items.service_equipment,items.service_name,items.service_quantity,returnTimeRange(items.service_name),items)"  v-show="showDoneSchedulingItems(items) == false && showPlottingStatus(items) == false"/>    
                                <div class="row justify-between">
                                    <div class="text-overline text-primary" v-show="showDoneSchedulingItems(items) == true">DONE PLOTTING</div>  
                                    <div class="text-overline" v-show="showPlottingStatus(items) == true">PLOTTING NOW</div>    
                                    <q-btn color="white" icon="cancel" @click="removeFromList(items,i),showConfirmDialog = false,drawerRight = false,selectedStaff = null" round size="sm" flat v-show="showPlottingStatus(items) == true"/>
                                </div>
                                    
                            </div>
                            <!-- <div class="col-2" v-show="onSelect == true">
                                <q-checkbox v-model="service_seleted" :val="items" @input="showConfirmDialog = false"/>
                            </div> -->
                        </div>
                    </q-card>
                    <q-btn color="primary" icon="send" label="PLOT SCHEDULE"  class="full-width" v-show="onSelect == true" @click="plotMultiSelect"/>
                </div>

            </template>
            <template v-slot:separator>
                <q-avatar color="primary" text-color="white" size="20px" icon="drag_indicator" />
            </template>
            <template v-slot:after>
                <div class="container q-pa-md">
                    
                    <div class="row" style="font-size:1em;">
                        <div class="col">
                            <h6 class="q-my-sm">RESERVATION DETAILS - <span class="text-primary">{{returnSelectedProject.companyName}} ({{returnSelectedProject.projectLocation}})</span></h6>
                        </div>
                        <div class="col-4 q-pa-md bg-grey-2">
                            <div class="row justify-between">
                                <span class="text-weight-bold">Company Name</span>
                                <span>{{returnSelectedProject.companyName}}</span>
                            </div>
                            <div class="row justify-between">
                                <span class="text-weight-bold">Contact Person</span>
                                <span>{{returnSelectedProject.fullName}}</span>
                            </div>
                            <div class="row justify-between">
                                <div class="text-weight-bold"><q-icon name="date_range"/> Start Date</div>
                                <span>{{returnSelectedProject.start}}</span>
                            </div>
                            <div class="row justify-between">
                                <div class="text-weight-bold"><q-icon name="location_on"/> Location</div>
                                <span>{{returnSelectedProject.projectLocation}}</span>
                            </div>
                        </div>
                    </div>

                    <div v-show="service_seleted.length == 0">
                        <h4 v-if="returnAllDone == false" class="full-width text-center">Click <b class="text-primary">Plot Schedule Button</b>  In Items Purchase First</h4>
                        <div v-else class="text-center">
                            <h4 class="text-primary text-weight-bold full-width text-center">All Items Scheduled Successfully</h4>
                            <q-btn color="grey-8" outline label="review schedules" @click="onClick" class="q-mt-sm q-mr-md"/>
                            <q-btn color="primary"  label="back to approved projects" @click="$router.push('/approved-projects')" class="q-mt-sm"/>
                        </div>

                    </div>

                    <div v-show="service_seleted.length > 0">
                        <h6 class="q-my-sm"><q-icon name="star" /> INSPECTORS SCHEDULED IN THIS PROJECT</h6>
                        <div class="container row q-py-md" v-show="returnSameProject.length > 0">
                            <q-card class="my-card col-lg-3 col-sm-6 col-md-3 q-mx-sm" v-for="(staff) in returnSameProject" :key="staff.id" :disable="showConfirmDialog">
                                <q-card-section>
                                    <div class="text-h6">{{staff.name}}</div>
                                    <div class="text-subtitle2">{{staff.position}}</div>
                                </q-card-section>
                                <q-separator inset  />
                                <q-card-actions align="center">
                                    <q-btn :flat="returnPlottingHere(staff)" :label="returnPlottingHere(staff) == true ? 'plotting here':'view schedule'" color="primary" :disable="returnPlottingHere(staff)" @click="showInspectorSchedule(staff)"/>
                                </q-card-actions>
                            </q-card>
                            
                        </div>
                        <span v-show="returnSameProject.length == 0">No inspectors listed in this category.</span>


                        <h6 class="q-my-sm"><q-icon name="event_available" /> NO SCHEDULES FOR THE DAY</h6>
                        <div class="container row q-py-md" v-show="returnNoScheduleForTheDay.length > 0">
                            <q-card class="my-card col-lg-3 col-sm-6 col-md-3 q-mx-sm" v-for="(staff) in returnNoScheduleForTheDay" :key="staff.id" :disable="showConfirmDialog">
                                <q-card-section>
                                    <div class="text-h6">{{staff.name}}</div>
                                    <div class="text-subtitle2">{{staff.position}}</div>
                                </q-card-section>
                                <q-separator inset  />
                                <q-card-actions align="center">
                                    <q-btn :flat="returnPlottingHere(staff)" :label="returnPlottingHere(staff) == true ? 'plotting here':'view schedule'" color="primary" :disable="returnPlottingHere(staff)" @click="showInspectorSchedule(staff)"/>
                                </q-card-actions>
                            </q-card>
                            
                        </div>
                        <span v-show="returnNoScheduleForTheDay.length == 0">No inspectors listed in this category.</span>

                        <h6 class="q-my-sm"><q-icon name="location_on" /> WITH SCHEDULES ON THIS DAY (SAME LOCATION)</h6>
                        <div class="container row q-py-md">
                            <q-card class="my-card col-lg-3 col-sm-6 col-md-3 q-mx-sm" v-for="(staff) in returnWithScheduleAndSameLocation" :key="staff.id" :disable="showConfirmDialog">
                                <q-card-section>
                                    <div class="text-h6">{{staff.name}}</div>
                                    <div class="text-subtitle2">{{staff.position}}</div>
                                </q-card-section>
                                <q-separator inset  />
                                <q-card-actions align="center">
                                    <q-btn :flat="returnPlottingHere(staff)" :label="returnPlottingHere(staff) == true ? 'plotting here':'view schedule'" color="primary" :disable="returnPlottingHere(staff)" @click="showInspectorSchedule(staff)"/>
                                </q-card-actions>
                            </q-card>
                        </div>
                        <span v-show="returnWithScheduleAndSameLocation.length == 0">No inspectors listed in this category.</span>
                        <h6 class="q-my-sm"><q-icon name="event_busy" /> WITH SCHEDULES ON THIS DAY</h6>
                        <div class="container row q-py-md">
                            <q-card class="my-card col-lg-3 col-sm-6 col-md-3 q-mx-sm" v-for="(staff) in returnWithSameDate" :key="staff.id" :disable="showConfirmDialog">
                                <q-card-section>
                                    <div class="text-h6">{{staff.name}}</div>
                                    <div class="text-subtitle2">{{staff.position}}</div>
                                </q-card-section>
                                <q-separator inset  />
                                <q-card-actions align="center">
                                    <q-btn :flat="returnPlottingHere(staff)" :label="returnPlottingHere(staff) == true ? 'plotting here':'view schedule'" color="primary" :disable="returnPlottingHere(staff)" @click="showInspectorSchedule(staff)"/>
                                </q-card-actions>
                            </q-card>
                        </div>
                        <span v-show="returnWithSameDate.length == 0">No inspectors listed in this category.</span>
                    </div>

                </div>
            </template>
        </q-splitter>
    </div>
</q-page>
</template>
<script>
import { fb, db, fs } from "boot/firebase";
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import { date } from 'quasar'
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
function luminosity (color) {
  if (typeof color !== 'string' && (!color || color.r === void 0)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}
export default {
    components: {
        QCalendar,
        FullCalendar,
    },
    firestore() {
        return {
            inspectors: fs.collection("inspectors"),
            positions: fs.collection("positions"),
            preproposals: fs.collection("preproposals"),
            inspectorSchedules: fs.collection("inspectorSchedules"),
            newSchedules: fs.collection("newSchedules")
        };
    },
    
    data(){
        return {
            value: '',
            splitterModel: 25,
            availableInspectors: [],
            approvedProjects: [],
            selectedProject: [],
            service_seleted: [],
            selected_inspector: [],
            newSchedules: [],
            onSelect: false,
            showInspectors: false,
            rangeLabel: '',
            drawerRight: false,
            selectedDate: '',
            selectedTimeDate: null,
            showConfirmDialog: false,
            startTime: '08:00 AM',
            timeOptions: ['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'],
            endTime: '09:00 AM',
            selectedStaff: null,
            //for calendar        
        }
    },
    mounted() {
        this.$binding(
        "availableInspectors",
        fs.collection("inspectors").where("available", "==", true)
        );
        this.$binding(
        "approvedProjects",
        fs
            .collection("preproposals")
            .where("status", "==", "approved")
            .orderBy("start")
        );     
        this.$binding(
        "newSchedules",
        fs.collection("newSchedules")
        );
    },
    computed:{
        groupInspectorSchedules(){
            try {
                let inspector = this.availableInspectors
                console.log(inspector)
                let checker = []
                for(var x = 0; x < inspector.length; x++){
                    let events = []
                    let other = []
                    let baseID = inspector[x].id
                    let map = this.$lodash.map(this.newSchedules,a=>{
                        if(a.inspector_Id == baseID){
                            console.log(a.date+ ' '+ this.returnSelectedProject.start)
                            if(a.date == this.returnSelectedProject.start){
                                events.push(a)
                            } else {
                                other.push(a)
                            }  
                        }
                    })
                    inspector[x].events = events
                    inspector[x].other = other
                }   
                return inspector             
            } catch (error) {
                return []
            }
        },
        returnNoScheduleForTheDay(){
            try {
                return this.$lodash.filter(this.groupInspectorSchedules,a=>{
                    if(a.events.length == 0){
                        if(a.other.length >= 0){
                            return a
                        }
                    }
                })
            } catch (error) {
                return []
            }
        },
        returnWithScheduleAndSameLocation(){
            try {
                let schedules = this.newSchedules
                let filter = this.$lodash.filter(schedules,a=>{
                    if(a.date == this.returnSelectedProject.start){
                        let title = a.title
                        let arr = title.split(' ')
                        if(this.$lodash.includes(arr,this.returnSelectedProject.projectLocation)){
                            return a
                        }
                    }
                })
                let uniq = this.$lodash.uniqBy(filter,'inspector_Id')
                console.log(filter,'filter')
                console.log(uniq,'uniq')
                let sameLocation = []
                for(var x=0;x< this.availableInspectors.length;x++){
                    let available = this.availableInspectors[x]
                    let filters = this.$lodash.filter(uniq,b=>{
                        if(b.inspector_Id == available.id){
                            sameLocation.push(available)
                        }
                    })
                }
                console.log(sameLocation,'sameLocaation')
                let diff = this.$lodash.difference(sameLocation,this.returnSameProject)
                return diff
            } catch (error) {
                return []
            }            
        },
        returnSameProject(){
            try {
                let schedules = this.newSchedules
                let filter = this.$lodash.filter(schedules,a=>{
                    if(a.date == this.returnSelectedProject.start){
                        let title = a.preproposals_Id
                        let basis = this.returnSelectedProject.id
                        if(title == basis){
                            return a
                        }
                    }
                })  
                let uniq = this.$lodash.uniqBy(filter,'inspector_Id')
                console.log(filter,'filter')
                console.log(uniq,'uniq')
                let sameProject = []
                for(var x=0;x< this.availableInspectors.length;x++){
                    let available = this.availableInspectors[x]
                    let filters = this.$lodash.filter(uniq,b=>{
                        if(b.inspector_Id == available.id){
                            sameProject.push(available)
                        }
                    })
                }
                console.log(sameProject,'sameProject')
                return sameProject                
                
            } catch (error) {
                return []
            }
        },
        returnWithSameDate(){
            try {
                let schedules = this.newSchedules
                let filter = this.$lodash.filter(schedules,a=>{
                    if(a.date == this.returnSelectedProject.start){
                        return a
                    }
                })
                let uniq = this.$lodash.uniqBy(filter,'inspector_Id')
                console.log(filter,'filter')
                console.log(uniq,'uniq')
                let sameLocation = []
                for(var x=0;x< this.availableInspectors.length;x++){
                    let available = this.availableInspectors[x]
                    let filters = this.$lodash.filter(uniq,b=>{
                        if(b.inspector_Id == available.id){
                            sameLocation.push(available)
                        }
                    })
                }
                console.log(sameLocation,'sameLocaation')
                let diff = this.$lodash.difference(sameLocation,this.returnSameProject)
                console.log(diff,'diff')
                return diff
            } catch (error) {
                return []
            }            
        },
        returnInspectorDates(){
            try {
                let schedule = this.$lodash.filter(this.newSchedules,a=>{
                    return a.inspector_Id == this.selectedStaff.id
                })

                return schedule                
            } catch (error) {
                return []
            }   

        },
        returnSumthing(){
            console.log('checkdata')
            console.log(this.returnItemPurchase,'selected')
            console.log(this.availableInspectors,'available')
            return ''
        },
        returnSelectedProject(){
            try {
                let project = this.$lodash.filter(this.approvedProjects,a=>{
                    return a.id == this.$route.params.id
                })
                this.selectedDate = date.formatDate(project[0].start,'YYYY-MM-DD') 
                console.log(project[0],'project')//YYYY-mm-dd
                return project[0]               
            } catch (error) {
                return {}
            }

        },
        returnItemPurchase(){
            let data = {...this.returnSelectedProject}
            let arr = data.itemPurchase
            let items = this.$lodash.map(arr,a=>{
                if(a.service_name == 'Earth Moving'){
                    a.timeMin = .5
                    a.timeMax = 1
                } else if(service_name == 'Lifting Equipment'){
                    a.timeMin = 1
                    a.timeMax = 1
                } else {
                    a.timeMin = 5
                    a.timeMax = 6
                }
                return a
            })
            console.log(items,'items')
            return data.itemPurchase
        },
        returnDone(){
            //per item schedule
            //record as done items
                // get service key and preposal key
        },
        returnInspector(){
            try {
                if(this.selectedStaff !== null){
                    return this.selectedStaff
                } else {
                     return {name: ''}
                } 
            } catch (error) {
                return {name: ''}
            }
        },
        returnProjectDate(){
            try {
                let date = new Date(this.returnSelectedProject.start).toISOString().substr(0, 10)  
                return date
            } catch (error) {
                let data = new Date().toISOString().substr(0, 10)
                return date
            }
        },
        returnAllDone(){
            try {
                let items = this.returnItemPurchase
                let arr = []
                for(var x = 0;x<items.length;x++){
                    arr.push(this.showDoneSchedulingItems(items[x]))
                }
                console.log(arr,'arr')
                console.log(this.$lodash.includes(arr,false))
                if(this.$lodash.includes(arr,false) == true){
                    return false
                } else {
                    return true
                }
            } catch (error) {
                return false
            }
        }
    },
    methods:{    
        isCssColor (color) {
            return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
        },
        getEvents(dt){
        //   console.log('dt',dt)
          let ReserveDate = []
          for(let x=0; x < this.returnInspectorDates.length; x++){
            let add = this.returnInspectorDates[x]
            let dateFormat = date.formatDate(this.returnInspectorDates[x].date, 'YYYY-MM-DD')
            // console.log(dateFormat,'asd')
            if(dateFormat == dt){  
              ReserveDate.push(add)
            }
          }
        //   console.log('ReserveDate',ReserveDate)
          return ReserveDate
        },
        //schedule
        badgeClasses (event, type) {
            
            const cssColor = this.isCssColor('#0000FF')
            const isHeader = type === 'header'
            // console.log('showerror')
            return {
                [`text-white bg-orange`]: !cssColor,
                'full-width': !isHeader && (!event.side || event.side === 'full'),
                'left-side': !isHeader && event.side === 'left',
                'right-side': !isHeader && event.side === 'right'
            }
        },

        badgeStyles (event, type, timeStartPos, timeDurationHeight) {
            
            const s = {}
            // if (this.isCssColor('#0000FF')) {
                
            //     s['background-color'] = '#0000FF'
            //     s.color = luminosity('#0000FF') > 0.5 ? 'black' : 'white'
            // }
            if (timeStartPos) {
                s.top = timeStartPos(event.start) + 'px'
            }
            if (timeDurationHeight) {
                s.height = timeDurationHeight(event.duration) + 'px'
            }
            s['align-items'] = 'flex-center'
            // console.log(s,'s')
            return s
        },
        showPlottingStatus(obj){
            return this.$lodash.includes(this.service_seleted, obj)
        },
        showInspectorsforPlotting(equip,service_name,qty,timerange,obj){
            this.rangeLabel = equip+' - '+service_name+' x '+qty+' for '+timerange
            this.showInspectors = true
            this.service_seleted.push(obj)
            this.showConfirmDialog = false
            
        },
        showItemLabel(obj){
            let equip = obj.service_equipment
            let service_name = obj.service_name
            let qty = obj.service_quantity
            let timerange = this.returnTimeRange(obj.service_name)
            return equip+' - '+service_name+' x '+qty+' for '+timerange
        },
        plotSchedule(){
            this.$q.loading.show();
            let userID = fb.auth().currentUser.uid;

            let payload = {
                preproposals_Id: '',
                inspector_Id: '',
                service: [],
                startTime: '',
                endTime: '',
                duration: '',
                startDate: '',
                tentativeEndDate: '',
                finished: false,
                createdBy: userID
            }

            this.$firestore.preproposals
                .add(this.preproposal)
                .then(response => {
                console.log(response);
                this.$q.loading.hide();
                    this.$q.dialog({
                        title: "Success",
                        message: "Done Scheduling Items",
                        persistent: true
                    });
                })
                .catch(error => {
                showErrorMessage(error.message);
                });
        },
        returnTimeRange(service_name){
            if(service_name == 'Earth Moving'){
                return '30mins - 1hr'
            } else if(service_name == 'Lifting Equipment'){
                return '1hr'
            } else {
                return '5 to 6hrs'
            }
        },
        openPlottingDialog(time){
            console.log(time,'timestamp')
            if(time.time < '08:00'){
                console.log('this is before time in')
            } else if(time.time > '17:00'){
                console.log('this is after time')
            } else {
                this.selectedTimeDate = time
                
                console.log('get times', this.service_seleted)
                let sumTime = this.$lodash.sumBy(this.service_seleted,'timeMax')
                let sumQty = this.$lodash.sumBy(this.service_seleted,'service_quantity')
                let maxTimes = sumTime * sumQty//from selected services
                console.log('sumTime',sumTime)
                let times = time.time
                let arr = times.split(':')
                let baseDate = new Date(2020,1,1)
                let start = date.addToDate(baseDate, {hours:arr[0],minutes:'00'})
                let end = date.addToDate(start, {hours:maxTimes})
                console.log('start',start)
                console.log('formatted',this.formatTimeInput(start))
                this.startTime = this.formatTimeInput(start)
                this.endTime = this.formatTimeInput(end)

                if(this.isThereAnEvent(date.formatDate(start,'hh:mm')) == false){
                    if(this.service_seleted.length > 0){
                        this.showConfirmDialog = true
                    }
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                // open dialog
                // pass on time data to v-models
            }
        },
        formatTimeInput(time){
            //get time to format for display
            return date.formatDate(time,'hh:mm A')
        },
        plotMultiSelect(){
                let sumTime = this.$lodash.sumBy(this.service_seleted,'timeMax')
                let maxTimes = sumTime //from selected services
                console.log('sumTime',sumTime) 
                this.showInspectors = true          
        },
        removeFromList(items,indexs){
            let inside = this.$lodash.includes(this.service_seleted,items)
            let index = this.$lodash.findIndex(this.service_seleted,items)
            console.log(inside,'index')
            console.log(index,'index')
            this.service_seleted.splice(index,1)
        },
        showInspectorSchedule(staff){
            this.selectedStaff = staff
            this.drawerRight = true
        },
        confirmSchedule(){
            for(var x=0;x<this.service_seleted.length;x++){
                this.saveScheduleService(this.service_seleted[x],x)
            }
            this.showInspectors = false
            this.drawerRight = false
            this.showConfirmDialog = false
            this.service_seleted = []
        },
        saveScheduleService(item,index){
            this.$q.loading.show();
            let userID = fb.auth().currentUser.uid;
            let inspector = this.selectedStaff
            let reservation = this.returnSelectedProject
            console.log(reservation)
            let services = this.service_seleted
            let toAddTime = 0
            let length = index + 1
            for(var x = index; x < length; x++){
                toAddTime = toAddTime + services[x].timeMax
            }
            
            let hours = toAddTime * services[index].service_quantity
            console.log(hours,'hours neded')

            this.getDateFormatOfTime(this.startTime)
            this.getDateFormatOfTime(this.endTime)

            let startTime = this.getDateFormatOfTime(this.startTime) //end minus item - timemax
            let endTime = this.getDateFormatOfTime(this.endTime) // this.startTime format date + ung toaddtime addto date func
            console.log(startTime,'start')
            let end = date.addToDate(startTime, {hours:hours})
            console.log(end,'end')
            console.log(date.formatDate(end,'HH:mm'),'end')
            let start = date.subtractFromDate(end, {hours:hours})

            let dates = []

            let schedule = {
                title: reservation.companyName+' '+reservation.projectLocation,
                itemName: item.service_quantity+'x '+item.service_name+' '+item.service_equipment,
                date: reservation.start,
                duration: hours * 60,
                start: date.formatDate(start,'HH:mm'),  
                end: date.formatDate(end,'HH:mm'),
                itemScheduled: item,
                inspector_Id: inspector.id, 
                preproposals_Id: reservation.id, 
                createdBy: userID
            }
            console.log(schedule,'schedule')
            // this.$q.loading.hide();
            this.$firestore.newSchedules
                .add(schedule)
                .then(response => {
                console.log(response);
                this.$q.loading.hide();
                    this.$q.dialog({
                        title: "Success",
                        message: "Done Scheduling Items",
                        persistent: true
                    });
                    this.selectedStaff = null
                    //update reserved
                })
                .catch(error => {
                console.log(error.message);
                });
            //SAVE TO DATABASE
            //NOTIFY
        },
        getDateFormatOfTime(time){
            let arr = time.split(':')
            let projectDate = date.formatDate(this.returnSelectedProject.start,'YYYY,MM,DD')
            let baseDate = new Date(projectDate)
            let dateReturn = date.addToDate(baseDate, {hours:arr[0],minutes:'00'})
            // console.log(dateReturn,'dateReturn')
            return dateReturn.toString()
        },
        showDoneSchedulingItems(item){
            let schedules = this.newSchedules
            let projectKey = this.returnSelectedProject.id
            let dates = this.$lodash.filter(schedules,a=>{
                if(a.preproposals_Id == projectKey){
                    if(this.$lodash.isEqual(a.itemScheduled,item)){
                        return a
                    }
                }
            })
            // console.log(dates,'dates po')
            if(dates.length > 0){
                return true
            } else {
                return false
            }
        },
        isEventInThisProject(event){
            let projectKey = this.returnSelectedProject.id
            if(event.preproposals_Id == projectKey){
                return true
            } else {
                return false
            }
        },
        returnPlottingHere(staff){
            return this.$lodash.isEqual(staff,this.selectedStaff)
        },
        isThereAnEvent(time){
            let projectDate = this.returnSelectedProject.start
            let filter = this.$lodash.filter(this.newSchedules,a=>{
                if(this.selectedStaff.id == a.inspector_Id){
                    if(projectDate == a.date){
                            let base = time.split(':')
                            let start = a.start.split(':')
                            let end = a.end.split(':')

                            console.log(parseInt(base[0]))
                            if(parseInt(base[0]) >= parseInt(start[0]) && parseInt(base[0]) < parseInt(end[0])){ //it blocks 1hr before
                                return a
                            }
                        }
                    }
            })
            if(filter.length > 0){
                console.log(filter,'there is an event')
                return true
            } else {
                console.log('there is none')
                return false
            }
        },
        removeEvent(event){
            this.$q.dialog({
                title: "Remove Schedule",
                message: "Do you want to remove this schedule? (This action cannot be undone).",
                persistent: true,
                ok: 'OK',
                cancel: 'cancel'
            }).onOk(()=>{
                console.log('ok daw',event)
                this.$firestore.newSchedules
                .doc(event.id).delete()
                .then(a => {
                    this.$q.dialog({
                        title: "Success Delete",
                        message: "Done Deleting Schedule",
                        persistent: true
                    });
                })
            })         
        }
    }
    
}
</script>
<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style lang="sass">
  .calendar-container
    position: relative

  .my-event
    width: 100%
    position: absolute
    font-size: 12px

  </style>