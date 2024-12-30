<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>Reverie</h1>
        <span>Here your dreams come to life</span>
      </div>

      <div class="cards-group">
        <div>
          <div class="card-filter-group">
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
          <div class="card-calendar">
            <Calendar @date-selected="updateSelectedDate" />
          </div>
        </div>
        <div class="card-form">
          <Form
            :selected="data.selected" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Input from "~/components/Input.vue";
import Calendar from "~/components/Calendar.vue";
import Form from "~/components/Form.vue";

export default {
  components: {
    Input,
    Calendar,
    Form,
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
      data: {
        selected: new Date(),
      }
    };
  },
  methods: {
    updateSelectedDate(date: Date) {
      this.data.selected = date
    },
  },
};
</script>

<style lang="scss" setup>
.container {
  .content {
    max-width: 1280px;
    margin: 0 auto;

    .header {
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

    .cards-group {
      margin-top: 2rem;

      .card-filter-group {
        @include card;
        font-size: 14px;

        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 425px) {
        .card-filter-group {
          grid-template-columns: 1fr 1fr;
        }
      
        #input-title {
          grid-column: span 2;
        }
      }
    }

    @media (min-width: 426px) {
      .cards-group {
        display: grid;
        grid-template-areas:
          "filters form"
          "calendar form";
          grid-template-columns: 1fr minmax(0, 40rem);
        gap: 2rem;
      }

      .card-filter-group { grid-area: filters; }
      .card-calendar { grid-area: calendar; }
      .form-calendar { grid-area: form; }
    }
  }
}
</style>
