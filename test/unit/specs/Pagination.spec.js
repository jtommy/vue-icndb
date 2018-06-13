import { shallow } from '@vue/test-utils'
import Pagination from '@/components/pagination/Pagination'

describe('Pagination.vue', () => {
    it('should render correct contents - no page', () => {
        const wrapper = shallow(Pagination, {
            propsData: {
                total: 0,
                pageSize: 5
            }
        })
        expect(wrapper.vm.pageCount).toBe(0)
        expect(wrapper.vm.newCurrentPage).toBe(1)
        expect(wrapper.vm.$el.querySelector('.pagination-previous').getAttribute('disabled')).toBe('disabled')
        expect(wrapper.vm.$el.querySelector('.pagination-next').getAttribute('disabled')).toBe('disabled')
    })

    it('should render correct contents - next + prev', async () => {
        const wrapper = shallow(Pagination, {
            propsData: {
                total: 10,
                pageSize: 5
            }
        })
        const prevButton = wrapper.vm.$el.querySelector('.pagination-previous')
        const nextButton = wrapper.vm.$el.querySelector('.pagination-next')
        // init check
        expect(wrapper.vm.pageCount).toBe(2)
        expect(wrapper.vm.newCurrentPage).toBe(1)
        expect(prevButton.getAttribute('disabled')).toBe('disabled')
        expect(nextButton.getAttribute('disabled')).toBe(null)
        // next
        nextButton.dispatchEvent(new window.Event('click'))
        // next check
        expect(wrapper.vm.newCurrentPage).toBe(2)
        await wrapper.vm.$nextTick()
        expect(prevButton.getAttribute('disabled')).toBe(null)
        expect(nextButton.getAttribute('disabled')).toBe('disabled')
        // prev
        prevButton.dispatchEvent(new window.Event('click'))
        // prev check
        expect(wrapper.vm.newCurrentPage).toBe(1)
        await wrapper.vm.$nextTick()
        expect(prevButton.getAttribute('disabled')).toBe('disabled')
        expect(nextButton.getAttribute('disabled')).toBe(null)
    })

    it('should render correct contents - next + next (odd pages)', async () => {
        const wrapper = shallow(Pagination, {
            propsData: {
                total: 11,
                pageSize: 5
            }
        })
        const prevButton = wrapper.vm.$el.querySelector('.pagination-previous')
        const nextButton = wrapper.vm.$el.querySelector('.pagination-next')
        // init check
        expect(wrapper.vm.pageCount).toBe(3)
        expect(wrapper.vm.newCurrentPage).toBe(1)
        expect(prevButton.getAttribute('disabled')).toBe('disabled')
        expect(nextButton.getAttribute('disabled')).toBe(null)
        // next
        nextButton.dispatchEvent(new window.Event('click'))
        // next check
        expect(wrapper.vm.newCurrentPage).toBe(2)
        await wrapper.vm.$nextTick()
        expect(prevButton.getAttribute('disabled')).toBe(null)
        expect(nextButton.getAttribute('disabled')).toBe(null)
        // next
        nextButton.dispatchEvent(new window.Event('click'))
        // next check
        expect(wrapper.vm.newCurrentPage).toBe(3)
        await wrapper.vm.$nextTick()
        expect(prevButton.getAttribute('disabled')).toBe(null)
        expect(nextButton.getAttribute('disabled')).toBe('disabled')
    })
})
