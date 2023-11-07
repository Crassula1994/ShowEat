import csv
from faker import Faker
from datetime import datetime
import random
import mysql.connector
import pandas as pd

# Funding 정보를 읽어옴
funding_data = []
with open('funding.csv', 'r') as funding_file:
    funding_reader = csv.DictReader(funding_file)
    for row in funding_reader:
        funding_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

funding_image_data = []
for funding in funding_data:
    for i in range(random.randint(1, 3)):
        funding_id = fake.pyint(min_value=600, max_value=1100)
        row = {
            'funding_img_url': "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
            'funding_id': funding_id,
            'created_date' : datetime.now(),
            'modified_date' : datetime.now()
        }
        funding_image_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('funding_image.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['funding_img_url', 'funding_id','created_date','modified_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(funding_image_data)

print("Funding Image 생성 및 CSV 파일 저장 완료.")

# --------------------------------------------------------

# MySQL 서버 연결 설정
db_config = {
    "host": "k9a203.p.ssafy.io",
    "user": "showeat",
    "password": "showeat1357",
    "database": "showeat",
}

# MySQL 서버에 연결
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# 더미 데이터 생성 및 삽입 쿼리
insert_query = """
INSERT INTO funding_image (funding_img_url, funding_id,created_date,modified_date)
VALUES (%s, %s,%s, %s)
"""

# 데이터 호출
Funding_image데이터 = pd.read_csv("funding_image.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Funding_image데이터.iterrows():
    data = (row["funding_img_url"], row["funding_id"],row["created_date"],row["modified_date"])
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Funding Image DB 저장 완료.")