/**
 * 描述：格式化money (实现 分 -> 元, 元 -> 分)
 */
<template>
    <el-input :placeholder="placeholder" v-model="currentValue">
        <template :slot="placement" v-if="unit">{{unit}}</template>
    </el-input>
</template>
<script>
    const oneOf = (val, array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === val) {
                return true;
            }
        }
        return false;
    };

    export default {
        data () {
            return {
                currentValue: '',
                oneStep: false
            };
        },
        props: {
            placeholder: String,
            value: {
                type: [String, Number]
            },
            unit: String,
            placement: {
                validator (value) {
                    return oneOf(value, ['append', 'prepend']);
                },
                default: 'prepend'
            }
        },
        watch: {
            currentValue (val) {
                this.$emit('input', val * 100);
            },
            value (val) {
                if (this.oneStep) return;
                this.oneStep = true;
                this.currentValue = val ? val / 100 : val;
            }
        }
    };
</script>
