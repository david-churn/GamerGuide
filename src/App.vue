<template>
  <div id="app">
    <div id="nav">
      <img alt="David logo" class="logo" src="./assets/David-logo.png">
      <router-link to="/">Guide</router-link> |
      <router-link to="/Games">Games</router-link> |
      <router-link to="/Plays">Plays</router-link> |
      <router-link to="/About">About</router-link>
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
  margin: 2em;
}
body {
  background: $whitish;
}
footer {
  background: $redish;
  color: $whitish;
  margin: 1em 0;
  text-align: center;
}
#nav {
  padding: 1em;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logo {
  height: 2em;
  width: 2em;
}
// Move the easy-toast messages down from the top border of the screen.
.et-wrapper.et-top {
  margin-top: 5em;
}
</style>
