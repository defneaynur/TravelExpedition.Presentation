<template>
    <div id="CssLoader" v-if="isShow">
      <!-- <div class="loadingspinner" v-if="true">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div> -->
      <!-- <div class="loadingspinner"> -->
        <div class="square-1" v-if="NotSelected"></div>
        <br>
        <div class="square-2" v-if="NotSelected"></div>
        <br>
        <div class="square-3" v-if="NotSelected"></div>
        <br>
        <div class="square-4" v-if="NotSelected"></div>
        <br>
        <div class="square-5" v-if="NotSelected"></div>
        <div class="square-6" v-if="NotSelected"></div>
        <div class="square-7" v-if="NotSelected"></div>
        <div class="square-8" v-if="NotSelected"></div>
        <div class="square-9" v-if="NotSelected"></div>
        <div class="square-10" v-if="NotSelected"></div>
        <div class="square-11" v-if="NotSelected"></div>
        <div class="customLoader" v-if="Selected">       
          <v-card
            color="teal-lighten-2"
          >
            <v-card-text >    
              YOUR TRANSACTION IS IN PROGRESS. PLEASE WAIT.
              <div class="text-center mt-3 mb-1">
            <v-progress-circular
              :size="50"
              color="white"
              indeterminate
            ></v-progress-circular>
      </div>
      </v-card-text>
    </v-card>
 
        </div>
      </div>
    <!-- </div> -->
  </template>
  <script>
  export default {
    data() {
      return {
        isShow: false,
        NotSelected:false,
        Selected:true,
      }
    },
    methods: {
      toggle(param) {
        this.isShow = param;
      },
    }
  }
  </script>
  
<style scoped>
.square-1 {
  display:flex;
  gap:5px;
  animation:s1-0 1s infinite;
}
.square-1:before,
.square-1:after {
  content:"";
  width:25px;
  aspect-ratio:1;
  box-shadow:0 0 0 3px inset #fff;
  transform-origin:top right;
  animation:s1-1 1s infinite;
}
.square-1:after {
  transform-origin:top left;
  --s:-1;
}
@keyframes s1-0 {
  to {transform:translateY(100%)}
}
@keyframes s1-1 {
  to {transform:rotate(calc(var(--s,1)*90deg))}
}

.square-2 {
  display:flex;
  gap:5px;
  animation:s2-0 1s infinite;
}
.square-2:before,
.square-2:after {
  content:"";
  width:25px;
  aspect-ratio:1;
  box-shadow:0 0 0 3px inset #fff;
  animation:s2-1 1s infinite;
}
.square-2:after {
  --s:-1;
}
@keyframes s2-0 {
  0%,
  50% {transform:rotate(0deg)}
  80%,
  100% {transform:rotate(180deg)}
}
@keyframes s2-1 {
  0%   {transform:translate(0)}
  50%,
  80%  {transform:translate(calc(var(--s,1)*2.5px))}
  100% {transform:translate(0)}
}

.square-3{
  display:flex;
  gap:5px;
  animation:s3-0 1s infinite;
  transform-origin:50% calc(100% + 2.5px);
}
.square-3:before,
.square-3:after {
  content:"";
  width:25px;
  aspect-ratio:1;
  box-shadow:0 0 0 3px inset #fff;
}
.square-3:after {
  transform-origin:-2.5px calc(100% + 2.5px);
  animation:s3-1 1s infinite;
}
@keyframes s3-1 {
  50%,
  100% {transform:rotate(180deg)}
}
@keyframes s3-0 {
  0%,
  50%  {transform:rotate(0deg)}
  100% {transform:rotate(90deg)}
}

