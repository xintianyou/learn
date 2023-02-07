import vnode from './vnode'

/**
 * 
 * @param {*} sel 选择器
 * @param {*} data 属性
 * @param {*} c 未知，见用法1、2、3
 * 
 * 用法1 h('div', {}, '文字')
 * 用法2 h('div', {}, [])
 * 用法3 h('div', {}, h())
 */
export default function(sel, data, c) {
  if (arguments.length !== 3) {
    // 必须传入3个参数
    throw new Error('参数个数不对')
  }
  // 检查参数c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 用法1
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 用法2
    let children = []
    // 遍历c
    for (let i = 0; i < c.length; i++) {
      // 此时的c[i]是h函数执行完毕的结果，是vnode函数的返回值，{}
      const element = c[i];
      if (!(typeof element === 'object' && element.hasOwnProperty('sel'))) {
        throw new Error('传入的参数中有项非h函数')
      }
      children.push(element)
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 用法3，因为如果c传入的是h()，h函数返回的一定是一个{}，是vnode函数的返回值，直接塞进children
    return vnode(sel, data, [c], undefined, undefined)
  } else {
    throw new Error('传入的第三个参数类型不对')
  }
}