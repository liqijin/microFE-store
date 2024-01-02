import { dateTime, dateWeek, fieldA, fieldB, fieldC, fieldD, fieldE, fieldF, fieldG, fieldH, fieldI } from './compare'

/**
 * 当前页面字段解释说明
 * {
  dataName: '', // 接口回显字段
  type: 'text', // 表单类型
  name: '', // 绑定字段
  code: '', // 字段编码
  placeholder: '', // 提示文字
  label: '', // 表单文案
  prop: '', // 绑定显示字段
  maxLen: 200, // 最大长度
  fieldLimit: false, // 显示数字统计
  rules: [{ required: true, message: '', trigger: '' }], // 校验规则
  flex: 0, // 是否独占一行
  option: [], // 下拉数据
  dateType: '', // type为time时, 时间选择器的类型
  format: '', // 时间选择器输入框显示格式
  subName: '', // 通用组件名称, 如为空的情况下则表示不与组件关联
  component: '', // 渲染组件名称
  isPanel: false, // 是否打开弹窗 => medDRA弹窗
  relate: [], // 弹窗关联字段列表
  isSelect: '', // 是否存在关联关系
  select: '', // 关联关系字段名
  respondTime: ['', ''], // 开始时间、结束时间关联逻辑
  respondField: ['', ''], // 开始时间、结束时间计算天数及单位
  relateGender: ['', ''], // 性别字段关联关系逻辑
}
*/

// 表单的通用组件枚举
export const commonField = new Map([
  ['illnessHistory', { component: 'IllnessHistory', name: 'illnessHistory', flex: 1, label: '相关疾病信息列表' }],
  ['usageDosage', { component: 'UsageDosage', name: 'usageDosage', flex: 1, label: '用法用量列表' }],
  ['generalDosage', { component: 'GeneralDosage', name: 'generalDosage', flex: 1, label: '怀疑用药列表' }],
  ['inspectionItem', { component: 'InspectionItem', name: 'inspectionItem', flex: 1, label: '相关实验室检查信息列表' }],
  [
    'untowardReaction',
    { component: 'UntowardReaction', name: 'untowardReaction', flex: 1, label: '不良反应/事件列表' }
  ],
  ['treatItems', { component: 'TreatItems', name: 'treatItems', flex: 1, label: '既往药品史列表' }],
  ['drugEvaluation', { component: 'DrugEvaluation', name: 'drugEvaluation', flex: 1, label: '关联性评价列表' }],
  ['caseHistory', { component: 'CaseHistory', name: 'caseHistory', flex: 1, label: '相关病例信息列表' }],
  ['mergeDrug', { component: 'MergeDrug', name: 'mergeDrug', flex: 1, label: '合并用药列表' }],
  ['tipTitle', { component: 'TipTitle', name: 'tipTitle', flex: 1, label: '' }]
])

/**
 * 案例操作tabs项下的表单属性，如数据为map数据则存在多项表单，需要按表格拆分
 */
