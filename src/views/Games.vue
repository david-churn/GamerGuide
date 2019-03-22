<template>
  <div class="games">
    <h2>{{ title }}</h2>
    <h3>Lookup</h3>
    <div class="inblock">
      <div class="inblock">Name:</div>
      <input v-model="lookup.nameTx" type="text">
    </div>
    <div class="inblock">
      <div class="inblock">Edition:</div>
      <input v-model="lookup.editionTx" type="text">
    </div>
    <div class="">
      <button type="button" @click="findgame">Search</button>
      <button type="button" @click="cleargame">Clear</button>
    </div>
    <h3>Game Information</h3>
    <form>
      <fieldset>
        <legend>Game Information</legend>
        <div class="">
          <div class="rownm">Id:</div>
          <div class="inblock">{{crudGame.gameID}}</div>
        </div>
        <div class="">
          <div class="rownm">Name:</div>
          <input v-model="crudGame.nameTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Edition:</div>
          <input v-model="crudGame.editionTx" type="text">
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
          <div class="rownm">Description:</div>
          <input v-model="crudGame.descriptionTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Rating (1-5):</div>
          <input v-model="crudGame.ratingQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Age:</div>
          <input v-model="crudGame.playerMinYr" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Players:</div>
          <input v-model="crudGame.playerMinQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Maximum Players:</div>
          <input v-model="crudGame.playerMaxQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Recommended Players:</div>
          <input v-model="crudGame.playerBestQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Play Time:</div>
          <input v-model="crudGame.timeMinQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Maximum Play Time:</div>
          <input v-model="crudGame.timeMaxQt" type="number">
        </div>
        <div class="">
          <div class="rownm">In the Shrink Wrap?</div>
          <input v-model="crudGame.shrinkIn" type="checkbox">Yes
        </div>
        <div class="">
          <div class="rownm">Rules Read?</div>
          <input v-model="crudGame.rulesIn" type="checkbox">Yes
        </div>
        <div class="">
          <div class="rownm">Sell/Trade?</div>
          <input v-model="crudGame.liquidateCd" type="text">
        </div>
        <div class="">
          <div class="rownm">Search Keywords:</div>
          <input v-model="crudGame.keywordsTx" type="text">
        </div>
      </fieldset>
    </form>
    <div class="">
      <button type="button" @click="addgame">Add game</button>
      <button type="button" @click="chggame">Change game</button>
      <button type="button" @click="resetgame">Reset game</button>
      <button type="button" @click="delgame">Delete game</button>
    </div>
    <div class="" v-if="games.length > 1">
      <h3>Game List</h3>
      <div class="" v-for="(listGame,index) in games" :key="index">
        <button type="button" @click="selectlist(index)">Select</button>
        {{listGame.nameTx}} - {{listGame.editionTx}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Games',
  data: function () {
    return {
      title: 'Game Maintenance',
      games: [],
      lookup: {
        nameTx: '',
        editionTx: ''
      },
      crudGame: {},
      gameIndex: 0
    }
  },
  methods: {
    addgame () {
      let requestStr = `http://localhost:3000/addgame/`
      axios.post(requestStr, this.crudGame)
        .then ((resp) => {
          console.log(`post resp=`,resp);
          this.crudGame.gameID = resp.data.gameID;
          this.games.push(this.crudGame);
          this.gameIndex = this.games.length - 1;
        })
        .catch ((error) => {
          throw (error)
        })
    },
    chggame () {
      let requestStr = `http://localhost:3000/chggame/ ${this.crudGame.gameID}`;
      console.log(requestStr)
      axios.put(requestStr, this.crudGame)
        .then ((resp) => {
          console.log(`post resp=`,resp);
        })
        .catch ((error) => {
          throw (error)
        })
    },
    cleargame () {
      this.lookup.nameTx = ''
      this.lookup.editionTx = ''
    },
    delgame () {
      let requestStr = `http://localhost:3000/delgame/ ${this.crudGame.gameID}`;
      console.log(requestStr)
      axios.delete(requestStr)
        .then ((resp) => {
          console.log(`delete resp=`,resp);
          this.crudGame = {};
//  How do I get the deleted game removed from the array?!?
          this.games.gameID = -1;
// !!! Sorting objects leaves them in the same order...
          this.games.sort();
          this.games.shift();
          this.gameIndex = 0;
          this.loadCrud(this.gameIndex);
        })
        .catch ((error) => {
          throw (error)
        })
    },
    findgame () {
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
          throw (error)
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
    resetgame () {
      this.loadCrud(this.gameIndex);
    },
    selectlist (i) {
      this.gameIndex = i;
      this.loadCrud(this.gameIndex);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display:inline-block;
  width: 15em;
  margin: .5em;
}
textarea {
  margin: .5em;
  min-width: 30em;
}
button {
  margin: .5em;
}
.inblock {
  display:inline-block;
}
.rownm {
  display:inline-block;
  text-align: right;
  width: 12em;
}
</style>
