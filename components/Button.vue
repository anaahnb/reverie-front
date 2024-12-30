<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface Button {
  type?: "submit" | "button" | "reset";
  disabled: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Button>(), {
  type: "submit",
  disabled: false,
  loading: false,
});

const emit = defineEmits(["click"]);
const onClick = (event: any) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};

const buttonClasses = computed(() => ({
  disabled: props.disabled,
  loading: props.loading,
}));
</script>

<style lang="scss" scoped>

button {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 0;
  background-color: $highlight-color;
  color: $black-900-default-theme;
  font-weight: 600;
  font-size: 1rem;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background-color: $state-hover-button;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px $black-900-default-theme,
      0 0 0 4px rgba($black-300-default-theme, 0.5);
  }

  &.disabled {
    background-color: $state-disabled-default-theme;
    cursor: not-allowed;
    color: $neutral-100-default-theme;
    font-weight: 500;
  }
}
</style>
