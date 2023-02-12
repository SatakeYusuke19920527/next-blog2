import { Client } from '@notionhq/client';
import {
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_KEY as string });

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

/**
 * Notionの記事を取得
 * @param slug slug
 * @param tag tag
 */
export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: 'isPublished',
      checkbox: {
        equals: true,
      },
    },
    {
      property: 'slug',
      rich_text: {
        is_not_empty: true,
      },
    },
  ];
  if (slug) {
    and.push({
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    });
  }
  if (tag) {
    and.push({
      property: 'tags',
      multi_select: {
        contains: tag,
      },
    });
  }
  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and,
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending',
      },
    ],
  });
};

export const fetchBlocksByPageId = async (pageId: string) => {
  return await notion.blocks.children.list({ block_id: pageId });
};

export const searchPages = async (s_obj: any) => {
  try {
    const search_context = s_obj.search;
    const or: any = [];
    const and: any = [
      {
        property: 'isPublished',
        checkbox: {
          equals: true,
        },
      },
      {
        property: 'slug',
        rich_text: {
          is_not_empty: true,
        },
      },
    ];
    if ('keyword' in search_context) {
      and.push({
        property: 'name',
        title: {
          contains: search_context.keyword,
        },
      });
    }
    if ('category' in search_context) {
      // その他の場合
      if (search_context.category === 'その他') {
        and.push({
          property: 'type',
          multi_select: {
            does_not_contain: '成形設備',
          },
        });
        and.push({
          property: 'type',
          multi_select: {
            does_not_contain: '金型メーカー',
          },
        });
        and.push({
          property: 'type',
          multi_select: {
            does_not_contain: '成形会社',
          },
        });
      } else {
        and.push({
          property: 'type',
          multi_select: {
            contains: search_context.category,
          },
        });
      }

      // 成形設備の場合
      if (search_context.category === '成形設備') {
        if (
          'modalEquipments' in search_context &&
          'clampingForce' in search_context &&
          'subsidy' in search_context &&
          'troubles' in search_context
        ) {
          if (search_context.modalEquipments.length !== 0) {
            search_context.modalEquipments.forEach((modalEquipment: string) => {
              or.push({
                property: 'facility',
                multi_select: {
                  contains: modalEquipment,
                },
              });
            });
          }
          if (search_context.clampingForce.length !== 0) {
            search_context.clampingForce.forEach((cf: string) => {
              or.push({
                property: 'clamping_force',
                multi_select: {
                  contains: cf,
                },
              });
            });
          }
          if (search_context.subsidy.length !== 0) {
            search_context.subsidy.forEach((s: string) => {
              or.push({
                property: 'facility',
                multi_select: {
                  contains: s,
                },
              });
            });
          }
          if (search_context.troubles.length !== 0) {
            search_context.troubles.forEach((t: string) => {
              or.push({
                property: 'troubles',
                multi_select: {
                  contains: t,
                },
              });
            });
          }
        }
      }

      // 成形会社の場合
      if (search_context.category === '成形会社') {
        if (
          'industry' in search_context &&
          'clampingForce' in search_context &&
          'iso' in search_context &&
          'resin' in search_context &&
          'cleanRoom' in search_context
        ) {
          if (search_context.clampingForce.length !== 0) {
            search_context.clampingForce.forEach((cf: string) => {
              or.push({
                property: 'clamping_force',
                multi_select: {
                  contains: cf,
                },
              });
            });
          }
          if (search_context.industry.length !== 0) {
            search_context.industry.forEach((id: string) => {
              or.push({
                property: 'Industry',
                multi_select: {
                  contains: id,
                },
              });
            });
          }
          if (search_context.iso.length !== 0) {
            search_context.iso.forEach((is: string) => {
              or.push({
                property: 'ISO',
                multi_select: {
                  contains: is,
                },
              });
            });
          }
          if (search_context.resin.length !== 0) {
            search_context.resin.forEach((rs: string) => {
              or.push({
                property: 'resin',
                multi_select: {
                  contains: rs,
                },
              });
            });
          }
          if (search_context.cleanRoom.length !== 0) {
            search_context.cleanRoom.forEach((cr: string) => {
              or.push({
                property: 'clean_room',
                multi_select: {
                  contains: cr,
                },
              });
            });
          }
        }
      }

      // 金型メーカーの場合
      if (search_context.category === '金型メーカー') {
        if (
          'industry' in search_context &&
          'clampingForce' in search_context &&
          'proto' in search_context &&
          'iso' in search_context
        ) {
          if (search_context.clampingForce.length !== 0) {
            search_context.clampingForce.forEach((cf: string) => {
              or.push({
                property: 'clamping_force',
                multi_select: {
                  contains: cf,
                },
              });
            });
          }
          if (search_context.industry.length !== 0) {
            search_context.industry.forEach((id: string) => {
              or.push({
                property: 'Industry',
                multi_select: {
                  contains: id,
                },
              });
            });
          }
          if (search_context.proto.length !== 0) {
            search_context.proto.forEach((pr: string) => {
              or.push({
                property: 'prototype',
                multi_select: {
                  contains: pr,
                },
              });
            });
          }
          if (search_context.iso.length !== 0) {
            search_context.iso.forEach((is: string) => {
              or.push({
                property: 'ISO',
                multi_select: {
                  contains: is,
                },
              });
            });
          }
        }
      }
    }

    // Locationが記載されていれば設定
    if ('location' in search_context) {
      and.push({
        property: 'prefecture',
        rich_text: {
          contains: search_context.location,
        },
      });
    }

    // 検索方法をand || orどちらかに設定 ***
    if (search_context.searchType === 'ピンポイント検索') {
      and.push(...or);
    } else {
      and.push({ or: or });
    }

    return await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and,
      },
      sorts: [
        {
          property: 'published',
          direction: 'descending',
        },
      ],
    });
  } catch (error) {
    console.log('🚀 ~ file: notion.ts:95 ~ searchPages ~ error', error);
  }
};