// 案例识别
export const CASE_CONFIRM = [
  {
    dataName: 'CaseNumber',
    type: 'text',
    name: 'CaseNumber',
    code: '',
    placeholder: '',
    label: '企业病例编号',
    prop: 'CaseNumber',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请输入识别码', trigger: 'blur' }]
  },
  {
    dataName: 'creation_time',
    type: 'time',
    name: 'CreationTime',
    label: '创建时间',
    code: '[C.1.2]',
    placeholder: '请选择日期时间',
    dateType: 'date',
    format: 'timestamp',
    prop: 'CreationTime',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请选择创建时间', trigger: 'change' }]
  },
  {
    dataName: 'sender_research_type',
    type: 'select',
    name: 'SenderResearchType',
    code: '[C.5.4]',
    placeholder: '',
    label: '发现该反应/事件时的研究的类型',
    option: fieldH.eventType,
    prop: 'SenderResearchType',
    subName: '',
    rules: []
  },
  {
    dataName: 'report_type',
    type: 'select',
    name: 'ReportType',
    code: '[C1.3]',
    placeholder: '',
    option: fieldA.reportType,
    prop: 'ReportType',
    label: '报告类型',
    subName: '',
    rules: [{ required: true, message: '请选择报告类型', trigger: 'change' }]
  },
  {
    dataName: 'report_source',
    type: 'select',
    name: 'ReportSource',
    code: '[C.1.CN.1]',
    placeholder: '',
    option: fieldA.reportSource,
    prop: 'ReportSource',
    label: '报告来源',
    subName: '',
    isAdr: true,
    rules: []
  },
  {
    dataName: 'FeedbackCode',
    type: 'text',
    name: 'FeedbackCode',
    code: '',
    placeholder: '',
    label: '反馈码',
    prop: 'FeedbackCode',
    maxLen: 200,
    select: 1,
    isSelect: 'ReportSource',
    fieldLimit: false,
    subName: '',
    isAdr: true,
    rules: [{ required: true, message: '请填写反馈码', trigger: 'blur' }]
  },
  {
    dataName: 'report_classification',
    type: 'select',
    name: 'ReportClassification',
    code: '[C.1.CN.2]',
    placeholder: '',
    option: fieldA.reportSort,
    prop: 'ReportClassification',
    label: '报告分类',
    subName: '',
    rules: [{ required: true, message: '请选择报告分类', trigger: 'change' }]
  },
  // {
  //   dataName: 'holder_identification',
  //   type: 'text',
  //   name: 'HolderIdentification',
  //   code: '[C.1.CN.3]',
  //   placeholder: '',
  //   prop: 'HolderIdentification',
  //   label: '持有人标识',
  //   maxLen: 100,
  //   fieldLimit: false,
  //   disabled: true,
  //   subName: '',
  //   isAdr: true,
  //   rules: []
  // },
  {
    dataName: 'source_report_time',
    type: 'time',
    name: 'SourceReportTime',
    label: '首次获知时间',
    code: '[C.1.4]',
    placeholder: '请选择日期时间',
    dateType: 'date',
    format: 'timestamp',
    prop: 'SourceReportTime',
    subName: '',
    rules: [{ required: true, message: '请选择时间', trigger: 'change' }]
  },
  {
    dataName: 'latest_report_time',
    type: 'time',
    name: 'LatestReportTime',
    label: '收到本报告最新信息的日期',
    code: '[C.1.5]',
    placeholder: '请选择日期时间',
    dateType: 'date',
    format: 'timestamp',
    prop: 'LatestReportTime',
    subName: '',
    rules: [{ required: true, message: '请选择时间', trigger: 'change' }]
  },
  {
    dataName: 'sender_file_name',
    type: 'text',
    name: 'SenderFileName',
    code: '[C.1.6.1.r.1]',
    placeholder: '',
    label: '发送者持有的文件',
    prop: 'SenderFileName',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'is_meet_local_speed_report',
  //   type: 'radio',
  //   name: 'IsMeetLocalSpeedReport',
  //   code: '[C.1.7]',
  //   placeholder: '',
  //   label: '该病例是否满足本地加速报告的要求？',
  //   option: [
  //     {
  //       name: '否',
  //       dataName: '',
  //       type: 1
  //     },
  //     {
  //       name: '是',
  //       dataName: '',
  //       type: 2
  //     },
  //     {
  //       name: '不完整信息',
  //       dataName: '',
  //       type: 3
  //     }
  //   ],
  //   prop: 'IsMeetLocalSpeedReport',
  //   subName: '',
  //   rules: [{ required: true, message: '请选择', trigger: 'change' }]
  // },
  // {
  //   dataName: 'cases_only_number',
  //   type: 'text',
  //   name: 'CasesOnlyNumber',
  //   code: '[C.1.8.1]',
  //   placeholder: '',
  //   label: '全球唯一病例识别码',
  //   prop: 'CasesOnlyNumber',
  //   maxLen: 100,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: [{ required: true, message: '请输入识别码', trigger: 'blur' }]
  // },
  {
    dataName: 'cases_first_sender',
    type: 'radio',
    name: 'CasesFirstSender',
    code: '[C.1.8.2]',
    placeholder: '',
    label: '病例的首个发送者',
    option: [
      {
        name: '监管机构',
        dataName: '',
        type: 1
      },
      {
        name: '其他',
        dataName: '',
        type: 2
      }
    ],
    prop: 'CasesFirstSender',
    subName: '',
    rules: [{ required: true, message: '请选择首个发送者', trigger: 'change' }]
  },
  // {
  //   dataName: 'past_other_cases_number',
  //   type: 'radio',
  //   name: 'PastOtherCasesNumber',
  //   code: '[C.1.9.1]',
  //   placeholder: '',
  //   label: '既往传输时使用的其他病例标识码',
  //   option: [
  //     {
  //       name: '是',
  //       dataName: '',
  //       type: 1
  //     },
  //     {
  //       name: '不完整信息',
  //       dataName: '',
  //       type: 2
  //     }
  //   ],
  //   prop: 'PastOtherCasesNumber',
  //   subName: '',
  //   rules: [{ required: true, message: '请选择', trigger: 'change' }]
  // },
  // {
  //   dataName: 'case_number_source',
  //   type: 'text',
  //   name: 'CaseNumberSource',
  //   code: '[C.1.9.1.r.1]',
  //   placeholder: '',
  //   prop: 'CaseNumberSource',
  //   label: '病例识别码的来源',
  //   maxLen: 100,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'past_cases_number',
  //   type: 'text',
  //   name: 'PastCasesNumber',
  //   code: '[C.1.9.1.r.2]',
  //   placeholder: '',
  //   label: '病例识别码',
  //   prop: 'PastCasesNumber',
  //   maxLen: 100,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'related_case_number',
  //   type: 'text',
  //   name: 'RelatedCaseNumber',
  //   code: '',
  //   placeholder: '',
  //   label: '与本报告相关的报告识别码（必要时重复）',
  //   prop: 'RelatedCaseNumber',
  //   maxLen: 100,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'report_invalid_correction',
  //   type: 'radio',
  //   name: 'ReportInvalidCorrection',
  //   code: '',
  //   placeholder: '',
  //   label: '报告作废/修正',
  //   option: [
  //     {
  //       name: '作废',
  //       dataName: '',
  //       type: 1
  //     },
  //     {
  //       name: '修正',
  //       dataName: '',
  //       type: 2
  //     }
  //   ],
  //   prop: 'ReportInvalidCorrection',
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'invalid_correction_reason',
  //   type: 'textarea',
  //   name: 'InvalidCorrectionReason',
  //   code: '',
  //   placeholder: '',
  //   label: '作废/修正的原因',
  //   prop: 'InvalidCorrectionReason',
  //   maxLen: 2000,
  //   fieldLimit: true,
  //   flex: 0,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'is_additional_file',
    type: 'radioFile',
    name: 'IsAdditionalFile',
    code: '[C.1.6.1]',
    placeholder: '',
    label: '是否有附加文件？',
    option: [
      {
        name: '是',
        dataName: '',
        type: 1
      },
      {
        name: '否',
        dataName: '',
        type: 0
      }
    ],
    prop: 'IsAdditionalFile',
    fileName: 'SenderFileName',
    subName: '',
    flex: 0,
    rules: [{ required: true, message: '请选择', trigger: 'change' }]
  },
  {
    dataName: 'FileList',
    type: '',
    name: 'FileList',
    code: '',
    placeholder: '',
    label: '',
    prop: 'FileList',
    subName: '',
    component: ''
  }
]
// 患者信息
export const PATIENT_INFO = new Map([
  [
    1,
    [
      {
        dataName: 'patient_name',
        type: 'text',
        name: 'PatientName',
        code: '[D.1]',
        placeholder: '',
        label: '患者姓名',
        prop: 'PatientName',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      {
        dataName: 'gender',
        type: 'select',
        name: 'Gender',
        code: '[D.5]',
        placeholder: '',
        label: '性别',
        option: fieldI.parentsGenderSelect,
        prop: 'Gender',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'birth_date',
        type: 'time',
        name: 'BirthDate',
        label: '出生日期',
        code: '[C.2.1]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'BirthDate',
        subName: '',
        rules: []
      },
      {
        dataName: 'event_happen_age_numerical',
        type: 'number',
        name: 'EventHappenAgeNumerical',
        code: '[D.2.2.a]',
        placeholder: '',
        label: '年龄',
        prop: 'EventHappenAgeNumerical',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'event_happen_age_unit',
        type: 'select',
        name: 'EventHappenAgeUnit',
        label: '年龄单位',
        code: '[D.2.2b]',
        placeholder: '',
        option: dateTime,
        prop: 'EventHappenAgeUnit',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'nationality',
        type: 'text',
        name: 'Nationality',
        code: '[D.CN.4]',
        placeholder: '',
        label: '国家',
        prop: 'Nationality',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'national',
        type: 'select',
        name: 'National',
        code: '[D.CN.1]',
        placeholder: '',
        option: fieldB.nation,
        prop: 'National',
        label: '民族',
        subName: '',
        rules: []
      },
      {
        dataName: 'race',
        type: 'select',
        name: 'Race',
        code: '[D.CN.2]',
        placeholder: '',
        option: fieldB.race,
        prop: 'Race',
        label: '种族',
        subName: '',
        rules: []
      },
      {
        dataName: 'height',
        type: 'number',
        name: 'Height',
        code: '[D.4]',
        placeholder: '',
        label: '身高（cm）',
        prop: 'Height',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'weight',
        type: 'number',
        name: 'Weight',
        code: '[D.3]',
        placeholder: '',
        label: '体重（kg）',
        prop: 'Weight',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      // {
      //   dataName: 'patients_age_group',
      //   type: 'select',
      //   name: 'PatientsAgeGroup',
      //   code: '',
      //   placeholder: '',
      //   option: fieldB.ages,
      //   prop: 'PatientsAgeGroup',
      //   label: '患者年龄层（按报告者）',
      //   subName: '',
      //   rules: []
      // },
      {
        dataName: 'contact_phone',
        type: 'number',
        name: 'ContactPhone',
        code: '[D.CN.5]',
        placeholder: '',
        label: '联系电话',
        prop: 'ContactPhone',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'medical_institution',
        type: 'text',
        name: 'MedicalInstitution',
        code: '[D.CN.3]',
        placeholder: '',
        label: '医疗机构名称',
        prop: 'MedicalInstitution',
        maxLen: 120,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      // {
      //   dataName: 'record_number_source',
      //   type: 'text',
      //   name: 'RecordNumberSource',
      //   code: '',
      //   placeholder: '',
      //   label: '患者医疗记录号和记录号的来源（GP医疗记录号）',
      //   prop: 'RecordNumberSource',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'pregnancy_describe',
      //   type: 'textarea',
      //   name: 'PregnancyDescribe',
      //   code: '',
      //   placeholder: '',
      //   label: '妊娠相关描述',
      //   prop: 'PregnancyDescribe',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   flex: 0,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'experts_record_number',
      //   type: 'text',
      //   name: 'ExpertsRecordNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '患者医疗记录号和记录号的来源（专家记录编号）',
      //   prop: 'ExpertsRecordNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      {
        dataName: 'hospital_record_number',
        type: 'text',
        name: 'HospitalRecordNumber',
        code: '[D.1.1.3]',
        placeholder: '',
        label: '病历号/门诊号',
        prop: 'HospitalRecordNumber',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      // {
      //   dataName: 'research_record_number',
      //   type: 'text',
      //   name: 'ResearchRecordNumber',
      //   placeholder: '',
      //   label: '患者医疗记录编号和记录编号的来源（研究编号）',
      //   prop: 'ResearchRecordNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      {
        dataName: 'fetus_gestational_age_numerical',
        type: 'number',
        name: 'FetusGestationalAgeNumerical',
        code: '[D.2.2.1a]',
        placeholder: '',
        label: '胎儿的反应/事件被观察到时的孕龄（数字）',
        prop: 'FetusGestationalAgeNumerical',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'fetus_gestational_age_unit',
        type: 'select',
        name: 'FetusGestationalAgeUnit',
        label: '胎儿的反应/事件被观察到时的孕龄（单位）',
        code: '[D.2.2.1b]',
        placeholder: '',
        option: dateWeek,
        prop: 'FetusGestationalAgeUnit',
        subName: '',
        rules: []
      }
      // {
      //   dataName: 'last_menstruation_date',
      //   type: 'time',
      //   name: 'LastMenstruationDate',
      //   label: '末次月经日期',
      //   code: '',
      //   placeholder: '请选择日期时间',
      //   dateType: 'date',
      //   format: 'timestamp',
      //   prop: 'LastMenstruationDate',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // }
    ]
  ],
  [
    2,
    [
      {
        dataName: 'meddra_history_version',
        type: 'text',
        name: 'MeddraHistoryVersion',
        code: '[D.7.1.r.1a]',
        placeholder: '',
        option: [],
        prop: 'MeddraHistoryVersion',
        label: '编码病史的MedDRA版本',
        subName: 'caseHistory',
        rules: [],
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        isPanel: true
      },
      {
        dataName: 'meddra_history_code',
        type: 'text',
        name: 'MeddraHistoryCode',
        code: '[D.7.1.r.1b]',
        placeholder: '',
        label: '病史（疾病/外科手术/等）（MedDRA编码）',
        prop: 'MeddraHistoryCode',
        maxLen: 200,
        fieldLimit: false,
        subName: 'caseHistory',
        rules: [],
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        isPanel: true
      },
      {
        dataName: 'MeddraName',
        type: 'text',
        name: 'MeddraName',
        code: '',
        placeholder: '',
        label: 'MedDRA名称',
        prop: 'MeddraName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'caseHistory',
        rules: [],
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        isPanel: true
      },
      {
        dataName: 'start_time',
        type: 'time',
        name: 'StartTime',
        label: '开始日期',
        code: '[D.7.1.r.2]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'StartTime',
        maxLen: 200,
        fieldLimit: false,
        respondTime: ['StartTime', 'EndTime'],
        subName: 'caseHistory',
        rules: []
      },
      {
        dataName: 'end_time',
        type: 'time',
        name: 'EndTime',
        label: '结束日期',
        code: '[D.7.1.r.4]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'EndTime',
        maxLen: 200,
        fieldLimit: false,
        respondTime: ['StartTime', 'EndTime'],
        subName: 'caseHistory',
        rules: []
      },
      // {
      //   dataName: 'remark',
      //   type: 'textarea',
      //   name: 'Remark',
      //   code: '',
      //   placeholder: '',
      //   label: '备注',
      //   prop: 'Remark',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   flex: 0,
      //   subName: 'caseHistory',
      //   rules: []
      // },
      // {
      //   dataName: 'family_history',
      //   type: 'radio',
      //   name: 'FamilyHistory',
      //   code: '',
      //   placeholder: '',
      //   label: '家族史',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     }
      //   ],
      //   prop: 'FamilyHistory',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'caseHistory',
      //   rules: []
      // },
      // {
      //   dataName: 'combined_treatment',
      //   type: 'radio',
      //   name: 'CombinedTreatment',
      //   code: '',
      //   placeholder: '',
      //   label: '合并治疗',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     }
      //   ],
      //   prop: 'CombinedTreatment',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'caseHistory',
      //   rules: []
      // },
      {
        dataName: 'medical_records_disease_instructions',
        type: 'textarea',
        name: 'MedicalRecordsDiseaseInstructions',
        code: '[D.7.2]',
        placeholder: '',
        label: '相关病史及并发疾病的文本说明（不包括反应/事件）',
        prop: 'MedicalRecordsDiseaseInstructions',
        maxLen: 200,
        fieldLimit: false,
        flex: 0,
        subName: 'caseHistory',
        rules: []
      },
      {
        dataName: 'is_continuous',
        type: 'radio',
        name: 'IsContinuous',
        code: '[D.7.1.r.3]',
        placeholder: '',
        label: '报告当时疾病是否存在',
        option: [
          {
            name: '否',
            dataName: '',
            type: 1
          },
          {
            name: '是',
            dataName: '',
            type: 2
          }
        ],
        prop: 'IsContinuous',
        maxLen: 200,
        fieldLimit: false,
        subName: 'caseHistory',
        rules: []
      }
    ]
  ]
])
// 怀疑用药
export const DOUBT_DRUG = new Map([
  [
    1,
    [
      {
        dataName: 'drug_effect_features',
        type: 'select',
        name: 'DrugEffectFeatures',
        code: '[G.k.1]',
        placeholder: '',
        option: fieldC.feature,
        prop: 'DrugEffectFeatures',
        label: '药物作用特征',
        subName: 'generalDosage',
        rules: [{ required: true, message: '请选择药物作用特征', trigger: 'change' }]
      },
      {
        dataName: 'approval_number',
        type: 'text',
        name: 'ApprovalNumber',
        code: '[G.k.CN.4]',
        placeholder: '',
        label: '批准文号',
        prop: 'ApprovalNumber',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        rules: [{ required: true, message: '请输入批准文号', trigger: 'blur' }],
        productRelevance: 0
      },
      {
        dataName: 'report_drug_name',
        type: 'text',
        name: 'ReportDrugName',
        code: '[G.k.2.2]',
        placeholder: '',
        label: '商品名',
        prop: 'ReportDrugName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        // rules: [{ required: true, message: '请输入报告的药品名称', trigger: 'blur' }]
        rules: [],
        productRelevance: 1
      },
      {
        dataName: 'drug_generic_name',
        type: 'text',
        name: 'DrugGenericName',
        code: '[G.k.CN.1]',
        placeholder: '',
        label: '通用名称',
        prop: 'DrugGenericName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        rules: [{ required: true, message: '请输入通用名称', trigger: 'blur' }],
        productRelevance: 2
      },
      {
        dataName: 'drug_spec',
        type: 'number',
        name: 'DrugSpec',
        code: '[G.k.2.3.r.3a]',
        placeholder: '',
        label: '规格（数值）',
        prop: 'DrugSpec',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        rules: []
      },
      {
        dataName: 'drug_spec_unit',
        type: 'text',
        name: 'DrugSpecUnit',
        code: '[G.k.2.3.r.3b]',
        placeholder: '',
        label: '规格（单位）',
        prop: 'DrugSpecUnit',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        rules: []
      },
      // {
      //   dataName: 'drug_country_identification',
      //   type: 'text',
      //   name: 'DrugCountryIdentification',
      //   code: '',
      //   placeholder: '',
      //   label: '药品获得国的标识',
      //   prop: 'DrugCountryIdentification',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'license_number',
      //   type: 'text',
      //   name: 'LicenseNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '上市许可/申请编号',
      //   prop: 'LicenseNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'license_country',
      //   type: 'text',
      //   name: 'LicenseCountry',
      //   code: '',
      //   placeholder: '',
      //   label: '上市许可/申请国家',
      //   prop: 'LicenseCountry',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      {
        dataName: 'holder_name',
        type: 'text',
        name: 'HolderName',
        code: '[G.k.3.3]',
        placeholder: '',
        label: '上市许可持有人',
        prop: 'HolderName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'generalDosage',
        // disabled: true,
        rules: [{ required: true, message: '请输入上市许可持有人', trigger: 'blur' }]
      },
      // {
      //   dataName: '',
      //   type: 'time',
      //   name: '',
      //   label: '失效日期',
      //   code: '[G.k.4.r.CN.1]',
      //   placeholder: '请选择日期时间',
      //   dateType: 'date',
      //   format: 'timestamp',
      //   prop: '',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      {
        dataName: 'is_holder_product',
        type: 'radio',
        name: 'IsHolderProduct',
        code: '[G.k.CN.3]',
        placeholder: '',
        label: '是否为本持有人产品（必要时重复）',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '否',
            dataName: '',
            type: 2
          }
        ],
        prop: 'IsHolderProduct',
        subName: 'generalDosage',
        rules: []
      },
      {
        dataName: 'report_adapt',
        type: 'text',
        name: 'ReportAdapt',
        code: '[G.k.7.r.1]',
        placeholder: '',
        option: [],
        prop: 'ReportAdapt',
        label: '治疗疾病',
        subName: 'generalDosage',
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_adapt_version',
        type: 'text',
        name: 'MeddraAdaptVersion',
        code: '[G.k.7.r.2a]',
        placeholder: '',
        prop: 'MeddraAdaptVersion',
        label: '编码适应症的MedDRA版本',
        subName: 'generalDosage',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_adapt_code',
        type: 'text',
        name: 'MeddraAdaptCode',
        code: '[G.k.7.r.2b]',
        placeholder: '',
        prop: 'MeddraAdaptCode',
        label: '适应症（MedDRA编码值）',
        subName: 'generalDosage',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        rules: []
      }
      // {
      //   dataName: 'mpid_version_number',
      //   type: 'text',
      //   name: 'MpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'MPID版本日期/编号',
      //   prop: 'MpidVersionNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'mpid_number',
      //   type: 'text',
      //   name: 'MpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '医疗产品标识符(MPID)',
      //   prop: 'MpidNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_version_number',
      //   type: 'text',
      //   name: 'PhpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'PhPID版本日期/编号',
      //   prop: 'PhpidVersionNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_number',
      //   type: 'text',
      //   name: 'PhpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '药品标识(PhPID)',
      //   prop: 'PhpidNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'material_name',
      //   type: 'text',
      //   name: 'MaterialName',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质名称',
      //   prop: 'MaterialName',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'material_term_version',
      //   type: 'text',
      //   name: 'MaterialTermVersion',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质术语ID版本日期/编号',
      //   prop: 'MaterialTermVersion',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'material_term_id',
      //   type: 'text',
      //   name: 'MaterialTermId',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质术语ID',
      //   prop: 'MaterialTermId',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'is_trial',
      //   type: 'radio',
      //   name: 'IsTrial',
      //   code: '',
      //   placeholder: '',
      //   label: '设盲的试验用药',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     }
      //   ],
      //   prop: 'IsTrial',
      //   subName: 'generalDosage',
      //   rules: []
      // }
    ]
  ],
  [
    2,
    [
      // {
      //   dataName: 'first_event_dose',
      //   type: 'number',
      //   name: 'FirstEventDose',
      //   code: '',
      //   placeholder: '',
      //   label: '首次发生反应的累积剂量（数）',
      //   prop: 'FirstEventDose',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      // {
      //   dataName: 'first_event_dose_unit',
      //   type: 'text',
      //   name: 'FirstEventDoseUnit',
      //   code: '',
      //   placeholder: '',
      //   label: '首次发生反应的累积剂量（单位）',
      //   prop: 'FirstEventDoseUnit',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'generalDosage',
      //   rules: []
      // },
      {
        dataName: 'drug_measures',
        type: 'select',
        name: 'DrugMeasures',
        code: '[G.k.8]',
        placeholder: '',
        option: fieldC.measure,
        prop: 'DrugMeasures',
        label: '对药物采取措施',
        subName: 'generalDosage',
        rules: []
      },
      {
        dataName: 'drug_extra',
        type: 'select',
        name: 'DrugExtra',
        code: '[G.k.10.r]',
        placeholder: '',
        option: fieldC.drugList,
        multiple: true,
        prop: 'DrugExtra',
        label: '是否存在以下情况(可多选)',
        subName: 'generalDosage',
        rules: []
      }
      // {
      //   dataName: 'drug_other',
      //   type: 'textarea',
      //   name: 'DrugOther',
      //   code: '',
      //   placeholder: '',
      //   label: '药物的其他信息文本',
      //   prop: 'DrugOther',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   flex: 0,
      //   subName: 'generalDosage',
      //   rules: []
      // }
    ]
  ],
  [
    3,
    [
      {
        dataName: 'related_devices',
        type: 'textarea',
        name: 'RelatedDevices',
        code: '[G.k.CN.2]',
        placeholder: '',
        label: '相关器械',
        prop: 'RelatedDevices',
        maxLen: 200,
        fieldLimit: false,
        flex: 1,
        subName: '',
        rules: []
      }
    ]
  ]
])
// 合并用药
export const MERGE_DRUG = new Map([
  [
    1,
    [
      {
        dataName: 'drug_effect_features',
        type: 'select',
        name: 'DrugEffectFeatures',
        code: '[G.k.1]',
        placeholder: '',
        option: fieldC.featureMerge,
        prop: 'DrugEffectFeatures',
        label: '药物作用特征',
        subName: 'mergeDrug',
        rules: [{ required: true, message: '请选择药物作用特征', trigger: 'change' }]
      },
      {
        dataName: 'approval_number',
        type: 'text',
        name: 'ApprovalNumber',
        code: '[G.k.CN.4]',
        placeholder: '',
        label: '批准文号',
        prop: 'ApprovalNumber',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        rules: [{ required: true, message: '请输入批准文号', trigger: 'blur' }],
        productRelevance: 0
      },
      {
        dataName: 'report_drug_name',
        type: 'text',
        name: 'ReportDrugName',
        code: '[G.k.2.2]',
        placeholder: '',
        label: '商品名',
        prop: 'ReportDrugName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        // rules: [{ required: true, message: '请输入商品名', trigger: 'blur' }]
        rules: [],
        productRelevance: 1
      },
      {
        dataName: 'drug_generic_name',
        type: 'text',
        name: 'DrugGenericName',
        code: '[G.k.CN.1]',
        placeholder: '',
        label: '通用名称',
        prop: 'DrugGenericName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        rules: [{ required: true, message: '请输入通用名称', trigger: 'blur' }],
        productRelevance: 2
      },
      {
        dataName: 'drug_spec',
        type: 'number',
        name: 'DrugSpec',
        code: '[G.k.2.3.r.3a]',
        placeholder: '',
        label: '规格（数值）',
        prop: 'DrugSpec',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        rules: []
      },
      {
        dataName: 'drug_spec_unit',
        type: 'text',
        name: 'DrugSpecUnit',
        code: '[G.k.2.3.r.3b]',
        placeholder: '',
        label: '规格（单位）',
        prop: 'DrugSpecUnit',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        rules: []
      },
      // {
      //   dataName: 'drug_country_identification',
      //   type: 'text',
      //   name: 'DrugCountryIdentification',
      //   code: '',
      //   placeholder: '',
      //   label: '药品获得国的标识',
      //   prop: 'DrugCountryIdentification',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'license_number',
      //   type: 'text',
      //   name: 'LicenseNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '上市许可/申请编号',
      //   prop: 'LicenseNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'license_country',
      //   type: 'text',
      //   name: 'LicenseCountry',
      //   code: '',
      //   placeholder: '',
      //   label: '上市许可/申请国家',
      //   prop: 'LicenseCountry',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      {
        dataName: 'holder_name',
        type: 'text',
        name: 'HolderName',
        code: '[G.k.3.3]',
        placeholder: '',
        label: '上市许可持有人',
        prop: 'HolderName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'mergeDrug',
        // disabled: true,
        rules: [{ required: true, message: '请输入上市许可持有人', trigger: 'blur' }]
      },
      {
        dataName: 'is_holder_product',
        type: 'radio',
        name: 'IsHolderProduct',
        code: '[G.k.CN.3]',
        placeholder: '',
        label: '是否为本持有人产品',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '否',
            dataName: '',
            type: 2
          }
        ],
        prop: 'IsHolderProduct',
        subName: 'mergeDrug',
        rules: []
      },
      {
        dataName: 'report_adapt',
        type: 'text',
        name: 'ReportAdapt',
        code: '[G.k.7.r.1]',
        placeholder: '',
        option: [],
        prop: 'ReportAdapt',
        label: '治疗疾病',
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        subName: 'mergeDrug',
        rules: []
      },
      {
        dataName: 'meddra_adapt_version',
        type: 'text',
        name: 'MeddraAdaptVersion',
        code: '[G.k.7.r.2a]',
        placeholder: '',
        prop: 'MeddraAdaptVersion',
        label: '编码适应症的MedDRA版本',
        subName: 'mergeDrug',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_adapt_code',
        type: 'text',
        name: 'MeddraAdaptCode',
        code: '[G.k.7.r.2b]',
        placeholder: '',
        prop: 'MeddraAdaptCode',
        label: '适应症（MedDRA编码值）',
        subName: 'mergeDrug',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'ReportAdapt'],
        isPanel: true,
        rules: []
      }
      // {
      //   dataName: 'mpid_version_number',
      //   type: 'text',
      //   name: 'MpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'MPID版本日期/编号',
      //   prop: 'MpidVersionNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'mpid_number',
      //   type: 'text',
      //   name: 'MpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '医疗产品标识符(MPID)',
      //   prop: 'MpidNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_version_number',
      //   type: 'text',
      //   name: 'PhpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'PhPID版本日期/编号',
      //   prop: 'PhpidVersionNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_number',
      //   type: 'text',
      //   name: 'PhpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '药品标识(PhPID)',
      //   prop: 'PhpidNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'material_name',
      //   type: 'text',
      //   name: 'MaterialName',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质名称',
      //   prop: 'MaterialName',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'material_term_version',
      //   type: 'text',
      //   name: 'MaterialTermVersion',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质术语ID版本日期/编号',
      //   prop: 'MaterialTermVersion',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'material_term_id',
      //   type: 'text',
      //   name: 'MaterialTermId',
      //   code: '',
      //   placeholder: '',
      //   label: '物质/指定物质术语ID',
      //   prop: 'MaterialTermId',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'is_trial',
      //   type: 'radio',
      //   name: 'IsTrial',
      //   code: '',
      //   placeholder: '',
      //   label: '设盲的试验用药',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     }
      //   ],
      //   prop: 'IsTrial',
      //   subName: 'mergeDrug',
      //   rules: []
      // }
    ]
  ],
  [
    2,
    [
      // {
      //   dataName: 'first_event_dose',
      //   type: 'number',
      //   name: 'FirstEventDose',
      //   code: '',
      //   placeholder: '',
      //   label: '首次发生反应的累积剂量（数）',
      //   prop: 'FirstEventDose',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'first_event_dose_unit',
      //   type: 'text',
      //   name: 'FirstEventDoseUnit',
      //   code: '',
      //   placeholder: '',
      //   label: '首次发生反应的累积剂量（单位）',
      //   prop: 'FirstEventDoseUnit',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      {
        dataName: 'drug_measures',
        type: 'select',
        name: 'DrugMeasures',
        code: '[G.k.8]',
        placeholder: '',
        option: fieldC.measure,
        prop: 'DrugMeasures',
        label: '对药物采取措施',
        subName: 'mergeDrug',
        rules: []
      },
      {
        dataName: 'drug_extra',
        type: 'select',
        name: 'DrugExtra',
        code: '[G.k.10.r]',
        placeholder: '',
        option: fieldC.drugList,
        multiple: true,
        prop: 'DrugExtra',
        label: '是否存在以下情况(可多选)',
        subName: 'mergeDrug',
        rules: []
      }
      // {
      //   dataName: 'drug_other',
      //   type: 'textarea',
      //   name: 'DrugOther',
      //   code: '',
      //   placeholder: '',
      //   label: '药物的其他信息文本',
      //   prop: 'DrugOther',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   flex: 0,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_generic_name',
      //   type: 'text',
      //   name: 'DrugGenericName',
      //   code: '',
      //   placeholder: '',
      //   label: '药品通用名',
      //   prop: 'DrugGenericName',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'is_holder_product',
      //   type: 'radio',
      //   name: 'IsHolderProduct',
      //   code: '[G.k.CN.3]',
      //   placeholder: '',
      //   label: '是否为本持有人产品',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     },
      //     {
      //       name: '否',
      //       dataName: '',
      //       type: 2
      //     }
      //   ],
      //   prop: 'IsHolderProduct',
      //   subName: 'mergeDrug',
      //   rules: []
      // },
      // {
      //   dataName: 'approval_number',
      //   type: 'text',
      //   name: 'ApprovalNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '批准文号/受理号',
      //   prop: 'ApprovalNumber',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'mergeDrug',
      //   rules: []
      // }
    ]
  ]
])
// 不良反应事件
export const REACTION_INFO = new Map([
  [
    1,
    [
      // {
      //   dataName: 'resource_bad_reaction',
      //   type: 'text',
      //   name: 'ResourceBadReaction',
      //   code: '',
      //   placeholder: '',
      //   label: '主要来源使用母语报告的反应/事件',
      //   prop: 'ResourceBadReaction',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'resource_bad_reaction_lang',
      //   type: 'text',
      //   name: 'ResourceBadReactionLang',
      //   code: '',
      //   placeholder: '',
      //   label: '主要来源报告的反应/事件的语言类型',
      //   prop: 'ResourceBadReactionLang',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'resource_bad_reaction_eng',
      //   type: 'text',
      //   name: 'ResourceBadReactionEng',
      //   code: '',
      //   placeholder: '',
      //   label: '主要来源报告反应/事件的翻译',
      //   prop: 'ResourceBadReactionEng',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      {
        dataName: 'meddra_event_version',
        type: 'text',
        name: 'MeddraEventVersion',
        code: '[E.i.2.1a]',
        placeholder: '',
        label: '反应/事件的Meddra版本',
        prop: 'MeddraEventVersion',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraEventVersion', 'MeddraEventCode', 'MeddraName'],
        isPanel: true,
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请输入反应/事件的Meddra版本', trigger: 'blur' }]
      },
      {
        dataName: 'meddra_event_code',
        type: 'text',
        name: 'MeddraEventCode',
        code: '[E.i.2.1b]',
        placeholder: '',
        label: '反应/事件的Meddra编码',
        prop: 'MeddraEventCode',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraEventVersion', 'MeddraEventCode', 'MeddraName'],
        isPanel: true,
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请输入反应/事件的Meddra编码', trigger: 'blur' }]
      },
      {
        dataName: 'MeddraName',
        type: 'text',
        name: 'MeddraName',
        code: '',
        placeholder: '',
        label: '不良反应术语',
        prop: 'MeddraName',
        maxLen: 200,
        fieldLimit: false,
        relate: ['MeddraEventVersion', 'MeddraEventCode', 'MeddraName'],
        isPanel: true,
        subName: 'untowardReaction',
        rules: []
      },
      {
        dataName: 'event_start_time',
        type: 'time',
        name: 'EventStartTime',
        label: '发生时间',
        code: '[E.i.4]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'EventStartTime',
        subName: 'untowardReaction',
        respondTime: ['EventStartTime', 'EventEndTime'],
        respondField: ['EventDuration', 'EventDurationUnit'],
        rules: []
      },
      {
        dataName: 'event_duration',
        type: 'number',
        name: 'EventDuration',
        code: '[E.i.6a]',
        placeholder: '',
        label: '持续时间',
        prop: 'EventDuration',
        maxLen: 200,
        fieldLimit: false,
        subName: 'untowardReaction',
        rules: []
      },
      {
        dataName: 'event_duration_unit',
        type: 'text',
        name: 'EventDurationUnit',
        code: '[E.i.6b]',
        placeholder: '',
        label: '持续时间单位',
        prop: 'EventDurationUnit',
        maxLen: 200,
        fieldLimit: false,
        subName: 'untowardReaction',
        rules: []
      },
      {
        dataName: 'event_end_time',
        type: 'time',
        name: 'EventEndTime',
        label: '结束时间',
        code: '[E.i.5]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'EventEndTime',
        subName: 'untowardReaction',
        respondTime: ['EventStartTime', 'EventEndTime'],
        respondField: ['EventDuration', 'EventDurationUnit'],
        rules: []
      },
      // {
      //   dataName: 'reporter_term',
      //   type: 'select',
      //   name: 'ReporterTerm',
      //   code: '',
      //   placeholder: '',
      //   option: fieldD.terminology,
      //   prop: 'ReporterTerm',
      //   label: '由报告者强调的术语',
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      {
        dataName: 'cause_death',
        type: 'radio',
        name: 'CauseDeath',
        code: '[E.i.3.2a]',
        placeholder: '',
        label: '导致死亡',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'CauseDeath',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'endanger_life',
        type: 'radio',
        name: 'EndangerLife',
        code: '[E.i.3.2b]',
        placeholder: '',
        label: '危及生命',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'EndangerLife',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'cause_hospitalization',
        type: 'radio',
        name: 'CauseHospitalization',
        code: '[E.i.3.2a]',
        placeholder: '',
        label: '导致住院/住院时间延长',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'CauseHospitalization',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'function_loss',
        type: 'radio',
        name: 'FunctionLoss',
        code: '[E.i.3.2d]',
        placeholder: '',
        label: '残疾/功能丧失',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'FunctionLoss',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'birth_defect',
        type: 'radio',
        name: 'BirthDefect',
        code: '[E.i.3.2e]',
        placeholder: '',
        label: '先天性异常或出生缺陷',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'BirthDefect',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'important_medical_events',
        type: 'radio',
        name: 'ImportantMedicalEvents',
        code: '[E.i.3.2f]',
        placeholder: '',
        label: '其他重要医学事件',
        option: [
          {
            name: '是',
            dataName: '',
            type: 1
          },
          {
            name: '不完整信息',
            dataName: '',
            type: 2
          }
        ],
        prop: 'ImportantMedicalEvents',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      // {
      //   dataName: 'drug_start_duration',
      //   type: 'number',
      //   name: 'DrugStartDuration',
      //   code: '',
      //   placeholder: '',
      //   label: '开始给药至反应/事件开始之间的时间间隔（数字）',
      //   prop: 'DrugStartDuration',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_start_duration_unit',
      //   type: 'text',
      //   name: 'DrugStartDurationUnit',
      //   code: '',
      //   placeholder: '',
      //   label: '开始给药至反应/事件开始之间的时间间隔（单位）',
      //   prop: 'DrugStartDurationUnit',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_last_duration',
      //   type: 'number',
      //   name: 'DrugLastDuration',
      //   code: '',
      //   placeholder: '',
      //   label: '末次给药至反应/事件开始之间的时间间隔（数字）',
      //   prop: 'DrugLastDuration',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_last_duration_unit',
      //   type: 'text',
      //   name: 'DrugLastDurationUnit',
      //   code: '',
      //   placeholder: '',
      //   label: '末次给药至反应/事件开始之间的时间间隔（单位）',
      //   prop: 'DrugLastDurationUnit',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      {
        dataName: 'last_outcome',
        type: 'select',
        name: 'LastOutcome',
        code: '[E.i.7]',
        placeholder: '',
        option: fieldD.situation,
        prop: 'LastOutcome',
        label: '结果',
        subName: 'untowardReaction',
        rules: [{ required: true, message: '请选择结果', trigger: 'change' }]
      }
      // {
      //   dataName: 'medical_confirm',
      //   type: 'radio',
      //   name: 'MedicalConfirm',
      //   code: '',
      //   placeholder: '',
      //   label: '医疗保健专业人士的医学确认',
      //   option: [
      //     {
      //       name: '是',
      //       dataName: '',
      //       type: 1
      //     },
      //     {
      //       name: '否',
      //       dataName: '',
      //       type: 2
      //     }
      //   ],
      //   prop: 'MedicalConfirm',
      //   subName: 'untowardReaction',
      //   rules: []
      // },
      // {
      //   dataName: 'event_country',
      //   type: 'text',
      //   name: 'EventCountry',
      //   code: '',
      //   placeholder: '',
      //   label: '发生反应/事件的国家',
      //   prop: 'EventCountry',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'untowardReaction',
      //   rules: []
      // }
    ]
  ],
  [
    2,
    [
      // {
      //   dataName: 'report_drug_name',
      //   type: 'text',
      //   name: 'ReportDrugName',
      //   code: '',
      //   placeholder: '',
      //   label: '报告的药物名称',
      //   prop: 'ReportDrugName',
      //   maxLen: 250,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'mpid_version_number',
      //   type: 'text',
      //   name: 'MpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'MPID版本日期/编号',
      //   prop: 'MpidVersionNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'mpid_number',
      //   type: 'text',
      //   name: 'MpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '医疗产品标识符（MPID）',
      //   prop: 'MpidNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_version_number',
      //   type: 'text',
      //   name: 'PhpidVersionNumber',
      //   code: '',
      //   placeholder: '',
      //   label: 'PhPID版本日期/编号',
      //   prop: 'PhpidVersionNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_number',
      //   type: 'text',
      //   name: 'PhpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '药品标识符（PhPID）',
      //   prop: 'PhpidNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_start_time',
      //   type: 'time',
      //   name: 'DrugStartTime',
      //   label: '开始日期',
      //   code: '',
      //   placeholder: '请选择日期时间',
      //   dateType: 'date',
      //   format: 'timestamp',
      //   prop: 'DrugStartTime',
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'drug_stop_time',
      //   type: 'time',
      //   name: 'DrugStopTime',
      //   label: '停用日期',
      //   code: '',
      //   placeholder: '请选择日期时间',
      //   dateType: 'date',
      //   format: 'timestamp',
      //   prop: 'DrugStopTime',
      //   fieldLimit: false,
      //   subName: '',
      //   rules: []
      // },
      // {
      //   dataName: 'meddra_adapt_version',
      //   type: 'text',
      //   name: 'MeddraAdaptVersion',
      //   code: '',
      //   placeholder: '',
      //   label: '适应症的Meddra版本',
      //   prop: 'MeddraAdaptVersion',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   relate: ['MeddraAdaptVersion', 'MeddraAdaptCode'],
      //   isPanel: true,
      //   rules: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      // {
      //   dataName: 'meddra_adapt_code',
      //   type: 'text',
      //   name: 'MeddraAdaptCode',
      //   code: '',
      //   placeholder: '',
      //   label: '适应症的Meddra编码',
      //   prop: 'MeddraAdaptCode',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   relate: ['MeddraAdaptVersion', 'MeddraAdaptCode'],
      //   isPanel: true,
      //   rules: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      // {
      //   dataName: 'meddra_reaction_version',
      //   type: 'text',
      //   name: 'MeddraReactionVersion',
      //   code: '',
      //   placeholder: '',
      //   label: '(不良)反应的Meddra版本',
      //   prop: 'MeddraReactionVersion',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   relate: ['MeddraReactionVersion', 'MeddraReactionCode'],
      //   isPanel: true,
      //   rules: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      // {
      //   dataName: 'meddra_reaction_code',
      //   type: 'text',
      //   name: 'MeddraReactionCode',
      //   code: '',
      //   placeholder: '',
      //   label: '(不良)反应的Meddra编码',
      //   prop: 'MeddraReactionCode',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: '',
      //   relate: ['MeddraReactionVersion', 'MeddraReactionCode'],
      //   isPanel: true,
      //   rules: [{ required: true, message: '请输入', trigger: 'blur' }]
      // },
      {
        dataName: 'meddra_death_reason_version',
        type: 'text',
        name: 'MeddraDeathReasonVersion',
        code: '[D.9.2.r.1a]',
        placeholder: '',
        label: '编码报告的死因的MedDRA版本',
        prop: 'MeddraDeathReasonVersion',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        relate: ['MeddraDeathReasonVersion', 'MeddraDeathReasonCode', 'DeathReason'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_death_reason_code',
        type: 'text',
        name: 'MeddraDeathReasonCode',
        code: '[D.9.2.r.1b]',
        placeholder: '',
        label: '报告的死因（MedDRA编码）',
        prop: 'MeddraDeathReasonCode',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        relate: ['MeddraDeathReasonVersion', 'MeddraDeathReasonCode', 'DeathReason'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'death_reason',
        type: 'text',
        name: 'DeathReason',
        code: '[D.9.2.r.2]',
        placeholder: '',
        label: '直接死因',
        prop: 'DeathReason',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        relate: ['MeddraDeathReasonVersion', 'MeddraDeathReasonCode', 'DeathReason'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'death_time',
        type: 'time',
        name: 'DeathTime',
        label: '死亡时间',
        code: '[D.9.1]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'DeathTime',
        subName: '',
        rules: []
      },
      {
        dataName: 'is_autopsy',
        type: 'select',
        name: 'IsAutopsy',
        code: '[D.9.3]',
        placeholder: '',
        label: '是否尸检',
        option: [
          {
            label: '是',
            value: 1,
            id: 1
          },
          {
            label: '否',
            value: 2,
            id: 2
          }
        ],
        prop: 'IsAutopsy',
        subName: '',
        rules: []
      },
      {
        dataName: 'meddra_autopsy_version',
        type: 'text',
        name: 'MeddraAutopsyVersion',
        code: '[D.9.4.r.1a]',
        placeholder: '',
        label: '编码尸检-确定的死因的MedDRA版本',
        prop: 'MeddraAutopsyVersion',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        relate: ['MeddraAutopsyVersion', 'MeddraAutopsyCode', 'AutopsyReason'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_autopsy_code',
        type: 'text',
        name: 'MeddraAutopsyCode',
        code: '[D.9.4.r.1b]',
        placeholder: '',
        label: '尸检-确定的死因（MedDRA编码）',
        prop: 'MeddraAutopsyCode',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        relate: ['MeddraAutopsyVersion', 'MeddraAutopsyCode', 'AutopsyReason'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'autopsy_reason',
        type: 'text',
        name: 'AutopsyReason',
        code: '[D.9.4.r.2]',
        placeholder: '',
        label: '尸检-确定的死因',
        prop: 'AutopsyReason',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: [],
        relate: ['MeddraAutopsyVersion', 'MeddraAutopsyCode', 'AutopsyReason'],
        isPanel: true
      },
      {
        dataName: 'result_information',
        type: 'textarea',
        name: 'ResultInformation',
        code: '[H.1]',
        placeholder: '',
        label: '病例叙述包括临床病程、治疗措施、结果及其他相关信息',
        prop: 'ResultInformation',
        maxLen: 500,
        fieldLimit: false,
        flex: 1,
        subName: '',
        rules: [{ required: true, message: '请填写相关信息', trigger: 'blur' }]
      }
    ]
  ]
])
// 实验室检查
export const CHECK_INFO = [
  {
    dataName: 'check_date',
    type: 'time',
    name: 'CheckDate',
    label: '检查日期',
    code: '[F.r.1]',
    placeholder: '请选择日期时间',
    dateType: 'date',
    format: 'timestamp',
    prop: 'CheckDate',
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'check_item',
    type: 'text',
    name: 'CheckItem',
    code: '[F.r.2.1]',
    placeholder: '',
    label: '检查项',
    prop: 'CheckItem',
    maxLen: 200,
    fieldLimit: false,
    flex: 0,
    isPanel: true,
    relate: ['MeddraItemVersion', 'MeddraItemCode', 'CheckItem'],
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'meddra_item_version',
    type: 'text',
    name: 'MeddraItemVersion',
    code: '[F.r.2.2a]',
    placeholder: '',
    option: [],
    prop: 'MeddraItemVersion',
    label: '编码检查项的MedDRA版本',
    subName: 'inspectionItem',
    isPanel: true,
    relate: ['MeddraItemVersion', 'MeddraItemCode', 'CheckItem'],
    rules: []
  },
  {
    dataName: 'meddra_item_code',
    type: 'text',
    name: 'MeddraItemCode',
    code: '[F.r.2.2b]',
    placeholder: '',
    label: '检查项（MedDRA编码数值）',
    prop: 'MeddraItemCode',
    maxLen: 200,
    fieldLimit: false,
    isPanel: true,
    relate: ['MeddraItemVersion', 'MeddraItemCode', 'CheckItem'],
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'ResultType',
    type: 'select',
    name: 'ResultType',
    code: '',
    placeholder: '',
    label: '结果',
    option: fieldE.resSelect,
    prop: 'ResultType',
    maxLen: 200,
    fieldLimit: false,
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'check_result_code',
    type: 'select',
    name: 'CheckResultCode',
    code: '[F.r.3.1]',
    placeholder: '',
    label: '检查结果（代码）',
    option: fieldE.result,
    prop: 'CheckResultCode',
    maxLen: 200,
    select: 1,
    isSelect: 'ResultType',
    fieldLimit: false,
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'check_result',
    type: 'text',
    name: 'CheckResult',
    code: '[F.r.3.2]',
    placeholder: '',
    option: [],
    prop: 'CheckResult',
    select: 2,
    label: '检查结果（值/限定符）',
    isSelect: 'ResultType',
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'check_result_unit',
    type: 'text',
    name: 'CheckResultUnit',
    code: '[F.r.3.3]',
    placeholder: '',
    select: 2,
    isSelect: 'ResultType',
    label: '检查结果（单位）',
    prop: 'CheckResultUnit',
    maxLen: 200,
    fieldLimit: false,
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'check_result_text',
    type: 'textarea',
    name: 'CheckResultText',
    code: '[F.r.3.4]',
    placeholder: '',
    label: '非结构化的检查结果（自由文本）',
    prop: 'CheckResultText',
    isSelect: 'ResultType',
    maxLen: 200,
    fieldLimit: false,
    select: 3,
    flex: 0,
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'min_value',
    type: 'number',
    name: 'MinValue',
    code: '[F.r.4]',
    placeholder: '',
    label: '正常范围最低值',
    isSelect: 'ResultType',
    prop: 'MinValue',
    maxLen: 200,
    select: 2,
    fieldLimit: false,
    subName: 'inspectionItem',
    rules: []
  },
  {
    dataName: 'max_value',
    type: 'number',
    name: 'MaxValue',
    code: '[F.r.5]',
    isSelect: 'ResultType',
    placeholder: '',
    label: '正常范围最高值',
    prop: 'MaxValue',
    maxLen: 200,
    select: 2,
    fieldLimit: false,
    subName: 'inspectionItem',
    rules: []
  }
  // {
  //   dataName: 'remark',
  //   type: 'textarea',
  //   name: 'Remark',
  //   code: '',
  //   placeholder: '',
  //   label: '备注（自由文本）',
  //   prop: 'Remark',
  //   maxLen: 200,
  //   fieldLimit: false,
  //   flex: 0,
  //   subName: 'inspectionItem',
  //   rules: []
  // }
  // {
  //   dataName: '',
  //   type: 'radio',
  //   name: 'Remark',
  //   code: '',
  //  placeholder: '',
  //   label: '更多的可用信息',
  //   option: [
  //     {
  //       name: '是',
  //       dataName: '',
  //       type: 1
  //     }
  //   ],
  //   prop: '',
  //   subName: '',
  // rules: []
  // }
]
// 妊娠报告有关信息
export const GRAVIDITY_INFO = new Map([
  [
    1,
    [
      {
        dataName: 'parents_name',
        type: 'text',
        name: 'ParentsName',
        code: '[D.10.1]',
        placeholder: '',
        label: '父/母姓名',
        prop: 'ParentsName',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_gender',
        type: 'select',
        name: 'ParentsGender',
        code: '[D.10.6]',
        placeholder: '',
        label: '性别',
        option: fieldI.parentsGenderSelect,
        prop: 'ParentsGender',
        maxLen: 200,
        fieldLimit: false,
        relateGender: ['MotherLastMenstruation', 'ParentsDesc'],
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_birth_time',
        type: 'time',
        name: 'ParentsBirthTime',
        label: '父/母出生日期',
        code: '[D.10.2.1]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'ParentsBirthTime',
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_age_numerical',
        type: 'number',
        name: 'ParentsAgeNumerical',
        code: '[D.10.2.2a]',
        placeholder: '',
        label: '年龄',
        prop: 'ParentsAgeNumerical',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_age_unit',
        type: 'select',
        option: dateTime,
        name: 'ParentsAgeUnit',
        code: '[D.10.2.2b]',
        placeholder: '',
        label: '年龄单位',
        prop: 'ParentsAgeUnit',
        maxLen: 200,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_height',
        type: 'number',
        name: 'ParentsHeight',
        code: '[D.10.5]',
        placeholder: '',
        label: '身高（cm）',
        prop: 'ParentsHeight',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_weight',
        type: 'number',
        name: 'ParentsWeight',
        code: '[D.10.4]',
        placeholder: '',
        label: '体重（kg）',
        prop: 'ParentsWeight',
        maxLen: 3,
        fieldLimit: false,
        subName: '',
        rules: []
      },
      {
        dataName: 'mother_last_menstruation',
        type: 'time',
        name: 'MotherLastMenstruation',
        label: '母亲末次月经日期',
        code: '[D.10.3]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'MotherLastMenstruation',
        subName: '',
        rules: []
      },
      {
        dataName: 'parents_desc',
        type: 'textarea',
        name: 'ParentsDesc',
        code: '[D.10.7.2]',
        placeholder: '',
        label: '妊娠相关描述项',
        prop: 'ParentsDesc',
        maxLen: 4000,
        fieldLimit: true,
        flex: 1,
        subName: '',
        rules: []
      }
    ]
  ],
  [
    2,
    [
      {
        dataName: 'MeddraName',
        type: 'text',
        name: 'MeddraName',
        code: '',
        placeholder: '',
        option: [],
        prop: 'MeddraName',
        label: '疾病名称',
        subName: 'illnessHistory',
        isPanel: true,
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        rules: []
      },
      {
        dataName: 'meddra_history_version',
        type: 'text',
        name: 'MeddraHistoryVersion',
        code: '[D.10.7.1.r.1a]',
        placeholder: '',
        option: [],
        prop: 'MeddraHistoryVersion',
        label: '编码病史的MedDRA版本',
        subName: 'illnessHistory',
        isPanel: true,
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        rules: []
      },
      {
        dataName: 'meddra_history_code',
        type: 'text',
        name: 'MeddraHistoryCode',
        code: '[D.10.7.1.r.1b]',
        placeholder: '',
        label: '病史（疾病/外科手术/等）（MedDRA编码）',
        prop: 'MeddraHistoryCode',
        maxLen: 200,
        fieldLimit: false,
        subName: 'illnessHistory',
        isPanel: true,
        relate: ['MeddraHistoryVersion', 'MeddraHistoryCode', 'MeddraName'],
        rules: []
      },
      {
        dataName: 'start_time',
        type: 'time',
        name: 'StartTime',
        label: '开始日期',
        code: '[D.10.7.1.r.2]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'StartTime',
        subName: 'illnessHistory',
        respondTime: ['StartTime', 'EndTime'],
        rules: []
      },
      // {
      //   dataName: 'is_continuous',
      //   type: 'radio',
      //   name: 'IsContinuous',
      //   code: '',
      //   placeholder: '',
      //   label: '是否持续',
      //   prop: 'IsContinuous',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'illnessHistory',
      //   option: [
      //     {
      //       type: 1,
      //       name: '否',
      //       id: 1
      //     },
      //     {
      //       type: 2,
      //       name: '是',
      //       id: 2
      //     }
      //   ],
      //   rules: []
      // },
      {
        dataName: 'end_time',
        type: 'time',
        name: 'EndTime',
        label: '结束日期',
        code: '[D.10.7.1.r.4]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'EndTime',
        respondTime: ['StartTime', 'EndTime'],
        subName: 'illnessHistory',
        rules: []
      },
      {
        dataName: 'remark',
        type: 'textarea',
        name: 'Remark',
        code: '[D.10.7.1.r.5]',
        placeholder: '',
        label: '备注',
        prop: 'Remark',
        maxLen: 2000,
        fieldLimit: true,
        flex: 1,
        subName: 'illnessHistory',
        rules: []
      }
      // {
      //   dataName: 'medical_records_disease_instructions',
      //   type: 'textarea',
      //   name: 'MedicalRecordsDiseaseInstructions',
      //   code: '',
      //   placeholder: '',
      //   label: '相关病史及并发疾病的文本说明',
      //   prop: 'MedicalRecordsDiseaseInstructions',
      //   maxLen: 4000,
      //   fieldLimit: true,
      //   flex: 1,
      //   subName: 'illnessHistory',
      //   rules: []
      // }
    ]
  ],
  [
    3,
    [
      {
        dataName: 'report_drug_name',
        type: 'text',
        name: 'ReportDrugName',
        code: '[D.10.8.r.1]',
        placeholder: '',
        label: '药品名称',
        prop: 'ReportDrugName',
        maxLen: 250,
        fieldLimit: false,
        subName: 'treatItems',
        rules: []
      },
      // {
      //   dataName: 'mpid_version_number',
      //   type: 'text',
      //   name: 'MpidVersionNumber',
      //   label: 'MPID版本日期/编号',
      //   code: '',
      //   placeholder: '',
      //   prop: '',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'mpid_number',
      //   type: 'text',
      //   name: 'MpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '医疗产品标识符（MPID）',
      //   prop: 'MpidNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_version_number',
      //   type: 'text',
      //   name: 'PhpidVersionNumber',
      //   label: 'PhPID版本日期/编号',
      //   code: '',
      //   placeholder: '',
      //   prop: 'PhpidVersionNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'phpid_number',
      //   type: 'text',
      //   name: 'PhpidNumber',
      //   code: '',
      //   placeholder: '',
      //   label: '药品标识符（PhPID）',
      //   prop: 'PhpidNumber',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      {
        dataName: 'drug_start_time',
        type: 'time',
        name: 'DrugStartTime',
        label: '开始日期',
        code: '[D.10.8.r.4]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'DrugStartTime',
        subName: 'treatItems',
        respondTime: ['DrugStartTime', 'DrugEndTime'],
        rules: []
      },
      {
        dataName: 'drug_end_time',
        type: 'time',
        name: 'DrugEndTime',
        label: '结束日期',
        code: '[D.10.8.r.5]',
        placeholder: '请选择日期时间',
        dateType: 'date',
        format: 'timestamp',
        prop: 'DrugEndTime',
        respondTime: ['DrugStartTime', 'DrugEndTime'],
        subName: 'treatItems',
        rules: []
      },
      {
        dataName: 'meddra_adapt_version',
        type: 'text',
        name: 'MeddraAdaptVersion',
        code: '[D.10.8.r.6a]',
        placeholder: '',
        prop: 'MeddraAdaptVersion',
        label: '编码适应症的MedDRA版本',
        maxLen: 200,
        fieldLimit: false,
        subName: 'treatItems',
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'DrugMeddraName'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'meddra_adapt_code',
        type: 'text',
        name: 'MeddraAdaptCode',
        code: '[D.10.8.r.6b]',
        placeholder: '',
        label: '适应症（MedDRA编码）',
        prop: 'MeddraAdaptCode',
        maxLen: 200,
        fieldLimit: false,
        subName: 'treatItems',
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'DrugMeddraName'],
        isPanel: true,
        rules: []
      },
      {
        dataName: 'DrugMeddraName',
        type: 'text',
        name: 'DrugMeddraName',
        code: '',
        placeholder: '',
        label: '适应症名称',
        prop: 'DrugMeddraName',
        maxLen: 200,
        fieldLimit: false,
        subName: 'treatItems',
        relate: ['MeddraAdaptVersion', 'MeddraAdaptCode', 'DrugMeddraName'],
        isPanel: true,
        rules: []
      }
      // {
      //   dataName: 'meddra_reaction_version',
      //   type: 'text',
      //   name: 'MeddraReactionVersion',
      //   code: '',
      //   placeholder: '',
      //   option: [],
      //   prop: 'MeddraReactionVersion',
      //   label: '编码反应的MedDRA版本',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   relate: ['MeddraReactionVersion', 'MeddraReactionCode'],
      //   isPanel: true,
      //   rules: []
      // },
      // {
      //   dataName: 'meddra_reaction_code',
      //   type: 'text',
      //   name: 'MeddraReactionCode',
      //   code: '',
      //   placeholder: '',
      //   label: '反应（MedDRA编码）',
      //   prop: 'MeddraReactionCode',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   relate: ['MeddraReactionVersion', 'MeddraReactionCode'],
      //   isPanel: true,
      //   rules: []
      // },
      // {
      //   dataName: 'parents_medicine_way',
      //   type: 'text',
      //   name: 'ParentsMedicineWay',
      //   code: '',
      //   placeholder: '',
      //   label: '父/母的给药途径术语ID',
      //   prop: 'ParentsMedicineWay',
      //   maxLen: 60,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'parents_medicine_way_id',
      //   type: 'text',
      //   name: 'ParentsMedicineWayId',
      //   code: '',
      //   placeholder: '',
      //   label: '父/母的给药途径（自由文本）',
      //   prop: 'ParentsMedicineWayId',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'main_medicine_way',
      //   type: 'text',
      //   name: 'MainMedicineWay',
      //   label: '主要给药途径术语ID版本日期/编号',
      //   code: '',
      //   placeholder: '',
      //   prop: 'MainMedicineWay',
      //   maxLen: 50,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'exposed_gestational_age_numerical',
      //   type: 'number',
      //   name: 'ExposedGestationalAgeNumerical',
      //   code: '',
      //   placeholder: '',
      //   label: '暴露时的孕龄(数字)',
      //   prop: 'ExposedGestationalAgeNumerical',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // },
      // {
      //   dataName: 'exposed_gestational_age_unit',
      //   type: 'select',
      //   name: 'ExposedGestationalAgeUnit',
      //   label: '暴露时的孕龄(单位)',
      //   code: '',
      //   placeholder: '',
      //   option: dateWeek,
      //   prop: 'ExposedGestationalAgeUnit',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'treatItems',
      //   rules: []
      // }
    ]
  ]
])
// 医学评估
export const MEDICAL_EVALUATE = new Map([
  [
    1,
    [
      {
        dataName: 'result_information',
        type: 'textarea',
        name: 'ResultInformation',
        code: '',
        placeholder: '',
        label: '病例叙述包括临床病程、治疗措施、结果及其他相关信息',
        prop: 'ResultInformation',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: [{ required: true, message: '请填写相关信息', trigger: 'blur' }]
      },
      {
        dataName: 'reporter_comment',
        type: 'textarea',
        name: 'ReporterComment',
        code: '',
        placeholder: '',
        label: '报告者的评论',
        prop: 'ReporterComment',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: []
      },
      {
        dataName: 'meddra_sender_version',
        type: 'text',
        name: 'MeddraSenderVersion',
        code: '',
        placeholder: '',
        label: '针对发送者诊断/症状和（或）反应/事件重新分类的MedDRA版本',
        prop: 'MeddraSenderVersion',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: [],
        relate: ['MeddraSenderVersion', 'MeddraSenderCode'],
        isPanel: true
      },
      {
        dataName: 'meddra_sender_code',
        type: 'text',
        name: 'MeddraSenderCode',
        code: '',
        placeholder: '',
        label: '发送者诊断/症状和（或）对不良反应/事件的重新分类（MedDRA编码数值）',
        prop: 'MeddraSenderCode',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: [],
        relate: ['MeddraSenderVersion', 'MeddraSenderCode'],
        isPanel: true
      },
      {
        dataName: 'sender_comment',
        type: 'textarea',
        name: 'SenderComment',
        code: '',
        placeholder: '',
        label: '发送者的评论',
        prop: 'SenderComment',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: []
      },
      {
        dataName: 'case_summary',
        type: 'textarea',
        name: 'CaseSummary',
        code: '',
        placeholder: '',
        label: '病例总结和报告者评论文本',
        prop: 'CaseSummary',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: []
      },
      {
        dataName: 'case_summary_lang',
        type: 'textarea',
        name: 'CaseSummaryLang',
        code: '',
        placeholder: '',
        label: '病例总结和报告者的注释语言',
        prop: 'CaseSummaryLang',
        maxLen: 500,
        fieldLimit: false,
        flex: 0,
        subName: '',
        rules: []
      }
    ]
  ],
  [
    2,
    [
      // {
      //   dataName: 'report_drug_name',
      //   type: 'text',
      //   name: 'ReportDrugName',
      //   code: '',
      //   placeholder: '',
      //   label: '主要来源报告的药品名称',
      //   prop: 'ReportDrugName',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: [{ required: true, message: '请输入药品名称', trigger: 'blur' }]
      // },
      {
        dataName: 'DoubtDetailId',
        type: 'select',
        name: 'DoubtDetailId',
        code: '',
        placeholder: '',
        label: '怀疑用药',
        prop: 'getCaseDoubtSelect',
        option: [],
        subName: 'drugEvaluation',
        rules: [{ required: true, message: '请选择怀疑用药', trigger: 'blur' }]
      },
      {
        dataName: 'BadReactionDetailId',
        type: 'select',
        name: 'BadReactionDetailId',
        code: '',
        placeholder: '',
        label: '不良反应',
        prop: 'getCaseBadReactionSelect',
        option: [],
        subName: 'drugEvaluation',
        rules: [{ required: true, message: '请选择不良反应', trigger: 'blur' }]
      },
      // {
      //   dataName: 'meddra_event_code',
      //   type: 'text',
      //   name: 'MeddraEventCode',
      //   code: '',
      //   placeholder: '',
      //   label: '反应/事件（MedDRA编码值）',
      //   prop: 'MeddraEventCode',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   relate: ['', 'MeddraEventCode'],
      //   isPanel: true,
      //   rules: [{ required: true, message: '请输入编码值', trigger: 'blur' }]
      // },
      {
        dataName: 'is_unexpected',
        type: 'radio',
        name: 'IsUnexpected',
        code: '[G.k.9.i.CN.1]',
        placeholder: '',
        label: '是否非预期',
        option: [
          {
            name: '否',
            dataName: '',
            type: 0
          },
          {
            name: '是',
            dataName: '',
            type: 1
          }
        ],
        prop: 'IsUnexpected',
        subName: 'drugEvaluation',
        rules: []
      },
      {
        dataName: 'event_disappear',
        type: 'select',
        name: 'EventDisappear',
        code: '[G.k.9.i.CN.2]',
        placeholder: '',
        label: '停药或减量后，反应是否消失或减轻',
        option: fieldF.result,
        prop: 'EventDisappear',
        maxLen: 200,
        fieldLimit: false,
        subName: 'drugEvaluation',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      {
        dataName: 'event_again',
        type: 'select',
        name: 'EventAgain',
        code: '[G.k.9.i.4]',
        placeholder: '',
        label: '再次使用可疑药品后，是否再次出现同样反应',
        option: fieldF.reaction,
        prop: 'EventAgain',
        maxLen: 200,
        flex: 0,
        fieldLimit: false,
        subName: 'drugEvaluation',
        rules: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      // {
      //   dataName: 'event_evaluation',
      //   type: 'text',
      //   name: 'EventEvaluation',
      //   code: '',
      //   placeholder: '',
      //   label: '反应/事件的评估',
      //   prop: 'EventEvaluation',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: []
      // },
      // {
      //   dataName: 'evaluation_source',
      //   type: 'text',
      //   name: 'EvaluationSource',
      //   code: '',
      //   placeholder: '',
      //   label: '评估的来源',
      //   prop: 'EvaluationSource',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: []
      // },
      // {
      //   dataName: 'evaluation_method',
      //   type: 'text',
      //   name: 'EvaluationMethod',
      //   code: '',
      //   placeholder: '',
      //   label: '评估方法',
      //   prop: 'EvaluationMethod',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: []
      // },
      // {
      //   dataName: 'reporter_evaluation_source',
      //   type: 'select',
      //   name: 'ReporterEvaluationSource',
      //   code: '[G.k.9.i.2.r.CN.1]',
      //   placeholder: '',
      //   label: '评估来源',
      //   option: fieldF.evaluation,
      //   prop: 'ReporterEvaluationSource',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: [{ required: true, message: '请选择评估来源', trigger: 'change' }]
      // },
      {
        dataName: 'reporter_evaluation_result',
        type: 'select',
        name: 'ReporterEvaluationResult',
        code: '[G.k.9.i.2.r.CN.2]',
        placeholder: '',
        label: '上市许可持有人评价',
        prop: 'ReporterEvaluationResult',
        option: fieldF.holderResult,
        subName: 'drugEvaluation',
        rules: [{ required: true, message: '请选择上市许可持有人评价', trigger: 'change' }]
      }
      // {
      //   dataName: 'reporter_evaluation_result',
      //   type: 'select',
      //   name: 'ReporterEvaluationResult',
      //   code: '',
      //   placeholder: '',
      //   label: '评估结果',
      //   option: fieldF.evaluationResult,
      //   prop: 'ReporterEvaluationResult',
      //   maxLen: 200,
      //   fieldLimit: false,
      //   subName: 'drugEvaluation',
      //   rules: [{ required: true, message: '请选择评估结果', trigger: 'change' }]
      // },
    ]
  ]
])
// 批量信息
export const BATCH_INFO = [
  {
    dataName: 'batch_type',
    type: 'text',
    name: 'BatchType',
    code: '[N.1.1]',
    placeholder: '',
    option: [],
    prop: 'BatchType',
    label: '批量信息类型',
    subName: '',
    rules: [{ required: true, message: '请选择批量(信息)类型', trigger: 'change' }]
  },
  {
    dataName: 'batch_number',
    type: 'text',
    name: 'BatchNumber',
    code: '[N.1.2]',
    placeholder: '',
    label: '批量(信息)编号',
    prop: 'BatchNumber',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写批量(信息)编号', trigger: 'blur' }]
  },
  {
    dataName: 'batch_sender_identifier',
    type: 'text',
    name: 'BatchSenderIdentifier',
    code: '[N.1.3]',
    placeholder: '',
    label: '批量(信息)发送者标识符',
    prop: 'BatchSenderIdentifier',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写批量(信息)发送者标识符', trigger: 'blur' }]
  },
  {
    dataName: 'batch_receiver_identifier',
    type: 'text',
    name: 'BatchReceiverIdentifier',
    code: '[N.1.4]',
    placeholder: '',
    label: '批量(信息)接收者标识符',
    prop: 'BatchReceiverIdentifier',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写批量(信息)接收者标识符', trigger: 'blur' }]
  },
  {
    dataName: 'batch_transfer_date',
    type: 'time',
    name: 'BatchTransferDate',
    label: '批量(信息)传输日期',
    code: '[N.1.5]',
    placeholder: '',
    dateType: 'date',
    format: 'timestamp',
    prop: 'BatchTransferDate',
    subName: '',
    rules: [{ required: true, message: '请选择批量(信息)传输日期', trigger: 'change' }]
  },
  {
    dataName: 'information_identifier',
    type: 'text',
    name: 'InformationIdentifier',
    code: '[N.2.r.1]',
    placeholder: '',
    label: '信息标识符',
    prop: 'InformationIdentifier',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写信息标识符', trigger: 'blur' }]
  },
  {
    dataName: 'message_sender_identifier',
    type: 'text',
    name: 'MessageSenderIdentifier',
    code: '[N.2.r.2]',
    placeholder: '',
    label: '信息发送者标识符',
    prop: 'MessageSenderIdentifier',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写信息发送者标识符', trigger: 'blur' }]
  },
  {
    dataName: 'message_receiver_identifier',
    type: 'text',
    name: 'MessageReceiverIdentifier',
    code: '[N.2.r.3]',
    placeholder: '',
    label: '信息接收者标识符',
    prop: 'MessageReceiverIdentifier',
    maxLen: 200,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请填写信息接收者标识符', trigger: 'blur' }]
  },
  {
    dataName: 'information_creation_date',
    type: 'time',
    name: 'InformationCreationDate',
    label: '信息创建日期',
    code: '[N.2.r.4]',
    placeholder: '',
    dateType: 'date',
    format: 'timestamp',
    prop: 'InformationCreationDate',
    subName: '',
    rules: [{ required: true, message: '请选择信息创建日期', trigger: 'change' }]
  },
  {
    dataName: 'Remark',
    type: 'textarea',
    name: 'Remark',
    label: '备注',
    code: '',
    placeholder: '',
    prop: 'Remark',
    subName: '',
    fieldLimit: true,
    flex: 1,
    maxLen: 2000,
    rules: []
  }
]
// 发送者
export const SEND_USER = [
  {
    dataName: 'sender_type',
    type: 'select',
    name: 'SenderType',
    code: '[C.3.1]',
    placeholder: '',
    label: '发送者类型',
    option: fieldH.senderType,
    prop: 'SenderType',
    subName: '',
    rules: [{ required: true, message: '请选择发送者类型', trigger: 'change' }]
  },
  {
    dataName: 'sender_mechanism',
    type: 'text',
    name: 'SenderMechanism',
    code: '[C.3.2]',
    placeholder: '',
    label: '发送者所在机构',
    prop: 'SenderMechanism',
    maxLen: 100,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'sender_appellation',
  //   type: 'text',
  //   name: 'SenderAppellation',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者的称谓',
  //   prop: 'SenderAppellation',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'sender_research_type',
  //   type: 'select',
  //   name: 'SenderResearchType',
  //   code: '[C.5.4]',
  //   placeholder: '',
  //   label: '发现该反应/事件时的研究的类型',
  //   option: fieldH.eventType,
  //   prop: 'SenderResearchType',
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'sender_department',
  //   type: 'text',
  //   name: 'SenderDepartment',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者所在部门',
  //   prop: 'SenderDepartment',
  //   maxLen: 60,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'sender_name',
    type: 'text',
    name: 'SenderName',
    code: '[C.3.3.3]',
    placeholder: '',
    label: '发送者名字',
    prop: 'SenderName',
    maxLen: 60,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'sender_middle_name',
  //   type: 'text',
  //   name: 'SenderMiddleName',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者中间名',
  //   prop: 'SenderMiddleName',
  //   maxLen: 60,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'sender_surname',
  //   type: 'text',
  //   name: 'SenderSurname',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者姓氏',
  //   prop: 'SenderSurname',
  //   maxLen: 60,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'sender_street_address',
    type: 'text',
    name: 'SenderStreetAddress',
    code: '[C.3.4.1]',
    placeholder: '',
    label: '发送者的街道地址',
    prop: 'SenderStreetAddress',
    maxLen: 60,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'sender_city',
    type: 'text',
    name: 'SenderCity',
    code: '[C.3.4.2]',
    placeholder: '',
    label: '发送者所在城市',
    prop: 'SenderCity',
    maxLen: 40,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'sender_province',
    type: 'text',
    name: 'SenderProvince',
    code: '[C.3.4.3]',
    placeholder: '',
    label: '发送者所在州或省',
    prop: 'SenderProvince',
    maxLen: 40,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'sender_postal_code',
  //   type: 'text',
  //   name: 'SenderPostalCode',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者的邮政编码',
  //   prop: 'SenderPostalCode',
  //   maxLen: 15,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'sender_country',
    type: 'text',
    name: 'SenderCountry',
    code: '[C.3.4.5]',
    placeholder: '',
    label: '发送者的国家代码',
    prop: 'SenderCountry',
    maxLen: 10,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'sender_phone',
    type: 'text',
    name: 'SenderPhone',
    code: '[C.3.4.6]',
    placeholder: '',
    label: '发送者的电话号码',
    prop: 'SenderPhone',
    maxLen: 33,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'sender_fax_number',
  //   type: 'text',
  //   name: 'SenderFaxNumber',
  //   code: '',
  //   placeholder: '',
  //   label: '发送者的传真号码',
  //   prop: 'SenderFaxNumber',
  //   maxLen: 33,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'sender_email',
    type: 'text',
    name: 'SenderEmail',
    code: '[C.3.4.8]',
    placeholder: '',
    label: '发送者的邮箱地址',
    prop: 'SenderEmail',
    maxLen: 100,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'literature_citation',
  //   type: 'textarea',
  //   name: 'LiteratureCitation',
  //   code: '',
  //   placeholder: '',
  //   label: '文献引用',
  //   prop: 'LiteratureCitation',
  //   maxLen: 500,
  //   fieldLimit: true,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: '',
  //   type: 'text',
  //   name: '',
  //   code: '',
  //   placeholder: '',
  //   label: '包含的文件',
  //   prop: '',
  //   maxLen: 200,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'research_registration_number',
  //   type: 'text',
  //   name: 'ResearchRegistrationNumber',
  //   code: '',
  //   placeholder: '',
  //   label: '研究注册编号',
  //   prop: 'ResearchRegistrationNumber',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'research_registration_country',
  //   type: 'text',
  //   name: 'ResearchRegistrationCountry',
  //   code: '',
  //   placeholder: '',
  //   label: '研究注册国家',
  //   prop: 'ResearchRegistrationCountry',
  //   maxLen: 10,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'research_name',
  //   type: 'textarea',
  //   name: 'ResearchName',
  //   code: '',
  //   placeholder: '',
  //   label: '研究名称',
  //   prop: 'ResearchName',
  //   maxLen: 2000,
  //   fieldLimit: true,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'sponsor_research_number',
  //   type: 'text',
  //   name: 'SponsorResearchNumber',
  //   code: '',
  //   placeholder: '',
  //   label: '申办者研究编号',
  //   prop: 'SponsorResearchNumber',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // }
  {
    dataName: 'sender_research_type',
    type: 'select',
    name: 'SenderResearchType',
    code: '[C.5.4]',
    placeholder: '',
    label: '发现该反应/事件时的研究的类型',
    option: fieldH.eventType,
    prop: 'SenderResearchType',
    subName: '',
    rules: []
  },
  {
    dataName: 'Remark',
    type: 'textarea',
    name: 'Remark',
    label: '备注',
    code: '',
    placeholder: '',
    prop: 'Remark',
    subName: '',
    fieldLimit: true,
    flex: 1,
    maxLen: 2000,
    rules: []
  }
]
// 报告者
export const REPORT_USER = [
  // {
  //   dataName: '',
  //   type: 'select',
  //   name: '',
  //   code: '[C.2.r.5]',
  //   placeholder: '',
  //   label: '基于监管目的的主要来源',
  //   option: fieldG.purpose,
  //   prop: '',
  //   maxLen: 200,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: [{ required: true, message: '请选择基于监管目的的主要来源', trigger: 'change' }]
  // },
  {
    dataName: 'reporter_country',
    type: 'text',
    name: 'ReporterCountry',
    code: '[C.2.r.3]',
    placeholder: '',
    label: '报告者的国家代码',
    prop: 'ReporterCountry',
    maxLen: 100,
    fieldLimit: false,
    subName: '',
    rules: [{ required: true, message: '请输入报告者的国家代码', trigger: 'blur' }]
  },
  {
    dataName: 'reporter_qualifications',
    type: 'select',
    name: 'ReporterQualifications',
    code: '[C.2.r.4]',
    placeholder: '',
    label: '报告者资质',
    option: fieldG.result,
    prop: 'ReporterQualifications',
    subName: '',
    rules: [{ required: true, message: '请选择报告者资质', trigger: 'change' }]
  },
  // {
  //   dataName: 'reporter_call',
  //   type: 'text',
  //   name: 'ReporterCall',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者称呼',
  //   prop: 'ReporterCall',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'reporter_organization',
    type: 'text',
    name: 'ReporterOrganization',
    code: '[C.2.r.2.1]',
    placeholder: '',
    label: '报告者所在机构',
    prop: 'ReporterOrganization',
    maxLen: 60,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'reporter_name',
    type: 'text',
    name: 'ReporterName',
    code: '[C.2.r.1.2]',
    placeholder: '',
    label: '报告者名字',
    prop: 'ReporterName',
    maxLen: 50,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  // {
  //   dataName: 'reporter_middle_name',
  //   type: 'text',
  //   name: 'ReporterMiddleName',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者中间名',
  //   prop: 'ReporterMiddleName',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_surname',
  //   type: 'text',
  //   name: 'ReporterSurname',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者姓氏',
  //   prop: 'ReporterSurname',
  //   maxLen: 50,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_department',
  //   type: 'text',
  //   name: 'ReporterDepartment',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者所在部门',
  //   prop: 'ReporterDepartment',
  //   maxLen: 60,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_street_address',
  //   type: 'text',
  //   name: 'ReporterStreetAddress',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者所在街道地址',
  //   prop: 'ReporterStreetAddress',
  //   maxLen: 60,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_city',
  //   type: 'text',
  //   name: 'ReporterCity',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者所在城市',
  //   prop: 'ReporterCity',
  //   maxLen: 35,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_province',
  //   type: 'text',
  //   name: 'ReporterProvince',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者所在州或省',
  //   prop: 'ReporterProvince',
  //   maxLen: 40,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  // {
  //   dataName: 'reporter_postal_code',
  //   type: 'text',
  //   name: 'ReporterPostalCode',
  //   code: '',
  //   placeholder: '',
  //   label: '报告者的邮政编码',
  //   prop: 'ReporterPostalCode',
  //   maxLen: 15,
  //   fieldLimit: false,
  //   subName: '',
  //   rules: []
  // },
  {
    dataName: 'reporter_phone',
    type: 'text',
    name: 'ReporterPhone',
    code: '[C.2.r.2.7]',
    placeholder: '',
    label: '报告者的电话',
    prop: 'ReporterPhone',
    maxLen: 33,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'reporter_email',
    type: 'text',
    name: 'ReporterEmail',
    code: '[C.2.r.CN.1]',
    placeholder: '',
    label: '电子邮箱',
    prop: 'ReporterEmail',
    maxLen: 100,
    fieldLimit: false,
    subName: '',
    rules: []
  },
  {
    dataName: 'first_reporter_evaluation',
    type: 'select',
    name: 'FirstReporterEvaluation',
    code: '[G.k.9.i.2.r.CN.2]',
    placeholder: '',
    label: '初始报告人评价',
    prop: 'FirstReporterEvaluation',
    option: fieldF.holderResult,
    subName: '',
    rules: [{ required: true, message: '请选择初始报告人评价', trigger: 'change' }]
  }
]
