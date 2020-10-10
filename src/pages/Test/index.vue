<template>
	<div>
		<transfer :data="data" :target-keys="target"/>
	</div>
</template>
<script>
	import transfer from '../../components/r-transfer'

	export default {
		data() {
			return {
				target: [1, 2],
				data: [
					{
						key: 1,
						label: '测试1'
					},
					{
						key: 2,
						label: '测试2'
					},
					{
						key: 3,
						label: '测试3'
					},
				]
			}
		},
		components: {
			transfer
		}
	}
</script>
