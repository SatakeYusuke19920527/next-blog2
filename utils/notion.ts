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
    console.log("🚀 ~ file: notion.ts:59 ~ searchPages ~ search_context", search_context)
    const or: any = [];
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
   if ('keyword' in search_context) {
     and.push({
       property: "name",
       title: {
         contains: search_context.keyword,
       },
     });
   }
    if ('category' in search_context) {
      and.push({
        property: "type",
        multi_select: {
          contains: search_context.category,
        },
      });

      // 成形設備の場合
      if (search_context.category === "成形設備") {
        if (search_context.modalEquipments.length !== 0) {
          search_context.modalEquipments.forEach((modalEquipment: string) => {
            or.push({
              property: "facility",
              multi_select: {
                contains: modalEquipment,
              },
            });
          });
        };
        if (search_context.clampingForce.length !== 0) {
          search_context.clampingForce.forEach((cf: string) => {
            or.push({
              property: "clamping_force",
              multi_select: {
                contains: cf,
              },
            });
          });
        };
        if (search_context.subsidy.length !== 0) {
          search_context.subsidy.forEach((s: string) => {
            or.push({
              property: "facility",
              multi_select: {
                contains: s,
              },
            });
          });
        };
      };

      // 成形会社の場合
      if (search_context.category === "成形会社") {
        if (search_context.clampingForce.length !== 0) {
          search_context.clampingForce.forEach((cf: string) => {
            or.push({
              property: "clamping_force",
              multi_select: {
                contains: cf,
              },
            });
          });
        };
        if (search_context.industry.length !== 0) {
          search_context.industry.forEach((id: string) => {
            or.push({
              property: "Industry",
              multi_select: {
                contains: id,
              },
            });
          });
        };
        if (search_context.iso.length !== 0) {
          search_context.iso.forEach((is: string) => {
            or.push({
              property: "ISO",
              multi_select: {
                contains: is,
              },
            });
          });
        };
        if (search_context.resin.length !== 0) {
          search_context.resin.forEach((rs: string) => {
            or.push({
              property: "resin",
              multi_select: {
                contains: rs,
              },
            });
          });
        };
      }

      // 金型メーカーの場合
      if (search_context.category === "金型メーカー") {
        if (search_context.clampingForce.length !== 0) {
          search_context.clampingForce.forEach((cf: string) => {
            or.push({
              property: "clamping_force",
              multi_select: {
                contains: cf,
              },
            });
          });
        };
        if (search_context.industry.length !== 0) {
          search_context.industry.forEach((id: string) => {
            or.push({
              property: "Industry",
              multi_select: {
                contains: id,
              },
            });
          });
        };
        if (search_context.proto.length !== 0) {
          search_context.proto.forEach((pr: string) => {
            or.push({
              property: "prototype",
              multi_select: {
                contains: pr,
              },
            });
          });
        };
        if (search_context.iso.length !== 0) {
          search_context.iso.forEach((is: string) => {
            or.push({
              property: "ISO",
              multi_select: {
                contains: is,
              },
            });
          });
        };
      };

    };

    if ('location' in search_context) {
      and.push({
        property: "prefecture",
        rich_text: {
          contains: search_context.location,
        },
      });
    }; 
    
    console.log("🚀 ~ file: notion.ts:74 ~ searchPages ~ or", or)
  
  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and,
      or
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