<template>
  <section class="catalog-page">
    <div class="container toolbar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索产品"
        clearable
        prefix-icon="el-icon-search"
        style="width: 320px;"
      ></el-input>
      <el-select v-model="selectedCategory" placeholder="筛选分类" clearable style="margin-left: 12px; min-width: 180px;">
        <el-option label="全部" value=""></el-option>
        <el-option
          v-for="cat in categories"
          :key="cat"
          :label="cat"
          :value="cat"
        />
      </el-select>
      <el-select v-model="sortKey" placeholder="排序方式" clearable style="margin-left: 12px; min-width: 200px;">
        <el-option label="价格：低到高" value="price-asc"></el-option>
        <el-option label="价格：高到低" value="price-desc"></el-option>
        <el-option label="评分" value="rating"></el-option>
        <el-option label="新近上市" value="newest"></el-option>
      </el-select>
    </div>

    <section class="container grid-section">
      <div class="grid">
        <div
          class="card"
          v-for="p in filteredProducts"
          :key="p.id"
        >
          <div class="card-media" @click="goToProductDetail(p.id)" role="button" aria-label="查看详情">
            <img :src="p.image" :alt="p.name" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-title" :title="p.name">{{ p.name }}</div>
            <div class="card-meta">
              <span class="category">{{ p.category }}</span>
              <span class="badge" v-if="p.badge">{{ p.badge }}</span>
            </div>
            <el-rate :model-value="p.rating" :disabled="true" show-score style="font-size:14px"></el-rate>
            <div class="price">￥{{ p.price }}</div>
          </div>
        </div>
      </div>
    </section>

    <el-dialog :visible.sync="detailVisible" width="800px" title="产品详情">
      <div v-if="currentProduct">
        <div class="detail-gallery">
          <img v-for="(src, idx) in currentProduct.images" :key="idx" :src="src" :alt="currentProduct.name + ' 图 ' + (idx+1)" loading="lazy" />
        </div>
        <h3 style="margin-top:16px">{{ currentProduct.name }}</h3>
        <p>{{ currentProduct.description }}</p>
        <ul>
          <li v-for="(f, i) in (currentProduct.features || (currentProduct.shortDescription ? [currentProduct.shortDescription] : [currentProduct.description || '']))" :key="i">{{ f }}</li>
        </ul>
        <p>价格: ￥{{ currentProduct.price }}</p>
      </div>
    </el-dialog>
  </section>
  </template>

<script>
import { ref, computed } from 'vue'
import productsData from '../data/products.json'

export default {
  name: 'ProductShowcase',
  setup() {
    const allProducts = ref(productsData.products || [])
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortKey = ref('price-asc')
    const detailVisible = ref(false)
    const currentProduct = ref(null)

    const categories = computed(() => {
      const set = new Set(allProducts.value.map(p => p.category))
      return Array.from(set)
    })

    const filteredProducts = computed(() => {
      let list = allProducts.value.slice()

      if (selectedCategory.value) {
        list = list.filter(p => p.category === selectedCategory.value)
      }
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase()
        list = list.filter(p => (p.name + ' ' + (p.shortDescription || '')).toLowerCase().includes(q))
      }
      switch (sortKey.value) {
        case 'price-asc':
          list.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          list.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          list.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          list.sort((a, b) => (b.id > a.id) ? 1 : -1)
          break
      }
      return list
    })

    const openDetail = (p) => {
      currentProduct.value = p
      detailVisible.value = true
    }

    const goToProductDetail = (productId) => {
      router.push(`/catalog/${productId}`)
    }

    return {
      searchQuery,
      selectedCategory,
      sortKey,
      categories,
      filteredProducts,
      detailVisible,
      currentProduct,
      openDetail,
      goToProductDetail
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
}
.grid-section {
  padding: 20px 0 40px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.2s ease;
  cursor: pointer;
}
.card:hover { transform: translateY(-2px); }
.card-media { height: 180px; overflow: hidden; background: #f5f5f5; display:flex; align-items:center; justify-content:center; }
.card-media img { width: 100%; height: 100%; object-fit: cover; }
.card-body { padding: 12px 14px; }
.card-title { font-weight: 600; font-size: 16px; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-meta { display:flex; justify-content: space-between; align-items:center; font-size:12px; color:#666; margin-bottom:6px; }
.price { font-weight: 700; color:#e56b1f; font-size: 16px; }
.detail-gallery { display:flex; gap: 8px; flex-wrap: wrap; }
.detail-gallery img { width: 100px; height: 100px; object-fit: cover; border-radius: 4px; }
</style>
