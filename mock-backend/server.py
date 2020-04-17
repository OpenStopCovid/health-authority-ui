from flask import Flask, make_response, session, redirect, request, url_for

app = Flask(__name__)

app.secret_key = b"very awesomely super secret key that no one knows"


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
        return redirect(url_for("user_info"))
    return """
        <form method="post">
            <input type="submit" value="login">
        </form>
    """


@app.route("/logout/")
def logout():
    session.pop("username", None)
    return redirect(url_for("home"))
