<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 134px);
  width: 100%;
  position: relative;
  overflow: auto;
  background: #f0f2f5;
  padding: 10px;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #fff;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // background-color: #ccc;
    background: #dddddd;
  }

  &::-webkit-scrollbar-button {
    background: #fff;
    height: 0;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 134px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
:root {
  --background: #fff;
  --foreground: #000;
  --primary: #1b2947;
  --blue: #0071e2;
  --blue-hover: #016dd9;
  --red: #ff5858;
  --green: #06ad0c;
  --darkred: #ff0707;
  --black: #000;
  --gold: #e7d000;
  --lightgray: #e8e8e8;
  --offwhite: #f2f2f2;
  --grey: #9c9c9c;
  --blue-grey-1: #9fa3af;
  --blue-grey-2: #bbbec9be;
  --secondary-grey-dark: #292929;
  --secondary-grey-light: #dcdcdc;
  --maindark: #171717;
  --dark: #191825;
  --light: #eff5f5;
  --semidark: #181818;
  --starbg: radial-gradient(220% 105% at top center,#1b2947 10%,#75517d 40%,#e96f92 65%,#f7f7b6);
  --code_bg: #1b2947;
  --comment: #6272a4;
  --code_fore: #f8f8f2;
  --selection: #44475a;
  --cyan: #8be9fd;
  --green: #bd93f9;
  --orange: #ffb86c;
  --pink: #ff79c6;
  --purple: #bd93f9;
  --red: #f55;
  --yellow: #f1fa8c;
  --white: #fff;
  --bgV2: #1b294740;
  --animate-duration: 800ms;
}
</style>
