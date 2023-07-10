#!/usr/bin/env bash

find /opt/bitnami/apache/htdocs/kwizdom/ -type d -exec chmod 0755 {} \;
find /opt/bitnami/apache/htdocs/kwizdom/ -type f -exec chmod 0644 {} \;
chmod 0755 /opt/bitnami/apache/htdocs/kwizdom/
chown -R bitnami:daemon /opt/bitnami/apache/htdocs/kwizdom/


#find /opt/bitnami/apache2/htdocs/index.js -type f -exec chmod 0777 {} \;
