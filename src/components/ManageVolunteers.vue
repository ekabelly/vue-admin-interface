<template>
  <div class="manage-volunteers">
      <section class="section">
          <div class="section-title">
              צוות
          </div>
          <div class="staff-table">
              <div v-for="volunteer of assignedVolunteers" :key="volunteer.user_id" class="flex space-between staff-member">
                <div class="user-name">
                  {{ `${volunteer.user_name} ${volunteer.user_last_name}` }}
                </div>
                <div @click="toggleDropDown(volunteer.user_id)" class="assign" :class="{[`dropdown-${volunteer.user_id}`]: true}">
                    <div class="flex align-center space-between">
                        <div>
                            צוות
                        </div>
                        <img src="@/assets/img/arrow-down.png" alt="">
                    </div>
                    <div class="dropdown">
                        <Dropdown 
                            @optionSelected="handleDropdownClick($event, volunteer.user_id)"
                            @close="handleDropdownClick(null, null)"
                            :isOpen="isDropdownOpen === volunteer.user_id" 
                            value="standBy" 
                            :options="dropdownOptions"
                            :parent-css-selector="`dropdown-${volunteer.user_id}`"
                        />
                    </div>
                </div>
                <div class="phone">
                    {{ volunteer.phone }}
                </div>
                <div class="email">
                    {{ volunteer.email }}
                </div>
              </div>
          </div>
      </section>
      <!-- <section class="section">
          <div class="section-title">
              צוות
          </div>
          <div class="staff-table">
              <div v-for="volunteer of backupVolunteers" :key="volunteer.user_id" class="flex space-between staff-member">
                <div class="user-name">
                  {{ `${volunteer.user_name} ${volunteer.user_last_name}` }}
                </div>
                <div @click="toggleDropDown(volunteer.user_id)" class="assign flex align-center space-around">
                    <div>
                        סטנד ביי
                        <Dropdown 
                            @optionSelected="handleDropdownClick($event, volunteer.user_id)" 
                            :isOpen="isDropdownOpen === volunteer.user_id" 
                            value="standBy" 
                            :options="dropdownOptions" 
                        />
                    </div>
                    <img src="@/assets/img/arrow-down.png" alt="">
                </div>
                <div class="phone">
                    {{ volunteer.phone }}
                </div>
                <div class="email">
                    {{ volunteer.email }}
                </div>
              </div>
          </div>
      </section> -->

      
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';

export default {
    name: 'ManageVolunteers',
    components: {
        Dropdown
    },
    props: {
        event: {
            type: Object,
            required: true
        },
        backupVolunteers: {
            type: Array,
            required: true
        },
        assignedVolunteers: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            isDropdownOpen: null,
            dropdownOptions: [{ value:'assigned', display:'צוות' },{ value:'backup', display:'סטנד בי' }, {value:'remove', display:'הסר מההתנדבות'}]
        }
    },
    methods: {
        toggleDropDown(volunteerId){
            this.isDropdownOpen = volunteerId;
        },
        handleDropdownClick(selectedValue, volunteerId){
            console.log({ selectedValue, volunteerId });
            this.isDropdownOpen = null;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

    $margin: 25px;

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

    .assign {
        width: 10%;
        img {
            width: 0.8vw;
        }
    }

    .user-name {
        width: 25%;
    }

    .phone, .email {
        width: 20%;
    }

    .staff-member {
        padding: 13px 0;
        &:not(:last-child){
            border-bottom: 1px solid $border-color;
        }
    }
</style>