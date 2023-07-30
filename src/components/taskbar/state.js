import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleTaskBar = () => (collapsed.value = !collapsed.value)

export const TASKBAR_WIDTH = 450
export const TASKBAR_WIDTH_COLLAPSED = 60
export const taskBarWidth = computed(
  () => `${collapsed.value ? TASKBAR_WIDTH_COLLAPSED : TASKBAR_WIDTH}px`
)