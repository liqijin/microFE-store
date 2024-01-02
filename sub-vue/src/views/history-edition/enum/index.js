export const CENTER_STATUS = {
  0: 'DOUBT_INPUT', // '案例录入'
  1: 'DOUBT_QC', // '案例质检'
  2: 'DRUG_EVALUATE', // '医学评估'
  3: 'DOUBT_CHECK', // '案例审核'
  4: 'AWAIT_APPLY', // '待上报'
  5: 'REPORTED' // '已上报'
}

// 案例中心状态
export const summaryState = [
  {
    label: '案例录入',
    value: 0,
    type: 'info'
  },
  {
    label: '案例质检',
    value: 1,
    type: 'info'
  },
  {
    label: '医学评估',
    value: 2,
    type: 'info'
  },
  {
    label: '案例审核',
    value: 3,
    type: 'info'
  },
  {
    label: '待上报',
    value: 4,
    type: 'info'
  },
  {
    label: '已上报',
    value: 5,
    type: 'success'
  },
  {
    label: '已拒收',
    value: 6,
    type: 'danger'
  }
]

// 案例表单项通用字段
export const tableTemplate = {
  overToolTip: false,
  labelClassName: '',
  className: '',
  sortable: false,
  width: '',
  align: 'center'
}

// 案例操作
export const caseBtnOperate = new Map([
  [0, [{ label: '提交案例质检', type: 'saveCheck', permission: ['ApplyQualityCheck'], show: () => true }]],
  [
    1,
    [
      {
        label: '质检案例',
        type: 'check',
        permission: ['CheckCase'],
        show: () => true
      }
    ]
  ],
  [
    2,
    [
      {
        label: '医学评估案例',
        type: 'evaluate',
        permission: ['EvaluateCase'],
        show: type => {
          return type === 9
        }
      }
    ]
  ],
  [
    3,
    [
      // { label: 'E2B校验', type: 'e2b', permission: ['VerifyCase'], show: () => true },
      { label: '审核案例', type: 'audit', permission: ['AuditCase'], show: () => true }
    ]
  ],
  [4, []],
  [5, []]
])
