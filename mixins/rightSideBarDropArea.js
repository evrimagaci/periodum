import _ from 'lodash'

export default {
  data() {
    return {
      compoundElements: [],
      selectedElement: null,
    }
  },

  methods: {
    selectElement($event) {
      if (this.showSideBar) {
        this.showSideBar = this.selectedElement && this.selectedElement.number !== $event.number
      } else {
        this.showSideBar = !!$event.number
      }
      this.selectedElement = $event
    },
    remove(index) {
      this.compoundElements.splice(index, 1)
      if (!this.compoundElements.length) {
        this.showRightSideBar = false
      }
    },
    onDrop() {
      const lastIndex = this.compoundElements.length - 1
      if (lastIndex > -1 && this.compoundElements[lastIndex].number === this.selectedElementForCompound.number) {
        this.compoundElements[lastIndex].count++
      } else {
        this.compoundElements.push({
          count: 1,
          ..._.cloneDeep(this.selectedElementForCompound),
        })
      }
      this.showRightSideBar = true
    },
    incOrDecCompoundElements(payload) {
      this.compoundElements[payload.index].count += payload.value
    },
  },
}
