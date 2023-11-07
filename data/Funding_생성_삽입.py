import csv
from faker import Faker
from datetime import datetime
from datetime import date, timedelta
import random
import mysql.connector
import pandas as pd

categories = [
    "KOREAN",
    "CHINESE",
    "JAPANESE_SUSHI",
    "WESTERN",
    "CHICKEN_BURGER",
    "ASIAN",
    "SNACKS_LATE_NIGHT",
    "CAFE_DESSERT"
]

# Business 정보를 읽어옴
business_data = []
with open('business.csv', 'r') as business_file:
    business_reader = csv.DictReader(business_file)
    for row in business_reader:
        business_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

funding_data = []
for busienss in business_data:
    for i in range(random.randint(5,6)):
        business_id = fake.pyint(min_value=52, max_value=150)
        funding_discount_price = fake.pyint(min_value=10000, max_value=49999)
        funding_price = fake.pyint(min_value=50000, max_value=100000)
        funding_discount_rate =  ((funding_price - funding_discount_price) / funding_price) * 100
        
        funding_max_limit = fake.pyint(min_value=30, max_value=200)
        funding_min_limit = fake.pyint(min_value=5, max_value=20)
        funding_cur_count = fake.pyint(min_value=0, max_value=funding_max_limit-10)
        participation_rate =  ( funding_cur_count / funding_min_limit) * 100
        funding_total_amount = funding_cur_count * funding_discount_price

        row = {
            'funding_title': fake.word(),
            'funding_business_name': fake.company(),
            'funding_category': random.choice(categories),
            'funding_max_limit': funding_max_limit,
            'funding_min_limit': funding_min_limit,
            'funding_cur_count': funding_cur_count,
            'participation_rate': participation_rate,
            'funding_total_amount': funding_total_amount,
            'funding_discount_price': funding_discount_price,
            'funding_discount_rate': funding_discount_rate,
            'funding_menu': fake.word(),
            'funding_price': funding_price,
            'funding_description': fake.catch_phrase(),
            'funding_end_date' : date.today() + timedelta(days=random.randint(1, 30)),
            'funding_is_active': "ACTIVE",
            'funding_is_success': "UNDECIDED",
            'business_id': business_id,
            'created_date' : datetime.now(),
            'modified_date' : datetime.now()
        }
        funding_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('funding.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['funding_title', 'funding_business_name', 'funding_category','funding_max_limit', 'funding_min_limit', 'funding_cur_count',
                  'participation_rate', 'funding_total_amount', 'funding_discount_price','funding_discount_rate','funding_menu', 'funding_price', 'funding_description',
                  'funding_end_date', 'funding_is_active', 'funding_is_success', 'business_id','created_date','modified_date'
                  ]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(funding_data)

print("Funding 생성 및 CSV 파일 저장 완료.")

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
INSERT INTO funding (funding_title, funding_business_name, funding_category,funding_max_limit, funding_min_limit, funding_cur_count,
                  participation_rate, funding_total_amount, funding_discount_price,funding_discount_rate,funding_menu, funding_price, funding_description,
                  funding_end_date,funding_is_active, funding_is_success, business_id,created_date,modified_date)
VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s ,%s)
"""

# 데이터 호출
Funding데이터 = pd.read_csv("funding.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Funding데이터.iterrows():
    data = (row["funding_title"], row["funding_business_name"], row["funding_category"],
            row["funding_max_limit"], row["funding_min_limit"], row["funding_cur_count"],
            row["participation_rate"], row["funding_total_amount"], row["funding_discount_price"],row["funding_discount_rate"],
            row["funding_menu"], row["funding_price"], row["funding_description"],row["funding_end_date"],
            row["funding_is_active"], row["funding_is_success"], row["business_id"],
            row["created_date"], row["modified_date"]
            )
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()

print("Funding DB 저장 완료.")