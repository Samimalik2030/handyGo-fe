import {
  Table,
  HoverCard,
  Box,
  Menu,
  ActionIcon,
  Stack,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../../../api";
import IconVerticalDots from "../../../assets/iconVerticalDots";
import { IBooking } from "../../../common/interfaces/bookings";
import { IUser } from "../../../common/interfaces/user";

export default function CustomerServicesRequest() {
  const [requests, setRequests] = useState<IBooking[]>([]);
  const [refresh, setRefresh] = useState(false); // State to re-trigger useEffect

  const getServiceRequest = async (userId: number) => {
    try {
      const response = await api.get(
        `/bookings?status=pending&userId=${userId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  useEffect(() => {
    const user: IUser | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (user?.id) {
      getServiceRequest(user.id);
    }
  }, [refresh]); // Will re-run when refresh state changes

  const handleUpdateStatus = async (status: string, id: number) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      setRefresh((prev) => !prev); // Toggle refresh to re-fetch data
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const rows =
    requests.length === 0 ? (
      <Table.Tr>
        <Table.Td colSpan={7}>
          <Text ta="center" c="dimmed">
            There are no service requests yet.
          </Text>
        </Table.Td>
      </Table.Tr>
    ) : (
      requests.map((booking) => (
        <Table.Tr key={booking.id}>
          <Table.Td>{booking.id}</Table.Td>
          <Table.Td>{booking?.workshop?.name}</Table.Td>
          <Table.Td>
            {booking.services.map((service, i) => (
              <Text key={i} fz={10}>
                {service}
              </Text>
            ))}
          </Table.Td>
          <Table.Td>
            <HoverCard
              width={250}
              shadow="md"
              withArrow
              openDelay={200}
              closeDelay={100}
            >
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
                <Menu.Item
                  onClick={() => handleUpdateStatus("rejected", booking.id)}
                >
                  Cancel
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Table.Td>
        </Table.Tr>
      ))
    );

  return (
    <Stack>
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
            <Table.Th>Workshop Name</Table.Th>
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
