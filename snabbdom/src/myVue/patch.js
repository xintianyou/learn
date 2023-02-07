import vnode from './vnode';
import createElement from './createElement';

export default function(oldVnode, newVnode) {
  // 一、判断oldVnode是dom节点还是虚拟节点
  if (oldVnode.sel === undefined) {
    // 没有sel属性，说明是dom节点，把旧节点包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 二、判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点，要精细化比较
    console.log('是同一个节点');
    
  } else {
    // 不是同一个节点，直接删除旧的，插入新的
    let newVnodeElm = createElement(newVnode)
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}