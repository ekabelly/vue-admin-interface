<template>
  <div class="edit-event">
    <div v-if="isData">
      <!-- editing event: {{ eventKey ? eventKey : 'new event' }} -->
      <div class="edit-event-content">
        <div class="edit-event-header flex">
          <div
            class="link flex justify-center align-center"
            :class="{ active: tab === 1 }"
            @click="tab = 1"
          >פרטי האירועי</div>
          <div
            class="link flex justify-center align-center"
            :class="{ active: tab === 2, disabled: !$route.params.id }"
            @click="$route.params.id ? tab = 2 : null"
          >המתנדבים</div>
        </div>
        <div v-if="tab === 1">
          <section class="volunteers-details section">
            <div class="section-title">פרטי מתנדבים</div>
            <div class="type-selection margin-top flex align-center">
              <div class="option flex align-center" @click="event.type = 1">
                <div class="radio flex align-center justify-center">
                  <div class="circle" :class="{ active: event.type === 1 }"></div>
                </div>מתנדבים רשומים
              </div>
              <div class="option flex align-center" @click="event.type = 0">
                <div class="radio flex align-center justify-center">
                  <div class="circle" :class="{ active: event.type === 0 }"></div>
                </div>קהל רחב
              </div>
            </div>
            <div class="type-selection margin-top flex align-center">
              <div class="option flex align-center" @click="toggleVolunteeringType(12)">
                <div
                  class="square flex align-center justify-center"
                  :class="{ active: event.volunteersTypes && event.volunteersTypes.includes(12) }"
                >
                  <div class="check">V</div>
                </div>תומכים
              </div>
              <div class="option flex align-center" @click="toggleVolunteeringType(11)">
                <div
                  class="square flex align-center justify-center"
                  :class="{ active: event.volunteersTypes && event.volunteersTypes.includes(11) }"
                >
                  <div class="check">V</div>
                </div>פעילים
              </div>
              <div class="option flex align-center" @click="toggleVolunteeringType(13)">
                <div
                  class="square flex align-center justify-center"
                  :class="{ active: event.volunteersTypes && event.volunteersTypes.includes(13) }"
                >
                  <div class="check">V</div>
                </div>פעילים פלוס
              </div>
            </div>
            <div class="volunteers-numbers margin-top flex">
              <div class="min-volunteers">
                מספר מתנדבים מינימלי
                <input
                  :min="0"
                  :max="event.volunteers.max"
                  v-model="event.volunteers.min"
                  type="number"
                />
              </div>
              <div class="max-volunteers">
                מספר מתנדבים מקסימלי
                <input v-model="event.volunteers.max" type="number" />
              </div>
            </div>
          </section>

          <section class="section">
            <div class="section-title">תיאור ההתנדבות</div>
            <div class="title">
              <label for="title">כותרת התנדבות (עד 50 תווים)</label>
              <input id="title" maxlength="50" v-model="event.title" type="text" />
            </div>
            <div class="desc">
              <label for="desc">תיאור התנדבות</label>
              <input id="desc" v-model="event.desc" type="text" />
            </div>
          </section>
          <section class="section">
            <div class="section-title">זמן ומיקום</div>
            <div class="time flex">
              <div class="date">
                <label for="date">תאריך</label>
                <input
                  id="date"
                  :value="getDateForInput(event.time.date)"
                  @change="setEventDate"
                  type="date"
                />
              </div>
              <div class="hour">
                <label for="hour">שעה</label>
                <input id="hour" v-model="event.time.time" type="time" />
              </div>
            </div>
            <div
              class="duration option flex align-center"
              @click="event.time.duration === 1 ? event.time.duration = 0 : event.time.duration = 1"
            >
              <div
                class="square flex align-center justify-center"
                :class="{ active: event.time.duration === 1 }"
              >
                <div class="check">V</div>
              </div>התנדבות מתמשכת (יותר מיום אחד)
            </div>
            <div class="duration option flex align-center" @click="event.urgent = !event.urgent">
              <div
                class="square flex align-center justify-center"
                :class="{ active: event.urgent }"
              >
                <div class="check">V</div>
              </div>התנדבות מיידית (ההתנדבות תופיע בראש הרשימע באפליקציה עם תווית מיידי)
            </div>
            <div class="location margin-top">
              <div class="location-options flex">
                <div class="option flex align-center" @click="handleLocationsNum(1)">
                  <div class="radio flex align-center justify-center">
                    <div class="circle" :class="{ active: event.locations.length <= 1 }"></div>
                  </div>מיקום בודד
                </div>
                <div class="option flex align-center" @click="handleLocationsNum(2)">
                  <div class="radio flex align-center justify-center">
                    <div class="circle" :class="{ active: event.locations.length === 2 }"></div>
                  </div>שני מיקומים
                </div>
                <div class="option flex align-center" @click="handleLocationsNum(3)">
                  <div class="radio flex align-center justify-center">
                    <div class="circle" :class="{ active: event.locations.length >= 3 }"></div>
                  </div>מספר מיקומים
                </div>
                <div
                  class="add-location"
                  v-if="event.locations.length >= 3"
                  @click="handleLocationsNum(event.locations.length + 1)"
                >
                  <div class="btn">הוסף מיקום</div>
                </div>
              </div>
              <div class="locations margin-top">
                <div
                  class="location-inputs"
                  v-for="(location, index) in event.locations"
                  :key="index"
                >
                  <div class="hr" v-if="index !== 0"></div>
                  <div class="flex">
                    <div class="form-group flex">
                      <label :for="'city' + index">עיר {{ index === 0 ? 'כתובת מוצא' : '' }}</label>
                      <input
                        @blur="updateLocations($event, 'city', index)"
                        :id="'city' + index"
                        type="text"
                        :value="location.city"
                      />
                    </div>
                    <div class="form-group flex">
                      <label :for="'street' + index">רחוב</label>
                      <input
                        @blur="updateLocations($event, 'street', index)"
                        :id="'street' + index"
                        type="text"
                        :value="location.street"
                      />
                    </div>
                    <div class="form-group flex">
                      <label :for="'houseNum' + index">מספר בית (לא חובה)</label>
                      <input
                        @blur="updateLocations($event, 'houseNum', index)"
                        class="houseNum"
                        :id="'houseNum' + index"
                        type="number"
                        :value="location.houseNum"
                      />
                    </div>
                  </div>
                  <div class="form-group flex location-desc">
                    <label :for="'desc' + index">תיאור כתובת {{ index === 0 ? 'מוצא' : '' }}</label>
                    <input
                      @blur="updateLocations($event, 'desc', index)"
                      :id="'desc' + index"
                      type="text"
                      :value="location.desc"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section">
            <div class="section-title">פרטי התקשרות</div>
            <div class="flex form-group contact">
              <label for="phone">טלפון</label>
              <input v-model="event.contact.phone" type="number" id="phone" />
              <label for="mobile">טלפון נייד</label>
              <input v-model="event.contact.mobile" type="number" id="mobile" />
            </div>
          </section>
          <section class="section">
            <div class="section-title">תווית ומידע נוסף</div>
            <div class="vehicles flex">
              <div class="vehicles-label">כלי רכב</div>
              <div
                class="vehicle pointer"
                v-for="(vehicle, key) of config.vehicles"
                :key="key"
                :class="{ selected: event.vehicles && event.vehicles.includes(key) }"
                @click="toggleVehicleOrTags('vehicles', key)"
              >{{ vehicle.translation }}</div>
            </div>
            <div class="tags flex">
              <div class="tags-label">תגיות</div>
              <div class="flex flex-column">
                <input type="text" v-model="newTag" class="add-tag-input" />
                <div class="flex flex-wrap">
                  <div
                    class="tag pointer"
                    v-for="(tag, key) of config.tags"
                    :key="key"
                    :class="{ selected: event.tags && event.tags.includes(key) }"
                  >
                    <!-- <div @click="deleteTag(key)" class="x flex justify-center align-center">x</div> -->
                    <div
                      @click="toggleVehicleOrTags('tags', key)"
                      class="text"
                    >{{ tag.translation }}</div>
                  </div>
                </div>
              </div>
              <AsyncBtn
                class="add-tag"
                font-size="16px"
                height="fit-content"
                ref="addTag"
                @btn-clicked="addTag"
                label="הוספת תגית"
                width="150px"
              />
            </div>
          </section>
          <section class="flex flex-end">
            <!-- <div @click="handleSubmit" class="publish-btn flex justify-center align-center pointer">
                        פרסם באפליקציה
            </div>-->
            <AsyncBtn
              ref="asyncBtn"
              @btn-clicked="handleSubmit"
              :inactive="!validForm"
              label="פרסם באפליקציה"
              width="422px"
            />
          </section>
        </div>
        <div v-if="tab === 2 && (backupVolunteers.length > 0 || assignedVolunteers.length > 0)">
          <ManageVolunteers
            @reload="setComponenetData($event)"
            :event="event"
            :assignedVolunteers="assignedVolunteers"
            :backupVolunteers="backupVolunteers"
          />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center align-center">
      <div class="medium-spinner"></div>
    </div>
  </div>
