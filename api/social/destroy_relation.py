from flask import Blueprint, request
from db import cursor
from auth.login_token import token_login
from social.create_relation import remove_relation
from user.info import get_relation_to
from socket_io import io
import time

remove = Blueprint('remove', __name__)

@remove.route('/remove', methods = ['POST'])
def index():
    data = request.get_json()

    user_2_id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    user_1_id = token_login(token) or ""

    if not user_1_id or \
       not user_2_id:
           return "", 403

    relation = get_relation_to(user_1_id, user_2_id)
    if relation == "none": return "", 403

    remove_relation(user_1_id, user_2_id)
    remove_relation(user_2_id, user_1_id)

    io.emit("changedRelation", { "id": user_2_id }, room="user-"+user_1_id)
    io.emit("changedRelation", { "id": user_1_id }, room="user-"+user_2_id)

    return "", 200

unblock = Blueprint('unblock', __name__)

@unblock.route('/unblock', methods = ['POST'])
def index():
    data = request.get_json()

    user_2_id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    user_1_id = token_login(token) or ""

    if not user_1_id or \
       not user_2_id:
           return "", 403

    if get_relation_to(user_1_id, user_2_id) != "blocked": return "", 403

    remove_relation(user_1_id, user_2_id)
    return "", 200

dynamic_routes = [
        ["/social", remove],
        ["/social", unblock]
        ]

