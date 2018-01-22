import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			current: 0, 
			urls: [], 
			[`delete`]() {}, 
			cancel() {}, 
		}
	},
	/**
	 * 显示imageViewer组件
	 * @param {Object} opts 配置项
	 * @param {Number} opts.current 当前显示图片的索引值
	 * @param {Array} opts.urls 需要预览的图片链接列表
	 * @param {Function} opts.delete 点击删除的回调函数
	 * @param {Function} opts.cancel 点击关闭的回调函数
	 */
	show(opts = {}) {
		const options = Object.assign({}, this.setDefaults(), opts)

		// 实例化组件
    	const component = new Component({
    		scope: `$imageViewer`,
    		data: options, 
    		methods: {
    			/**
    			 * 隐藏
    			 */
	    		hide() {
					if (this.removed) return !1
					this.removed = !0
					this.setHidden(`weui-animate-slide-left`)
					typeof options.cancel === `function` && options.cancel()
				},
				/**
				 * 显示
				 */
				show() {
					if (this.removed) return !1
					this.setVisible(`weui-animate-slide-right`)
				},
				/**
				 * current 改变时会触发 change 事件
				 */
                bindchanges(e) {
					this.setData({
						[`$imageViewer.current`]: e.detail.current,
					})
				},
    		},
    	})

		component.show()

		return component.hide
	},
}