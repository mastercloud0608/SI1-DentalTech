import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useProvider } from '../../../context/AuthProvider';
import { useParams } from 'react-router-dom';

export const PatientQuote = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { createQuote ,getUser,getPatientId} = useProvider();
  const params = useParams();

  function renderEventContent(eventInfo) {
    const eventStart = eventInfo.event.start;
    const eventEnd = eventInfo.event.end;
    const formattedStartTime = eventStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = eventEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <>
        <b className='mr-2'>{formattedStartTime} - {formattedEndTime}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleDateSelect = async(selectInfo) => {
    // const {id} = getUser();
    // const patient = await getPatientId(id);
    // const quote = {
    //   fechacita:selectInfo.startStr,
    //   id_paciente:patient.id,
    //   id_agenda:params.id
    // }
    // createQuote(quote);
    // console.log(patient);
    const title = prompt('Por favor ingresa motivo de la cita');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const uniqueId = nanoid();

    if (title) {
      const newEvent = {
        id: uniqueId, 
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };

      console.log('nuevo evento', newEvent)
      setCalendarEvents([...calendarEvents, newEvent]);
    }
  }

  const handleEventRemove = (eventInfo) => {
    const calendarApi = eventInfo.view.calendar;
    calendarApi.unselect();

    setCalendarEvents(prevEvents => prevEvents.filter(event => event.id !== eventInfo.event.id));
  }

  return (
    <div className="container overflow-auto max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-4">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl mb-10">
            Crear cita
          </h2>
        </div>
      </div>
      <FullCalendar
        locale="es"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth',
        }}
        initialView='dayGridMonth'
        weekends={false}
        events={calendarEvents}
        select={handleDateSelect}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventRemove}
      />
    </div>
  )
}
