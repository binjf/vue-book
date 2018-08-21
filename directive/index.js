var app = new Vue({
	el: '#app',
	data: {
		show: false
	},
	methods: {
		/* 自定义指令 v-clickoutside 绑定了一个函数 handleClose ，用来关闭菜单 */
		handleClose: function(){
			debugger;
			this.show = false;
		}
	}
});