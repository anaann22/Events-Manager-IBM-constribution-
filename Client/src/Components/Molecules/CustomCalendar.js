// import React from 'react';

// function CustomCalendar() {

//     const [myEvents, setEvents] = React.useState([]);
//     const [isToastOpen, setToastOpen] = React.useState(false);
//     const [toastText, setToastText] = React.useState();

//     React.useEffect(() => {
//         getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
//             setEvents(events);
//         }, 'jsonp');
//     }, []);
    
//     const closeToast = React.useCallback(() => {
//         setToastOpen(false);
//     }, []); 
    
//     const onEventClick = React.useCallback((event) => {
//         setToastText(event.event.title);
//         setToastOpen(true);
//     }, []);
    
//     const view = React.useMemo(() => {
//         return {
//             calendar: { type: 'month' },
//             agenda: { type: 'month' }
//         };
//     }, []);

//     return <Page>
//         <Eventcalendar
//             theme="ios" 
//             themeVariant="dark"
//             clickToCreate={false}
//             dragToCreate={false}
//             dragToMove={false}
//             dragToResize={false}
//             eventDelete={false}
//             data={myEvents}
//             view={view}
//             onEventClick={onEventClick}
//        />
//         <Toast 
//     		message={toastText}
//     		isOpen={isToastOpen}
//             onClose={closeToast}
//     	/>
//     </Page>
// };

// export default CustomCalendar;