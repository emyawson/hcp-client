#!/bin/sh
set -e

KV1="REACT_APP_GIGYA_TOKEN:\"${REACT_APP_GIGYA_TOKEN}\""
KV2="REACT_APP_API_ROOT:\"${REACT_APP_API_ROOT}\""
KV3="REACT_APP_API_VERSION:\"${REACT_APP_API_VERSION}\""
KV4="REACT_APP_BACKEND_GIGYA_TOKEN:\"${REACT_APP_BACKEND_GIGYA_TOKEN}\""
KV5="REACT_APP_RESET_PASSWORD_PATIENT_GIGYA_TOKEN:\"${REACT_APP_RESET_PASSWORD_PATIENT_GIGYA_TOKEN}\""
KV6="REACT_APP_RESET_PASSWORD_PROFESSIONAL_GIGYA_TOKEN:\"${REACT_APP_RESET_PASSWORD_PROFESSIONAL_GIGYA_TOKEN}\""

sed -i.bak "s/__REACT_APP__/{${KV1},${KV2},${KV3},${KV4},${KV5},${KV6}}/g" /www/index.html

exec $(which nginx) -c /etc/nginx/nginx.conf -g "daemon off;" ${EXTRA_ARGS}
