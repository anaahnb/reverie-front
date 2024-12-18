<template>
  <div class="group">
		<label v-if="label" :for="id" class="input-label"> {{ label }} </label>
    <input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:required="required"
			:disabled="disabled"
			@input="updateValue"
      @focus="onFocus"
			:v-model="modelValue" />
		<span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
  export interface Input{
    id: string
    label?: string
    placeholder: string
    disabled: boolean
    type: string
    required: boolean
    errorMessage?: string
    modelValue: [string, number],
  }

	const props = withDefaults(defineProps<Input>(), {
		disabled: false,
		type: 'text',
		required: true,
	});

  const emit = defineEmits(["update:modelValue", "focus"]);
  const onFocus = () => emit("focus");
  const updateValue = (event: any) => {
    emit("update:modelValue", event.target.value);
  };
</script>

<style lang="scss" scoped>

.group {
  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    background-color: $black-600-default-theme;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: $neutral-100-default-theme;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2rem;
    box-sizing: border-box;

    &::placeholder {
      color: $neutral-200-default-theme;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba($black-300-default-theme, 0.5);
    }
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
}
</style>
