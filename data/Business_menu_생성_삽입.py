import csv
from faker import Faker
from datetime import datetime
import random
import mysql.connector
import pandas as pd

# Business 정보를 읽어옴
business_data = []
with open('business.csv', 'r') as business_file:
    business_reader = csv.DictReader(business_file)
    for row in business_reader:
        business_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

business_menu_data = []
business_menu_id_data = []
for busienssId in range(5,105):
    for i in range(random.randint(1, 5)):
        row = {
            'business_menu_price': fake.pyint(min_value=1000, max_value=100000),
            'business_menu_name': fake.word(),
            'business_id': busienssId
        }
        business_menu_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('business_menu.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['business_menu_price', 'business_menu_name', 'business_id']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(business_menu_data)

print("Business Menu 생성 및 CSV 파일 저장 완료.")

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
INSERT INTO business_menu (business_menu_price, business_menu_name, business_id)
VALUES (%s, %s, %s)
"""

# 데이터 호출
Business_menu데이터 = pd.read_csv("business_menu.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Business_menu데이터.iterrows():
    data = (row["business_menu_price"], row["business_menu_name"], row["business_id"])
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Business Menu DB 저장 완료.")