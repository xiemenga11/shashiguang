<template>
  <el-header class="header">
    <div class="header-container">
      <div class="logo">
        <img src="../../assets/logo.png" alt="纱时光" class="logo-image" />
        <span class="slogan">一窗守护家的美好时光</span>
      </div>
      <nav class="nav-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="background-color: rgba(0,0,0,0);"
          text-color="#333"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/products">产品展示</el-menu-item>
          <el-menu-item index="/about">公司介绍</el-menu-item>
          <el-menu-item index="/contact">联系我们</el-menu-item>
        </el-menu>
      </nav>
      <!-- <div class="contact-info">
        <el-button type="primary" @click="goToContact">联系我们</el-button>
      </div> -->
    </div>
  </el-header>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const activeIndex = ref(router.currentRoute.value.path)

    const handleSelect = (key) => {
      router.push(key)
    }

    const goToContact = () => {
      router.push('/contact')
    }

    return {
      activeIndex,
      handleSelect,
      goToContact
    }
  }
}
</script>

<style scoped>
.header {
  padding: 0 60px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  background-color: rgba(100, 100, 100, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* max-width: 1200px; */
  /* margin: 0 auto; */
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-image {
  height: 40px;
  width: auto;
}

.logo .slogan {
  font-size: 12px;
  color: white;
  font-style: italic;
}

.nav-menu {
  flex: 1;
  margin-left: 40px;
  background-color: none !important;
}

.contact-info {
  display: flex;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 10px 0;
  }
  
  .logo {
    margin-bottom: 10px;
  }
  
  .nav-menu {
    margin-left: 0;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  
  .contact-info {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>