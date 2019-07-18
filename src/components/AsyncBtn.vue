<template>
  <div :style="{ width, height }" class="async-btn flex justify-center align-center">
    <div
      v-if="!spinner"
      class="big-btn"
      :style="{ 'font-size': fontSize, height, width }"
      :class="{ inactive, shadow }"
      @click="$emit('btn-clicked')"
    >
      {{ label }}
    </div>
    <div
      v-if="spinner"
      class="medium-spinner"
    />
  </div>
</template>

<script>
export default {
  name: 'AsyncBtn',
  props: {
    label: {
      type: String,
      default: 'אישור'
    },
    shadow: {
      type: Boolean,
      default: false
    },
    inactive: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '84.5px'
    },
    height: {
        type: String,
        default: '65px'
    },
    fontSize: {
        type: String,
        default: '30px'
    }
  },
  data() {
    return {
      spinner: false
    };
  },
  methods: {
    toggleSpinner(flag) {
      // flag: Boolean
      this.spinner = flag;
    }
  }
};
</script>
