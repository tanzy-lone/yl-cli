import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 根目录
  binary: 'git', //根据git 二进制文件路径
  maxConcurrentProcesses: 6, // 最大并发进程数
  trimmed: false
}

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => chalk.blue(item)) // 设置加载动画
  }
})

export const clone = async (url: string, projectName: string, options: string[]) => {
  const git: SimpleGit = simpleGit(gitOptions)
  try {
    await logger(git.clone(url, projectName, options), '代码下载中: ', {
      estimate: 8000 // 展示预估时间
    })
    // 下面就是一些相关的提示
    console.log()
    console.log(chalk.green(`代码下载成功`))
    console.log(chalk.blackBright(`==================================`))
    console.log(chalk.blackBright(`=== 欢迎使用 yl-cli 脚手架 ===`))
    console.log(chalk.blackBright(`==================================`))
    console.log()
    console.log(chalk.blackBright(`========请使用 pnpm install 安装依赖 =======`))
    console.log(chalk.blackBright(`======== pnpm run dev 运行项目========`))
  } catch (error) {
    console.error(chalk.red('代码下载失败'))
    // console.log(error)
  }
}
