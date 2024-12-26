<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>Reverie</h1>
        <span>Here, your dreams come to life</span>
      </div>

      <div class="content-cards">
        <div class="filter-group">
          <Input
            v-for="input in filters"
            :id="input.id"
            :key="input.id"
            v-model="input.value"
            :type="input.type"
            :placeholder="input.placeholder"
            :label="input.label"
          />
        </div>
        <div>
          <Calendar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Input from "~/components/Input.vue";
import Calendar from "~/components/Calendar.vue";

export default {
  components: {
    Input,
    Calendar,
  },
  data() {
    return {
      filters: [
        {
          id: "input-title",
          placeholder: {
            name: "Buscar sonho por título",
            icon: "pi pi-search"
          },
          value: "",
          error: "",
          type: "text",
        },
        {
          id: "input-date",
          label: {
            name: "Filtrar por data",
            icon: "pi pi-calendar-clock"
          },
          value: "",
          error: "",
          type: "date",
        },
        {
          id: "input-mood",
          label: {
            name: "Filtrar por sentimento",
            icon: "pi pi-face-smile"
          },
          value: "",
          error: "",
          placeholder: "Todos os sentimentos",
          type: "text",
        },
      ],
    };
  },
};
</script>

<style lang="scss" setup>
.container {
  display: flex;
  justify-content: center;

  .content {
    width: 1280px;

    .header {
      max-width: 1280px;
      h1 {
        font-size: 2rem;
        font-weight: 400;
        color: $neutral-100-default-theme;
        margin-bottom: 0.5rem;
      }

      span {
        font-size: 1rem;
        color: $neutral-200-default-theme;
      }

      &::after {
        content: "";
        display: block;
        background-color: $black-600-default-theme;
        height: 1px;
        width: 100%;
        margin-top: 1.5rem;
      }
    }

    .content-cards {
      max-width: 1280px;
			margin-top: 2rem;

      .filter-group {
        @include card;
        max-width: 37rem;
        font-size: 14px;

				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 1.5rem;

				#input-title {
					grid-row: 1;
  				grid-column: span 2;
				}

        #input-date {
          grid-column: 1;
          grid-row: 2;
        }

        #input-mood {
					grid-row: 2;
          grid-column: 2;
				}
      }
    }
  }
}
</style>
