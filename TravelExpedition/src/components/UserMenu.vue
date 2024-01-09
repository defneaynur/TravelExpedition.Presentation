<template>
    <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
            <v-chip style="margin: 5px" v-bind="props" color="white" variant="outlined" size="small" >
                <v-icon start icon="mdi-account-settings" ></v-icon>
                {{ "userInfo.UserName" }}
            </v-chip>
        </template>
        <v-card>
            <v-card-text>
                <div class="mx-auto text-center">
                    <v-avatar color="white" size="small">
                        <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                    <!-- <h5>{{ userInfo.FullName }}</h5>
                    <p class="text-caption mt-1">
                        {{ userInfo.Email }}
                    </p> -->
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text">
                        Edit Account
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="LogOut()">
                        Logout
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
  

<script>
import auth from "@/api/auth.js"
export default {
    props: {
        userInfo: { type: Object, required: true }
    },
    methods:{
        LogOut(){
            auth.LogOut()
        }
    }

}

</script>
