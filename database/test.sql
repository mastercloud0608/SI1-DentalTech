select * from agenda order by id

--citas para diego odontolog
INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado) 
values (current_date,CURRENT_DATE,1,1,true)

INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado) 
values (current_date,CURRENT_DATE,2,1,true)

INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado) 
values (current_date,CURRENT_DATE,3,1,true)

--citas para pedro odontolog
INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado) 
values (current_date,CURRENT_DATE,2,2,true)
--log_agenda



-- citas del odontologo x
select agenda.id,cita.*
from cita,agenda,odontologo
where odontologo.id = agenda.id_odontologo and  cita.id_agenda=agenda.id and agenda.id_odontologo = 2

select * from agenda

select * from tratamiento order by id


select * from paciente



CREATE OR REPLACE FUNCTION actualizar_tiempo_ocupado()
  RETURNS TRIGGER AS
$$
DECLARE
  total_tiempo interval;
BEGIN
  -- Calcular la suma de la duración de las citas de la agenda
  SELECT COALESCE(SUM(duracion), '00:00:00')
  INTO total_tiempo
  FROM cita
  WHERE id_agenda = NEW.id_agenda;

  -- Actualizar el campo tiempo_ocupado en la tabla log_agenda
  UPDATE log_agenda
  SET tiempo_ocupado = total_tiempo
  WHERE id_agenda = NEW.id_agenda;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;


select * from usuario,odontologo where usuario.id = odontologo.usuarioid order by odontologo.id;

select * from odontologo;


SELECT constraint_name
FROM information_schema.table_constraints
WHERE table_name = 'agenda' AND constraint_type = 'FOREIGN KEY';

ALTER TABLE agenda
DROP CONSTRAINT agenda_id_odontologo_fkey, -- Reemplaza "nombre_constraint" con el nombre real de la constraint actual en la tabla "agenda"
ADD FOREIGN KEY (id_odontologo) REFERENCES odontologo(id) ON DELETE CASCADE;

select * from paciente

insert into usuario(username,correo,password,rol) values('jesus123','familiar@gmail.com','123456','patient')


delete from usuario where username='jesus123'

select * from log_agenda



SELECT constraint_name
FROM information_schema.table_constraints
WHERE table_name = 'cita' AND constraint_type = 'FOREIGN KEY';

ALTER TABLE cita
DROP CONSTRAINT fk_cita_paciente, -- Reemplaza "nombre_constraint" con el nombre real de la constraint actual en la tabla "agenda"
ADD foreign key(id_paciente) references paciente(id) ON DELETE CASCADE;


select * from agenda

--- traer los datos de la tabla agenda de x odontologo
select * from odontologo,agenda 
where  agenda.id_odontologo = 2  and odontologo.id = 2

-- traer los dartos de la tabla paciente de x paciente
select paciente.id from usuario,paciente 
where usuario.id = paciente.usuarioid;







-- Actualizar columna fechaRegistro a tipo timestamp
ALTER TABLE cita
ALTER COLUMN fechaRegistro TYPE timestamp;

-- Actualizar columna fechaCita a tipo timestamp
ALTER TABLE cita
ALTER COLUMN fechaCita TYPE timestamp ;




select * from cita where id_agenda = 1

-- sacar en horas la duracion de citas 
SELECT distinct SUM(duracion) as duracion_total
FROM tratamiento,cita,agenda,odontologo 
where cita.id_agenda = agenda.id and tratamiento.id_odontologo = odontologo.id





-- INSERTAR ESPECIALIDAD DE ACUERDO AL ID DEL ODONTOLOGO
INSERT INTO  odontologo_especialidad(id_especialidad,id_odontologo) VALUES ($1, $2)

INSERT INTO usuario(username,password,correo,rol) values ('diego' ,'123456','diego@gmail.com','odontologist');
INSERT INTO usuario(username,password,correo,rol) values ('diego2' ,'123456','diego@gmail.com','odontologist');

delete from usuario where id=93

SELECT odontologo.id FROM usuario,odontologo where 12 = odontologo.usuarioid and usuario.id = odontologo.usuarioid

--consulta para ver por odontologo ,las especialidades que el tiene
select * 
from odontologo,odontologo_especialidad,especialidad 
group by odontologo.id,odontologo_especialidad.id_odontologo,odontologo_especialidad.id_especialidad,especialidad.id
having odontologo.id = odontologo_especialidad.id_odontologo and odontologo_especialidad.id_especialidad = especialidad.id
order by odontologo.id asc

select * from usuario,odontologo where usuario.id = odontologo.usuarioid order by odontologo.id

SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'tratamiento'

ALTER TABLE tratamiento
ADD FOREIGN KEY (especialidad_id) REFERENCES especialidad(id) ON DELETE CASCADE;

select * from tratamiento

INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Chequeo general', '50', 'Se examinan los dientes,las encias, la boca y otras estructuras relacionadas para detectar posibles problemas o enfermedades dentales.','60 minutes',1);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Extracción de dientes', '250', 'Extracción de un diente dañado, infectado o problemático.','120 minutes',2);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Relleno dental', '90', 'Reparación de una cavidad dental utilizando un material de relleno.','90 minutes',3);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Implante dental', '1500', 'Reemplazo de una raíz dental dañada por una estructura artificial en el hueso maxilar o mandibular.','90 minutes',4);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Ortodoncia', '2000', 'Corrección de la alineación dental y la mordida mediante el uso de brackets, alineadores u otros aparatos.','120 minutes',5);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Blanqueamiento dental', '120', 'Procedimiento para aclarar y blanquear los dientes, eliminando manchas y decoloración.','60 minutes',6);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Prótesis dental', '800', 'Colocación de una prótesis removible o fija para reemplazar uno o más dientes faltantes.','120 minutes',7);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Tratamiento de enfermedad periodontal', '200', 'Tratamiento de la enfermedad de las encías, incluyendo raspado y alisado radicular.','60 minutes',8);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) VALUES ('Endodoncia', '500', 'Tratamiento realizado para eliminar la pulpa infectada o inflamada de un diente y sellar los conductos radiculares.','60 minutes',9);

--- traer el id de la agenda del odontologo de acuerdo a su especialidad xd
select agenda.id as id_agenda,odontologo.*, odontologo_especialidad.*
from  agenda,odontologo,odontologo_especialidad 
where agenda.id_odontologo=odontologo.id and odontologo_especialidad.id_especialidad = 1
and odontologo_especialidad.id_odontologo = odontologo.id

--- traer el id de la agenda del odontologo de acuerdo a su especialidad xd v2
select agenda.id as id_agenda
from  agenda,odontologo,odontologo_especialidad 
where agenda.id_odontologo=odontologo.id and odontologo_especialidad.id_especialidad = 1
and odontologo_especialidad.id_odontologo = odontologo.id




