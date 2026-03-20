import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contactInfo: {
      phone: '400-123-4567',
      email: 'contact@shashiguang.com',
      address: '上海市浦东新区张江高科技园区',
      businessHours: '周一至周日 9:00-18:00'
    },
    form: {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    submitted: false
  }),
  actions: {
    updateForm(field, value) {
      this.form[field] = value
    },
    resetForm() {
      this.form = {
        name: '',
        phone: '',
        email: '',
        message: ''
      }
      this.submitted = false
    },
    async submitForm() {
      // 模拟API调用
      try {
        // 这里可以添加实际的API调用
        console.log('Form submitted:', this.form)
        this.submitted = true
        this.resetForm()
        return { success: true }
      } catch (error) {
        console.error('Form submission failed:', error)
        return { success: false, error }
      }
    }
  }
})