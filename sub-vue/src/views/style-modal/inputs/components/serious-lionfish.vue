<template>
  <div class="">
    <input type="text" name="text" class="input" placeholder="Write a message" />
  </div>
</template>

<script>
export default {
  name: 'serious-lionfish',
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
.input {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 0.8vw;
  color: #fff;
  background-color: rgb(28, 28, 30);
  box-shadow: 0 0 0.4vw rgba(0, 0, 0, 0.5), 0 0 0 0.15vw transparent;
  border-radius: 0.4vw;
  border: none;
  outline: none;
  padding: 0.4vw;
  max-width: 190px;
  transition: 0.4s;
}

.input:hover {
  box-shadow: 0 0 0 0.15vw rgba(135, 207, 235, 0.186);
}

.input:focus {
  box-shadow: 0 0 0 0.15vw skyblue;
}
</style>
