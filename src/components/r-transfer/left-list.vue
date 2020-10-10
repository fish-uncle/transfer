<template>
	<div class="ivu-transfer-list">
		<div class="ivu-transfer-list-header">
			<span class="ivu-transfer-list-header-title">源列表</span>
		</div>
		<div class="ivu-transfer-list-body">
			<ul class="ivu-transfer-list-content">
				<li class="ivu-transfer-list-content-item" v-for="item in filterData" :key="item.key"
					@click.prevent="select(item)">
					<i-checkbox :disabled="item.disabled" :value="isCheck(item)"/>
					<span>{{item.label}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {Checkbox} from 'view-design'

	export default {
		data() {
			return {
				showItems: [],
				query: '',
				showFooter: true
			};
		},
		computed: {
			filterData() {
				return this.showItems.filter(item => this.filterMethod(item, this.query))
			}
		},
		watch: {
			data() {
				this.updateFilteredData()
			}
		},
		props: {
			data: Array,
			checkedKeys: Array,
			filterMethod: Function,
			handleCheckedKeysChange: Function,
		},
		components: {
			'i-checkbox': Checkbox,
		},
		methods: {
			updateFilteredData() {
				this.showItems = this.data
			},
			isCheck(item) {
				return this.checkedKeys.some(key => key === item.key)
			},
			getValidKeys(direction) {
				return this.$parent[`${direction}Data`].filter(data => !data.disabled && this.$parent[`${direction}CheckedKeys`].indexOf(data.key) > -1).map(data => data.key)
			},
			select(item) {
				if (item.disabled) return
				const index = this.checkedKeys.indexOf(item.key)
				index > -1 ? this.checkedKeys.splice(index, 1) : this.checkedKeys.push(item.key)
				const sourceSelectedKeys = this.getValidKeys('left')
				const targetSelectedKeys = this.getValidKeys('right')
				this.handleCheckedKeysChange(sourceSelectedKeys, targetSelectedKeys)
			},
		},
		created() {
			this.updateFilteredData()
		},
	}
</script>
