<template>
  <div class="text-input-root" @click="focusOn">
    <div class="text-input-wrapper">
      <h4 class="text-input-title" :class="{ up: value }">{{ value ? title : (placeholder || title) }}</h4>
      <input
        :id="`text-input-${id}`"
        class="text-input"
        :class="{ 'no-value': !value }"
        :value="value"
        @input="updateInputValue($event)"
        @focus="focusInput"
        @blur="removeFocus"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: [String, Number, null]
    },
    placeholder: {
      type: [String, Number, null]
    },
    title: {
      type: [String, Number, null]
    }
  },
  data () {
    return {
      isFocus: false,
      id: parseInt(Math.random() * 100000, 10)
    }
  },
  methods: {
    updateInputValue (e) {
      const value = e.target && e.target.value
      this.$emit('input', value.trim())
    },
    focusInput () {
      this.$emit('focus')
      this.isFocus = true
    },
    removeFocus () {
      this.$emit('outFocus')
      this.isFocus = false
    },
    focusOn () {
      document.querySelector(`#text-input-${this.id}`).focus()
    }
  }
}
</script>

<style lang="scss">
  .text-input-root {
    width: 100%;
  }
  .text-input-wrapper {
    position: relative;
    transition: all ease-in-out 200ms;
    color: #666666;
    height: 56px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    border: 1px solid rgba(151, 151, 151, 1);
    padding: 0;
    border-radius: 8px;
    box-sizing: border-box;
    &.value {
      padding: 0 0 9px 0;
    }

  }
  .text-input-title {
    z-index: 1;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 16px;
    top: 0;
    left: 0;
    font-size: 20px;
    font-weight: 500;
    transition: all 200ms ease-in;
    color: rgba(151, 151, 151, 1);
    margin: 0;
    &.up {
      font-size: 14px;
      top: 9px;
      height: 18px;
      line-height: 18px;
      color: #000;
    }
  }
  .text-input {
    z-index: 1;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    color: #333;
    padding: 0px 12px 0px 16px;
    transition: all 0.25s linear;
    box-sizing: border-box;
    background-color: transparent;
    outline: none;
    &.no-value {
      height: 100%;
    }
  }
</style>
