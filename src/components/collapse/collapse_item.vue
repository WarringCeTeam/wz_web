/**
 * 描述：无限极风拉琴
 */
<style lang="scss" scoped>
    $borderColor: #D1DBE5;
	$iconColor: #777777;

	.collapse_box {
		box-sizing: border-box;
        color: #777777;
		&.white > .collapse-title{
			background: #FFF !important;
		}
		.noIcon{
			width: 13px;
			height: 13px;
			display: inline-block;
		}
		.collapse-title{
			height: 40px;
			line-height: 40px;
			padding:0 15px;
			background-color: #fff;
			color: #777777;
			background: #EEEEEE;
			user-select: none;
			cursor: pointer;
			font-size: 13px;
			i {
				transition: all 0.3s;
			}
			&.is-active i{
			transform: rotate(90deg);
			}
			&.white{
				background: #FFF;
				border-bottom: none;
				padding-right: 0;
			}
		}
		i.iconColor{
			color: $iconColor;
            font-size: 12px;
            vertical-align: top;
			line-height: inherit;
		}
		.collapse-item{
			box-sizing: border-box;
			.baseBtn {
				height: 40px;
				line-height: 40px;
			}
			.pl25{
				padding-left: 25px;
			}
		}
	}
	.pull-right {
		float: right !important;
	}
    .ml10 {
        margin-left: 10px;
    }
</style>
<template>
    <div class="collapse_box">
		<div class="collapse-title" :class="{'is-active': isActive}" @click="toggle">
			<i class="el-icon-arrow-right iconColor" v-if="nextList"></i>
			<span v-else class="noIcon"></span>
			{{item[prop.label]}}
			<div class="pull-right btn-box">
				<el-button type="primary" size="small" @click.stop="onAdd(item)">新增</el-button>
				<el-button type="primary" size="small" @click.stop="onEdit(item)">编辑</el-button>
				<el-button type="danger" size="small" v-if="!nextList" @click.stop="onDel(item[prop.key])">删除</el-button>
			</div>
		</div>
		<transition
			@before-enter="beforeEnter"
		    @enter="enter"
		  	@after-enter="afterEnter"
		  	@before-leave="beforeLeave"
		  	@leave="leave"
		  	@after-leave="afterLeave"
		>
		<div class="collapse-item" v-show="isActive">
            <div v-if="nextList" class="ml10">
                <hy-collapse-item class="white" v-for='(cel, key) in item[prop.children]' :prop="prop" :key="key" :on-add="onAdd" :on-edit="onEdit" :on-del="onDel" :item="cel"></hy-collapse-item>
            </div>
		</div>
		</transition>
  	</div>
</template>
<script>
    export default {
        name: 'hyCollapseItem',                    // 写递归*
		data () {
			return {
				isActive: false
			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {};
				}
			},
			prop: Object,
			onAdd: Function,
		    onEdit: Function,
		    onDel: Function
		},
        computed: {
            nextList: function () {
                return !!this.item[this.prop.children] && this.item[this.prop.children].length;
            }
        },
		methods: {
			toggle () {
				if (this.nextList) {
                    this.isActive = !this.isActive;
                }
			},
			// 动画
			beforeEnter (el) {
				el.classList.add('collapse-transition');
			    if (!el.dataset) el.dataset = {};
			    el.dataset.oldPaddingTop = el.style.paddingTop;
			    el.dataset.oldPaddingBottom = el.style.paddingBottom;
			    el.style.height = '0';
			    el.style.paddingTop = 0;
			    el.style.paddingBottom = 0;
			  },
			  enter (el) {
			    el.dataset.oldOverflow = el.style.overflow;
			    if (el.scrollHeight !== 0) {
			      el.style.height = el.scrollHeight + 'px';
			      el.style.paddingTop = el.dataset.oldPaddingTop;
			      el.style.paddingBottom = el.dataset.oldPaddingBottom;
			    } else {
			      el.style.height = '';
			      el.style.paddingTop = el.dataset.oldPaddingTop;
			      el.style.paddingBottom = el.dataset.oldPaddingBottom;
			    }
			    el.style.overflow = 'hidden';
			  },
			  afterEnter (el) {
			    // for safari: remove class then reset height is necessary
			    el.classList.remove('collapse-transition');
			    el.style.height = '';
			    el.style.overflow = el.dataset.oldOverflow;
			  },
			  beforeLeave (el) {
			    if (!el.dataset) el.dataset = {};
			    el.dataset.oldPaddingTop = el.style.paddingTop;
			    el.dataset.oldPaddingBottom = el.style.paddingBottom;
			    el.dataset.oldOverflow = el.style.overflow;
			    el.style.height = el.scrollHeight + 'px';
			    el.style.overflow = 'hidden';
			  },
			  leave (el) {
			    if (el.scrollHeight !== 0) {
			      // for safari: add class after set height, or it will jump to zero height suddenly, weired
			      el.classList.add('collapse-transition');
			      el.style.height = 0;
			      el.style.paddingTop = 0;
			      el.style.paddingBottom = 0;
			    }
			  },
			  afterLeave (el) {
			    el.classList.remove('collapse-transition');
			    el.style.height = '';
			    el.style.overflow = el.dataset.oldOverflow;
			    el.style.paddingTop = el.dataset.oldPaddingTop;
			    el.style.paddingBottom = el.dataset.oldPaddingBottom;
			  }
		}
    };
</script>
