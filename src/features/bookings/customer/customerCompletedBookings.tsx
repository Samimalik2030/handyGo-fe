import {
  Table,
  HoverCard,
  Box,
  Menu,
  ActionIcon,
  Stack,
  Title,
  Text,
  Modal,
  Rating,
  Button,
  Textarea,
  Group,
} from "@mantine/core";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../../../api";
import IconVerticalDots from "../../../assets/iconVerticalDots";
import { IBooking } from "../../../common/interfaces/bookings";
import { IUser } from "../../../common/interfaces/user";
import { Workshop } from "../../../common/interfaces/workshop";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

export default function MyCompletedBookings() {
  const [requests, setRequests] = useState<IBooking[]>([]);
  const [workshop, setWorkshop] = useState<Workshop | null>(null);

  const [opened, { open, close }] = useDisclosure();

  const getServiceRequest = async (userId: number) => {
    const response = await api.get(
      `/bookings?status=completed&userId=${userId}`
    );
    setRequests(response.data);
  };
  const user: IUser | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  useEffect(() => {
    const user: IUser | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (user?.id) {
      getServiceRequest(user.id);
    }
  }, []);

  const [id, setId] = useState<string | undefined>(undefined);
  const handleAddReview = (id: any, workshoop: Workshop) => {
    setId(id);
    setWorkshop(workshoop);
    open();
  };

  function handleClose() {
    setId(undefined);
    setWorkshop(null);
    close();
    form.reset()
  }

  const form = useForm({
    initialValues: {
      rating: 0,
      comment: "",
    },

    validate: {
      rating: (value) => (value > 0 ? null : "Please select a rating"),
      comment: (value) =>
        value.trim().length >= 5
          ? null
          : "Comment must be at least 5 characters",
    },
  });

  const handleSubmit = async () => {
  const resonse =  await api.post("/ratings", {
      stars: form.values.rating,
      comment: form.values.comment,
      user: user,
      workshop: workshop,
    });
    if(resonse.data){
      form.reset()
      close()
    }
  };

  const rows =
    requests.length === 0 ? (
      <Table.Tr>
        <Table.Td colSpan={7}>
          <Text ta="center" c="dimmed">
            There are no completed bookings yet.
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
                  onClick={() =>
                    handleAddReview(booking.workshop.id, booking.workshop)
                  }
                >
                  Add Review
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Table.Td>
        </Table.Tr>
      ))
    );

  return (
    <>
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

      <Modal opened={opened} onClose={() => handleClose()}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text fw={500} mb={5}>
            Rating
          </Text>
          <Group justify="center">
            <Rating size="lg" count={5} {...form.getInputProps("rating")} />
          </Group>
          <Textarea
            label="Comment"
            placeholder="Write your feedback..."
            autosize
            minRows={3}
            mt="md"
            {...form.getInputProps("comment")}
          />

          <Button type="submit" mt="md" fullWidth>
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
}
