create database clinica;


create table usuario(
	id serial primary key,
    username varchar(40) unique not null,
    password varchar(40) not null,
    nombre varchar(40),
    apellido varchar(40),
	correo varchar(50),  
    telefono varchar(20),
    direccion varchar(100),
    ci varchar(20),
	rol varchar(40) not null
);

INSERT INTO usuario(username,password,correo,rol) values ('quimet','123456','quimet@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diego' ,'123456','diego@gmail.com','odontologist');
INSERT INTO usuario(username,password,correo,rol) values ('kathy','123456','kathy@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('moiso','123456','moiso@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diegogei','123456','gei@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('test','123456','test@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('test2','123456','test2@gmail.com','admin');


create table log_usuario(
  id serial primary key,
  id_actor int,
  creat_at TIMESTAMP,
  creat_update TIMESTAMP,
  creat_delete TIMESTAMP,
  accion varchar(20),
  descripcion varchar(255),
  id_user int
);

create table administrador(
	id serial primary key,
	usuarioId int not null,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);

create table odontologo(  
	id serial primary key,
	usuarioId int not null,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE,
);


create table paciente(
	id serial primary key,
	usuarioId int not null,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);


create table agenda(
   id serial primary key,
   id_odontologo int not null,
   foreign key(id_odontologo) references odontologo(id) ON DELETE CASCADE
);

CREATE TABLE log_agenda (
  id_agenda int,
  fecha TIMESTAMP,
  tiempo_ocupado interval,
  FOREIGN KEY (id_agenda) REFERENCES agenda (id)
);

create table tratamiento(
	id serial primary key,
    nombre varchar(60) not null,
    costo int not null,
	duracion interval,
    descripcion varchar(255),
    especialidad_id INT 
    FOREIGN key (especialidad_id) REFERENCES especialidad(id) ON DELETE CASCADE --nuevo
);

INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Chequeo general', '50', 'Se examinan los dientes,las encias, la boca y otras estructuras relacionadas para detectar posibles problemas o enfermedades dentales.','60 minutes',1);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Extracción de dientes', '250', 'Extracción de un diente dañado, infectado o problemático.','120 minutes',2);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Relleno dental', '90', 'Reparación de una cavidad dental utilizando un material de relleno.','90 minutes',3);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Implante dental', '1500', 'Reemplazo de una raíz dental dañada por una estructura artificial en el hueso maxilar o mandibular.','90 minutes',4);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Ortodoncia', '2000', 'Corrección de la alineación dental y la mordida mediante el uso de brackets, alineadores u otros aparatos.','120 minutes',5);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Blanqueamiento dental', '120', 'Procedimiento para aclarar y blanquear los dientes, eliminando manchas y decoloración.','60 minutes',6);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Prótesis dental', '800', 'Colocación de una prótesis removible o fija para reemplazar uno o más dientes faltantes.','120 minutes',7);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) values ('Tratamiento de enfermedad periodontal', '200', 'Tratamiento de la enfermedad de las encías, incluyendo raspado y alisado radicular.','60 minutes',8);
INSERT INTO tratamiento(nombre,costo,descripcion,duracion,especialidad_id) VALUES ('Endodoncia', '500', 'Tratamiento realizado para eliminar la pulpa infectada o inflamada de un diente y sellar los conductos radiculares.','60 minutes',9);


create table cita(
	id serial primary key,
	id_agenda int not null,
	fechaRegistro date not null,
	fechaCita date not null,
	estado boolean not null,
	observaciones varchar(60),
	id_paciente int not null,
	foreign key(id_paciente) references paciente(id) ON DELETE CASCADE,
	foreign key(id_agenda) references agenda(id) ON DELETE CASCADE
);


create table material(
	id serial primary key,
	nombre varchar(50) not null,
    cantidad int not null,
    descripcion varchar(255)
);


