import { useEffect, useState } from "react";
import { getAllTickets } from "./services/ticketService";
import "./App.css";

export const App = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState();

  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray);
    });
  }, []);

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true);
          }}
        ></button>
      </div>
      <div>
        <button
          className="filer-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false);
          }}
        >
          Emergency
        </button>
      </div>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">#{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency</div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
