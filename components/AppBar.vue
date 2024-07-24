<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    color="primary"
    :rail="rail"
    @click="rail = false"
  >
    <v-list>
      <v-list-item
        class="py-4 text-white"
        prepend-avatar="/favicon.ico"
        title="mukilam"
        subtitle="mukil@gmail.com"
      >
        <template v-slot:append>
          <v-btn
            class="text-white"
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        class="text-white"
        v-for="(item, i) in drawerItems"
        :key="i"
        :value="item"
        :to="item.route"
        rounded="xl"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
      <v-divider> </v-divider>
      <v-list-item class="text-white" prepend-icon="mdi-logout"
        ><v-list-item-title>Signout</v-list-item-title></v-list-item
      >
    </v-list>
  </v-navigation-drawer>

  <v-app-bar class="d-flex justify-center" color="white">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="text-accent"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <v-img width="60" rounded="0"></v-img>
    </v-app-bar-title>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" color="accent">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <v-list><v-list-item>No Notifications</v-list-item></v-list>
    </v-menu>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" color="accent">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-card min-width="300">
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar size="80"></v-avatar>

            <h3 class="mt-3">Hi, !</h3>
            <p class="text-caption mt-1"></p>
            <v-divider class="my-3"></v-divider>
            <v-row
              ><v-col cols="6">
                <v-btn
                  variant="text"
                  rounded
                  class="text-capitalize"
                  prepend-icon="mdi-account-outline"
                  to="/profile"
                >
                  My Profile
                </v-btn></v-col
              ><v-col cols="6"
                ><v-btn
                  class="text-capitalize"
                  color="red"
                  prepend-icon="mdi-logout"
                  variant="text"
                  rounded
                >
                  Signout
                </v-btn></v-col
              ></v-row
            >
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>
<script setup>
import { ref, onMounted } from "vue";

const drawer = ref(null);
const rail = ref(false);

const drawerItems = ref([
  {
    title: "Dashboard",
    route: "/",
    icon: "mdi-view-dashboard-outline",
  },
  {
    title: "Students",
    route: "/students",
    icon: "mdi-account-outline",
  },
  {
    title: "Schools",
    route: "/schools",
    icon: "mdi-school-outline",
  },
]);

onMounted(() => {});
</script>