INSERT INTO material (nombre, cantidad, descripcion) VALUES ('Anestesia local', 50, 'Anestesico utilizado para adormecer la zona antes de un procedimiento dental');
INSERT INTO material (nombre, cantidad, descripcion) VALUES ('Compresa de gasa', 100, 'Gasas esteriles utilizadas para la limpieza y la absorcion de liquidos durante los procedimientos dentales');
INSERT INTO material (nombre, cantidad, descripcion) VALUES ('Guantes de látex', 200, 'Guantes desechables utilizados para garantizar la higiene y la proteccion durante los tratamientos');
INSERT INTO material (nombre, cantidad, descripcion) VALUES ('Anillos de matriz', 50, 'Anillos de plastico utilizados en restauraciones dentales para ayudar a dar forma a la restauracion y mantenerla en su lugar');
INSERT INTO material (nombre, cantidad, descripcion) VALUES ('Cemento dental', 20, 'Material adhesivo utilizado para unir restauraciones dentales, como coronas y puentes, a los dientes naturales');


create table factura(    
	id serial,
    idTratamiento int not null,
    idCita int not null,
    total float,
    observacion varchar(40),
    primary key(id,idTratamiento,idCita),
    foreign key(idTratamiento) references tratamiento(id),
    foreign key(idCita) references cita(id)
);

--desde aqui por actualizar
create table condicion(
	id serial primary key,
	nombre varchar(50) not null,
    descripcion varchar(60)
);

create table pacienteCondicion(
	idCondicion int not null,
    idPaciente int not null,
    primary key(idCondicion,idPaciente),
    foreign key(idCondicion) references condicion(id),
    foreign key(idPaciente) references paciente(id)
);

create table odontograma(
	id serial primary key,
    idPaciente int,
	foreign key(idPaciente) references paciente(id)
);

create table piezaDental(
	id serial primary key,
	nombre varchar(50) not null
);

create table estadoPieza(
	idOdontograma int not null,
    idPiezaDental int not null,
    descripcion varchar(60),
    primary key(idOdontograma,idPiezaDental),
    foreign key(idOdontograma) references odontograma(id),
    foreign key(idPiezaDental) references piezaDental(id)
);


create table detalleMaterial(
	idMaterial int not null,
    idCita int not null,
    primary key(idMaterial,idCita),
    foreign key(idMaterial) references material(id),
    foreign key(idCita) references cita(id)
);


create table medicamento(   -- modificado
	id serial primary key,
    nombre varchar(50) not null,
    descripcion varchar(60) not null
    --costo float not null
);

INSERT INTO medicamento (nombre, descripcion) VALUES ('Ibuprofeno', 'Antiinflamatorio y analgésico');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Amoxicilina', 'Antibiótico para infecciones bacterianas');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Paracetamol', 'Analgésico y antipirético');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Nistatina', 'Antifúngico para infecciones por hongos');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Enjuague Bucal', 'Solución para enjuague bucal');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Ketorolaco', 'Analgésico no esteroideo');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Fluoruro de Sodio', 'Ayuda a fortalecer el esmalte dental');
INSERT INTO medicamento (nombre, descripcion) VALUES ('Clorhexidina', 'Enjuague bucal antiséptico para higiene oral');

create table receta(   
	id serial primary key,
    descripcion varchar(60)
);

create table recetaMedicamento(   
	idReceta int not null,
    idMedicamento int not null,
    dosis varchar(60) not null,
    primary key(idReceta,idMedicamento),
    foreign key(idReceta) references receta(id),
    foreign key(idMedicamento) references medicamento(id)
);


--- nuevo
create table especialidad(
	id serial primary key,
	nombre varchar(60) not null
);

-- nuevo
create table odontologo_especialidad(
	id_especialidad int  not null,
	id_odontologo int not  null,
    primary key(id_especialidad,id_odontologo),
    foreign key(id_especialidad) references especialidad(id) ON DELETE CASCADE,
    foreign key(id_odontologo) references odontologo(id) ON DELETE CASCADE
);

-- nuevo
INSERT INTO especialidad(nombre) values ('Odontología General');
INSERT INTO especialidad(nombre) values ('Cirugía Oral y Maxilofacial');
INSERT INTO especialidad(nombre) values ('Odontología Restauradora');
INSERT INTO especialidad(nombre) values ('Implantología Dental');
INSERT INTO especialidad(nombre) values ('Ortodoncia y Ortopedia Maxilofacial');
INSERT INTO especialidad(nombre) values ('Odontología Estética');
INSERT INTO especialidad(nombre) values ('Prostodoncia');
INSERT INTO especialidad(nombre) values ('Periodoncia');
INSERT INTO especialidad(nombre) values ('Endodoncia');




      