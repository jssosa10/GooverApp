import os
import json
import ConfigParser
from flaskext.mysql import MySQL
import hashlib
from flask import Flask, render_template, request, redirect
from flask_cors import CORS, cross_origin
import tinys3
from werkzeug import secure_filename
from uuid import uuid4


app = Flask(__name__)
mysql = MySQL()
config = ConfigParser.ConfigParser()
config.read('config.cfg')
app.config['MYSQL_DATABASE_HOST'] = config.get('MySQL', 'host') 
app.config['MYSQL_DATABASE_DB'] = config.get('MySQL', 'db')
app.config['MYSQL_DATABASE_USER'] = config.get('MySQL', 'user') 
app.config['MYSQL_DATABASE_PASSWORD'] = config.get('MySQL', 'passwd') 
app.config['AWS_KEY'] = config.get('S3', 'KEY') 
app.config['AWS_SECRET'] = config.get('S3', 'SECRET') 
mysql.init_app(app)
CORS(app)
s3 = tinys3.Connection(app.config['AWS_KEY'], app.config['AWS_SECRET'], tls=True)

@app.route("/courses", methods=['GET'])
def getCourses():
	id = request.args.get('id')
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select id,titulo from cursos where U_ID = "+str(id))
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1])} for x in lista]
	return json.dumps(lista),200

@app.route("/AllCourses", methods=['GET'])
def getAllC():
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("select id,titulo from cursos")
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1])} for x in lista]
	return json.dumps(lista),200
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
	idrestemas = [get_recursos_tema(i) for i in listaidtemas]
	print idrestemas
	nombresrestemas = [[get_recurso_nombre(i) for i in x] for x in idrestemas]
	print nombresrestemas
	idrecursos = [[get_recursos_subtema(i) for i in x] for x in idsubtemas]
	#print idrecursos
	nombrerecursossub = [[[get_recurso_nombre(i) for i in x] for x in y] for y in idrecursos]
	res = {'id':id,'titulo': get_nombre_curso(str(id)),'temas':[{'nombre':nombrestemas[i],'id':listaidtemas[i],'recursos':[{'nombre':nombresrestemas[i][j][0],'calificacion':nombresrestemas[i][j][1],'tipo':nombresrestemas[i][j][2],'id':nombresrestemas[i][j][3]} for j in range(len(nombresrestemas[i]))],'subtemas':[{'nombre':nombresubtemas[i][j],'id':idsubtemas[i][j],'recursos':[{'nombre':nombrerecursossub[i][j][k][0],'calificacion':nombrerecursossub[i][j][k][1],'tipo':nombrerecursossub[i][j][k][2],'id':nombrerecursossub[i][j][k][3]} for k in range(len(idrecursos[i][j])) ]} for j in range(len(idsubtemas[i]))]} for i in range(len(listaidtemas))]}
	return json.dumps(res),200
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
	k = cursor.fetchall()
	return [str(x[0]) for x in k]

def get_recursos_tema(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select ID_R from temarecurso where ID_T = "+i)
	return [str(x[0]) for x in list(cursor.fetchall())]
	
def get_recurso_nombre(i):
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute("select nombre,tipo,id from recursos where ID = "+i)
	x = cursor.fetchone()
	cursor.execute("select sum(puntaje), count(*) from calificaciones where ID_R = "+i)
	y = cursor.fetchone()
	if float(y[1])>0:
		return (str(x[0]),str(float(y[0])/float(y[1])),str(x[1]),str(x[2]))
	else:
		return (str(x[0]),str(0.0),str(x[1]),str(x[2]))

@app.route('/instituciones', methods=['GET'])
def get_unis():
	conn = mysql.connect()
   	cursor = conn.cursor()
	cursor.execute("select * from instituciones")
	lista = list(cursor.fetchall())
	lista = [{'id':str(x[0]),'titulo':str(x[1]),'img':str(x[2])} for x in lista]
	return json.dumps(lista),200
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

@app.route ('/tema',methods=['POST'])
def create_tema():
	conn = mysql.connect()
   	cursor =conn.cursor()
	content = request.get_json(silent=True)
	print content
	idc = content['idCurso']
	tit = content['titulo']
	print tit
	try:
		cursor.execute('insert into temas values(null,"'+str(tit)+'")')
		cursor.execute('select id from temas where nombre="'+str(tit)+'"')
		idd = cursor.fetchone()[0]
		print idd
		cursor.execute('insert into cursotema values(%s,%s)',(str(idc),str(idd)))
		conn.commit()
		return json.dumps('ok'),200
	except:
		conn.rollback()
		return json.dumps('Error'),400

@app.route ('/subtema',methods=['POST'])
def create_subtema():
	conn = mysql.connect()
   	cursor =conn.cursor()
	content = request.get_json(silent=True)
	print content
	idt = content['idTema']
	tit = content['titulo']
	print tit
	try:
		cursor.execute('insert into subtemas values(null,"'+str(tit)+'")')
		cursor.execute('select id from subtemas where nombre="'+str(tit)+'"')
		idd = cursor.fetchone()[0]
		print idd
		cursor.execute('insert into temasubtema values(%s,%s)',(str(idt),str(idd)))
		conn.commit()
		return json.dumps('ok'),200
	except:
		conn.rollback()
		return json.dumps('Error'),400
	
@app.route ('/recurso',methods=['POST'])
def upload_recurso():
	conn = mysql.connect()
   	cursor =conn.cursor()
	for file in request.files:
		file = request.files[file]
		base_file_name = "%s-%s" % (str(uuid4()), secure_filename(file.filename))
		file_name = 'tmp/%s' % base_file_name
		file.save(file_name)
		resp = s3.upload(base_file_name, open(file_name),bucket = 'gooverlabfiles')
		try:
			cursor.execute('insert into recursos values(null,"'+str(base_file_name)+'","Documento","'+str(resp.url)+'")')
			cursor.execute('select id from recursos where nombre="'+str(base_file_name)+'"')
			idd = cursor.fetchone()[0]
			if 'idS' in request.form:
				cursor.execute('insert into subtemarecurso values('+str(request.form['idS'])+','+str(idd)+')') 
			else:
				cursor.execute('insert into temarecurso values('+str(request.form['idT'])+','+str(idd)+')')
			conn.commit()
		except:
			print 'roll'
			conn.rollback()
			return json.dumps('Error'),404
	return json.dumps('Subio'),200

@app.route ('/recurso',methods=['GET'])
def get_recurso():
	i = request.args.get('id')
	conn = mysql.connect()
   	cursor =conn.cursor()
	cursor.execute('select URL from recursos where id = '+i)
	x = cursor.fetchone()[0]
	return json.dumps(x),200
	
@app.route ('/calificacion',methods=['POST'])
def post_cal():
	conn = mysql.connect()
   	cursor =conn.cursor()
	content = request.get_json(silent=True)
	print content
	idr = content['idRecurso']
	punta = content['puntaje']
	try:
		cursor.execute('insert into subtemas values(null,'+str(idr)+','+str(punta)+')')
		conn.commit()
		return json.dumps('ok'),200
	except:
		conn.rollback()
		return json.dumps('Error'),400


if __name__ == "__main__":

    app.run(host='', port=9000)
