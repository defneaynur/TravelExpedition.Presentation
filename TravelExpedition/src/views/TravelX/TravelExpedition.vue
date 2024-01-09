<template>
  <v-container>
    <v-card>
      <v-toolbar density="compact" color="white">
        <ToolbarChip :getTitle="pageName"></ToolbarChip>
      </v-toolbar>
    </v-card>
  </v-container>

  <v-container align="center" justify="center" style="height: 50%;" v-if="busLocationsPanelBool">
    <v-card style="max-width: 40%;">
      <v-card-title class="headline"></v-card-title>
      <v-card-text>
        <v-form @submit.prevent="GetBusJourneys">
          <v-row>
            <v-col>
              <v-combobox label="Kalkış Noktası" class="mt-1" v-model="originData" :items="originDataItems"
                item-title="name" item-value="id" variant="outlined" @input="GetBusLocations('origin')"
                :rules="[checkDuplicateLocations]"></v-combobox>
            </v-col>
          </v-row>

          <div class="d-flex justify-center align-center">
            <v-btn icon @click="swapLocations" aria-label="Kalkış ve Varış Şehirlerini Değiştir"
              style="background-color: #1f9b78; color: white; font-size: x-large;">
              <v-icon>mdi-swap-vertical</v-icon>
            </v-btn>
          </div>
          <v-row>
            <v-col>
              <v-combobox label="Varış Noktası" class="mt-1" v-model="destinationData" :items="destinationDataItems"
                item-title="name" item-value="id" variant="outlined" @input="GetBusLocations('destination')"
                :rules="[checkDuplicateLocations]"></v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <DxDateBox style="height: 60px; width: 100%; font-size: larger;" label="Start Date" label-mode="floating"
                :hoverStateEnabled="false" stylingMode="outlined" type="date" v-model="travelDate"
                displayFormat="dd/MM/yyyy">
                <DxValidator>
                  <DxCustomRule :validation-callback="dateRuleCallback" message="Bugünden eski bir tarih seçemezsiniz" />
                </DxValidator>
              </DxDateBox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="setToday" outlined :style="styleToday">Bugün</v-btn>
              <v-btn @click="setTomorrow" outlined :style="styleTomorrow">Yarın</v-btn>
              <!-- <v-btn @click="setToday" outlined >Bugün</v-btn>
              <v-btn @click="setTomorrow" outlined >Yarın</v-btn> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" color="#1f9b78" style="color: white; height: 60px; width: 100%;" stylingMode="outlined"
                :disabled="isSearchDisabled">Sefer Ara</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

  <v-container align="center" justify="center" v-if="busJourneysPanelBool">
    <v-card style="max-width: 40%;text-align: left;">
      <v-card-title class="headline">
        <v-btn icon @click="goBackBusLocations" style="background-color: #1f9b78;color: white;">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-row style="text-align: center;">
          <v-col>
            {{ this.originData.name }} - {{ this.destinationData.name }}<br>
            {{ getDate() }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-if="busJourneys.length > 0">
            <v-list-item v-for="journey in busJourneys" :key="journey.id" style="border: #1f9b78;">
              <v-list-item-content style="min-height: 100px;"> <!-- İstenilen minimum yükseklik değeri -->
                <v-list-item-title style="text-align: right;">
                  <v-btn style="background-color: red;color: white;">
                    {{ journey.journey.internetprice }} {{ journey.journey.currency }}
                  </v-btn>
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: medium; font-weight: bold; ">Kalkış Varış</v-list-item-subtitle>
                <v-list-item-subtitle style="font-size: large; font-weight: bold; ">{{
                  formatDateTime(journey.journey.departure) }} - {{
    formatDateTime(journey.journey.arrival) }}</v-list-item-subtitle>
                <br>
                <v-list-item-subtitle style="font-size: medium;padding-bottom: 1%;">{{ journey.journey.origin }} - {{
                  journey.journey.destination
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <hr>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content style="min-height: 50px;">Sefer bulunamadı.</v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import ToolbarChip from "../../components/base/ToolBarS.vue";
import DxDateBox from "devextreme-vue/date-box";
import CRUD from "@/api/CrudOperation/CRUD.js"
import general from "@/api/BaseMethods/general";
import alert from "@/api/BaseMethods/alertify.js";
import {
  DxValidator,
  DxCustomRule,
  // DxRequiredRule,
  // DxCompareRule,
  // DxEmailRule,
  // DxPatternRule,
  // DxStringLengthRule,
  // DxRangeRule,
  // DxAsyncRule,

} from 'devextreme-vue/validator';
import {

} from "devextreme-vue/data-grid";
import auth from "@/api/auth.js"


export default {
  components: {
    ToolbarChip,
    DxDateBox,
    DxValidator,
    DxCustomRule
  },
  data() {
    return {

      pageName: "Travel Expedition",
      travelDate: new Date().setDate(new Date().getDate() + 1),
      IsDateControlBool: true,
      busJourneys: [],
      origin: '',
      destination: '',
      originDataItems: [],
      destinationDataItems: [],
      originData: {
        id: 0,
        name: 'İstanbul Avrupa'
      },
      destinationData: {
        id: 0,
        name: 'Ankara'
      },
      busLocationsPanelBool: true,
      busJourneysPanelBool: false,
      isSearchDisabled: false,
      styleToday: null,
      styleTomorrow: "background-color: #1f9b78 !important; color:white;",
    }
  },
  methods: {
    GetBusLocations,
    GetBusJourneys,
    formatDateTime,
    formatDateString,
    goBackBusLocations,
    getDate() {
      return general.convertFormatDate(this.travelDate)
    },
    checkDuplicateLocations(value) {
      if (this.originData === this.destinationData) {
        return 'Kalkış noktası ile varış noktası aynı olamaz';
      }
      else {
        if (!this.IsDateControlBool) {
          this.isSearchDisabled = true
        }
        else {
          this.isSearchDisabled = false
        }
        return null;
      }
    },
    swapLocations() {
      const temp = this.originData;
      this.originData = this.destinationData;
      this.destinationData = temp;
    },
    setToday() {
      this.travelDate = new Date();
      this.todaySelected = true;
      this.tomorrowSelected = false;
      this.styleToday = "background-color: #1f9b78 !important; color:white;"
      this.styleTomorrow = null
    },
    setTomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.travelDate = tomorrow;
      this.todaySelected = false;
      this.tomorrowSelected = true;
      this.styleTomorrow = "background-color: #1f9b78 !important; color:white;"
      this.styleToday = null
    },
    dateRuleCallback(value) {
      const today = formatDateString(new Date().toString())
      const val = formatDateString(value.value)

      if (val >= today) {
        this.isSearchDisabled = false
        this.IsDateControlBool = true
        return true
      }
      else {
        this.styleToday = null
        this.styleTomorrow = null
        this.isSearchDisabled = true
        this.IsDateControlBool = false
        return false
      }
    },

  },
  mounted() {
    this.GetBusLocations("")

  }
}

async function GetBusLocations(comboName) {
  var data = null;
  if (comboName != "") {
    data = {
      Data: comboName === 'origin' ? this.originData : this.destinationData,
      DeviceSession: {
        SessionId: localStorage.getItem("sessionId"),
        DeviceId: localStorage.getItem("deviceId"),
      },
      Date: null,
      Language: "tr-TR"
    }
  }
  else {
    data = {
      Data: null,
      DeviceSession: {
        SessionId: localStorage.getItem("sessionId"),
        DeviceId: localStorage.getItem("deviceId"),
      },
      Date: null,
      Language: "tr-TR"
    }
  }


  const response = await CRUD.PostData(auth.GetBusLocationsUrl, data)

  if (response.status == '200') {
    const datas = response.data.data.data
    if (comboName != "") {
      if (comboName === "origin")
        this.originDataItems = datas
      else
        this.destinationDataItems = datas
    }
    else {
      this.originDataItems = datas.slice(0, 5);
      this.originData = this.originDataItems[0]

      this.destinationDataItems = datas.slice(0, 5);
      this.destinationData = this.destinationDataItems[4]
    }

  }
  else {
    this.$root.SnackBarS.show({
      successMsg: response.data.Message,
      color: "red"
    })
  }
}

async function GetBusJourneys() {
  var departureDate = formatDateString(this.travelDate);

  var data = {
    DeviceSession: {
      SessionId: localStorage.getItem("sessionId"),
      DeviceId: localStorage.getItem("deviceId"),
    },
    Date: null,
    Language: "tr-TR",
    Data: {
      OriginId: this.originData.id,
      DestinationId: this.destinationData.id,
      DepartureDate: departureDate
    }
  }

  const response = await CRUD.PostData(auth.GetBusJourneysUrl, data)
  if (response.status == '200') {
    const datas = response.data.data.data
    this.busJourneys = datas

    this.busLocationsPanelBool = false
    this.busJourneysPanelBool = true
  }
  else {
    this.$root.SnackBarS.show({
      successMsg: response.data.Message,
      color: "red"
    })
  }

}

function goBackBusLocations() {
  this.busLocationsPanelBool = true
  this.busJourneysPanelBool = false
  this.busJourneys = []
}

function formatDateTime(dateTimeString, format = "HH:mm") {
  const dateObject = new Date(dateTimeString);

  // Format için kullanılacak değerlerin alınması
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  // Belirtilen formatın oluşturulması
  const formattedTime = format
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);

  return formattedTime;
}

function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = "00:00:00";

  return `${year}-${month}-${day}T${hours}`;
}
</script>

<style >
.custom-span {
  color: #0e7057;
}

.v-chip.v-chip--size-small {
  font-weight: bold;
}

.custom-subtitle {
  font-size: 15px;
  /* İstenilen font boyutunu ayarlayın */
}

.custom-list-item {
  height: 200px;
  /* İstenilen v-list-item yüksekliği */
}

.custom-list-item-content {
  height: 100%;
  /* İçerik yüksekliği */
}

.selected-btn {
  background-color: #1f9b78 !important;
  color: white;
}
</style>