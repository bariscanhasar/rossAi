FROM node:18

ARG UNAME=shop
ARG UID=1000
ARG GID=1000

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME

RUN mkdir /code
COPY . /code
RUN chown -R $UNAME:$UNAME /code

USER $UNAME
WORKDIR /code

CMD ["/bin/bash"]
