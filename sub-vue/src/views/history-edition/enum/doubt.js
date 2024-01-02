import {
  REPORT_USER,
  SEND_USER,
  BATCH_INFO,
  MEDICAL_EVALUATE,
  GRAVIDITY_INFO,
  CHECK_INFO,
  CASE_CONFIRM,
  PATIENT_INFO,
  DOUBT_DRUG,
  REACTION_INFO,
  MERGE_DRUG
} from './tabItems'

import { dosageForm, avenueList, dateDetail, dosageUnit } from './compare'

/**
 * tabs标签页枚举,
 * tip:用于显示提示文字, state: 用作查询录入接口
 * tipType: 用于查询table组件字段数据，name-通用组件名，id-获取案例模块子集详情接口子类型字段
 */
export const doubtTabsList = new Map([
  [
    0,
    { type: 'CASE_CONFIRM', label: '案例识别', state: 'discernment', disabled: false, tip: ['案例识别'], tipType: [] }
  ],
  [
    1,
    {
      type: 'PATIENT_INFO',
      label: '患者信息',
      state: 'patient',
      disabled: false,
      tip: ['患者信息', '相关病史信息'],
      tipType: [{ name: 'caseHistory', id: 0 }]
    }
  ],
  [
    2,
    {
      type: 'DOUBT_DRUG',
      label: '怀疑用药',
      state: 'medication',
      disabled: false,
      tip: ['怀疑用药', '用法用量', '相关器械'],
      tipType: [
        { name: 'generalDosage', id: 1 },
        { name: 'usageDosage', id: 2 }
      ]
    }
  ],
  [
    3,
    {
      type: 'MERGE_DRUG',
      label: '合并用药',
      state: 'merge',
      disabled: false,
      tip: ['合并用药', '用法用量'],
      tipType: [
        { name: 'mergeDrug', id: 3 },
        { name: 'usageDosage', id: 4 }
      ]
    }
  ],
  [
    4,
    {
      type: 'REACTION_INFO',
      label: '不良反应事件',
      state: 'badReaction',
      disabled: false,
      tip: ['不良反应/事件', '死亡信息'],
      tipType: [{ name: 'untowardReaction', id: 5 }]
    }
  ],
  [
    5,
    {
      type: 'CHECK_INFO',
      label: '实验室检查',
      state: 'inspect',
      disabled: false,
      tip: ['相关实验室检查信息'],
      tipType: [{ name: 'inspectionItem', id: 6 }]
    }
  ],
  [
    6,
    {
      type: 'GRAVIDITY_INFO',
      label: '妊娠报告有关信息',
      state: 'gestation',
      disabled: false,
      tip: ['相关疾病信息', '既往药品史'],
      tipType: [
        { name: 'illnessHistory', id: 7 },
        { name: 'treatItems', id: 8 }
      ]
    }
  ],
  [7, { type: 'REPORT_USER', label: '报告者', state: 'reporter', disabled: false, tip: [], tipType: [] }],
  [8, { type: 'SEND_USER', label: '发送者', state: 'sender', disabled: false, tip: [], tipType: [] }],
  // [9, { type: 'BATCH_INFO', label: '批量信息', state: 'batch', disabled: false, tip: [], tipType: [] }],
  [
    9,
    {
      type: 'MEDICAL_EVALUATE',
      label: '医学评估',
      state: 'evaluate',
      disabled: false,
      tip: [
        // '评论',
        '关联性评价'
      ],
      tipType: [{ name: 'drugEvaluation', id: 9 }]
    }
  ]
])
// form内容枚举，字符内容表示填充组件名称components，扩展数据表示为表单项form-item
export const formItemListMap = {
  CASE_CONFIRM: ['tipTitle', ...CASE_CONFIRM],
  PATIENT_INFO: ['tipTitle', ...PATIENT_INFO.get(1), 'tipTitle', ...PATIENT_INFO.get(2), 'caseHistory'],
  DOUBT_DRUG: [
    'tipTitle',
    ...DOUBT_DRUG.get(1),
    'tipTitle',
    'usageDosage',
    ...DOUBT_DRUG.get(2),
    'generalDosage',
    'tipTitle',
    ...DOUBT_DRUG.get(3)
  ],
  MERGE_DRUG: ['tipTitle', ...MERGE_DRUG.get(1), 'tipTitle', 'usageDosage', ...MERGE_DRUG.get(2), 'mergeDrug'],
  REACTION_INFO: ['tipTitle', ...REACTION_INFO.get(1), 'untowardReaction', 'tipTitle', ...REACTION_INFO.get(2)],
  CHECK_INFO: ['tipTitle', ...CHECK_INFO, 'inspectionItem'],
  GRAVIDITY_INFO: [
    ...GRAVIDITY_INFO.get(1),
    'tipTitle',
    ...GRAVIDITY_INFO.get(2),
    'illnessHistory',
    'tipTitle',
    ...GRAVIDITY_INFO.get(3),
    'treatItems'
  ],
  REPORT_USER: REPORT_USER,
  SEND_USER: SEND_USER,
  BATCH_INFO: BATCH_INFO,
  MEDICAL_EVALUATE: [
    // 'tipTitle',
    // ...MEDICAL_EVALUATE.get(1),
    'tipTitle',
    ...MEDICAL_EVALUATE.get(2),
    'drugEvaluation'
  ]
}
// 时间字段处理汇总，使时间字段不超过十个字符
export const collectTimeList = [
  'SourceReportTime',
  'LatestReportTime',
  'CreationTime',
  'BatchTransferDate',
  'InformationCreationDate',
  'CheckDate',
  'StartTime',
  'EndTime',
  'DrugStartTime',
  'DrugStopTime',
  'DrugEndTime',
  'BirthDate',
  'LastMenstruationDate',
  'MotherLastMenstruation',
  'ParentsBirthTime',
  'EventStartTime',
  'EventEndTime',
  'ExpireTime',
  'DrugStartTime',
  'DrugLastTime',
  'DeathTime'
]
// radio字段处理汇总
export const selectRadioItem = ['IsAdditionalFile', 'CombinedTreatment', 'FamilyHistory', 'IsTrial', 'IsUnexpected']
// 布尔值处理字段汇总
export const boolTransformStrRadio = [
  'IsAutopsy',
  'CauseDeath',
  'EndangerLife',
  'CauseHospitalization',
  'FunctionLoss',
  'BirthDefect',
  'ImportantMedicalEvents',
  'MedicalConfirm',
  'IsHolderProduct'
]
/**
 * 用法用量表格枚举
 * prop-数据绑定入参，dataName-匹配数据字段，inputType-input类型
 */
