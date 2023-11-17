import csv
from faker import Faker
from datetime import datetime
from datetime import date, timedelta
import random
import mysql.connector
import pandas as pd


statue = [
    "NONE",
	"CREATE",
	"ACTIVE",
	"USED",
	"EXPIRED"
]

type = [
    "SINGLE",
	"GIFTCARD"
]

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
# fake = Faker('ko_KR')

# coupon_data = []
# for funding_id in range(2,250):
#     for i in range(random.randint(5,10)):
#         # 유저 ID
#         user_id = fake.pyint(min_value=1, max_value=100)

#         row = {
#             'coupon_price': fake.pyint(min_value=1000, max_value=50000),
#             'coupon_status':  "USED",
#             'coupon_type' : random.choice(type),
#             'coupon_expiration_date': date.today() + timedelta(days=random.randint(1, 30)),
#             'coupon_qr_code_img_url': "https://s3.ap-northeast-2.amazonaws.com/showeatbucket/qr/qr_code_1",
#             'user_id': user_id,
#             'funding_id': funding_id,
#             'created_date' : datetime.now(),
#             'modified_date' : datetime.now()
#         }
#         coupon_data.append(row)

# # 더미 데이터 생성 및 CSV 파일로 저장
# with open('coupon.csv', 'w', newline='', encoding='cp949') as csvfile:
#     fieldnames = ['coupon_price', 'coupon_status','coupon_type','coupon_expiration_date','coupon_qr_code_img_url',
#                   'user_id', 'funding_id','created_date','modified_date'
#                   ]
#     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#     writer.writeheader()
#     writer.writerows(coupon_data)

# print("Coupon 생성 및 CSV 파일 저장 완료.")

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
INSERT INTO coupon (coupon_price, coupon_status,coupon_type , coupon_expiration_date,
                coupon_qr_code_img_url,user_id,funding_id, created_date,modified_date)
VALUES (%s, %s, %s, %s ,%s, %s, %s,%s,%s)
"""

# 데이터 호출
Coupon데이터 = pd.read_csv("coupon.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Coupon데이터.iterrows():
    data = (row["coupon_price"], row["coupon_status"], row["coupon_type"], row["coupon_expiration_date"],
            row["coupon_qr_code_img_url"], row["user_id"], row["funding_id"],
            row["created_date"], row["modified_date"]
            )
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Coupon DB 저장 완료.")