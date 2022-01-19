import { render, screen, fireEvent } from '@testing-library/vue'
import { Dialog } from 'element-ui'
import DeviceOrientation from '@/components/DeviceOrientation.vue'

const emitMock = jest.fn()

describe('DeviceOrientation', () => {
  it('renders correctly', () => {
    render(DeviceOrientation, {
      stubs: {
        'el-dialog': Dialog,
      },
    })

    const elDialog = screen.getByTestId('device-orientation')
    expect(elDialog).toBeInTheDocument()
    expect(elDialog.getAttribute('class')).toBe('device-orientation')
    expect(elDialog.children.item(0).getAttribute('style')).toContain('display: none;')
    expect(screen.getByRole('dialog', { hidden: true }).getAttribute('style')).toContain('width: 90vw;')
    expect(elDialog.getAttribute('style')).toBe('padding: 10px;')
  })

  describe('when set to open', () => {
    it('renders in opened position', () => {
      render(DeviceOrientation, {
        stubs: {
          'el-dialog': Dialog,
        },
        propsData: {
          visible: true,
        },
      })

      const elDialog = screen.getByTestId('device-orientation')
      expect(elDialog.children.item(0).getAttribute('style')).toBeNull()
    })
  })

  describe('when clicked to close', () => {
    it('closes the dialog', async () => {
      render(DeviceOrientation, {
        propsData: {
          visible: true,
        },
        stubs: {
          'el-dialog': true,
        },
        mocks: {
          $emit: emitMock,
        },
      }).debug()

      const closeButton = screen.getByTestId('device-orientation').children.item(0)
      await fireEvent.click(closeButton)
      expect(emitMock).toBeCalledWith('close')
    })
  })
})
