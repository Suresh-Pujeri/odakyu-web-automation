FROM mcr.microsoft.com/playwright:next-focal

ARG GIT_HASH
ARG BUILD_DATE
ARG VERSION

ENV GIT_HASH=${GIT_HASH}
ENV BUILD_DATE=${BUILD_DATE}
ENV VERSION=${VERSION}
ENV SERVICE="routeware-tests"
ENV CI="true"

# create directories for playwright created files
RUN mkdir -p /opt/routeware/test-results
RUN chmod 777 /opt/routeware/test-results 

# change dirs
WORKDIR /opt/routeware

# copy code
COPY . .

# install dependencies
RUN npm install
RUN npx playwright install-deps
RUN npx playwright install

# create state.json file for saving user states
RUN echo '{}' > state.json

ENTRYPOINT ["npm"]
CMD ["test"]