<template>
  <div class="wrapper flex items-center flex-col">
    <textarea
      class=""
      @focus="handleTextArea"
      v-model="text[0]"
      @click="handleStringIndex"
      @focusout="handleFocusOut"
      @keydown="handlePhysicalKeyboard"
      @closeKeyboard="closeKeyboard"
    ></textarea>
    <Keyboard
      v-if="focused"
      @keyClick="handleKeyClick"
      :keyPressed="keyPressed"
      @closeKeyboard="handleCloseKeyboard"
    />
  </div>
</template>

<script>
import Keyboard from "./components/VirtualKeyboard.vue";

export default {
  data() {
    return {
      focused: false,
      text: ["", ""],
      selectionIndex: null,
      keyPressed: "",
    };
  },
  components: {
    Keyboard,
  },
  methods: {
    handleCloseKeyboard() {
      this.focused = false;
    },
    handleTextArea() {
      this.focused = true;
    },
    handlePhysicalKeyboard(e) {
      const keyPressed = e.key.toLowerCase();

      this.keyPressed = keyPressed;
      this.handleKeyStyle(keyPressed);
      this.$store.commit("keyboard/set_key_pressed", keyPressed);
    },
    handleKeyClick(key) {
      if (key.toLowerCase() === "backspace") {
        this.handleDelete();
      } else {
        this.text[1] = key;
        this.text[0] = this.text[0].concat(this.text[1]);
        this.selectionIndex = this.text[0].length;
      }
    },
    handleDelete() {
      const currentText = this.text[0];
      const index = this.selectionIndex
        ? this.selectionIndex
        : this.text[0].length;

      const finalString =
        currentText.substring(0, index - 1) +
        currentText.substring(index, currentText.length);
      // this.text[0] = this.text[0].substring(0, index - 1);
      this.text[0] = finalString;
      this.selectionIndex = index - 1 || this.text[0].length;
    },
    handleStringIndex(e) {
      this.selectionIndex = e.target.selectionStart;
    },
    handleFocusOut() {
      this.selectionIndex = this.text[0].length;
    },
    handleKeyStyle(key) {
      this.keyPressed = key;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #3f0071;
}
textarea {
  width: 500px;
  height: 200px;
  margin-top: 32px;
  border-radius: 6px;
  resize: none;
  padding: 5px;
  &:focus {
    outline: solid 5px #610094;
  }
}
</style>
