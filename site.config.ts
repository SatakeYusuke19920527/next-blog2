
export const siteConfig = {
  title: "成形ポータル",
  company: "株式会社ピボーテ",
  twitterUrl: "https://twitter.com/seikei_poratl",
  instagramUrl: "https://www.instagram.com/seikei_portal/",
  githubUrl: "https://github.com/SatakeYusuke19920527"
}

export const searchConfig = {
  category: "カテゴリ",
  companyName: "企業名",
  keyword: "キーワード",
  search: "検索",
  prefectures: "都道府県",
  updateDate: "更新月"
}

export const categoryConfig = [
  { name: "カテゴリを選択してください"},
  { name: "成形設備" },
  { name: "金型メーカー" },
  { name: "成形会社" },
  // { name: "樹脂" },
  // { name: "展示会" },
  // { name: "その他" },
]

export const innerNavbarConfig = [
  "すべて","成形設備","金型メーカー","成形会社","その他"
]

export const moldingEquipmentConfig = ["射出成形機", "取出機", "乾燥機", "温調機", "輸送機", "混合機", "コンベア", "ストッカー", "クランプ", "粉砕機", "チラー", "その他"]

export const clampingForceConfig = [`10t未満`, `10t〜49t`, `50t〜99t`, `100t〜249t`, `250t〜499t`, `500t〜999t`, `1000t〜1399t`, `1400t以上`]

export const subsidyConfig = [`補助金対象`, `補助金対象外`]

export const isoConfig = [`ISO9001`, `ISO14001`]

export const isPrototypeMoldingMachineConfig = [`試作成形機あり`, `試作成形機なし`]

export const cleanRoomConfig = [`クリーンルームあり`,`クリーンルームなし`]

export const industryTypeConfig = [`家電`, `自動車`, `OA通信`, `電子部品`, `工業部品`, `容器`, `医療`, `雑貨`, `その他`]

export const resinUsedConfig = [`PE`, `PP`, `PS`, `ABS`, `PVC`, `PMMA`, `PET`, `PA`, `POM`, `PC`, `PPE`, `PPS`, `PI`, `PEI`, `PEEK`, `PTFE`, `フッ素樹脂`, `エラストマー`, `生分解性プラスチック`, `熱効果樹脂`, `プラマグ樹脂`, `その他`]

export const troublesConfig = ["エネルギーの無駄を無くす","樹脂の無駄を無くす","サイクルタイムの短縮","段取り時間の短縮","黄変トラブルの解消","色ムラトラブルの解消","コンタミトラブルの解消","ガスによるトラブルの解消","水質によるトラブルの解消","寸法精度の向上","成形品の軽量化","表面品質の向上"]

export const colorConfig = {
  molding_shop: {
    name: "成形会社",
    color:"#FF6666"
  },
  molding_equipment: {
    name: "成形設備",
    color:"#4169e1"
  },
  molding_maker: {
    name: "金型メーカー",
    color:"#ffd700"
  },
  exhibition: {
    name: "展示会",
    color:"#e100e1"
  },
  resin: {
    name: "樹脂",
    color:"#FF3333"
  },
  subsidy: {
    name: "補助金",
    color:"#ccc"
  },
}