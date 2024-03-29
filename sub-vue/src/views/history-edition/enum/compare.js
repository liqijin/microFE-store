/**
 * 表单select数据列表
 * @desc label-显示文案，value-入参字段，id-唯一键
 */
// 时间下拉选项
export const dateTime = [
  {
    value: '年',
    label: '年',
    id: 1
  },
  {
    value: '月',
    label: '月',
    id: 2
  },
  {
    value: '周',
    label: '周',
    id: 3
  },
  {
    value: '日',
    label: '日',
    id: 4
  },
  {
    value: '小时',
    label: '小时',
    id: 5
  }
]
export const dateWeek = dateTime.filter(el => ['月', '周', '日'].includes(el.label))
export const dateDetail = ['年', '月', '周', '天', '小时', '分']

export const fieldA = {
  reportSource: [
    {
      value: 1,
      label: '监管机构',
      id: 1
    },
    {
      value: 2,
      label: '个人',
      id: 2
    },
    {
      value: 3,
      label: '医疗机构',
      id: 3
    },
    {
      value: 4,
      label: '经营企业',
      id: 4
    },
    {
      value: 5,
      label: '文献',
      id: 5
    },
    {
      value: 6,
      label: '研究',
      id: 6
    },
    {
      value: 7,
      label: '项目',
      id: 7
    },
    {
      value: 8,
      label: '其他',
      id: 8
    }
  ],
  reportSort: [
    {
      value: 11,
      label: '上市前境内报告',
      id: 1
    },
    {
      value: 12,
      label: '上市后境内报告',
      id: 2
    },
    {
      value: 21,
      label: '上市前境外报告',
      id: 3
    },
    {
      value: 22,
      label: '上市后境外报告',
      id: 4
    }
  ],
  reportType: [
    {
      value: 1,
      label: '自发性报告',
      id: 1
    },
    {
      value: 2,
      label: '研究报告',
      id: 2
    },
    {
      value: 3,
      label: '其他',
      id: 3
    },
    {
      value: 4,
      label: '对发送者不可用（未知）',
      id: 4
    }
  ]
}

export const fieldB = {
  nation: [
    { label: '汉族', value: '汉族', id: 0 },
    { label: '蒙古族', value: '蒙古族', id: 1 },
    { label: '回族', value: '回族', id: 2 },
    { label: '藏族', value: '藏族', id: 3 },
    { label: '维吾尔族', value: '维吾尔族', id: 4 },
    { label: '苗族', value: '苗族', id: 5 },
    { label: '彝族', value: '彝族', id: 6 },
    { label: '壮族', value: '壮族', id: 7 },
    { label: '布依族', value: '布依族', id: 8 },
    { label: '朝鲜族', value: '朝鲜族', id: 9 },
    { label: '满族', value: '满族', id: 10 },
    { label: '侗族', value: '侗族', id: 11 },
    { label: '瑶族', value: '瑶族', id: 12 },
    { label: '白族', value: '白族', id: 13 },
    { label: '土家族', value: '土家族', id: 14 },
    { label: '哈尼族', value: '哈尼族', id: 15 },
    { label: '哈萨克族', value: '哈萨克族', id: 16 },
    { label: '傣族', value: '傣族', id: 17 },
    { label: '黎族', value: '黎族', id: 18 },
    { label: '傈僳族', value: '傈僳族', id: 19 },
    { label: '佤族', value: '佤族', id: 20 },
    { label: '畲族', value: '畲族', id: 21 },
    { label: '高山族', value: '高山族', id: 22 },
    { label: '拉祜族', value: '拉祜族', id: 23 },
    { label: '水族', value: '水族', id: 24 },
    { label: '东乡族', value: '东乡族', id: 25 },
    { label: '纳西族', value: '纳西族', id: 26 },
    { label: '景颇族', value: '景颇族', id: 27 },
    { label: '柯尔克孜族', value: '柯尔克孜族', id: 28 },
    { label: '土族', value: '土族', id: 29 },
    { label: '达斡尔族', value: '达斡尔族', id: 30 },
    { label: '仫佬族', value: '仫佬族', id: 31 },
    { label: '羌族', value: '羌族', id: 32 },
    { label: '布朗族', value: '布朗族', id: 33 },
    { label: '撒拉族', value: '撒拉族', id: 34 },
    { label: '毛南族', value: '毛南族', id: 35 },
    { label: '仡佬族', value: '仡佬族', id: 36 },
    { label: '锡伯族', value: '锡伯族', id: 37 },
    { label: '阿昌族', value: '阿昌族', id: 38 },
    { label: '普米族', value: '普米族', id: 39 },
    { label: '塔吉克族', value: '塔吉克族', id: 40 },
    { label: '怒族', value: '怒族', id: 41 },
    { label: '乌孜别克族', value: '乌孜别克族', id: 42 },
    { label: '俄罗斯族', value: '俄罗斯族', id: 43 },
    { label: '鄂温克族', value: '鄂温克族', id: 44 },
    { label: '德昂族', value: '德昂族', id: 45 },
    { label: '保安族', value: '保安族', id: 46 },
    { label: '裕固族', value: '裕固族', id: 47 },
    { label: '京族', value: '京族', id: 48 },
    { label: '塔塔尔族', value: '塔塔尔族', id: 49 },
    { label: '独龙族', value: '独龙族', id: 50 },
    { label: '鄂伦春族', value: '鄂伦春族', id: 51 },
    { label: '赫哲族', value: '赫哲族', id: 52 },
    { label: '门巴族', value: '门巴族', id: 53 },
    { label: '珞巴族', value: '珞巴族', id: 54 },
    { label: '基诺族', value: '基诺族', id: 55 }
  ],
  race: [
    {
      label: '东亚人种（黄种人）',
      value: 1,
      id: 1
    },
    {
      label: '高加索人种（白种人）',
      value: 2,
      id: 2
    },
    {
      label: '尼格罗人种（黑种人）',
      value: 3,
      id: 3
    },
    {
      label: '澳洲人种（棕种人）',
      value: 4,
      id: 4
    }
  ],
  ages: [
    {
      id: 1,
      value: 0,
      label: '胎儿'
    },
    {
      id: 2,
      value: 1,
      label: '婴儿（早产和足月新生儿）'
    },
    {
      id: 3,
      value: 2,
      label: '幼儿'
    },
    {
      id: 4,
      value: 3,
      label: '儿童'
    },
    {
      id: 5,
      value: 4,
      label: '青少年'
    },
    {
      id: 6,
      value: 5,
      label: '成年'
    },
    {
      id: 7,
      value: 6,
      label: '老年'
    }
  ]
}

