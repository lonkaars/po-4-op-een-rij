from db import cursor

def outcome(outcome_str, player_1):
    outcome_int = { "w": 1, "l": -1, "d": 0 }[outcome_str]
    if not player_1: outcome_int *= -1
    return { 1: "w", -1: "l", 0: "d" }[outcome_int]

def rating_v1(won_games): # python is a garbage language
    return abs(won_games) ** (1 / 2.2) * 23 * (1, -1)[won_games < 0]

def get_all_games(user_id):
    return cursor.execute("select player_1_id, player_2_id, outcome " + \
            "from games " + \
            "where (player_1_id = ? or player_2_id = ?) " + \
            "and status = \"finished\" or status = \"resign\"", [user_id, user_id]).fetchall()

def get_rating(user_id):
    score = 400
    games = get_all_games(user_id)
    mapped_games = [game if game[0] == user_id else (game[1], game[0], outcome(game[2], False)) for game in games]
    counted_opponents = {}
    for game in mapped_games:
        counted_opponents |= {game[1]: (counted_opponents.get(game[1]) or 0) + { "w": 1, "l": -1, "d": 0 }[game[2]]}
    for opponent in counted_opponents:
        score += rating_v1(counted_opponents.get(opponent))
    return int(score)