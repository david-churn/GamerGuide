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
    <h1>Gamer Guide</h1>
    <router-view/>
    <footer>&copy; 2019</footer>
  </div>
</template>

<style lang="scss">
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
  margin: 0 2em;
  font-size: 1.2em;
}
footer {
  background: $redish;
  color: $whitish;
  margin: 1em 0;
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
.logoplace {
  position:relative;
  top: 0;
  left: 47%;
}
.logo {
  height: 2em;
  width: 2em;
}
// Move the easy-toast messages down from the top border of the screen.
.et-wrapper.et-top {
  margin-top: 5em;
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
      width: 20em;
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
  .logoplace {
    position:relative;
    top: 0;
    left: 0;
  }
}
</style>
