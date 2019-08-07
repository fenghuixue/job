#!/usr/bin/env node
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const { spawn } = require('child_process');

async function create() {
    let targetDir = path.resolve('tools') + '/' + process.argv[2];
    let file_name = process.argv[2];
    if (fs.existsSync(targetDir)) {
        const {ok} = await inquirer
            .prompt([
                {
                    name: 'ok',
                    type: 'input',
                    message: `${file_name} has exist, choose whether force to update, press yes/no:`
                }
            ])
        if (!ok) return;
        if (ok == 'yes') {
            await fs.remove(targetDir);
        }
    }
    await fs.mkdir(targetDir);
    const cwd = process.cwd();
    await fs.writeFile(`${targetDir}/READEME.md`, '### 项目文件说明如下：\n - 这是一个test文件', 'utf8');
    const config = JSON.parse((await fs.readFile(`${cwd}/package.json`)).toString());
    let dependencies = {
        ...config.dependencies,
        ...config.devDependencies
    }
    const ls = spawn('ls', ['-lh', `${cwd}/tools`]);
    ls.stdout.on('data', (res) => {
        console.log(`stdout: ${res}`);
    });

    // await spawn(`cat ${targetDir}/READEME.md`);
}

module.exports = create()