import { Table, HoverCard, Box, Menu, ActionIcon, Stack, Title,Text} from "@mantine/core";
import { useState, useEffect } from "react";
import api from "../../api";
import IconVerticalDots from "../../assets/iconVerticalDots";
import { IBooking } from "../../common/interfaces/bookings";
import { IUser } from "../../common/interfaces/user";
import { Workshop } from "../../common/interfaces/workshop";
import dayjs from 'dayjs'

export default function ServicesRequest() {
  const [requests, setRequests] = useState<IBooking[]>([]);
  const [workshop, setWorkshop] = useState<Workshop | null>(null);

  const getServiceRequest = async (workshopId: number) => {
    const response = await api.get(
      `/bookings?status=pending&workshopId=${workshopId}`
    );
    setRequests(response.data);
  };

  useEffect(() => {
    const user: IUser | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    async function getUserWorkshop() {
      const response = await api.get(`/workshops?userId=${user?.id}`);
      const workshop = response.data[0];
      setWorkshop(workshop);

      if (workshop?.id) {
        getServiceRequest(workshop.id);
      }
    }

    getUserWorkshop();
  }, []);

  const handleUpdateStatus = async (status: string, id: number) => {
    await api.patch(`/bookings/${id}/status`, { status });
    if (workshop?.id) {
      getServiceRequest(workshop.id); 
    }
  };

  const rows =
    requests.length === 0 ? (
      <Table.Tr>
        <Table.Td colSpan={7}>
          <Text ta="center" c="dimmed">
            There are no requests yet.
          </Text>
        </Table.Td>
      </Table.Tr>
    ) : (
      requests.map((booking) => (
        <Table.Tr key={booking.id}>
          <Table.Td>{booking.id}</Table.Td>
          <Table.Td>{booking?.user?.name}</Table.Td>
          <Table.Td>
            {booking.services.map((service, i) => (
              <Text key={i} fz={10}>
                {service}
              </Text>
            ))}
          </Table.Td>
          <Table.Td>
            <HoverCard width={250} shadow="md" withArrow openDelay={200} closeDelay={100}>
              <HoverCard.Target>
                <Box w={100} style={{ cursor: "pointer" }}>
                  <Text fz={12}>
                    {booking.problemDescription?.slice(0, 30)}...
                  </Text>
                </Box>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{booking.problemDescription}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Table.Td>
          <Table.Td>{dayjs(booking.date).format("DD MMM YYYY")}</Table.Td>
          <Table.Td>{booking.time}</Table.Td>
          <Table.Td>
            <Menu withinPortal position="bottom-end" shadow="md" width={150}>
              <Menu.Target>
                <ActionIcon>
                  <IconVerticalDots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => handleUpdateStatus("accepted", booking.id)}>
                  Approve
                </Menu.Item>
                <Menu.Item onClick={() => handleUpdateStatus("rejected", booking.id)}>
                  Reject
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Table.Td>
        </Table.Tr>
      ))
    );

  return (
    <Stack>
      <Title>Services Requests</Title>
      <Table striped>
        <Table.Thead
          styles={{
            thead: {
              backgroundColor: "#40c057ff",
              color: "white",
              height: "50px",
            },
          }}
        >
          <Table.Tr>
            <Table.Th>Booking ID</Table.Th>
            <Table.Th>Customer Name</Table.Th>
            <Table.Th>Services</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Booking Date</Table.Th>
            <Table.Th>Booking Time</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Stack>
  );
}
