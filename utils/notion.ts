import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY as string })

const DATABASE_ID = process.env.NOTION_DATABASE_ID as string

export const fetchPages = async () => {
  console.log("🚀 ~ file: notion.ts ~ line 4 ~ process.env.NOTION_KEY", process.env.NOTION_KEY)
  console.log("🚀 ~ file: notion.ts ~ line 6 ~ DATABASE_ID", DATABASE_ID)
  return await notion.databases.query({
    database_id: DATABASE_ID
  })
}