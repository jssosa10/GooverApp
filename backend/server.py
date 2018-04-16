import os
import json
import ConfigParser
from flaskext.mysql import MySQL
import hashlib
from flask import Flask, render_template, request, redirect
from flask_cors import CORS, cross_origin
from helpers import *


app = Flask(__name__)
mysql = MySQL()
config = ConfigParser.ConfigParser()
app.config.from_object("config")
config.read('config.cfg')
app.config['MYSQL_DATABASE_HOST'] = config.get('MySQL', 'host') 
app.config['MYSQL_DATABASE_DB'] = config.get('MySQL', 'db')
app.config['MYSQL_DATABASE_USER'] = config.get('MySQL', 'user') 
app.config['MYSQL_DATABASE_PASSWORD'] = config.get('MySQL', 'passwd') 
mysql.init_app(app)
CORS(app)

@app.route("/courses", methods=['GET'])
def getCourses():
	id = request.args.get('id')
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select id,titulo from cursos where U_ID = "+str(id))
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1])} for x in lista]
	return json.dumps(lista)

@app.route("/AllCourses", methods=['GET'])
def getAllC():
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("select id,titulo from cursos")
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1])} for x in lista]
	return json.dumps(lista)
@app.route("/course",methods=['GET'])
def getCourse():
	id = request.args.get('id')
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select ID_T from cursotema where ID_C = "+str(id))
	listaidtemas = [str(x[0]) for x in  list(cursor.fetchall())]
	nombrestemas = [get_tema_nombre(i) for i in listaidtemas]
	idsubtemas = [get_subtemas(i) for i in listaidtemas]
	nombresubtemas = [[get_subtema_nombre(i) for i in x] for x in idsubtemas]
	idrecursos = [[get_recursos_subtema(i) for i in x] for x in idsubtemas]
	nombrerecursossub = [[[get_recurso_nombre(i) for i in x] for x in y] for y in idrecursos]
	res = {'titulo': get_nombre_curso(str(id)),'temas':[{'nombre':nombrestemas[i],'subtemas':[{'nombre':nombresubtemas[i][j],'recursos':[{'nombre':nombrerecursossub[i][j][k][0],'calificacion':nombrerecursossub[i][j][k][1],'tipo':nombrerecursossub[i][j][k][2]} for k in range(len(idrecursos)) ]} for j in range(len(idsubtemas))]} for i in range(len(listaidtemas))]}
	return json.dumps(res)
def get_nombre_curso(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select titulo from cursos where ID = "+i)
	x = cursor.fetchone()
	return str(x[0])
def get_tema_nombre(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select nombre from temas where ID = "+i)
	x = cursor.fetchone()
	return str(x[0])

def get_subtemas(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select ID_S from temasubtema where ID_T = "+i)
	return [str(x[0]) for x in list(cursor.fetchall())]

def get_subtema_nombre(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select nombre from subtemas where ID = "+i)
	x = cursor.fetchone()
	return str(x[0])

def get_recursos_subtema(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select ID_R from subtemarecurso where ID_S = "+i)
	return [str(x[0]) for x in list(cursor.fetchall())]

def get_recursos_tema(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select ID_R from temarecurso where ID_S = "+i)
	return [str(x[0]) for x in list(cursor.fetchall())]
	
def get_recurso_nombre(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select nombre,calificacion,tipo from recursos where ID = "+i)
	x = cursor.fetchone()
	return (str(x[0]),str(float(x[1])),str(x[2]))

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
   	cursor = conn.cursor()
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
	conn.close()
	return json.dumps(user), 200
@app.route ('/recurso',methods=['POST'])
def upload_recurso():
	print request.files
	print request.files['myfile']
	try:
		file = request.files['myfile'] 
		print file
		output = upload_file_to_s3(file, app.config["S3_BUCKET"])
		return json.dumps(output)
	except:
		return json.dumps('ERROR')
	



if __name__ == "__main__":

    app.run(host='', port=9000)
