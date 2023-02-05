import { BlockType } from 'notion-block-renderer';
import { colorConfig } from '../site.config';
import { PageType, RichTextType } from '../types/types';

export const getTitle = (type: string) => {
  try {
    switch (type) {
      case colorConfig.molding_equipment.name:
        return colorConfig.molding_equipment.name;
      case colorConfig.molding_shop.name:
        return colorConfig.molding_shop.name;
      case colorConfig.molding_maker.name:
        return colorConfig.molding_maker.name;
      case colorConfig.exhibition.name:
        return colorConfig.exhibition.name;
      case colorConfig.resin.name:
        return colorConfig.resin.name;
      case colorConfig.subsidy.name:
        return colorConfig.subsidy.name;
      default:
        return 'その他';
    }
  } catch (error) {
    console.log('🚀 ~ file: property.ts ~ line 48 ~ getColor ~ error', error);
  }
};

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join('');
  } catch (err) {
    console.log('🚀 ~ file: property.ts ~ line 8 ~ getText ~ err', err);
  }
};

export const getCover = (cover: PageType['cover']) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return '/noimage.png';
};

export const getDate = (date: string) => {
  try {
    return date;
  } catch (err) {
    console.log('🚀 ~ file: property.ts ~ line 22 ~ getDate ~ err', err);
  }
  return '-';
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    console.log('🚀 ~ file: property.ts ~ line 31 ~ getMultiSelect ~ err', err);
  }
  return [];
};

export const getOverview = (overview: { rich_text: RichTextType[] }) => {
  try {
    if (overview !== undefined && overview.rich_text[0] !== undefined) {
      return overview.rich_text[0].plain_text;
    } else {
      return '';
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: property.ts ~ line 40 ~ getOverview ~ error',
      error
    );
  }
};

export const getColor = (type: string) => {
  try {
    switch (type) {
      case colorConfig.molding_equipment.name:
        return colorConfig.molding_equipment.color;
      case colorConfig.molding_shop.name:
        return colorConfig.molding_shop.color;
      case colorConfig.molding_maker.name:
        return colorConfig.molding_maker.color;
      case colorConfig.exhibition.name:
        return colorConfig.exhibition.color;
      case colorConfig.resin.name:
        return colorConfig.resin.color;
      case colorConfig.subsidy.name:
        return colorConfig.subsidy.color;
      default:
        return 'white';
    }
  } catch (error) {
    console.log('🚀 ~ file: property.ts ~ line 48 ~ getColor ~ error', error);
  }
};

export const getVideoId = (blocks: BlockType[]) => {
  let videoUrl = '';
  try {
    blocks.forEach((block) => {
      if (block.type === 'video') {
        const videoFullUrl = block.video.external.url;
        videoUrl = videoFullUrl.substring(videoFullUrl.indexOf('v=') + 2);
      }
    });
    return videoUrl;
  } catch (error) {
    console.log('🚀 ~ file: property.ts:96 ~ getVideoId ~ error', error);
  }
};

export const getBackgroundColor = (color: string) => {
  try {
    switch (color) {
      case 'blue_background':
        return '#E7F3F8';
      case 'blue':
        return '#337EA9';
      default:
        return '#37362F';
    }
  } catch (error) {
    console.log('🚀 ~ file: property.ts ~ line 48 ~ getColor ~ error', error);
  }
};

export const getShowCards = (
  displayPages: PageType[],
  pageNo: number
): PageType[] => {
  const returnArr: PageType[] = [];
  if (!displayPages) return [];
  if (displayPages.length <= 16) return displayPages;
  const startPageNo = pageNo === 1 ? 0 : (pageNo - 1) * 15;
  const finPageNo = Math.min(pageNo * 15, displayPages.length);
  for (let i = startPageNo; i < finPageNo; i++) {
    returnArr.push(displayPages[i]);
  }
  return returnArr;
};
