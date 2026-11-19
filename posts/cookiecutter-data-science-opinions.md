---
title: "Cookiecutter Data Science 的项目组织原则"
date: "2026-11-16"
tag: "Readings"
compact: true
summary: "译自 DrivenData 的项目文档，讨论可复现的数据分析、笔记本、建模实验与环境管理。"
---

**原文与引用**　DrivenData. “Opinions.” *Cookiecutter Data Science* 项目文档，2026 年 11 月 16 日查阅。本文为中文译文。原文 © 2016 DrivenData, Inc. [英文原文](https://cookiecutter-data-science.drivendata.org/opinions/) · [MIT 许可证](https://github.com/drivendataorg/cookiecutter-data-science/blob/master/LICENSE)

默认的项目结构体现了我们对数据科学协作方式的一些看法。这些看法来自我们在实际工作中的经验，既涉及工作流程，也涉及能让流程更顺畅的工具。欢迎分享你的想法或参与贡献。[贡献指南](https://cookiecutter-data-science.drivendata.org/contributing/)

## 数据分析是一张有向无环图

*始终保留原始数据，尤其要避免手动编辑，更不要用 Excel 改动它。*

高质量的数据分析最重要的两个特征是正确性和可复现性。任何人都应该可以只用你的代码和原始数据，重跑分析并得到相同的最终产物。要保证正确性，最好的办法是测试分析代码。要保证可复现性，最好的办法是把**数据分析流水线看作一张有向无环图**（DAG）。分析中的每一步都是图上的一个节点，节点之间有方向，且不会形成环。你可以沿图向前执行，重建任意分析结果，也可以从某项结果反向追溯，检查生成它的代码与数据。[有向无环图](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

### 原始数据不可变

把数据分析组织成 DAG，意味着**必须把原始数据视为不可变的**。可以读取或复制它，再加工出新的产物。原始文件始终保留原样。

默认 `data/` 目录的设计据此而来。数据从 `raw/` 和 `external/` 出发，中间产物序列化或缓存到 `interim/`，最终产物放到 `processed/`。目录之间的数据流比目录的数量和名字更重要。

- 编写代码，让原始数据沿流水线一直流到最终分析环节。
- 将耗时步骤的中间产物序列化保存或缓存。
- 让任何人只用 `{{ cookiecutter.module_name }}` 中的代码以及 `data/raw/` 和 `data/external/` 中的数据，就能复现最终数据产物。最好为这一过程编写文档并实现自动化。
- 保持原始数据原样，尤其不要手动修改，也不要用 Excel 编辑。即使只是转换格式，或修正会导致读取工具出错的问题，也应保留原文件。
- 清洗或处理得到的新数据应另存，避免覆盖原始数据。
- 避免保存多个版本的原始数据。

### 大部分数据应放在源码版本库之外

既然原始数据不可变，它对版本管理的需求就和代码不同。因此，默认将 **`data/` 写入 `.gitignore`**。如果数据量很小、很少变化，也可以把它纳入仓库。按原文所引的 GitHub 文档，GitHub 会对超过 50 MiB 的文件发出警告，并拒绝超过 100 MiB 的文件。[GitHub 文件大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github#file-size-limits)

数据量较大时，可以考虑使用云服务存储和同步。如果项目对云服务提供商没有特别要求，我们使用 Amazon S3 的体验不错。以下是一些可协助同步数据的工具。

- [Amazon S3](https://aws.amazon.com/s3/) · [`awscli`](https://aws.amazon.com/cli/)、[`s3cmd`](https://s3tools.org/s3cmd)、[`s5cmd`](https://github.com/peak/s5cmd)、[`geesefs`](https://github.com/yandex-cloud/geesefs)
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview) · [`azcopy`](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10)
- [Google Cloud Storage](https://cloud.google.com/storage/docs/introduction) · [`gcloud`](https://cloud.google.com/storage/docs/discover-object-storage-gcloud)
- 支持多家云服务 · [`cloudpathlib`](https://github.com/drivendataorg/cloudpathlib)、[`fsspec`](https://filesystem-spec.readthedocs.io/en/stable/)

还可以使用 Git Large File Storage（LFS）扩展，在 Git 中跟踪大文件，同时把文件本身放在单独的服务器上。GitHub 提供兼容 Git LFS 的存储空间。[Git LFS](https://git-lfs.github.com/) · [GitHub 的 Git LFS 说明](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)

### 管理有向无环图的工具

有向无环图在数据处理和软件开发中很常见，已经有许多工具可以管理它们。我们偏好用 `make` 管理相互依赖的步骤，尤其是耗时较长的步骤。Make 在类 Unix 平台上很常见，Windows 也可以通过 Chocolatey 安装。[GNU Make](https://www.gnu.org/software/make/) · [Chocolatey 软件包](https://community.chocolatey.org/packages/make)

按文档、Makefile 编写约定和移植指南来写，有助于 Makefile 在不同系统上运行。下面还有一些入门示例。Mike Bostock 等不少数据工作者也把 `make` 作为常用工具。[Make 文档](https://www.gnu.org/software/make/) · [Makefile 编写约定](https://www.gnu.org/prep/standards/html_node/Makefile-Conventions.html#Makefile-Conventions) · [移植指南](https://www.gnu.org/savannah-checkouts/gnu/autoconf/manual/autoconf-2.69/html_node/Portable-Make.html#Portable-Make) · [示例一](https://blog.kaggle.com/2012/10/15/make-for-data-scientists/) · [示例二](https://web.archive.org/web/20150206054212/https://www.bioinformaticszen.com/post/decomplected-workflows-makefiles/) · [Mike Bostock 的示例](https://bost.ocks.org/mike/make/)

还有一些工具允许用 Python 定义 DAG，无需再学一门专用语言。如果它们更适合你的分析，可以选用其中之一。[Airflow](https://airflow.apache.org/index.html) · [Luigi](https://luigi.readthedocs.io/en/stable/index.html) · [Snakemake](https://snakemake.readthedocs.io/en/stable/) · [Prefect](https://github.com/PrefectHQ/prefect) · [Dagster](https://github.com/dagster-io/dagster) · [Joblib](https://joblib.readthedocs.io/en/latest/memory.html)

## 笔记本用于探索和交流，源代码用于重复运行

> 源代码更有利于复现，因为它更容易移植、测试和审查。

Jupyter Notebook、Apache Zeppelin 等文学化编程工具很适合探索性数据分析，便于快速迭代和可视化结果。需要复现分析时，源代码更容易移植、测试和审查。[Jupyter Notebook](https://jupyter.org/) · [Apache Zeppelin](https://zeppelin.apache.org/)

为了便于整理和阅读，我们通常会给 `notebooks/` 分子目录。例如，`notebooks/exploratory/` 放初步探索，`notebooks/reports/` 放整理好的成果，后者可以导出为 HTML 放进 `reports/`。文件名也应体现负责人和分析顺序。

我们采用 `<step>-<ghuser>-<description>.ipynb` 的格式，例如 `0.3-bull-visualize-distributions.ipynb`。笔记本很难纳入版本控制，JSON 差异往往难以阅读，合并也几乎无从下手。因此，我们建议避免多人直接编辑同一份 Jupyter 笔记本，并用工具来简化变更审查。[`nbautoexport`](https://github.com/drivendataorg/nbautoexport)

### 把可复用的部分重构成源代码

同一项任务的代码应只写一份。数据预处理应纳入流水线，放在 `{{ cookiecutter.module_name }}/data/make_dataset.py` 中，再从 `data/interim/` 读取结果。实用的工具代码可以重构到 `{{ cookiecutter.module_name }}` 中。如果你开始复制旧笔记本来新建笔记本、在多个笔记本之间粘贴函数，或在笔记本里定义类，就该考虑把这些代码移到源文件里了。

CCDS 模板默认把项目做成 Python 包，并通过你选用的环境管理器的依赖文件在本地安装它。这样就能像下面这样在笔记本的一个单元格里导入项目模块。

```python
# 可选：加载 autoreload 扩展，便于修改源代码
%load_ext autoreload
# 可选：修改 {{ cookiecutter.module_name }} 中的代码后自动重新加载模块
%autoreload 2

from {{ cookiecutter.module_name }}.data import make_dataset
```

## 有条理地管理建模实验

建模流水线因项目而异，所以我们只为 `models/` 预设了很少的结构。记录建模实验对复现结果、积累经验和持续改进都很重要。实验记录至少应让你查清数据的来源、运行实验所用的代码版本，以及衡量表现的指标。

小型项目可以先用 JSON 等人和程序都能读取的格式，自行记录实验。等到项目确实需要，或者团队已有统一工具时，可以采用专门的实验跟踪工具。[MLflow](https://mlflow.org/)

## 从计算环境开始

复现分析的第一步，是重建分析运行时的计算环境。工具、库和版本都需要一致，才能保证各部分配合工作。

在 Python 中，你需要选择并配置一种环境管理工具。这方面的工具生态近几年变化很大。做数据科学时，我们偏好 **conda**，因为它还可以管理 Python 之外的软件包，包括数据科学工作中经常遇到的系统库依赖。我们建议用 Miniforge 安装 conda，Anaconda 提供的 Miniconda 和 Anaconda 安装程序也很常见。[Miniforge](https://github.com/conda-forge/miniforge) · [Miniconda 与 Anaconda 安装程序](https://docs.conda.io/projects/conda/en/stable/user-guide/install/index.html)

也可以使用只管理 Python 环境的工具。Cookiecutter v2 提供多种选择，也允许初始化项目时暂不选择工具，自行配置环境。[virtualenv](https://virtualenv.pypa.io/en/latest/) · [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/stable/) · [Poetry](https://python-poetry.org/) · [Pipenv](https://pipenv.pypa.io/en/latest/)

如果重建环境的要求更复杂，可以考虑 Docker 或 Vagrant。两者都可以用文本配置文件（`Dockerfile` 和 `Vagrantfile`）描述符合要求的运行环境，并将配置文件纳入版本控制。还可以用 `pip-tools` 或 `conda-lock` 生成锁定依赖版本的文件。[Docker](https://www.docker.com/) · [Vagrant](https://www.vagrantup.com/) · [`pip-tools`](https://github.com/jazzband/pip-tools) · [`conda-lock`](https://github.com/conda/conda-lock)

## 将密钥和配置留在版本库之外

务必避免把 AWS 密钥或 PostgreSQL 的用户名、密码泄露到 GitHub。下面是一种做法。[《十二要素应用》的配置原则](https://12factor.net/config)

### 用专用文件保存密钥和配置变量

在项目根目录新建 `.env` 文件。模板通过 `.gitignore` 排除这个文件，因此它不会进入版本库。下面的值都是示例。

```ini
# .env 文件示例
DATABASE_URL=postgres://username:password@localhost:5432/dbname
AWS_ACCESS_KEY=myaccesskey
AWS_SECRET_ACCESS_KEY=mysecretkey
OTHER_VARIABLE=something
```

### 用软件包自动加载变量

`{{ cookiecutter.module_name }}/data/make_dataset.py` 示例脚本使用 `python-dotenv`，将文件里的条目加载为环境变量，随后可以用 `os.environ.get` 读取。以下示例改编自该软件包的文档。[python-dotenv](https://github.com/theskumar/python-dotenv)

```python
# {{ cookiecutter.module_name }}/data/dotenv_example.py
import os
from dotenv import load_dotenv, find_dotenv

# 逐级向上查找，直到找到 .env
dotenv_path = find_dotenv()

# 将各条配置加载为环境变量
load_dotenv(dotenv_path)

database_url = os.environ.get("DATABASE_URL")
other_variable = os.environ.get("OTHER_VARIABLE")
```

### 配置 AWS CLI

用 Amazon S3 存储数据时，把访问密钥设为环境变量是一种简单做法。如果一台机器上需要管理多套密钥，例如同时处理多个项目，最好使用凭证文件。它通常位于 `~/.aws/credentials`，示例如下。[AWS CLI 配置文件说明](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)

```ini
[default]
aws_access_key_id=myaccesskey
aws_secret_access_key=mysecretkey
[another_project]
aws_access_key_id=myprojectaccesskey
aws_secret_access_key=myprojectsecretkey
```

初始化项目时可以指定配置档名称。如果没有设置相应的环境变量，就会默认使用该配置档的凭证。

## 从统一的默认结构出发，按项目调整

为了让模板适用于多种项目，我们建议按自己的项目需要灵活调整目录，同时谨慎修改所有项目共用的默认结构。

我们用 `folder-layout` 标签标记建议新增、删除、重命名或移动目录的议题。我们也使用 `needs-discussion` 标签，标记需要先充分讨论、得到广泛支持再实现的议题。

### 模板调整与演变的例子

项目从一开始就可能有不同的组织需求，需求也会随时间变化。以下是几种调整方式。

- **精简。** 有些项目用几个 Python 文件就能完成全部工作。把多层目录简化成几个文件，会更便于跟踪和维护。模板中用不上的部分可以删掉。[cyfi 示例](https://github.com/drivendataorg/cyfi/tree/main/cyfi)
- **扩展。** 较复杂的项目可以用更多目录来组织模块代码。例如，`zamba` 包增加了目录，用来容纳特定任务的代码。[zamba 示例](https://github.com/drivendataorg/zamba/tree/master/zamba)
- **重组。** 长期项目的 `notebooks/` 容易越堆越多。我们的一种做法是增设顶层 `research/` 目录和对应的 `data/research/` 数据目录，再给每项实验建子目录。各实验可以有自己的笔记本、代码，甚至继承项目顶层 `Makefile` 的独立 `Makefile`。

<details>
<summary>MIT 许可证声明</summary>

The MIT License (MIT)

Copyright (c) 2016 DrivenData, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

</details>
