<template>
  <div class="plays">
    <h2>{{ title }}</h2>
    <h3>Play Information</h3>
    <form>
      <fieldset>
        <legend>Details</legend>
        <p>* notes required fields</p>
        <div>
          <div class="rownm">Name:</div>
          <input v-model="crudPlay.nameTx" type="text">
        </div>
        <div>
          <div class="rownm">Edition:</div>
          <input v-model="crudPlay.editionTx" type="text" maxlength="20">
        </div>
        <div>
          <div class="rownm">Start Time:</div>
          <input v-model="crudPlay.startDtTm" type="datetime-local" class="shorter">*
        </div>
        <div>
          <div class="rownm">End Time:</div>
          <input v-model="crudPlay.endDtTm" type="datetime-local" class="shorter">*
        </div>
        <div>
          <div class="rownm">Players:</div>
          <input v-model="crudPlay.playerQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div>
          <div class="rownm">Rating (1-5):</div>
          <input v-model="crudPlay.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div>
          <div class="rownm">Result:</div>
          <input v-model="crudPlay.winCd" type="text" class="nbrsize" maxlength="10"> (win, lose, tie, etc.)
        </div>
        <div>
          <button type="button" @click="addPlay">Add Play</button>
          <button type="button" @click="emptyCrud">Clear Details</button>
        </div>
      </fieldset>
    </form>
    <h3>Search</h3>
    <div class="border">
      <div class="inblock">
        <div class="inblock">Name:</div>
        <input v-model="search.nameTx" type="text">*
      </div>
      <div>
        <button type="button" @click="findPlay">Search</button>
        <button type="button" @click="clearSearch">Clear Search</button>

      </div>
    </div>
    <div v-if="plays.length">
      <h3>Play List</h3>
      <div class="card" v-for="(listPlay,index) in plays" :key="index">
        <div>
          <h4>
            <span>{{listPlay.nameTx}}</span>
            <span v-if="listPlay.editionTx"> - {{listPlay.editionTx}}</span>
          </h4>
        </div>
        <div>
          <span>Players:<input v-model="listPlay.playerQt" type="number" class="nbrsize" min="1" max="128"></span>
          <span>Rating:<input v-model="listPlay.ratingQt" class="nbrsize" min="1" max="5"></span>
          <span>Result:<input v-model="listPlay.winCd" type="text" class="nbrsize" maxlength="10"></span>
        </div>
        <div>
          <span>Time: <input v-model="listPlay.startDtTm" type="datetime-local" class="shorter"></span>
        </div>
        <div>
          <span> to <input v-model="listPlay.endDtTm" type="datetime-local" class="shorter">
          </span>
        </div>
        <button type="button" @click="chgPlay(index)">Change</button>
        <button type="button" @click="delPlay(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';

export default {
  name: 'Plays',
  data: function () {
    return {
      title: 'Play Maintenance',
      crudPlay: {},
      search: {
        nameTx: null,
      },
      plays: [],
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
    addPlay () {
      let requestStr = `http://localhost:3000/addplay/`
      axios.post(requestStr, this.crudPlay)
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            this.crudPlay.playID = resp.data.playID;
            let newPlay = {
              playID: this.crudPlay.playID,
              nameTx: this.crudPlay.nameTx,
              editionTx: this.crudPlay.editionTx,
              startDtTm: this.crudPlay.startDtTm,
              endDtTm: this.crudPlay.endDtTm,
              playerQt: this.crudPlay.playerQt,
              ratingQt: this.crudPlay.ratingQt,
              winCd: this.crudPlay.winCd,
              };
            this.plays.push(newPlay);
            this.emptyCrud();
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
    chgPlay (i) {
      let requestStr = `http://localhost:3000/chgplay/${this.plays[i].playID}`;
      axios.put(requestStr, this.plays[i])
        .then ((resp) => {
          console.log(resp.data);
          if (!resp.data.errors) {
            Vue.toasted.show('Play Changed', this.successToast);
          }
          else {
            Vue.toasted.show('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
        })
        .catch ((error) => {
          Vue.toasted.show('Server error, please check console for details', this.errorToast);
          console.log(`put error=`,error);
          // throw (error)
        })
    },
    clearSearch () {
      this.search.nameTx = null;
      this.plays = [];
    },
    delPlay (i) {
      if (confirm('delete ' + this.plays[i].nameTx + '?')) {
        let requestStr = `http://localhost:3000/delplay/${this.plays[i].playID}`;
        axios.delete(requestStr)
          .then ((resp) => {
            console.log(resp.data);
            if (!resp.data.errors) {
              let deletePlayID = this.plays[i].playID;
              this.plays = this.plays.filter(play => play.playID != deletePlayID );
              Vue.toasted.show('Play Deleted', this.successToast);
            }
            else {
              Vue.toasted.show('Server error, please check console for details', this.errorToast);
              console.log(`post resp=`,resp);
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
      this.crudPlay = {
        playID: -1,
        nameTx: null,
        editionTx: null,
        startDtTm: moment().format('YYYY-MM-DDThh:mm'),
        endDtTm: moment().format('YYYY-MM-DDThh:mm'),
        playerQt: 1,
        ratingQt: null,
        winCd: "",
      };
    },
    findPlay() {
      if (this.search.nameTx) {
        let requestStr = `http://localhost:3000/play/name/${encodeURIComponent(this.search.nameTx)}`;
        axios.get(requestStr)
          .then ((resp) => {
            console.log(resp.data);
            if (!resp.data.errors) {
              this.plays = resp.data;
              // Put the datetimes in the right format to display.
              this.plays.forEach(play => {
                play.startDtTm = moment(play.startDtTm).format('YYYY-MM-DDThh:mm');
                play.endDtTm = moment(play.endDtTm).format('YYYY-MM-DDThh:mm');
              })
              if (this.plays.length === 0) {
                Vue.toasted.show('Zero plays found', this.notifyToast);
              }
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
      else {
        Vue.toasted.show('Please enter a Name in Search', this.notifyToast);
      }
    },
  }
}
</script>

// These are similar to games definitions.  ?Put in main for global scope?
<style scoped>

</style>
