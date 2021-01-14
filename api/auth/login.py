from flask import Blueprint, request
from main import cursor, connection
from randid import new_uuid
import auth.token as token
import passwords
import time
import json

login = Blueprint('login', __name__)

@login.route('/login', methods = ['POST'])
def index():
    data = request.get_json()

    email = data.get("email") or ""
    password = data.get("password") or ""

    if not email or \
       not password:
           return "", 400
    
    user_id = None
    user_id = user_id or cursor.execute("select user_id from users where email = ?", [email]).fetchone()
    user_id = user_id or cursor.execute("select user_id from users where username = ?", [email]).fetchone()
    if user_id == None: return "", 401

    passwd = cursor.execute("select password_hash from users where user_id = ?", [user_id[0]]).fetchone()
    check = passwords.check_password(password, passwd[0])
    if not check: return "", 401

    new_token = token.generate_token()
    token.add_token(user_id[0], token.hash_token(new_token))

    return new_token, 200
