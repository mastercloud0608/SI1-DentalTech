--											-----------------
--											TABLA LOG_USUARIO
--											-----------------

-- Trigger para registro de CREACION de usuario
CREATE OR REPLACE FUNCTION crear_usuario()
  RETURNS TRIGGER AS
$$
BEGIN
  INSERT INTO log_usuario (creat_at, accion,descripcion,id_user)
  VALUES (current_timestamp, 'Creacion','Se ha creado un nuevo usuario', NEW.id);
  
  IF NEW.rol = 'patient' THEN
    INSERT INTO paciente (usuarioId)
    VALUES (NEW.id);
  ELSIF NEW.rol = 'admin' THEN
    INSERT INTO administrador (usuarioId)
    VALUES (NEW.id);
  ELSIF NEW.rol = 'odontologist' THEN
    INSERT INTO odontologo (usuarioId)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER crear_usuario_trigger
AFTER DELETE ON Usuario
FOR EACH ROW
EXECUTE FUNCTION crear_usuario();



-- Trigger para registro de ACTUALIZACION de usuario
CREATE OR REPLACE FUNCTION actualizar_usuario()
  RETURNS TRIGGER AS
$$
BEGIN
  INSERT INTO log_usuario (creat_update, accion,descripcion, id_user)
  VALUES (current_timestamp, 'Actualizacion','Se han actualizado los datos de un usuario' ,NEW.id);
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER actualizar_usuario_trigger
AFTER DELETE ON Usuario
FOR EACH ROW
EXECUTE FUNCTION actualizar_usuario();



-- Trigger para registro de ELIMINACION de usuario
CREATE OR REPLACE FUNCTION eliminar_usuario()
  RETURNS TRIGGER AS
$$
BEGIN
  INSERT INTO log_usuario (creat_delete, accion, descripcion,id_user)
  VALUES (current_timestamp, 'Eliminacion','Se ha eliminado un usuario', Old.id);
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER eliminar_usuario_trigger
AFTER DELETE ON Usuario
FOR EACH ROW
EXECUTE FUNCTION eliminar_usuario();


select * from usuario;
delete from log_usuario;
drop table log_usuario;
delete from usuario;
select * from log_usuario;

