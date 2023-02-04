import Head from 'next/head';

export default function CommonMeta({
  title = '成形ポータル',
  description = '成形ポータルは、射出成形に関連した情報を集約し、情報発信を行っています。気になる企業・製品・サービスがあれば、成形ポータルを通じてコンタクト可能です。',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`https://seikei-portal.com/ogp_large.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
