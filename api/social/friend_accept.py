from flask import Blueprint, request
from db import cursor, connection
from socket_io import io
from hierarchy import two_person
import time

accept = Blueprint('accept', __name__)


@accept.route("/accept", methods=['POST'])
@two_person
def route(user_1_id, user_2_id):
    cursor.execute(
        "update social set type = \"friendship\" where user_1_id = ? and user_2_id = ?",
        [user_2_id, user_1_id]
    )
    connection.commit()

    io.emit("changedRelation", {"id": user_2_id}, room="user-" + user_1_id)
    io.emit("changedRelation", {"id": user_1_id}, room="user-" + user_2_id)

    return "", 200


dynamic_route = ["/social", accept]
