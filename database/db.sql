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

create table paciente(
	id serial primary key,
	usuarioId int,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);

create table administrador(
	id serial primary key,
	usuarioId int not null ,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);

create table odontologo(  --odontologo
	id serial primary key,
	usuarioId int,
	foreign key(usuarioId) references usuario(id) ON DELETE CASCADE
);


INSERT INTO usuario(username,password,correo,rol) values ('quimet','123456','quimet@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diego','123456','diego@gmail.com','odontologist');
INSERT INTO usuario(username,password,correo,rol) values ('kathy','123456','kathy@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('moiso','123456','moiso@gmail.com','admin');
INSERT INTO usuario(username,password,correo,rol) values ('diegogei','123456','gei@gmail.com','patient');
INSERT INTO usuario(username,password,correo,rol) values ('test','123456','test@gmail.com','admin');

create table log_usuario(
  id serial primary key,
  id_actor int,
  creat_at TIMESTAMP,
  creat_update TIMESTAMP,
  creat_delete TIMESTAMP,
  accion varchar(20),
  descripcion varchar(40),
  id_user int
);


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


create table cita(
	id serial primary key,
	fechaRegistro date not null, -- fecha en que se registra la cita
    fechaCita date not null,     -- fecha en al que se hara la cita
    estado boolean not null,     -- activo puede ser activo,realizada
    observaciones varchar(60)    -- opcional
);

create table detalleMaterial(
	idMaterial int not null,
    idCita int not null,
    primary key(idMaterial,idCita),
    foreign key(idMaterial) references material(id),
    foreign key(idCita) references cita(id)
);

create table tratamiento(
	id int primary key,
    nombre varchar(60) not null,
    costo int not null,
    descripcion varchar(255)
);


--cita_tratamiento
create table factura(    
	id serial key,
    idTratamiento int not null,
    idCita int not null,
    total float,
    observacion varchar(40),
    primary key(id,idTratamiento,idCita),
    foreign key(idTratamiento) references tratamiento(id),
    foreign key(idCita) references cita(id)
);


create table medicamento(   -- modificado
	id serial primary key,
    nombre varchar(50) not null
    descripcion varchar(60) not null,
    --costo float not null
);

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

 