export const fieldC = {
  feature: [
    {
      id: 1,
      value: 1,
      label: '怀疑'
    },
    {
      id: 3,
      value: 3,
      label: '相互作用'
    },
    {
      id: 4,
      value: 4,
      label: '未用药'
    }
  ],
  featureMerge: [
    {
      id: 2,
      value: 2,
      label: '并用'
    },
    {
      id: 3,
      value: 3,
      label: '相互作用'
    },
    {
      id: 4,
      value: 4,
      label: '未用药'
    }
  ],
  measure: [
    {
      id: 1,
      value: 1,
      label: '停止用药'
    },
    {
      id: 2,
      value: 2,
      label: '减少剂量'
    },
    {
      id: 3,
      value: 3,
      label: '增加剂量'
    },
    {
      id: 4,
      value: 4,
      label: '剂量不变'
    },
    {
      id: 9,
      value: 9,
      label: '不适用'
    },
    {
      id: 0,
      value: 0,
      label: '不详'
    }
  ],
  drugList: [
    {
      id: 1,
      value: 1,
      label: '假药'
    },
    {
      id: 2,
      value: 2,
      label: '用药过量'
    },
    {
      id: 3,
      value: 3,
      label: '父源暴露'
    },
    {
      id: 4,
      value: 4,
      label: '使用了超出有效期的药品'
    },
    {
      id: 5,
      value: 5,
      label: '检测并合格的批号'
    },
    {
      id: 6,
      value: 6,
      label: '检测并不合格的批号'
    },
    {
      id: 7,
      value: 7,
      label: '用药错误'
    },
    {
      id: 8,
      value: 8,
      label: '误用'
    },
    {
      id: 9,
      value: 9,
      label: '滥用'
    },
    {
      id: 10,
      value: 10,
      label: '职业暴露'
    },
    {
      id: 11,
      value: 11,
      label: '超说明书使用'
    }
  ]
}

