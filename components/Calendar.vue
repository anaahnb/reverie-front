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
      <div
        v-for="day in calendarDays"
        :key="day.date"
        :class="[ 'day', { 'current-month': day.currentMonth }, { 'today': day.isToday } ]">
        {{ day.dayOfMonth }}
      </div>
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
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayWeekday = firstDayOfMonth.getDay();

      const previousMonth = new Date(this.currentYear, this.currentMonth - 1);
      const daysInPreviousMonth = new Date(
        this.currentYear,
        this.currentMonth,
        0
      ).getDate();
      const previousMonthDays = [];

      for (let i = firstDayWeekday - 1; i >= 0; i--) {
        previousMonthDays.push({
          date: new Date(
            previousMonth.getFullYear(),
            previousMonth.getMonth(),
            daysInPreviousMonth - i
          ),
          dayOfMonth: daysInPreviousMonth - i,
          currentMonth: false,
          isToday: false,
        });
      }

      const currentMonthDays = [];
      const today = new Date();

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(this.currentYear, this.currentMonth, i);
        currentMonthDays.push({
          date,
          dayOfMonth: i,
          currentMonth: true,
          isToday: date.toDateString() === today.toDateString(),
        });
      }

      const remainingDays = 35 - (previousMonthDays.length + currentMonthDays.length);
      const nextMonthDays = [];

      for (let i = 1; i <= remainingDays; i++) {
        nextMonthDays.push({
          date: new Date(this.currentYear, this.currentMonth + 1, i),
          dayOfMonth: i,
          currentMonth: false,
          isToday: false,
        });
      }

      return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    },
  },
};
</script>

<style lang="scss" setup>
.calendar {
  @include card;
  padding: 1.5rem;
  max-width: 37rem;
  margin-top: 2rem;

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
    padding: 1rem 0;
    margin-top: 1rem;

    .weekday {
      color: $neutral-200-default-theme;
    }
  }

  .days-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .day {
      padding: 1rem;
      text-align: center;

      &:hover {
        cursor: pointer;
        background: $black-600-default-theme;
        border-radius: 8px;
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
    }
  }
}
</style>
