import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
        id: 1,
        name: '隐形纱窗',
        category: '基础系列',
        image: 'https://images.unsplash.com/photo-1560184897-6a0c220355bd?w=300&h=200&fit=crop',
        description: '采用优质不锈钢丝网，隐形效果好，通风透气',
        features: ['防蚊虫', '通风好', '易清洁', '耐用']
      },
      {
        id: 2,
        name: '金刚网纱窗',
        category: '安全系列',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=300&h=200&fit=crop',
        description: '高强度不锈钢网，防盗防坠，安全可靠',
        features: ['防盗', '防坠', '高强度', '防火']
      },
      {
        id: 3,
        name: '磁性纱窗',
        category: '便捷系列',
        image: 'https://images.unsplash.com/photo-1578898889136-6b9e68a7a365?w=300&h=200&fit=crop',
        description: '磁性吸附设计，安装拆卸方便，适合各种场景',
        features: ['易安装', '可拆卸', '磁性吸附', '美观']
      },
      {
        id: 4,
        name: '折叠纱窗',
        category: '高端系列',
        image: 'https://images.unsplash.com/photo-1560184897-6a0c220355bd?w=300&h=200&fit=crop',
        description: '折叠式设计，节省空间，高端大气',
        features: ['节省空间', '高端大气', '易操作', '耐用']
      }
    ],
    categories: ['基础系列', '安全系列', '便捷系列', '高端系列']
  }),
  getters: {
    getProductsByCategory: (state) => {
      return (category) => {
        if (!category) return state.products
        return state.products.filter(product => product.category === category)
      }
    },
    getProductById: (state) => {
      return (id) => {
        return state.products.find(product => product.id === id)
      }
    }
  },
  actions: {
    addProduct(product) {
      this.products.push(product)
    },
    updateProduct(id, updates) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates }
      }
    }
  }
})