.square-4 {
  display:flex;
  gap:5px;
}
.square-4:before,
.square-4:after {
  content:"";
  width:25px;
  aspect-ratio:1;
  box-shadow:0 0 0 3px inset #fff;
  animation:s4 1.5s infinite;
}
.square-4:after {
  --s:-1;
  animation-delay:0.75s
}
@keyframes s4 {
  0%     {transform:scaleX(var(--s,1)) translate(0) rotate(0)}
  16.67% {transform:scaleX(var(--s,1)) translate(-50%) rotate(0)}
  33.33% {transform:scaleX(var(--s,1)) translate(-50%) rotate(90deg)}
  50%,
  100%   {transform:scaleX(var(--s,1)) translate(0) rotate(90deg)}
}

.square-5 {
  display:flex;
  gap:5px;
}
.square-5:before,
.square-5:after {
  content:"";
  width:25px;
  aspect-ratio:1;
  box-shadow:0 0 0 3px inset #fff;
  animation:s5 1.5s infinite;
}
.square-5:after {
  --s:-1;
}
@keyframes s5 {
  0%   {transform:scaleX(var(--s,1)) translate(0) scale(1)}
  33%  {transform:scaleX(var(--s,1)) translate(calc(50% + 2.5px)) scale(1)}
  66%  {transform:scaleX(var(--s,1)) translate(calc(50% + 2.5px)) scale(2)}
  100% {transform:scaleX(var(--s,1)) translate(0) scale(1)}
}

