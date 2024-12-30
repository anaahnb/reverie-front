<template>
  <div class="radio-button">
    <input
      :id="id"
      type="radio"
      :name="name"
      :option="modelValue"
      />
    <div class="label-group">
      <i v-if="iconText" :class="iconText" :style="{ color: iconColor }" />
      <label :for="id"> {{ label }} </label>
    </div>
  </div>
</template>

<script lang="ts" setup>

export interface Icon {
  text: string,
  color?: string,
}

export interface Radio {
  id: string
  label: string
  icon?: Icon,
  name: string
  disabled: boolean
  type: string
  required: boolean
  modelValue: string[] | string,
}

const props = withDefaults(defineProps<Radio>(), {
  disabled: false,
  required: true,
});

const iconText = computed(() =>
  typeof props.icon === "object" ? props.icon.text : props.icon
)

const iconColor = computed(() =>
  typeof props.icon === "object" ? props.icon.color : '#E8E8E9'
)

</script>

<style lang="scss">
  @import 'primeicons/primeicons.css';

  .radio-button {
    display: flex;
    align-items: center;
    padding: .75rem;
    background-color: $black-600-default-theme;
    border-radius: 8px;
    max-width: 100%;

    .label-group {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-left: 8px;
      font-size: 16px;

      label {
        color: $neutral-100-default-theme
      }

      i {
        font-size: 20px;
      }
    }
  }
</style>
