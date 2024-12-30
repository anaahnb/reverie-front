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

				<div class="input-radio-group">
					<Radio
						class="input-radio-form"
						v-for="radio in form.radio"
						name="mood"
						:id="radio.id"
						:key="radio.id"
						:model-value="radio.option"
						:type="radio.type"
						:label="radio.label"
						:icon="radio.icon"
						required />
				</div>

			<Button :disabled="isButtonDisabled"> Salvar </Button>
		</div>
	</div>
</template>

<script lang="ts">

import Button from './Button.vue';
import Radio from './Radio.vue';

export default {
	props: {
		selected: Date,
	},
	components: {
		Button,
		Radio,
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
				],
				radio: [
					{
						id: 'input-mood-happy',
						label: 'Alegre',
						icon: {
							text: 'pi pi-sun',
							color: '#FACC15'
						},
						option: 'alegre',
						type: "radio",
					},
					{
						id: 'input-mood-neutral',
						label: 'Neutro',
						icon: {
							text: 'pi pi-cloud',
							color: '#A1A1AA'
						},
						option: 'neutral',
						type: "radio",
					},
					{
						id: 'input-mood-scary',
						label: 'Neutro',
						icon: {
							text: 'pi pi-moon',
							color: '#818CF8'
						},
						option: 'scary',
						type: "radio",
					},
					{
						id: 'input-mood-mysterious',
						label: 'Misterioso',
						icon: {
							text: 'pi pi-asterisk',
							color: '#C084FC'
						},
						option: 'mysterious',
						type: "radio",
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
			box-sizing: border-box;

			.input-radio-group {
				display: grid;
				grid-template-columns: 1fr 1fr;
        gap: 1.5rem;

			}
		}
	}
</style>