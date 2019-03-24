<template>
  <div class="plays">
    <h2>{{ title }}</h2>
    <h3>Play Information</h3>
    <form>
      <fieldset>
        <legend>Details</legend>
        <p>* notes required fields</p>
        <div class="">
          <div class="rownm">Id:</div>
          <div class="inblock">{{crudPlay.playID}}</div>
        </div>
        <div class="">
          <div class="rownm">Name:</div>
          <input v-model="crudPlay.nameTx" type="text">
        </div>
        <div class="">
          <div class="rownm">Edition:</div>
          <input v-model="crudPlay.editionTx" type="text" maxlength="20">
        </div>
        <div class="">
          <div class="rownm">Start Time:</div>
          <input v-model="crudPlay.startDtTm" type="datetime-local" class="shorter">*
        </div>
        <div class="">
          <div class="rownm">End Time:</div>
          <input v-model="crudPlay.endDtTm" type="datetime-local" class="shorter">*
        </div>
        <div class="">
          <div class="rownm">Players:</div>
          <input v-model="crudPlay.playerQt" type="number" class="nbrsize" min="1" max="128">*
        </div>
        <div class="">
          <div class="rownm">Rating (1-5):</div>
          <input v-model="crudPlay.ratingQt" type="number" class="nbrsize" min="1" max="5">
        </div>
        <div class="">
          <div class="rownm">Result:</div>
          <input v-model="crudPlay.winCd" type="text" class="nbrsize" maxlength="10"> (win, lose, tie, etc.)
        </div>
        <div class="">
          <button type="button" @click="addPlay">Add Play</button>
          <button type="button" @click="emptyCrud">Clear Play</button>
        </div>
      </fieldset>
    </form>
    <h3>Search</h3>
    <div class="border">
      <div class="inblock">
        <div class="inblock">Name:</div>
        <input v-model="lookup.nameTx" type="text">*
      </div>
      <div class="">
        <button type="button" @click="findPlay">Search</button>
      </div>
    </div>
    <div class="" v-if="plays.length">
      <h3>Play List</h3>
      <div class="card" v-for="(listPlay,index) in plays" :key="index">
        <div class="">
          <span>{{listPlay.nameTx}}</span>
          <span v-if="listPlay.editionTx"> - {{listPlay.editionTx}}</span>
        </div>
        <div class="">
          <span>Players:<input v-model="listPlay.playerQt" type="number" class="nbrsize" min="1" max="128"></span>
          <span>Rating:<input v-model="listPlay.ratingQt" class="nbrsize" min="1" max="5"></span>
          <span>Result:<input v-model="listPlay.winCd" type="text" class="nbrsize" maxlength="10"></span>
        </div>
        <div class="">
          <span>Time: <input v-model="listPlay.startDtTm" type="datetime-local" class="shorter"></span>
        </div>
        <div class="">
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
      errorToast: {
        className: 'et-alert',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        closeable: true
      },
      lookup: {
        nameTx: null,
      },
      plays: [],
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
    addPlay () {
      let requestStr = `http://localhost:3000/addplay/`
      axios.post(requestStr, this.crudPlay)
        .then ((resp) => {
          if (resp.data.errors) {
            Vue.toast('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
          }
          else {
            this.crudPlay.playID = resp.data.playID;
            this.plays.push(this.crudPlay);
            Vue.toast('Play Added', this.notifyToast);
          }
        })
        .catch ((error) => {
          Vue.toast('Server error, please check console for details', this.errorToast);
          console.log(`post error=`,error);
          // throw (error)
        })
    },
    chgPlay (i) {
      let requestStr = `http://localhost:3000/chgplay/${this.plays[i].playID}`;
      console.log(requestStr, this.plays[i]);
      axios.put(requestStr, this.plays[i])
        .then ((resp) => {
          if (resp.data.errors) {
            Vue.toast('Server error, please check console for details', this.errorToast);
            console.log(`post resp=`,resp);
        }
          else {
            Vue.toast('Play Changed', this.notifyToast);
          }
        })
        .catch ((error) => {
          Vue.toast('Server error, please check console for details', this.errorToast);
          console.log(`put error=`,error);
          // throw (error)
        })
    },
    delPlay (i) {
      if (confirm('delete ' + this.plays[i].nameTx + '?')) {
        let requestStr = `http://localhost:3000/delplay/${this.plays[i].playID}`;
        console.log(requestStr)
        axios.delete(requestStr)
          .then ((resp) => {
            if (resp.data.errors) {
              Vue.toast('Server error, please check console for details', this.errorToast);
              console.log(`post resp=`,resp);
            }
            else {
              let deletePlayID = this.plays[i].playID;
              this.plays = this.plays.filter(play => play.playID != deletePlayID );
              Vue.toast('Play Deleted', this.notifyToast);
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
      if (this.lookup.nameTx) {
        let requestStr = `http://localhost:3000/play/name/${encodeURIComponent(this.lookup.nameTx)}`;
        console.log(requestStr);
        axios.get(requestStr)
          .then ((resp) => {
            console.log(`get resp=`,resp);
            this.plays = resp.data;
  // Put the datetimes in the right format to display.
            this.plays.forEach(play => {
              play.startDtTm = moment(play.startDtTm).format('YYYY-MM-DDThh:mm');
              play.endDtTm = moment(play.endDtTm).format('YYYY-MM-DDThh:mm');
            })
            if (this.plays.length === 0) {
              Vue.toast('Zero plays found', this.notifyToast);
            }
          })
          .catch ((error) => {
            Vue.toast('Server error, please check console for details', this.errorToast);
            console.log(`get error=`, error);
            // throw (error)
          })
      }
      else {
        Vue.toast('Please enter a Name in Search', this.notifyToast);
      }
    },
  }
}
</script>

// These are similar to games definitions.  ?Put in main for global scope?
<style scoped>
input, textarea {
  display:inline-block;
  width: 20em;
  margin: 1em 0 0 0.5em;
}
span {
  margin: 1em 0.5em 0 0.5em;
}
textarea {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.nbrsize {
  width: 5em;
}
.shorter {
  width: 17em;
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
.card {
  border: solid 1px black;
  display: inline-block;
  background: $ltblue;
  margin: 0 1em 1em 0;
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
