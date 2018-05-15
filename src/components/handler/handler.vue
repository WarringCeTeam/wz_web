/**
 * 描述：table操作
 */
<style lang="scss" scoped>
    .iconfont {
        position: absolute;
        top: 55%;
        left: 48%;
        transform: translate(-50%, -50%);
    }
    .pSpan {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #FFF;
        border-radius: 100%;
        transition: background 0.3s;
        cursor: pointer;
      /*&:hover{
         width: 25px;
         height: 25px;
         position: absolute;
         margin-left: 25px;
       }*/
    }
</style>
<template>
    <el-tooltip class="item" :content="tips" :placement="placement">
        <span class="pSpan" :style="pStyles" @mouseenter="handlerOver" @mouseleave="handlerOut" @click="handlerClick">
            <i :class="classes" :style="styles"></i>
        </span>
    </el-tooltip>
</template>
<script>
    const prefixCls = 'iconfont';

    function oneOf (str, array) {
        let status = false;
        array.forEach(item => {
            if (item === str) {
                status = true;
            }
        });
        return status;
    }

    export default {
        props: {
            type: String,
            size: [Number, String],
            color: String,
            bgColor: String,
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'left', 'right', 'bottom']);
                },
                default: 'top'
            },
            hover: String,
            tips: String
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
                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }
                if (this.color) {
                    style.color = this.color;
                }
                return style;
            },
            pStyles () {
                let style = {};
                if (this.bgColor) {
                    style.backgroundColor = this.bgColor;
                }
                return style;
            }
        },
        methods: {
            handlerClick (event) {
                this.$emit('click', event);
            },
            handlerOver (event) {
                if (!this.hover) return;
                event.target.style.backgroundColor = this.hover;
            },
            handlerOut (event) {
                if (!this.hover) return;
                event.target.style.backgroundColor = this.bgColor;
            }
        }
    };
</script>
