<template>
  <div class="home">
    <h2>{{ title }}</h2>
    <div class="inblock">
      <div class="border">
        <h3>{{games[gameIndex].nameTx}}
          <span v-show="games[gameIndex].editionTx"> - {{games[gameIndex].editionTx}}</span>
        </h3>
        <div>
          <span class="rownm">Rating:</span> {{games[gameIndex].ratingQt}},
          <span>Play Average: {{games[gameIndex].averageRatingQt}}</span>
        </div>
        <div v-show="games[gameIndex].lastPlayDtTm">
          <div class="rownm">Last Play:</div>
          <div class="bigtx">{{games[gameIndex].lastPlayDtTm}}</div>
        </div>
        <div v-show="games[gameIndex].lastPlayDtTm">
          <span class="rownm">Played:</span> {{games[gameIndex].playQt}} time<span v-if="games[gameIndex].playQt > 1">s</span>, Won {{games[gameIndex].winQt}}
        </div>
        <div>
          <span class="rownm">Players:</span> {{games[gameIndex].playerMinQt}}
          <span v-if="games[gameIndex].playerMinQt != games[gameIndex].playerMaxQt"> - {{games[gameIndex].playerMaxQt}}, Best with {{games[gameIndex].playerBestQt}}</span>
        </div>
        <div v-show="games[gameIndex].playerMinYr">
          <span class="rownm">Age:</span> {{games[gameIndex].playerMinYr}} or older
        </div>
        <div>
          <span class="rownm">Play Time:</span>
          {{games[gameIndex].timeMinQt}} - {{games[gameIndex].timeMaxQt}}
        </div>
        <div>
          <span>Rules Read? <input v-model="games[gameIndex].rulesIn" @change="rulesRead" type="checkbox" class="check"></span>
          <span>In Shrink Wrap? <input v-model="games[gameIndex].shrinkIn" @change="unwrapped" type="checkbox" class="check"></span>
          <span v-show="games[gameIndex].liquidateCd">
          &gt;{{games[gameIndex].liquidateCd}}&lt;
          </span>
        </div>
        <div v-show="games[gameIndex].keywordsTx">
          <div class="rownm">Keywords:</div>
          <div class="bigtx">{{games[gameIndex].keywordsTx}}</div>
        </div>
        <div v-show="games[gameIndex].descriptionTx">
          <div class="rownm">Description:</div>
          <div class="bigtx">{{games[gameIndex].descriptionTx}}</div>
        </div>
        <div v-show="games[gameIndex].designerNm">
          <span class="rownm">Designer:</span>
          {{games[gameIndex].designerNm}}
        </div>
        <div v-show="games[gameIndex].companyNm">
          <span class="rownm">Company:</span>
          {{games[gameIndex].companyNm}}
        </div>
        <div v-if="games.length > 1">
          <button type="button" @click="anotherGame">Another</button>
        </div>
      </div>
    </div>
    <div class="inblock">
      <div class="border">
        <h3>Add Play</h3>
        <div>
          <div class="rownm">Start Time:</div>
          <input v-model="playObj.startDtTm" type="datetime-local" class="shorter">*
        </div>
        <div>
          <div class="rownm">End Time:</div>
          <input v-model="playObj.endDtTm" type="datetime-local" class="shorter">*
        </div>
        <div>
          <div class="rownm">Players:</div>
          <input v-model="playObj.playerQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div>
          <div class="rownm">Rating (1-5):</div>
          <input v-model="playObj.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div>
          <div class="rownm">Result:</div>
          <input v-model="playObj.winCd" type="text" class="nbrsize" maxlength="10"> (win, lose, tie, etc.)
        </div>
        <div>
          <button type="button" @click="addPlay">Add Play</button>
          <button type="button" @click="emptyPlay">Clear Details</button>
        </div>
      </div>
    </div>
    <div>
      <div class="border">
        <h3>Game Search</h3>
        <div>
          <div class="rownm">Name:</div>
          <input v-model="searchObj.nameTx" type="text">
        </div>
        <div>
          <div class="rownm">Edition:</div>
          <input v-model="searchObj.editionTx" type="text" maxlength="20">
        </div>
        <div>
          <div class="rownm">Rating:</div>
          <input v-model="searchObj.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div>
          <div class="rownm">Players:</div>
          <input v-model="searchObj.playerQt" type="number" class="nbrsize" min="1" max="128">
          Youngest:<input v-model="searchObj.ageMinYr" type="number" class="nbrsize" min="1" max="128">
        </div>
        <div>
          <div class="rownm">Time:</div>
          <input v-model="searchObj.timeQt" type="number" class="nbrsize" min="1" max="32767">
        </div>
        <div>
          <div class="rownm">Keyword:</div>
          <input v-model="searchObj.keywordTx" type="text">
        </div>
        <div>
          <button type="button" @click="findGame('search')">Search</button>
          <button type="button" @click="findGame('random')">Random</button>
          <button type="button" @click="clearSearch">Clear</button>
        </div>
      </div>
    </div>
    <div class="inblock" v-if="games.length > 0">
      <h3>Games Found</h3>
      <p div="rownm">Rating: Game</p>
      <div v-for="(listGame,index) in games" :key="index">
        <button class="bigtx" type="button" @click="selectList(index)">Select</button>
        <div class="bigtx">{{listGame.ratingQt}}:</div>
        <div class="bigtx">{{listGame.nameTx}}
          <span v-show="listGame.editionTx"> - {{listGame.editionTx}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';

export default {
  name: 'Home',
  data: function () {
    return {
      title: 'Guide Book',
      playObj: {},
      gameIndex: 0,
      games: [{
        gameID: -1,
        nameTx: "",
        editionTx: null,
        designerNm: null,
        companyNm: null,
        descriptionTx: null,
        ratingQt: null,
        playerMinYr: null,
        playerMinQt: 2,
        playerMaxQt: 2,
        playerBestQt: 2,
        timeMinQt: 1,
        timeMaxQt: 1,
        shrinkIn: true,
        rulesIn: false,
        liquidateCd: "",
        keywordsTx: null,
        startDtTm: moment().format('YYYY-MM-DDThh:mm'),
        endDtTm: moment().format('YYYY-MM-DDThh:mm'),
        playerQt: 1,
        averageRatingQt: null,
        winCd: "",
      }],
      errorToast: {
        className: 'toast',
        position: 'top-center',
        duration: 5000,
        fullWidth: true,
        fitToScren: true,
        type: 'error'
      },
      notifyToast: {
        className: 'toast',
        position: 'top-center',
        duration: 2000,
        type: 'info',
        theme: 'bubble'
      },
      successToast: {
        className: 'toast',
        position: 'top-center',
        duration: 2000,
        type: 'success',
        theme: 'bubble'
      },
      searchObj: {
        nameTx: '',
        editionTx: null,
        ratingQt: null,
        playerQt: null,
        ageMinYr: null,
        timeQt: null,
        keywordTx: null,
      },
    }
  },
  created() {
    this.emptyPlay();

    let requestStr = `http://localhost:3000/latestgame`;
    axios.get(requestStr)
      .then ((resp) => {
        console.log(resp.data);
        if (!resp.data.errors) {
          this.games.push(resp.data);
          this.games.shift();
          this.gameIndex = 0;
          this.fetchStats();
        }
        else {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`post resp=`,resp);
        }
      })
      .catch (error => {
        Vue.toasted.show('Server error, please check console for details', this.errorToast);
        console.log(`get error=`, error);
        // throw (error)
      })
  },
  methods: {
    addPlay () {
      this.playObj.nameTx = this.games[this.gameIndex].nameTx;
      this.playObj.editionTx = this.games[this.gameIndex].nameTx;
      let requestStr = `http://localhost:3000/addplay/`
      axios.post(requestStr, this.playObj)
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            this.emptyPlay();
            Vue.toasted.show('Play Added', this.successToast);
          }
          else {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`post error=`,error);
          // throw (error)
        })
    },
    anotherGame () {
      this.gameIndex = Math.floor(Math.random() * this.games.length);
      this.fetchStats();
    },
    clearSearch () {
      this.searchObj.nameTx = null;
      this.searchObj.editionTx = null;
      this.searchObj.ratingQt = null;
      this.searchObj.playerQt = null;
      this.searchObj.ageMinYr = null;
      this.searchObj.timeQt = null;
      this.searchObj.keywordTx = null;
    },
    emptyPlay() {
      this.playObj = {
        startDtTm: moment().format('YYYY-MM-DDThh:mm'),
        endDtTm: moment().format('YYYY-MM-DDThh:mm'),
        playerQt: 1,
        averageRatingQt: null,
        winCd: "",
      };
    },
    fetchStats () {
      let statStr = `http://localhost:3000/playstats/` + encodeURIComponent(this.games[this.gameIndex].nameTx);
      axios.get(statStr)
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            Vue.set(this.games[this.gameIndex], 'lastPlayDtTm',moment(resp.data.lastPlayDtTm).format('dddd, MMMM Do YYYY, h:mm:ss a'));
            Vue.set(this.games[this.gameIndex], 'playQt', resp.data.playQt);
            Vue.set(this.games[this.gameIndex], 'averageRatingQt', resp.data.averageRatingQt);
            Vue.set(this.games[this.gameIndex], 'winQt', resp.data.winQt);
          }
          else {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`post error=`,error);
          // throw (error)
        })
    },
    findGame (whichStr) {
      let requestStr = `http://localhost:3000/searchgames`;
      axios.post(requestStr, this.searchObj)
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            this.games = resp.data;
            if (whichStr === 'random' && this.games.length > 1) {
              this.gameIndex = Math.floor(Math.random() * this.games.length);
            }
            else {
              this.gameIndex = 0;
            }
            this.fetchStats();
            Vue.toasted.show(`${this.games.length} found`, this.notifyToast);
          }
          else {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`get resp=`, resp);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`get error=`, error);
          // throw (error)
        })
    },
    rulesRead () {
      let patchStr = `http://localhost:3000/gamerule/` + this.games[this.gameIndex].gameID;
      let rulesObj = { rulesIn : 0 };
      if (this.games[this.gameIndex].rulesIn) {
        rulesObj.rulesIn = 1;
      }
      axios.patch(patchStr, rulesObj )
      .then ((resp) => {
        console.log(resp.data);
        if (!resp.data.errors) {
          Vue.toated.success('Rules Read, have fun!', this.successToast)
        }
        else {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`get resp=`, resp);
        }
      })
      .catch ((error) => {
        Vue.toasted.show('Server error, please check console for details', this.errorToast);
        console.log(`get error=`, error);
        // throw (error)
      })
    },
    selectList (i) {
      this.gameIndex = i;
      this.fetchStats();
    },
    unwrapped () {
      let patchStr = `http://localhost:3000/gameshrink/` + this.games[this.gameIndex].gameID;
      let shrinkObj = { shrinkIn : 0 };
      if (this.games[this.gameIndex].shrinkIn) {
        shrinkObj.shrinkIn = 1;
      }
      axios.patch(patchStr, shrinkObj)
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            Vue.toasted.success('Game Unwrapped', this.successToast)
          }
          else {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`get resp=`, resp);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`get error=`, error);
          // throw (error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
