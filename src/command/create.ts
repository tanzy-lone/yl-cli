import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import path from 'path'
import fs from 'fs-extra'

export interface TemplateInfo {
  name: string //模版名称
  downloadUrl: string //模版下载地址
  description: string //模版描述
  branch: string //模版分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    'Vite-Vue3-Typescript-template1',
    {
      name: 'Vite-Vue3-Typescript-template',
      downloadUrl: 'git@gitee.com:sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模版',
      branch: 'dev11'
    }
  ],
  [
    'Vite-Vue3-Typescript-template2',
    {
      name: 'Vite-Vue3-Typescript-template',
      downloadUrl: 'git@gitee.com:sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模版',
      branch: 'dev11'
    }
  ]
])

function isOverwrite(projectName: string) {
  console.warn(`${projectName}文件已经存在!`)
  return select({
    message: '是否覆盖',
    choices: [
      {
        name: '覆盖',
        value: true
      },
      {
        name: '取消',
        value: false
      }
    ]
  })
}

export async function create(projectName?: string) {
  const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
    const [name, info] = item
    return {
      name,
      value: name,
      description: info.description
    }
  })
  if (!projectName) {
    projectName = await input({ message: '请输入项目名称' })
  }
  // 如果文件已存在需要让用户判断是否覆盖原文件
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    if (run) {
      fs.remove(filePath)
    } else {
      return
    }
  }
  const templateName = await select({
    message: '请选择模版',
    choices: templateList
  })
  const info = templates.get(templateName)
  console.log(info)
  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }
  console.log('create', projectName)
}
