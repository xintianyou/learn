// 将vnode创建为真实DOM
export default function createElement(vnode) {
  console.log(vnode);
  // 创建dom节点，目前它还是孤儿节点，没有父亲
  const domNode = document.createElement(vnode.sel)
  // 判断虚拟节点的内部是文字还是节点
  if ((vnode.text !== '' || vnode.text !== undefined) && (vnode.children === undefined || vnode.children.length === 0)) {
    // 虚拟dom内部是文字，将文字赋值给孤儿dom节点
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 虚拟节点内部是标签，遍历标签数组追加到vnode.elm后面
    for (let i = 0; i < vnode.children.length; i++) {
      const el = vnode.children[i];
      domNode.appendChild(createElement(el))
    }
  }
  vnode.elm = domNode
  console.log(vnode);
  return vnode.elm
}