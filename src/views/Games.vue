<template>
  <div class="games">
    <h2>{{ title }}</h2>
    <h3>Lookup</h3>
    <div class="border">
      <div class="">
        <div class="inblock">Name:</div>
        <input v-model="lookup.nameTx" type="text">
      </div>
      <div class="">
        <div class="inblock">Edition:</div>
        <input v-model="lookup.editionTx" type="text">
      </div>
      <div class="">
        <button type="button" @click="findGame">Search</button>
        <button type="button" @click="clearGame">Clear</button>
      </div>
    </div>
    <h3>Game Information</h3>
    <form>
      <fieldset>
        <legend>Details</legend>
        <p>* notes required fields</p>
        <div class="">
          <div class="rownm">Id:</div>
          <div class="inblock">{{crudGame.gameID}}</div>
        </div>
        <div class="">
          <div class="rownm">Name:</div>
          <input v-model="crudGame.nameTx" type="text">*
        </div>
        <div class="">
          <div class="rownm">Edition:</div>
          <input v-model="crudGame.editionTx" type="text" maxlength="20">
        </div>
        <div class="">
          <div class="rownm">Rating (1-5):</div>
          <input v-model="crudGame.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div class="">
          <div class="rownm">Players: min:</div>
          <input v-model="crudGame.playerMinQt" type="number" class="nbrsize" min="1" max="128">*
          max:<input v-model="crudGame.playerMaxQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div class="">
          <div class="rownm">best:</div>
          <input v-model="crudGame.playerBestQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div class="">
          <div class="rownm">Age: min:</div>
          <input v-model="crudGame.playerMinYr" type="number" class="nbrsize" min="1" max="128">
        </div>
        <div class="">
          <div class="rownm">Time: min:</div>
          <input v-model="crudGame.timeMinQt" type="number" class="nbrsize" min="1" max="128">*
          max:<input v-model="crudGame.timeMaxQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div class="">
          <div class="rownm">Rules Read?</div>
          <input v-model="crudGame.rulesIn" type="checkbox" class="check">
        </div>
        <div class="">
          <div class="rownm">Shrink Wrapped?</div>
          <input v-model="crudGame.shrinkIn" type="checkbox" class="check">
        </div>
        <div class="">
          <div class="rownm">Sell?</div>
          <input v-model="crudGame.liquidateCd" type="text" class="nbrsize" maxlength="1">
        </div>
        <div class="">
          <div class="rownm">Keywords:</div>
          <textarea v-model="crudGame.keywordsTx"/>
        </div>
        <div class="">
          <div class="rownm">Description:</div>
          <textarea v-model="crudGame.descriptionTx"/>
        </div>
        <div class="">
          <div class="rownm">Designer:</div>
          <input v-model="crudGame.designerNm" type="text">
        </div>
        <div class="">
          <div class="rownm">Company:</div>
          <input v-model="crudGame.companyNm" type="text">
        </div>
        <div class="">
          <button type="button" @click="addGame">Add game</button>
          <button type="button" @click="chgGame">Change game</button>
          <button type="button" @click="resetGame">Reset game</button>
          <button type="button" @click="delGame">Delete game</button>
        </div>
      </fieldset>
    </form>
    <div class="" v-if="games.length > 1">
      <h3>Game List</h3>
      <div class="" v-for="(listGame,index) in games" :key="index">
        <button type="button" @click="selectList(index)">Select</button>
        {{listGame.nameTx}}
        <span v-if="listGame.editionTx"> - {{listGame.editionTx}}</span>
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
      errorToast: {
        className: 'et-alert',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        closeable: true
      },
      gameIndex: 0,
      games: [],
      lookup: {
        nameTx: '',
        editionTx: ''
      },
      notifyToast: {
        className: 'et-info',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        closeable: true
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
          if (resp.data.errors) {
            Vue.toast('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
          else {
            this.crudGame.gameID = resp.data.gameID;
            this.games.push(this.crudGame);
            this.gameIndex = this.games.length - 1;
            Vue.toast('Game Added', this.notifyToast);
          }
        })
        .catch ((error) => {
          Vue.toast('Server error, please check console for details', this.errorToast);
          console.log(`post error=`,error);
          // throw (error)
        })
    },
    chgGame () {
      let requestStr = `http://localhost:3000/chggame/ ${this.crudGame.gameID}`;
      console.log(requestStr)
      axios.put(requestStr, this.crudGame)
        .then ((resp) => {
          if (resp.data.errors) {
            Vue.toast('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
          else {
            Vue.toast('Game Changed', this.notifyToast);
          }
        })
        .catch ((error) => {
          Vue.toast('Server error, please check console for details', this.errorToast);
          console.log(`put error=`,error);
          // throw (error)
        })
    },
    clearGame () {
      this.lookup.nameTx = '';
      this.lookup.editionTx = '';
    },
    delGame () {
      if (confirm('delete ' + this.crudGame.nameTx + '?')) {
        let requestStr = `http://localhost:3000/delgame/ ${this.crudGame.gameID}`;
        console.log(requestStr)
        axios.delete(requestStr)
          .then ((resp) => {
            console.log(`delete resp=`,resp);
            if (resp.data.errors) {
              Vue.toast('Server error, please check console for details', this.errorToast);
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
              Vue.toast('Game Deleted', this.notifyToast);
            }
          })
          .catch ((error) => {
            Vue.toast('Server error, please check console for details', this.errorToast);
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
      let requestStr = `http://localhost:3000/game/name/${encodeURIComponent(this.lookup.nameTx)}`
      if (this.lookup.editionTx !== '') {
        requestStr += `/edition/${encodeURIComponent(this.lookup.editionTx)}`
      }
      console.log(requestStr)
      axios.get(requestStr)
        .then ((resp) => {
          console.log(`get resp=`,resp);
          this.games = resp.data;
          this.gameIndex = 0;
          this.loadCrud(this.gameIndex);
        })
        .catch ((error) => {
          Vue.toast('Server error, please check console for details', this.errorToast);
          console.log(`get error=`, error);
          // throw (error)
        })
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
input, textarea {
  display:inline-block;
  width: 20em;
  margin: 1em 0 0 0.5em;
}
textarea {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.nbrsize {
  width: 5em;
}
.check {
  width: 1em;
}
button {
  margin: 1em .5em 0;
}
form {
  max-width: 30em;
}
.border {
  border: solid 1px black;
  padding: 1em;
  max-width: 30em;
}
.inblock {
  display:inline-block;
}
.rownm {
  display:inline-block;
  text-align: right;
  width: 8em;
}
</style>