INSERT INTO usuario(username,password,correo,rol) values ('quimet','123456','quimet@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diego','123456','diego@gmail.com','odontologist');
INSERT INTO usuario(username,password,correo,rol) values ('kathy','123456','kathy@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('moiso','123456','moiso@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diegogei','123456','gei@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('test','123456','test@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('test2','123456','test2@gmail.com','admin');


create table paciente(  --por modificar
	id serial primary key,
	usuarioId int,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);

create table administrador( --por modificar
	id serial primary key,
	usuarioId int not null ,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);

--create table odontologo(
--	id serial primary key,
--	usuarioId int,
 --   especialidad VARCHAR(40);
--	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
--);
create table odontologo(
	id serial primary key,
	id_agenda int,
	usuarioId int,
	foreign key(usuarioId) references usuario(id),
	foreign key(id_agenda) references agenda(id_agenda) ON DELETE CASCADE
);

create table agenda(
   id_agenda int primary key,
   turno varchar(20) not null
);

INSERT INTO usuario(username,password,correo,rol) values ('carlos','123456','carlos@gmail.com','odontologist');

select * from odontologo;

ALTER TABLE doctor
DROP COLUMN horario_inicio,
DROP COLUMN horario_fin;

ALTER TABLE doctor
RENAME TO odontologo;


SELECT * from administrador;

select * from usuario;

select * from log_usuario;

delete from usuario where id=49;
update usuario set "password"=123 where id=46;

SELECT * FROM log_usuario ORDER BY id DESC LIMIT 4;

SELECT DATE_TRUNC('day', creat_at) AS fecha, COUNT(*) AS cantidad_usuarios_nuevos
FROM log_usuario
WHERE accion = 'Creacion'
GROUP BY fecha
ORDER BY fecha;


--											-----------------
--											  TABLA DOCTOR
--											-----------------

ALTER TABLE doctor
ADD COLUMN horario_inicio TIME,
ADD COLUMN horario_fin TIME,
ADD COLUMN especialidad VARCHAR(40);

select * from doctor;

delete from doctor where id=4
update DOCTOR set horario_inicio='8:00' , horario_fin ='12:00' ,especialidad = 'endodoncia' where id=3;
update usuario set nombre='diego',apellido='iglesias godoy' where  id = 47

select usuario.id,nombre,apellido,horario_inicio,horario_fin,especialidad 
from usuario,doctor 
where usuario.id = doctor.usuarioid ;


--create table cita(
	--id serial primary key,
	--fechaRegistro date not null, -- fecha en que se registra la cita
    --fechaCita date not null,     -- fecha en al que se hara la cita
    --estado boolean not null,     -- activo puede ser activo,realizada
    --observaciones varchar(60)    -- opcional
--);

drop table cita;

create table cita(
	id serial primary key,
	id_agenda int,
	fechaRegistro date not null,
	fechaCita date not null,
	estado boolean not null,
	observaciones varchar(60),
		foreign key(id_agenda) references agenda(id)
);

drop table cita;

INSERT INTO cita(fecharegistro,fechacita,estado) values (current_date,'','activo');
INSERT INTO cita(fecharegistro,fechacita,estado) values (current_date,'','realizado');

SELECT current_date;


select * from cita;


create table tratamiento(
	id int primary key,
    nombre varchar(60) not null,
    costo int not null,
	duracion interval not null,
    descripcion varchar(255),
	id_odontologo int NOT NULL,
    FOREIGN KEY (id_odontologo) REFERENCES odontologo(id)
);


ALTER TABLE odontologo
ADD COLUMN especialidad varchar(40) not null;
delete from odontologo;
select * from odontologo;
--ALTER TABLE tratamiento ALTER COLUMN id TYPE int;

select * from tratamiento;
delete from tratamiento;
drop table tratamiento;

INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (1,'Chequeo general', '50', 'Se examinan los dientes,las encias, la boca y otras estructuras relacionadas para detectar posibles problemas o enfermedades dentales.','60 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (2,'Extracción de dientes', '250', 'Extracción de un diente dañado, infectado o problemático.','120 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (3,'Relleno dental', '90', 'Reparación de una cavidad dental utilizando un material de relleno.','90 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (4,'Corona dental', '250', 'Colocación de una cubierta protectora sobre un diente dañado o debilitado.','120 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (5,'Implante dental', '1500', 'Reemplazo de una raíz dental dañada por una estructura artificial en el hueso maxilar o mandibular.','90 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (6,'Ortodoncia', '2000', 'Corrección de la alineación dental y la mordida mediante el uso de brackets, alineadores u otros aparatos.','120 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (7,'Blanqueamiento dental', '120', 'Procedimiento para aclarar y blanquear los dientes, eliminando manchas y decoloración.','60 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (8,'Prótesis dental', '800', 'Colocación de una prótesis removible o fija para reemplazar uno o más dientes faltantes.','120 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) values (9,'Tratamiento de enfermedad periodontal', '200', 'Tratamiento de la enfermedad de las encías, incluyendo raspado y alisado radicular.','60 minutes');
INSERT INTO tratamiento(id,nombre,costo,descripcion,duracion) VALUES (10,'Endodoncia', '500', 'Tratamiento realizado para eliminar la pulpa infectada o inflamada de un diente y sellar los conductos radiculares.','60 minutes');

select * from tratamiento; --tratamiento poblado
select * from cita;  
select * from agenda;



-- Trigger para registro de ELIMINACION de usuario
CREATE OR REPLACE FUNCTION crear_agenda()
  RETURNS TRIGGER AS
$$
BEGIN
   INSERT INTO agenda(id_odontologo) values (New.id);
   RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER crear_agenda_trigger
AFTER INSERT ON odontologo
FOR EACH ROW
EXECUTE FUNCTION crear_agenda();


-- CREATE OR REPLACE PROCEDURE (argumentos)
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
  
-- END;
-- $$;


create table odontologo(
	id serial primary key,
	usuarioId int,
	foreign key(usuarioId) references usuario(id)
)
ALTER TABLE odontologo DROP COLUMN especialidad;

--agenda
create table agenda(
   id serial primary key,
   id_odontologo int not null,
   foreign key(id_odontologo) references odontologo(id)
);


select * from agenda;
select * from odontologo;


create table cita(
	id serial primary key,
	id_paciente int not null,
	id_agenda int not null,
	fechaRegistro date not null,
	fechaCita date not null,
	estado boolean not null,
	observaciones varchar(60), -- en proceso,realizada
	foreign key(id_agenda) references agenda(id),
	foreign key(id_paciente) references paciente(id)
);

drop table cita

INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado,observaciones) values (current_date,$1,$2,$3,$4,$5)





CREATE TABLE agenda_log (
  id serial PRIMARY KEY,
  id_agenda int,
  fecha date,
  tiempo_ocupado interval,
  FOREIGN KEY (id_agenda) REFERENCES agenda (id_agenda)
);


CREATE TABLE agenda_tratamiento_log (
    id_odontologo int,
    id_agenda int,
    id_tratamiento int,
    PRIMARY KEY (id_odontologo, id_agenda, id_tratamiento),
    FOREIGN KEY (id_odontologo) REFERENCES odontologo (id),
    FOREIGN KEY (id_agenda) REFERENCES agenda (id),
    FOREIGN KEY (id_tratamiento) REFERENCES tratamiento (id)
);







