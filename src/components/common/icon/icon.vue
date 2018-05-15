/**
 * 描述：icon组件
 */
<template>
    <i :class="classes" :style="styles"></i>
</template>
<script>
    const prefixCls = 'iconfont';

    export default {
        name: 'hyIcon',
        props: {
            type: String,
            color: String,
            size: [Number, String]
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`icon-${this.type}`]: !!this.type
                    }
                ];
            },
            styles () {
                let style = {};
                if (this.color) {
                    style.color = this.color;
                }
                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }
                return style;
            }
        }
    };
</script>
