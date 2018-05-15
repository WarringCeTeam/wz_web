/**
 * 描述：风拉琴
 */
<style lang="scss" scoped>
    .noData {
        padding:15px;
        text-align: center;
    }
</style>
<template>
    <div>
        <hy-collapse-item class="white" v-for='(cel, key) in data' :prop="prop_prop" :key="key" :on-add="onAdd" :on-edit="onEdit" :on-del="onDel" :item="cel"></hy-collapse-item>
        <div class="noData" v-if="noData">
            暂无数据!
        </div>
    </div>
</template>
<script>
    import hyCollapseItem from './collapse_item.vue';

    export default {
        name: 'hyCollapse',
        data () {
            return {
                defaultProp: {
                    key: 'id',
                    label: 'name',
                    children: 'children'
                }
            };
        },
        components: {
            hyCollapseItem
        },
        computed: {
            prop_prop () {
                return Object.assign({}, this.defaultProp, this.prop);
            },
            noData () {
                return !this.data.length;
            }
        },
        props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            prop: {
				type: Object,
				default () {
					return {};
				}
            },
            onAdd: Function,
		    onEdit: Function,
		    onDel: Function
        }
    };
</script>
