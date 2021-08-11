<template>
  <div class="carousel">
    <div v-if="!carousel">
      <button
        class="btn btn-outline-light d-block"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        Taqdimot
      </button>
      <div
        class="bg-dark m-2 p-3 rounded-3 collapse collapse-vertical"
        id="collapseWidthExample"
      >
        <button @click="startCarousel" class="button fs-4 active">
          Boshlash
        </button>
        <span class="text-white fs-4 fw-bold mt-3 d-block"
          >Aylanish davomiyligi</span
        >
        <button
          v-for="i in intervals"
          :key="i.time"
          :class="i.time / getAssociations.length == interval ? 'active' : ''"
          class="button my-1 d-block"
          @click="changeInterval(i.time)"
        >
          {{ i.title }}
        </button>
      </div>
    </div>

    <button v-if="carousel" @click="stopCarousel" class="button fs-4 active">
      Tugatish
    </button>
  </div>

  <div v-for="association in getAssociations.slice(a, b)" :key="association.id">
    <div class="container-fluid" style="height: 70vh">
      <div class="row d-flex align-items-center">
        <div @click="prev" class="col-12 col-md-2">
          <div class="d-flex justify-content-start">
            <div class="button display-1 px-3">&#60;</div>
          </div>
        </div>
        <div v-if="!loading" class="col-12 col-md-8 my-3 text-center">
          <img
            class="rounded-3"
            :src="`/resources/images/${association.name}.jpg`"
            alt="Image"
          />
        </div>
        <div
          v-else
          class="
            col-12 col-md-8
            my-3
            d-flex
            justify-content-center
            text-center
            align-items-center
          "
        >
          <div class="rounded-3 skeleton-loader"></div>
        </div>
        <div @click="next" class="col-12 col-md-2">
          <div class="d-flex justify-content-end">
            <div class="button display-1 px-3">&#62;</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading" class="container-fluid" style="height: 30vh">
      <div class="row">
        <div class="col-12 text-center">
          <div class="display-3 text-white fw-bold">
            <span class="text-shadow">
              {{ association.id }}
            </span>
          </div>
          <div class="display-1 text-white fw-bold">
            <span class="text-shadow">
              {{ association.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      carousel: false,
      interval: null,
      intervalNumber: null,
      intervals: [
        {
          time: 60000,
          title: "1 daqiqa",
        },
        {
          time: 180000,
          title: "3 daqiqa",
        },
        {
          time: 300000,
          title: "5 daqiqa",
        },
      ],
      a: 0,
      b: 1,
      currentAssociation: 1,
    };
  },
  name: "Home",
  computed: {
    ...mapGetters(["getAssociations"]),
  },
  methods: {
    ...mapActions(["fetchAssociations"]),
    changeInterval(interval) {
      this.interval = interval / this.getAssociations.length;
    },
    startCarousel() {
      this.autoNext();
      this.carousel = true;
    },
    stopCarousel() {
      clearInterval(this.intervalNumber);
      Object.assign(this.$data, this.$options.data());
    },
    autoNext() {
      let i = setInterval(() => {
        this.loading = true;
        if (this.currentAssociation === this.getAssociations.length) {
          this.currentAssociation = 1;
          this.a = 0;
          this.b = 1;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
          this.currentAssociation++;
          this.a++;
          this.b++;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }, this.interval);

      this.intervalNumber = i;
      console.log(this.intervalNumber);
    },
    next() {
      this.loading = true;
      if (this.currentAssociation === this.getAssociations.length) {
        this.currentAssociation = 1;
        this.a = 0;
        this.b = 1;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.currentAssociation++;
        this.a++;
        this.b++;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    prev() {
      this.loading = true;
      if (this.currentAssociation === 1) {
        this.currentAssociation = this.getAssociations.length;
        this.a = this.getAssociations.length - 1;
        this.b = this.getAssociations.length;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.currentAssociation--;
        this.a--;
        this.b--;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  mounted() {
    this.fetchAssociations().then(() => {
      console.log("Associations fetched...");
    });
  },
};
</script>

<style scoped>
.carousel {
  top: 1rem;
  right: 1rem;
  position: fixed;
}

.text-shadow {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.button {
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.5s;
}

.button:hover {
  transform: scale(1.25);
  transition: 0.5s;
}

.button.active {
  border-bottom: 2px solid #fff;
}

.skeleton-loader {
  box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
  width: 500px;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.skeleton-loader::before {
  content: "";
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes load {
  from {
    left: -150px;
  }

  to {
    left: 100%;
  }
}

@media (max-width: 768px) {
  img {
    width: 300px;
    height: 300px;
  }

  .skeleton-loader {
    width: 300px;
    height: 300px;
  }
}
</style>