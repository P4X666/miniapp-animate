const requestAnimationFrame = (callback) => setTimeout(() => {
  callback()
}, 16.7)


const cancelAnimationFrame = (id) => {
  clearTimeout(id)
}

export class LuckDraw {
  /** 默认按照顺时针圆圈执行 */
  defaultRotateDir = [
    { index: 0, next: 1 },
    { index: 1, next: 2 },
    { index: 2, next: 4 },
    { index: 4, next: 7 },
    { index: 7, next: 6 },
    { index: 6, next: 5 },
    { index: 5, next: 3 },
    { index: 3, next: 0 },
  ];
  constructor(
    // 圈数
    cycleNumber = 5,
    // 速度 也代表时间片的个数
    minSpeed = 6
  ) {
    // 最大速度
    this.maxSpeed = 4
    // 全速
    this.cycleNumber = cycleNumber || 3
    this.myReq
    // 最小速度
    this.defaultSpeed = minSpeed || 10
  }

  init(DataArr,
    // 旋转规则数组
    RotateDir = this.defaultRotateDir) {
    // 转为链表
    this.DataArr = []
    for (let i = 0; i < DataArr.length; i++) {
      if (DataArr[i].id !== 'btn') {
        this.DataArr.push({ ...DataArr[i], current: i })
      }
    }
    for (let i = 0; i < RotateDir.length; i++) {
      let { index, next } = RotateDir[i]
      if (typeof this.DataArr[index].next !== "undefined") {
        console.error(`RotateDir is error`)
        return
      }
      this.DataArr[index].index = index
      this.DataArr[index].next = this.DataArr[next]
    }
  }
  /**
   * 
   * @param {*} running 
   * @param {(param: object | -1 | 0)=>{}} runend -1:失败 0: 未中奖
   * @returns 
   */
  run(running, runend) {
    this.ended = false // 是否正常结束
    this.stoped = false // 是否非正常结束
    let counter = 0 // 计数器
    let current = 0 // 当前数字值
    let n = 0
    let currentObj = this.DataArr[0]
    let tem = this.DataArr[0]
    const id = this.DataArr[0].id
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (n > this.DataArr.length) {
        console.error(`${id}不存在`)
        return
      }
      if (tem.id === id) {
        break
      }
      tem = tem.next
      n++
    }
    const allCount = this.cycleNumber * this.DataArr.length + n
    // 加速区间
    const addSpeed = this.defaultSpeed - this.maxSpeed
    // 减速区间
    const reduceSpeed = allCount - (this.defaultSpeed - this.maxSpeed)
    // var reduceSpeed = allCount - this.defaultSpeed;
    this.running = running
    this.runend = runend
    this.running(currentObj)

    const nextHandle = () => {
      current = 0
      // 往前移动一个；
      counter++
      currentObj = currentObj.next
      this.running(currentObj)
    }
    let slow = 0
    const step = () => {
      if (this.stoped) {
        this.runend(-1)
        cancelAnimationFrame(this.myReq)
        return
      }

      // 加速环节
      if (counter < addSpeed) {
        if (current < Math.pow(this.defaultSpeed - counter, 2)) {
          current = current + this.defaultSpeed / 2
        } else {
          nextHandle()
        }
      }
      // 匀速环节
      if (counter >= addSpeed && counter < reduceSpeed) {
        if (current < this.maxSpeed) {
          current += 2
        } else {
          nextHandle()
        }
      }
      // 减速环节
      if (counter >= reduceSpeed && counter < allCount) {
        if (
          Math.sqrt(current) <=
          this.defaultSpeed - (allCount - counter)
        ) {
          current++
        } else {
          slow = current
          nextHandle()
        }
      }
      // 停止
      if (counter >= allCount) {
        if (this.ended && currentObj.id === this.id) {
          // 中奖
          this.runend(currentObj)
          cancelAnimationFrame(this.myReq)
          return
        } else if (this.ended && this.id === undefined && currentObj.type === -1) {
          // 未中奖
          this.runend(0)
          cancelAnimationFrame(this.myReq)
          return
        } else {
          if (current < slow) {
            current++
          } else {
            current = 0
            currentObj = currentObj.next
            this.running(currentObj)
          }
        }
      }
      this.myReq = requestAnimationFrame(step)
    }
    this.myReq = requestAnimationFrame(step)
  }
  end(id) {
    this.id = id
    this.ended = true
  }
  /** 处理失败场景 */
  stop() {
    this.stoped = true
  }
}
