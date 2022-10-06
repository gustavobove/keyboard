<template>
  <div class="keyboard">
    <div class="close" @click="$emit('closeKeyboard')">
      <img src="../assets/images/svgs/close-symbol.svg" alt="close symbol" />
    </div>
    <div class="line flex">
      <div
        class="key"
        v-for="(key, index) in numbers"
        :key="index"
        :class="key === 'backspace' ? 'backspace-key' : ''"
        @click="handleKeyClick(key)"
        :id="`key-${getKey(key)}`"
      >
        {{ key }}
      </div>
    </div>
    <div class="line flex">
      <div
        class="key"
        v-for="(key, index) in letters1"
        :key="index"
        :class="key === 'backspace' ? 'backspace-key' : ''"
        @click="handleKeyClick(key)"
        :id="`key-${getKey(key)}`"
      >
        <span v-if="key.toLocaleLowerCase() !== 'backspace'">{{ key }}</span>
        <img v-else src="../assets/images/svgs/backspace-key.svg" alt="" />
      </div>
    </div>
    <div class="line flex">
      <div
        class="key"
        v-for="(key, index) in letters2"
        :key="index"
        :class="key === 'backspace' ? 'backspace-key' : ''"
        @click="handleKeyClick(key)"
        :id="`key-${getKey(key)}`"
      >
        <span v-if="key.toLocaleLowerCase() !== 'enter'"> {{ key }}</span>
        <img v-else src="../assets/images/svgs/enter-key.svg" />
      </div>
    </div>
    <div class="line flex">
      <div
        class="key"
        v-for="(key, index) in letters3"
        :key="index"
        :class="key === 'backspace' ? 'backspace-key' : ''"
        @click="handleKeyClick(key)"
        :id="`key-${getKey(key)}`"
      >
        <span v-if="key.toLocaleLowerCase() !== 'shift'">{{ key }}</span>
        <img
          v-else-if="key.toLowerCase() === 'shift' && !shiftActive"
          src="../assets/images/svgs/shift-key.svg"
          alt=""
        />
        <img v-else src="../assets/images/svgs/shift-key-active.svg" alt="" />
      </div>
    </div>
    <div class="key space-key" id="key-space" @click="handleKeyClick('space')">
      <span>
        <img src="../assets/images/svgs/space-key.svg" alt="space key icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyPressed: {
      required: false,
      default: "",
    },
  },
  emits: ["keyClick"],
  data() {
    return {
      shiftActive: false,
      numbers: ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      defaultNumbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      symbols: ["!", "@", "#", "$", "%", "¨", "&", "*", "(", ")"],
      letters1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace"],
      letters2: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "p", "enter"],
      letters3: ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", ";"],
    };
  },
  computed: {
    returnKeyPressed() {
      return this.$store.state.keyboard.keyPressed;
    },
  },
  watch: {
    returnKeyPressed(value) {
      if (value === "shift") {
        this.handleKeyClick(value);
      }
      this.handleKeyStyle();
    },
  },
  methods: {
    getKey(key) {
      switch (key) {
        case "!":
          return "exclamation-mark";
        case "@":
          return "sign";
        case "#":
          return "hashtag";
        case "$":
          return "dolar-sign";
        case "%":
          return "percentage";
        case "¨":
          return "tremble";
        case "&":
          return "and";
        case "*":
          return "asterisk";
        case "(":
          return "left-parentheses";
        case ")":
          return "parentheses";
        case "-":
          return "dash";
        case ",":
          return "coma";
        case ".":
          return "dot";
        case ";":
          return "semi-colon";

        default:
          return key;
      }
    },
    handleKeyClick(key) {
      switch (key.toLocaleLowerCase()) {
        case "space":
          this.$emit("keyClick", " ");
          break;
        case "enter":
          this.$emit("keyClick", "\n");
          break;
        case "backspace":
          this.$emit("keyClick", "backspace");
          break;
        case "shift":
          this.shiftActive = !this.shiftActive;

          if (this.shiftActive) {
            this.letters1 = this.letters1.map((item) => item.toUpperCase());
            this.letters2 = this.letters2.map((item) => item.toUpperCase());
            this.letters3 = this.letters3.map((item) => item.toUpperCase());
            this.numbers = this.symbols;
          } else {
            this.letters1 = this.letters1.map((item) =>
              item.toLocaleLowerCase()
            );
            this.letters2 = this.letters2.map((item) =>
              item.toLocaleLowerCase()
            );
            this.letters3 = this.letters3.map((item) =>
              item.toLocaleLowerCase()
            );
            this.numbers = this.defaultNumbers;
          }
          break;
        default:
          this.$emit("keyClick", key);
          break;
      }
    },
    handleKeyStyle() {
      const keyPressed = this.keyPressed;

      const key = document.querySelector(`#key-${this.getKey(keyPressed)}`);
      if (key) {
        key?.classList.add("key-pressed");
        setTimeout(() => {
          key.classList.remove("key-pressed");
        }, 200);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.keyboard {
  width: 660px;
  height: auto;
  padding: 10px 5px;
  background-color: #fff;
  margin-top: 64px;
  border-radius: 6px;
  animation: show 0.2s ease-in-out forwards;
}

.line {
  margin: 10px 0px;
}
.key {
  width: 60px;
  height: 40px;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.55);
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    background: #150050;
    color: #fff;
  }
}
.backspace-key {
  width: 81px;
}

.space-key {
  width: 400px;
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
}
.key-pressed {
  background-color: #150050 !important;
  color: #fff !important;
}

@keyframes show {
  from {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

.close {
  position: absolute;
  left: 0%;
  right: 0;
  margin: auto;
  top: 100%;
  width: 40px;
  height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    animation: move 1s ease-in-out infinite alternate;
  }
}

@keyframes move {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(5px);
  }
}
</style>
