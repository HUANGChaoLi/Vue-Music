<template lang="jade">
  .volume-picker
    //- md-ink-ripple
    .container(@click.stop='')
      .process-container
      .picker(ref="picker", style="bottom: 0px")
      .process(ref="process", style="height: 0px")
  
</template>

<script>

export default {
  name: 'volumePicker',
  props: ['changeVolume', 'currentVolume'],
  mounted () {
    let self = this
    let picker = self.$refs.picker
    let line = self.$refs.process
    picker.style.bottom = this.currentVolume * (135 - 20) + 20 + 'px'
    line.style.height = this.currentVolume * (135 - 20) + 5 + 'px'
    picker.onmousedown = function (e) {
      let oldY = e.clientY
      let bottom = parseInt(this.style.bottom)
      document.onmousemove = function (event) {
        let moveY = oldY - event.clientY
        let newY = moveY + bottom
        if (newY > 135) newY = 135
        if (newY < 20) newY = 20
        picker.style.bottom = newY + 'px'
        line.style.height = newY - 15 + 'px'
        self.changeVolume((newY - 20) / (135 - 20))
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  methods: {
    show (e) {
      console.log(e.clientX)
    }
  }
}

</script>

<style scoped>
.process-container, .process {
  width: 4px;
  position: absolute;
  left: 50%;
  bottom: 20px;
  margin-left: -2px;
  border-radius: 2px;
}
.process-container {
  background-color: rgba(0, 0, 0, .2);
  height: 80%;
}
.process {
  background-color: #3F51B5;
  height: 25px
}
.picker {
  width: 14px;
  height: 14px;
  position: absolute;
  background-color: #3F51B5;
  left: 50%;
  margin-left: -7px;
  border-radius: 50%;
  bottom: 40px;
  cursor: move;
}

.volume-picker {
  z-index: 10;
  background-color: white;
  width: 40px;
  height: 160px;
  border-radius: 4px 4px 4px 4px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotating 2s linear infinite;
}
</style>
