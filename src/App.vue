<template>
  <div id="app">
    <div id="nav">
      <div class="logoplace">
        <img alt="David logo" class="logo" src="./assets/David-logo.png">
      </div>
      <div class="dflex">
        <div class="flex1">
          <router-link to="/">Guide</router-link>
        </div>
        <div class="flex1">
          <router-link to="/Games">Games</router-link>
        </div>
        <div class="flex1">
          <router-link to="/Plays">Plays</router-link>
        </div>
        <div class="flex1">
          <router-link to="/About">About</router-link>
        </div>
      </div>
    </div>
    <main>
      <h1>Gamer Guide</h1>
      <router-view/>
    </main>
    <footer>&copy; 2019</footer>
  </div>
</template>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';

/*  Colors */
$whitish: #f6fedb;
$grayish: #9d9d9d;
$ltblue: #a6b1e1;
$blue: #064789;
$redish: #a31621;
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  margin: 0;
}
body {
  background: $whitish;
  font-size: 1.2em;
}
main {
  margin: 1em;
}
button {
  margin: 1em 0.5em 0;
}
input, textarea {
  display:inline-block;
  margin: 0.1em 0;
}
footer {
  background: $redish;
  color: $whitish;
  margin: 1em 0 0;
  text-align: center;
}
#nav {
  border: solid 1px $grayish;
  .dflex {
    text-align: center;
    :hover {
      background-color: $ltblue;
    }
  }
  .flex1 {
    border-top-color: $grayish;
    border-top-style:solid;
    border-top-width: 1px;
  }
  a {
    font-weight: bold;
    font-size: 1.2em;
    color: $grayish;
    text-decoration: none;
    width: 100%;
    &.router-link-exact-active {
      color: $redish;
    }
  }
}
/* classes */
.bigtx {
  display: inline-block;
  width: 68%;
  vertical-align: top;
}
.border {
  border: solid 1px $grayish;
  margin: 1em 0;
  padding: 1em;
  width: 100%;
}
.card {
  border: solid 1px $grayish;
  display: inline-block;
  margin: 1%;
  max-width: 40%;
  padding: 0.5em;
}
.inblock {
  display:inline-block;
}
.logo {
  height: 2em;
  width: 2em;
}
.logoplace {
  text-align: center;
}
.nbrsize {
  width: 10%;
}
.rownm {
  display:inline-block;
  text-align: right;
  width: 30%;
  margin: 0 1%;
}
.toasted-container .toasted.bubble {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1.5em;
}

// responsive change
@media (min-width: 768px) {
  #nav {
    position: relative;
    border: none;
    .dflex {
      text-align: center;
      display:flex;
      position: absolute;
      top:0;
      right:0;
      width: 25em;
      :hover {
        background-color: $ltblue;
      }
    }
    .flex1 {
      border: solid $grayish;
      border-width: 1px 0.5px;
      flex: 1;
      padding: 0.4em;
    }
    a {
      font-weight: bold;
      font-size: 1.2em;
      color: $grayish;
      text-decoration: none;
      width: 100%;
      &.router-link-exact-active {
        color: $redish;
      }
    }
  }
  body {
    font-size: 1em;
  }
  form {
    max-width: 80%;
  }
  main {
    margin: 0 5%;
  }
  .border {
    vertical-align: top;
    width: 45%;
    margin: 1%;
  }
  .logoplace {
    position: relative;
    top: 0;
    left: 0;
    text-align: left;
  }
  .rownm {
    width: 6em;
  }
}
</style>
