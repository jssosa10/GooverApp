import MySQLdb as mdb
import ConfigParser, json
config = ConfigParser.ConfigParser()
config.read('config.cfg')
host=config.get('MySQL', 'host')  
db=config.get('MySQL', 'db')
user=config.get('MySQL', 'user')  
passwd=config.get('MySQL', 'passwd')
con = mdb.connect(host,user,passwd,db, charset='utf8')
cursor = con.cursor()
def insertupdatequery(query):
        if query:
            try:
                # Execute the SQL command
                cursor.execute(query)
                # Commit your changes in the database
                con.commit()
            except con.Error, e:
                # Rollback in case there is any error
                con.rollback()
                print "ESTE SQL:" + query
                print "Error %d: %s" % (e.args[0],e.args[1])
while True:
    nombre = raw_input()
    query = "INSERT INTO cursos values (null,'%s',1)" % nombre
    insertupdatequery(query)
