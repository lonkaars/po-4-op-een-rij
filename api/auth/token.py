from main import cursor
import hashlib
import secrets
import json
import time

def valid_tokens(user_id):
    return json.loads(cursor.execute("select valid_tokens from users where user_id = ?", [user_id]).fetchone()[0])

def validateToken(user_id, token):
    tokens = valid_tokens(user_id)
    return hashlib.sha256(str(token).encode()).hexdigest() in [ t["token"] for t in tokens if t["expirationDate"] > int( time.time() * 1000 ) ]

def modify_tokens(user_id, formatted_token, remove):
    temp_tokens = valid_tokens(user_id)
    temp_tokens.remove(formatted_token) if remove else temp_tokens.append(formatted_token)
    cursor.execute("update users set valid_tokens = ? where user_id = ?", [json.dumps(temp_tokens), user_id])

def add_token(user_id, formatted_token):
    modify_tokens(user_id, formatted_token, False)

def revoke_token(user_id, formatted_token):
    modify_tokens(user_id, formatted_token, True)

def hash_token(token):
    token["token"] = hashlib.sha256(str(token["token"]).encode()).hexdigest()
    return token

def generate_token():
    return {
            "token": secrets.token_hex(128),
            "expirationDate": int( time.time() * 1000 ) + ( 24 * 60 * 60 * 1000 )
            }

