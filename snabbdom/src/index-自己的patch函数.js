import patch from "./myVue/patch";
import h from "./myVue/h";

const container = document.getElementById('container')

const vNode1 = h('h1', {}, '你好')
patch(container, vNode1)



const btn = document.getElementById('btn')

const vNode2 = h('ul', {}, [
  h('li', {}, 'li1'),
  h('li', {}, 'li2')
])
const vNode3 = h('ol', {}, [
  h('li', {}, 'li1'),
  h('li', {}, 'li2')
])

btn.onclick = function() {
  patch(vNode1, vNode3)
}