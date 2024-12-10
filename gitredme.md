# 进入本地项目文件夹
cd F:\learn\myenv\shserverenv
 
# 初始化本地仓库
git init
 
# 添加文件到本地仓库
git add .
 
# 提交改动到本地仓库
git commit -m "Initial commit"
 
# 添加远程仓库地址（将YOUR_USERNAME和YOUR_REPO替换为实际的用户名和仓库名）
git remote add origin git@github.com:lim0098/repo.git
 
# 推送本地仓库到GitHub远程仓库
git push origin master