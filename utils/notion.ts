import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY as string })

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string

export const fetchPages = async ({slug, tag}: {slug?:string, tag?:string}) => {
  const and: any = [
        {
          property: "isPublished",
          checkbox: {
            equals: true
          }
        },
        {
          property: "slug",
          rich_text: {
            is_not_empty: true
          }
        }
  ]
   if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
   }
  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }
  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending',
      },
    ],
  })
}

export const fetchBlocksByPageId = async (pageId: string) => {
  return await notion.blocks.children.list({ block_id: pageId });
};

export const searchPages = async (search_name: string) => {
  const and: any = [
        {
          property: "isPublished",
          checkbox: {
            equals: true
          }
        },
        {
          property: "slug",
          rich_text: {
            is_not_empty: true
          }
        }
  ]
   if (search_name) {
    and.push({
      property: "name",
      title: {
        contains: search_name,
      },
    });
   }
  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending',
      },
    ],
  })
}