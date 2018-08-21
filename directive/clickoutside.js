Vue.directive('clickoutside', {
	/* 自定义指令 bind 钩子 */
	bind: function(el, binding, vnode){
		debugger;
		/* 声明一个函数documentHandler ，并将它作为句柄绑定在 document 的 click 事件上 */
		function documentHandler(e){
			debugger;
			/* 判断点击的区域是否是指令所在的元素内部，如果是，就跳出函数 */
			if(el.contains(e.target)){
				return false;
			}
			/* 判断当前的指令 v-clickoutside 有没有写表达式(如：handleClose)，在该自定义指令中，
				表达式是一个函数，在过滤了内部元素后， 点击外面任何区域应该执行用户表达式中的函数 ，
				所以binding.value() 就是用来执行当前上下文 methods 中指定的函数的(该自定义指令中执行handleClose函数) */
			if(binding.expression){
				binding.value(e);
			}
		}
		/* 不能用this在上下文中声明一个变量，所以用了 el.__vueClickOutside__ 引用了 documentHandler，
			这样就可以在unbind钩子里移除对 document 的 click 事件监听  */
		el.__vueClickOutside__ = documentHandler;
		document.addEventListener('click', documentHandler);
	},
	unbind: function(el, binding){
		debugger;
		document.removeEventListener('click', el.__vueClickOutside__);
		delete el.__vueClickOutside__;
	}


});