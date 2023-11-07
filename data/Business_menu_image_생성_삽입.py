import csv
from faker import Faker
from datetime import datetime
import random
import mysql.connector
import pandas as pd

# Business_menu 정보를 읽어옴
business_menu_data = []
with open('business_menu.csv', 'r') as business_menu_file:
    business_menu_reader = csv.DictReader(business_menu_file)
    for row in business_menu_reader:
        business_menu_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

business_menu_image_data = []
for busienss_menu in business_menu_data:
    for i in range(random.randint(1, 3)):
        business_menu_id = fake.pyint(min_value=3, max_value=300)
        row = {
            'business_menu_image_url': "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
            'business_menu_id': business_menu_id
        }
        business_menu_image_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('business_menu_image.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['business_menu_image_url', 'business_menu_id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(business_menu_image_data)

print("Business Menu Image 생성 및 CSV 파일 저장 완료.")

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
INSERT INTO business_menu_image (business_menu_image_url, business_menu_id)
VALUES (%s, %s)
"""

# 데이터 호출
Business_menu_image데이터 = pd.read_csv("business_menu_image.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Business_menu_image데이터.iterrows():
    data = (row["business_menu_image_url"], row["business_menu_id"])
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Business Menu Image DB 저장 완료.")