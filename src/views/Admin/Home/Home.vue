<template>
    <div class="admin-home">
        <a-menu
                :style="{width: collapsed? '5vw':'15vw'}"
                class="nav"
                @select="selectMenu"
                :defaultSelectedKeys="defaultSelected"
                :defaultOpenKeys="['dashboard','article']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed"
        >
            <a-sub-menu key="nav-title" class="nav-header" id="nav-header">
                <div slot="title"
                     style="display: flex;justify-content: center;align-items: center;">
                    <icon name="gsbx-Artboard" style="font-size: 50px;"/>
                    <span v-show="!collapsed" style="margin-left: 8px;">
                            GSBX博客
                    </span>
                </div>
            </a-sub-menu>
            <!--eslint-disable-next-line-->
            <a-menu-item v-if="menu.children==null || menu.children.length==0"
                         v-for="menu in menus" :key="menu.key">
                <a-icon v-if="menu.icon != null" :type="menu.icon"/>
                <span>{{menu.title}}</span>
            </a-menu-item>
            <a-sub-menu v-else :key="menu.key">
                <span slot="title">
                    <a-icon v-if="menu.icon != null" :type="menu.icon"/>
                    <span>{{menu.title}}</span>
                </span>
                <a-menu-item v-for="child in menu.children" :key="child.key">
                    <a-icon v-if="child.icon != null" :type="child.icon"/>
                    <span>{{child.title}}</span>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
        <div class="body">
            <div class="main">
                <div class="main-header" style="padding-left: 1.5vw;">
                    <div>
                        <a-button @click="toggleCollapsed">
                            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
                        </a-button>
                    </div>
                    <div class="main-header-right">
                        <span>
                            <a-icon type="github"/>
                        </span>
                        <span>
                            <a-badge dot>
                                <a-icon type="bell" style="margin-left: 8px;"/>
                            </a-badge>
                        </span>
                        <span>
                            <a-avatar src="/gsbx/img/user-head.jpg"/>
                        </span>
                        <span class="username">{{name}}</span>
                    </div>
                </div>
                <div>
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config/defaultSettings'
import Cookie from 'js-cookie'

export default {
  name: 'Home',
  data () {
    return {
      collapsed: false,
      menus: config.adminMenu,
      defaultSelected: ['workbench'],
      name: sessionStorage.getItem('name')
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    selectMenu (item) {
      this.$router.push({
        name: item.key
      })
    }
  },
  created () {
    if (Cookie.get('token') == null || Cookie.get('token') === '') {
      this.$router.push('/admin')
    }
    this.defaultSelected = [this.$route.name]
  }
}
</script>

<style lang="scss">
    $header-height: 50px;
    .admin-home {
        display: flex;
        height: 100%;

        .body {
            width: 100%;
            transition: background 0.3s, width 8s;
        }

        & > div > .ant-menu-dark {
            height: 100%;
        }

        #nav-header .ant-menu-submenu-title {
            padding: 0 !important;
        }

        .nav-header {
            background: rgb(0, 33, 64);
            color: #fff;
            height: $header-height;
            line-height: $header-height;
            display: flex;
            align-items: center;
            justify-content: center;

            .ant-menu-submenu-title {
                height: $header-height;
                line-height: $header-height;

            }

            .ant-menu-submenu-arrow, .ant-menu-inline {
                display: none;
                width: 0;
                height: 0;
            }

        }

        .main {
            .main-header {
                height: $header-height;
                line-height: $header-height;
                box-shadow: 0 5px 4px rgba(0, 21, 41, .08);
                position: relative;
                display: flex;
                justify-content: space-between;

                .main-header-right {
                    font-size: 16px;

                    & > span {
                        margin-left: 16px;
                        cursor: pointer;
                    }

                    .username {
                        margin-left: 8.7px;
                        margin-right: 1.5vw;
                        font-size: 14px;
                        color: rgba(0, 0, 0, .65);
                    }
                }
            }
        }

    }
</style>