export const fieldD = {
  terminology: [
    {
      label: '是，由报告者强调，非严重',
      id: 1,
      value: 1
    },
    {
      label: '否，报告者未强调，非严重',
      id: 2,
      value: 2
    },
    {
      label: '是，由报告者强调，严重',
      id: 3,
      value: 3
    },
    {
      label: '否，报告者未强调，严重',
      id: 4,
      value: 4
    }
  ],
  situation: [
    {
      label: '痊愈',
      id: 1,
      value: 1
    },
    {
      label: '好转/缓解',
      id: 2,
      value: 2
    },
    {
      label: '未好转/未缓解/持续',
      id: 3,
      value: 3
    },
    {
      label: '痊愈伴有后遗症',
      id: 4,
      value: 4
    },
    {
      label: '致死',
      id: 5,
      value: 5
    },
    {
      label: '未知',
      id: 0,
      value: 0
    }
  ]
}

export const fieldE = {
  result: [
    {
      label: '阳性',
      id: 1,
      value: 1
    },
    {
      label: '阴性',
      id: 2,
      value: 2
    },
    {
      label: '临界值',
      id: 3,
      value: 3
    },
    {
      label: '没有结论',
      id: 4,
      value: 4
    }
  ],
  resSelect: [
    {
      id: 1,
      value: 1,
      label: '定性结果'
    },
    {
      id: 2,
      value: 2,
      label: '定量结果'
    },
    {
      id: 3,
      value: 3,
      label: '结果描述'
    }
  ]
}

export const fieldF = {
  evaluation: [
    {
      label: '初始报告人',
      id: 1,
      value: 1
    },
    {
      label: '上市许可持有人',
      id: 2,
      value: 2
    }
  ],
  reaction: [
    {
      label: '是-是（再次给药后，再次发生反应）',
      id: 1,
      value: 1
    },
    {
      label: '是-否（再次给药后，未再次发生反应）',
      id: 2,
      value: 2
    },
    {
      label: '是-未知（再次给药后，结果未知）',
      id: 3,
      value: 3
    },
    {
      label: '否-不适用（未再次给药，再次发生不适用）',
      id: 4,
      value: 4
    }
  ],
  evaluationResult: [
    {
      label: '肯定',
      id: 1,
      value: 1
    },
    {
      label: '很可能',
      id: 2,
      value: 2
    },
    {
      label: '可能',
      id: 3,
      value: 3
    },
    {
      label: '可能无关',
      id: 4,
      value: 4
    },
    {
      label: '无法评价',
      id: 5,
      value: 5
    },
    {
      label: '待评价',
      id: 6,
      value: 6
    }
  ],
  result: [
    {
      label: '是',
      id: 1,
      value: 1
    },
    {
      label: '否',
      id: 2,
      value: 2
    },
    {
      label: '不详',
      id: 3,
      value: 3
    },
    {
      label: '不适用',
      id: 4,
      value: 4
    }
  ],
  holderResult: [
    {
      value: 1,
      label: '肯定'
    },
    {
      value: 2,
      label: '很可能'
    },
    {
      value: 3,
      label: '可能'
    },
    {
      value: 4,
      label: '可能无关'
    },
    {
      value: 5,
      label: '无法评价'
    },
    {
      value: 6,
      label: '待评价'
    }
  ]
}

export const fieldG = {
  result: [
    {
      label: '医生',
      id: 1,
      value: 1
    },
    {
      label: '药师',
      id: 2,
      value: 2
    },
    {
      label: '其他医疗保健专业人士',
      id: 3,
      value: 3
    },
    {
      label: '律师',
      id: 4,
      value: 4
    },
    {
      label: '消费者或其他非医疗保健专业人士',
      id: 5,
      value: 5
    },
    {
      label: '不完整信息',
      id: 6,
      value: 6
    }
  ],
  purpose: [
    {
      label: '主要',
      value: 1,
      id: 1
    }
  ]
}

export const fieldH = {
  senderType: [
    {
      label: '制药公司',
      id: 1,
      value: 1
    },
    {
      label: '监管机构',
      id: 2,
      value: 2
    },
    {
      label: '医疗保健专业人士',
      id: 3,
      value: 3
    },
    {
      label: '地区药物警戒中心',
      id: 4,
      value: 4
    },
    {
      label: 'WHO国际药物监测合作中心',
      id: 5,
      value: 5
    },
    {
      label: '其他（例如：经销商或其他机构）',
      id: 6,
      value: 6
    },
    {
      label: '患者／消费者',
      id: 7,
      value: 7
    }
  ],
  eventType: [
    {
      label: '临床试验',
      value: 1,
      id: 1
    },
    {
      label: '个例患者使用（例如“同情使用”或“指定患者使用”）',
      value: 2,
      id: 2
    },
    {
      label: '其他研究（例如药物流行病学、药物经济学、重点监测）',
      value: 3,
      id: 3
    }
  ]
}

