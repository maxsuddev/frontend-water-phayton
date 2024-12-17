<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">

      <!-- Dashboard Nav -->
      <li class="nav-item">
        <RouterLink :to="{ name: 'dashboard' }" class="nav-link">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </RouterLink>
      </li>

      <!-- User Control -->
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#user-control" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i>
          <span>User Control</span>
          <i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="user-control" class="nav-content collapse">
          <li>
            <RouterLink :to="{ name: 'user' }">
              <i class="bi bi-circle"></i>
              <span>User</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'role' }">
              <i class="bi bi-circle"></i>
              <span>Role</span>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Product Control -->
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#product-control" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i>
          <span>Product Control</span>
          <i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="product-control" class="nav-content collapse">
          <li>
            <RouterLink :to="{ name: 'category' }">
              <i class="bi bi-circle"></i>
              <span>Category</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'product' }">
              <i class="bi bi-circle"></i>
              <span>Product</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'product-variant' }">
              <i class="bi bi-circle"></i>
              <span>Product Variant</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'size' }">
              <i class="bi bi-circle"></i>
              <span>Product Size</span>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Import Control -->
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#import-control" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i>
          <span>Import Control</span>
          <i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="import-control" class="nav-content collapse">
          <li>
            <RouterLink :to="{ name: 'stock' }">
              <i class="bi bi-circle"></i>
              <span>Stock</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink :to="{ name: 'stock-movement' }">
              <i class="bi bi-circle"></i>
              <span>Stock Movement</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'supplier' }">
              <i class="bi bi-circle"></i>
              <span>Supplier</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'import-invoice' }">
              <i class="bi bi-circle"></i>
              <span>Import Invoice</span>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Export Control -->
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#export-control" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i>
          <span>Export Control</span>
          <i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="export-control" class="nav-content collapse">
          <li>
            <RouterLink :to="{ name: 'client' }">
              <i class="bi bi-circle"></i>
              <span>Client</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'export-invoice' }">
              <i class="bi bi-circle"></i>
              <span>Export Invoice</span>
            </RouterLink>
          </li>
        </ul>
      </li>

    </ul>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const toggleBtn = document.querySelector('.toggle-sidebar-btn');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('toggle-sidebar');
  });
});

</script>
