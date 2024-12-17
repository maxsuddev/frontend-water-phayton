<template>
  <div class="datatable-bottom">
    <div class="datatable-info">
      Total entries: {{ totalEntries }}
    </div>
    <nav class="datatable-pagination ml-auto ">
      <ul class="datatable-pagination-list">
        <!-- Previous Button -->
        <li
            class="datatable-pagination-list-item"
            :class="{ 'datatable-disabled': currentPage === 1 }"
        >
          <button
              @click.prevent="changePage(currentPage - 1)"
              :aria-label="`Page ${currentPage - 1}`"
              class="datatable-pagination-list-item-link"
          >
            ‹
          </button>
        </li>

        <!-- Ellipsis Before -->
        <li
            v-if="showEllipsisBefore"
            class="datatable-pagination-list-item datatable-ellipsis datatable-disabled"
        >
          <button class="datatable-pagination-list-item-link">…</button>
        </li>

        <!-- Page Numbers -->
        <li
            v-for="page in visiblePages"
            :key="page"
            class="datatable-pagination-list-item"
            :class="{ 'datatable-active': currentPage === page }"
        >
          <button
              @click.prevent="changePage(page)"
              :aria-label="`Page ${page}`"
              class="datatable-pagination-list-item-link"
          >
            {{ page }}
          </button>
        </li>

        <!-- Ellipsis After -->
        <li
            v-if="showEllipsisAfter"
            class="datatable-pagination-list-item datatable-ellipsis datatable-disabled"
        >
          <button class="datatable-pagination-list-item-link">…</button>
        </li>

        <!-- Next Button -->
        <li
            class="datatable-pagination-list-item"
            :class="{ 'datatable-disabled': currentPage === totalPages }"
        >
          <button
              @click.prevent="changePage(currentPage + 1)"
              :aria-label="`Page ${currentPage + 1}`"
              class="datatable-pagination-list-item-link"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue';

export default defineComponent({
  props: {
    totalEntries: Number,
    currentPage: Number,
    totalPages: Number,
    maxVisiblePages: Number,
  },
  setup(props, {emit}) {
    const { totalEntries, currentPage, totalPages, maxVisiblePages} = toRefs(props);

    const visiblePages = computed(() => {
      const pages = [];
      const halfVisible = Math.floor(maxVisiblePages.value / 2);
      let start = currentPage.value - halfVisible;
      let end = currentPage.value + halfVisible;

      if (start < 1) {
        start = 1;
        end = Math.min(maxVisiblePages.value, totalPages.value);
      }

      if (end > totalPages.value) {
        end = totalPages.value;
        start = Math.max(totalPages.value - maxVisiblePages.value + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    });

    const showEllipsisBefore = computed(() => currentPage.value > Math.ceil(maxVisiblePages.value / 2));
    const showEllipsisAfter = computed(() => currentPage.value < totalPages.value - Math.floor(maxVisiblePages.value / 2) && totalPages.value > maxVisiblePages.value);

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        emit("page-change", page);
      }
    };

    return {
      totalEntries,
      currentPage,
      totalPages,
      maxVisiblePages,
      visiblePages,
      showEllipsisBefore,
      showEllipsisAfter,
      changePage,
    };
  },
});
</script>

<style scoped>
.datatable-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}</style>
