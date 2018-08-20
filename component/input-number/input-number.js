function isValueNumber(value){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
	template: '\
		<div class="input-number">\
			<input \
				type="text" \
				:value="currentValue" \
				@change="handleChange" /> \
			<button \
				@click="handleDown" \
				:disabled="currentValue <= min"> - </button> \
			<button \
				@click="handleUp" \
				:disabled="currentValue >= max"> + </button> \
		</div>',
			
	/* 定义组件标签的属性 */
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data: function(){
		return {
			currentValue: this.value
		}
	},
	/* 监听父组件修改value，和当前currentValue变化时更新value */
	watch: {
		currentValue: function(val){
			/* 监听父组件的input和change事件 */
			this.$emit('input', val);
			this.$emit('on-change', val);
		},
		value: function(val){
			this.updateValue(val);
		}
	},
	methods: {
		updateValue: function(val){
			/* 对父组件传递过来的值进行校验过滤 */
			if(val > this.max){
				val = this.max;
			}
			if(val < this.min){
				val = this.min;
			}
			this.currentValue = val;
		},
		handleDown: function(){
			if(this.currentValue <= this.min){
				return ;
			}
			this.currentValue -= 1;
		},
		handleUp: function(){
			if(this.currentValue >= this.max){
				return ;
			}
			this.currentValue += 1;
		},
		handleChange: function(){
			var val = event.target.value.trim();
			var max = this.max;
			var min = this.min;

			if(isValueNumber(val)){
				val = Number(val);
				this.currentValue = val;

				if(val > max){
					this.currentValue = max;
				}else if(val < min){
					this.currentValue = min;
				}
			}else{
				//如果输入的是非数字，则把输入重置为原来的值
				event.target.value = this.currentValue;
			}
		}
	},
	mounted: function(){
		/* 第一次初始化时，对value进行过滤 */
		this.updateValue(this.value);
	}
});