.square-6 {
  width:85px;
  height:35px;
  --g1:conic-gradient(from  90deg at 3px  3px ,#0000 90deg,#fff 0);
  --g2:conic-gradient(from -90deg at 22px 22px,#0000 90deg,#fff 0);
  background:var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
  background-size:25px 25px;
  background-repeat:no-repeat;
  animation:s6 1s infinite alternate;
}
@keyframes s6 {
  0%   {background-position:0 50% ,50% 50% ,100% 50% }
  20%  {background-position:0 0   ,50% 50% ,100% 50% }
  40%  {background-position:0 100%,50%  0  ,100% 50% }
  60%  {background-position:0 50% ,50% 100%,100% 0   }
  80%  {background-position:0 50% ,50% 50% ,100% 100%}
  100% {background-position:0 50% ,50% 50% ,100% 50% }
}

.square-7 {
  width:55px;
  aspect-ratio:1;
  --g1:conic-gradient(from  90deg at 3px  3px ,#0000 90deg,#fff 0);
  --g2:conic-gradient(from -90deg at 22px 22px,#0000 90deg,#fff 0);
  background:var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
  background-size:25px 25px;
  background-repeat:no-repeat;
  animation:s7 1.5s infinite;
}
@keyframes s7 {
  0%   {background-position:0    0   ,0 100%,100% 100% }
  25%  {background-position:100% 0   ,0 100%,100% 100% }
  50%  {background-position:100% 0   ,0 0   ,100% 100% }
  75%  {background-position:100% 0   ,0 0   ,0    100% }
  100% {background-position:100% 100%,0 0   ,0    100% }
}

.square-8 {
  width:85px;
  height:25px;
  --g1:conic-gradient(from  90deg at left   3px top   3px,#0000 90deg,#fff 0);
  --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#fff 0);
  background:var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
  background-position:left,center,right;
  background-repeat:no-repeat;
  animation:s8 1s infinite;
}
@keyframes s8 {
  0%   {background-size:25px 100%,25px 100%,25px 100%}
  20%  {background-size:25px 50% ,25px 100%,25px 100%}
  40%  {background-size:25px 50% ,25px 50% ,25px 100%}
  60%  {background-size:25px 100%,25px 50% ,25px 50% }
  80%  {background-size:25px 100%,25px 100%,25px 50% }
  100% {background-size:25px 100%,25px 100%,25px 100%}
}

.square-9 {
  width:85px;
  height:50px;
  --g1:conic-gradient(from  90deg at left   3px top   3px,#0000 90deg,#18612f 0);
  --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#18612f 0);
  background:var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
  background-position:left,center,right;
  background-repeat:no-repeat;
  animation:s9 1s infinite;
}
@keyframes s9 {
  0%   {background-size:25px 50% ,25px 50% ,25px 50%}
  25%  {background-size:25px 100%,25px 50% ,25px 50%}
  50%  {background-size:25px 50% ,25px 100%,25px 50%}
  75%  {background-size:25px 50% ,25px 50% ,25px 100%}
  100% {background-size:25px 50% ,25px 50% ,25px 50%}
}

.square-10 {
  width:85px;
  height:50px;
  --g1:conic-gradient(from  90deg at left   3px top   3px,#0000 90deg,#fff 0);
  --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#fff 0);
  background:var(--g1),var(--g1),var(--g1), var(--g2),var(--g2),var(--g2);
  background-position:left,center,right;
  background-repeat:no-repeat;
  animation:s10 1s infinite alternate;
}
@keyframes s10 {
  0%,
  2%   {background-size:25px 50% ,25px 50% ,25px 50%}
  20%  {background-size:25px 25% ,25px 50% ,25px 50%}
  40%  {background-size:25px 100%,25px 25% ,25px 50%}
  60%  {background-size:25px 50% ,25px 100%,25px 25%}
  80%  {background-size:25px 50% ,25px 50% ,25px 100%}
  98%,
  100% {background-size:25px 50% ,25px 50% ,25px 50%}
}

.square-11 {
  width:55px;
  aspect-ratio:1;
  --g1:conic-gradient(from  90deg at top    3px left  3px,#0000 90deg,#fff 0);
  --g2:conic-gradient(from -90deg at bottom 3px right 3px,#0000 90deg,#fff 0);
  background:
    var(--g1),var(--g1),var(--g1),var(--g1), 
    var(--g2),var(--g2),var(--g2),var(--g2);
  background-position:0 0,100% 0,100% 100%,0 100%;
  background-size:25px 25px;
  background-repeat:no-repeat;
  animation:s11 1.5s infinite;
}
@keyframes s11 {
  0%   {background-size:35px 15px,15px 15px,15px 35px,35px 35px}
  25%  {background-size:35px 35px,15px 35px,15px 15px,35px 15px}
  50%  {background-size:15px 35px,35px 35px,35px 15px,15px 15px}
  75%  {background-size:15px 15px,35px 15px,35px 35px,15px 35px}
  100% {background-size:35px 15px,15px 15px,15px 35px,35px 35px}
}
/**/
body {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
  grid-auto-rows: 130px;
  place-items:center;
  background:#000;
}

* {
  box-sizing: border-box;
}
.loadingspinner {
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;
}

.loadingspinner div {
  display: inline-block;
  background: teal;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;
}

.loadingspinner #square1 {
  left: calc( 0 * var(--offset) );
  top: calc( 0 * var(--offset) );
  animation: square1 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square2 {
  left: calc( 0 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: square2 var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square3 {
  left: calc( 1 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: square3 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square4 {
  left: calc( 2 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: square4 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;
}

.loadingspinner #square5 {
  left: calc( 3 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: square5 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
}

@keyframes square1 {
  0% {
    left: calc( 0 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  8.333% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
}

@keyframes square2 {
  0% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  8.333% {
    left: calc( 0 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  16.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  25.00% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  83.33% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  91.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  100% {
    left: calc( 0 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }
}

@keyframes square3 {
  0%,100% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  16.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  25.00% {
    left: calc( 1 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  33.33% {
    left: calc( 2 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  41.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  66.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  75.00% {
    left: calc( 2 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  83.33% {
    left: calc( 1 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  91.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
}

@keyframes square4 {
  0% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  33.33% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  41.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  50.00% {
    left: calc( 3 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  58.33% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
}

@keyframes square5 {
  0% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  50.00% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  58.33% {
    left: calc( 3 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  66.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  75.00% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
}

@keyframes squarefadein {
  0% {
    transform: scale(0.75);
    opacity: 0.0;
  }

  100% {
    transform: scale(1.0);
    opacity: 1.0;
  }
}

#CssLoader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(63, 68, 77, 0.7);
  z-index: 9999;
}

</style>