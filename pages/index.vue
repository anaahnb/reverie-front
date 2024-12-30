<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <h1>Bem vindo ao <b>Reverie</b> — o diário do seus sonhos.</h1>
        <p>Não possui uma conta? <a href="/register">Registre-se</a></p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-content">
          <Input
            v-for="input in form.inputs"
            :key="input.id"
            v-bind="input"
            v-model="input.value"
						:type="input.type"
          />
          <Button :disabled="isButtonDisabled"> Entrar </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { login } from '~/api/auth';

export default {
  components: {},
  data() {
    return {
      form: {
        inputs: [
          {
            id: "email",
            label: "Email",
            placeholder: "Insira o seu email",
            value: "",
            error: "",
						type: "email"
          },
          {
            id: "password",
            label: "Senha",
            placeholder: "Insira a sua senha",
            value: "",
            error: "",
						type: "password"
          },
        ],
      },
    };
  },
  computed: {
    isButtonDisabled() {
      if (!this.form.inputs[0].value || !this.form.inputs[1].value) {
        return true;
      }
      return false;
    },
  },
  methods: {
		handleSubmit() {
			const params = this.form.inputs.reduce((acc, input) => {
				acc[input.id] = input.value
				return acc
			}, {})

      console.log('params', params)
			login(params).then(res => {
				localStorage.setItem('token', res.authorisation.token)
				this.$router.push('/dreams')
			})
		},
  },
};
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: $black-900-default-theme;
  @include flex-column;
  justify-content: center;
  padding: 1.5rem 0;

  @media (min-width: 640px) {
    padding: 2rem 1, 5rem;
  }

  .container {
    @include flex-column;
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;

    .header {
      @include flex-center;
      @include flex-column;
      margin-bottom: 2rem;

      h1 {
        text-align: center;
      }
    }

    .form-content {
      @include card;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
