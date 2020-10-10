<template>
	<div class="transfer ivu-transfer">
		<left-list :checkedKeys="leftCheckedKeys" :data="leftData" :filterMethod="filterMethod"
				   :handleCheckedKeysChange="handleCheckedKeysChange"/>
		<div class="ivu-transfer-operation">
			<i-button type="primary" icon="ios-arrow-back" @click="moveTo('left')"></i-button>
			<i-button type="primary" icon="ios-arrow-forward" @click="moveTo('right')"></i-button>
		</div>
		<right-list :checkedKeys="rightCheckedKeys" :data="rightData" :filterMethod="filterMethod"
					:handleCheckedKeysChange="handleCheckedKeysChange"/>
	</div>
</template>
<script>
	import {Button} from 'view-design'
	import leftList from './left-list'
	import rightList from './right-list'

	export default {
		data() {
			return {
				leftData: [],
				rightData: [],
				leftCheckedKeys: [],
				rightCheckedKeys: [],
			}
		},
		components: {
			'i-button': Button,
			'left-list': leftList,
			'right-list': rightList,
		},
		watch: {
			targetKeys() {
				this.splitData(false)
			},
			data() {
				this.splitData(true)
			}
		},
		methods: {
			getValidKeys(direction) {
				return this[`${direction}Data`].filter(data => !data.disabled && this[`${direction}CheckedKeys`].indexOf(data.key) > -1).map(data => data.key)
			},
			moveTo(direction) {
				const targetKeys = this.targetKeys
				const opposite = direction === 'left' ? 'right' : 'left'
				const moveKeys = this.getValidKeys(opposite)
				if (direction === 'right' && moveKeys.length) {
					let newLeftData = []
					let newRightData = this.rightData
					this.leftData.forEach(item => {
						moveKeys.forEach(move => {
							if (item.key !== move) {
								newLeftData.push(item)
							} else {
								newRightData.push(item)
							}
						})
					})
					this.leftData = newLeftData
					this.rightData = newRightData
					this.leftCheckedKeys = []
					this.rightCheckedKeys = []
				} else if (direction === 'left' && moveKeys.length) {
					let newLeftData = this.leftData
					let newRightData = []
					this.rightData.forEach(item => {
						moveKeys.forEach(move => {
							if (item.key !== move) {
								newRightData.push(item)
							} else {
								newLeftData.push(item)
							}
						})
					})
					this.leftData = newLeftData
					this.rightData = newRightData
					this.rightCheckedKeys = []
					this.leftCheckedKeys = []
				}
				const newTargetKeys = direction === 'right' ?
					moveKeys.concat(targetKeys) :
					targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey))
				this.$emit('on-change', newTargetKeys, direction, moveKeys)
			},
			splitData(init = false) {
				this.leftData = [...this.data]
				this.rightData = []
				if (this.targetKeys.length > 0) {
					this.targetKeys.forEach((targetKey) => {
						const filteredData = this.leftData.filter((data, index) => {
							if (data.key === targetKey) {
								this.leftData.splice(index, 1);
								return true;
							}
							return false;
						})
						if (filteredData && filteredData.length > 0) this.rightData.push(filteredData[0])
					})
				}
				if (init) {
					this.splitSelectedKey()
				}
			},
			splitSelectedKey() {
				const selectedKeys = this.selectedKeys
				if (selectedKeys.length > 0) {
					this.leftCheckedKeys = this.leftData
						.filter(data => selectedKeys.indexOf(data.key) > -1)
						.map(data => data.key)
					this.rightCheckedKeys = this.rightData
						.filter(data => selectedKeys.indexOf(data.key) > -1)
						.map(data => data.key)
				}
			},
			handleCheckedKeysChange(sourceSelectedKeys, targetSelectedKeys) {
				this.$emit('on-selected-change', sourceSelectedKeys, targetSelectedKeys)
			},
		},
		props: {
			targetKeys: {
				type: Array,
				default() {
					return []
				}
			},
			selectedKeys: {
				type: Array,
				default() {
					return []
				}
			},
			filterMethod: {
				type: Function,
				default(data, query) {
					const type = ('label' in data) ? 'label' : 'key'
					return data[type].indexOf(query) > -1;
				}
			},
			data: {
				type: Array,
				required: true,
				default() {
					return []
				}
			}
		},
		mounted() {
			this.splitData(true)
		}
	}
</script>