/**
 * Blockの中のchildrenを取得
 * @param block_id BlockのID
 * @param page_size 取得するchildrenの上限
 */
export const getChildrenInBlock = async (params: ListBlockChildrenParameters) =>
  notion.blocks.children.list(params);

/**
 * Blockの中のchildrenをすべて取得
 * @param block_id BlockのID
 * @param page_size 取得するchildrenの上限
 */
export const getChildrenAllInBlock = async (block_id: string) => {
  const blocks = [];
  let nextCursor: string | undefined = undefined;

  do {
    const response: ListBlockChildrenResponse = await getChildrenInBlock({
      block_id,
      start_cursor: nextCursor,
    });
    blocks.push(response.results);
    if (response.has_more && response.next_cursor) {
      nextCursor = response.next_cursor;
    } else {
      nextCursor = undefined;
    }
  } while (nextCursor);

  return blocks.flat();
};

/**
 * テーブルのデータをreturnする
 * @param blocks
 * @returns table children
 */
export const getTableChildrenAllInBlockByBlocks = async (blocks: any[]) => {
  const tableBlocks = blocks.filter((block) => block.type === 'table');
  if (!tableBlocks.length) return [];

  const [firstTableBlock] = tableBlocks;
  const tableData = await getChildrenAllInBlock(firstTableBlock.id);

  return tableData;
};

/**
 * * column_listのデータをreturnする
 * @param columnData
 * @returns column_list_children
 */
export const getColumnListChildrenAllInBlockByBlocks = async (
  blocks: any[]
) => {
  const columnListBlocks = blocks.filter(
    (block) => block.type === 'column_list'
  );

  if (!columnListBlocks.length) return [];

  let columnListData: any[] = [];
  let columnData: any[] = [];
  for (const block of columnListBlocks) {
    const list = await getChildrenAllInBlock(block.id);
    columnListData.push(...list);
    for (const clData of columnListData) {
      if (clData.has_children) {
        const res = await getChildrenAllInBlock(clData.id);
        columnData.push(...res);
      }
    }
  }
  // 重複削除
  const column_list_data = removeDuplicates(columnListData, 'id');
  const column_data = removeDuplicates(columnData, 'id');
  return { column_list_data, column_data };
};

/**
 * 閲覧数の更新
 */
export const updateNumberOfViews = async (s_obj: any) => {
  const { pageId, numberOfView } = s_obj.view_count;
  const viewCount = (numberOfView.number || 0) + 1;

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        numberOfView: { number: viewCount },
      },
    });
  } catch (error: any) {
    console.error(
      '🚀 ~ file: notion.ts:396 ~ updateNumberOfViews ~ error',
      error.message
    );
  }
};

/**
 * 配列の重複を削除
 * @param array
 * @returns array
 */
export function removeDuplicates(array: any[], key: string) {
  return array.filter(
    (obj, index, self) => index === self.findIndex((t) => t[key] === obj[key])
  );
}
