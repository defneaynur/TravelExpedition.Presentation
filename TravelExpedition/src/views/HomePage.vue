<template>
    <v-container v-if="isAuthorized" fluid>

        <v-app-bar density="compact" app color="#d23b38" dark :style="{ zIndex: 1 }">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" fixed> </v-app-bar-nav-icon>
            <v-toolbar-title style="width: 170px" class="hidden-sm-and-down ml-0 pl-4">
                <span @click="gohompage" style="cursor: pointer">Travel X</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <UserMenu :userInfo=user></UserMenu>
            <!-- <LocationMenu :locationInfo="locations" :selectedLocationIndex="selectedComplexIndex"></LocationMenu> -->
        </v-app-bar>

        <NavBar v-if="drawer" :style="{ zIndex: 1 }"></NavBar>

        <v-main>
            <v-container>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component"></component>
                    </keep-alive>
                </router-view>
            </v-container>
        </v-main>

    </v-container>

    <v-footer v-if="isAuthorized" app color="#d23b38" :style="{ zIndex: 1 }">
        <v-chip outlined size="x-small" color="white">
            @ Obilet 2023
        </v-chip>
    </v-footer>


    <LoginPage v-if="!this.isAuthorized" @login="onLogin"></LoginPage>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import router from '../router'
import LoginPage from './LoginPage.vue'
import UserMenu from '../components/UserMenu.vue'
import LocationMenu from '../components/LocationMenu.vue'
import NavBar from '../components/NavBar.vue'
import auth from "@/api/auth";
export default {
    components: {
        LoginPage,
        UserMenu,
        LocationMenu,
        NavBar
    },
    data: () => ({
        drawer: true,
        group: null,
        selectedItem: 0,
        isAuthorized: false,
        user: null,
        locations: [
            { name: 'GEMLIK', id: 101 },
            { name: 'GEBZE', id: 201 },
            { name: 'OSLO', id: 301 },
            { name: 'LISCONT', id: 401 },
            { name: 'LEIXOES', id: 404 },
            { name: 'STOCKHOLM', id: 501 },
            { name: 'GAVLE', id: 601 },
            { name: 'FERROL', id: 701 },
            { name: 'HUELVA', id: 801 },
            { name: 'SETUBAL', id: 901 },
            { name: 'PUERTO BOLIVAR', id: 1002 },
            { name: 'TARANTO', id: 1006 },
            { name: 'GEBZE ETİ', id: 1010 },
            { name: 'GEMLİK ETİ', id: 1020 },
            { name: 'GEMLİK RORO', id: 103 },
        ],
        selectedComplexIndex: localStorage.getItem('complexIndex')
    }),
    watch: {
        group() {
            this.drawer = false
        },
        islogin(val) {
            this.isAuthorized = val;
        },
    },
    computed: {
        islogin() {
            return auth.getToken();
        },
    },
    methods: {
        gohompage,
        onLogin() {
            this.isAuthorized = true;
        },
    },

    mounted() {
        const logBool = auth.getToken()
        if (logBool) {
            this.isAuthorized = true;
        }
        else {
            this.isAuthorized = false;
            this.$router.push({ name: "HomePage" })
        }
    },
    beforeUpdate() {
        this.user = auth.getUser();
    }
}

function gohompage() {
    router.push({
        path: "/home",
    });
}
</script>


