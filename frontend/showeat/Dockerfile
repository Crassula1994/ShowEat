# 베이스 이미지를 도커 허브에서 가져옴
FROM node:lts

# 해당 어플의 소스코드들이 들어가게 됨
WORKDIR /usr/src/app

# 소스코드가 바뀔 때마다 종속성까지 다시 복사를 해주는 수고를 덜기위해 종속성 목록을 담고 있는
# package.json 복사
COPY package*.json ./

# .env.production 파일을 .env로 복사
COPY .env.production ./.env 

# 종속성 다운
RUN npm install

# 모든 소스코드들 WORKDIR로 복사
COPY . .

# 빌드 수행
RUN npm run build

# 실행 명령
CMD ["npm", "run", "start"]