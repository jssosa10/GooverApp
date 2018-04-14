import os
import json
import hashlib
import redis
from flask import Flask, render_template, request, redirect
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

r = redis.Redis()
@app.route("/courses", methods=['GET'])

def getCourses():
	return json.dumps(os.listdir('/home/ubuntu/courses'))


@app.route("/material", methods=['GET'])
def getMaterial():
	where = request.args.get('where')
	where = '/home/ubuntu/courses/'+where
	if os.path.isdir(where):
		return json.dumps(os.listdir(where))
	elif os.path.isfile(where): 
		return json.dumps('ok')
	else:
		return json.dumps('not ok')

@app.route('/login', methods=['POST'])
def do_login():
	m = hashlib.md5()
	m.update(request.form['password'])
	print m.hexdigest()
	print request.form['username'].decode("utf-8")
	if r.get(request.form['username']).decode("utf-8") == m.hexdigest():
		m = hashlib.md5()
		return json.dumps('ok'), 200
	else:
		m = hashlib.md5()
		return json.dumps('error'), 500	
@app.route('/register',methods=['POST'])
def do_regiter():
	m = hashlib.md5()
	content = request.get_json(silent=True)
	passw = content['password']
	user = content['username']
	m.update(passw)
	if r.get(user):
		m = hashlib.md5()
		return json.dumps('error'), 500
	else:
		r.set(user,m.hexdigest())
		m = hashlib.md5()
#	m.update(request.form['password'])
#	if r.get(request.form['username']):
#		m = hashlib.md5()
##		return json.dumps('error')
#	else: 
##		print m.hexdigest()
#		r.set(request.form['username'],m.hexdigest())
#		m = hashlib.md5()
	return json.dumps('ok'), 200

if __name__ == "__main__":

    app.run(host='', port=9000)
