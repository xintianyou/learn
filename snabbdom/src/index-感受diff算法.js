import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule])
const container = document.getElementById('container')
const btn = document.getElementById('btn')

const vNode1 = h('ul', [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
])
patch(container, vNode1) // container容器会被删除，替换为vnode1

const vNode2 = h('ul', [
  h('li', 'A'),
  h('li', 'B'),
  h('li', 'C'),
  h('li', 'D'),
  h('li', 'E')
])
// 由vNode1 改变为 vNode2，故意不加key属性
// 那么，如果新增的E是追加在最后面，dom是最小量更新，A、B、C、D这四个li不会重新渲染
// 如果E不是追加在最后面，那么所有li的节点内容都会重新渲染

const vNode3 = h('ul', [
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
])
// 由vNode1 改变为 vNode3，加上了key属性
// 那么，就算新增的E是插入在在最前面或中间，dom也会是最小量更新，A、B、C、D这四个li也不会重新渲染

const vNode4 = h('ul', [
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'B'}, 'B')
])
// 由vNode1 改变为 vNode4，加上了key属性，即使打乱了顺序，依然是最小量更新

// 说明key告诉了diff算法，更改前后他们是同一个dom节点

// 以上说法可以通过修改浏览器控制台Elements中节点的文字，然后点击按钮来查看效果

const vNode5 = h('ol', [
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D')
])
// 由vNode1 改变为 vNode5，
// ul --> ol，改变了整个选择器，那么整个ul都会被暴力删除然后重新渲染ol节点，验证方法同上，【ol和url不是sameNode】

btn.onclick = () => {
  // patch(vNode1, vNode2)
  // patch(vNode1, vNode3)
  patch(vNode1, vNode4)
  // patch(vNode1, vNode5)
}
