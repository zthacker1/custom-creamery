export const getAllTickets = () => {
  return fetch(`http://locahlhost:8088/serviceTickets`).then((res) =>
    res.json()
  );
};
