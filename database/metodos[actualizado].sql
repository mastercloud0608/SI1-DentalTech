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
AFTER INSERT ON Usuario
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
AFTER update ON Usuario
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


-- Funcion para contar los usuarios nuevos por dia
CREATE OR REPLACE FUNCTION contar_usuarios_nuevos_por_dia() 
RETURNS integer AS $$
DECLARE
    cantidad integer;
    fecha_actual date := current_date;
BEGIN
    SELECT COUNT(*)
    INTO cantidad
    FROM log_usuario
    WHERE accion = 'Creacion' AND DATE(creat_at) = fecha_actual;

    RETURN cantidad;
END;
$$ LANGUAGE plpgsql;

SELECT contar_usuarios_nuevos_por_dia() as count_users;







--											-----------------
--											TABLA AGENDA
--											-----------------


-- Trigger para la creacion de una AGENDA automaticamente para un doctor
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




--											-----------------
--											TABLA AGENDA
--											-----------------





