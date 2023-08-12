ARG IMAGE=public.ecr.aws/sam/build-nodejs18.x
FROM $IMAGE

# disables npm update notifications
RUN npm config --global set update-notifier false

# workaround for EACCES error
RUN mkdir /.npm && chown -R 501:20 /.npm

CMD [ "npm" ]
