Unix/Linux系统运维
==================

* 批量修改文件后缀名

grep -rl “.mjs” src | xargs sed -i ‘s/\.mjs/.mts/g’


# 安全 
## SSL

openssl req -new -x509 -days 365 -nodes -text -out server.crt \ -keyout server.key -subj "/CN=dbhost.yourdomain.com"

SSH

生成ssh密钥
ssh-keygen -t rsa

[](https://wiki.centos.org/HowTos/Network/SecuringSSH)

## 1. Use Strong Passwords/Usernames

## 2. Disable Root Logins

## 3. Limit User Logins

## 4. Disable Protocol 1

## 5. Use a Non-Standard Port

## 6. Filter SSH at the Firewall

## 7. Use Public/Private Keys for Authentication

# SELinux配置
semanage port -a -t ssh_port_t -p tcp 2345
# 网络配置

## 端口转发

### 1.SSH端口转发

* 本地端口转发

```
ssh -fgN -L 2222:localhost:22 localhost
```

* 网络端口转发

```
ssh -fgN -R 2222:host:22 localhost 
```

* 动态转发

```
ssh -fgN -D 12345 root@host1 
```

### 2.iptables端口转发

* setp-1:开启数据转发功能

```
vi /etc/sysctl.conf    
  #增加一行 net.ipv4.ip_forward=1 
//使数据转发功能生效 
sysctl -p 
```
* setp-2:本地端口转发

```
iptables -t nat -A PREROUTING -p tcp --dport 2222 -j REDIRECT --to-port 22 
```

* setp-3:将本机的端口转发到其他主机

```
iptables -t nat -A PREROUTING -d 192.168.172.130 -p tcp --dport 8000 -j DNAT --to-destination 192.168.172.131:80 
iptables -t nat -A POSTROUTING -d 192.168.172.131 -p tcp --dport 80 -j SNAT --to 192.168.172.130 
#清空nat表的所有链 
iptables -t nat -F PREROUTING
```

### 3.firewall端口转发

* step-1:开启IP伪装
```
firewall-cmd --permanent --add-masquerade 
```
* step-2:配置端口转发规则
```
firewall-cmd --permanent --add-forward-port=port=2222:proto=tcp:toaddr=hostip:toport=22
```
* step-3:生效
```
firewall-cmd --reload 
```

### 4.Mac系统使用PFj进行端口转发

* 开启IPv4端口转发功能

```
sysctl -w net.inet.ip.forwarding=1
```            

* 开启IPv6端口转发功能

```
sysctl -w net.inet6.ip6.forwarding=1
```            

* 修改/etc/sysctl.conf配置文件,增加以下两行

```
net.inet.ip.forwarding=1
net.inet6.ip6.forwarding=1
```

查看当前端口转发状态

```
sysctl -a | grep forward
```

配置 /etc/pf.anchors/http文件

```
rdr pass on en0 inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
rdr pass on en0 inet proto tcp from any to any port 443 -> 127.0.0.1 port 4443
```

检查配置文件
```
pfctl -vnf /etc/pf.anchors/http
```

修改PF的主配置文件/etc/pf.conf开启我们添加的锚点http

配置文件/etc/pf.conf

```
rdr-anchor "http-forwarding"
```

在 load anchor "com.apple" from "/etc/pf.anchors/com.apple" 下添加

```
load anchor "http-forwarding" from "/etc/pf.anchors/http"
```

导入并允许运行

```
pfctl -ef /etc/pf.conf
```


# 挂载硬盘 

UUID=4020aa5c-2ba8-4e97-8d2e-b657e8ee72e2 /mnt/disk               ext4    defaults        0 0

# GRUB2安装Linux  

```
grub>set root=(hd0,2) 
grub>loopbadk loop /CentOS-8.2.2004-x86_64-minimal.iso
grub>linux (loop)/isolinux/vmlinuz linux repo=hd:/dev/sdg2:/CentOS-8.2.2004-x86_64-minimal.iso
grub>initrd (loop)/isolinux/initrd.gz 
grub>boot 
```
