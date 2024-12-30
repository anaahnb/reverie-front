<template>
  <div class="calendar">
    <div>
      <h2>
        {{ currentMonthName }}
        {{ currentYear }}
      </h2>
    </div>
    <div class="week-container">
      <div v-for="day in weekDays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>
    <div class="days-container">
      <button
        v-for="day in calendarDays"
        :key="day.date"
        :class="[ 'day', { 'current-month': day.currentMonth }, { 'today': day.isToday } ]"
        @click="selectDate(day.date)">
        {{ day.dayOfMonth }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      currentDate: new Date(),
    };
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString("pt-BR", {
        month: "long",
      });
    },
    calendarDays() {
      const today = new Date();

      const createDaysArray = (year: number, month: number, startDay: number, endDay: number, isCurrentMonth: boolean) => {
        return Array.from({ length: endDay - startDay + 1 }, (_, i) => {
          const dayOfMonth = startDay + i;
          const date = new Date(year, month, dayOfMonth);
          return {
            date,
            dayOfMonth,
            currentMonth: isCurrentMonth,
            isToday: date.toDateString() === today.toDateString(),
          };
        });
      };

      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayWeekday = firstDayOfMonth.getDay();

      const previousMonthDays = createDaysArray(
        this.currentYear,
        this.currentMonth - 1,
        new Date(this.currentYear, this.currentMonth, 0).getDate() - firstDayWeekday + 1,
        new Date(this.currentYear, this.currentMonth, 0).getDate(),
        false
      );

      const currentMonthDays = createDaysArray(
        this.currentYear,
        this.currentMonth,
        1,
        daysInMonth,
        true
      );

      const totalDisplayedDays = 35;
      const remainingDays = totalDisplayedDays - (previousMonthDays.length + currentMonthDays.length);
      const nextMonthDays = createDaysArray(
        this.currentYear,
        this.currentMonth + 1,
        1,
        remainingDays,
        false
      );

      return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
  },
  methods: {
    selectDate(date: Date) {
      this.$emit('date-selected', date);
    },
  }
};
</script>

<style lang="scss" setup>
.calendar {
  @include card;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 2rem 0;

  h2 {
    font-size: 24px;
    font-weight: 500;
    text-transform: capitalize;
    margin: 0;
    padding: 0;
  }

  .week-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-top: 1rem;

    .weekday {
      color: $neutral-200-default-theme;
      padding: .6875rem;
    }
  }

  .days-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .day {
      padding: 1rem;
      text-align: center;
      border: none;
      background: $black-700-default-theme;
      color: $neutral-100-default-theme;
      font-size: 1rem;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
        background: $black-600-default-theme;
      }

      &:focus {
        background: $black-300-default-theme;
      }

      &:not(.current-month) {
        opacity: 30%;

        &:hover {
          cursor: not-allowed;
        }
      }
    }

    .today {
      font-weight: bold;
      color: $highlight-color;
    }
  }
}
</style>
