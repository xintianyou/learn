import h from './myVue/h'

const f1 = h('f', {on: {click: () => {}}}, '文字')
const f2 = h('div', {}, [
  h('div', {}, 'ss')
])
const f3 = h('p', {}, 
  h('span', {}, 'span')
)

console.log(f1);
console.log(f2);
console.log(f3);