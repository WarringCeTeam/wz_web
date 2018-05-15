/**
 * 描述：滑门
 */
<style lang="scss" scoped>
    .hy-slide {
        width: 100%;
        height: 100%;
        background: transparent;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        &.hy-slide--fixed {
            position: fixed;
        }
        &.hy-slide--absolute {
            position: absolute;
        }
        .hy-slide-main {
            position: absolute;
            z-index: 3001;
            width: 300px;
            height: 100%;
            background: #FFF;
            &.hy-slide_right {
                right: 0;
            }
            &.hy-slide_left {
                left: 0;
            }
        }
    }
    // 遮罩层
    .hy-slide-modal {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        background: rgba(0, 0, 0, 0.4);
    }
</style>
<template>
    <transition name="fade">
        <div :class="classes" v-show="value" key="modal">
            <div class="hy-slide-modal" v-if="modalAble" @click.self="handlerCancel()"></div>
            <transition :name="transition">
                <div :class="[`${prefixCls}-main`, `${prefixCls}_${placement}`]" :style="styles" v-show="slideShow" key="main">
                    <slot name="header">
                        <div class="hy-slide-header">
                            我是头部
                            <button class="closed" @click="handlerClose">x</button>
                        </div>
                    </slot>
                    <slot>
                        <!-- 内容部分 -->
                    </slot>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
    const prefixCls = 'hy-slide';
    function oneOf (val, arr) {
        let item = arr.filter(item => item === val);
        return !!item.length;
    }

    export default {
        name: 'hySlide',
        data () {
            return {
                prefixCls: prefixCls,
                slideShow: false
            };
        },
        props: {
            value: Boolean,
            fixed: {
                type: Boolean,
                default: true
            },
            modalAble: {
                type: Boolean,
                default: true
            },
            modalCloseAble: {
                type: Boolean,
                default: true
            },
            placement: {
                validator (val) {
                    return oneOf(val, ['right', 'left']);
                },
                default: 'right'
            },
            transition: String,
            styles: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        mounted () {
            if (!this.fixed) {
                this.$el.parentNode.style.position = 'relative';
            }
            this.$nextTick(() => {
                this.slideShow = this.value;
            });
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--fixed`]: this.fixed,
                        [`${prefixCls}--absolute`]: !this.fixed
                    }
                ];
            }
        },
        watch: {
            value (val) {
                this.slideShow = val;
                if (!val) {
                    this.$emit('close');
                }
            }
        },
        methods: {
            handlerClose () {
                this.$emit('input', false);
            },
            handlerCancel () {
                if (!this.modalCloseAble) return;
                this.handlerClose();
            }
        }
    };
</script>
