<template>
  <div class="">
    <div class="form__group">
  <input type="text" class="form__field w-100" placeholder="Input text" />
  <label for="name" class="form__label"> Input text </label>
</div>
  </div>
</template>

<script>
export default {
  name: 'Alien',
  props: {},
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.form__group {
  position: relative;
}

.form__field {
  border: 1px solid silver !important;
  border-radius: 5px;
  box-sizing: border-box;
  color: #313a46;
  height: 40px;
  padding: 0rem 15px;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  top: 10px;
  border-right: none;
  border-left: none;
}

.form__label {
  background-color: white;
  border-left: 1px solid silver;
  border-right: 1px solid silver;
  color: #9b9b9b;
  display: block;
  font-size: 0.9em;
  margin-left: 10px;
  padding: 0 10px;
  pointer-events: none;
  position: absolute;
  top: -10px;
  transition: 0.2s;
}

.form__field:focus {
  border: 1px solid #b9192c !important;
  outline: none;
}

.form__field:focus ~ .form__label {
  background-color: white;
  border-right: 1px solid #b9192c;
  border-left: 1px solid #b9192c;
  color: #b9192c;
  font-size: 0.9em;
  margin-left: 10px;
  padding: 0 10px;
  position: absolute;
  top: -10px;
  transition: 0.2s;
}
</style>