</template>

<script>
import defualtEvent from '@/config/default-event';
import util from '@/util/util';
import ManageVolunteers from '../components/ManageVolunteers';
import AsyncBtn from '@/components/AsyncBtn';
import moment from 'moment';

export default {
    name: 'editEvent',
    components: {
        AsyncBtn,
        ManageVolunteers
    },
    data(){
        return {
            isData: false,
            config: null,
            eventKey: null,
            tab: 1,
            newTag: '',
            event: {},
            backupVolunteers: [],
            assignedVolunteers: []
        }
    },
    watch: {
        $route(){
            this.setComponenetData();
        }
    },
    computed: {
        validForm(){
            const { event } = this;
            if(!event.title || event.title.length < 1){
                return false;
            }
            if(!event.volunteersTypes || event.volunteersTypes.length < 1){
                return false;
            }
            if(!event.locations || event.locations.length < 1 || 
            !(event.locations.every(location => location.city && location.city.length > 0))){
                return false;
            }
            return true;
        }
    },
    mounted(){
        this.setComponenetData();
    },
    methods: {
        async setComponenetData(shouldResetVolunteers){
          if(shouldResetVolunteers) {
            this.backupVolunteers = [];
            this.assignedVolunteers = [];

          }
            this.isData = false;
            this.eventKey = this.$route.params.id;
            let eventPromise;
            if(this.eventKey){
                eventPromise = this.$store.dispatch('fetchEvent', this.eventKey);
            }
            const configPromise = this.$store.dispatch('fetchConfig');
            const data = await Promise.all([configPromise, eventPromise]);
            this.config = data[0];
            this.event = data[1] || util.copyObject(defualtEvent);
            this.event = this.initMissingFields(this.event);
            this.isData = true;
            this.handleEventVolunteers(this.event);
            // console.log({ config: this.config, event: this.event });
        },
        initMissingFields(event){
            const mandatoryFields = {'vehicles': [], 'tags': [], 'backupVolunteers': {}, 'assignedVolunteers': {}};
            for (const field in mandatoryFields) {
                if(!event[field]){
                    event[field] = mandatoryFields[field];
                }
            }
            return event;
        },
        async handleEventVolunteers(event){
            event = event || this.event;
            const volunteersList = await this.$store.dispatch('fetchVolunteers', [
                ...Object.values(event.backupVolunteers || [])
                , ...Object.values(event.assignedVolunteers || [])
            ]);
            this.assignedVolunteersToLists(volunteersList.filter(volunteer => !!volunteer && !!volunteer.user_id));
        },
        assignedVolunteersToLists(volunteersList){
            console.log({volunteersList});
            this.backupVolunteers = [];
            this.assignedVolunteers = [];
            for (const volunteer of volunteersList) {
                if(this.event.backupVolunteers[volunteer.user_id]){
                    this.backupVolunteers.push(volunteer);
                }
                if(this.event.assignedVolunteers[volunteer.user_id]){
                    this.assignedVolunteers.push(volunteer);
                }
            }
        },
        toggleVolunteeringType(type){
            if(this.event.volunteersTypes.includes(type)){
                this.event.volunteersTypes = this.event.volunteersTypes.filter(val => val !== type);
            } else {
                this.event.volunteersTypes.push(type);
            }
        },
        handleAyncBtn(){
            this.$refs.asyncBtn.toggleSpinner(true);
        },
        validFormNotifyUser(){
            const { event } = this;
            if(!event.title || event.title.length < 1){
                alert('חובה לתת כותרת לאירוע');
                return false;
            }
            if(!event.volunteersTypes || event.volunteersTypes.length < 1){
                alert('חובה לבחור סוג מתנדבים');
                return false;
            }
            if(!event.locations || event.locations.length < 1 || 
            !(event.locations.every(location => location.city && location.city.length > 0))){
                alert('חובה לציין לפחות עיר לכל מיקום');
                return false;
            }
            return true;
        },
        async handleSubmit(){
            // console.log('submit');
            if(!this.validFormNotifyUser()){
                return;
            }
            this.handleAyncBtn();
            let res;
            if(this.eventKey){
                res = await this.$store.dispatch('updateEvent', { event: this.event, eventKey: this.eventKey });
            } else {
                res = await this.$store.dispatch('createEvent', this.event);
            }
            console.log( res );
            this.$refs.asyncBtn.toggleSpinner(false);
            if(res){
                const resultType = this.eventKey ? 'התעדכן' : 'נוסף';
                alert(`האירוע ${resultType} בהצלחה!`);
                this.$router.push('/events');
            }
        },
        getDateForInput(date){
            if(!date){
                this.event.time.date = new Date();
                return moment().format('YYYY-MM-DD');
            }
            moment.locale('he');
            return moment(date).format('YYYY-MM-DD');
        },
        setEventDate(event){
            this.event.time.date = new Date(event.target.value);
        },
        handleLocationsNum(limit){
            const locations = this.event.locations;
            if(locations.length >= limit){
                if( limit === 3){
                    return;
                }
                this.event.locations = locations.slice(0, limit);
                return;
            }
            const emptyLocation = {
                city: '',
                street: '',
                houseNum: null
            };
            for (let index = locations.length; index < limit; index++) {
                locations.push({...emptyLocation});
            }
            this.event.locations = locations;
        },
        updateLocations(e, property, index){
            this.event.locations[index][property] = e.target.value;
        },
        toggleVehicleOrTags(itemType, itemKey){
            let itemsSet = new Set()
            if(this.event[itemType]){
                itemsSet = new Set(this.event[itemType]);
            }
            if(itemsSet.has(itemKey)){
                itemsSet.delete(itemKey);
            } else {
                itemsSet.add(itemKey);
            }
            this.event[itemType] = [...itemsSet];
            this.$forceUpdate();
        },
        async addTag(){
            this.$refs.addTag.toggleSpinner(true);
            if(this.newTag && this.newTag.length && this.newTag.length > 0){
                await this.$store.dispatch('addTag', this.newTag);
                this.newTag = '';
                this.config = await this.$store.dispatch('fetchConfig');
            }
            this.$refs.addTag.toggleSpinner(false);
        },
        // async deleteTag(tagId){
        //     this.$refs.addTag.toggleSpinner(true);
        //     await this.$store.dispatch('deleteTag', tagId);
        //     this.config = await this.$store.dispatch('fetchConfig');
        //     this.$refs.addTag.toggleSpinner(false);
        // }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

$active-color: #3a7dee;
$margin: 25px;

.edit-event {
  direction: rtl;
  max-height: calc(100vh - 120px);
  overflow: auto;
}

.edit-event-content {
  width: 90%;
  padding-right: 2px;
}

.edit-event-header {
  box-shadow: 0px 1px 3.5px 0 rgba(0, 0, 0, 0.17);
  background-color: #ebebeb;
  // width: 575.5px;
  height: 41px;
  cursor: pointer;
  .link {
    // transition: border-bottom .3s;
    width: 200px;
    height: -webkit-fill-available;
    &.active {
      border-bottom: $active-color 2px solid;
      color: $active-color;
      font-weight: bold;
    }

    &.disabled {
      color: $border-color;
    }
  }
}

.section {
  // box-shadow: 0 0 11px rgba(33,33,33,.4);
  box-shadow: 0px 1px 3.5px 0 rgba(0, 0, 0, 0.17);
  margin: 15.5px 0;
  padding: $margin;
  border-radius: 4px;
}

.margin-top {
  margin-top: $margin;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
}

.radio,
.square {
  margin-left: 4px;
  width: 13.5px;
  height: 13.5px;
  border: 0.5px solid #343434;
  padding: 2px;
}

.square {
  border-radius: 5px;
}

.square .check {
  visibility: hidden;
}

.square.active .check {
  visibility: visible;
  color: $active-color;
  font-size: 13px;
  font-weight: bold;
}

.radio {
  border-radius: 100%;
  .circle {
    transition: background-color 0.3s;
    &.active {
      border-radius: 100%;
      width: 10px;
      height: 10px;
      background-color: $active-color;
    }
  }
}

.option {
  margin-left: $margin;
  cursor: pointer;
}

.min-volunteers {
  margin-left: $margin;
}

.min-volunteers,
.max-volunteers {
  input {
    width: 50px;
  }
}

// .volunteers-numbers, .desc {
//     padding-bottom: $margin;
// }

.title,
.desc {
  margin-top: $margin;
  input {
    width: -webkit-fill-available;
  }
}

.publish-btn {
  background-color: $app-blue;
  color: #fff;
  width: 22vw;
  height: 7vh;
  font-size: 30px;
}

.hour {
  margin-right: $margin;
}

.time,
.duration,
.location-inputs,
.contact {
  margin-top: $margin;
  input {
    margin-right: $margin / 2;
  }
}

.form-group {
  margin-right: $margin;
  &.location-desc {
    margin-top: $margin;
    input {
      width: 50%;
    }
  }

  input.houseNum {
    width: 50px;
  }

  label {
    display: flex;
    align-items: center;
    // width: 20%;
  }
}

.contact {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.hr {
  margin: $margin auto;
  width: 95%;
  // border-bottom: 1px solid black;
  box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.17);
  height: 1px;
}

.vehicles-label,
.tags-label {
  width: 70px;
}

.vehicles,
.tags {
  .vehicles-label,
  .tags-label,
  .vehicle,
  .tag {
    margin: 10px;
    padding: 5px 10px;
  }

  .vehicle,
  .tag {
    border: 0.6px solid black;
    border-radius: 2.5px;
    &.selected {
      background-color: $light-blue;
      border: 0.6px solid $deep-blue;
      color: $deep-blue;
    }
  }
}

input.add-tag-input {
  margin: 10px;
}

.tag {
  position: relative;

  .x {
    position: absolute;
    top: -10px;
    right: -10px;
    border: 0.6px solid black;
    border-radius: 100%;
    color: $app-red;
    font-weight: 600;
    width: 20px;
    height: 20px;
    background-color: #fff;
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/style.scss";
.async-btn.add-tag {
  border: 1px solid $app-blue;
  div {
    color: $app-blue;
    background-color: #fff;
    padding: 5px 0;
  }
}
</style>
