import os
import json
import ConfigParser
from flaskext.mysql import MySQL
import hashlib
import redis
from flask import Flask, render_template, request, redirect
from flask_cors import CORS, cross_origin

app = Flask(__name__)
mysql = MySQL()
config = ConfigParser.ConfigParser()
config.read('config.cfg')
app.config['MYSQL_DATABASE_HOST'] = config.get('MySQL', 'host') 
app.config['MYSQL_DATABASE_DB'] = config.get('MySQL', 'db')
app.config['MYSQL_DATABASE_USER'] = config.get('MySQL', 'user') 
app.config['MYSQL_DATABASE_PASSWORD'] = config.get('MySQL', 'passwd') 
mysql.init_app(app)
CORS(app)

r = redis.Redis()
@app.route("/courses", methods=['GET'])
def getCourses():
	id = request.args.get('id')
	conn = mysql.connect()
    cursor =conn.cursor()
	cursor.execute("select id,titulo from cursos where U_ID=%d",id)
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1])} for x in lista]
	return json.dumps(lista)

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

@app.route('/instituciones', methods=['GET'])
def get_unis():
	conn = mysql.connect()
        cursor =conn.cursor()
	cursor.execute("select * from instituciones")
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1]),'img':str(x[2])} for x in lista]
	return json.dumps(lista)
@app.route('/login', methods=['POST'])
def do_login():
	m = hashlib.md5()
	content = request.get_json(silent=True)
	passw = content['password']
        user = content['username']
	m.update(passw)
	prs =  m.hexdigest()
	conn = mysql.connect()
	cursor =conn.cursor()
        cursor.execute("select password from usuarios where username='"+user+"'")
	pss = cursor.fetchone()
	if pss[0]==prs:
		m = hashlib.md5()
		conn.close()
		return json.dumps(user), 200
	else:
		m = hashlib.md5()
		conn.close()
		return json.dumps('error'), 403	
@app.route('/register',methods=['POST'])
def do_regiter():
	m = hashlib.md5()
	content = request.get_json(silent=True)
	passw = content['password']
	user = content['username']
	conn = mysql.connect()
	cursor =conn.cursor()
	cursor.execute("select password from usuarios where username='"+user+"'")
	pss = cursor.fetchone()
	m.update(passw)
	if not  pss is None: 
		m = hashlib.md5()
		conn.close()
		return json.dumps('error'), 412 
	else:
		try:
			prs = m.hexdigest()
			cursor.execute("insert into usuarios values(null,%s,%s)",(user,prs))
			conn.commit()
		except:
			conn.rollback()
		m = hashlib.md5()
#	m.update(request.form['password'])
#	if r.get(request.form['username']):
#		m = hashlib.md5()
##		return json.dumps('error')
#	else: 
##		print m.hexdigest()
#		r.set(request.form['username'],m.hexdigest())
#		m = hashlib.md5()
	conn.close()
	return json.dumps(user), 200

if __name__ == "__main__":

    app.run(host='', port=9000)
