# Dockerfile 编写与验收清单

## 什么时候开始写

- 在正式跑三个模型之前写。
- 在制作首轮 prompt 之前写。
- 在确定题目技术栈和 base 环境之后立刻写。

## 为什么必须先写

- 正式指南要求 `Dockerfile` 面向 base 初始环境。
- 生成类或非生成类题目都不能等模型输出后再反推环境。
- 三个模型要共用同一份 base `Dockerfile`，所以必须先定环境再测试。

## 编写规则

- `Dockerfile` 只描述 base 初始环境。
- 容器工作目录固定为 `/app`。
- prompt 中声明的技术环境必须和 `Dockerfile` 一致。
- `environment/repo` 必须保留模型真正开始做题前看到的初始状态。
- 不把模型完成后的产物伪装成 base 环境。
- 最终提交不能带 `dogfooding.json`。

## 验收清单

- 能成功 `docker build`
- 容器能成功启动
- 环境依赖齐全
- 项目能运行
- 路径结构符合要求
- 三个模型使用的是同一份 `Dockerfile`
- prompt 与 `Dockerfile` 的语言、版本、框架一致

## 常见漏项

- 漏写 `Dockerfile`
- 先跑模型后补环境
- `Dockerfile` 写成完成态环境而不是 base 环境
- prompt 和 `Dockerfile` 环境不一致
- 忘记校验 `docker build`
- 忘记删除 `dogfooding.json`
