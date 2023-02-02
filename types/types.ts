import { BlockType } from 'notion-block-renderer';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};

export type CardProps = {
  page: PageType;
  isUser?: boolean;
};
export type ArticleProps = {
  page: PageType;
  blocks: BlockType[];
  tableData: TableType[];
};

export type ArticleMetaProps = CardProps;

export type IndexProps = {
  pages: PageType[];
};

export type TagProps = IndexProps & {
  tag: string;
};

export type BlockProps = {
  blocks: BlockType[];
  tableData: TableType[];
};

export type Params = ParsedUrlQuery & {
  slug?: string;
  tag?: string;
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type SelectType = {
  id: string;
  name: string;
  color: string;
};

export type PropertyType = {
  name: { title: RichTextType[] };
  tags: { multi_select: [{ name: string }] };
  slug: { rich_text: RichTextType[] };
  published: { rich_text: RichTextType[] };
  enterprise: { rich_text: RichTextType[] };
  overview: { rich_text: RichTextType[] };
  isPublished: { checkbox: boolean };
  created: { created_time: string };
  type: { multi_select: [{ name: string }] };
  numberOfView: { number: number };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  // properties: Record<string, any>;
  properties: PropertyType;
};

export type UserType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  created_at?: Date;
  isDeleted?: boolean;
  address?: string;
  phone_number?: string;
  occupation?: string;
  company?: string;
};

export type ErrorType = {
  code: string;
  message: string;
};

export type MailType = {
  uid?: string;
  uname: string;
  email: string;
  content: string;
  project?: string;
  url?: string;
};

export type SelectPageInfoType = {
  title: string;
  url: string;
};

export type BackgroundColorType = {
  default: 'default';
  gray: 'gray';
  brown: 'brown';
  orange: 'orange';
  yellow: 'yellow';
  green: 'green';
  blue: 'blue';
  purple: 'purple';
  pink: 'pink';
  red: 'red';
  gray_background: 'gray_background';
  brown_background: 'brown_background';
  orange_background: 'orange_background';
  yellow_background: 'yellow_background';
  green_background: 'green_background';
  blue_background: '#E7F3F8';
  purple_background: 'purple_background';
  pink_background: 'pink_background';
  red_background: 'red_background';
};

export type TableType = {
  object: string;
  id: string;
  parent: {
    type: string;
    block_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: { object: string; id: string };
  has_children: boolean;
  archived: boolean;
  type: string;
  table_row: { cells: [] };
};
