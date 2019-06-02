<template>
    <div class="news-feed">
        <div class="quill-container">
            <div id="toolbar">
                <!-- <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
                <button class="ql-color">color</button>
                <button class="ql-font">font</button>
                <button class="ql-link">link</button>
                <button class="ql-size">size</button>
                <button class="ql-Strikethrough">Strikethrough</button>
                <button class="ql-Underline">Underline</button> -->
            </div>
            <div id="editor"></div>
            <div class="flex">
                <div class="btn send-btn" @click="submitText">
                    פרסם באפליקציה
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from 'quill';
import messagesService from '@/services/messages-service';

export default {
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
        // editor.format('height', '300px');

    },
    methods: {
        async submitText(){
            // console.log({ text: this.editor.getText() });
            const message = {
                publishDate: new Date(),
                content: this.editor.getText(),
                publisher: this.$store.getters.user
            };
            console.log({ message });
            const res = await messagesService.submitMessage(message);
            console.log({ res });
            if(res && res.status === 200){
                alert('ההודעה התווספה בהצלחה.');
                this.$router.push('/events');
                return;
            }
            alert('הייתה בעיה בשירות. אנא נסה שוב מאוחר יותר.');
        },
        formatEditor(editor){
            editor.format('direction', 'rtl');
            editor.format('align', 'right');
            this.editor  = editor;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.quill-container {
    height: 400px;
}

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



