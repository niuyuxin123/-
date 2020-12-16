<template>
  <div class="we-chat-test">
    <div class="we-chat-test__menus">
      <div class="we-chat-test__menu-top">
        <div class="we-chat-test__menu-header">
          <el-avatar
            shape="square"
            :size="34"
            :src="headerSrc"
            @error="errorHandler"
            alt="error"
          ></el-avatar>
        </div>
        <div class="we-chat-test__menu-top-item">
          <ul>
            <li
              v-for="(item, index) in menuListTop"
              :key="item.label"
              @click="changeMenuItem(index,item)"
            >
              <font-awesome-icon
                :icon="item.icon"
                class="icons"
                :class="{ active: activeMenuIndex === index }"
                :label="item.label"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="we-chat-test__menu-bottom">
        <ul>
          <li v-for="(item,index) in menuListBottom" :key="item.label" @click="changeMenuItemBottom(index)">
            <div v-if="isActive === index" :class="{extra:isActive === 0}"></div>
            <font-awesome-icon
                :icon="item.icon"
                class="icons"
                :label="item.label"
              />
          </li>
        </ul>
      </div>
    </div>
    <div class="we-chat-test__lists">
      <router-view name="left" />
    </div>
    <div class="we-chat-test__main">
      <div class="we-chat-test__tops">
        <div class="we-chat-test__top-menu">
          <ul>
            <li
              v-for="item in options"
              :key="item.label"
              :index="item.icon"
              @click="handleSelect(item.label)"
            >
              <font-awesome-icon
                :icon="item.icon"
                class="icons"
                :label="item.label"
              />
            </li>
          </ul>
        </div>
      </div>
      <router-view name="right" />
    </div>
  </div>
</template>

<script>
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  // components:{
  //   "font-awesome-icon":FontAwesomeIcon
  // },
  data() {
    return {
      options: [
        {
          label: "置顶",
          icon: "arrow-up",
        },
        {
          label: "最小化",
          icon: "window-minimize",
        },
        {
          label: "最大化",
          icon: "window-maximize",
        },
        {
          label: "关闭",
          icon: "times",
        },
      ],
      activeMenuIndex: 0,
      isActive: null
    };
  },
  computed: {
    headerSrc() {
      // return require(`@/assets/${this.$store.state.logged.faces}`);
      return require(`@/assets/`+this.$store.state.logged.faces)
    },
    menuListTop() {
      return this.$store.state.menuListTop;
    },
    menuListBottom() {
      return this.$store.state.menuListBottom;
    }
  },
  created() {
    // this.$router.push('/home'+this.$store.state.menuListTop[0].router)
    this.$router.push({name:'comment'})
    // this.$router.push(this.$store.state.menuListTop[0].router)
    console.log(this.$router)
    // console.log("success");
    // console.log(this.$store.state.logged.faces);
  },
  methods: {
    handleSelect(data) {
      if (data === "最大化") {
        this.$electron.ipcRenderer.send("window-max");
        this.options[2] = { label: "还原", icon: "window-restore" };
      }
      if (data === "还原") {
        this.$electron.ipcRenderer.send("window-max");
        this.options[2] = { label: "最大化", icon: "window-maximize" };
      }
      if (data === "最小化") {
        this.$electron.ipcRenderer.send("window-min");
      }
      if (data === "关闭") {
        this.$electron.ipcRenderer.send("window-close");
      }
      if (data === "置顶") {
        this.$electron.ipcRenderer.send("window-on-top");
      }
      // console.log(this.$electron)
    },
    errorHandler() {
      return true;
    },
    changeMenuItem(index,item) {
      this.activeMenuIndex = index;
      if (this.$route.path !== item.router) {
        this.$router.push(item.router)
      }
    },
    changeMenuItemBottom(index) {
      console.log(index)
      console.log(this.isActive)
      if(this.isActive === index) {
        this.isActive = null
      }else {
        this.isActive = index
      }
    }
  },
};
</script>

<style lang="scss">
@import "@/theme/theme-default.scss";
@include b(test) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include e(menus) {
    width: 60px;
    height: 100%;
    background-color: $--color-menu;
    float: left;
    position: relative;
    .icons {
      width: 20px;
      height: 20px;
    }
    @include e(menu-top) {
      text-align: center;
      width: 100%;
      @include e(menu-header) {
        width: 100%;
        height: 60px;
        position: relative;
        .el-avatar {
          position: absolute;
          top: 50%;
          margin: -17px;
          cursor: pointer;
        }
        // line-height: 60px;
      }
      @include e(menu-top-item) {
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            width: 40px;
            height: 40px;
            margin: 10px auto;
            color: $--color-text-min;
            position: relative;
            &:hover {
              color: $--color-list-active;
            }
            .active {
              color: $--color-primary;
            }
          }
        }
        
      }
    }
    @include e(menu-bottom) {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          width: 40px;
          height: 40px;
          margin: 4px auto;
          color: $--color-text-min;
          position: relative;
          &:hover {
            color: $--color-list-active;
          }
          .extra {
            width:368px;
            height: 516px;
            position: absolute;
            bottom: 0;
            left: 50px;
            background-color: $--color-font;
            z-index: 2;
            overflow: auto;
          }
          // .active {
          //   color: $--color-primary;
          // }
        }
      }
    }
  }
  @include e(lists) {
    width: 250px;
    height: 100%;
    background-color: $--color-list;
    float: left;
    position: relative;
  }
  @include e(main) {
    width: calc(100% - 310px);
    height: 100%;
    background-color: $--color-main;
    float: left;
    @include e(tops) {
      width: 100%;
      height: 25px;
      -webkit-app-region: drag;
      @include e(top-menu) {
        width: 120px;
        height: 25px;
        float: right;
        -webkit-app-region: no-drag;
        ul {
          list-style: none;
          float: left;
          padding: 0;
          margin: 0;
        }
        li {
          width: 30px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          float: left;
          color: $--color-text-min;
          &:hover {
            background: $--color-list;
            color: rgba(51, 51, 51, 0.8);
          }
        }
        .icons {
          width: 10px;
          height: 10px;
          // color:#333333
        }
      }
    }
  }
}
// .we-chat-menu{
//   width: 60;
//   height: 100%;
// }
</style>
