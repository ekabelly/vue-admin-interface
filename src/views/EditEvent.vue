<template>
    <div class="edit-event" v-if="isData">
        <!-- editing event: {{ eventId ? eventId : 'new event' }} -->
        <div class="edit-event-content">
            <section class="edit-event-header flex">
                <div 
                class="link flex justify-center align-center" 
                :class="{ active: tab === 1 }"
                @click="tab = 1"
                >
                    פרטי האירועי
                </div>
                <div 
                    class="link flex justify-center align-center" 
                    :class="{ active: tab === 2 }"
                    @click="tab = 2"
                >
                    קהל רחב
                </div>
            </section>

            <section class="volunteers-details section">
                <div class="section-title">
                    פרטי מתנדבים
                </div>
                <div class="type-selection section-s flex align-center">
                    <div class="option flex align-center" @click="event.type = 1">
                        <div class="radio flex align-center justify-center">
                            <div class="circle" :class="{ active: event.type === 1 }"></div>
                        </div>
                        מתנדבים רשומים
                    </div>
                    <div class="option flex align-center" @click="event.type = 0">
                        <div class="radio flex align-center justify-center">
                            <div class="circle" :class="{ active: event.type === 0 }"></div>
                        </div>
                        קהל רחב
                    </div>
                </div>
                <div class="type-selection section-s flex align-center">
                    <div class="option flex align-center" @click="toggleVolunteeringType(12)">
                        <div 
                            class="square flex align-center justify-center"
                            :class="{ active: event.volunteersTypes.includes(12) }"
                        >
                            <div class="check">
                                V
                            </div>
                        </div>
                        תומכים
                    </div>
                    <div class="option flex align-center" @click="toggleVolunteeringType(11)">
                        <div 
                            class="square flex align-center justify-center"
                            :class="{ active: event.volunteersTypes.includes(11) }"
                        >
                            <div class="check">
                                V
                            </div>
                        </div>
                        פעילים
                    </div>
                    <div class="option flex align-center" @click="toggleVolunteeringType(13)">
                        <div 
                            class="square flex align-center justify-center"
                            :class="{ active: event.volunteersTypes.includes(13) }"
                        >
                            <div class="check">
                                V
                            </div>
                        </div>
                        פעילים פלוס
                    </div>
                </div>
                <div class="volunteers-numbers section-s flex">
                    <div class="min-volunteers">
                        מספר מתנדבים מינימלי
                        <input :min="0" :max="event.volunteers.max" v-model="event.volunteers.min" type="number">
                    </div>
                    <div class="max-volunteers">
                        מספר מתנדבים מקסימלי
                        <input v-model="event.volunteers.max" type="number">
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="section-title">
                    תיאור ההתנדבות
                </div>
                <div class="title">
                    <label for="title">כותרת התנדבות (עד 50 תווים)</label>
                    <input id="title" maxlength="50" v-model="event.title"  type="text">
                </div>
                <div class="desc">
                    <label for="desc">תיאור התנדבות (עד 50 תווים)</label>
                    <input id="desc" maxlength="50" v-model="event.desc" type="text">
                </div>
            </section>
            <section class="flex flex-end">
                <div @click="handleSubmit" class="publish-btn flex justify-center align-center pointer">
                    פרסם באפליקציה
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editEvent',
    data(){
        return {
            isData: false,
            config: null,
            eventId: null,
            tab: 1,
            event: {
                type: 1,
                volunteersTypes: [],
                volunteers: {
                    min: 0,
                    max: null
                }
            }
        }
    },
    watch: {
        $route(){
            this.setComponenetData();
        }
    },
    mounted(){
        this.setComponenetData();
    },
    methods: {
        async setComponenetData(){
            this.eventId = this.$route.params.id;
            let event;
            if(this.eventId){
                event = this.$store.dispatch('fetchEvent', this.eventId);
            }
            const config = this.$store.dispatch('fetchConfig');
            const data = await Promise.all([config, event]);
            this.config = data[0];
            this.event = data[1] || this.event;
            this.isData = true;
            console.log({ config: this.config, event: this.event });
        },
        toggleVolunteeringType(type){
            if(this.event.volunteersTypes.includes(type)){
                this.event.volunteersTypes = this.event.volunteersTypes.filter(val => val !== type);
            } else {
                this.event.volunteersTypes.push(type);
            }
        },
        handleSubmit(){
            console.log('submit');
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

    $active-color: #3a7dee;
    $margin: 25px;

    .edit-event {
        direction: rtl;
    }

    .edit-event-content {
        width: 70%;
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
        }
    }

    .section {
        // box-shadow: 0 0 11px rgba(33,33,33,.4);
        box-shadow: 0px 1px 3.5px 0 rgba(0, 0, 0, 0.17);
        margin: 15.5px 0;
        padding: 0 22.5px;
        border-radius: 4px;
    }

    .section-s {
        margin-top: $margin;
    }

    .section-title {
        padding-top: 19.5px;
        font-size: 18px;
        font-weight: bold;
    }

    .type-selection {
        .radio, .square {
            margin-left: 4px;
            width: 13.5px;
            height: 13.5px;
            border: .5px solid #343434;
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
                transition: background-color .3s;
                &.active {
                    border-radius: 100%;
                    width: 10px;
                    height: 10px;
                    background-color: $active-color;
                }
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

    .min-volunteers, .max-volunteers {
        input {
            width: 50px;
        }
    }

    .volunteers-numbers, .desc {
        padding-bottom: $margin;
    }

    .title, .desc {
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
</style>
