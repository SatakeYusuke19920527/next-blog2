import Image from 'next/legacy/image';
import Link from 'next/link';
import { FC } from 'react';
import { ArticleMetaProps } from '../types/types';
import { getCover, getDate, getMultiSelect, getText } from '../utils/property';

const ArticleMeta: FC<ArticleMetaProps> = ({ page }) => {
  return (
    <>
      <div className='w-full flex justify-center'>
        {/* page cover */}
        <Image
          className="w-full max-w-screen-lg rounded-lg aspect-video my-4"
          src={getCover(page.cover)}
          alt=""
          objectFit="cover"
          width={640}
          height={360}
          quality={50}
        />
      </div>

      {/* page name */}
      <h1 className="my-8">{getText(page.properties.name.title)}</h1>
      <div className="bg-gray-100 px-6 py-4 rounded text-sm text-gray-500">
        <div className="grid grid-cols-3 gap-4">
          {/* published */}
          <div className="col-span-1">Published</div>
          <div className="col-span-2">
            {getDate(page.properties.published.rich_text[0].plain_text)}
          </div>

          {/* author */}
          <div className="col-span-1">Enterprise</div>
          <div className="col-span-2">
            {getText(page.properties.enterprise.rich_text)}
          </div>

          {/* tags */}
          <div className="col-span-1">Tags</div>
          <div className="col-span-2">
            {/* change later */}
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag: string, index: number) => (
                <Link key={index} href={`/tags/${tag}`}>
                  <span>{`#${tag} `}</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleMeta;
