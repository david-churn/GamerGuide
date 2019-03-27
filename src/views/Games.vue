<template>
  <div class="games">
    <h2>{{ title }}</h2>
    <h3>Search</h3>
    <div class="border">
      <div>
        <div class="inblock">Name:</div>
        <input v-model="search.nameTx" type="text">
      </div>
      <div>
        <div class="inblock">Edition:</div>
        <input v-model="search.editionTx" type="text">
      </div>
      <div>
        <button type="button" @click="findGame">Search</button>
        <button type="button" @click="clearGame">Clear</button>
      </div>
    </div>
    <h3>Game Information</h3>
    <form>
      <fieldset>
        <legend>Details</legend>
        <p>* notes required fields</p>
        <div>
          <div class="rownm">Name:</div>
          <input v-model="crudGame.nameTx" type="text">*
        </div>
        <div>
          <div class="rownm">Edition:</div>
          <input v-model="crudGame.editionTx" type="text" maxlength="20">
        </div>
        <div>
          <div class="rownm">Rating (1-5):</div>
          <input v-model="crudGame.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div>
          <div class="rownm">Players: min:</div>
          <input v-model="crudGame.playerMinQt" type="number" class="nbrsize" min="1" max="128">*
          max:<input v-model="crudGame.playerMaxQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div>
          <div class="rownm">best:</div>
          <input v-model="crudGame.playerBestQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div>
          <div class="rownm">Age: min:</div>
          <input v-model="crudGame.playerMinYr" type="number" class="nbrsize" min="1" max="128">
        </div>
        <div>
          <div class="rownm">Time: min:</div>
          <input v-model="crudGame.timeMinQt" type="number" class="nbrsize" min="1" max="128">*
          max:<input v-model="crudGame.timeMaxQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div>
          <div class="rownm">Rules Read?</div>
          <input v-model="crudGame.rulesIn" type="checkbox" class="check">
        </div>
        <div>
          <div class="rownm">Shrink Wrapped?</div>
          <input v-model="crudGame.shrinkIn" type="checkbox" class="check">
        </div>
        <div>
          <div class="rownm">Sell?</div>
          <input v-model="crudGame.liquidateCd" type="text" class="nbrsize" maxlength="1">
        </div>
        <div>
          <div class="rownm">Keywords:</div>
          <textarea v-model="crudGame.keywordsTx"/>
        </div>
        <div>
          <div class="rownm">Description:</div>
          <textarea v-model="crudGame.descriptionTx"/>
        </div>
        <div>
          <div class="rownm">Designer:</div>
          <input v-model="crudGame.designerNm" type="text">
        </div>
        <div>
          <div class="rownm">Company:</div>
          <input v-model="crudGame.companyNm" type="text">
        </div>
        <div>
          <button type="button" @click="addGame">Add game</button>
          <button type="button" @click="chgGame">Change game</button>
          <button type="button" @click="resetGame">Reset game</button>
          <button type="button" @click="delGame">Delete game</button>
        </div>
      </fieldset>
    </form>
    <div v-if="games.length > 0">
      <h3>Game List</h3>
      <div v-for="(listGame,index) in games" :key="index">
        <button type="button" @click="selectList(index)">Select</button>
        {{listGame.nameTx}}
        <span v-show="listGame.editionTx"> - {{listGame.editionTx}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'Games',
  data: function () {
    return {
      title: 'Game Maintenance',
      crudGame: {},
      gameIndex: 0,
      games: [],
      search: {
        nameTx: '',
        editionTx: ''
      },
      errorToast: {
        position: 'top-center',
        duration: 5000,
        fullWidth: true,
        fitToScren: true,
        type: 'error'
      },
      notifyToast: {
        position: 'top-center',
        duration: 2000,
        type: 'info',
        theme: 'bubble'
      },
      successToast: {
        position: 'top-center',
        duration: 2000,
        type: 'success',
        theme: 'bubble'
      }
    }
  },
  mounted() {
    this.emptyCrud();
  },
  methods: {
    addGame () {
      let requestStr = `http://localhost:3000/addgame/`
      axios.post(requestStr, this.crudGame)
        .then ((resp) => {
          console.log(resp.data);
          if (resp.data.errors) {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
          else {
            this.crudGame.gameID = resp.data.gameID;
            let newGame = {
                gameID: this.crudGame.gameID,
                nameTx: this.crudGame.nameTx,
                editionTx: this.crudGame.editionTx,
                designerNm: this.crudGame.designerNm,
                companyNm: this.crudGame.companyNm,
                descriptionTx: this.crudGame.descriptionTx,
                ratingQt: this.crudGame.ratingQt,
                playerMinYr: this.crudGame.playerMinYr,
                playerMinQt: this.crudGame.playerMinQt,
                playerMaxQt: this.crudGame.playerMaxQt,
                playerBestQt: this.crudGame.playerBestQt,
                timeMinQt: this.crudGame.timeMinQt,
                timeMaxQt: this.crudGame.timeMaxQt,
                shrinkIn: this.crudGame.shrinkIn,
                rulesIn: this.crudGame.rulesIn,
                liquidateCd: this.crudGame.liquidateCd,
                keywordsTx: this.crudGame.keywordsTx
              }
            this.games.push(newGame);
            this.gameIndex = this.games.length - 1;
            Vue.toasted.show('Game Added', this.successToast);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`post error=`,error);
          // throw (error)
        })
    },
    chgGame () {
      let requestStr = `http://localhost:3000/chggame/ ${this.crudGame.gameID}`;
      axios.put(requestStr, this.crudGame)
        .then ((resp) => {
          console.log(resp.data);
          if (resp.data.errors) {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
          else {
            Vue.toasted.show('Game Changed', this.successToast);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`put error=`,error);
          // throw (error)
        })
    },
    clearGame () {
      this.search.nameTx = '';
      this.search.editionTx = '';
    },
    delGame () {
      if (confirm('delete ' + this.crudGame.nameTx + '?')) {
        let requestStr = `http://localhost:3000/delgame/ ${this.crudGame.gameID}`;
        axios.delete(requestStr)
          .then ((resp) => {
            console.log(resp.data);
            if (resp.data.errors) {
              Vue.toasted.show('Server error, please check console for details', this.errorToast);
              console.log(`post resp=`,resp);
            }
            else {
              this.games = this.games.filter(game => game.gameID != this.crudGame.gameID );
              if (this.games.length > 0) {
                this.gameIndex = 0;
                this.loadCrud(this.gameIndex);
              }
              else {
                this.emptyCrud();
              }
              Vue.toasted.show('Game Deleted', this.successToast);
            }
          })
          .catch ((error) => {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`delete error=`,error);
            // throw (error)
          })
      }
    },
    emptyCrud() {
      this.crudGame = {
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
        keywordsTx: null
      }
    },
    findGame () {
      if (this.search.nameTx !== '') {
        let requestStr = `http://localhost:3000/game/name/${encodeURIComponent(this.search.nameTx)}`
        if (this.search.editionTx !== '') {
          requestStr += `/edition/${encodeURIComponent(this.search.editionTx)}`
        }
        axios.get(requestStr)
          .then ((resp) => {
            console.log(resp.data);
            this.games = resp.data;
            this.gameIndex = 0;
            this.loadCrud(this.gameIndex);
          })
          .catch ((error) => {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`get error=`, error);
            // throw (error)
          })
      }
      else {
        Vue.toasted.show("Please enter a search name", this.notifyToast);
      }
    },
    loadCrud(i) {
      this.crudGame = {
        gameID: this.games[i].gameID,
        nameTx: this.games[i].nameTx,
        editionTx: this.games[i].editionTx,
        designerNm: this.games[i].designerNm,
        companyNm: this.games[i].companyNm,
        descriptionTx: this.games[i].descriptionTx,
        ratingQt: this.games[i].ratingQt,
        playerMinYr: this.games[i].playerMinYr,
        playerMinQt: this.games[i].playerMinQt,
        playerMaxQt: this.games[i].playerMaxQt,
        playerBestQt: this.games[i].playerBestQt,
        timeMinQt: this.games[i].timeMinQt,
        timeMaxQt: this.games[i].timeMaxQt,
        shrinkIn: this.games[i].shrinkIn,
        rulesIn: this.games[i].rulesIn,
        liquidateCd: this.games[i].liquidateCd,
        keywordsTx: this.games[i].keywordsTx,
      }
    },
    resetGame () {
      if (this.games.length > 0) {
        this.loadCrud(this.gameIndex);
      }
      else {
        this.emptyCrud();
      }
    },
    selectList (i) {
      this.gameIndex = i;
      this.loadCrud(this.gameIndex);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
