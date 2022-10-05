# syntax=docker/dockerfile:1.3-labs

ARG USERDIR="/root"
ARG DISTDIR="/var/dist"
ARG TASKDIR="/var/task"

FROM public.ecr.aws/lambda/nodejs:14 AS lambda-sphere-service

ARG USERDIR
ARG DISTDIR
ARG TASKDIR

SHELL ["/bin/sh", "-e", "-c"]
WORKDIR ${USERDIR}

RUN <<EOF
# installing python
yum install -y amazon-linux-extras
amazon-linux-extras install -y python3.8
yum install -y python3
yum remove -y amazon-linux-extras
yum clean all -y
rm -rf /var/cache/yum
rm /usr/bin/python
ln /usr/bin/python3 /usr/bin/python
ln /usr/bin/pip3 /usr/bin/pip
EOF

# package
WORKDIR ${TASKDIR}
COPY --from=414097980318.dkr.ecr.eu-north-1.amazonaws.com/lambda-neon-spheregen ${DISTDIR}/sg.node ./
COPY --from=414097980318.dkr.ecr.eu-north-1.amazonaws.com/lambda-python-voronoi ${DISTDIR}/sv.js ${DISTDIR}/sv.py ${DISTDIR}/requirements.txt ./
COPY app.js package.json ./
RUN npm install
RUN <<EOF
# pip deps
PATH="${PATH}"
pip install -r requirements.txt
EOF

CMD [ "app.handler" ]