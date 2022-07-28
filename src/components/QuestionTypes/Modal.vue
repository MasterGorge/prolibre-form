<template>
  <transition name="fade">
      <div class="vue-modal" v-show="open">
        <transition name="drop-in">
          <div class="vue-modal-inner" v-show="open">
            <div class="vue-modal">
                <div class="vue-modal-inner">
                    <div class="vue-modal-content">
                            <slot />
                            <button class="favorite styled" type="button" @click="$emit('close')"> Fermer</button>
                        </div>
                    </div>
                </div>
          </div>
      </transition>
     </div>
  </transition>
</template>
            

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  name:"modal",
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };
    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return { close };
  },
}
</script>

<style scoped>

button{
  background: red;
  border-radius:500px;
  font-size: 10px;

}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}


</style>