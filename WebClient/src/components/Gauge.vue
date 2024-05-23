<template>
  <div class="gauge-container font-mono">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid" class="gauge font-mono ">
      <text :x="centerX" :y="centerY" class="value font-mono">
        {{ tweenedValue.toFixed(decimals) }}
      </text>
      <path class="arc below-needle" :d="belowNeedlePathData"></path>
      <path class="arc gap" :class="{ exceeding: exceeding }" :d="gapPathData"></path>
      <path v-if="threshold" class="arc above-threshold" :d="aboveThresholdPathData"></path>
    </svg>
    <button v-if="custom" @click="goToDetailPage(type)" class="detail-button">Detail</button>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    attr: {
      type: String,
      required: false,
      default: "" 
    },
    custom:{
      type: String,
      required: false,
      default: true
    },
    value: {
      type: Number,
      required: false,
      default: 0.5,
    },
    threshold: {
      type: Number,
      required: false,
      default: null,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 100,
    },
    decimals: {
      type: Number,
      required: false,
      default: 0
    },
    
  },

  data() {
    return {
      tweenedValue: null,
      realThreshold: null,
      centerX: 50,
      centerY: 50,
      innerArcRadius: 20,
      outerArcRadius: 30,
      arcStartAngle: 135,
      arcEndAngle: 405,
      animationInterval: null
    }
  },

  computed: {
    angleRange() {
      return this.arcEndAngle - this.arcStartAngle
    },

    scaledValue() {
      return (this.tweenedValue - this.min) / (this.max - this.min)
    },

    scaledThreshold() {
      return (this.realThreshold - this.min) / (this.max - this.min)
    },

    valueAngle() {
      let angleAdd = this.scaledValue * this.angleRange
      return this.arcStartAngle + angleAdd
    },

    thresholdAngle() {
      return this.scaledThreshold * this.angleRange + this.arcStartAngle
    },

    exceeding() {
      return this.scaledValue >= this.scaledThreshold
    },

    belowNeedlePathData() {
      if (!this.exceeding) {
        return this.getArcPathData(this.arcStartAngle, this.valueAngle)
      } else {
        return this.getArcPathData(this.arcStartAngle, this.thresholdAngle)
      }
    },

    gapPathData() {
      if (!this.exceeding) {
        return this.getArcPathData(this.valueAngle, this.thresholdAngle)
      } else {
        return this.getArcPathData(this.thresholdAngle, this.valueAngle)
      }
    },

    aboveThresholdPathData() {
      if (!this.exceeding) {
        return this.getArcPathData(this.thresholdAngle, this.arcEndAngle)
      } else {
        return this.getArcPathData(this.valueAngle, this.arcEndAngle)
      }
    },
  },

  watch: {
    value() {
      this.animateNeedle()
    },

    threshold() {
      this.setupThreshold()
      this.animateNeedle()
    }
  },

  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/details', query: { type: this.attr }});
    },
    getCirclePoint(radius, angle) {
      let x = this.centerX + Math.cos((angle / 180) * Math.PI) * radius
      let y = this.centerY + Math.sin((angle / 180) * Math.PI) * radius
      let xy = {
        x: x,
        y: y,
      }
      return xy
    },

    getArcPathData(angleStart, angleEnd) {
      let angleDiff = angleEnd - angleStart
      let xy = this.getCirclePoint(this.innerArcRadius, angleStart)
      let d = `M ${xy.x} ${xy.y}`
      xy = this.getCirclePoint(this.innerArcRadius, angleEnd)
      if (angleDiff < 180) {
        d += ` A ${this.innerArcRadius} ${this.innerArcRadius} 0 0 1 ${xy.x} ${xy.y}`
      } else {
        d += ` A ${this.innerArcRadius} ${this.innerArcRadius} 0 1 1 ${xy.x} ${xy.y}`
      }
      xy = this.getCirclePoint(this.outerArcRadius, angleEnd)
      d += ` L ${xy.x} ${xy.y}`
      xy = this.getCirclePoint(this.outerArcRadius, angleStart)
      if (angleDiff < 180) {
        d += ` A ${this.outerArcRadius} ${this.outerArcRadius} 0 0 0 ${xy.x} ${xy.y}`
      } else {
        d += ` A ${this.outerArcRadius} ${this.outerArcRadius} 0 1 0 ${xy.x} ${xy.y}`
      }
      xy = this.getCirclePoint(this.innerArcRadius, angleStart)
      d += ` L ${xy.x} ${xy.y}`
      return d
    },

    setupThreshold() {
      if (this.threshold === null) {
        this.realThreshold = this.max
      } else {
        this.realThreshold = this.threshold
      }
    },

    animateNeedle() {
      this.tweenedValue = this.min
      gsap.to(this, { duration: 0.5, tweenedValue: Number(this.value) || this.min })

    }
  },

  created() {
    this.setupThreshold()
    this.animateNeedle()
  },

  destroyed() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #666;
$value-color: #333;
$arc-below-needle: #4a90e2;
$arc-above-threshold: #ff6262;
$arc-gap: #ADD8E6;
$arc-gap-exceeding: #ff5733;

// $border-color: linear-gradient(90deg, #666, darken(#666, 20%));
// $value-color: linear-gradient(90deg, #333, lighten(#333, 20%));
// $arc-below-needle: linear-gradient(90deg, #4a90e2, lighten(#4a90e2, 20%));
// $arc-above-threshold: linear-gradient(90deg, #ff9999, darken(#ff9999, 20%));
// $arc-gap: linear-gradient(90deg, #ADD8E6, darken(#ADD8E6, 20%));
// $arc-gap-exceeding: linear-gradient(90deg, #ff5733, darken(#ff5733, 20%));


@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gauge-container {
  position: relative;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, #3dc444, #ff9999);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;

  .gauge {
    stroke-linejoin: round;

    .value {
      fill: $value-color;
      font-size: 1rem;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .arc {
      &.below-needle {
        fill: $arc-below-needle;
      }

      &.above-threshold {
        fill: $arc-above-threshold;
      }

      &.gap {
        fill: $arc-gap;

        &.exceeding {
          fill: $arc-gap-exceeding;
        }
      }
    }
  }
}

.my-bg {
  background-color: #27293B;
}
.detail-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.detail-button:hover {
  background-color: #0056b3;
}
</style>
