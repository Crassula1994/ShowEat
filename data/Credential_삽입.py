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
INSERT INTO credential (credential_id, email, credential_social_platform, credential_role,created_date,modified_date)
VALUES (%s, %s, %s, %s, %s ,%s)
"""

# 데이터 호출
Credential데이터 = pd.read_csv("credential.csv", encoding="cp949")
print(Credential데이터)

# 데이터프레임을 순회하며 데이터를 삽입
for index, row in Credential데이터.iterrows():
    data = (row["credential_id"], row["email"], row["credential_social_platform"], row["credential_role"],row["created_date"],row["modified_date"])
    cursor.execute(insert_query, data)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()