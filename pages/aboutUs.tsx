import Layout from '../components/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="w-9/12 h-full pt-12 flex flex-col justify-center">
        <h2 className="flex w-full justify-center items-center text-blue-600 mb-5">
          射出成形業界のポータルサイト
        </h2>
        <div className="flex w-full justify-center items-center mb-5">
          <img src="/static/aboutus_1.JPG" alt="aboutus_1" />
        </div>
        <h3 className="w-full p-3 mb-5" style={{ backgroundColor: '#E7F3F8' }}>
          成形ポータルとは
        </h3>
        <h5 className="text-xl font-bold mb-5" style={{ color: '#347EA9' }}>
          射出成形に関連した情報を集めたポータルサイトです。
        </h5>
        <p>
          成形ポータルは、射出成形に関連した情報を集約し、情報発信を行っています。
          <br />
          気になる企業・製品・サービスがあれば、成形ポータルを通じてコンタクト可能です。
        </p>
        <div className="flex w-full justify-center items-center mb-5">
          <img src="/static/aboutus_2.JPG" alt="aboutus_2" />
        </div>
        <h3 className="w-full p-3 mb-5" style={{ backgroundColor: '#E7F3F8' }}>
          成形ポータルに登録すると
        </h3>
        <ol>
          <li>1. 成形ポータルに掲載されている記事の全文が閲覧可能</li>
          <li>2.カタログ取得など詳細情報取得を成形ポータルが支援</li>
          <li>3.生産設備、金型メーカー、成形会社など各カテゴリで検索が可能</li>
        </ol>
        <p className="my-5 p-3" style={{ backgroundColor: '#FBECDD' }}>
          成形ポータルは<span className="text-red-500">無料</span>
          で登録可能です！！<br />
          成形会社の情報取得を無償でサポートします！！
        </p>
        <h3 className="w-full p-3 mb-5" style={{ backgroundColor: '#E7F3F8' }}>
          成形ポータルへ掲載を希望される会社様へ
        </h3>
        <h5 className="text-xl font-bold mb-5" style={{ color: '#347EA9' }}>
          成形ポータルは営業活動を支援します。
        </h5>
        <p>
          従来の営業方法に加え、あなたの会社の記事を成形ポータルに投稿し、
          営業活動の選択肢を増やしませんか？
        </p>
        <p className="my-5 p-3" style={{ backgroundColor: '#FBECDD' }}>
          掲載料は<span className="text-red-500">月額1万円</span>
          ※初月のみ3万円となります。
        </p>
        <p>まずはお気軽にご相談ください。</p>
        <h3 className="w-full p-3 mb-5" style={{ backgroundColor: '#E7F3F8' }}>
          運営元
        </h3>
        <p>名前 : 榊原 康介 (SAKAKIBARA KOSUKE)</p>
        <p>誕生日 : 1992年11月15日</p>
        <p>
          経歴 :
          射出成形機及び合理化設備販売の商社で営業として6年間勤務。（担当エリア
          : 関西、四国、中国）
        </p>
      </div>
    </Layout>
  );
};

export default AboutUs;
