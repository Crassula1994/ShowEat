import csv
from faker import Faker
from datetime import datetime
import random

# User 정보를 읽어옴
user_data = []
with open('user.csv', 'r') as user_file:
    user_reader = csv.DictReader(user_file)
    for row in user_reader:
        user_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

seoul_districts = [
    "강남구", "강동구", "강북구", "강서구", 
    "관악구", "광진구", "구로구", "금천구", 
    "노원구", "도봉구", "동대문구", "동작구", 
    "마포구", "서대문구", "서초구", "성동구", 
    "성북구", "송파구", "양천구", "영등포구", 
    "용산구", "은평구", "종로구", "중구", "중랑구"
]

business_data = []
for user in range(1,101):
    name = fake.user_name()
    row = {
        'business_name': fake.company(),
        'business_img_url': "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
        'business_phone': fake.phone_number().replace('-',''),
        'business_ceo': name,
        'business_email' : fake.email(),
        'business_money' : fake.pyint(min_value=1000000, max_value=10000000),
        'business_funding_count' : fake.pyint(min_value=1, max_value=10),
        'business_supporter_count' : fake.pyint(min_value=0, max_value=100),
        'business_address' : "서울특별시 " + random.choice(seoul_districts),
        'business_account_holder' : name,
        'business_account' : f"{fake.random_number(digits=3)}-{fake.random_number(digits=3)}-{fake.random_number(digits=6)}",
        'business_number' : fake.pyint(min_value=10000, max_value=100000000),
        'business_registration_url' : fake.sentence(),
        'bank_book_url' : fake.sentence(), 
        'business_bio' : fake.catch_phrase(), 
        'business_operating_time' : fake.sentence(),
        'business_closed_days' : fake.sentence(), 
        'user_id' : user,
        'created_date' : datetime.now(),
        'modified_date' : datetime.now()
    }
    business_data.append(row)

# 더미 데이터 생성 및 CSV 파일로 저장
with open('business.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['business_name', 'business_img_url', 'business_phone', 'business_ceo','business_email','business_money',
    'business_funding_count','business_supporter_count','business_address','business_account_holder','business_account', 
    'business_number','business_registration_url','bank_book_url','business_bio'
    ,'business_operating_time' ,'business_closed_days','user_id','created_date','modified_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(business_data)

print("Business 생성 및 CSV 파일 저장 완료.")