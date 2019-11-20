<template>
  <div class="dropdown">
      <div class="options" v-if="isOpen">
        <div @click="$emit('optionSelected', option.value)" class="option" v-for="option of options" :key="option.value">
            {{ option.display }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            required: true
        },
        value: {
            // eslint-disable-next-line vue/require-prop-type-constructor
            type: String | Number,
            default: null
        },
        parentCssSelector: {
            type: String,
            required: true
        }
    },
    watch: {
        isOpen(val){
            if(val){
                this.attachEventListeners();
            }
        }
    },
    methods: {
        detachEventListeners() {
            document
                .querySelector('#app')
                .removeEventListener('click', this.closeIfClickOutside);
        },
        attachEventListeners() {
            document
                .querySelector('#app')
                .addEventListener('click', this.closeIfClickOutside);
        },
        closeIfClickOutside(event) {
            // console.log({ parentSelector: this.parentCssSelector });
            const ancestorHasClass = this.ancestorHasClass(
                this.parentCssSelector,
                event.target
            );
            // console.log('click', ancestorHasClass, event.target);
            if (!ancestorHasClass) {
                this.isDropdownOpen = false;
                this.$emit('close');
                this.detachEventListeners();
            }
        },
        ancestorHasClass(parentCssSelector, child) {
            let node = child.parentNode;
            while (node) {
                if (node.classList && node.classList.contains(parentCssSelector)) {
                return true;
                }
                node = node.parentNode;
            }
            return false;
        }
    }
}
</script>

 <style lang="scss" scoped>
@import '@/assets/scss/style.scss';

    .dropdown {
        position: relative;
        z-index: 1;
    }

    .options {
        position: fixed;
        background-color: #fff;
    }
    
    .option {
        padding: 5px;
        &:not(:last-child){
            border-bottom: 1px solid $border-color;
        }
        &:hover {
            background-color: $app-blue;
        }
    }
 </style>