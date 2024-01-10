<template>
  <v-navigation-drawer v-model="drawer" width="325">
    <v-list :lines="false" density="compact" nav>
      <!-- <v-list-group v-for="(item, i) in items" :key="i" :value="item">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.text"
            color="teal-darken-1"
            rounded="xl"
          ></v-list-item>
        </template>

        <v-list-item-title
          v-for="itemdetail in item.subItem"
          :key="itemdetail.id"
          :value="itemdetail"
        >
          <template v-if="itemdetail.childItem">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="itemdetail.icon"
                  :to="itemdetail.link"
                  :title="itemdetail.text"
                  color="teal-darken-1"
                  rounded="xl"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="childItem in itemdetail.childItem"
                :key="childItem.id"
                :to="childItem.link"
                :title="childItem.text"
                color="teal-darken-1"
                rounded="xl"
              >
              </v-list-item>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item
              :prepend-icon="itemdetail.icon"
              :to="itemdetail.link"
              :title="itemdetail.text"
              color="teal-darken-1"
              rounded="xl"
            >
            </v-list-item>
          </template>
        </v-list-item-title>
      </v-list-group> -->
      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-train-car"
        title="Travel Expedition"
        :to="travelExpeditionLink"
        color="teal-darken-1"
        rounded="xl"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    travelExpeditionLink: "TravelExpedition",
    CrudPageFirst: "CrudPageFirst",
    CrudPageSecond: "CrudPageSecond",
    items: [
      {
        text: "Report",
        icon: "mdi-text-box-multiple-outline",
        subItem: [
          {
            text: "TravelExpedition",
            icon: "mdi-file",
            link: {
              name: "TravelExpedition",
            },
          }
        ],
      },
    
    ],
  }),
};
</script>
