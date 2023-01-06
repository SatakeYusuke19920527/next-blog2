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

export const searchPages = async (s_obj: any) => {
  try {
    const search_context = s_obj.search
    console.log("🚀 ~ file: notion.ts:57 ~ searchPages ~ search_context ******", 'category' in search_context)

    if ('category' in search_context) {
      console.log('test message *****')
    } else {
      console.log('test message *****=======')
    }
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
  console.log('debug1 ****')
   if (search_context.keyword !== undefined) {
    and.push({
      property: "name",
      title: {
        contains: search_context.keyword,
      },
    });
   }
    console.log('debug2 ****')
    if ('category' in search_context) {
    and.push({
      property: "type",
      multi_select: {
        contains: search_context.category,
      },
    });
    }
    // if (search_context.location !== undefined) {
    // and.push({
    //   property: "prefecture",
    //   rich_text: {
    //     contains: search_context.location,
    //   },
    // });
    // }

    console.log("🚀 ~ file: notion.ts:74 ~ searchPages ~ and", and)
  
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
  } catch (error) {
    console.log("🚀 ~ file: notion.ts:95 ~ searchPages ~ error", error)
  }
}