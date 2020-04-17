from time import sleep

from flask import Flask, json, make_response, session, redirect, request, url_for

app = Flask(__name__)

app.secret_key = b"very awesomely super secret key that no one knows"

FRONT_URL = "http://127.0.0.1:8080/"


@app.after_request
def after_request(response):
    # Fake network delay.
    sleep(2)
    # Add CORS.
    header = response.headers
    header["Access-Control-Allow-Origin"] = "http://127.0.0.1:8080"
    header["Access-Control-Allow-Credentials"] = "true"
    return response


@app.route("/")
def home():
    return "Hello world"


@app.route("/user-info/")
def user_info():
    if "username" in session:
        return {"user": "Dr. Nemo"}
    return make_response("", 401)


@app.route("/login/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session["username"] = "Dr. Nemo"
        return redirect(FRONT_URL)
    return """
        <form method="post">
            <input type="submit" value="login">
        </form>
    """


@app.route("/logout/")
def logout():
    session.pop("username", None)
    return redirect(FRONT_URL)


@app.route("/create-code/", methods=["POST"])
def create_code():
    return json.jsonify(
        {"type": "qrcode", "code": "123456", "expireAt": "12345", "ttl": "120"}
    )