export const fieldI = {
  parentsGenderSelect: [
    {
      label: '男性',
      value: 1,
      id: 1
    },
    {
      label: '女性',
      value: 2,
      id: 2
    },
    {
      label: 'MSK',
      value: 3,
      id: 3
    },
    {
      label: 'UNK',
      value: 4,
      id: 4
    },
    {
      label: 'ASKU',
      value: 5,
      id: 5
    },
    {
      label: 'NASK',
      value: 6,
      id: 6
    }
  ]
}
// 用法用量剂型
export const avenueList = [
  '耳部用药',
  '口腔用药',
  '皮肤用药',
  '牙科用药',
  '宫颈内用药',
  '鼻窦内用药',
  '气管肺内用药',
  '硬膜外用药',
  '损伤表面用药',
  '羊膜外用药',
  '外用药',
  '胃部用药',
  '胃肠道用药',
  '牙龈用药',
  '血液透析',
  '植入',
  '浸润',
  '吸入用药',
  '肠道用药',
  '羊膜腔内用药',
  '动脉内用药',
  '关节内用药',
  '囊内用药',
  '前房内用药',
  '心内用药',
  '软骨内用药',
  '病理腔内用药',
  '脑内用药',
  '脑室内用药',
  '宫颈内用药',
  '胆胰管内用药',
  '脑池内用药',
  '角膜内用药',
  '冠状动脉内用药',
  '真皮内用药',
  '椎间盘内用药',
  '表皮内用药',
  '腺体内用药',
  '病灶内用药',
  '淋巴内用药',
  '肌内注射',
  '眼内用药',
  '骨内用药',
  '心包内用药',
  '腹膜内用药',
  '胸膜内用药',
  '门静脉内用药',
  '前列腺内用药',
  '胸骨内用药',
  '鞘内用药',
  '肿瘤内用药',
  '子宫内用药',
  '静脉用药',
  '膀胱内用药',
  '玻璃体内用药',
  '可溶盐离子导入',
  '咽喉用药',
  '指甲用药',
  '鼻腔用药',
  '眼部用药',
  '口服用药',
  '口腔粘膜用药',
  '口咽用药',
  '关节周围用药',
  '神经周围用药',
  '牙周用药',
  '骨周用药',
  '肿瘤周围用药',
  '巩膜后用药',
  '直肠用药',
  '球后用药',
  '用药途径不适用',
  '皮肤划痕',
  '结膜下用药',
  '皮下用药',
  '舌下用药',
  '粘膜下用药',
  '视网膜下用药',
  '透皮用药',
  '尿道用药',
  '阴道用药'
]
// 用法用量给药途径
export const dosageForm = [
  '可吸收涂层海绵',
  '气雾剂',
  '血液抗凝和防腐剂',
  '沐浴添加剂',
  '膀胱冲洗剂',
  '颊膜剂',
  '含片',
  '扁囊剂',
  '小胶囊',
  '硬胶囊（胶囊）',
  '软胶囊（胶丸）',
  '可咀嚼软胶囊',
  '咀嚼片',
  '可咀嚼/分散片剂',
  '涂层颗粒剂',
  '包衣片',
  '火棉胶',
  '压缩的锭剂',
  '输液溶液用浓溶液',
  '皮肤用溶液用浓溶液',
  '皮肤喷雾乳剂浓溶液',
  '输液分散剂用浓溶液',
  '输液乳用浓溶液',
  '含漱用浓溶液',
  '膀胱内溶液浓溶液',
  '雾化溶液浓溶液',
  '口服液浓缩液',
  '口服混悬剂浓缩液',
  '口服/直肠溶液用浓缩液',
  '口腔黏膜溶液浓缩液',
  '腹膜透析用溶液浓缩液',
  '直肠溶液剂用浓溶液',
  '血液透析用浓溶液',
  '输液用浓溶液',
  '注射用浓溶液',
  '注射/输注用溶液',
  '眼内冲洗溶液用浓溶液',
  '膀胱内用溶液用浓溶液',
  '腹膜透析液用浓溶液',
  '输液用混悬剂用浓溶液',
  '注射混悬剂用浓溶液',
  '乳膏',
  '皮肤和鼻腔用软膏剂',
  '皮肤用乳液',
  '泡沫剂',
  '皮肤用液体',
  '皮肤用糊剂',
  '皮肤贴片',
  '皮肤用粉剂',
  '皮肤用溶液',
  '皮肤/口腔粘膜溶液用浓溶液',
  '含药海棉',
  '皮肤喷雾乳剂',
  '皮肤喷雾软膏剂',
  '皮肤用粉雾剂',
  '溶液型皮肤用喷雾剂',
  '混悬剂型皮肤用喷雾剂',
  '皮肤用棒剂',
  '皮肤混悬剂',
  '皮肤用/滴耳用混悬剂',
  '皮肤/鼻腔软膏剂',
  '皮肤/口腔黏膜喷雾剂',
  '皮肤/口腔粘膜/口腔用溶液',
  '牙科粘合剂',
  '牙科用乳液',
  '牙胶',
  '牙插入剂',
  '牙膏',
  '牙粉',
  '牙科用溶液',
  '牙栓',
  '牙科用混悬剂',
  '义齿光洁剂',
  '分散片',
  '剂量分配分散片剂',
  '分散体',
  '输液用浓溶液分散体',
  '输液用分散体',
  '注射用分散体',
  '注射/输注用分散体',
  '耳乳膏剂',
  '滴耳乳剂',
  '滴耳液，粉剂于悬浮',
  '滴耳液',
  '混悬剂型滴耳液',
  '耳用凝胶',
  '耳用软膏剂',
  '耳用散',
  '乳状液型耳用喷雾剂',
  '溶液型耳用喷雾剂',
  '混悬剂型耳用喷雾剂',
  '耳栓',
  '耳塞剂',
  '乳状液型洗耳液',
  '洗耳液',
  '溶液型滴耳液/滴眼液',
  '滴耳/滴眼混悬剂',
  '耳用软膏剂/眼膏',
  '溶液型滴耳液/滴眼液/滴鼻液',
  '溶液型滴耳液/滴眼液/滴鼻液',
  '滴耳/滴鼻混悬剂',
  '泡腾口含片',
  '泡腾颗粒',
  '口服混悬泡腾颗粒剂',
  '泡腾散',
  '泡腾片',
  '阴道泡腾片',
  '注射乳剂',
  '乳状液型输液',
  '乳状液型注射液',
  '注射用/输液用乳剂',
  '注射用混悬乳剂',
  '宫颈凝胶剂',
  '窦内溶液',
  '混悬剂型内窦洗剂',
  '支气管滴注液用粉',
  '支气管滴注液混悬用粉',
  '支气管滴注液',
  '混悬型支气管滴注液',
  '损伤面溶液',
  '眼用乳膏',
  '乳状液型滴眼液',
  '溶液型滴眼液用粉',
  '混悬型滴眼液用粉',
  '缓释滴眼液',
  '溶液型滴眼液',
  '滴眼液配制溶剂',
  '混悬型滴眼液',
  '眼用凝胶',
  '洗眼剂',
  '洗眼剂配制溶剂',
  '眼膏',
  '肠溶薄膜包衣片剂',
  '薄膜包衣片',
  '封闭剂用冷冻溶液',
  '含漱液',
  '含漱液用粉剂',
  '含漱液用片',
  '含漱液/漱口水',
  '漱口液/洗鼻液',
  '气体分散型输液',
  '气体分散型注射液',
  '注射/输液用分散气体',
  '胃肠用乳剂',
  '胃肠用溶液',
  '胃肠用混悬剂',
  '肠溶胶囊',
  '肠溶胶丸',
  '肠溶片',
  '肠溶颗粒',
  '肠溶口服干混悬剂',
  '肠溶缓释片剂',
  '肠溶片',
  '凝胶',
  '凝胶',
  '注射用凝胶',
  '牙龈用凝胶',
  '牙龈用糊剂',
  '牙龈用溶液',
  '颗粒',
  '口腔和直肠混悬液用颗粒',
  '溶液型口服滴剂用颗粒',
  '口服溶液用颗粒',
  '口服混悬剂用颗粒',
  '口腔和直肠混悬剂颗粒剂',
  '直肠混悬颗粒剂',
  '注射混悬颗粒剂',
  '糖浆用颗粒',
  '阴道溶液用颗粒',
  '含耐胃颗粒硬胶囊',
  '茶',
  '植入剂',
  '植入链',
  '植入矩阵',
  '植入膏剂',
  '植入混悬剂',
  '植入片剂',
  '浸药敷料',
  '药垫',
  '浸渍插头',
  '吸入气体',
  '吸入浸渍垫',
  '吸入粉雾剂',
  '硬胶囊型吸入粉雾剂',
  '预混型吸入粉雾剂',
  '片剂型吸入粉剂',
  '吸入溶液',
  '胶囊型吸入蒸气',
  '泡腾片型吸入蒸气',
  '乳剂型吸入蒸气',
  '药垫型吸入蒸气',
  '浸渍插头型吸入蒸气',
  '液体蒸气吸入剂',
  '软膏剂型蒸气吸入剂',
  '粉剂型蒸气吸入剂',
  '溶液型蒸气吸入剂',
  '片剂型蒸气吸入剂',
  '速溶茶',
  '肠凝胶剂',
  '眼内滴注溶液',
  '腹腔内溶液',
  '子宫内给药系统',
  '宫内凝胶剂',
  '阴道环',
  '膀胱内溶液',
  '膀胱内溶液/注射液',
  '膀胱内混悬剂',
  '冲洗液',
  '植入物套件',
  '放射性药品制备试剂盒',
  '喉咽溶液',
  '喉咽喷雾溶液',
  '牙科用液化气体',
  '活组织供体',
  '锭剂',
  '植入矩阵基质',
  '含药口香糖',
  '含药指甲油',
  '药膏',
  '含药海绵',
  '含药线',
  '加药阴道塞',
  '医用压缩气体',
  '医用低温气体',
  '医用液化气体',
  '医用幼虫',
  '医用水蛭',
  '控释胶囊',
  '控释胶丸',
  '改性释放薄膜包衣片剂',
  '控释颗粒',
  '控释口服混悬颗粒剂',
  '控释片',
  '漱口水',
  '漱口水用粉',
  '漱口水用片',
  '粘性口腔缓释片',
  '口腔黏膜贴片',
  '指甲用溶液',
  '鼻用乳膏',
  '乳状液型滴鼻剂',
  '粉溶液型滴鼻液',
  '溶液型滴鼻剂',
  '混悬型滴鼻剂',
  '鼻用凝胶',
  '鼻用软膏剂',
  '鼻用散',
  '鼻腔喷雾和口腔粘膜用溶液',
  '乳状液型鼻喷雾剂',
  '粉溶液型鼻腔喷雾',
  '鼻腔喷雾溶液',
  '鼻腔喷雾/口腔粘液溶液',
  '混悬型鼻喷雾剂',
  '鼻用棒剂',
  '洗鼻剂',
  '鼻/口腔粘膜溶液',
  '鼻/口腔粘膜喷雾溶液',
  '雾化乳液',
  '雾化液',
  '雾化混悬剂',
  '软膏剂',
  '眼内插入剂',
  '眼科带',
  '乳状液型口服滴剂',
  '溶液颗粒型口服滴剂',
  '液体型口服滴剂',
  '口服滴剂，混悬剂用粉剂',
  '溶液型口服滴剂',
  '口服混悬滴剂',
  '口服乳剂',
  '口服凝胶',
  '口胶',
  '口服草药材料',
  '口服液体',
  '口服冻干粉',
  '口服糊剂',
  '口服散剂',
  '口服溶液',
  '口服溶液/雾化溶液浓溶液',
  '口服混悬剂',
  '口服/直肠溶液',
  ' 口服/直肠混悬剂',
  '口腔分散膜',
  '口腔分散片',
  '口腔用胶囊',
  '口腔用乳膏',
  '口腔用滴剂',
  '口腔用凝胶',
  '口腔黏膜软膏剂',
  '口腔用糊剂',
  '口腔贴剂',
  '口腔用溶液',
  '口腔粘膜喷雾剂',
  '口腔粘膜喷雾乳剂',
  '口腔粘膜喷雾溶液',
  '口腔粘膜喷雾混悬剂',
  '口腔用混悬剂',
  '口腔粘膜/喉咽溶液',
  '口腔粘膜/喉咽用溶液/喷雾剂',
  '口腔粘膜/喉咽溶液/喷雾剂',
  '锭剂',
  '牙周胶',
  '牙周插入剂',
  '牙周粉',
  '子宫托',
  '丸剂',
  '丸',
  '激发试验用硬膏剂',
  '袋',
  '泥敷剂',
  '膀胱冲洗剂用粉',
  '输液分散浓溶液用粉',
  '用于血液透析溶液的浓缩物粉剂',
  '膀胱内混悬浓溶液用粉',
  '血液透析浓溶液用粉',
  '输液浓溶液用粉',
  ' 输液/注射液浓溶液用粉',
  '皮肤溶液用粉',
  '牙科水泥用粉',
  '牙胶用粉',
  '牙科溶液用粉',
  '输液分散剂用粉',
  '注射液分散剂用粉',
  '注射乳剂用粉',
  '宫颈凝胶用粉',
  '窦内溶液用粉',
  '损伤面溶液用粉',
  '凝胶用粉',
  '牙龈凝胶用粉',
  '植入基质粉剂',
  '植入膏粉剂',
  '植入混悬剂粉剂',
  '眼内滴注溶液粉剂',
  '膀胱内溶液粉剂',
  '膀胱内溶液/注射液粉剂',
  '膀胱内混悬剂粉剂',
  '漱口水用粉剂',
  '雾化液用粉',
  '雾化器溶液/注射液/输液用粉剂',
  '雾化混悬剂用粉',
  '口服溶液用粉',
  '口服混悬剂用粉',
  '口服/直肠混悬液用粉',
  '注射缓释混悬剂粉剂',
  '直肠溶液剂用粉',
  '直肠混悬剂用粉',
  '封闭剂用粉',
  '输液用粉',
  '溶液型注射液用粉剂',
  '注射或输液用粉剂',
  '注射/输注溶液的粉剂',
  '注射溶液/皮肤针刺试验溶液用粉',
  '眼内冲洗液用粉剂',
  '膀胱内使用溶液用粉剂',
  '可溶盐离子导入溶液用粉剂',
  '鼻喷雾剂用粉剂',
  '皮肤针刺试验溶液用粉',
  '溶液用粉剂/注射用混悬剂',
  '注射混悬剂制备用粉剂',
  '糖浆用粉',
  '阴道溶液粉剂',
  '乳状液型吸入气雾剂',
  '溶液型吸入气雾剂',
  '混悬型吸入气雾剂',
  '缓释胶囊',
  '缓释胶丸',
  '缓释薄膜包衣片剂',
  '缓释颗粒',
  '口服混悬剂的延长释放颗粒',
  '缓释注射液',
  '注射缓释混悬剂',
  '缓释片',
  '放射性核素发生器',
  '放射性药物前体',
  '放射性药物前体溶液',
  '直肠胶囊',
  '直肠乳膏',
  '直肠乳剂',
  '直肠泡沫剂',
  '直肠凝胶',
  '直肠软膏剂',
  '直肠溶液剂',
  '直肠混悬剂',
  '直肠塞',
  '头皮用溶液',
  '擦洗',
  '封闭剂',
  '封闭基质',
  '封闭粉',
  '洗发液',
  '可溶片',
  '血液成分修改溶液',
  '心脏停搏溶液',
  '心脏停搏/器官保存溶液',
  '牙科粘合剂溶液',
  '血液透析过滤溶液',
  '血液透析液',
  '血液透析/血液过滤溶液',
  '血液过滤溶液',
  '输液溶液',
  '输液用溶液和口服液',
  '溶液型注射液',
  '注射用溶液/输液用溶液浓缩液',
  '注射/输液溶液',
  '注射用/输液用/直肠用溶液',
  '注射/皮肤针刺试验用溶液',
  '眼内冲洗溶液',
  '腹膜内用溶液',
  '膀胱内用溶液',
  '离子电渗疗法用溶液',
  '器官保存液',
  '器官灌注液',
  '腹膜透析液',
  '激发试验溶液',
  '封闭剂溶液',
  '针刺试验用溶液',
  '划痕试验用溶液',
  '输液用溶液',
  '注射液溶液',
  '喷雾用溶液',
  '注射混悬剂',
  '鼻腔用溶剂',
  '胃肠外用溶剂',
  '输液用溶剂',
  '眼内冲洗液用溶剂',
  '溶剂，于……',
  '洗胃剂',
  '舌下膜剂',
  '舌下粉剂',
  '舌下喷雾剂',
  '舌下喷雾乳剂',
  '舌下喷雾溶液',
  '舌下喷雾混悬剂',
  '舌下片',
  '栓剂',
  '注射乳剂用混悬液',
  '输液用混悬剂',
  '混悬剂型注射液',
  '口服混悬剂',
  '喷雾用混悬剂',
  '注射混悬剂',
  '糖浆',
  '片剂',
  '皮肤溶液用片剂',
  '口服混悬剂用片剂',
  '直肠溶液剂用片',
  '直肠混悬剂用片',
  '阴道溶液剂用片',
  '带传感器的片剂',
  '牙膏',
  '透皮凝胶剂',
  '透皮软膏剂',
  '透皮贴剂',
  '透皮溶液',
  '透皮喷雾溶液',
  '透皮系统',
  '尿道乳剂',
  '尿道凝胶剂',
  '尿道软膏剂',
  '尿道棒',
  '阴道硬胶囊',
  '阴道软胶囊',
  '阴道乳膏剂',
  '阴道给药系统',
  '阴道乳剂',
  '阴道泡沫剂',
  '阴道凝胶剂',
  '阴道软膏剂',
  '阴道溶液',
  '阴道悬液',
  '阴道片剂',
  '创可贴',
  '输液用溶液浓缩液和稀释液',
  '输液浓溶液用浓溶液和溶剂',
  '外用溶液用浓溶液和溶剂',
  '皮肤用浓缩液和溶剂',
  '注射用浓缩液和溶剂',
  '输液溶液用浓溶液和溶剂',
  '注射溶液浓溶液和溶剂',
  '注射/输液溶液用浓溶液和溶剂',
  '注射用混悬液浓溶液和溶剂',
  '混悬液型滴耳液用粉与溶剂',
  '口服混悬液用泡腾粉和粉剂',
  '注射乳剂用混悬液和乳剂',
  '支气管滴注液用粉与溶剂',
  '支气管滴注液用粉和混悬液溶剂',
  '滴眼液用粉与溶剂',
  '混悬型滴眼液用粉与溶剂',
  '注射用/输注用分散体用气体与溶剂',
  '注射用/输注用分散体用气体与溶剂',
  '口服混悬液用颗粒和溶剂',
  '混悬型注射液用颗粒和溶剂',
  '鼻滴剂用粉和溶剂',
  '凝胶用粉和凝胶',
  '牙粘固剂用粉和溶液',
  '注射用粉和溶液',
  '混悬液型注射用粉和溶液',
  '输液浓溶液用粉和溶剂',
  '外用溶液用粉和溶剂',
  '牙胶用粉剂与溶剂',
  '注射用分散体用粉和溶剂',
  '乳状液型用粉和溶剂',
  '子宫颈凝胶用粉与溶剂',
  '窦内溶液用粉和溶剂',
  '损伤面上溶液用粉和溶剂',
  '牙龈凝胶用粉和溶剂',
  '植入糊剂用粉与溶剂',
  '眼内滴注液用粉和溶剂',
  '膀胱内溶液用粉和溶剂',
  '膀胱内混悬液用粉和溶剂',
  '雾化液用粉和溶剂',
  '口服溶液用粉与溶剂',
  '口服混悬液用粉与溶剂',
  '注射用缓释混悬液用粉和溶剂',
  '封闭剂用粉与溶剂',
  '输液用粉与溶剂',
  '溶液型注射液用粉剂与溶剂',
  '注射/输注用溶液用粉剂与溶剂',
  '注射用粉剂和溶剂/皮肤点刺试验',
  '混悬型注射液用粉与溶剂',
  '糖浆用粉和溶剂',
  '混悬型注射用粉和混悬液',
  '输液浓溶液和溶液用粉',
  '输液分散体浓溶液用粉、分散体和溶剂',
  '植入基质用粉剂、溶剂和基质',
  '口服混悬液用泡腾颗粒和混悬液',
  '喷雾用混悬液和溶液',
  '注射用混悬液用溶剂和混悬剂',
  '口服溶液用片和粉剂',
  '直肠混悬液用片和溶剂'
]
// 用法用量剂量单位
export const dosageUnit = [
  '袋',
  '克',
  '片',
  '瓶',
  '粒',
  '毫升',
  '支',
  '丸',
  '%',
  '滴',
  '千克',
  '升',
  '毫克',
  'GB',
  'MB',
  'IU',
  'UT',
  'KU',
  'MU',
  '微居里',
  '微克',
  '微升',
  '毫居里',
  '万U',
  '贴',
  '毫克/平方米',
  'U',
  '单位',
  '不详',
  '毫克/公斤'
]
