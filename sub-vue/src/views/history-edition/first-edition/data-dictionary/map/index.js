export const apiState = {
  0: '已停止',
  1: '运行中'
}

export const authState = {
  0: '未授权',
  1: '已授权',
  2: '授权过期'
}

export const treeLevelState = [
  {
    label: 'SOC',
    value: 1,
    type: 'soc',
    code: '',
    level: 4,
    listName: 'SocList',
    name: '顶级'
  },
  {
    label: 'HLGT',
    value: 2,
    type: 'hlgt',
    code: 'SocId',
    level: 3,
    listName: 'HlgtList',
    name: '高位组'
  },
  {
    label: 'HLT',
    value: 3,
    type: 'hlt',
    code: 'HlgtId',
    level: 2,
    listName: 'HltList',
    name: '高位'
  },
  {
    label: 'PT',
    value: 4,
    type: 'pt',
    code: 'HltId',
    level: 1,
    listName: 'PtList',
    name: '首选'
  },
  {
    label: 'LLT',
    value: 5,
    type: 'llt',
    code: 'PtId',
    level: 0,
    listName: 'LltList',
    name: '低位'
  }
]
