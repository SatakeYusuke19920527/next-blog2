import { colorConfig } from "../site.config";
import { PageType, RichTextType } from "../types/types";

export const getTitle = (type: string) => {
  try {
    switch (type) {
      case colorConfig.molding_equipment.name:
        return colorConfig.molding_equipment.name;
      case colorConfig.molding_shop.name:
        return colorConfig.molding_shop.name;
      case colorConfig.molding_maker.name:
        return colorConfig.molding_maker.name;
      default:
        return ""
    }
  } catch (error) {
    console.log("🚀 ~ file: property.ts ~ line 48 ~ getColor ~ error", error)
  }
}

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map(richText => richText.plain_text)
    return textArr.join("")
  } catch (err) {
    console.log("🚀 ~ file: property.ts ~ line 8 ~ getText ~ err", err)
  }
}

export const getCover = (cover: PageType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return "/noimage.png"
}

export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (err) {
    console.log("🚀 ~ file: property.ts ~ line 22 ~ getDate ~ err", err)
  }
  return "-";
};
 
export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    console.log("🚀 ~ file: property.ts ~ line 31 ~ getMultiSelect ~ err", err)
  }
  return [];
};

export const getOverview = (overview: {rich_text: RichTextType[]}) => {
  try {
    return overview.rich_text[0].plain_text
  } catch (error) {
    console.log("🚀 ~ file: property.ts ~ line 40 ~ getOverview ~ error", error)
  }
}

export const getColor = (type: string) => {
  try {
    switch (type) {
      case colorConfig.molding_equipment.name:
        return colorConfig.molding_equipment.color;
      case colorConfig.molding_shop.name:
        return colorConfig.molding_shop.color;
      case colorConfig.molding_maker.name:
        return colorConfig.molding_maker.color;
      default:
        return "white"
    }
  } catch (error) {
    console.log("🚀 ~ file: property.ts ~ line 48 ~ getColor ~ error", error)
  }
}