import { FC } from 'react';
import { getText } from '../../utils/property';

const Heading1: FC<any> = (block) => {
  return <h1>{getText(block.heading_1.rich_text)}</h1>;
};

export default Heading1