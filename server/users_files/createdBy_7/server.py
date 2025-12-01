from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/add", methods=["POST"])
def add_numbers():
    data = request.get_json()
    a = data.get("a", 0)
    b = data.get("b", 0)
    result = a + b
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
