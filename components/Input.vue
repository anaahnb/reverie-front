<template>
  <div class="group" :id="id">
    <div v-if="label" class="input-label">
      <i v-if="labelIcon" :class="labelIcon"></i>
      <label v-if="labelName" :for="id">
        {{ labelName }}
      </label>
    </div>
    <div :class="['input-wrapper', { 'with-icon': inputIcon }]">
      <i v-if="inputIcon" :class="inputIcon"></i>
      <input
        :type="type"
        :placeholder="placeholderText"
        :required="required"
        :disabled="disabled"
        @input="updateValue"
        @focus="onFocus"
        :v-model="modelValue" />
    </div>
		<span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">

  export interface Label {
    name?: string,
    icon?: string,
  }

  export interface Placeholder {
    name?: string,
    icon?: string,
  }

  export interface Input {
    id: string
    label?: Label | string
    placeholder?: Placeholder | string
    disabled?: boolean
    type?: string
    required?: boolean
    errorMessage?: string
    modelValue: string[] | string,
  }

	const props = withDefaults(defineProps<Input>(), {
		disabled: false,
		type: 'text',
		required: true,
	});

  const labelIcon = computed(() =>
    typeof props.label === "object" ? props.label.icon : null
  )

  const labelName = computed(() =>
    typeof props.label === "object" ? props.label.name : props.label
  )

  const placeholderText = computed(() =>
    typeof props.placeholder === "object" ? props.placeholder.name : props.placeholder
  )

  const inputIcon = computed(() =>
    typeof props.placeholder === "object" ? props.placeholder.icon : null
  )

  const emit = defineEmits(["update:modelValue", "focus"])
  const onFocus = () => emit("focus")
  const updateValue = (event: any) => {
    emit("update:modelValue", event.target.value)
  }
</script>

<style lang="scss" scoped>
  @import 'primeicons/primeicons.css';

.group {
  .input-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: .75rem;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    i {
      position: absolute;
      left: 1rem;
      color: $neutral-200-default-theme;
      font-size: 1.2rem;
    }

    input {
      width: 100%;
      max-height: 2.625rem;
      background-color: $black-600-default-theme;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      color: $neutral-100-default-theme;
      font-size: 16px;
      font-weight: 500;
      box-sizing: border-box;

      &::placeholder {
        color: $neutral-200-default-theme;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba($black-300-default-theme, 0.5);
      }

      &::-ms-reveal {
        filter: invert(100%);
      }

      &::-webkit-calendar-picker-indicator {
        display: none
      }

      &[type="date"] {
        @include font;
        font-weight: 400;
      }
    }

    &.with-icon input {
      padding-left: 3rem;
      padding-top: .9375rem;
    }
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
}
</style>
