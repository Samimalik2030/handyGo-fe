import { Badge, Table, Title } from "@mantine/core";

export default function CancelledBookings(){
     const bookings = [
                {
                  bookingId: "B001",
                  customerName: "John Doe",
                  serviceType: "Car Repair",
                  mechanicId: "M123",
                  bookingDate: "2025-03-24",
                  bookingTime: "10:00 AM",
                  status: "Pending",
                  amount: 5000
                },
                {
                  bookingId: "B002",
                  customerName: "Jane Smith",
                  serviceType: "Oil Change",
                  mechanicId: "M456",
                  bookingDate: "2025-03-25",
                  bookingTime: "2:30 PM",
                  status: "Confirmed",
                  amount: 1500
                },
                {
                  bookingId: "B003",
                  customerName: "Michael Johnson",
                  serviceType: "Tire Replacement",
                  mechanicId: "M789",
                  bookingDate: "2025-03-26",
                  bookingTime: "11:45 AM",
                  status: "Completed",
                  amount: 8000
                }
              ];
              
              console.log(bookings);
              const rows = bookings.map((booking) => (
                <Table.Tr key={booking.bookingId}>
                  <Table.Td>{booking.bookingId}</Table.Td>
                  <Table.Td>{booking.customerName}</Table.Td>
                  <Table.Td>{booking.serviceType}</Table.Td>
                 
                  <Table.Td>{booking.bookingDate}</Table.Td>
                  <Table.Td>{booking.bookingTime}</Table.Td>
                  <Table.Td>
                    <Badge w={100} color="#40c057ff">{booking.status}</Badge>
                  </Table.Td>
           
                </Table.Tr>
              ));
    return(
        <>
        <Table striped>
                     <Table.Thead styles={{
                       thead:{
                         backgroundColor:"#40c057ff",
                         color:"white",
                         height:"50px"
                       }
                     }}>
                       <Table.Tr>
                         <Table.Th>Booking ID</Table.Th>
                         <Table.Th>Customer Name</Table.Th>
                         <Table.Th>Service Type</Table.Th>
                      
                         <Table.Th>Booking Date</Table.Th>
                         <Table.Th>Booking Time</Table.Th>
                         <Table.Th>Status</Table.Th>
                       
                       </Table.Tr>
                     </Table.Thead>
                     <Table.Tbody>{rows}</Table.Tbody>
                   </Table>
        </>
    )
}