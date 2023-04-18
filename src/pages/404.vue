<template>
  <div class="body-content">
    <main>
      <div class="row">
          <div class="lost-page"></div>
          <div class="col-md-6 align-self-center">
            <h1>404</h1>
            <h2>UH OH! You're lost.</h2>
            <p>
              The page you are looking for does not exist.
            </p>
            <p>
              How you got here is a mystery. But you can click the button below
              to go back to the homepage.
            </p>
            <button class="btn green" @click="goHome">HOME</button>
          </div>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
//@import url('https://fonts.googleapis.com/css?family=Arima');
:root {
  --blue: #0e0620;
  --white: #fff;
  --green: #2ccf6d;
}
.body-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:"Nunito Sans";
  //font-family:"Arima";
  color: var(--blue);
  font-size: 1em;
  background: #fff;
  height: 100vh;
}
button {
  font-family:"Nunito Sans";
}
h1 {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight:bold;
}
h2 {
  font-weight:bold;
}
.btn {
  z-index: 1;
  overflow: hidden;
  background: transparent;
  position: relative;
  padding: 8px 50px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  letter-spacing: 2px;
  transition: 0.2s ease;
  font-weight: bold;
  margin: 5px 0px;
  &.green {
   border: 4px solid var(--green);
   color: var(--blue);
    &:before {
     content: "";
     position: absolute;
     left: 0;
     top: 0;
     width: 0%;
     height: 100%;
     background: var(--green);
     z-index: -1;
     transition: 0.2s ease;
    }
    &:hover {
     color: var(--white);
     background: var(--green);
     transition: 0.2s ease;
      &:before {
       width: 100%;
     }
    }
  }
}
.row {
  margin-top: 4vh;
  display: flex;
}
.lost-page {
  width: 30vw;
  height: 20vw;
  background: url('/public/images/404.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
