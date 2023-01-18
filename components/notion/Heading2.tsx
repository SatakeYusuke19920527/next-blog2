import { FC } from 'react';
import { getBackgroundColor, getText } from '../../utils/property';

const Heading2: FC<any> = (block) => {
  return (
    <h2 style={{ color: getBackgroundColor(block.heading_2.color) }}>
      {getText(block.heading_2.rich_text)}
    </h2>
  );
};

export default Heading2