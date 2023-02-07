import axios from 'axios';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { FC } from 'react';
import { CardProps } from '../types/types';
import {
  getColor,
  getCover,
  getDate,
  getMultiSelect,
  getOverview,
  getText,
  getTitle,
} from '../utils/property';

const Card: FC<CardProps> = ({ page }) => {
  const incrementViewCount = (s_obj: Object) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/increment_view_count', { view_count: s_obj })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return (
    <Link
      href={`/articles/${getText(page.properties.slug.rich_text)}`}
      onClick={() =>
        incrementViewCount({
          pageId: page.id,
          numberOfView: page.properties.numberOfView,
        })
      }
      className="animate-slide-in-bck-center flex justify-center"
    >
      <div
        style={{ maxHeight: `30rem` }}
        className="bg-white max-w-sm rounded-2xl overflow-hidden shadow-lg w-full my-4 md:my-0 content-between grid"
      >
        <div className="w-full text-gray-700 font-normal text-lg">
          <h4
            className="w-5/12 py-2 text-center text-white font-normal text-lg"
            style={{
              backgroundColor: `${getColor(
                page.properties.type.multi_select[0].name
              )}`,
            }}
          >
            {getTitle(page.properties.type.multi_select[0].name)}
          </h4>
        </div>
        {/* image */}
        <div>
          {' '}
          <Image
            className="w-full static h-auto"
            src={getCover(page.cover)}
            alt="card"
            objectFit="cover"
            width={400}
            height={225}
            quality={30}
          />
        </div>

        {/* title & overview*/}
        <div className="px-6 pt-4">
          <div className="w-full flex justify-between">
            <p className="text-red-500 text-xs">
              {page.properties.published.rich_text.length !== 0
                ? getDate(page.properties.published.rich_text[0].plain_text)
                : null}
            </p>
            <p className="text-red-500 text-xs">
              閲覧数：
              {page.properties.numberOfView.number !== null
                ? page.properties.numberOfView.number.toString()
                : 0}
            </p>
          </div>
          <div className="mb-2">
            <h2 className="text-xl font-medium mb-0">
              {getText(page.properties.name.title)}
            </h2>
            {page.properties.type.multi_select[0].name === '成形設備' ? (
              <pre className="text-gray-700 whitespace-pre-wrap text-sm">
                {getOverview(page.properties.enterprise)}
              </pre>
            ) : null}
          </div>
          <pre className="text-gray-700 whitespace-pre-wrap text-sm">
            {getOverview(page.properties.overview)}
          </pre>
        </div>

        {/* tag */}
        <div className="px-6 pb-2 pt-2">
          {getMultiSelect(page.properties.tags.multi_select).map(
            (tag, index) => (
              <span
                key={index}
                className="text-sm px-2 font-normal bg-gray-200 rounded-lg break-words mr-2 mb-2"
              >
                {`#${tag}`}
              </span>
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
