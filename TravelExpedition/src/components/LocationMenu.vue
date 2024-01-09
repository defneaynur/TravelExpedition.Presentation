<template>
    <v-menu class="ma-2">
        <template v-slot:activator="{ props: menu }">
            <v-chip class="ma-2" color="white" variant="outlined" v-bind="mergeProps(menu)">
                <v-icon start icon="mdi-map-marker-check"></v-icon>
                <b>{{ locationInfo[complexIndex == "" ? selectedLocationIndex : complexIndex].name }}</b>
            </v-chip>
        </template>
        <v-list-item v-for="(item, index) in locationInfo" :key="index" @click="selectItem(item)" style="background-color: white;" >
            <v-list-item-title  class="text-subtitle-2">{{ item.name }}</v-list-item-title>
        </v-list-item>

    </v-menu>
</template>
  

<script>
import { mergeProps } from 'vue'

export default {
    data: () => ({
        complexIndex: "",
    }),
    methods: {
        mergeProps,
        selectItem(selectedItem) {
            console.log(selectedItem)
            localStorage.setItem("complex", JSON.stringify(selectedItem)); //for Header
            this.complexIndex = this.locationInfo.findIndex(element => element.id === selectedItem.id) //for selected complex
            localStorage.setItem("complexIndex", this.complexIndex)
            location.reload(true)
        },
    },
    props: {
        locationInfo: { type: Array, required: true },
        selectedLocationIndex: { type: Number, required: true },
    },
    mounted() {
        this.complexIndex = localStorage.getItem("complexIndex")   
    },

}

</script>

<codepen-additional>
const { mergeProps } = Vue
</codepen-additional>