/**
 * 描述：modal层
 */
<style lang="scss" scoped>
    $modal-bg: #4f80e1;
    $modal-color: #FFFFFF;
    $border-radius: 3px;

    .hy-modal {
        position: fixed;
        z-index: 2000;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .modal-dialog {
            position: absolute;
            z-index: 2001;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.4);
        }
        .hy-modal-wrap {
            position: absolute;
            z-index: 2002;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow-y: hidden;
            &.hy-modal--scroll {
                overflow-y: auto;
            }
        }
        .hy-modal-dialog {
            position: absolute;
            top: 15%;
            left: 0;
            right: 0;
            margin: 0 auto 30px;
            &.hy-modal--tiny {
                width: 30%;
            }
            &.hy-modal--small {
                width: 40%;
            }
            &.hy-modal--normal {
                width: 50%;
            }
            &.hy-modal--big {
                width: 60%;
            }
            &.hy-modal--large {
                width: 70%;
            }
            .hy-modal-content {
                border-radius: $border-radius;
                background: #FFFFFF;
                overflow: hidden;
                .hy-modal-header {
                    padding: 12px 15px;
                    color: $modal-color;
                    font-size: 16px;
                    background: $modal-bg;
                    button.close {
                        -webkit-appearance: none;
                        padding: 0;
                        cursor: pointer;
                        background: 0 0;
                        border: 0;
                        float: right;
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 1;
                        margin-top: 2px;
                        color: $modal-color;
                        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
                        filter: alpha(opacity=20);
                        opacity: .6;
                        &:focus, &:hover {
                            color: $modal-color;
                            text-decoration: none;
                            cursor: pointer;
                            filter: alpha(opacity=80);
                            opacity: .8;
                            outline: none;
                        }
                        span {
                            font-size: 24px;
                        }
                    }
                }
                .hy-modal-body {
                    &.has-padding {
                        padding: 10px 15px;
                    }
                }
                .hy-modal-footer {
                    padding: 10px 15px 15px;
                }
            }
        }
    }
</style>
<template>
    <transition name="fade">
        <div :class="[customClass]" v-show="value">
            <div :class="classed" @click.self="handlerModal()">
                <transition :name="transition">
                    <div :class="classes" v-show="isActive" :style="styles">
                        <div :class="[`${customClass}-content`]">
                            <div :class="[`${customClass}-header`]">
                                {{title}}
                                <button type="button" class="close" v-if="closable" data-dismiss="modal" aria-label="Close" @click="handlerCancel()">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div :class="bodyClasses">
                                <slot></slot>
                            </div>
                            <div :class="[`${customClass}-footer`]" v-if="showFooter">
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- 遮罩层 -->
            <div class="modal-dialog" v-if="modalAble" @click.self="handlerModal()"></div>
        </div>
    </transition>
</template>
<script>
    const prefixCls = 'hy-modal';
    function oneOf (val, arr) {
        let item = arr.filter(item => item === val);
        return !!item.length;
    }
    export default {
        name: 'hyModal',
        data () {
            return {
                isActive: false
            };
        },
        props: {
            title: String,
            size: {
                validator (val) {
                    return oneOf(val, ['tiny', 'small', 'normal', 'big', 'large']);
                },
                default: 'small'
            },
            customClass: {
                type: String,
                default: prefixCls
            },
            scrollAble: {
                type: Boolean,
                default: true
            },
            closable: {
                type: Boolean,
                default: true
            },
            transition: {
                type: String,
                default: 'fade'
            },
            modalAble: {
                type: Boolean,
                default: true
            },
            hasPadding: {
                type: Boolean,
                default: true
            },
            modalCloseAble: {
                type: Boolean,
                default: true
            },
            value: Boolean,
            styles: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        computed: {
            classed () {
                return [
                    `${prefixCls}-wrap`,
                    {
                        [`${prefixCls}--scroll`]: this.scrollAble
                    }
                ];
            },
            classes () {
                return [
                    `${prefixCls}-dialog`,
                    {
                        [`${prefixCls}--${this.size}`]: !!this.size
                    }
                ];
            },
            bodyClasses () {
                return [
                    `${prefixCls}-body`,
                    {
                        'has-padding': this.hasPadding
                    }
                ];
            },
            showFooter () {
                return this.$slots.footer !== undefined;
            }
        },
        watch: {
            value (val) {
                this.isActive = val;
                if (!val) {
                    this.$emit('close');
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.isActive = this.value;
            });
        },
        methods: {
            handlerClose () {
                this.$emit('input', false);
            },
            handlerCancel () {
                this.handlerClose();
            },
            handlerModal () {
                if (this.modalCloseAble) {
                    this.handlerClose();
                }
            }
        }
    };
</script>
