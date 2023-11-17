import csv
from faker import Faker
from datetime import datetime
from datetime import date, timedelta
import random
import mysql.connector
import pandas as pd

# Coupon 정보를 읽어옴
coupon_data = []
with open('coupon.csv', 'r') as coupon_file:
    coupon_reader = csv.DictReader(coupon_file)
    for row in coupon_reader:
        coupon_data.append(row)


# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

review_data = []
for coupon in coupon_data:
    row = {
        'review_message': fake.word() + " " +  fake.word() + " " + fake.word(),
        'user_id': coupon['user_id'],
        'funding_id': coupon['funding_id'],
        'created_date' : datetime.now(),
        'modified_date' : datetime.now()
    }
    review_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('review.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['review_message','user_id', 'funding_id','created_date','modified_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(review_data)

print("Review 생성 및 CSV 파일 저장 완료.")

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
INSERT INTO review (review_message,user_id,funding_id, created_date,modified_date)
VALUES (%s, %s, %s, %s ,%s)
"""

# 데이터 호출
Review데이터 = pd.read_csv("review.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Review데이터.iterrows():
    data = (row["review_message"], row["user_id"], row["funding_id"],
            row["created_date"], row["modified_date"]
            )
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Review DB 저장 완료.")