export const usageDosageTableColList = [
  {
    label: '用法用量-开始时间',
    prop: 'DrugStartTime',
    code: '[G.k.4.r.4]',
    align: 'center',
    width: '160',
    dataName: 'drug_start_time',
    inputType: 'time',
    id: 0
  },
  {
    label: '用法用量-结束时间',
    prop: 'DrugLastTime',
    code: '[G.k.4.r.5]',
    align: 'center',
    width: '160',
    dataName: 'drug_last_time',
    inputType: 'time',
    id: 1
  },
  {
    label: '给药的持续时间（数值）',
    prop: 'DrugDuration',
    code: '[G.k.4.r.6a]',
    align: 'center',
    width: '150',
    dataName: 'drug_duration',
    inputType: 'number',
    id: 2
  },
  {
    label: '给药的持续时间（单位）',
    prop: 'DrugDurationUnit',
    code: '[G.k.4.r.6b]',
    align: 'center',
    width: '150',
    dataName: 'drug_duration_unit',
    inputType: 'select',
    option: dateDetail,
    id: 3
  },
  {
    label: '批号',
    prop: 'BatchNumber',
    code: '[G.k.4.r.7]',
    align: 'center',
    width: '120',
    dataName: 'batch_number',
    inputType: 'text',
    id: 6
  },
  {
    label: '间隔时间（数值）',
    prop: 'IntervalTime',
    code: '[G.k.4.r.2]',
    align: 'center',
    width: '150',
    dataName: 'interval_time',
    inputType: 'number',
    id: 4
  },
  {
    label: '时间间隔单位的定义',
    prop: 'IntervalUnitDefinition',
    code: '[G.k.4.r.3]',
    align: 'center',
    width: '150',
    dataName: 'interval_unit_definition',
    inputType: 'select',
    option: dateDetail,
    id: 5
  },
  {
    label: '剂量（数值）',
    prop: 'Dose',
    code: '[G.k.4.r.1a]',
    align: 'center',
    width: '100',
    dataName: 'dose',
    inputType: 'number',
    id: 7
  },
  {
    label: '剂量（单位）',
    prop: 'DoseUnit',
    code: '[G.k.4.r.1b]',
    align: 'center',
    width: '100',
    dataName: 'dose_unit',
    inputType: 'select',
    option: dosageUnit,
    id: 8
  },
  // {
  //   label: '剂量文本',
  //   prop: 'DoseText',
  //   code: '',
  //   align: 'center',
  //   width: '100',
  //   dataName: 'dose_text',
  //   inputType: 'text',
  //   id: 9
  // },
  {
    label: '剂型',
    prop: 'DoseForm',
    code: '[G.k.4.r.9.1]',
    align: 'center',
    width: '100',
    dataName: 'dose_form',
    inputType: 'select',
    option: dosageForm,
    id: 10
  },
  // {
  //   label: '药物剂型术语ID版本日期/编号',
  //   prop: 'DoseFormTermVersion',
  //   code: '',
  //   align: 'center',
  //   width: '100',
  //   dataName: 'dose_form_term_version',
  //   inputType: 'text',
  //   id: 11
  // },
  // {
  //   label: '药物剂型术语ID',
  //   prop: 'DoseFormTermId',
  //   code: '',
  //   align: 'center',
  //   width: '100',
  //   dataName: 'dose_form_term_id',
  //   inputType: 'text',
  //   id: 12
  // },
  {
    label: '给药途径',
    prop: 'DrugWay',
    code: '[G.k.4.r.10.1]',
    align: 'center',
    width: '100',
    dataName: 'drug_way',
    inputType: 'select',
    option: avenueList,
    id: 13
  },
  // {
  //   label: '给药途径术语ID版本日期/编号',
  //   prop: 'DrugWayVersion',
  //   code: '',
  //   align: 'center',
  //   width: '100',
  //   dataName: 'drug_way_version',
  //   inputType: 'text',
  //   id: 14
  // },
  // {
  //   label: '给药途径术语ID',
  //   prop: 'DrugWayId',
  //   code: '',
  //   align: 'center',
  //   width: '100',
  //   dataName: 'drug_way_id',
  //   inputType: 'text',
  //   id: 15
  // },
  {
    label: '失效日期',
    prop: 'ExpireTime',
    code: '[G.k.4.r.CN.1]',
    align: 'center',
    width: '160',
    dataName: 'expire_time',
    inputType: 'time',
    id: 16
  }
]
// 字符串转数组数字
export const arrayToStringListMap = ['DrugExtra', 'drug_extra']

export const otherNameMap = [
  'FileList',
  'MeddraName',
  'ResultType',
  'DrugMeddraName',
  'BadReactionDetailId',
  'DoubtDetailId',
  'DrugName',
  'BadReactionName',
  'Remark',
  'FeedbackCode'
]
