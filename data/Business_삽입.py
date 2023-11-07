import mysql.connector
import pandas as pd

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
INSERT INTO business (business_name, business_img_url, business_phone, business_ceo,business_email,business_money,business_funding_count,business_supporter_count
,business_address,business_account_holder,business_account,business_number,business_registration_url,bank_book_url,business_bio
,business_operating_time,business_closed_days,user_id,created_date,modified_date)
VALUES (%s, %s, %s, %s, %s ,%s , %s , %s , %s , %s ,%s, %s, %s, %s, %s ,%s , %s , %s , %s , %s)
"""

# 데이터 호출
Business데이터 = pd.read_csv("business.csv", encoding="cp949")


# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Business데이터.iterrows():
    data = (row["business_name"], row["business_img_url"], row["business_phone"], row["business_ceo"],row["business_email"],row["business_money"],
            row["business_funding_count"],row["business_supporter_count"],row["business_address"],row["business_account_holder"],
            row["business_account"],row["business_number"],row["business_registration_url"],row["bank_book_url"],
            row["business_bio"],row["business_operating_time"],row["business_closed_days"],row["user_id"],
            row["created_date"],row["modified_date"]
            )
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()