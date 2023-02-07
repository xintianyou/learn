import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const vNode1 = h('a', {props: {href: 'https://www.baidu.com'}}, '百度一下')
const vNode2 = h('ul', [
  h('li', '西瓜'),
  h('li', '荔枝')
])
const vNode3 = h('div', [
  h('p', '我是一个盒子'),
  h('p', [
    h('table', {class: {'table1': true}, props: {border: 1}}, [
      h('tr', [
        h('td', 'qq'),
        h('td', 'ww')
      ]),
      h('tr', [
        h('td', 'ee'),
        h('td', 'rr')
      ])
    ])
  ])
])

console.log('[ vNode3 ] >', vNode3)

patch(document.getElementById('container'), vNode3)
