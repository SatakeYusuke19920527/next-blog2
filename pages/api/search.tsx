import { NextApiRequest, NextApiResponse } from 'next';
import { searchPages } from '../../utils/notion';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('content-type', 'application/json;');
  console.log('🚀 ~ file: search.tsx:5 ~ handler ~ req', req);
  if (req.method === 'POST') {
    // POSTリクエストを処理します
    console.log('こちらにきています')
    console.log('🚀 ~ file: search.tsx:8 ~ handler ~ req.body', req.body);
  } else {
    // その他のHTTPメソッドを処理します
    console.log('こちらにきています part2');
    console.log('🚀 ~ file: search.tsx:8 ~ handler ~ result');
  }
  try {
    const result = await searchPages('株');  
    res.status(200).send(JSON.stringify(result));
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
}

export default handler