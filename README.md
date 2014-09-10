解压包，删除除framework的目录及文件

cd /dE:\workspace\car_glass\framework

yiic webapp ..\webroot

配置nginx


E:\workspace\car_glass\webroot>.\protected\yiic shell

model Admin admin

crud Admin


auth:
1.文件：
car_glass\webroot\protected\data\auth.php
2.数据库
\framework\web\auth\schema-mysql.sql

