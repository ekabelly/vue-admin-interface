<template>
    <div class="new-feed">
        <div class="quill-container">
            <div id="toolbar"></div>
            <div id="editor"></div>
            <div class="flex">
                <div class="btn send-btn" @click="submitText">
                    {{ $route.params.messageKey ? 'עדכן' : 'פרסם' }} באפליקציה
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from 'quill';
import messagesService from '@/services/messages-service';

export default {
    name: 'New-Feed',
    data(){
        return {
            editor: null
        }
    },
    mounted(){
        const toolbar = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            // ['blockquote', 'code-block'],

            // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],
            [{ 'align': [] }],

            // ['clean']                                         // remove formatting button
        ];
        const editor = new Quill('#editor', {
            modules: { toolbar },
            theme: 'snow'
        });
        this.formatEditor(editor);
        this.setData();
        // editor.format('height', '300px');

    },
    watch: {
        $route(){
            this.setData();
        }
    },
    methods: {
        async setData(){
            if(this.$route.params.messageKey){
                const message = await this.$store.dispatch('fetchMessage', this.$route.params.messageKey);
                document.querySelector('.ql-editor').innerHTML = message.content;
                this.setEditorDirection();
                return;
            }
            this.editor.setText('');
        },
        async submitText(){
            const message = {
                publishDate: new Date(),
                content: document.querySelector('.ql-editor').innerHTML,
                publisher: this.$store.getters.user
            };
            let res;
            const { messageKey } = this.$route.params;
            if(messageKey){
                res = await this.$store.dispatch('updateMessage', { message, messageKey })
            } else {
                res = await this.$store.dispatch('submitMessage', message);
            }
            if(res){
                alert('ההודעה התווספה בהצלחה.');
                this.$router.push('/news-feed');
                return;
            }
        },
        formatEditor(editor){
            editor.format('direction', 'rtl');
            editor.format('align', 'right');
            this.editor  = editor;
        },
        setEditorDirection(){
            for(const child of document.querySelector('.ql-editor').children){
                child.classList.add('ql-direction-rtl');
                child.classList.add('ql-align-right');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.quill-container {
    height: 400px;
}

// .quill-container .ql-editor {
//     text-align: right;
//     direction: rtl;
// }

// .ql-toolbar {
//     direction: ltr;
// }

.send-btn {
    background-color: $app-blue;
    color: #fff;
    padding: 11px 75px;
    margin-top: 18.5px;
    // width: 271.5px;
}
</style>

<style scoped>
@import '../assets/scss/quill.css';
</style>



