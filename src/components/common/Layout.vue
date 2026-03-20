<template>
  <div class="layout">
    <Header />
    <el-main class="main-content">
      <router-view />
    </el-main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 0;
  width: 100%;
  /* 导航栏高度60px，需要留出空间 */
  padding-top: 60px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 120px;
  }
}
</style>
