<template>
  <div class="games">
    <h2>{{ title }}</h2>
    <h3>Lookup</h3>
    <div class="">
      <div class="inblock">ID:</div>
      <input vmodel="game_key.gameId" type="number">
    </div>
    <!-- <div class="">- or -</div>
    <div class="inblock">
      <div class="inblock">Name:</div>
      <input vmodel="game_key.nameTx" type="text">
    </div>
    <div class="inblock">- and -</div>
    <div class="inblock">
      <div class="inblock">Edition:</div>
      <input vmodel="game_key.editionTx" type="text">
    </div> -->
    <div class="">
      <button type="button" @click="findgame">Search</button>
      <button type="button" @click="cleargame">Clear</button>
    </div>
    <form>
      <fieldset>
        <legend>Game Information</legend>
        <div class="">
          <div class="rownm">Id:</div>
          <div class="inblock">{{game.gameID}}</div>
        </div>
        <div class="">
          <div class="rownm">Name:</div>
          <input vmodel="game.nameTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Edition:</div>
          <input vmodel="game.editionTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Designer:</div>
          <input vmodel="game.designerNm" type="text">
        </div>
        <div class="">
          <div class="rownm">Company:</div>
          <input vmodel="game.companyNm" type="text">
        </div>
        <div class="">
          <div class="rownm">Description:</div>
          <input vmodel="game.descriptionTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Rating (1-5):</div>
          <input vmodel="game.ratingQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Age:</div>
          <input vmodel="game.playerMinYr" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Players:</div>
          <input vmodel="game.playerMinQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Maximum Players:</div>
          <input vmodel="game.playerMaxQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Recommended Players:</div>
          <input vmodel="game.playerBestQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Minimum Play Time:</div>
          <input vmodel="game.timeMinQt" type="number">
        </div>
        <div class="">
          <div class="rownm">Maximum Play Time:</div>
          <input vmodel="game.timeMaxQt" type="number">
        </div>
        <div class="">
          <div class="rownm">In the Shrink Wrap?</div>
          <input vmodel="game.shrinkIn" type="checkbox">Yes
        </div>
        <div class="">
          <div class="rownm">Rule Read?</div>
          <input vmodel="game.rulesIn" type="checkbox">Yes
        </div>
        <div class="">
          <div class="rownm">Sell/Trade?</div>
          <input vmodel="game.liquidateCd" type="text">
        </div>
        <div class="">
          <div class="rownm">Search Keywords:</div>
          <input vmodel="game.keywordsTx" type="text">
        </div>
      </fieldset>
    </form>
    <div class="">
      <button type="button" @click="addgame">Add game</button>
      <button type="button" @click="chggame">Change game</button>
      <button type="button" @click="resetgame">Reset game</button>
      <button type="button" @click="delgame">Delete game</button>
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
      game: {},
      gameLookup: {},
      originalGame: {}
    }
  // }
  // created() {
  //   axios.get('http://localhost:3000/employees')
  //     .then( (resp) => {
  //       this.employees = resp.data;
  //     })
  //     .catch( (error) => {
  //       console.log(error);
  //     })
  },
  methods: {
    findgame () {
      axios.post('http://localhost:3000/game', this.gameLookup)
        .then ((resp) => {
          this.game = {
            gameID: resp.data.gameID,
            nameTx: resp.data.nameTx,
            editionTx: resp.data.editionTx,
            designerNm: resp.data.designerNm,
            companyNm: resp.data.companyNm,
            descriptionTx: resp.data.descriptionTx,
            ratingQt: resp.data.ratingQt,
            playerMinYr: resp.data.playerMinYr,
            playerMinQt: resp.data.playerMinQt,
            playerMaxQt: resp.data.playerMaxQt,
            playerBestQt: resp.data.playerBestQt,
            timeMinQt: resp.data.timeMinQt,
            timeMaxQt: resp.data.timeMaxQt,
            shrinkIn: resp.data.shrinkIn,
            rulesIn: resp.data.rulesIn,
            liquidateCd: resp.data.liquidateCd,
            keywordsTx: resp.data.keywordsTx
          }
        })
        .catch ((error) => {
          throw (error)
        })
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
.inblock {
  display:inline-block;
}
.rownm {
  display:inline-block;
  text-align: right;
  width: 12em;
}
</style>
