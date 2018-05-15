/**
 * 描述：switch
 */
<style lang="scss" scoped>
    .hy-switch {
        position: relative;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
        &.is-hover .innerClasses:after {
            content: '';
            position: absolute;
            margin: auto;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            opacity: 0.4;
            background: -webkit-gradient(linear, left top, left bottom, from(#82C5A1), to(#009340));
            background: linear-gradient(#82C5A1, #009340);
        }
        .innerClasses {
            display: inline-block;
            position: relative;
            top: 1px;
            border: 1px solid #231B1E;
            border-radius: 50%;
            box-sizing: border-box;
            width: 20px;
            height: 20px;
            background-color: #ddd;
            z-index: 1;
            box-shadow: inset 0 1px 1px #fff;
            transition: opacity 0.3s;
            &.is-active:after {
                content: '';
                position: absolute;
                margin: auto;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: -webkit-gradient(linear, left top, left bottom, from(#82C5A1), to(#009340));
                background: linear-gradient(#82C5A1, #057d69);
            }
        }
        .slotText {
            padding-left: 5px;
            vertical-align: 4px;
            color: rgb(117, 117, 117);
            font-weight: 600;
        }
        .inputClasses {
            position: absolute;
            opacity: 0;
            outline: none;
            margin: 0;
            width: 0;
            height: 0;
            left: -999px;
        }
    }
</style>
<template>
    <label :class="classes" @mouseenter="addHover()" @mouseleave="removeHover()">
        <span class="innerClasses" :class="{'is-active': value}"></span>
        <input type="checkbox" class="inputClasses" :disabled="disabled" :name="name" :checked="value" @change="handlerInput" />
        <span class="slotText" v-if="showSlot">
            <slot></slot>
        </span>
    </label>
</template>
<script>
    const prefixCls = 'hy-switch';

    export default {
        name: 'hySwitch',
        data () {
            return {
                isHover: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        'is-hover': this.isHover
                    }
                ];
            },
            showSlot () {
                return this.$slots.default !== undefined;
            }
        },
        props: {
            name: String,
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handlerInput (ev) {
                let value = ev.target.checked;
                if (value) {
                    this.removeHover();
                } else {
                    this.addHover();
                }
                this.$emit('input', value);
            },
            addHover () {
                if (this.value) return;
                this.isHover = true;
            },
            removeHover () {
                this.isHover = false;
            }
        }
    };
</script>
