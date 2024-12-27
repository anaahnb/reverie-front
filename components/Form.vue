<template>
	<div class="form-container">
		<div class="date">
			{{ getDate }}
		</div>
		<div class="input-form-container">
			<Input
				class="input-form"
				v-for="input in form.inputs"
				:id="input.id"
				:key="input.id"
				v-model="input.value"
				:type="input.type"
				:placeholder="input.placeholder"
				:label="input.label" />
			<Button :disabled="isButtonDisabled"> Salvar </Button>
		</div>
	</div>
</template>

<script lang="ts">

import Button from './Button.vue';

export default {
	props: {
		selected: Date,
	},
	components: {
		Button,
	},
	data() {
		return {
			form: {
				inputs: [
					{
						id: 'input-title',
						label: 'Título',
						placeholder: 'Insira o título do sonho',
						value: "",
						error: "",
						type: "text",
					},
					{
						id: 'input-description',
						label: 'Descrição',
						placeholder: 'Insira a descrição do sonho',
						value: "",
						error: "",
						type: "textarea",
					}
				]
			}
		}
	},
	computed: {
		getDate() {
			const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
			return this.$props.selected?.toLocaleDateString("pt-br", options)
		},
		isButtonDisabled() {
      if (!this.form.inputs[0].value || !this.form.inputs[1].value) {
        return true;
      }
      return false;
    },
	}
}

</script>

<style lang="scss">
	.form-container {
		@include card;
		width: 595px;

		.date {
			font-size: 18px;
			font-weight: 500;
			color: $neutral-100-default-theme;
		}

		.input-form-container {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			margin-top: 1.5rem;
		}
	}
</style>