import csv
from faker import Faker
from datetime import datetime

# Credential 정보를 읽어옴
credential_data = []
with open('credential.csv', 'r') as credential_file:
    credential_reader = csv.DictReader(credential_file)
    for row in credential_reader:
        credential_data.append(row)

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

user_data = []
for credential in credential_data:
    row = {
        'user_nickname': fake.user_name(),
        'user_img_url': "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
        'user_address': fake.address(),
        'user_business': True,
        'user_money' : fake.pyint(min_value=1000000, max_value=10000000),
        'user_phone' : fake.phone_number().replace('-',''),
        'visited' : 0,
        'credential_id' : credential['credential_id'],
        'created_date' : datetime.now(),
        'modified_date' : datetime.now()
    }
    user_data.append(row)


# 더미 데이터 생성 및 CSV 파일로 저장
with open('user.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['user_nickname', 'user_img_url', 'user_address', 'user_business','user_money','user_phone','visited','credential_id','created_date','modified_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(user_data)

print("User 생성 및 CSV 파일 저장 완료.")