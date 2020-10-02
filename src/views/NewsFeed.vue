<template>
    <div class="news-feed">
        <div class="table-head flex space-evenly">
            <div class="table-title message-table-cell">
                מחיקה
            </div>
            <div class="table-title message-table-cell">
                מפרסם
            </div>
            <div class="table-title message-table-cell pointer"  @click="sortByDate(filteredMessagewsArr, dateSortDir)">
                תאריך
            </div>
            <div class="table-title message-table-cell message-name">
                הודעה
            </div>
        </div>
        <div class="table-body" v-if="isData">
            <div class="message-table-row flex" v-for="message of filteredMessagewsArr" :key="message.key" @click="editFeed($event, message.key)">
                <div class="message-table-cell delete-cell">
                    <button 
                    v-if="loadingBtnKey !== message.key"
                    class="btn delete-btn" 
                    @click="deleteMessage(message.key)"
                    >
                        מחיקה
                    </button>
                    <span v-else> טוען... </span>
                </div>
                <div class="message-table-cell">
                    {{ message.publisherDisplayName }} <br>
                    {{ message.publisherEmail }}
                </div>
                <div class="message-table-cell">
                    {{ parseDate(message.publishDate) }}
                </div>
                <div class="message-table-cell message-name" v-html="message.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data(){
        return {
            messagesObj: {},
            messagesArr: [],
            filteredMessagewsArr: [],
            isData: false,
            dateSortDir: false,
            loadingBtnKey: null
        }
    },
    created(){
        this.fetchInitialData();
    },
    methods: {
        async fetchInitialData(){
            let res = await this.$store.dispatch('fetchMessages');
            if(res){
                if('data' in res && res.data === null) {
                    res = {};
                }
                this.loadingBtnKey = null;
                this.messagesObj = res;
                // transform the obj to arr, add to every itiration its key and sort if by date.
                this.messagesArr = this.sortByDate(Object.keys(res).map(messagesKey => 
                    ({...res[messagesKey], key: messagesKey})));
                this.filteredMessagewsArr = [...this.messagesArr];
                this.isData = true;
            }
        },
        sortByDate(messagesArr){
            console.log('sort');
            
            if(this.sortDir){
                this.sortDir = false;
                return messagesArr.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
            }
            this.sortDir = true;
            return messagesArr.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        },
        parseDate(date){
            moment.locale('he');
            return moment(date).format('DD.MM.YYYY');
        },
        search(text){
            if(!text || text === ''){
                this.filteredMessagewsArr = [...this.messagesArr];
                return;
            }
            this.filteredMessagewsArr = this.filteredMessagewsArr.filter(message =>
                message.content.includes(text));
        },
        editFeed(event, messageKey){
            if(event && event.target && !event.target.parentElement ||
            (event.target.parentElement.classList.contains('delete-cell') ||
            event.target.classList.contains('delete-cell'))){
                return;
            } else {
                this.$router.push(`/edit-feed/${messageKey}`);
            }
        },
        async deleteMessage(messageKey){
            this.loadingBtnKey = messageKey;
            const isUserSure = confirm('למחוק הודעה?');
            if(isUserSure) {
                const res = await this.$store.dispatch('deleteMessage', messageKey);
                if(res){
                    this.fetchInitialData();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
$table-mragin: 20px;

    .messages-table {
        font-size: $text-font-size;
        @media (max-width: 768px){
            font-size: 16px;
        }
    }

    .table-body {
        max-height: calc(100vh - 210px);
        
        @media (max-width: 768px){
            max-height: calc(100vh - 272px);
        }
        overflow: auto;
    }

    .table-head {
        background-color:#eeeeee;
        padding: 10px 0;
        padding-right: 4px + $table-mragin; // scroll size 4px + table items margin 20px
        padding-left: $table-mragin;
    }

    .table-title {
        border-left: 1px solid $border-color;
    }

    .message-table-cell {
        direction: rtl;
        text-align: right;
        width: -webkit-fill-available;
        padding: 5px 15px;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
            width: 20px;
            margin-left: 10px;
        }

        &.message-name {
            word-break: break-all;
        }
        &.message-status {
            border-radius: 5px 0 0 5px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            // background-color: yellow;
            // &.empty {
            // background-color: red;
            // }
            // &.full {
            // background-color: green;
            // }
        }
    }
    
    .message-table-row {
        cursor: pointer;
        margin: 10px $table-mragin;
        border-radius: 5px;
        background-color: #f8f8f8;
        transition: box-shadow .3s;

        &:hover {
            // box-shadow: 0 0 11px rgba(33,33,33,.4);
            box-shadow: 0px 0 7px 0 rgba(0, 0, 0, 0.17); 
        }
    }

    .delete-btn {
        color: red;
        border-color: red;
    }
</style>

