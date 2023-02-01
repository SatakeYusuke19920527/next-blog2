import { NextApiRequest, NextApiResponse } from 'next';
import { updateNumberOfViews } from '../../utils/notion';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('content-type', 'application/json;');
  try {
    const result = await updateNumberOfViews(req.body);
    res.status(200).send(JSON.stringify(result));
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
};

export default handler;
