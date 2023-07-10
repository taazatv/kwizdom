#!/usr/bin/env bash

find /opt/bitnami/apache/Kwizdom/ -type d -exec chmod 0755 {} \;
find /opt/bitnami/apache/Kwizdom/ -type f -exec chmod 0644 {} \;
chmod 0755 /opt/bitnami/apache/Kwizdom/
chown -R bitnami:daemon /opt/bitnami/apache/Kwizdom/


#find /opt/bitnami/apache2/htdocs/index.js -type f -exec chmod 0777 {} \;
#chmod 0777 /opt/bitnami/apache2/htdocs/index.js
#chown -R bitnami:daemon /opt/bitnami/apache2/htdocs/
