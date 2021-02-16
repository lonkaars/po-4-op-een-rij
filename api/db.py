# dit bestand is hier om circular imports te vermijden
import os
import sqlite3

db_path = os.path.abspath("database/database.db")
connection = sqlite3.connect(db_path, check_same_thread=False)
#!                                    ^^^ Dit is onveilig en goede multithreading support moet nog geïmplementeerd worden
cursor = connection.cursor()
